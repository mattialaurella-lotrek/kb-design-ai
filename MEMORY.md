# MEMORY

Memoria di progetto: decisioni di lungo periodo, contesto e convenzioni che devono sopravvivere tra le sessioni. Per la cronologia delle modifiche vedi [`CHANGELOG.md`](./CHANGELOG.md).

## Cos'è
Guida HTML «Progettare con l'AI», knowledge base del team di design Lotrek: context engineering, prompting, workflow Claude/Figma, skill e catalogo di riferimento.

- **Repo**: `mattialaurella-lotrek/kb-design-ai` (pubblico).
- **Live**: [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app) (Vercel, scope `lotrek`) e [GitHub Pages](https://mattialaurella-lotrek.github.io/kb-design-ai/).

## Architettura
- `content.md` (fonte markdown) → `build.mjs` (marked) inietta nel `template.html` bespoke → `index.html`.
- `index.html` è **gitignored**: è un artefatto di build, non si versiona.
- Accento lime `#d9fb12`; token di design in `repass.io.md`.
- Tipografia: **Ronzino** (display + corpo, self-hostato in `assets/fonts/`, SIL OFL 1.1) e **IBM Plex Mono** (codice, da Google Fonts).
- **Ronzino ha 400 / 500 / 700, niente 600**: usare i token `--w-medium` e `--w-bold`, mai `font-weight: 600` (il browser lo risolverebbe in Bold ovunque, indice compreso).
- **Scala tipografica**: 18 (corpo) · 20 (h4) · 24 (h3) · 33.6 (h2) · 52.8 (h1) px, a rapporti crescenti 1.11 · 1.20 · 1.40 · 1.57. Non è una scala modulare a ratio unico: con 4 livelli più un hero display un ratio fisso rimpicciolirebbe l'H1.
- **Ritmo verticale**: due regole sole, in `rem` su multipli di 8px (token `--gap-cap` 128 / `--gap-sez` 56 / `--gap-sub` 32). Lo spazio *sopra* un titolo cresce col livello, quello *sotto* resta molto minore (32 h1 / 16 h2 / 12 h3 / 8 h4) così il titolo appartiene al testo che introduce. Nella colonna di lettura l'unica riga orizzontale è il **filetto in inchiostro sotto i titoli di capitolo** (2px, 12px sopra e 24px sotto): segna l'inizio di un capitolo. Niente `<hr>` fra i capitoli, nessun bordo sotto l'hero, nessun trattino lime negli occhielli. A separare è solo il vuoto, ed è per questo che il gap di capitolo è così ampio: non rimettere righe orizzontali senza ridurlo. **Mai tornare ai margini in `em` sui titoli**: era quello a dare a un capitolo meno aria di una sezione, perché l'occhiello ha corpo 12px.
- ⚠️ **`--content-max` è in `ch`**, e `ch` dipende dal corpo dell'elemento: applicarlo a qualcosa che non sia a 18px dà una colonna più stretta del testo. È il difetto che teneva il piè di pagina largo ~600px invece di ~758. Chi deve stare largo quanto la colonna vada dentro `.prose` ed erediti, senza `max-width` propria.
- **Link nel testo**: Medium a riposo, sottolineatura lime a gradiente animata su `background-size` (360ms). Due avvertenze imparate a caro prezzo: con **due strati dello stesso colore** una dissolvenza incrociata è invisibile, perché mentre uno si ritira l'altro avanza e l'unione copre sempre tutto; e uno `::after` in posizione assoluta **si rompe sui link che vanno a capo**, per questo si usa il gradiente più `box-decoration-break: clone`. Il peso non cambia all'hover: Medium è l'1,57% più largo di Regular e su un link lungo sposterebbe di 7px il testo che segue.
- **Link esterni**: `target="_blank"` più `rel="noopener noreferrer"`, aggiunti in `build.mjs` ai soli `http(s)`. Ancore interne e `mailto` restano nella stessa scheda.
- **Icone**: tutte da [Lucide](https://lucide.dev/icons/) (ISC), inline nello sprite `<symbol>` in cima al `<body>` del template. In uso: `copy`, `link`, `check`, `sun`, `moon`, `monitor`, `menu`. Niente glifi Unicode nell'interfaccia, rendevano diversi da macchina a macchina.
- **L'apertura della guida** (titolo + due paragrafi) finisce nel `lede` dell'hero: `build.mjs` prende tutto ciò che sta fra l'H1 e `**Indice**`. Non rimettere un blockquote lì, era la vecchia convenzione che lasciava il lede vuoto.
- **Comandi sui titoli**: pulsanti copia-sezione e copia-link generati in `build.mjs` accanto all'ancora, stile e logica in `template.html`. Il markdown si ricostruisce leggendo il DOM al click. Le icone Lucide stanno in uno sprite `<symbol>` nel `<body>` del template: non inlinearle nei singoli pulsanti, su 41 titoli costa 78 KB.
- `sources/` — materiale di riferimento per le prossime integrazioni (articoli di terzi in PDF). **Gitignored**: il repo è pubblico e non sono contenuti nostri. I PDF non si versionano.
- [`FONTI.md`](./FONTI.md) alla root — bibliografia completa dei 34 documenti del corpus (titolo, autore, testata, data di pubblicazione, link per esteso, nome del PDF), versionata così da poter ricostruire `sources/` da zero. È cosa diversa dalla sezione «Fonti» di `content.md`, che è l'elenco compatto pubblicato nella guida: aggiungendo una fonte vanno aggiornati entrambi.

## Pubblicazione — due canali
- **GitHub Pages**: si rigenera da sé nel workflow Actions a ogni push su `main` (ricostruisce `index.html` e copia `assets/`).
- **Vercel**: riceve l'HTML buildato in locale da `./deploy.sh` (build + copia `assets/` + `vercel deploy --prod --scope lotrek`).
- ⚠️ **Un push su `main` NON aggiorna Vercel**: per allineare entrambi i canali serve push *e* `./deploy.sh`.

## Convenzioni editoriali
- **Niente numeri di sezione** (né 1/1.1 né lettere A–J) nei titoli o nell'indice.
- **Rimandi interni per titolo** tra guillemet `«…»` nel sorgente: `build.mjs` li converte in virgolette curve.
- **Corsivi** (`*…*`) su termini tecnici/stranieri ed etichette (es. *heartbeat*, *Role/Focus/Do not*).
- **Smart quotes** e **neutralizzazione delle tilde singole**: automatiche in `build.mjs` (non gestirle a mano nel sorgente).

## Interfaccia
- **Indice laterale ad accordion** single-open: le macro-voci (H2) collassano le sotto-voci (H3), prima aperta di default, chevron, e l'accordion segue la parte in lettura. Markup generato in `build.mjs` (`.toc-group`/`.toc-macro`/`.toc-sub`), stile e logica in `template.html`.
- **Scrollspy deterministico**: l'attivo è l'ultimo titolo il cui bordo superiore ha oltrepassato la linea di lettura (`READ_LINE`, ~90px, coerente con `scroll-padding-top`), calcolato su `scroll` throttlato via `requestAnimationFrame`. Sostituisce il vecchio `IntersectionObserver` enter-only, che sfarfallava aprendo/chiudendo gli accordion ai confini di sezione. La spalla scorre da sé (`keepLinkVisible`) senza toccare la finestra; i click hanno una finestra `suppressUntil` (700ms) in cui lo scrollspy non interviene.
- **Badge di stato sui titoli**: la sintassi `{badge:Testo}` a fine heading (gestita in `build.mjs`) genera una pill lime accanto al titolo e un pallino accanto alla voce nell'indice laterale (classe `flag`), lasciando pulito il testo del TOC. In uso su «Il contesto di UX» con l'etichetta «In lavorazione»; da togliere quando la sezione si assesta.
- **Occhielli di capitolo**: «Capitolo N» sulle H2 con sotto-sezioni (numerazione automatica), etichette non numerate su Glossario/Fonti via la mappa `BACKMATTER_KICKER` in `build.mjs`.

## Fonti esterne integrate
- **UX-context design** (NN/g, Tony Alicea, 24 luglio 2026): integrato il 2026-07-27 nella sezione **«Il contesto di UX»** dopo «I file di contesto» (titolo in italiano per coerenza con gli altri; «UX-context design» resta come termine nel corpo e nel glossario), più la voce `UX.md` nell'elenco dei file, il glossario, le fonti e gli schemi di struttura. `UX.md` è dichiarato come proposta, non come formato con spec: se NN/g o altri lo consolidano, la sezione va rivista.

- **Lisa Demchenko** (Process to Pixels) è l'autrice di due fonti del capitolo 2: «How to write a DESIGN.md file Claude can actually use» (16 maggio 2026) e «What your AI co-designer can't infer from your hex values» (4 agosto 2026). Verificato sulle pagine originali il 2026-08-17, dopo che il credit di un'infografica mi aveva fatto scrivere «Lisa Wade»: non è quello il nome.
- **Le date in testa ai PDF archiviati sono date di snapshot, non di pubblicazione**, e sbagliano anche di settimane (es. «DESIGN.md Best Practices»: snapshot 20 giugno, uscita 17 giugno; «What is DESIGN.md»: snapshot 30 maggio, uscita 7 maggio). Citare sempre la data reale, ricavabile aprendo l'URL stampato nella prima pagina.
- **DESIGN.md** (4 PDF in `sources/DESIGN.md/`): integrato il 2026-08-17 nella nuova sezione **«Il contesto visivo»**, che fa coppia con «Il contesto di UX» (visivo = come deve apparire, UX = per chi è e come si comporta). La spec è **alpha** e ha questioni aperte dichiarate (dark mode, motion, breakpoint): se Google Labs la consolida, la sezione va rivista. Le due fonti UX Planet non riportano l'autore nel PDF archiviato: citate senza attribuzione, non assegnarle a Nick Babich senza verifica.

- **«Lo "spec" come ancora» è stata rimossa** il 2026-08-17 e fusa in «Dividere il lavoro tra Claude Desktop e Claude Code»: non riproporla come sezione. La fonte resta valida («How I use AI to partner on design problems»), era il peso a non giustificare più una voce d'indice.
- **`content.md` ha due indici**: quello manuale in testa al file (righe 7–40 circa) e quello generato da `build.mjs` per la spalla. Aggiungendo o togliendo una sezione vanno aggiornati entrambi, il primo a mano.
- Le righe `## Steps`, `### Output` e `## Components` che compaiono in un `grep '^## '` stanno **dentro blocchi di codice**: non sono titoli e `build.mjs` fa bene a ignorarle.

## In sospeso / da valutare
- **Variante indice «macro-voce solo espande»** (senza scroll del contenuto al click): valutata ma non adottata; l'utente ci ripenserà.
- **Differenziazione visiva degli occhielli di chiusura** (Appendice/Riferimenti) dai capitoli: possibile, non fatta.
- **Sezioni «2-bis» e «2-ter»** — da scrivere da zero, quando l'utente vorrà: 2-bis = plugin per Claude Code; 2-ter = architettura ad agenti/sub-agenti e workflow. Non esistono in nessun sorgente: non riproporle come lavoro imminente. Per la 2-bis c'è però materiale pronto in `sources/Claude Code for designers.pdf`: il workflow *spec-driven* del plugin GSD (cartella `.planning/` con PROJECT/REQUIREMENTS/ROADMAP/STATE, la sezione «Out of Scope» e la fase *Discuss*).

## Convenzione di manutenzione
A ogni sessione di lavoro, aggiornare `CHANGELOG.md` (cosa è cambiato) e questo `MEMORY.md` (decisioni/contesto).
