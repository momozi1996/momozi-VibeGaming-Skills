import { loadArt, W, H, clamp } from "./art.js";
import { Audio } from "./audio.js";
import { Game } from "./game.js";
import { CONFIG } from "./config.js";
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const canvas = $("#game"),
  ctx = canvas.getContext("2d", { alpha: false });
let theme = CONFIG.defaultTheme || Object.keys(CONFIG.themes)[0],
  game,
  stage = "loading",
  time = 0,
  last = performance.now(),
  hudTick = 0,
  toastTime = 0;
const themeKey = CONFIG.name + "-theme-" + location.pathname;
try {
  const saved = localStorage.getItem(themeKey);
  if (CONFIG.themes[saved]) theme = saved;
} catch {}
const audio = new Audio(),
  input = { keys: new Set(), pressed: new Set(), x: 0, y: 0 };
const api = {
  audio,
  toast(message) {
    $("#toast").textContent = message;
    $("#toast").style.opacity = 1;
    toastTime = 2.3;
  },
  finish(won, message) {
    stage = "result";
    audio.play(won ? "win" : "lose");
    input.keys.clear();
    input.pressed.clear();
    $("#overlay").innerHTML =
      `<section class="dialog"><div class="eyebrow">${won ? "A LITTLE WORLD, WELL LOVED" : "EVERY ADVENTURE BEGINS AGAIN"}</div><h2>${won ? "一段旅程，圆满落幕" : "再试一次，也很浪漫"}</h2><p>${esc(message)}</p><button class="primary" data-do="restart">再玩一次 ↗</button><button class="secondary" data-do="menu">回到扉页</button></section>`;
  },
  choose(options, callback) {
    stage = "choice";
    input.keys.clear();
    input.pressed.clear();
    $("#overlay").innerHTML =
      `<section class="dialog"><div class="eyebrow">CHOOSE YOUR LITTLE MIRACLE</div><h2>星光，回应了你</h2><p>挑选一份祝福，让下一段旅途有所不同。</p><div class="choices">${options.map((o, i) => `<button class="choice" data-choice="${i}"><i>${esc(o.icon || "✦")}</i><b>${esc(o.title)}</b><span>${esc(o.text)}</span></button>`).join("")}</div></section>`;
    $("#overlay")
      .querySelectorAll("[data-choice]")
      .forEach(
        (b) =>
          (b.onclick = () => {
            callback(Number(b.dataset.choice));
            stage = "playing";
            $("#overlay").innerHTML = "";
            audio.play("build");
          }),
      );
  },
  setToolbar(items) {
    $("#toolbar").innerHTML = items
      .map(
        (o) =>
          `<button data-action="${esc(o.id)}" class="${o.active ? "active" : ""}" ${o.disabled ? "disabled" : ""}>${esc(o.label)}</button>`,
      )
      .join("");
  },
  get playing() {
    return stage === "playing";
  },
};
function construct() {
  game = new Game(CONFIG.themes[theme], api);
  document.title = CONFIG.themes[theme].title + " · " + CONFIG.name;
  $("#brand-title").textContent = CONFIG.themes[theme].title;
  $("#brand-tag").textContent = CONFIG.tag;
}
function menu() {
  stage = "menu";
  construct();
  $("#hud").hidden = true;
  $("#toolbar").hidden = true;
  $("#hint").hidden = true;
  $("#touch").hidden = true;
  $("#overlay").innerHTML =
    `<section class="menu"><div class="eyebrow">${esc(CONFIG.tag)}</div><h1>${esc(game.p.title)}</h1><div class="subtitle">${esc(game.p.subtitle)}</div><p class="description">${esc(game.p.description)}</p><div class="theme-pills">${Object.entries(
      CONFIG.themes,
    )
      .map(
        ([k, v]) =>
          `<button data-theme="${esc(k)}" class="${theme === k ? "active" : ""}">${esc(v.label)}</button>`,
      )
      .join(
        "",
      )}</div><button class="primary" data-do="start">${esc(CONFIG.start || "启程，去看看 ↗")}</button>${game.hasSave?.() ? '<button class="secondary" data-do="continue">继续小日子</button>' : ""}<div class="controls">${esc(CONFIG.controls)}<br>本地美术 · 原创矢量世界 · 无需登录</div></section><div class="edition">A PLAYABLE LITTLE STORY<span>${esc(CONFIG.edition)}</span></div>`;
}
function start(resume = false) {
  audio.unlock();
  construct();
  if (resume) game.load?.();
  stage = "playing";
  $("#overlay").innerHTML = "";
  $("#hud").hidden = false;
  $("#toolbar").hidden = false;
  $("#hint").hidden = false;
  $("#hint").textContent = CONFIG.hint;
  $("#touch").hidden = !("ontouchstart" in window && CONFIG.movement);
  input.keys.clear();
  input.pressed.clear();
  game.start?.();
  hudTick = 1;
}
function pause() {
  if (stage !== "playing") return;
  stage = "paused";
  input.keys.clear();
  input.pressed.clear();
  input.x = input.y = 0;
  game.save?.();
  $("#overlay").innerHTML =
    '<section class="dialog"><div class="eyebrow">TAKE A LITTLE BREATH</div><h2>世界在这里等你</h2><p>歇一会儿，也别忘了抬头看风景。</p><button class="primary" data-do="resume">继续旅途 ↗</button><button class="secondary" data-do="menu">回到扉页</button></section>';
}
$("#overlay").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.theme) {
    theme = b.dataset.theme;
    try {
      localStorage.setItem(themeKey, theme);
    } catch {}
    menu();
    return;
  }
  switch (b.dataset.do) {
    case "start":
      if (
        game.hasSave?.() &&
        !confirm("开始新花园会替换当前主题的旧存档。确定开始吗？")
      )
        break;
      start();
      break;
    case "restart":
      start();
      break;
    case "continue":
      start(true);
      break;
    case "menu":
      game.save?.();
      menu();
      break;
    case "resume":
      stage = "playing";
      $("#overlay").innerHTML = "";
      break;
  }
});
$("#toolbar").addEventListener("click", (e) => {
  if (stage !== "playing") return;
  const b = e.target.closest("[data-action]");
  if (b) {
    audio.unlock();
    game.action(b.dataset.action);
  }
});
$("#pause").onclick = pause;
$("#sound").onclick = () => {
  audio.unlock();
  audio.muted = !audio.muted;
  $("#sound").textContent = audio.muted ? "♩" : "♪";
  $("#sound").setAttribute("aria-label", audio.muted ? "打开声音" : "静音");
};
$("#fullscreen").onclick = () => {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else
    $("#app")
      .requestFullscreen?.()
      .catch(() => api.toast("当前浏览器不支持全屏"));
};
window.addEventListener("keydown", (e) => {
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      e.code,
    )
  )
    e.preventDefault();
  if (e.code === "Escape") {
    if (stage === "paused") {
      stage = "playing";
      $("#overlay").innerHTML = "";
    } else pause();
    return;
  }
  if (stage !== "playing") return;
  if (!input.keys.has(e.code)) input.pressed.add(e.code);
  input.keys.add(e.code);
});
window.addEventListener("keyup", (e) => input.keys.delete(e.code));
window.addEventListener("blur", () => {
  input.keys.clear();
  input.pressed.clear();
  input.x = input.y = 0;
  pause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
});
window.addEventListener("beforeunload", () => {
  if (["playing", "paused"].includes(stage)) game?.save?.();
});
canvas.addEventListener("pointerdown", (e) => {
  if (stage !== "playing") return;
  audio.unlock();
  const r = canvas.getBoundingClientRect();
  game.click?.(
    ((e.clientX - r.left) / r.width) * W,
    ((e.clientY - r.top) / r.height) * H,
  );
});
let stickId = null;
const stick = $("#stick");
function stickMove(e) {
  if (e.pointerId !== stickId) return;
  const r = stick.getBoundingClientRect(),
    x = (e.clientX - r.left - r.width / 2) / (r.width * 0.35),
    y = (e.clientY - r.top - r.height / 2) / (r.height * 0.35);
  let l = Math.max(1, Math.hypot(x, y));
  input.x = x / l;
  input.y = y / l;
  stick.firstChild.style.transform = `translate(${input.x * 20}px,${input.y * 20}px)`;
}
stick.onpointerdown = (e) => {
  stickId = e.pointerId;
  stick.setPointerCapture(e.pointerId);
  stickMove(e);
};
stick.onpointermove = stickMove;
function release() {
  stickId = null;
  input.x = input.y = 0;
  stick.firstChild.style.transform = "";
}
stick.onpointerup = release;
stick.onpointercancel = release;
const touchAction = $("#touch-action");
touchAction.onpointerdown = (e) => {
  e.preventDefault();
  touchAction.setPointerCapture(e.pointerId);
  if (stage === "playing") {
    input.pressed.add("Space");
    input.keys.add("Space");
    audio.unlock();
  }
};
touchAction.onpointerup = touchAction.onpointercancel = () =>
  input.keys.delete("Space");
