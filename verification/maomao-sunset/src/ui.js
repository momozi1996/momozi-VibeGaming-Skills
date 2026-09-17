/** SUNSET KART — DOM-only game presentation. No renderer or simulation ownership. */
const CAST = [
  { id: 'mochi', name: 'MOCHI', subtitle: '糯米 · 软乎乎，也快乎乎', color: '#9cdbc5' },
  { id: 'mango', name: 'MANGO', subtitle: '芒果 · 把阳光踩到底', color: '#efbb65' },
  { id: 'luna', name: 'LUNA', subtitle: '露娜 · 追风，也追月亮', color: '#aab7db' },
  { id: 'oreo', name: 'OREO', subtitle: '奥利奥 · 黑白分明，全速前进', color: '#afc9c8' },
  { id: 'sakura', name: 'SAKURA', subtitle: '樱花 · 温柔的超车高手', color: '#edb2b5' },
  { id: 'coco', name: 'COCO', subtitle: '可可 · 海岛上的开心果', color: '#c9ba8b' },
];
const NAVY = '#173d45';
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const finite = (value, fallback = 0) => value !== null && value !== '' && Number.isFinite(Number(value)) ? Number(value) : fallback;
const first = (...values) => values.find((value) => value !== undefined && value !== null);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ordinal = (n) => n % 100 >= 11 && n % 100 <= 13 ? 'TH' : ({ 1: 'ST', 2: 'ND', 3: 'RD' }[n % 10] || 'TH');
function timeText(value) {
  const seconds = Math.max(0, finite(value));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}.${String(Math.floor((seconds % 1) * 100)).padStart(2, '0')}`;
}
function icon(name, className = '') {
  const shapes = {
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    play: '<path d="m9 5 10 7-10 7Z" fill="currentColor" stroke="none"/>',
    sound: '<path d="m11 4-5 4H3v8h3l5 4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
    muted: '<path d="m11 4-5 4H3v8h3l5 4Zm5 5 6 6m0-6-6 6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.5 1-1.5 1-1.5 2"/><circle cx="12" cy="16.5" r=".9" fill="currentColor" stroke="none"/>',
    settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--ak-cream)"/><circle cx="15" cy="17" r="3" fill="var(--ak-cream)"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    flag: '<path d="M5 21V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0"/><path d="M6 5h4v4H6Zm4 4h4v4h-4Zm4-3h5v4h-5Z" fill="currentColor" stroke="none"/>',
    fish: '<path d="M3 12c4-7 10-7 15-2l4-3v10l-4-3c-5 5-11 5-15-2Z"/><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3"/>',
    fullscreen: '<path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/>',
    camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3Z"/><circle cx="12" cy="13" r="4"/>',
    view: '<path d="m3 12 5-5h8l5 5-5 5H8Z"/><circle cx="12" cy="12" r="3"/>',
    restart: '<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
    home: '<path d="m3 11 9-8 9 8M6 9v12h12V9m-8 12v-7h4v7"/>',
    bolt: '<path d="m14 2-10 12h7l-1 8L21 9h-8Z" fill="currentColor" stroke="none"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
    palm: '<path d="M12 22c3-6 3-11 1-15M13 7C8 2 3 4 2 9c4-2 7-2 11-2Zm0 0c1-6 6-7 9-4-4 0-6 1-9 4Zm0 0c6-2 10 2 9 7-3-4-5-6-9-7Zm0 0c-5 0-9 4-7 9 1-4 3-6 7-9Z"/>',
    flower: '<path d="M12 9C4-2 0 10 8 12c-11 4-2 13 4 4 4 11 13 2 4-4 11-4 2-13-4-4-4-11-13-2-4 4"/><circle cx="12" cy="12" r="2"/>',
    trophy: '<path d="M7 3h10v8c0 7-10 7-10 0Zm0 2H3v3c0 4 4 4 4 4m10-7h4v3c0 4-4 4-4 4m-5 4v5m-5 0h10"/>',
  };
  return `<svg class="ak-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.bolt}</svg>`;
}

