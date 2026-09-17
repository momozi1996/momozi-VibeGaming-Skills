export class Input {
  keys = new Set<string>();
  onAction: (key: string) => void = () => {};
  onClick: (x: number, y: number) => void = () => {};
  onOrbit: (dx: number, dy: number) => void = () => {};
  onZoom: (n: number) => void = () => {};
  isModalOpen: () => boolean = () => false;
  dragging = false;
  moved = 0;
  lastX = 0;
  lastY = 0;
  constructor(canvas: HTMLCanvasElement) {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (k === "escape") {
        e.preventDefault();
        if (!e.repeat) this.onAction(k);
        return;
      }
      if (
        (e.target as HTMLElement)?.matches("input,textarea,select") ||
        (k === "tab" && this.isModalOpen())
      )
        return;
      if (
        [
          " ",
          "tab",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(k)
      )
        e.preventDefault();
      if (!e.repeat) this.onAction(k);
      this.keys.add(k);
    });
    window.addEventListener("keyup", (e) =>
      this.keys.delete(e.key.toLowerCase()),
    );
    window.addEventListener("blur", () => {
      this.keys.clear();
      this.dragging = false;
    });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    canvas.addEventListener("pointerdown", (e) => {
      this.dragging = true;
      this.moved = 0;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX,
        dy = e.clientY - this.lastY;
      this.moved += Math.abs(dx) + Math.abs(dy);
      this.onOrbit(dx, dy);
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });
    canvas.addEventListener("pointerup", (e) => {
      this.dragging = false;
      if (this.moved < 5 && e.button === 0) this.onClick(e.clientX, e.clientY);
    });
    canvas.addEventListener("pointercancel", () => (this.dragging = false));
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.onZoom(e.deltaY);
      },
      { passive: false },
    );
  }
  axis() {
    return {
      x:
        Number(this.keys.has("d") || this.keys.has("arrowright")) -
        Number(this.keys.has("a") || this.keys.has("arrowleft")),
      z:
        Number(this.keys.has("w") || this.keys.has("arrowup")) -
        Number(this.keys.has("s") || this.keys.has("arrowdown")),
    };
  }
}
