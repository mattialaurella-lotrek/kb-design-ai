# Changelog

Tutte le modifiche degne di nota a questa guida.
Il formato si ispira a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); essendo un sito/guida senza versioni, le voci sono raggruppate per data (più recente in cima).

## [2026-07-27]

### Aggiunto
- Nuova sezione **«UX-context design»** nel capitolo «Flusso ottimale tra Claude e Figma», subito dopo «I file di contesto»: la tesi NN/g (Tony Alicea, luglio 2026) sulla ricerca UX come contesto per l'AI, le cinque famiglie di contenuto di `UX.md`, come tenerlo e da dove partire.
- Voce **UX.md** nell'elenco dei file di contesto, voce «UX-context design» nel Glossario e l'articolo NN/g tra le Fonti.
- **Badge «In lavorazione»** sul titolo di «UX-context design»: primo uso della sintassi `{badge:Testo}` di `build.mjs` (pill lime sul titolo + pallino nell'indice laterale).
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