/** Six original vector portraits; deliberately independent of the Three.js module. */
function portrait(id) {
  const palette = {
    mochi: ['#fff4dc', '#f4c8bd', '#9cdbc5'], mango: ['#f2b458', '#ee8a6b', '#719b68'],
    luna: ['#666784', '#d19baf', '#d6c889'], oreo: ['#faf3e3', '#eeb4b0', '#9bbfcb'],
    sakura: ['#ffeddf', '#eba9b5', '#ef9da9'], coco: ['#ae7954', '#dbac91', '#94bda1'],
  };
  const [fur, pink, scarf] = palette[id] || palette.mochi;
  const eye = id === 'luna' ? '#fff3d4' : NAVY;
  let marks = '';
  let accessory = '';
  if (id === 'mochi') marks = '<path d="M43 27c1 5 6 6 7 0m0 0c1 6 6 6 7 0" fill="none" stroke="#dfccad" stroke-width="2.5"/>';
  if (id === 'mango') {
    marks = '<path d="m43 24 2 10m7-10-1 9m8-6-3 9M24 46l7 3m-7 4 7 2m45-9-7 3m7 4-7 2" stroke="#c67a38" stroke-width="3" stroke-linecap="round"/>';
    accessory = '<path d="M66 23c-1-7 6-12 11-9-1 7-5 10-11 9" fill="#719b68"/><circle cx="68" cy="23" r="5" fill="#ffde87"/>';
  }
  if (id === 'luna') accessory = '<path d="M67 13c-9 4-6 16 4 15-7 6-17 0-14-8 1-4 5-7 10-7Z" fill="#f0d990"/><path d="m25 32 2-4 2 4 4 2-4 2-2 4-2-4-4-2Z" fill="#e2d6ad"/>';
  if (id === 'oreo') marks = '<path d="M29 15 42 30c-1 4-1 11-5 16-5 8-13 6-15 1 1-8 3-12 3-12Z" fill="#37454b"/><path d="M69 18 62 30c6-1 10 2 14 6Z" fill="#37454b"/>';
  if (id === 'sakura') accessory = '<g fill="#ea8fa5" stroke="#ffe6d5" stroke-width="1.4"><ellipse cx="74" cy="22" rx="5" ry="8"/><ellipse cx="74" cy="22" rx="5" ry="8" transform="rotate(72 74 22)"/><ellipse cx="74" cy="22" rx="5" ry="8" transform="rotate(144 74 22)"/></g><circle cx="74" cy="22" r="3" fill="#f7d882"/>';
  if (id === 'coco') {
    marks = '<ellipse cx="50" cy="56" rx="20" ry="14" fill="#e6c49a"/><path d="M44 28h12" stroke="#815b45" stroke-width="5" stroke-linecap="round"/>';
    accessory = '<path d="m46 25-7-13 10 5 1-12 5 12 10-6-7 14Z" fill="#719c74" stroke="#47765c" stroke-width="1.4"/>';
  }
  const eyes = id === 'sakura'
    ? `<path d="M32 47q5-6 10 0m16 0q5-6 10 0" fill="none" stroke="${eye}" stroke-width="3" stroke-linecap="round"/>`
    : `<ellipse cx="37" cy="46" rx="3.2" ry="4.5" fill="${id === 'oreo' ? '#fff3dc' : eye}"/><ellipse cx="63" cy="46" rx="3.2" ry="4.5" fill="${eye}"/><circle cx="38" cy="44.5" r="1" fill="#fff9ef"/><circle cx="64" cy="44.5" r="1" fill="#fff9ef"/>`;
  return `<svg class="ak-cat" viewBox="0 0 100 90" fill="none" aria-hidden="true"><ellipse cx="50" cy="79" rx="30" ry="5" fill="${NAVY}" opacity=".1"/><path d="M29 82c1-18 41-18 42 0" fill="${scarf}" stroke="${NAVY}" stroke-width="2"/><path d="M24 37 22 13q0-4 4-2l19 15q6-1 12 0l18-15q4-2 4 2l-3 24c17 29-3 39-26 39S7 65 24 37Z" fill="${fur}" stroke="${NAVY}" stroke-width="2" stroke-linejoin="round"/><path d="m28 20 1 14 10-5Zm44 0-1 14-10-5Z" fill="${pink}"/>${marks}<ellipse cx="29" cy="55" rx="6" ry="3" fill="${pink}" opacity=".7"/><ellipse cx="71" cy="55" rx="6" ry="3" fill="${pink}" opacity=".7"/>${eyes}<path d="m47 54 3 3 3-3Z" fill="${pink}" stroke="${NAVY}" stroke-width="1.3"/><path d="M50 57v3m0 0q-4 5-8 0m8 0q4 5 8 0" stroke="${NAVY}" stroke-width="1.6" stroke-linecap="round"/><path d="m17 51 9 2m-9 5 9-1m57-6-9 2m9 5-9-1" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/>${accessory}<path d="m35 73 15 5 15-5-4 9-11-4-11 4Z" fill="${scarf}" stroke="${NAVY}" stroke-width="1.4"/></svg>`;
}

const phaseName = (value) => ({ playing: 'racing', race: 'racing', running: 'racing', results: 'finished', result: 'finished', finish: 'finished', paused: 'paused', pause: 'paused', ready: 'menu', loading: 'menu', starting: 'countdown' }[value] || value);

