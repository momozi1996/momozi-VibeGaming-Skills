#!/usr/bin/env python3
"""Run fresh isolated v0.1.1 acceptance. Never test an already-running server."""
import argparse
import datetime
import hashlib
import json
import os
from pathlib import Path
import platform
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request

SKILL = Path(__file__).resolve().parents[1]


def now():
    return datetime.datetime.now().astimezone().isoformat()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--project', required=True)
    ap.add_argument('--out', required=True, help='New report directory, outside project/skill')
    ap.add_argument('--suite', choices=['rules', 'core', 'all'], default='core')
    ap.add_argument('--channel', help='Playwright channel, e.g. chrome; default chrome on macOS, bundled Chromium elsewhere')
    ap.add_argument('--executable', help='Explicit Chromium/Chrome executable; takes precedence over channel')
    ap.add_argument('--software', action='store_true', help='Use SwiftShader; changes render environment/performance')
    args = ap.parse_args()
    project, out = Path(args.project).expanduser().resolve(), Path(args.out).expanduser().resolve()
    if project == SKILL or SKILL in project.parents:
        raise ValueError('Restore outside the skill before running checks')
    if not (project / 'src/main.js').is_file() or not (project / 'node_modules/vite/bin/vite.js').is_file():
        raise ValueError('Expected completed source and installed dependencies. Run npm ci in the restored project first')
    if out.exists():
        raise ValueError('Report directory already exists; choose a new path to prevent stale evidence')
    if project == out or project in out.parents or out in project.parents or out == SKILL or SKILL in out.parents:
        raise ValueError('Report must be separate from project and skill')
    out.mkdir(parents=True)
    npm, node = shutil.which('npm'), shutil.which('node')
    if not npm or not node:
        raise RuntimeError('Node/npm not found on PATH')
    report = {'schema': 1, 'started': now(), 'project': str(project), 'suite': args.suite,
              'platform': platform.platform(), 'python': sys.version.split()[0],
              'node': subprocess.check_output([node, '--version'], text=True).strip(),
              'npm': subprocess.check_output([npm, '--version'], text=True).strip(),
              'steps': [], 'adaptations': [], 'ok': False,
              'scope': 'Fresh isolated servers and artifacts; not original League of Legends fidelity proof.'}
    servers, handles, stage = [], [], None

    def run(name, command, cwd=project, timeout=240):
        print(f'RUN {name}', flush=True)
        start = time.monotonic()
        log = out / f'{name}.log'
        item = {'name': name, 'command': [str(x) for x in command], 'log': log.name}
        try:
            with log.open('w', encoding='utf-8') as stream:
                result = subprocess.run(command, cwd=cwd, stdout=stream, stderr=subprocess.STDOUT, timeout=timeout)
            item['exitCode'] = result.returncode
        except subprocess.TimeoutExpired:
            item['exitCode'] = -1
            item['error'] = f'Timed out after {timeout}s'
        item['seconds'] = round(time.monotonic() - start, 2)
        report['steps'].append(item)
        if item['exitCode']:
            raise RuntimeError(f'{name} failed; inspect {log}')

    def serve(kind):
        port = free_port()
        while any(s['port'] == port for s in report.get('servers', [])):
            port = free_port()
        command = [node, str(project / 'node_modules/vite/bin/vite.js')]
        if kind == 'preview':
            command.append('preview')
        command += ['--host', '127.0.0.1', '--port', str(port), '--strictPort']
        handle = (out / f'server-{kind}.log').open('w', encoding='utf-8')
        handles.append(handle)
        process = subprocess.Popen(command, cwd=project, stdout=handle, stderr=subprocess.STDOUT)
        servers.append(process)
        url = f'http://127.0.0.1:{port}'
        report.setdefault('servers', []).append({'kind': kind, 'port': port, 'pid': process.pid, 'command': command})
        for _ in range(150):
            if process.poll() is not None:
                raise RuntimeError(f'{kind} server exited, possibly a port collision; rerun with new report path')
            try:
                with urllib.request.urlopen(url, timeout=.5) as response:
                    if response.status == 200 and process.poll() is None:
                        return url
            except OSError:
                pass
            time.sleep(.1)
        raise RuntimeError(f'{kind} server not ready')

    try:
        run('unit', [npm, 'test'])
        run('build', [npm, 'run', 'build'])
        report['sourceHashes'] = {p.relative_to(project).as_posix(): digest(p) for p in sorted((project / 'src').rglob('*')) if p.is_file()}
        # Temporary harness is under target so the target's pinned Playwright resolves.
        stage = Path(tempfile.mkdtemp(prefix='.reproducer-check-', dir=project))
        shutil.copytree(project / 'src', stage / 'src')
        shutil.copytree(project / 'public', stage / 'public')
        (stage / 'tests').mkdir()
        (stage / 'artifacts/controls').mkdir(parents=True)
        tests = []
        if args.suite == 'all':
            tests += ['soak.mjs', 'natural-match.mjs']
        if args.suite != 'rules':
            dev, preview = serve('dev'), serve('preview')
            launch = {'headless': True, 'args': []}
            if args.executable:
                launch['executablePath'] = str(Path(args.executable).expanduser().resolve())
            elif args.channel or platform.system() == 'Darwin':
                launch['channel'] = args.channel or 'chrome'
            if args.software:
                launch['args'] = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
            elif platform.system() == 'Darwin':
                launch['args'] = ['--use-angle=metal']
            report['browserLaunch'] = launch
            tests += ['controls-browser.mjs', 'controls-production.mjs', 'browser.mjs', 'production.mjs', 'fault.mjs']
        for name in tests:
            source = project / 'tests' / name
            text = source.read_text(encoding='utf-8')
            changes = []
            if 'chromium.launch(' in text:
                text = text.replace('http://127.0.0.1:4411', dev).replace('http://127.0.0.1:4412', preview)
                text, count = re.subn(r'chromium\.launch\(\{[^}]*\}\)', lambda _: 'chromium.launch(' + json.dumps(launch) + ')', text)
                if count != 1:
                    raise RuntimeError(f'Expected exactly one launch expression in {name}; unsupported test harness')
                changes = ['4411/4412 URLs -> owned ephemeral dev/preview ports', 'chromium.launch options -> selected browser/platform']
            staged = stage / 'tests' / name
            staged.write_text(text, encoding='utf-8')
            report['adaptations'].append({'test': name, 'originalSHA256': digest(source), 'stagedSHA256': digest(staged), 'changes': changes})
            run(name.removesuffix('.mjs'), [node, str(staged)], cwd=stage, timeout=300)
        if args.suite == 'all':
            natural = json.loads((stage / 'artifacts/natural-match-report.json').read_text())
            if natural['status'] != 'ended' or natural['winner'] not in [0, 1]:
                raise RuntimeError('Natural-match process exited but did not reach an ended match in 1800 simulated seconds')
            report['naturalMatchEnded'] = True
        report['ok'] = True
    except Exception as exc:
        report['error'] = str(exc)
        print(f'FAIL {exc}', file=sys.stderr)
    finally:
        for process in servers:
            if process.poll() is None:
                process.terminate()
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait(timeout=5)
        for handle in handles:
            handle.close()
        if stage is not None:
            if (stage / 'artifacts').exists():
                shutil.copytree(stage / 'artifacts', out / 'artifacts')
            shutil.copytree(stage / 'tests', out / 'test-harness')
            shutil.rmtree(stage)  # Only the tempfile created by this invocation.
        report['finished'] = now()
        (out / 'summary.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'ok': report['ok'], 'report': str(out / 'summary.json')}, ensure_ascii=False))
    return 0 if report['ok'] else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, RuntimeError) as error:
        print(f'ERROR {error}', file=sys.stderr)
        sys.exit(1)
