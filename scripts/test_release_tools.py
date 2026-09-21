#!/usr/bin/env python3
"""Offline tests for repository helpers, not the games' complete test suites."""
import hashlib
import json
from pathlib import Path
import stat
import subprocess
import sys
import tempfile
import unittest
import zipfile
sys.dont_write_bytecode = True
from audit_packages import ROOT, check_package, safe_member, sha256, markdown_links, release_content_errors

class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='game-release-test-')
        self.root = Path(self.tmp.name).resolve()
        self.addCleanup(self.tmp.cleanup)

    def fixture(self, extra=None):
        files = {'testgame/SKILL.md':b'---\nname: testgame\ndescription: A complete test game\n---\n',
                 'testgame/agents/openai.yaml':b'interface:\n  default_prompt: "Use $testgame"\n',
                 'testgame/assets/local.txt':b'complete-local-asset'}
        p = self.root/'test.zip'
        with zipfile.ZipFile(p,'w') as z:
            for name,data in files.items(): z.writestr(name,data)
            if extra: z.writestr(*extra)
        row = {'id':'testgame','directory':'skills/testgame','zip':'test.zip','bytes':p.stat().st_size,'sha256':sha256(p)}
        (self.root/'test.zip.sha256').write_text(row['sha256']+'  test.zip\n')
        for name,data in files.items():
            target = self.root/'skills'/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
        return row

    def test_nested_and_root_guide_links(self):
        for name in ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'LICENSE.md']:
            (self.root/name).write_text('# Test\n')
        docs = self.root/'docs/images'; docs.mkdir(parents=True)
        (docs/'README.md').write_text('[Missing image](gone.png)\n')
        (self.root/'extra-guide.md').write_text('[Missing guide](gone.md)\n')
        failures = markdown_links(self.root)
        self.assertTrue(any('docs/images/README.md' in f for f in failures))
        self.assertTrue(any('extra-guide.md' in f for f in failures))
        (docs/'gone.png').write_bytes(b'fixture')
        (self.root/'gone.md').write_text('exists')
        self.assertEqual(markdown_links(self.root), [])

    def test_existing_local_report_not_a_distribution_link(self):
        for name in ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'LICENSE.md']:
            (self.root/name).write_text('# Test\n')
        local = self.root/'verification/report.json'
        local.parent.mkdir(); local.write_text('{}')
        (self.root/'README.md').write_text('[Local report](verification/report.json)')
        self.assertTrue(any('not distributed' in f for f in markdown_links(self.root)))

    def test_release_refuses_dependency_garbage(self):
        name = 'scripts/node_modules/accidental.js'
        p = self.root/name; p.parent.mkdir(parents=True); p.write_text('test')
        self.assertTrue(release_content_errors(self.root, [name]))
        self.assertTrue(release_content_errors(self.root, ['../outside']))

    def test_release_refuses_symlinks(self):
        target = self.root/'real.txt'; target.write_text('data')
        alias = self.root/'alias.txt'; alias.symlink_to(target)
        self.assertTrue(release_content_errors(self.root, ['alias.txt']))
        self.assertEqual(release_content_errors(self.root, ['real.txt']), [])

    def test_safe_paths(self):
        for name in ['../escape','testgame/../../escape','/testgame/x','testgame\\escape','C:/testgame/a','testgame//a','testgame/./a']:
            self.assertFalse(safe_member(name,'testgame'))
        self.assertTrue(safe_member('testgame/assets/角色.png','testgame'))

    def test_valid_full_package(self):
        self.assertTrue(check_package(self.fixture(),self.root)['passed'])

    def test_hash_corruption(self):
        row = self.fixture();(self.root/'test.zip').write_bytes(b'bad')
        self.assertFalse(check_package(row,self.root)['passed'])

    def test_source_corruption(self):
        row = self.fixture();(self.root/'skills/testgame/assets/local.txt').write_bytes(b'bad')
        self.assertFalse(check_package(row,self.root)['passed'])

    def test_zip_traversal(self):
        self.assertFalse(check_package(self.fixture(('../escape',b'bad')),self.root,False)['passed'])

    def test_zip_symlink(self):
        info = zipfile.ZipInfo('testgame/link');info.create_system=3;info.external_attr=(stat.S_IFLNK|0o777)<<16
        self.assertFalse(check_package(self.fixture((info,b'/tmp/outside')),self.root,False)['passed'])

    def test_second_skill(self):
        self.assertFalse(check_package(self.fixture(('testgame/nested/SKILL.md',b'nested')),self.root,False)['passed'])

    def test_real_install_no_overwrite(self):
        parent = self.root/'installed'
        command = [sys.executable,str(ROOT/'scripts/install_skill.py'),'--skill','farmgame','--skills-dir',str(parent)]
        first = subprocess.run(command,capture_output=True,text=True)
        self.assertEqual(first.returncode,0,first.stderr)
        original = (parent/'farmgame/SKILL.md').read_bytes()
        second = subprocess.run(command,capture_output=True,text=True)
        self.assertNotEqual(second.returncode,0)
        self.assertEqual((parent/'farmgame/SKILL.md').read_bytes(),original)
        self.assertTrue((parent/'farmgame/assets/project/index.html').is_file())

    def test_dry_run_does_not_write(self):
        parent=self.root/'dry'
        result=subprocess.run([sys.executable,str(ROOT/'scripts/install_skill.py'),'--skill','farmgame','--skills-dir',str(parent),'--dry-run'],capture_output=True,text=True)
        self.assertEqual(result.returncode,0,result.stderr);self.assertFalse(parent.exists())

if __name__ == '__main__': unittest.main()
