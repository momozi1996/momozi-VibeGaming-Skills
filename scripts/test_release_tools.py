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
from audit_packages import ROOT, check_package, safe_member, sha256

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
