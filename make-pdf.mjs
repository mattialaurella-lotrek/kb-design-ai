// Genera il PDF dell'intera guida stampando index.html con Chrome headless.
//
//   node make-pdf.mjs <index.html> <uscita.pdf>
//
// La resa la decide il blocco @media print di template.html, non questo file:
// qui si sceglie solo il browser e si aspetta che finisca di comporre.
// Gira su macOS in locale e su ubuntu-latest in Actions, dove Chrome c'è già.
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const CANDIDATI = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome-stable",
  "google-chrome",
  "chromium-browser",
  "chromium",
].filter(Boolean);

function trovaChrome() {
  for (const c of CANDIDATI) {
    if (c.includes("/")) {
      if (existsSync(c)) return c;
    } else {
      try {
        return execFileSync("which", [c], { encoding: "utf8" }).trim();
      } catch {}
    }
  }
  return null;
}

const html = resolve(process.argv[2] || "index.html");
const pdf = resolve(process.argv[3] || "progettare-con-lai.pdf");

if (!existsSync(html)) {
  console.error(`✗ manca ${html}: prima "npm run build"`);
  process.exit(1);
}

const chrome = trovaChrome();
if (!chrome) {
  // Meglio fermare la pubblicazione che mandarla online con la CTA che dà 404.
  console.error("✗ nessun Chrome trovato. Installalo o esporta CHROME_BIN=/percorso/al/binario");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdf}`,
    // I font sono self-hostati e la pagina è lunga: senza margine di tempo
    // Chrome stampa prima che Ronzino sia agganciato.
    "--virtual-time-budget=30000",
    `file://${html}`,
  ],
  { stdio: ["ignore", "ignore", "pipe"] }
);

const mb = (statSync(pdf).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${pdf} generato — ${mb} MB`);
