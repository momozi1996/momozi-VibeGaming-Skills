import "./ui/style.css";
import { Game } from "./app/game";
const canvas = document.getElementById("world") as HTMLCanvasElement;
try {
  const game = new Game(canvas);
  void game.init();
} catch (error) {
  console.error(error);
  const root = document.getElementById("app")!;
  root.innerHTML =
    '<div class="loading"><h1>暂时无法进入北郡</h1><p>请使用启用硬件加速的桌面浏览器，并刷新重试。</p><button class="gold-button" onclick="location.reload()">重新尝试</button></div>';
}
