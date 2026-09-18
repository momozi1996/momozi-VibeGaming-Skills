import {CHARACTERS} from '../fighters/definitions';
import type {CharacterId,Mode,MatchSnapshot} from '../combat/types';
export interface UIActions {start:(c:CharacterId,m:Mode)=>void;pause:()=>void;resume:()=>void;rematch:()=>void;menu:()=>void;mute:()=>boolean;music:(on:boolean)=>void;debug:()=>boolean;step:()=>void;reset:()=>void;touch:(name:string,down:boolean)=>void;select:()=>void}
export class UI {
 readonly stage:HTMLElement;selected:CharacterId='ava';mode:Mode='cpu';private shownPhase='';private paused=false;private music=false;
 constructor(private actions:UIActions){
  document.querySelector('#app')!.innerHTML=`
   <main class="cabinet" aria-label="NEON IMPACT 街机格斗游戏"><div class="stage-sizing"><div id="viewport"><div id="canvas-host"></div>
    <section id="select-screen" class="screen">
     <div class="arcade-topline"><span>1P <b>FREE PLAY</b></span><span>ORIGINAL FIGHTING GAME</span><span>2P <b>CHALLENGER</b></span></div>
     <h1 class="game-logo"><span>NEON</span> IMPACT<small>霓 虹 对 决</small></h1>
     <h2 class="select-title">PLAYER SELECT</h2>
     <div class="fighter-label label-ava"><small>CRIMSON TEMPO</small><strong>AVA <em>赤燕</em></strong><span>赤燕 · 裂空踢</span></div>
     <div class="fighter-label label-ren"><small>IRON CURRENT</small><strong>REN <em>玄武</em></strong><span>玄武 · 破空劲</span></div>
     <div class="select-center"><div class="versus-mark">VS</div><div class="roster" role="group" aria-label="选择玩家一角色">
      ${(['ava','ren'] as CharacterId[]).map((id,index)=>`<button class="fighter-slot ${index===0?'selected':''}" data-character="${id}" aria-label="选择 ${CHARACTERS[id].name} ${CHARACTERS[id].chinese}" aria-pressed="${index===0}"><img src="/assets/fighters/${id}-portrait.png" alt=""/><b>${CHARACTERS[id].name}</b><span class="p1-cursor">1P</span></button>`).join('')}
     </div><p id="fighter-description">${CHARACTERS.ava.description}</p></div>
     <div class="mode-picker" role="group" aria-label="游戏模式"><button data-mode="cpu" class="active" aria-pressed="true">ARCADE <small>人机对战</small></button><button data-mode="versus" aria-pressed="false">VERSUS <small>本地双人</small></button><button data-mode="training" aria-pressed="false">TRAINING <small>训练模式</small></button></div>
     <button id="start-button" disabled>LOADING…</button>
     <div class="select-footer"><span>← → 选人 <b>·</b> ↑ ↓ 模式 <b>·</b> ENTER 开始</span><span>原创 CC0 角色 · 非 SNK 官方作品</span></div>
    </section>
    <section id="hud" hidden><div class="fighter-hud p1"><div class="hud-name"><b id="p1-name">AVA</b><span>PLAYER 1</span><span class="wins" id="p1-wins"></span></div><div class="health-track"><div class="health-chip" id="p1-chip"></div><div class="health-fill" id="p1-health"></div></div><div class="hud-under"><span id="p1-style">CRIMSON TEMPO</span><b id="p1-hp">1000</b></div></div><div class="timer"><small id="round-label">ROUND 01</small><strong id="clock">60</strong><span>NEON IMPACT</span></div><div class="fighter-hud p2"><div class="hud-name"><b id="p2-name">REN</b><span id="p2-label">CPU</span><span class="wins" id="p2-wins"></span></div><div class="health-track"><div class="health-chip" id="p2-chip"></div><div class="health-fill" id="p2-health"></div></div><div class="hud-under"><span id="p2-style">IRON CURRENT</span><b id="p2-hp">1000</b></div></div>
     <div class="combo combo-left" id="combo-0"></div><div class="combo combo-right" id="combo-1"></div><div class="bottom-hud"><div><span>01 / PLAYER ONE</span><b id="p1-special"></b></div><button id="pause-button" title="暂停">Ⅱ <span>PAUSE / ESC</span></button><div><span>02 / CHALLENGER</span><b id="p2-special"></b></div></div><div id="special-cue"></div>
    </section>
    <div id="round-banner" aria-live="polite"></div>
    <section id="result-screen" class="overlay-panel" hidden><span class="eyebrow">MATCH COMPLETE</span><h2 id="result-title">YOU WIN</h2><p id="result-subtitle"></p><div class="result-buttons"><button id="rematch-button" class="primary-button">再战一场</button><button id="menu-button" class="secondary-button">返回选人</button></div></section>
    <section id="pause-screen" class="overlay-panel" hidden><span class="eyebrow">NEON IMPACT</span><h2>PAUSED<span>暂停</span></h2><div class="result-buttons"><button id="resume-button" class="primary-button">继续对决</button><button id="pause-menu-button" class="secondary-button">返回选人</button></div><p>ESC 继续 · F2 判定框 · N 单帧推进</p></section>
    <div id="debug-panel" hidden></div><div id="loading-error" hidden></div>
    <nav class="game-tools" aria-label="游戏设置"><button id="help-button" title="操作说明">操作 ?</button><button id="sound-button" title="切换音效" aria-label="关闭音效">♪</button><button id="fullscreen-button" title="全屏" aria-label="全屏">⛶</button><button id="credits-button" title="素材与授权">CC0</button><button id="debug-button" title="判定框 F2">F2</button></nav>
    <div class="diagnostics" hidden><span id="status-text"></span><span id="fps-label"></span></div>
   </div></div>
   <div class="touch-controls" aria-label="触屏操作"><div class="touch-dpad"><button data-touch="left">←</button><button data-touch="down">↓</button><button data-touch="right">→</button><button data-touch="jump">↑</button></div><div><button data-touch="lp">轻拳</button><button data-touch="lk">轻脚</button><button data-touch="hp">重拳</button><button data-touch="hk">重脚</button><button data-touch="special">必杀</button></div></div>
   </main>
   <dialog id="help-dialog"><button class="dialog-close" aria-label="关闭">×</button><span class="eyebrow">HOW TO PLAY</span><h2>操作说明</h2><p>向对手反方向移动即可防御。下后防御低段，站立防御跳跃攻击。重击挥空后有更长收招，请留意距离。</p><div class="manual-grid"><section><h3>PLAYER 1</h3><p><kbd>A D</kbd> 前后移动　<kbd>W</kbd> 跳跃　<kbd>S</kbd> 蹲下</p><p><kbd>J</kbd> 轻拳　<kbd>K</kbd> 轻脚<br><kbd>L</kbd> 重拳　<kbd>I</kbd> 重脚</p><p><kbd>↓ ↘ → + J / L</kbd> 必杀<br><kbd>U</kbd> 必杀辅助（同一招、同一收招）</p></section><section><h3>PLAYER 2</h3><p><kbd>← → ↑ ↓</kbd> 移动 / 跳跃 / 蹲下</p><p>数字小键盘 <kbd>1</kbd> 轻拳　<kbd>2</kbd> 轻脚<br><kbd>4</kbd> 重拳　<kbd>5</kbd> 重脚　<kbd>0</kbd> 必杀</p><p>本地双人需要数字小键盘。<br>选定 P1 后，另一名角色自动作为 P2。</p></section><section><h3>HIT CONFIRM</h3><p>近身 <kbd>J</kbd> 命中后快速按 <kbd>U</kbd>，在取消窗口衔接必杀。空挥不能取消。必杀无能量门槛，但可被打断和反击。</p></section><section><h3>TRAINING LAB</h3><p><kbd>F2</kbd> 判定框 / 输入历史<br><kbd>ESC</kbd> 暂停　<kbd>N</kbd> 暂停时逐帧<br><kbd>R</kbd> 训练场重置</p><p>绿：受击框　红：攻击框　蓝：推挤框</p></section></div><label class="music-toggle"><input type="checkbox" id="music-toggle"/> 开启原创合成节拍（默认关闭）</label><p class="manual-note">键盘失焦或切换标签会自动暂停。手机支持触控操作，建议横屏；桌面键盘体验最佳。</p></dialog>
   <dialog id="credits-dialog"><button class="dialog-close" aria-label="关闭">×</button><span class="eyebrow">MADE WITH OPEN GAME ART</span><h2>素材与制作</h2><p>本作使用原创／CC0 素材，不包含拳皇拆包角色、原声或官方标识。角色别名、战斗参数和界面为本 Demo 的原创设计。</p><ul><li>角色：Puffolotti — Generic Woman (Stardrinkers Style) / Mustermann 2 Karate（CC0）</li><li>场景：ansimuz — Streets of Fight（CC0）</li><li>音效、回合播报、图标：Kenney（CC0）</li><li>界面、粒子与可选合成节拍：本 Demo 原创</li></ul><p>精灵按原作者动作重新编排，尚不等同于商业 KOF 美术与原作帧数据。所有使用的素材均随项目本地部署。</p><a href="/assets/credits.json" target="_blank" rel="noopener">查看来源、授权声明与 SHA256 ↗</a></dialog>`;
  this.stage=document.querySelector('#canvas-host')!;
  this.bind();this.resize();
 }
 private bind(){const on=(id:string,fn:()=>void)=>document.querySelector(id)!.addEventListener('click',fn);
  document.querySelectorAll<HTMLButtonElement>('[data-character]').forEach(b=>b.onclick=()=>this.select(b.dataset.character as CharacterId));
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(b=>b.onclick=()=>{this.chooseMode(b.dataset.mode as Mode);});
  on('#start-button',()=>this.actions.start(this.selected,this.mode));on('#pause-button',this.actions.pause);on('#resume-button',this.actions.resume);on('#rematch-button',this.actions.rematch);on('#menu-button',this.actions.menu);on('#pause-menu-button',this.actions.menu);
  on('#sound-button',()=>{const m=this.actions.mute();const b=document.querySelector('#sound-button')!;b.textContent=m?'♪̸':'♪';b.setAttribute('aria-label',m?'开启音效':'关闭音效');b.classList.toggle('muted',m);});
  on('#fullscreen-button',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else document.querySelector('.cabinet')!.requestFullscreen?.();});
  on('#debug-button',()=>this.actions.debug());
  for(const id of ['help','credits']){on(`#${id}-button`,()=>{this.actions.pause();(document.querySelector(`#${id}-dialog`) as HTMLDialogElement).showModal();});const d=document.querySelector(`#${id}-dialog`) as HTMLDialogElement;d.querySelector('button')!.onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d)d.close();});}
  (document.querySelector('#music-toggle') as HTMLInputElement).onchange=e=>{this.music=(e.target as HTMLInputElement).checked;this.actions.music(this.music);};
  document.querySelectorAll<HTMLButtonElement>('[data-touch]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);this.actions.touch(b.dataset.touch!,true);});for(const name of ['pointerup','pointercancel'])b.addEventListener(name,()=>this.actions.touch(b.dataset.touch!,false));});
 }
 select(id:CharacterId){this.selected=id;document.querySelectorAll<HTMLElement>('[data-character]').forEach(e=>{e.classList.toggle('selected',e.dataset.character===id);e.setAttribute('aria-pressed',String(e.dataset.character===id));});document.querySelector('#fighter-description')!.textContent=CHARACTERS[id].description;this.actions.select();}
 chooseMode(mode:Mode){this.mode=mode;document.querySelectorAll<HTMLElement>('[data-mode]').forEach(e=>{e.classList.toggle('active',e.dataset.mode===mode);e.setAttribute('aria-pressed',String(e.dataset.mode===mode));});this.actions.select();}
 cycleMode(direction:number){const modes:Mode[]=['cpu','versus','training'];this.chooseMode(modes[(modes.indexOf(this.mode)+direction+3)%3]);}
 private resize(){const holder=document.querySelector('.stage-sizing') as HTMLElement,viewport=document.querySelector('#viewport') as HTMLElement;
  const update=()=>{const touch=matchMedia('(pointer: coarse), (max-width: 700px)').matches;const reserve=touch?86:0;const width=Math.min(innerWidth,(innerHeight-reserve)*960/540);holder.style.width=`${width}px`;holder.style.height=`${width*540/960}px`;viewport.style.transform=`scale(${width/960})`;};
  window.addEventListener('resize',update);document.addEventListener('fullscreenchange',update);update();}
 ready(){const b=document.querySelector('#start-button') as HTMLButtonElement;b.disabled=false;b.innerHTML='PRESS ENTER <span>开始对决</span>';}
 showMenu(){this.shownPhase='';this.paused=false;for(const id of ['hud','result-screen','pause-screen'])this.hidden(id,true);this.hidden('select-screen',false);document.querySelector('#round-banner')!.innerHTML='';document.querySelector('#status-text')!.textContent='READY WHEN YOU ARE';}
 showGame(){this.hidden('select-screen',true);this.hidden('result-screen',true);this.hidden('pause-screen',true);this.hidden('hud',false);this.shownPhase='';this.paused=false;}
 pause(on:boolean){this.paused=on;this.hidden('pause-screen',!on);}
 private hidden(id:string,on:boolean){(document.getElementById(id)!).hidden=on;}
 update(s:MatchSnapshot){
  for(const f of s.fighters){const i=f.player+1,c=CHARACTERS[f.character];document.querySelector(`#p${i}-name`)!.textContent=c.name;document.querySelector(`#p${i}-style`)!.textContent=c.style;document.querySelector(`#p${i}-hp`)!.textContent=String(f.health);
   (document.querySelector(`#p${i}-health`) as HTMLElement).style.transform=`scaleX(${f.health/1000})`;(document.querySelector(`#p${i}-chip`) as HTMLElement).style.transform=`scaleX(${f.health/1000})`;
   document.querySelector(`#p${i}-wins`)!.innerHTML=[0,1].map(n=>`<i class="${s.wins[f.player]>n?'won':''}"></i>`).join('');document.querySelector(`#p${i}-special`)!.textContent=c.special;
   const combo=document.querySelector(`#combo-${f.player}`)!;combo.innerHTML=f.combo>1?`<strong>${f.combo}</strong><span>HIT COMBO<small>${f.comboDamage} DAMAGE</small></span>`:'';
  }
  document.querySelector('#p2-label')!.textContent=s.mode==='cpu'?'CPU / NORMAL':s.mode==='training'?'TRAINING DUMMY':'PLAYER 2';
  document.querySelector('#clock')!.textContent=s.mode==='training'?'∞':String(Math.ceil(s.clock/60)).padStart(2,'0');
  document.querySelector('#round-label')!.textContent=`ROUND ${String(s.round).padStart(2,'0')}`;
  const banner=document.querySelector('#round-banner')!;
  if(s.phase==='intro'){banner.innerHTML=s.phaseAge<105?`<div class="round-announcement"><small>THE MIDNIGHT CIRCUIT</small>ROUND <em>${s.round}</em><span>准备迎战</span></div>`:`<div class="fight-announcement">FIGHT<span>放手一搏</span></div>`;}
  else if(s.phase==='ending'){banner.innerHTML=`<div class="ko-announcement">${s.clock<=0?'TIME UP':'K.O.'}<span>${s.winner===null?'DOUBLE K.O. / DRAW':`${CHARACTERS[s.fighters[s.winner].character].name} TAKES THE ROUND`}</span></div>`;}
  else banner.innerHTML='';
  if(s.phase==='result'&&this.shownPhase!=='result'){
   this.hidden('result-screen',false);document.querySelector('#result-title')!.textContent=s.winner===0?'YOU WIN':'DEFEAT';document.querySelector('#result-subtitle')!.textContent=`${CHARACTERS[s.fighters[s.winner??0].character].name} 获胜 · ${s.wins[0]} : ${s.wins[1]}`;
  }
  this.shownPhase=s.phase;
  document.querySelector('#status-text')!.textContent=this.paused?'MATCH PAUSED':s.mode==='training'?'TRAINING LAB / R TO RESET':s.phase==='fight'?'MATCH IN PROGRESS':'MIDNIGHT CIRCUIT';
 }
 setDebug(on:boolean,text=''){this.hidden('debug-panel',!on);document.querySelector('#debug-panel')!.textContent=text;document.querySelector('#debug-button')!.classList.toggle('active',on);}
 fps(fps:number){document.querySelector('#fps-label')!.innerHTML=`${Math.round(fps)} FPS <b>·</b> FIXED 60 HZ SIMULATION`;}
 error(message:string){const el=document.querySelector('#loading-error')!;el.textContent=`加载失败：${message}。请刷新重试，或查看 README。`;this.hidden('loading-error',false);}
}
