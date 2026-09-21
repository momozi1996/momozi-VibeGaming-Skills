import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
// Only the dependency is minified. Game code below it retains its sections and comments.
const html = fs
  .readFileSync(path.join(dir, "src/shell.html"), "utf8")
  .replace(
    "<head>",
    () =>
      "<head>\n<!--\n" +
      fs.readFileSync(path.join(dir, "LICENSE.txt"), "utf8") +
      "\n-->",
  )
  .replace("/*__CSS__*/", () =>
    fs.readFileSync(path.join(dir, "src/style.css"), "utf8"),
  )
  .replace("/*__THREE__*/", () =>
    fs
      .readFileSync(path.join(dir, "src/three.inline.js"), "utf8")
      .replaceAll("</script", "<\\/script"),
  )
  .replace("/*__GAME__*/", () =>
    fs.readFileSync(path.join(dir, "src/game.js"), "utf8"),
  );
fs.writeFileSync(path.join(dir, "cloudline.html"), html);
console.log(
  "Built offline single-file HTML:",
  Buffer.byteLength(html),
  "bytes",
);
