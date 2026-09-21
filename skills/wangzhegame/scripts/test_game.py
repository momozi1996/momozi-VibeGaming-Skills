#!/usr/bin/env python3
"""Offline packaging/launcher checks; not a replacement for gameplay tests."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import urllib.request
sys.dont_write_bytecode = True
import game


class PackagingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='game-kit-tools-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()

    def test_verify(self):
        self.assertTrue(game.verify())

    def test_create_preserves_baseline(self):
        out = game.create(self.root / 'game')
        for p in game.BASE.rglob('*'):
            if p.is_file(): self.assertEqual(p.read_bytes(), (out / p.relative_to(game.BASE)).read_bytes())
        self.assertTrue((out / 'start-demo.py').is_file())
        self.assertFalse((out / 'node_modules').exists())

    def test_no_overwrite(self):
        out = self.root / 'existing'
        out.mkdir()
        (out / 'mine.txt').write_text('keep')
        with self.assertRaises(ValueError): game.create(out)
        self.assertEqual((out / 'mine.txt').read_text(), 'keep')

    def test_empty_output_also_refused(self):
        out = self.root / 'existing'; out.mkdir()
        with self.assertRaises(ValueError): game.create(out)

    def test_skill_output_refused(self):
        with self.assertRaises(ValueError): game.create(game.KIT / 'should-not-exist')
        self.assertFalse((game.KIT / 'should-not-exist').exists())

    def test_standalone_http_without_npm(self):
        out = game.create(self.root / 'served')
        proc = subprocess.Popen([sys.executable, str(out / 'start-demo.py'), '--port', '0'],
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            line = proc.stdout.readline()
            self.assertIn('http://127.0.0.1:', line)
            url = line.split('ready: ', 1)[1].strip()
            with urllib.request.urlopen(url, timeout=5) as response:
                self.assertEqual(response.status, 200)
                self.assertIn(b'RIFT FORGE', response.read())
        finally:
            proc.terminate()
            try: proc.wait(timeout=5)
            except subprocess.TimeoutExpired: proc.kill(); proc.wait()
            proc.stdout.close(); proc.stderr.close()

if __name__ == '__main__': unittest.main()
