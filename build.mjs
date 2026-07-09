// Build: content.md -> index.html
// Inietta il markdown convertito nel template bespoke (template.html),
// genera l'indice laterale (TOC) e gli id delle heading.
import { readFileSync, writeFileSync } from "node:fs";
import { marked } from "marked";

const TITLE = "Progettare con l'AI";
const DESCRIPTION =
  "Knowledge base del team di design Lotrek: context engineering, prompting, workflow Claude/Figma/skill e repository di skill di riferimento.";

// ---- slugify (accent-safe, id stabili per gli anchor) ----
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/<[^>]+>/g, "")        // via eventuale markup inline
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
}

// ---- Pre-processing del markdown ----
let md = readFileSync(new URL("./content.md", import.meta.url), "utf8");
const lines = md.split("\n");

// 1) Titolo H1 (prima riga "# ...") -> rimosso dal corpo, usato nell'hero
let pageTitle = TITLE;
const h1i = lines.findIndex((l) => /^#\s+/.test(l));
if (h1i !== -1) {
  pageTitle = lines[h1i].replace(/^#\s+/, "").trim();
  lines.splice(h1i, 1);
}

// 2) Intro: blocco blockquote iniziale (> ...) -> hero lede, tolto dal corpo
let introMd = "";
let i = 0;
while (i < lines.length && lines[i].trim() === "") i++;
if (i < lines.length && lines[i].startsWith(">")) {
  const start = i;
  while (i < lines.length && (lines[i].startsWith(">") || lines[i].trim() === "")) {
    if (lines[i].startsWith(">")) introMd += lines[i].replace(/^>\s?/, "") + "\n";
    i++;
    if (i < lines.length && lines[i].trim() === "" && !lines[i + 1]?.startsWith(">")) break;
  }
  lines.splice(start, i - start);
}

// 3) Indice manuale ("**Indice**" ... fino al primo "---") -> rimosso (usiamo il TOC generato)
const idxStart = lines.findIndex((l) => /^\*\*Indice\*\*/.test(l.trim()));
if (idxStart !== -1) {
  let end = idxStart;
  while (end < lines.length && lines[end].trim() !== "---") end++;
  if (end < lines.length) lines.splice(idxStart, end - idxStart + 1);
}

const bodyMd = lines.join("\n");

// ---- Conversione ----
marked.setOptions({ gfm: true, breaks: false });
let introHtml = introMd.trim() ? marked.parse(introMd) : "";
let bodyHtml = marked.parse(bodyMd);

// ---- Id sulle heading + raccolta per il TOC ----
const toc = [];
const usedIds = new Set();
bodyHtml = bodyHtml.replace(/<h([234])>([\s\S]*?)<\/h\1>/g, (m, level, inner) => {
  let id = slugify(stripTags(inner)) || "sez";
  let base = id, n = 2;
  while (usedIds.has(id)) id = `${base}-${n++}`;
  usedIds.add(id);
  if (level === "2" || level === "3") {
    toc.push({ level: Number(level), id, text: stripTags(inner) });
  }
  const anchor = `<a class="anchor" href="#${id}" aria-hidden="true">#</a>`;
  return `<h${level} id="${id}">${anchor}${inner}</h${level}>`;
});

// ---- Tabelle scrollabili (wrap) ----
bodyHtml = bodyHtml.replace(/<table>[\s\S]*?<\/table>/g, (t) => `<div class="table-wrap">${t}</div>`);

// ---- TOC HTML ----
const tocHtml = toc
  .map((t) => `<a class="lvl-${t.level}" href="#${t.id}">${t.text}</a>`)
  .join("\n");

// ---- Data build (it-IT, senza dipendenze di ICU incerte) ----
const MESI = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
const now = new Date();
const buildDate = `${now.getDate()} ${MESI[now.getMonth()]} ${now.getFullYear()}`;

// ---- Render template ----
const heroTitle = pageTitle.split(/\s+[—–-]\s+/)[0].trim();

let out = readFileSync(new URL("./template.html", import.meta.url), "utf8");
out = out
  .replaceAll("{{TITLE}}", pageTitle)
  .replaceAll("{{HERO_TITLE}}", heroTitle)
  .replaceAll("{{DESCRIPTION}}", DESCRIPTION)
  .replace("{{INTRO}}", introHtml)
  .replace("{{TOC}}", tocHtml)
  .replace("{{CONTENT}}", bodyHtml)
  .replace("{{BUILD_DATE}}", buildDate);

writeFileSync(new URL("./index.html", import.meta.url), out, "utf8");
console.log(`✓ index.html generato — ${toc.length} voci nel TOC, aggiornato al ${buildDate}`);
