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

// ---- Smart quotes (standard tipografico, entità canoniche) ----
// Virgolette dritte -> curve; guillemets -> doppie curve.
// & = &ldquo;  &rdquo;  &lsquo;  &rsquo;  — saltando codice inline e blocchi ```.
const QUOTE_OPEN = "[\\s([{\\u2013\\u2014/-]"; // inizio riga o dopo spazio/parentesi/trattino
function smartQuotesText(s) {
  return s
    // tilde singola (es. "~100 token") non è strikethrough: neutralizzata a entità.
    // "~~" (strikethrough intenzionale) preservato: entrambe le tilde sono adiacenti.
    .replace(/(?<!~)~(?!~)/g, "&#126;")
    .replace(/«/g, "&ldquo;").replace(/»/g, "&rdquo;")
    .replace(new RegExp(`(^|${QUOTE_OPEN})"`, "g"), "$1&ldquo;")
    .replace(/"/g, "&rdquo;")
    .replace(new RegExp(`(^|${QUOTE_OPEN})'`, "g"), "$1&lsquo;")
    .replace(/'/g, "&rsquo;");
}
function smartQuotesLine(line) {
  // preserva gli span di codice inline (`...`)
  return line
    .split(/(`[^`]*`)/g)
    .map((part) => (part.startsWith("`") ? part : smartQuotesText(part)))
    .join("");
}
function smartQuotes(md) {
  let inFence = false;
  return md
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line; }
      return inFence ? line : smartQuotesLine(line);
    })
    .join("\n");
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
let introHtml = introMd.trim() ? marked.parse(smartQuotes(introMd)) : "";
let bodyHtml = marked.parse(smartQuotes(bodyMd));

// ---- Id sulle heading + raccolta per il TOC ----
const toc = [];
const usedIds = new Set();
bodyHtml = bodyHtml.replace(/<h([234])>([\s\S]*?)<\/h\1>/g, (m, level, inner) => {
  // Badge opzionale: "... {badge:Testo}" a fine heading -> pill nel titolo, TOC pulito + flag.
  let badge = "";
  const bm = inner.match(/\s*\{badge:\s*([^}]+?)\s*\}\s*$/);
  if (bm) { badge = bm[1]; inner = inner.slice(0, bm.index); }

  const cleanText = stripTags(inner);
  let id = slugify(cleanText) || "sez";
  let base = id, n = 2;
  while (usedIds.has(id)) id = `${base}-${n++}`;
  usedIds.add(id);
  if (level === "2" || level === "3") {
    toc.push({ level: Number(level), id, text: cleanText, flag: !!badge });
  }
  const anchor = `<a class="anchor" href="#${id}" aria-hidden="true">#</a>`;
  const badgeHtml = badge ? ` <span class="badge">${badge}</span>` : "";
  return `<h${level} id="${id}">${anchor}${inner}${badgeHtml}</h${level}>`;
});

// ---- Occhielli sull'attacco delle macro-voci ----
// H2 con sotto-sezioni -> "Capitolo N" (numerato); H2 senza figli (chiusura) -> etichetta non numerata.
const BACKMATTER_KICKER = { glossario: "Appendice", fonti: "Riferimenti" };
let chap = 0;
for (let a = 0; a < toc.length; a++) {
  if (toc[a].level !== 2) continue;
  const hasSubs = toc[a + 1] && toc[a + 1].level === 3;
  const label = hasSubs ? `Capitolo ${++chap}` : (BACKMATTER_KICKER[toc[a].id] || "Appendice");
  const kicker = `<span class="chapter-kicker">${label}</span>`;
  const h2open = `<h2 id="${toc[a].id}">`;
  bodyHtml = bodyHtml.replace(h2open, `${kicker}<h2 id="${toc[a].id}" class="has-kicker">`);
}

// ---- Tabelle scrollabili (wrap) ----
bodyHtml = bodyHtml.replace(/<table>[\s\S]*?<\/table>/g, (t) => `<div class="table-wrap">${t}</div>`);

// ---- TOC HTML (accordion: ogni H2 = macro-voce collassabile con le sue H3) ----
const CHEVRON =
  '<svg class="toc-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"></polyline></svg>';

let tocHtml = "";
for (let k = 0; k < toc.length; ) {
  const t = toc[k];
  if (t.level === 2) {
    const subs = [];
    let j = k + 1;
    while (j < toc.length && toc[j].level === 3) { subs.push(toc[j]); j++; }
    const hasSubs = subs.length > 0;
    const macro =
      `<a class="toc-macro${hasSubs ? "" : " toc-macro--leaf"}" href="#${t.id}"${hasSubs ? ' aria-expanded="false"' : ""}>` +
      `<span class="toc-macro-text">${t.text}</span>` +
      (hasSubs ? CHEVRON : "") +
      `</a>`;
    const sub = hasSubs
      ? `<div class="toc-sub"><div class="toc-sub-inner">` +
        subs.map((s) => `<a class="lvl-3${s.flag ? " flag" : ""}" href="#${s.id}">${s.text}</a>`).join("\n") +
        `</div></div>`
      : "";
    tocHtml += `<div class="toc-group">${macro}${sub}</div>\n`;
    k = j;
  } else {
    // H3 orfana (non dovrebbe capitare): la rendo come link semplice
    tocHtml += `<a class="lvl-3${t.flag ? " flag" : ""}" href="#${t.id}">${t.text}</a>\n`;
    k++;
  }
}

// ---- Data build (it-IT, senza dipendenze di ICU incerte) ----
const MESI = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
const now = new Date();
const buildDate = `${now.getDate()} ${MESI[now.getMonth()]} ${now.getFullYear()}`;

// ---- Render template ----
const heroTitle = smartQuotesText(pageTitle.split(/\s+[—–-]\s+/)[0].trim());
const titleSmart = smartQuotesText(pageTitle);

let out = readFileSync(new URL("./template.html", import.meta.url), "utf8");
out = out
  .replaceAll("{{TITLE}}", titleSmart)
  .replaceAll("{{HERO_TITLE}}", heroTitle)
  .replaceAll("{{DESCRIPTION}}", DESCRIPTION)
  .replace("{{INTRO}}", introHtml)
  .replace("{{TOC}}", tocHtml)
  .replace("{{CONTENT}}", bodyHtml)
  .replace("{{BUILD_DATE}}", buildDate);

writeFileSync(new URL("./index.html", import.meta.url), out, "utf8");
console.log(`✓ index.html generato — ${toc.length} voci nel TOC, aggiornato al ${buildDate}`);
