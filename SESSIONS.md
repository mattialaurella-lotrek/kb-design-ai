# Handoff: stato del progetto

Sintesi da incollare in una chat per allineare un assistente che non ha accesso al repo.
Aggiornato al **20 agosto 2026**. Le decisioni di lungo periodo stanno in `MEMORY.md`, la cronologia in `CHANGELOG.md`, la bibliografia in `FONTI.md`.

---

## Cos'è

Guida HTML **«Progettare con l'AI, una guida per non perdere la rotta (e il senno)»**, knowledge base del team di design Lotrek. Quattro capitoli: progettare il contesto, il flusso fra Claude e Figma, le Claude Skills, le librerie per prototipare. Più glossario e fonti.

- Repo pubblico: `mattialaurella-lotrek/kb-design-ai`
- Online su [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app) e su [GitHub Pages](https://mattialaurella-lotrek.github.io/kb-design-ai/)

## Come è fatta

`content.md` (unico sorgente) → `build.mjs` (marked) inietta nel `template.html` bespoke → `index.html`.

`index.html` è **gitignored**: è un artefatto, non si modifica mai a mano. Ogni intervento passa da `content.md` (testo) o `template.html` (stile e comportamento) o `build.mjs` (markup generato).

## Dove siamo

- 19.160 parole di prosa, 6 capitoli, 35 sezioni, 44 voci nell'indice laterale
- 60 fonti citate in guida e 46 documenti in `FONTI.md`, 108 repository nel catalogo
- 53 rimandi interni, tutti risolti in link dalla build
- `index.html` pesa 239 KB, senza dipendenze esterne a runtime tranne IBM Plex Mono da Google Fonts
- Pubblicato su entrambi i canali il 21 agosto 2026

## Le regole che vincolano il lavoro

Sono le cose che un assistente nuovo romperebbe per primo.

**Sorgente e indici.** `content.md` ha due indici da tenere allineati: quello manuale in testa al file e quello che `build.mjs` genera per la spalla. Aggiungendo o togliendo una sezione vanno aggiornati entrambi, il primo a mano.

**Convenzioni editoriali.** Niente numeri di sezione nei titoli. I rimandi interni si scrivono col titolo fra guillemet: `«Il contesto visivo»`. Per la forma del testo vedi le quattro regole più sotto. Smart quotes e neutralizzazione delle tilde sono automatiche in `build.mjs`, non si gestiscono a mano.

**Scrittura.** Ogni testo nuovo si scrive passando per la skill **`/not-ai`**, caricata prima di scrivere e non dopo, insieme al modulo `references/lexicon-it.md`. Poi si rilegge la bozza col secondo passaggio della skill prima di inserirla in `content.md`. In pratica: zero em dash (la casa sta a 0,2 ogni 1.000 parole), niente costrutti «X, non Y» se non portano una distinzione reale, niente frasi di calibrazione tipo «vale la pena notare», niente nomi astratti al posto di conseguenze concrete. La prosa attuale è stata ripulita così: mantenerla lì.

**Tipografia.** Ronzino (Collletttivo, SIL OFL 1.1), self-hostato in `assets/fonts/`. **La famiglia ha 400 / 500 / 700 e non ha il 600**: usare i token `--w-medium` e `--w-bold`, mai `font-weight: 600`, che il browser risolverebbe in Bold ovunque.

Scala: 18 corpo · 20 h4 · 24 h3 · 33,6 h2 · 52,8 h1 px, a rapporti crescenti.

**Ritmo verticale.** Due regole, in `rem` su multipli di 8. Lo spazio *sopra* un titolo cresce col livello: 128 capitolo, 56 sezione, 32 sotto-sezione. Lo spazio *sotto*: 32 / 16 / 12 / 8 per h1–h4. Nella colonna di lettura non ci sono filetti orizzontali, a separare è solo il vuoto: è per questo che il gap di capitolo è così ampio. **Mai margini in `em` sui titoli**: era quello a dare a un capitolo meno aria di una sezione, perché l'occhiello ha corpo 12px.

**Colore.** Accento lime `#d9fb12` usato con parsimonia e mai come fondo esteso, secondo il design DNA in `repass.io.md`. Per questo la numerazione a pallini è in inchiostro e non in lime. Tre livelli di fondo: `--bg-chrome` per topbar e spalla, `--bg` per la colonna di lettura, `--surface` per codice e tabelle.

**Icone.** Tutte da [Lucide](https://lucide.dev/icons/), inline in uno sprite `<symbol>` in cima al `<body>`. In uso: `copy`, `link`, `check`, `sun`, `moon`, `monitor`, `menu`. Niente glifi Unicode nell'interfaccia.

**Schemi nei blocchi di codice.** I caratteri box-drawing non stanno in IBM Plex Mono e il fallback li rende più larghi del 5% (8,70px contro 8,27px). La regola non è vietarli: è che **il numero di glifi Unicode resti quasi uguale su ogni riga del blocco**, perché lo scarto è di 0,43px a carattere. Un albero di cartelle sfasa di un carattere fra un livello e l'altro e non si vede; la riga di bordo di un riquadro ne ha decine in più della riga di contenuto e sfasa di 8px, quindi i riquadri sono da evitare. Lettere accentate, caporali e apostrofo tipografico sono a larghezza giusta. Larghezza utile fino a ~88 colonne, gli schemi in uso stanno fra 68 e 74.

**Fonti.** **Ogni articolo integrato entra nelle fonti, sempre**, sia in `FONTI.md` (bibliografia completa) sia nella sezione «Fonti» di `content.md` (elenco compatto pubblicato). Vale anche quando il PDF non si riesce ad archiviare in `sources/`, e in quel caso il campo `File:` dichiara perché manca. Le date sono di **pubblicazione**, non di snapshot: i PDF archiviati con `archive.is` portano in testa la data di archiviazione, che sbaglia anche di tre settimane. Le voci di `FONTI.md` sono numerate in sequenza continua fra le sezioni, quindi inserirne una a metà vuol dire rinumerare quelle dopo e aggiornare i conteggi in testa al file.

**Materiale di riferimento.** I PDF degli articoli stanno in `sources/`, che è **gitignored**: sono contenuti di terzi, non ridistribuibili. `FONTI.md` è versionato e basta a ricostruire il corpus.

**Forma del testo, quattro regole.** **Mai il corsivo**, in nessun caso, nemmeno sui termini tecnici e stranieri: dove serviva si usa il tondo, o il grassetto se il segno faceva da etichetta. Un `<em>` nell'HTML generato è un errore. I titoletti in grassetto chiudono coi due punti dentro il grassetto, poi spazio e minuscola (`**Titolo:** testo`), mai col punto. Ogni file `.md` citato va in codice inline, tranne nei titoli degli articoli in Fonti. E dopo i due punti di un titoletto la frase non ne apre un secondo: si rifrasa.

**Anteprima.** `./deploy.sh preview` pubblica su Vercel e assegna l'alias fisso [kb-design-ai-preview.vercel.app](https://kb-design-ai-preview.vercel.app), che punta sempre all'ultima. Manda quello, mai l'URL del singolo deployment: cambia a ogni giro e chi riapre il vecchio guarda una versione superata credendola aggiornata.

**Pubblicazione, due canali.** GitHub Pages si rigenera da sé a ogni push su `main`. Vercel riceve la build locale da `./deploy.sh`. **Un push non aggiorna Vercel**: per allineare entrambi servono push *e* `./deploy.sh`.

## Fatto in questa sessione

**Riassetto strutturale, da tre capitoli a sei.** Il vecchio capitolo 2 valeva il 58% della guida e teneva insieme i file di contesto e il lavoro con Figma, che non si parlano. Ora sono sei capitoli in sequenza (10/26/16/10/10/15%): Progettare il contesto, Scrivere il contesto, Collegare Claude e Figma, Il design system per l'AI, Costruire e pubblicare un prototipo, Lavorare con le Claude Skills. Il criterio è che ogni capitolo risponda a una domanda sola.

**Sezione «CLAUDE.md» nuova**, che mancava del tutto, e «Dal codice al canvas e ritorno» sul giro completo fra Claude e Figma introdotto da Code to Canvas.

**Glossario da 12 a 43 voci.** I termini tecnici usati nel corpo e mai spiegati erano 29, ora zero. Sono entrate le parole che fermano chi comincia, da `repo` a `front matter`.

**53 rimandi interni sono diventati link**, generati da `build.mjs` a partire dai guillemets nel sorgente, con avviso in build quando un rimando non centra più il bersaglio.

**Tre duplicazioni sciolte** (nomi dei token, limite delle duecento righe, stati dei componenti) e le sezioni consigliate del `CLAUDE.md` spostate dove servono. Delle sette ripetizioni misurate, quattro erano falsi positivi.

**Capitolo 1 da 2.105 a 1.896 parole**, con la checklist riscritta come checklist vera e un esercizio in coda a «Requisiti minimi di partenza».

**Due bug corretti.** La voce attiva della spalla illuminava sempre la sezione precedente a quella cliccata, perché lo scrollspy ignorava lo `scroll-margin-top` dei titoli; e i capitoli si aprivano e chiudevano durante un salto, perché la finestra di silenzio era un timer fisso da 700ms contro uno scroll che dura fino a 1.635ms.

**Fonti da 42 a 46.**

## Aperto

**Le Figma Agent Skills**, rinviate dall'utente. Servono le fonti e la scelta della collocazione. Il dettaglio è in `MEMORY.md`.

**Il capitolo «Scrivere il contesto» è il più grosso, al 26%.** È coerente, perché i file di contesto sono il cuore della guida, ma se un giorno servisse spezzarlo l'unica cucitura è fra l'elenco dei formati e i singoli file.

**Le categorie del catalogo delle skill sono ancora H3**, quindi nella spalla pesano quanto un capitolo. Per le librerie è risolto, per le skill no.

**Il capitolo sulle skill sta in fondo per decisione dell'utente**, contro il mio parere: «skill» compare 45 volte prima. Non riaprire senza un motivo nuovo.

**33 paragrafi senza titoletto hanno ancora i doppi due punti.**

**Da provare a mano**: i pulsanti di copia sui titoli non sono mai stati testati con un click vero, perché il browser headless non dà accesso agli appunti.

**Nota**: questo file sta in un repo pubblico, quindi le valutazioni che contiene sono leggibili da chiunque.

## Come riprendere

```bash
cd ~/Projects/kb-design-ai
npm run build                 # rigenera index.html
python3 -m http.server 8899   # anteprima su http://localhost:8899
./deploy.sh preview           # anteprima su kb-design-ai-preview.vercel.app
./deploy.sh                   # build + deploy Vercel in produzione
```

A fine sessione vanno aggiornati `CHANGELOG.md` (cosa è cambiato) e `MEMORY.md` (decisioni e contesto). Questo file va riscritto quando lo stato si sposta in modo sostanziale.
