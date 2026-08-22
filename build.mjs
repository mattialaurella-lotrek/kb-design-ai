// Build: content.md -> index.html
// Inietta il markdown convertito nel template bespoke (template.html),
// genera l'indice laterale (TOC) e gli id delle heading.
import { readFileSync, writeFileSync } from "node:fs";
import { marked } from "marked";

const TITLE = "Progettare con l'AI";
const DESCRIPTION =
  "Knowledge base del team di design Lotrek: context engineering, prompting, workflow Claude/Figma/skill e repository di skill di riferimento.";

// ---- Icone Lucide (lucide.dev, ISC): sprite <symbol> definito una volta in
// template.html, qui solo i riferimenti. Inline ripetuto pesava ~78 KB. ----
const ICON_COPY = `<svg class="ico" aria-hidden="true"><use href="#ico-copy"/></svg>`;
const ICON_LINK = `<svg class="ico" aria-hidden="true"><use href="#ico-link"/></svg>`;
const ICON_CHECK = `<svg class="ico ico-ok" aria-hidden="true"><use href="#ico-check"/></svg>`;

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
  // preserva gli span di codice inline (`...`) e i tag HTML grezzi: dentro un tag le
  // virgolette dritte delimitano gli attributi, e curvarle rompe il markup.
  return line
    .split(/(`[^`]*`|<\/?[a-zA-Z][^<>]*>)/g)
    .map((part) => (part.startsWith("`") || part.startsWith("<") ? part : smartQuotesText(part)))
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

// 2) Intro: i paragrafi fra l'H1 e l'indice manuale -> hero lede, tolti dal corpo.
//    Prima qui si cercava un blockquote, che il sorgente non ha mai usato: il lede
//    restava vuoto e il bordo inferiore dell'hero finiva fra titolo e primo paragrafo.
let introMd = "";
let i = 0;
while (i < lines.length && lines[i].trim() === "") i++;
const introStart = i;
while (
  i < lines.length &&
  !/^\*\*Indice\*\*/.test(lines[i].trim()) &&
  !/^#{1,6}\s/.test(lines[i]) &&
  lines[i].trim() !== "---"
) i++;
if (i > introStart) {
  introMd = lines.slice(introStart, i).join("\n").replace(/^>\s?/gm, "").trim();
  lines.splice(introStart, i - introStart);
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
  const badgeHtml = badge ? ` <span class="badge">${badge}</span>` : "";
  // Comandi copia/condividi sui titoli H2 e H3 (icone Lucide, stile e logica in template.html)
  const tools =
    level === "2" || level === "3"
      ? `<span class="head-tools" contenteditable="false">` +
        `<button type="button" class="head-tool" data-tool="copy" data-tip="Copia la sezione" aria-label="Copia la sezione in markdown">${ICON_COPY}${ICON_CHECK}</button>` +
        `<button type="button" class="head-tool" data-tool="link" data-tip="Copia il link" aria-label="Copia il link alla sezione">${ICON_LINK}${ICON_CHECK}</button>` +
        `</span>`
      : "";
  return `<h${level} id="${id}">${inner}${badgeHtml}${tools}</h${level}>`;
});

// ---- Rimandi interni: «Titolo di sezione» -> link all'ancora ----
// I rimandi si scrivono in guillemets nel markdown e diventano link qui, così il
// sorgente resta leggibile e un rimando a una sezione che non esiste più viene
// segnalato dalla build invece di restare un vicolo cieco per chi legge.
{
  const byTitle = new Map(toc.map((t) => [t.text, t.id]));
  const headingRanges = [];
  bodyHtml.replace(/<h[234][\s\S]*?<\/h[234]>/g, (m, off) => { headingRanges.push([off, off + m.length]); return m; });
  const inHeading = (i) => headingRanges.some(([a2, b2]) => i >= a2 && i < b2);
  const irrisolti = new Set();
  bodyHtml = bodyHtml.replace(/&ldquo;((?:(?!&ldquo;|&rdquo;)[\s\S]){3,90})&rdquo;/g, (m, inner, off) => {
    if (inHeading(off)) return m;
    const key = stripTags(inner).trim();
    const id = byTitle.get(key);
    if (!id) {
      // Segnala solo i quasi-titoli: una stringa che somiglia molto a una sezione esistente
      // è quasi sempre un rimando rotto da una rinomina. Le citazioni normali restano mute.
      const norm = (x) => x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
      const kw = norm(key);
      if (kw.length >= 2) {
        for (const t of byTitle.keys()) {
          const tw = norm(t);
          const comuni = kw.filter((w) => tw.includes(w)).length;
          if (comuni / Math.max(kw.length, tw.length) >= 0.6) { irrisolti.add(`${key}  ->  forse ${t}`); break; }
        }
      }
      return m;
    }
    return `<a class="xref" href="#${id}">${inner}</a>`;
  });
  if (irrisolti.size) {
    console.warn("Rimandi che somigliano a una sezione ma non la centrano:");
    for (const k of irrisolti) console.warn("  \u00ab" + k + "\u00bb");
  }
}

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

// ---- Passi numerati: "**1) Titolo.**" a inizio paragrafo -> pallino col numero ----
bodyHtml = bodyHtml.replace(
  /<p><strong>(\d{1,2})\)\s*([\s\S]*?)<\/strong>/g,
  (_, n, rest) => `<p class="has-step"><span class="step">${n}</span><strong>${rest}</strong>`
);

// ---- Link esterni in scheda nuova ----
// Solo http(s): le ancore interne (#id) e i mailto restano nella stessa scheda.
// `rel` obbligatorio con target="_blank": senza `noopener` la pagina aperta può
// raggiungere questa via window.opener.
bodyHtml = bodyHtml.replace(
  /<a href="(https?:\/\/[^"]+)"/g,
  '<a href="$1" target="_blank" rel="noopener noreferrer"'
);

// ---- Punteggiatura attaccata al codice inline ----
// Il chip di `code` ha padding a destra, quindi un due punti che lo segue sembra
// staccato da uno spazio: "`CLAUDE.md` :". Lo si recupera con un margine negativo.
// Escluso `</code></pre>`, dove non c'è nessun chip.
bodyHtml = bodyHtml.replace(/<\/code>(?!<\/pre>)([:;,.])/g, '</code><span class="tight-punct">$1</span>');

// ---- Tabelle scrollabili (wrap) ----
bodyHtml = bodyHtml.replace(/<table>[\s\S]*?<\/table>/g, (t) => `<div class="table-wrap">${t}</div>`);

// ---- TOC HTML (accordion: ogni H2 = macro-voce collassabile con le sue H3) ----
const CHEVRON =
  '<svg class="toc-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" aria-hidden="true"><path d="M4.5 9.87L12 15.63L19.5 9.87"/></svg>';

// Voce d'apertura: punta all'hero, così la spalla ha un "torna a casa".
let tocHtml =
  `<div class="toc-group"><a class="toc-macro toc-macro--leaf" href="#top">` +
  `<span class="toc-macro-text">Introduzione</span></a></div>\n`;
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
