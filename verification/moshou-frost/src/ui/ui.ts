import type { GameState } from "../core/state";
import { SKILLS, QUEST } from "../data/content";
import { Minimap, type MapEntity } from "./minimap";
export interface UIActions {
  start: (cont: boolean) => void;
  skill: (id: string) => void;
  accept: () => void;
  complete: () => void;
  supply: () => void;
  quality: (s: string) => void;
  volume: (n: number) => void;
  mute: () => boolean;
  photo: () => void;
  screenshot: () => void;
}
const icon = (name: string) => `/assets/ui/${name}.png`;
export class UI {
  root: HTMLElement;
  modal = "";
  photo = false;
  map = new Minimap();
  actions!: UIActions;
  private toastTimer = 0;
  private lastRender = 0;
  private help = true;
  private failed = false;
  quality = "high";
  volume = 0.4;
  constructor(public state: GameState) {
    this.root = document.getElementById("app")!;
    this.root.innerHTML = `
  <div id="loading" class="loading"><div class="crest">✦</div><p class="eyebrow">FROST VALE · REBORN</p><h1>霜雾谷</h1><div class="loading-track"><i id="loading-fill"></i></div><p id="loading-status">正在唤醒艾尔文森林…</p><span class="loading-note">经典之境 · 非官方创作演示</span></div>
  <div id="menu" class="menu hidden"><div class="menu-shade"></div><section class="menu-content"><div class="menu-kicker"><span></span> 艾尔文森林 · 人类的起点</div><h1>霜雾谷<span>FROST VALE</span></h1><p class="menu-story">晨光穿过林梢，钟声越过修道院的红瓦。<br>每一段传奇，都从一次平凡的启程开始。</p><div class="menu-rule">✧</div><button class="gold-button start-button" data-action="start">开始冒险 <span>›</span></button><button id="continue" class="continue-button hidden" data-action="continue">继续上次旅程 <span>↗</span></button><p class="menu-controls">W A S D 移动 &nbsp; · &nbsp; 鼠标拖动视角 &nbsp; · &nbsp; E 交互</p></section><footer class="menu-footer"><span>单机探索 · 本地存档 · 键鼠操作</span><span>《魔兽世界》非官方致敬 · 不使用原版游戏素材</span></footer></div>
  <main id="hud" class="hud hidden">
   <section class="unit-frame player-frame"><div class="portrait-frame"><img src="${icon("portrait")}" alt="人类战士头像"><span class="level-badge" id="player-level">1</span></div><div class="unit-info"><div class="unit-name">霜雾谷冒险者 <span>人类 · 战士</span></div><div class="health-track"><i id="health-fill"></i><span id="health-text">100 / 100</span></div><div class="rage-track"><i id="rage-fill"></i><span id="rage-text">0 / 100</span></div></div></section>
   <section id="target-frame" class="unit-frame target-frame hidden"><div class="target-emblem"><img src="${icon("wolf-portrait")}" alt="森林狼"></div><div class="unit-info"><div id="target-name" class="unit-name">森林狼 <span>野兽 · 1级</span></div><div class="health-track enemy-health"><i id="target-health"></i><span id="target-text"></span></div><small id="target-range">选择一个目标</small></div></section>
   <div class="world-heading"><span class="heading-rule"></span><span>艾尔文森林</span><span class="heading-rule"></span><small>ELWYNN FOREST</small></div>
   <section class="minimap-group"><button class="map-location" data-action="map">霜雾谷修道院 <span>⌄</span></button><button class="minimap-ring" data-action="map" aria-label="打开区域地图 M"><canvas id="minimap" width="256" height="256"></canvas><span class="compass north">N</span><span class="compass east">E</span><span class="compass west">W</span><span class="compass south">S</span><span class="map-open">M</span></button><div class="map-toolbar"><button data-action="sound" id="sound-button" aria-label="切换环境声音">♫</button><span id="coordinates">00 · 00</span><button data-action="settings" aria-label="设置">⚙</button></div></section>
   <aside class="quest-tracker"><header><span>任务日志</span><button data-action="quest" aria-label="打开任务日志 L">L</button></header><div class="tracker-content" id="tracker-content"></div></aside>
   <div id="discovery" class="discovery hidden"><p>发现</p><h2>霜雾谷修道院</h2><span>FROST VALE ABBEY</span><i></i></div>
   <div id="labels" class="labels"></div><div id="damage-numbers" class="damage-numbers"></div>
   <div class="game-log"><div class="log-title"><span>旅途见闻</span><i></i></div><div id="log-lines"></div></div>
   <div class="control-hints" id="control-hints"><span><kbd>WASD</kbd> 移动</span><span><kbd>拖动</kbd> 视角</span><span><kbd>Tab</kbd> 目标</span><span><kbd>空格</kbd> 跳跃</span><button data-action="help">收起</button></div>
   <div id="interaction" class="interaction hidden"><kbd>E</kbd><div><strong id="interaction-name"></strong><small id="interaction-kind"></small></div></div>
   <section class="action-dock"><div class="dock-wings left">❧</div><button class="utility-slot" data-action="quest" aria-label="任务日志 L"><img src="${icon("book")}" alt="任务日志"><kbd>L</kbd></button><div class="skill-tray">${SKILLS.map((s) => `<button class="skill-slot" data-skill="${s.id}" aria-label="${s.name}（${s.key}）"><img src="${icon(s.icon)}" alt="${s.name}"><span class="cooldown-mask"></span><span class="cooldown-number"></span><kbd>${s.key}</kbd>${s.id === "potion" ? '<span class="item-count" id="potion-count">3</span>' : ""}</button>`).join("")}</div><button class="utility-slot" data-action="bag" aria-label="打开背包 B"><img src="${icon("bag")}" alt="背包"><kbd>B</kbd></button><div class="dock-wings right">❧</div><div class="xp-track"><i id="xp-fill"></i><span id="xp-text">等级 1 · 0 / 100 经验</span></div></section>
   <div class="status-corner"><button data-action="photo">摄影模式 <kbd>P</kbd></button><span><i></i><b id="fps">—</b> FPS</span></div>
  </main>
  <div id="photo-ui" class="photo-ui hidden"><span>摄影模式 · 拖动调整视角，滚轮缩放</span><button data-action="screenshot">保存画面</button><button data-action="photo">返回游戏 <kbd>P</kbd></button></div>
  <div id="modal-backdrop" class="modal-backdrop hidden"><section id="modal" class="panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"></section></div>
  <div id="tooltip" class="tooltip hidden"></div><div id="toast" class="toast hidden"></div><div id="damage-vignette"></div>`;
    this.root.addEventListener("click", (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-action],[data-skill]",
      );
      if (!el) return;
      const skill = el.dataset.skill;
      if (skill) {
        this.actions.skill(skill);
        if (this.modal === "bag") this.open("bag", true);
        return;
      }
      this.handle(el.dataset.action!);
    });
    this.root.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement;
      if (el.id === "volume") {
        this.volume = Number(el.value) / 100;
        this.actions.volume(this.volume);
      }
    });
    this.root.addEventListener("change", (e) => {
      const el = e.target as HTMLSelectElement;
      if (el.id === "quality") {
        this.quality = el.value;
        this.actions.quality(el.value);
      }
    });
    this.root.querySelectorAll<HTMLElement>("[data-skill]").forEach((el) => {
      el.addEventListener("pointerenter", () => {
        const skill = SKILLS.find((s) => s.id === el.dataset.skill)!;
        const tip = this.el("tooltip");
        tip.innerHTML = `<strong>${skill.name}</strong><span>${skill.description}</span><small>${skill.cost ? skill.cost + " 怒气 · " : ""}${skill.cooldown} 秒冷却</small>`;
        tip.style.left = `${Math.min(innerWidth - 245, el.getBoundingClientRect().left)}px`;
        tip.style.bottom = "134px";
        tip.classList.remove("hidden");
      });
      el.addEventListener("pointerleave", () =>
        this.el("tooltip").classList.add("hidden"),
      );
    });
    this.el("modal").addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        this.el("modal").querySelectorAll<HTMLElement>("button,input,select"),
      );
      const first = nodes[0],
        last = nodes.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    });
    this.state.listeners.add(() => this.renderState());
  }
  el(id: string) {
    return document.getElementById(id)!;
  }
  loading(text: string, n: number) {
    if (this.failed) return;
    this.el("loading-status").textContent = text;
    this.el("loading-fill").style.width = `${n}%`;
  }
  ready() {
    if (this.failed) return;
    this.el("loading").classList.add("fade-out");
    setTimeout(() => this.el("loading").classList.add("hidden"), 650);
    this.el("menu").classList.remove("hidden");
    this.el("continue").classList.toggle("hidden", !this.state.load());
  }
  error(text: string) {
    this.failed = true;
    this.el("menu").classList.add("hidden");
    this.el("hud").classList.add("hidden");
    this.el("loading").classList.remove("hidden", "fade-out");
    this.el("loading-status").textContent = text;
    if (!this.el("loading").querySelector("button"))
      this.el("loading-status").insertAdjacentHTML(
        "afterend",
        '<button class="gold-button" onclick="location.reload()">重新加载</button>',
      );
  }
  enter() {
    this.el("menu").classList.add("hidden");
    this.el("hud").classList.remove("hidden");
    this.renderState();
    setTimeout(() => {
      this.el("discovery").classList.remove("hidden");
      setTimeout(() => this.el("discovery").classList.add("leaving"), 4000);
      setTimeout(() => this.el("discovery").classList.add("hidden"), 5500);
    }, 700);
  }
  handle(action: string) {
    if (action === "start" || action === "continue") {
      this.actions.start(action === "continue");
      return;
    }
    if (action === "close") {
      this.close();
      return;
    }
    if (action === "accept") {
      this.actions.accept();
      this.close();
      return;
    }
    if (action === "complete") {
      this.actions.complete();
      this.close();
      return;
    }
    if (action === "supply") {
      this.actions.supply();
      this.close();
      return;
    }
    if (action === "photo") {
      this.actions.photo();
      return;
    }
    if (action === "screenshot") {
      this.actions.screenshot();
      return;
    }
    if (action === "sound") {
      const enabled = this.actions.mute();
      this.el("sound-button").classList.toggle("muted", !enabled);
      this.toast(enabled ? "环境声音已开启" : "环境声音已关闭");
      return;
    }
    if (action === "help") {
      this.help = !this.help;
      this.el("control-hints").classList.toggle("collapsed", !this.help);
      this.el("control-hints").querySelector("button")!.textContent = this.help
        ? "收起"
        : "展开";
      return;
    }
    if (action === "reset") {
      this.open("reset");
      return;
    }
    if (action === "confirm-reset") {
      this.state.started = false;
      try {
        localStorage.removeItem("northshire.save.v1");
      } catch {}
      location.reload();
      return;
    }
    if (action === "respawn") {
      this.close();
      window.dispatchEvent(new Event("northshire-respawn"));
      return;
    }
    if (action === "save") {
      this.toast(
        this.state.save()
          ? "旅程已保存在此浏览器"
          : "保存失败：浏览器存储不可用",
      );
      return;
    }
    this.open(action);
  }
  open(type: string, refresh = false) {
    if (!this.state.started || (this.state.dead && type !== "death")) return;
    if (this.modal === type && !refresh) {
      this.close();
      return;
    }
    this.modal = type;
    this.state.paused = true;
    this.el("modal-backdrop").classList.remove("hidden");
    this.el("tooltip").classList.add("hidden");
    let title = "",
      body = "",
      footer = "";
    const d = this.state.data;
    if (type === "quest" || type === "npc") {
      title = type === "npc" ? "修道院守卫" : "任务日志";
      const text =
        d.quest === "available"
          ? QUEST.description
          : d.quest === "complete"
            ? QUEST.complete
            : QUEST.active;
      body = `<div class="quest-title"><span>◆</span><div><small>${QUEST.subtitle}</small><h3>${QUEST.title}</h3></div></div><p class="quest-description">${text}</p><div class="objectives"><h4>任务目标</h4><p class="${d.kills >= 3 ? "done" : ""}"><span>${d.kills >= 3 ? "✓" : "◇"}</span> 清理森林狼 <b>${d.kills} / 3</b></p><p class="${d.herbs >= 2 ? "done" : ""}"><span>${d.herbs >= 2 ? "✓" : "◇"}</span> 采集宁神花 <b>${d.herbs} / 2</b></p></div><div class="quest-reward"><h4>任务奖励</h4><div><img src="${icon("coin")}" alt="奖励">${QUEST.reward}</div></div>`;
      if (type === "npc" && d.quest === "available")
        footer =
          '<button class="gold-button" data-action="accept">接受任务</button>';
      else if (type === "npc" && d.quest === "return")
        footer =
          '<button class="gold-button" data-action="complete">完成任务</button>';
      else
        footer = `<button class="gold-button" data-action="close">${d.quest === "complete" ? "继续探索" : d.quest === "available" ? "前往修道院守卫处" : "继续旅程"}</button>`;
    } else if (type === "quartermaster") {
      title = "修道院军需官";
      body =
        '<div class="quest-title"><span>✦</span><h3>歇一歇，冒险者。</h3></div><p class="quest-description">这里始终为霜雾谷的旅人留着一处歇脚的地方。休整可以恢复全部生命，并将随身的治疗药水补充至三瓶。</p>';
      footer =
        '<button class="gold-button" data-action="supply">休整并补给</button>';
    } else if (type === "bag") {
      title = "行囊与装备";
      const items = [
        { icon: "sword", name: "霜雾谷卫队长剑", count: 1 },
        { icon: "shield", name: "旧式卫队盾牌", count: 1 },
        { icon: "potion", name: "治疗药水", count: d.potions },
        { icon: "herb", name: "宁神花", count: d.herbs },
      ];
      body = `<div class="inventory-profile"><img src="${icon("portrait")}" alt="战士"><div><h3>霜雾谷冒险者</h3><span>等级 ${d.level} · 人类战士</span><p>生命 ${Math.ceil(d.hp)} / ${this.state.maxHp}</p></div></div><div class="inventory-grid">${Array.from(
        { length: 16 },
        (_, i) => {
          const it = items[i];
          return it && it.count
            ? `<button class="inventory-slot" title="${it.name}" ${it.icon === "potion" ? 'data-skill="potion"' : ""}><img src="${icon(it.icon)}" alt="${it.name}"><span>${it.count}</span></button>`
            : '<div class="inventory-slot empty" aria-label="空背包格"></div>';
        },
      ).join(
        "",
      )}</div><div class="bag-footer"><span>点击药水可使用 · 初始武器已装备</span><b>${d.gold} <i>铜币</i></b></div>`;
      footer =
        '<button class="gold-button" data-action="close">收起行囊</button>';
    } else if (type === "map") {
      title = "霜雾谷谷地";
      body =
        '<p class="map-subtitle">艾尔文森林 · 区域探索地图</p><canvas id="large-map" width="660" height="560"></canvas>';
      footer =
        '<button class="gold-button" data-action="close">返回旅程</button>';
    } else if (type === "settings") {
      title = "旅途设置";
      body = `<div class="settings-row"><div><strong>画面品质</strong><small>调整分辨率、阴影和远景草丛</small></div><select id="quality"><option value="high">高画质</option><option value="balanced">均衡</option><option value="low">流畅</option></select></div><div class="settings-row"><div><strong>声音音量</strong><small>森林环境与动作音效</small></div><input aria-label="音量" id="volume" type="range" min="0" max="100" value="${this.volume * 100}"></div><div class="settings-actions"><button data-action="save">保存旅程</button><button data-action="photo">摄影模式</button><button data-action="reset">重置存档</button></div><div class="key-guide"><h4>冒险指南</h4><p><kbd>WASD</kbd> 移动 <kbd>Shift</kbd> 奔跑 <kbd>空格</kbd> 跳跃</p><p><kbd>鼠标拖动</kbd> 环绕视角 <kbd>滚轮</kbd> 缩放</p><p><kbd>左键 / Tab</kbd> 选择目标 <kbd>1–4</kbd> 使用技能</p><p><kbd>E</kbd> 对话 / 采集 / 拾取 <kbd>B</kbd> 背包</p><p><kbd>L</kbd> 任务 <kbd>M</kbd> 地图 <kbd>P</kbd> 摄影</p><p><kbd>Esc</kbd> 关闭窗口 / 暂停游戏</p></div><p class="legal-note">本作品为单机非官方致敬演示。任务为原创，场景为依据参考进行的艺术重建，不代表暴雪娱乐官方产品。</p>`;
      footer =
        '<button class="gold-button" data-action="close">返回游戏</button>';
    } else if (type === "reset") {
      title = "重新开始旅程";
      body =
        '<p class="quest-description">这将删除此浏览器内的霜雾谷存档。等级、任务与物品进度无法恢复。</p>';
      footer =
        '<button class="subtle-button" data-action="close">保留存档</button><button class="gold-button" data-action="confirm-reset">删除并重新开始</button>';
    } else if (type === "death") {
      title = "暂别战场";
      body =
        '<div class="death-mark">✦</div><h3 class="center">你的旅途还未结束</h3><p class="quest-description">修道院的守卫将护送你返回安全的庭院。已完成的任务进度会保留。</p>';
      footer =
        '<button class="gold-button" data-action="respawn">返回修道院</button>';
    }
    this.el("modal").className =
      "panel " +
      (type === "map" ? "map-panel" : "") +
      (type === "quest" || type === "npc" ? " parchment-panel" : "");
    this.el("modal").innerHTML =
      `<header class="panel-header"><h2 id="modal-title">${title}</h2>${type !== "death" ? '<button data-action="close" aria-label="关闭">×</button>' : ""}</header><div class="panel-body">${body}</div><footer class="panel-footer">${footer}</footer>`;
    if (type === "settings")
      (this.el("quality") as HTMLSelectElement).value = this.quality;
    const button = this.el("modal").querySelector<HTMLElement>("button");
    button?.focus({ preventScroll: true });
  }
  close() {
    if (this.modal === "death" && this.state.dead) return;
    this.modal = "";
    this.state.paused = this.photo;
    this.el("modal-backdrop").classList.add("hidden");
    (document.activeElement as HTMLElement)?.blur();
  }
  photoMode(enabled: boolean) {
    if (this.state.dead) return;
    this.photo = enabled;
    if (enabled) this.close();
    this.state.paused = enabled || !!this.modal;
    this.el("hud").classList.toggle("hidden", enabled);
    this.el("photo-ui").classList.toggle("hidden", !enabled);
  }
  toast(text: string) {
    clearTimeout(this.toastTimer);
    this.el("toast").textContent = text;
    this.el("toast").classList.remove("hidden");
    this.toastTimer = window.setTimeout(
      () => this.el("toast").classList.add("hidden"),
      2800,
    );
  }
  renderState() {
    const d = this.state.data;
    this.el("health-fill").style.width = `${(d.hp / this.state.maxHp) * 100}%`;
    this.el("health-text").textContent =
      `${Math.ceil(d.hp)} / ${this.state.maxHp}`;
    this.el("rage-fill").style.width = `${this.state.rage}%`;
    this.el("rage-text").textContent = `${Math.floor(this.state.rage)} / 100`;
    this.el("player-level").textContent = String(d.level);
    this.el("xp-fill").style.width = `${(d.xp / this.state.xpGoal) * 100}%`;
    this.el("xp-text").textContent =
      `等级 ${d.level} · ${d.xp} / ${this.state.xpGoal} 经验`;
    this.el("potion-count").textContent = String(d.potions);
    this.el("log-lines").innerHTML = this.state.logs
      .slice(-3)
      .map((t) => `<p>${t}</p>`)
      .join("");
    this.el("tracker-content").innerHTML =
      d.quest === "available"
        ? '<h3>旅途的开始</h3><p class="tracker-objective"><span>◇</span> 与修道院前的守卫交谈</p><small>沿着石路向前，寻找金色标记。</small>'
        : d.quest === "complete"
          ? '<h3><span class="quest-complete">✓</span> 霜雾谷的清晨</h3><p>林地恢复了宁静。</p><small>任务已完成 · 你可以继续探索或拍照。</small>'
          : `<h3>${QUEST.title}</h3><p class="tracker-objective ${d.kills >= 3 ? "done" : ""}"><span>${d.kills >= 3 ? "✓" : "◇"}</span> 森林狼 <b>${d.kills} / 3</b></p><p class="tracker-objective ${d.herbs >= 2 ? "done" : ""}"><span>${d.herbs >= 2 ? "✓" : "◇"}</span> 宁神花 <b>${d.herbs} / 2</b></p>${d.quest === "return" ? '<p class="return-objective">◆ 返回修道院守卫处</p>' : "<small>修道院东侧 · 东部林地</small>"}`;
  }
  interaction(name: string, kind = "") {
    this.el("interaction").classList.toggle("hidden", !name || !!this.modal);
    this.el("interaction-name").textContent = name;
    this.el("interaction-kind").textContent = kind;
  }
  frame(
    fps: number,
    player: MapEntity,
    yaw: number,
    enemies: MapEntity[],
    target: { hp: number; maxHp: number; distance: number } | null,
  ) {
    const now = performance.now();
    if (now - this.lastRender < 85) return;
    this.lastRender = now;
    this.el("fps").textContent = String(Math.round(fps));
    this.el("coordinates").textContent =
      `${Math.round((player.x + 80) / 1.6)} · ${Math.round((player.z + 100) / 2)}`;
    this.map.draw(
      this.el("minimap") as HTMLCanvasElement,
      player,
      yaw,
      enemies,
    );
    const large = document.getElementById(
      "large-map",
    ) as HTMLCanvasElement | null;
    if (large) this.map.draw(large, player, yaw, enemies, true);
    this.el("target-frame").classList.toggle("hidden", !target);
    if (target) {
      this.el("target-health").style.width =
        `${(target.hp / target.maxHp) * 100}%`;
      this.el("target-text").textContent =
        `${Math.ceil(target.hp)} / ${target.maxHp}`;
      this.el("target-range").textContent =
        target.hp <= 0
          ? "已击败 · E 拾取战利品"
          : `野兽 · 距离 ${target.distance.toFixed(1)} 米`;
    }
    for (const skill of SKILLS) {
      const el = this.root.querySelector<HTMLElement>(
        `[data-skill="${skill.id}"]`,
      )!;
      const left = Math.max(
        0,
        (this.state.cooldowns[skill.id] || 0) - this.state.time,
      );
      el.querySelector<HTMLElement>(".cooldown-mask")!.style.background = left
        ? `conic-gradient(rgba(0,0,0,.76) ${(left / skill.cooldown) * 360}deg, transparent 0)`
        : "none";
      el.querySelector<HTMLElement>(".cooldown-number")!.textContent =
        left > 0.1 ? Math.ceil(left).toString() : "";
      el.classList.toggle(
        "active",
        skill.id === "attack" && this.state.autoAttack,
      );
      el.classList.toggle(
        "unavailable",
        skill.cost > this.state.rage ||
          (skill.id === "potion" && !this.state.data.potions),
      );
    }
  }
  hurt() {
    const el = this.el("damage-vignette");
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }
}
