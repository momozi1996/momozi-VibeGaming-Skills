/** Resolve even future outputs through symlink ancestors; keep installed skill read-only. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fs.realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
function canonical(raw){
 let p=path.resolve(raw), tail=[];
 while(!fs.existsSync(p)){const parent=path.dirname(p);if(parent===p)throw Error('Cannot resolve path');tail.unshift(path.basename(p));p=parent;}
 return path.join(fs.realpathSync(p),...tail);
}
export function assertExternal(raw){
 const p=canonical(raw),inside=(a,b)=>a===b||a.startsWith(b+path.sep);
 if(inside(p,root)||inside(root,p))throw Error('Target/evidence must be outside installed skill and its ancestors');
 return p;
}