function frame(now) {
  const dt = Math.min(0.04, Math.max(0, (now - last) / 1000));
  last = now;
  time += dt;
  toastTime -= dt;
  if (toastTime <= 0) $("#toast").style.opacity = 0;
  if (stage === "playing") {
    game.update(dt, input);
    input.pressed.clear();
    hudTick += dt;
    if (hudTick > 0.12) {
      hudTick = 0;
      $("#metrics").innerHTML = game
        .hud()
        .map(
          ([k, v]) =>
            `<div class="metric"><small>${esc(k)}</small><b>${esc(v)}</b></div>`,
        )
        .join("");
      game.toolbar?.();
    }
  }
  if (game) game.render(ctx, time, stage === "menu");
  requestAnimationFrame(frame);
}
try {
  await loadArt();
  menu();
  requestAnimationFrame(frame);
} catch (e) {
  $("#overlay").innerHTML =
    '<div class="dialog"><h2>世界没有完整加载</h2><p>' +
    esc(e.message) +
    "。请用 start.py 启动，不要双击 HTML；确认 public/art 文件完整。</p></div>";
  console.error(e);
}
// Explicit local development seam only; ordinary launch exposes no game state or mutation hooks.
if (
  new URLSearchParams(location.search).get("dev") === "1" &&
  ["127.0.0.1", "localhost", "[::1]"].includes(location.hostname)
)
  window.__GAME__ = {
    get game() {
      return game;
    },
    get stage() {
      return stage;
    },
    start,
    theme(k) {
      if (CONFIG.themes[k]) {
        theme = k;
        menu();
      }
    },
    step(seconds) {
      for (let t = 0; t < seconds && stage === "playing"; t += 1 / 60)
        game.update(1 / 60, input);
    },
    input,
  };
