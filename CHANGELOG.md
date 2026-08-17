# Changelog

Tutte le modifiche degne di nota a questa guida.
Il formato si ispira a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); essendo un sito/guida senza versioni, le voci sono raggruppate per data (più recente in cima).

## [2026-08-17]

### Aggiunto
- **«I file di contesto» riorganizzata su un secondo asse**: il raggruppamento per frequenza di lettura (sempre attivi / per feature / di riferimento) e la logica di costo che ne discende, più i quattro file che i due elenchi esistenti non coprivano — **FLOWS.md** (tutti gli stati della feature, contro l'agente che costruisce solo l'*happy path*), **DECISIONS.md** (registro in sola aggiunta, anche degli scarti), **REVIEW.md** (checklist sì/no prima del «fatto») e **COMPONENTS.md** (risposta canonica a «esiste già?»). Aggiunti anche il collegamento dei file al design system vivo via MCP, la distinzione fra regola per l'agente e documentazione per una persona, e il metodo delle tre varianti per far emergere i vincoli mancanti. Dichiarata la divergenza fra le fonti su quali file tenere sempre attivi. Fonte: Lisa Demchenko, agosto 2026.
- Nella voce **PLAN.md**, la lista dei non-goal come unico freno all'allargamento di scope da parte degli agenti.
- Nuova sezione **«Il contesto visivo»** nel capitolo «Flusso ottimale tra Claude e Figma», prima di «Il contesto di UX»: origine e stato della spec DESIGN.md (Google Stitch → Google Labs, aprile 2026, spec alpha, CLI di lint/diff/export), le due meccaniche di contratto (token normativi, riferimenti `{colors.primary}`, intestazione duplicata che invalida il file), descrizione contro vincolo con la forma valore→intento→confine, la sequenza di scrittura (brief prima dei token, logica di componente, don't) e il controllo diagnostico a tre schermate. Chiude l'asimmetria per cui `UX.md`, dichiarato una proposta, aveva una sezione dedicata e `DESIGN.md`, che una spec ce l'ha, una riga sola.
- **Nomi per ruolo e stati dei componenti** in «Rendere il design system leggibile dall'AI»: perché `button.primary` sopravvive al rebrand e `bigRedButton` no, il vocabolario condiviso invece di un dizionario privato, e i componenti documentati anche in hover/active/disabled/loading/focus.
- **Controllo a due vie** in «Enforcement del design system»: confrontare `DESIGN.md` col prodotto live per capire chi dei due è rimasto indietro.
- Voce **DESIGN.md** nel Glossario e quattro fonti promosse da «(memoria di progetto)» a citazioni per esteso.

### Aggiunto (bibliografia)
- Nuovo **`FONTI.md`** alla root: bibliografia completa dei 34 documenti del corpus, in cinque gruppi (file di contesto e formati `.md` · design system leggibili dall'AI · Claude Code e Figma · skill · contesto e pratica). Per ogni voce titolo, autore, testata, data di pubblicazione, link per esteso e nome del PDF. Nasce dall'unione di una bibliografia parziale di 22 voci con i 12 documenti non ancora catalogati, tutti verificati sulla pagina originale. Segnalati i due PDF citati ma assenti da `sources/` e l'unica fonte non identificata.

### Corretto (attribuzioni)
- **«Lisa Wade» era sbagliato**: i due articoli su DESIGN.md e sui file di contesto sono di **Lisa Demchenko**. L'errore veniva dalla lettura del credit di un'infografica; verificato sulle pagine originali.
- **Date di pubblicazione al posto delle date di snapshot** nelle Fonti: *How to write a DESIGN.md file Claude can actually use* è di maggio 2026, non di giugno.
- Attribuiti a **Nick Babich** *What is DESIGN.md and How To Use It* e *DESIGN.md Best Practices*, che erano citati come «UX Planet» perché il PDF archiviato non porta il byline.

### Rimosso
- Sezione **«Lo "spec" come ancora»** dal capitolo «Context engineering e prompting». Era la più corta del capitolo (73 parole) e nel frattempo era diventata ridondante: lo spec come ponte fra chat e Claude Code è già in «Dividere il lavoro tra Claude Desktop e Claude Code», e il tracciamento delle decisioni per round è coperto meglio da `DECISIONS.md`. La parte non ridondante — lo spec come ancora da cui derivano prototipo, journey map e piano d'implementazione, e il suo effetto sulle allucinazioni nei flussi complessi — è stata spostata nel capitolo 2. Fonte originale («How I use AI to partner on design problems») invariata nell'elenco.

### Modificato
- **Indice manuale in testa a `content.md`**: aggiunta la voce «Il contesto visivo», che mancava, e tolta quella della sezione rimossa. Ora combacia con i titoli reali dei capitoli 1 e 2.
- **Tipografia: Instrument Sans → Ronzino** (Collletttivo, SIL OFL 1.1) su display e corpo. I woff2 sono self-hostati in `assets/fonts/` con la licenza a corredo (`OFL.txt`); da Google Fonts resta solo IBM Plex Mono per il codice. Preload su Regular e Bold.
- **Pesi rimappati**: Ronzino non ha il 600, quindi i vecchi `font-weight: 600` sono assegnati esplicitamente via i token `--w-medium: 500` e `--w-bold: 700` — Bold su H1–H4, occhielli, badge e `strong`; Medium sulle macro-voci dell'indice e sugli header di tabella.
- **Scala tipografica, gradino intermedio**: H3 da 1.28rem (20.5px) a **1.5rem (24px)** e H4 da 1.05rem (16.8px) a **1.25rem (20px)**, con `line-height` 1.35. La scala diventa 18 / 20 / 24 / 33.6 / 52.8 px, a rapporti crescenti 1.11 · 1.20 · 1.40 · 1.57. Prima l'H4 era più piccolo del corpo e l'H3 lo superava solo dell'1.14×, mentre l'H2 saltava del 1.64×. H1 e H2 restano invariati.

### Corretto
- **Deploy su GitHub Pages**: il workflow copiava in `dist/` solo `index.html`, non `assets/`. Logo e favicon erano quindi rotti su Pages, e coi font self-hostati sarebbe caduta anche la tipografia.

## [2026-07-27]

### Aggiunto
- Nuova sezione **«Il contesto di UX»** nel capitolo «Flusso ottimale tra Claude e Figma», subito dopo «I file di contesto»: la tesi NN/g (Tony Alicea, luglio 2026) sulla ricerca UX come contesto per l'AI, le cinque famiglie di contenuto di `UX.md`, come tenerlo e da dove partire.
- Voce **UX.md** nell'elenco dei file di contesto, voce «UX-context design» nel Glossario e l'articolo NN/g tra le Fonti.
- **Badge «In lavorazione»** sul titolo di «Il contesto di UX»: primo uso della sintassi `{badge:Testo}` di `build.mjs` (pill lime sul titolo + pallino nell'indice laterale).
- Gli schemi di struttura del progetto includono ora `UX.md` (entrambe le varianti) e la cartella `ux/` con un file per famiglia.
- Tre nuovi repository al catalogo di riferimento (ora **82**): `kreako/fig2json` in «Ponte tra Claude e Figma», `alvarotrigo/fullpage.js` in «Motion, animazioni e scroll».
- Nuova categoria **«Suono e feedback audio»** con `romainsimon/uisfx`.

### Corretto
- **Scrollspy dell'indice laterale**: sostituito l'`IntersectionObserver` enter-only con un rilevamento deterministico (ultimo titolo oltre la linea di lettura, throttlato via `requestAnimationFrame`). Elimina il flip-flop apri/chiudi degli accordion ai confini di sezione durante lo scroll.

## [2026-07-22]

### Aggiunto
- Nuova sezione **«Cosa sono le skill e come si creano»** nel capitolo «Lavorare con le skill».
- **Occhielli sull'attacco delle sezioni**: «Capitolo N» sui capitoli (numerazione automatica), «Appendice» su Glossario e «Riferimenti» su Fonti.
- **Indice laterale ad accordion**: macro-voci collassabili single-open (prima aperta di default, chevron, l'accordion segue la parte in lettura).

### Modificato
- Contenuti sincronizzati dal nuovo sorgente di sintesi; ri-applicati gli accorgimenti editoriali (corsivi su termini tecnici, rimandi per titolo, niente numeri di sezione).
- Parte 3 rinominata da «Repository di skill di riferimento» a **«Lavorare con le skill»**.
- Titolo «Ponte Claude ↔ Figma» → **«Ponte tra Claude e Figma»**.
- I tre tier di token spostati dentro «Rendere il design system leggibile dall'AI».

### Corretto
- Scroll delle sotto-voci su Chrome: lo scrollspy scorre solo la spalla e non interrompe più lo smooth-scroll della pagina.
- Glifo `↔` rimosso ovunque (titoli e descrizioni inline).

## [2026-07-15]

### Modificato
- Integrata la sezione «Estensioni facoltative del contesto di progetto» (2.3 aggiornata).

### Corretto
- Corretto lo slug del marketplace DesignAgent.
- Rimosso il riferimento alla skill inesistente `/not-ai`.

## [2026-07-10]

### Modificato
- Contenuti aggiornati dal nuovo sorgente di sintesi (nuova sezione «Glossario»).

### Corretto
- Neutralizzate le tilde singole per evitare strikethrough spurio.
- Rimossi i riferimenti alle lettere di categoria A–J nell'intro del catalogo skill.

## [2026-07-09]

### Aggiunto
- Prima versione della guida HTML «Progettare con l'AI» (knowledge base del team di design Lotrek).
- Pipeline di build `content.md` → `build.mjs` → `template.html` → `index.html`.
- Deploy su GitHub Pages (workflow Actions) e su Vercel (`deploy.sh`).
- Tipografia Instrument Sans + IBM Plex Mono, brand Lotrek, badge sui titoli.