export function createUI(options = {}) {
  const characters = (options.characters?.length ? options.characters : CAST).map((character, i) => {
    const fallback = CAST.find((entry) => entry.id === character.id) || CAST[i % CAST.length];
    return { ...fallback, ...character, id: String(character.id || fallback.id), tint: fallback.color };
  });
  let root = options.root || document.getElementById('ui-root');
  if (typeof root === 'string') root = document.querySelector(root);
  if (!root) { root = document.createElement('div'); root.id = 'ui-root'; document.body.append(root); }
  // Re-initialization is useful during development; do not leave old global listeners behind.
  root.__alohaUIDispose?.();
  root.classList.add('ak-ui');
  root.dataset.phase = 'menu';
  root.innerHTML = `
    <section class="ak-menu" data-ui="menu" aria-label="Aloha Kart 主菜单">
      <header class="ak-brand"><span class="ak-brand-mark">${icon('flower')}</span><span>SUNSET<br><b>RACING CLUB</b></span><i></i><span class="ak-season">SUNSET CIRCUIT<br><b>一起出发！</b></span></header>
      <div class="ak-menu-copy">
        <div class="ak-eyebrow"><span class="ak-checker"></span> THE ISLAND GRAND PRIX <span class="ak-line"></span></div>
        <h1 class="ak-title" aria-label="SUNSET KART"><span>SUNSET<span class="ak-title-spark">✳</span></span><span>KART<span class="ak-title-streaks"><i></i><i></i><i></i></span></span></h1>
        <h2 class="ak-tagline">落日猫猫大奖赛</h2>
        <p class="ak-menu-caption">海风、弯道，和一点点猫脾气。</p>
        <div class="ak-course"><span class="ak-course-icon">${icon('palm')}</span><div><span class="ak-micro">YOUR NEXT LITTLE GETAWAY</span><strong>SUNSET COAST</strong><span class="ak-course-meta">海风环岛赛 <i></i> 3 LAPS <i></i> 8 RACERS</span></div></div>
      </div>
      <div class="ak-postmark" aria-hidden="true"><svg viewBox="0 0 144 132"><circle cx="70" cy="66" r="47"/><circle cx="70" cy="66" r="41" stroke-dasharray="1 5"/><path d="M104 36c16-10 19 10 35 0m-35 10c16-10 19 10 35 0m-35 10c16-10 19 10 35 0"/><text x="70" y="49">GREETINGS FROM</text><text x="70" y="70" class="ak-stamp-main">SUNSET</text><text x="70" y="85">THE SUNNY SIDE</text></svg></div>
      <div class="ak-hero-caption"><span class="ak-hero-number" data-ui="hero-number">01</span><span><b data-ui="hero-name">MOCHI</b><small data-ui="hero-subtitle">糯米 · 软乎乎，也快乎乎</small></span><span class="ak-hero-flower">${icon('flower')}</span></div>
      <footer class="ak-menu-bottom">
        <div class="ak-character-area"><div class="ak-strip-label"><span><b>01</b> 选择你的猫猫车手</span><span>CHOOSE YOUR CO-PILOT</span></div><div class="ak-character-strip" role="group" aria-label="选择车手">${characters.map((character, i) => `<button class="ak-character" data-character="${escapeHTML(character.id)}" style="--cat-tint:${character.tint}" aria-label="选择 ${escapeHTML(character.name)}" aria-pressed="false"><span class="ak-char-number">0${i + 1}</span>${portrait(character.id)}<span class="ak-char-name">${escapeHTML(character.name)}</span><span class="ak-char-check" aria-hidden="true">✓</span></button>`).join('')}</div></div>
        <div class="ak-start-area"><span class="ak-start-note">好天气，不如比一场。</span><button class="ak-start" data-action="start" disabled><span><small>LET’S MAKE WAVES</small><strong data-ui="start-label">正在准备海岸</strong></span>${icon('arrow')}</button><span class="ak-start-foot"><span class="ak-status-dot"></span> 单人大奖赛 <i>·</i> 键盘 / 触屏均可游玩</span></div>
      </footer>
    </section>
    <nav class="ak-toolbar" aria-label="游戏选项">
      <button class="ak-icon-button ak-help-button" data-action="help" aria-label="操作说明" title="操作说明">${icon('help')}</button>
      <button class="ak-icon-button" data-action="mute" data-ui="mute" aria-label="关闭声音" aria-pressed="false" title="声音">${icon('sound')}</button>
      <button class="ak-icon-button ak-settings-button" data-action="settings" aria-label="游戏设置" title="游戏设置">${icon('settings')}</button>
      <button class="ak-icon-button ak-pause-button" data-action="pause" aria-label="暂停比赛" title="暂停比赛 · Esc" hidden>${icon('pause')}</button>
    </nav>
    <section class="ak-hud" data-ui="hud" aria-label="比赛信息" hidden>
      <div class="ak-race-standing"><div class="ak-position"><div><strong data-ui="position">1</strong><sup data-ui="ordinal">ST</sup></div><span>POSITION <b>/ <span data-ui="total-racers">8</span></b></span></div><div class="ak-lap"><span class="ak-micro">LAP / 圈数</span><strong><span data-ui="lap">1</span><small>/ <span data-ui="total-laps">3</span></small></strong><span class="ak-lap-dots" data-ui="lap-dots"><i></i><i></i><i></i></span></div></div>
      <div class="ak-race-metrics"><div class="ak-timer">${icon('clock')}<span data-ui="time">00:00.00</span></div><div class="ak-coins">${icon('fish')}<span data-ui="coins">00</span><small>COINS</small></div></div>
      <div class="ak-item-wrap"><button class="ak-item" data-action="item" data-ui="item-button" aria-label="尚未获得道具" disabled><span data-ui="item-icon">${icon('bolt')}</span><small data-ui="item-key">E</small></button><span data-ui="item-label">拾取道具</span></div>
      <div class="ak-minimap"><div class="ak-map-label"><span>SUNSET COAST</span><span class="ak-map-live">LIVE</span></div><svg data-ui="map" viewBox="0 0 180 144" role="img" aria-label="赛道小地图"><path data-ui="map-outline" fill="none" stroke="#fff7e6" stroke-width="12" stroke-linejoin="round"/><path data-ui="map-path" fill="none" stroke="#568b87" stroke-width="5" stroke-linejoin="round"/><path data-ui="map-grid" fill="none" stroke="#173d45" stroke-width="3"/><g data-ui="map-racers"></g></svg><span class="ak-map-legend"><i></i> YOU <span>●</span> THE PACK</span></div>
      <div class="ak-speedometer"><div class="ak-speed-main"><svg class="ak-speed-arc" viewBox="0 0 192 116" aria-hidden="true"><path d="M15 104a81 81 0 1 1 162 0" fill="none" stroke="rgba(255,248,231,.32)" stroke-width="4"/><path data-ui="speed-arc" d="M15 104a81 81 0 1 1 162 0" pathLength="100" fill="none" stroke="#f9f2de" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100"/></svg><strong data-ui="speed">0</strong><span>KM/H</span></div><div class="ak-drift-label"><span data-ui="drift-label">DRIFT CHARGE</span><b data-ui="boost-label">HOLD SHIFT</b></div><div class="ak-drift-track" role="meter" aria-label="漂移蓄力" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-ui="drift-meter"><i data-ui="drift-fill"></i><span></span><span></span></div></div>
      <div class="ak-keyboard-hint"><span><kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd> 驾驶</span><span><kbd data-ui="drift-key">SHIFT</kbd> 漂移</span><span><kbd data-ui="item-hint-key">E</kbd> 道具</span><span><kbd>R</kbd> 回赛道</span></div>
      <div class="ak-touch-controls" aria-label="触屏驾驶"><div class="ak-touch-steering"><button data-touch="left" class="ak-touch-button" aria-label="向左转">${icon('chevron', 'ak-flip')}</button><button data-touch="right" class="ak-touch-button" aria-label="向右转">${icon('chevron')}</button></div><div class="ak-touch-pedals"><button data-touch="drift" class="ak-touch-button ak-touch-drift" aria-label="按住漂移">漂移</button><button data-touch="brake" class="ak-touch-button ak-touch-brake" aria-label="刹车">刹车</button><button data-touch="throttle" class="ak-touch-button ak-touch-throttle" aria-label="加速">${icon('arrow')}<span>GO</span></button></div></div>
    </section>
    <div class="ak-countdown" data-ui="countdown" aria-live="assertive" hidden><small data-ui="countdown-label">READY, LITTLE RACER?</small><strong data-ui="countdown-number">3</strong><span>下一站，终点线。</span></div>
    <section class="ak-overlay ak-pause-overlay" data-ui="pause" role="dialog" aria-modal="true" aria-labelledby="ak-pause-title" hidden><div class="ak-pause-card"><span class="ak-paper-corner">${icon('palm')}</span><span class="ak-eyebrow">A LITTLE PIT STOP</span><h2 id="ak-pause-title">TAKE IT<br><em>EASY.</em></h2><p>海风不急，我们等你。</p><button class="ak-button ak-button-primary" data-action="resume">继续比赛 ${icon('play')}</button><button class="ak-button" data-action="restart">重新出发 ${icon('restart')}</button><div class="ak-pause-links"><button data-action="help">操作说明</button><button data-action="settings">设置</button><button data-action="menu">返回主菜单</button></div><small class="ak-pause-hint">ESC TO GET BACK IN THE GROOVE</small></div></section>
    <section class="ak-overlay ak-results-overlay" data-ui="results" role="dialog" aria-modal="true" aria-labelledby="ak-results-title" hidden><div class="ak-results-card"><div class="ak-result-eyebrow"><span class="ak-checker"></span> SUNSET COAST · GRAND PRIX <span class="ak-checker"></span></div><h2 id="ak-results-title">WHAT A <em>RIDE!</em></h2><p data-ui="result-message">漂亮完赛！海风为你欢呼。</p><div class="ak-podium" data-ui="podium"></div><div class="ak-result-stats"><div><span>YOUR PLACE</span><strong><b data-ui="result-place">—</b><small data-ui="result-ordinal"></small></strong></div><div><span>RACE TIME</span><strong class="ak-result-time" data-ui="result-time">—</strong></div><div><span>FISH COINS</span><strong>${icon('fish')}<b data-ui="result-coins">0</b></strong></div><div data-ui="best-lap-wrap" hidden><span>BEST LAP</span><strong class="ak-result-time" data-ui="best-lap">—</strong></div></div><div class="ak-results-actions"><button class="ak-button" data-action="menu">${icon('home')} 返回海岸</button><button class="ak-button ak-button-primary" data-action="restart">再来一场 ${icon('arrow')}</button></div><span class="ak-results-footer">SAME SUNSHINE. ONE MORE FINISH LINE.</span></div></section>
    <dialog class="ak-dialog" data-ui="dialog" aria-labelledby="ak-dialog-title"><button class="ak-icon-button ak-dialog-close" data-action="close-dialog" aria-label="关闭">${icon('close')}</button><span class="ak-eyebrow" data-ui="dialog-eyebrow">THE LITTLE FIELD GUIDE</span><h2 id="ak-dialog-title" data-ui="dialog-title">HOW TO <em>ZOOM.</em></h2><div data-ui="help-panel"><p class="ak-dialog-intro">先享受海风，再把弯道变成主场。</p><dl class="ak-controls-list"><div><dt><kbd>W A S D</kbd><span> / </span><kbd>↑ ← ↓ →</kbd></dt><dd>加速、刹车与转向</dd></div><div><dt><kbd data-ui="help-drift-key">SPACE / SHIFT</kbd></dt><dd>按住漂移，松开释放加速</dd></div><div><dt><kbd data-ui="help-item-key">E</kbd></dt><dd>使用拾取的道具</dd></div><div><dt><kbd>R</kbd></dt><dd>回到赛道</dd></div><div><dt><kbd>ESC</kbd></dt><dd>暂停 / 继续比赛</dd></div></dl><p class="ak-help-tip">${icon('fish')} 沿途收集鱼币，穿过加速带。弯道上攒满漂移条，出弯时快猫一步。</p><p class="ak-extra-keys"><kbd>C</kbd> 镜头 <kbd>P</kbd> 明信片 <kbd>M</kbd> 声音 <kbd>F</kbd> 全屏</p><p class="ak-touch-help">触屏：左侧转向，右侧加速、刹车和漂移；点击道具即可使用。</p></div><div data-ui="settings-panel" hidden><p class="ak-dialog-intro">调好节奏，再去兜风。</p><div class="ak-setting-row" data-setting="sound"><div><strong>海岛之声</strong><small>音乐与比赛音效</small></div><button class="ak-setting-toggle" data-action="mute" data-ui="mute-setting" aria-pressed="false">声音开启</button></div><label class="ak-setting-row" data-setting="quality"><span><strong>画面品质</strong><small>流畅与风景，都很重要</small></span><select data-ui="quality" aria-label="画面品质"><option value="high">精致 · HIGH</option><option value="balanced">均衡 · BALANCED</option><option value="low">流畅 · LOW</option></select></label><div class="ak-setting-actions"><button class="ak-button" data-setting="camera" data-action="camera">${icon('view')} 切换镜头</button><button class="ak-button" data-setting="photo" data-action="photo">${icon('camera')} 明信片模式</button><button class="ak-button" data-setting="fullscreen" data-action="fullscreen">${icon('fullscreen')} 全屏游玩</button></div></div></dialog>
    <div class="ak-loading" data-ui="loading" role="progressbar" aria-label="正在准备比赛" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div><span data-ui="loading-label">正在准备海岸</span><b data-ui="loading-percent">0%</b></div><span><i data-ui="loading-fill"></i></span></div>
    <div class="ak-toast" data-ui="toast" role="status" aria-live="polite" hidden></div>`;

  const elements = Object.fromEntries([...root.querySelectorAll('[data-ui]')].map((element) => [element.dataset.ui, element]));
  const text = (key, value) => { const element = elements[key]; const next = String(value ?? ''); if (element && element.textContent !== next) element.textContent = next; };
  const hidden = (key, value) => { if (elements[key]) elements[key].hidden = value; };
  const timers = new Set();
  const later = (fn, delay) => { const timer = setTimeout(() => { timers.delete(timer); fn(); }, delay); timers.add(timer); return timer; };
  let phase = 'menu';
  let selected = characters.some((character) => character.id === options.selectedCharacter) ? options.selectedCharacter : (characters.find((character) => character.id === 'mochi')?.id || characters[0].id);
  let muted = Boolean(options.muted);
  let loading = true;
  let toastTimer;
  let goTimer;
  let latestSnapshot = {};
  let resultsSignature = '';
  let resumeAfterDialog = false;
  let dialogReturnFocus = null;
  let startBusy = false;
  const pointers = new Map();
  let itemPulse = false;
  let itemTimer;
  let mapData = [];
  let mapSource = null;
  let mapTransform = null;
  let mapLastTime = -Infinity;
  let mapDotCount = -1;
  let mapDots = [];

  function setToast(message, duration = 2600) {
    if (toastTimer) { clearTimeout(toastTimer); timers.delete(toastTimer); }
    text('toast', message);
    hidden('toast', !message);
    if (message) toastTimer = later(() => hidden('toast', true), duration);
  }
  function invoke(name, ...args) {
    if (typeof options[name] !== 'function') return;
    try {
      const result = options[name](...args);
      if (result?.catch) result.catch((error) => setToast(error?.message || '这次没有成功，请再试一次。'));
      return result;
    } catch (error) { setToast(error?.message || '这次没有成功，请再试一次。'); }
  }
  function touchInput() {
    const input = window.__touchInput ||= {};
    for (const [key, value] of Object.entries({ throttle: 0, brake: 0, steer: 0, drift: false, item: false })) if (input[key] === undefined) input[key] = value;
    return input;
  }
  function syncTouch() {
    const actions = new Set(pointers.values());
    Object.assign(touchInput(), { throttle: actions.has('throttle') ? 1 : 0, brake: actions.has('brake') ? 1 : 0, steer: Number(actions.has('right')) - Number(actions.has('left')), drift: actions.has('drift'), item: itemPulse });
    root.querySelectorAll('[data-touch]').forEach((button) => button.classList.toggle('is-held', actions.has(button.dataset.touch)));
  }
  function releaseTouch() { pointers.clear(); itemPulse = false; syncTouch(); }
  function pulseItem() {
    if (phase !== 'racing' || elements['item-button'].disabled) return;
    if (itemTimer) { clearTimeout(itemTimer); timers.delete(itemTimer); }
    itemPulse = true; syncTouch();
    itemTimer = later(() => { itemPulse = false; syncTouch(); }, 150);
  }
  function selectCharacter(id, notify = true) {
    const index = characters.findIndex((character) => character.id === id);
    if (index < 0) return;
    selected = id;
    const character = characters[index];
    root.querySelectorAll('[data-character]').forEach((button) => { const active = button.dataset.character === id; button.classList.toggle('is-selected', active); button.setAttribute('aria-pressed', String(active)); });
    text('hero-number', String(index + 1).padStart(2, '0'));
    text('hero-name', character.name);
    text('hero-subtitle', character.subtitle);
    if (notify) invoke('onCharacter', id);
  }
  function setMuted(value) {
    muted = Boolean(value);
    elements.mute.innerHTML = icon(muted ? 'muted' : 'sound');
    elements.mute.setAttribute('aria-pressed', String(muted));
    elements.mute.setAttribute('aria-label', muted ? '开启声音' : '关闭声音');
    elements.mute.title = muted ? '开启声音' : '关闭声音';
    elements['mute-setting'].setAttribute('aria-pressed', String(muted));
    text('mute-setting', muted ? '声音关闭' : '声音开启');
    elements['mute-setting'].classList.toggle('is-muted', muted);
  }
  function setLoading(value) {
    let label;
    let progress = value;
    if (value && typeof value === 'object') {
      label = first(value.label, value.message);
      progress = first(value.progress, value.total > 0 ? finite(value.loaded) / value.total : undefined, value.percent, 0);
    }
    progress = finite(progress);
    if (progress > 1) progress /= 100;
    progress = clamp(progress, 0, 1);
    const percent = Math.round(progress * 100);
    loading = progress < 1;
    root.classList.toggle('is-loading', loading);
    elements.loading.setAttribute('aria-valuenow', String(percent));
    elements['loading-fill'].style.transform = `scaleX(${progress})`;
    text('loading-percent', `${percent}%`);
    text('loading-label', label || '正在准备海岸');
    text('start-label', loading ? `正在准备 · ${percent}%` : '开始比赛');
    root.querySelector('[data-action="start"]').disabled = loading || startBusy;
    hidden('loading', !loading);
  }
  function closeDialog(shouldResume = true) {
    if (!elements.dialog.open) return;
    if (typeof elements.dialog.close === 'function') elements.dialog.close(); else elements.dialog.removeAttribute('open');
    const resume = resumeAfterDialog;
    resumeAfterDialog = false;
    if (shouldResume && resume && phase === 'paused') invoke('onResume');
    if (dialogReturnFocus?.isConnected && !dialogReturnFocus.closest('[hidden]')) dialogReturnFocus.focus({ preventScroll: true });
  }
  function openDialog(kind) {
    dialogReturnFocus = document.activeElement;
    resumeAfterDialog = phase === 'racing' || phase === 'countdown';
    if (resumeAfterDialog) invoke('onPause');
    releaseTouch();
    hidden('help-panel', kind !== 'help'); hidden('settings-panel', kind !== 'settings');
    text('dialog-eyebrow', kind === 'help' ? 'THE LITTLE FIELD GUIDE' : 'MAKE YOURSELF AT HOME');
    elements['dialog-title'].innerHTML = kind === 'help' ? 'HOW TO <em>ZOOM.</em>' : 'ISLAND <em>VIBES.</em>';
    if (!elements.dialog.open) { if (typeof elements.dialog.showModal === 'function') elements.dialog.showModal(); else elements.dialog.setAttribute('open', ''); }
  }
  function setPhase(value) {
    const next = phaseName(value);
    if (!['menu', 'countdown', 'racing', 'paused', 'finished'].includes(next) || phase === next) return;
    const previous = phase;
    phase = next;
    root.dataset.phase = phase;
    hidden('menu', phase !== 'menu');
    hidden('hud', !['countdown', 'racing', 'paused'].includes(phase));
    hidden('pause', phase !== 'paused');
    hidden('results', phase !== 'finished');
    root.querySelector('[data-action="pause"]').hidden = !['countdown', 'racing'].includes(phase);
    if (goTimer) { clearTimeout(goTimer); timers.delete(goTimer); }
    hidden('countdown', phase !== 'countdown');
    if (phase === 'racing' && previous === 'countdown') {
      text('countdown-number', 'GO!'); text('countdown-label', 'CATCH THE COAST'); hidden('countdown', false);
      goTimer = later(() => hidden('countdown', true), 720);
    }
    if (phase === 'countdown') { text('countdown-label', 'READY, LITTLE RACER?'); text('countdown-number', '3'); }
    if (phase !== 'racing' && phase !== 'countdown') releaseTouch();
    if (phase === 'menu' || phase === 'finished') closeDialog(false);
    if (phase === 'countdown') root.querySelector(':focus')?.blur();
    if (phase === 'finished') { resultsSignature = ''; renderResults(latestSnapshot); }
    if (phase === 'paused' && !elements.dialog.open) later(() => { if (phase === 'paused' && !elements.dialog.open) root.querySelector('[data-action="resume"]').focus({ preventScroll: true }); }, 0);
  }
  function normalize(raw = {}) {
    if (!raw || typeof raw !== 'object') raw = {};
    const state = { ...raw, ...(raw.state || raw.raceState || {}) };
    const racers = Array.isArray(first(state.racers, raw.racers, state.players)) ? first(state.racers, raw.racers, state.players) : [];
    const player = (state.player && typeof state.player === 'object' ? state.player : null) || racers.find((racer) => racer.isPlayer || racer.id === 'player') || {};
    return { ...state, racers, player,
      phase: phaseName(first(state.phase, state.status, phase)),
      position: finite(first(state.position, state.place, state.rank, player.rank, player.place), 1),
      totalRacers: finite(first(state.totalRacers, state.racerCount, racers.length || undefined), 8),
      lap: finite(first(state.lap, state.currentLap, player.lap), 1),
      totalLaps: finite(first(state.totalLaps, state.lapCount), 3),
      elapsed: finite(first(state.elapsed, state.raceTime, state.elapsedTime, state.time)),
      speed: finite(first(state.speed, state.speedKmh, player.speedKmh, player.speed)),
      coins: finite(first(state.coins, state.coinCount, player.coins)),
      item: first(state.item, state.currentItem, player.item),
      driftCharge: finite(first(state.driftCharge, state.drift?.charge, player.driftCharge)),
      boost: first(state.boost, state.boostTime, player.boost, 0),
    };
  }
  let lastItem = null;
  function update(raw = {}) {
    const snapshot = normalize(raw);
    latestSnapshot = snapshot;
    if (snapshot.phase) setPhase(snapshot.phase);
    const place = Math.max(1, Math.round(snapshot.position));
    text('position', place); text('ordinal', ordinal(place)); text('total-racers', snapshot.totalRacers);
    const lap = clamp(Math.floor(snapshot.lap), 1, Math.max(1, snapshot.totalLaps));
    text('lap', lap); text('total-laps', snapshot.totalLaps);
    [...elements['lap-dots'].children].forEach((dot, index) => dot.classList.toggle('is-complete', index < lap));
    text('time', timeText(snapshot.elapsed)); text('coins', String(Math.floor(snapshot.coins)).padStart(2, '0'));
    const speed = Math.max(0, Math.round(snapshot.speed));
    text('speed', speed);
    elements['speed-arc'].setAttribute('stroke-dashoffset', String(100 - clamp(speed / finite(options.maxSpeed, 180), 0, 1) * 100));
    const charge = clamp(snapshot.driftCharge > 1 ? snapshot.driftCharge / 100 : snapshot.driftCharge, 0, 1);
    const boosting = typeof snapshot.boost === 'object' ? finite(first(snapshot.boost.remaining, snapshot.boost.time)) > 0 : finite(snapshot.boost) > 0;
    elements['drift-fill'].style.transform = `scaleX(${boosting ? 1 : charge})`;
    elements['drift-meter'].setAttribute('aria-valuenow', String(Math.round(charge * 100)));
    elements['drift-meter'].classList.toggle('is-charged', charge >= 0.66);
    root.classList.toggle('is-boosting', boosting);
    text('drift-label', boosting ? 'ISLAND TURBO' : 'DRIFT CHARGE');
    text('boost-label', boosting ? 'BOOST!' : charge >= 0.66 ? 'RELEASE!' : charge > 0.05 ? 'CHARGING' : `HOLD ${options.controls?.drift || 'SHIFT'}`);
    const item = snapshot.item;
    const itemKey = item && item !== 'none' ? String(typeof item === 'object' ? first(item.type, item.kind, item.id, item.name, 'item') : item) : '';
    if (itemKey !== lastItem) {
      lastItem = itemKey;
      const itemNames = { boost: '椰风加速', turbo: '椰风加速', mushroom: '椰风加速', shield: '泡泡护盾', bubble: '泡泡护盾', shell: '追风飞弹', rocket: '追风飞弹', fish: '飞鱼冲刺', banana: '小心打滑', coconut: '椰子出击', oil: '小心打滑' };
      const itemName = itemKey ? (typeof item === 'object' && item.label) || itemNames[itemKey.toLowerCase()] || '海岛道具' : '拾取道具';
      elements['item-icon'].innerHTML = icon(/shield|bubble/.test(itemKey) ? 'shield' : /fish/.test(itemKey) ? 'fish' : 'bolt');
      elements['item-button'].disabled = !itemKey;
      elements['item-button'].classList.toggle('has-item', Boolean(itemKey));
      elements['item-button'].setAttribute('aria-label', itemKey ? `使用${itemName}` : '尚未获得道具');
      text('item-label', itemName);
    }
    if (phase === 'countdown') { const count = Math.ceil(finite(first(snapshot.countdown, snapshot.countdownRemaining), 3)); text('countdown-number', count > 0 ? count : 'GO!'); }
    if (phase === 'finished') renderResults(snapshot);
    const points = first(snapshot.mapPoints, snapshot.track?.mapPoints);
    if (points || mapData.length) drawMap(points || mapSource, snapshot.racers);
  }
  function renderResults(snapshot) {
    const rawResults = first(snapshot.results?.standings, snapshot.results?.racers, snapshot.results);
    const entries = (Array.isArray(rawResults) && rawResults.length ? rawResults : snapshot.racers || []).map((entry, index) => typeof entry === 'object' && entry ? { ...entry, _index: index } : { name: String(entry), _index: index });
    if (!Array.isArray(rawResults) || !rawResults.length) entries.sort((a, b) => {
      const rankA = first(a.rank, a.place, typeof a.position === 'number' ? a.position : undefined);
      const rankB = first(b.rank, b.place, typeof b.position === 'number' ? b.position : undefined);
      if (rankA !== undefined && rankB !== undefined) return finite(rankA) - finite(rankB);
      if (a.finished !== b.finished) return a.finished ? -1 : 1;
      if (a.finishTime && b.finishTime) return a.finishTime - b.finishTime;
      return finite(b.progress) - finite(a.progress);
    });
    const player = entries.find((entry) => entry.isPlayer || entry.id === 'player') || snapshot.player || {};
    const place = Math.max(1, Math.round(finite(first(player.rank, player.place, typeof player.position === 'number' ? player.position : undefined, snapshot.position), 1)));
    const finishTime = first(snapshot.finishTime, player.finishTime, player.time, snapshot.elapsed);
    const bestLap = first(snapshot.bestLap, snapshot.bestLapTime, player.bestLap, player.bestLapTime);
    const signature = JSON.stringify([entries.slice(0, 3).map((entry) => [entry.id, entry.characterId, entry.name, entry.finishTime, entry.time, entry.estimated]), place, finishTime, snapshot.coins, bestLap]);
    if (signature === resultsSignature) return;
    resultsSignature = signature;
    text('result-message', place === 1 ? '冠军，喵！这片海岸为你欢呼。' : place <= 3 ? '登上领奖台！今天的海风格外甜。' : '漂亮完赛！下一场，再快猫一步。');
    text('result-place', place); text('result-ordinal', ordinal(place)); text('result-time', timeText(finishTime)); text('result-coins', snapshot.coins ?? player.coins ?? 0);
    hidden('best-lap-wrap', !(finite(bestLap) > 0)); text('best-lap', timeText(bestLap));
    elements.podium.innerHTML = entries.length ? [1, 0, 2].filter((index) => entries[index]).map((index) => {
      const entry = entries[index];
      const character = characters.find((candidate) => candidate.id === entry.characterId || candidate.id === entry.id) || characters.find((candidate) => candidate.id === selected);
      const isPlayer = entry.isPlayer || entry.id === 'player';
      const entryTime = first(entry.finishTime, entry.time);
      return `<div class="ak-podium-place ak-podium-${index + 1}${isPlayer ? ' is-player' : ''}">${index === 0 ? `<span class="ak-podium-crown">${icon('trophy')}</span>` : ''}<span class="ak-podium-cat">${portrait(character.id)}</span><strong>${escapeHTML(entry.name || character.name)}${isPlayer ? '<small>YOU</small>' : ''}</strong><span class="ak-podium-time">${entryTime !== undefined && entryTime !== null && finite(entryTime) > 0 ? `${entry.estimated ? '≈ ' : ''}${timeText(entryTime)}` : entry.finished === false ? 'RACING' : '—'}</span><span class="ak-podium-step"><b>0${index + 1}</b><i>${ordinal(index + 1)}</i></span></div>`;
    }).join('') : '<p class="ak-results-pending">等待比赛成绩…</p>';
  }
  function xy(point) {
    const position = point?.position || point?.pos || point || {};
    return Array.isArray(position) ? [finite(position[0]), finite(position.length > 2 ? position[2] : position[1])] : [finite(position.x), finite(first(position.z, position.y))];
  }
  function drawMap(points, racers = []) {
    if (Array.isArray(points) && points.length > 1 && (points !== mapSource || points.length !== mapData.length)) {
      mapSource = points; mapData = points.map(xy);
      const xs = mapData.map((point) => point[0]); const zs = mapData.map((point) => point[1]);
      const minX = Math.min(...xs); const maxX = Math.max(...xs); const minZ = Math.min(...zs); const maxZ = Math.max(...zs);
      const scale = Math.min(152 / Math.max(1, maxX - minX), 115 / Math.max(1, maxZ - minZ));
      mapTransform = ([x, z]) => [90 + (x - (minX + maxX) / 2) * scale, 72 - (z - (minZ + maxZ) / 2) * scale];
      const coords = mapData.map(mapTransform);
      const d = `${coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join('')}Z`;
      elements['map-path'].setAttribute('d', d); elements['map-outline'].setAttribute('d', d);
      const [x, y] = coords[0]; const next = coords[1]; const angle = Math.atan2(next[1] - y, next[0] - x) + Math.PI / 2;
      elements['map-grid'].setAttribute('d', `M${x - Math.cos(angle) * 6},${y - Math.sin(angle) * 6}L${x + Math.cos(angle) * 6},${y + Math.sin(angle) * 6}`);
      mapLastTime = -Infinity;
    }
    if (!mapTransform || !Array.isArray(racers)) return;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - mapLastTime < 45 && racers.length === mapDotCount) return;
    mapLastTime = now;
    if (racers.length !== mapDotCount) {
      mapDotCount = racers.length;
      elements['map-racers'].replaceChildren();
      mapDots = racers.map(() => { const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); elements['map-racers'].append(dot); return dot; });
    }
    let playerDot;
    racers.forEach((racer, index) => {
      let point;
      if (racer.position || racer.pos || racer.x !== undefined) point = xy(racer);
      else { const u = ((finite(first(racer.u, racer.progress)) % 1) + 1) % 1; const f = u * mapData.length; const a = mapData[Math.floor(f) % mapData.length]; const b = mapData[(Math.floor(f) + 1) % mapData.length]; point = [a[0] + (b[0] - a[0]) * (f % 1), a[1] + (b[1] - a[1]) * (f % 1)]; }
      const [x, y] = mapTransform(point); const player = racer.isPlayer || racer.id === 'player'; const dot = mapDots[index];
      dot.setAttribute('cx', String(clamp(x, 6, 174))); dot.setAttribute('cy', String(clamp(y, 6, 138)));
      dot.setAttribute('r', player ? '5.5' : '3.4'); dot.setAttribute('fill', player ? '#f47760' : NAVY); dot.setAttribute('stroke', '#fff8e9'); dot.setAttribute('stroke-width', player ? '2' : '1.1');
      if (player) playerDot = dot;
    });
    if (playerDot && elements['map-racers'].lastChild !== playerDot) elements['map-racers'].append(playerDot);
  }

  function handleClick(event) {
    const characterButton = event.target.closest('[data-character]');
    if (characterButton && phase === 'menu') { selectCharacter(characterButton.dataset.character); return; }
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    switch (button.dataset.action) {
      case 'start':
        if (loading || startBusy || phase !== 'menu') return;
        startBusy = true; button.disabled = true; invoke('onStart', selected);
        later(() => { startBusy = false; button.disabled = loading; }, 450); break;
      case 'pause': if (phase === 'racing' || phase === 'countdown') invoke('onPause'); break;
      case 'resume': invoke('onResume'); break;
      case 'restart': closeDialog(false); invoke('onRestart', selected); break;
      case 'menu': closeDialog(false); invoke('onMenu'); break;
      case 'mute': setMuted(!muted); invoke('onMute', muted); break;
      case 'help': openDialog('help'); break;
      case 'settings': openDialog('settings'); break;
      case 'close-dialog': closeDialog(); break;
      case 'fullscreen': invoke('onFullscreen'); break;
      case 'camera': invoke('onCamera'); break;
      case 'photo': closeDialog(); invoke('onPhoto'); break;
      case 'item': pulseItem(); break;
    }
  }
  function pointerDown(event) {
    const button = event.target.closest('[data-touch]');
    if (!button || !['racing', 'countdown'].includes(phase)) return;
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    pointers.set(event.pointerId, button.dataset.touch); syncTouch();
  }
  function pointerUp(event) { if (pointers.delete(event.pointerId)) syncTouch(); }
  function onVisibility() { if (document.hidden) releaseTouch(); }
  root.addEventListener('click', handleClick);
  root.addEventListener('pointerdown', pointerDown);
  root.addEventListener('pointerup', pointerUp);
  root.addEventListener('pointercancel', pointerUp);
  root.addEventListener('lostpointercapture', pointerUp);
  root.addEventListener('contextmenu', (event) => { if (event.target.closest('[data-touch]')) event.preventDefault(); });
  elements.quality.addEventListener('change', () => invoke('onQuality', elements.quality.value));
  elements.dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(); });
  elements.dialog.addEventListener('click', (event) => { if (event.target === elements.dialog) { const rect = elements.dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(); } });
  elements.dialog.addEventListener('keydown', (event) => { event.stopPropagation(); if (event.key === 'Escape') { event.preventDefault(); closeDialog(); } });
  window.addEventListener('blur', releaseTouch);
  window.addEventListener('pointerup', pointerUp);
  document.addEventListener('visibilitychange', onVisibility);
  // Only present settings that the parent actually implements.
  for (const [setting, callback] of Object.entries({ sound: 'onMute', quality: 'onQuality', camera: 'onCamera', photo: 'onPhoto', fullscreen: 'onFullscreen' })) root.querySelector(`[data-setting="${setting}"]`).hidden = typeof options[callback] !== 'function';
  elements.mute.hidden = typeof options.onMute !== 'function';
  const hasSettings = ['onMute', 'onQuality', 'onCamera', 'onPhoto', 'onFullscreen'].some((key) => typeof options[key] === 'function');
  root.querySelectorAll('[data-action="settings"]').forEach((button) => { button.hidden = !hasSettings; });
  let initialQuality = options.quality;
  if (!initialQuality) { try { initialQuality = localStorage.getItem('aloha-quality'); } catch { /* Storage may be unavailable. */ } }
  initialQuality ||= window.innerWidth < 800 ? 'balanced' : 'high';
  elements.quality.value = ({ medium: 'balanced', ultra: 'high' }[initialQuality] || initialQuality);
  if (options.controls?.drift) for (const key of ['drift-key', 'help-drift-key']) text(key, options.controls.drift);
  if (options.controls?.item) for (const key of ['item-key', 'item-hint-key', 'help-item-key']) text(key, options.controls.item);
  root.classList.toggle('ak-touch-enabled', options.touch === true || (options.touch !== false && (navigator.maxTouchPoints > 0 || window.matchMedia?.('(pointer: coarse)').matches)));
  selectCharacter(selected, false); setMuted(muted); touchInput(); setLoading(first(options.loadingProgress, 0));
  const dispose = () => {
    timers.forEach(clearTimeout); timers.clear(); releaseTouch(); closeDialog(false);
    window.removeEventListener('blur', releaseTouch); window.removeEventListener('pointerup', pointerUp); document.removeEventListener('visibilitychange', onVisibility);
    root.removeEventListener('click', handleClick); root.removeEventListener('pointerdown', pointerDown); root.removeEventListener('pointerup', pointerUp); root.removeEventListener('pointercancel', pointerUp); root.removeEventListener('lostpointercapture', pointerUp);
    delete root.__alohaUIDispose;
  };
  root.__alohaUIDispose = dispose;
  return { update, setPhase, setLoading, setMuted, setToast, drawMap, getSelectedCharacter: () => selected, dispose };
}
