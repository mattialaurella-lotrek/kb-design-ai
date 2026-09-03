# Handoff: stato del progetto

Sintesi da incollare in una chat per allineare un assistente che non ha accesso al repo.
Il blocco «Dove siamo» lo riscrive `npm run build`, quindi i suoi numeri sono sempre quelli dell'ultima build. Il resto si aggiorna a mano quando lo stato si sposta davvero.

Le decisioni di lungo periodo si trovano in `docs/MEMORY.md`, la cronologia in `docs/CHANGELOG.md`, la bibliografia in `docs/FONTI.md`, il design system in `DESIGN.md` e le regole di lavoro in `CLAUDE.md`.

---

## Cos'è

Guida HTML **«Progettare con l'AI, una guida per non perdere la rotta (e il senno)»**, knowledge base del team di design Lotrek. Sette capitoli in sequenza, ognuno dà per acquisito il precedente: progettare il contesto, scriverlo nei file, collegare Claude e Figma, il design system per l'AI, costruire e pubblicare il prototipo (versionamento e archiviazione compresi), progettare con le skill di Claude, far lavorare l'agente da solo. Più i prossimi argomenti, il glossario e le fonti.

- Repo pubblico: `mattialaurella-lotrek/kb-design-ai`
- Online su [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app), anteprime su [kb-design-ai-preview.vercel.app](https://kb-design-ai-preview.vercel.app)

## Come è fatta

`src/content.md` (unico sorgente) → `scripts/build.mjs` (marked) inietta nel `src/template.html` bespoke → `index.html`.

`index.html` è **gitignored**: è un artefatto, non si modifica mai a mano. Ogni intervento passa da `src/content.md` (testo) o `src/template.html` (stile e comportamento) o `scripts/build.mjs` (markup generato).

## Dove siamo

<!-- stato:inizio -->
- 21.967 parole di prosa senza i blocchi di codice, 7 capitoli, 39 sezioni, 49 voci nell'indice laterale
- 58 documenti in `docs/FONTI.md`
- `index.html` pesa 336 KB, senza dipendenze esterne a runtime tranne IBM Plex Mono da Google Fonts
- Ultima build: 3 settembre 2026
<!-- stato:fine -->

## Le regole che vincolano il lavoro

Sono le cose che un assistente nuovo romperebbe per primo.

**Sorgente e indici.** `src/content.md` ha due indici da tenere allineati: quello manuale in testa al file e quello che `scripts/build.mjs` genera per la spalla. Aggiungendo o togliendo una sezione vanno aggiornati entrambi, il primo a mano.

**Convenzioni editoriali.** Niente numeri di sezione nei titoli. I rimandi interni si scrivono col titolo fra guillemet: `«Il contesto visivo»`. Per la forma del testo vedi le quattro regole più sotto. Smart quotes e neutralizzazione delle tilde sono automatiche in `scripts/build.mjs`, non si gestiscono a mano.

**Scrittura.** Ogni testo nuovo si scrive passando per la skill **`/not-ai`**, caricata prima di scrivere e non dopo, insieme al modulo `references/lexicon-it.md`. Poi si rilegge la bozza col secondo passaggio della skill prima di inserirla in `src/content.md`. In pratica: zero em dash (la casa sta a 0,2 ogni 1.000 parole), niente costrutti «X, non Y» se non portano una distinzione reale, niente frasi di calibrazione tipo «vale la pena notare», niente nomi astratti al posto di conseguenze concrete. La prosa attuale è stata ripulita così: mantenerla lì.

**Tipografia.** Ronzino (Collletttivo, SIL OFL 1.1), self-hostata in `assets/fonts/`. **La famiglia ha 400 / 500 / 700 e non ha il 600**: usare i token `--w-regular`, `--w-medium` e `--w-bold`, mai `font-weight: 600`, che il browser risolverebbe in Bold ovunque.

Scala: 18 corpo · 20 h4 · 24 h3 · 33,6 h2 · 52,8 h1 px, a rapporti crescenti.

**Ritmo verticale.** Due regole, in `rem` su multipli di 8. Lo spazio *sopra* un titolo cresce col livello: 128 capitolo, 56 sezione, 32 sotto-sezione. Lo spazio *sotto*: 32 / 16 / 12 / 8 per h1–h4. Nella colonna di lettura non ci sono filetti orizzontali, a separare è solo il vuoto: è per questo che il gap di capitolo è così ampio. **Mai margini in `em` sui titoli**: era quello a dare a un capitolo meno aria di una sezione, perché l'occhiello ha corpo 12px.

**Colore.** La palette viene dal design system Lotrek, file Figma WTF `29FQjdxBn7fesbU3NJkDxM`, quattro scale nominate da 50 a 950: Electric Lime, Shark, Edward, Nebula. Ogni token deve poggiare su un gradino vero, e le uniche due eccezioni dichiarate sono `--surface` e `--surface-2` del tema scuro, perché la scala Shark si ferma a 950. Il lime significa una cosa sola, lo stato attivo: l'hover è neutro e il codice inline resta nella famiglia del fondo. Sopra L\* 95 il lime perde identità e legge giallo, quindi le velature chiare non funzionano come accento. Topbar, spalla e colonna di lettura stanno sullo stesso fondo, a separarle è il filetto. Dal 23 agosto 2026 sono in uso anche due token semantici, `--ok` e `--ko`, presi dalle scale Success e Danger dello stesso file: cambiano gradino col tema per restare sopra il 3:1 in tutti e due.

**Forme.** Due raggi di brand, `0` e `100px`, più 4px per voci dell'indice, chip di codice e tooltip, e i cerchi. Frame, tabelle, blocchi di codice e immagini sono a spigolo.

**Icone.** Dalla sezione Icons del file Figma WTF (nodo `1:427`), 24×24 a tratto 1,5, inline in uno sprite `<symbol>` in cima al `<body>`. Niente glifi Unicode nell'interfaccia. I loghi di prodotti terzi sono un'altra cosa e non seguono questa regola: si usa il file ufficiale del marchio, senza ridisegnarlo né ricolorarlo. L'SVG di sezione le esporta tutte insieme a coordinate assolute, quindi nel simbolo ognuna si traspone con un `translate`; attenzione ai gruppi annidati, dove il primo `</g>` chiude quello interno e non l'icona.

**PDF.** Si rigenera a ogni pubblicazione, perché `deploy.sh` chiama `scripts/make-pdf.mjs` prima di preparare i file. La resa la decide il blocco `@media print` di `src/template.html`, non lo script: se una modifica tocca colori o struttura dei titoli, va guardato anche lì.

**Schemi nei blocchi di codice.** I caratteri box-drawing non fanno parte di IBM Plex Mono e il fallback li rende più larghi del 5% (8,70px contro 8,27px). La regola non è vietarli: è che **il numero di glifi Unicode resti quasi uguale su ogni riga del blocco**, perché lo scarto è di 0,43px a carattere. Un albero di cartelle sfasa di un carattere fra un livello e l'altro e non si vede; la riga di bordo di un riquadro ne ha decine in più della riga di contenuto e sfasa di 8px, quindi i riquadri sono da evitare. Lettere accentate, caporali e apostrofo tipografico sono a larghezza giusta. Larghezza utile fino a ~88 colonne, gli schemi in uso vanno da 68 a 74.

**Fonti.** **Ogni articolo integrato entra nelle fonti, sempre**, sia in `docs/FONTI.md` (bibliografia completa) sia nella sezione «Fonti» di `src/content.md` (elenco compatto pubblicato). Vale anche quando il PDF non si riesce ad archiviare in `sources/`, e in quel caso il campo `File:` dichiara perché manca. Le date sono di **pubblicazione**, non di snapshot: i PDF archiviati con `archive.is` portano in testa la data di archiviazione, che sbaglia anche di tre settimane. Le voci di `docs/FONTI.md` sono numerate in sequenza continua fra le sezioni, quindi inserirne una a metà vuol dire rinumerare quelle dopo e aggiornare i conteggi in testa al file.

**Materiale di riferimento.** I PDF degli articoli si trovano in `sources/`, che è **gitignored**: sono contenuti di terzi, non ridistribuibili. `docs/FONTI.md` è versionato e basta a ricostruire il corpus.

**Forma del testo, quattro regole.** **Mai il corsivo**, in nessun caso, nemmeno sui termini tecnici e stranieri: dove serviva si usa il tondo, o il grassetto se il segno faceva da etichetta. Un `<em>` nell'HTML generato è un errore. I titoletti in grassetto chiudono coi due punti dentro il grassetto, poi spazio e minuscola (`**Titolo:** testo`), mai col punto. Ogni file `.md` citato va in codice inline, tranne nei titoli degli articoli in Fonti. E dopo i due punti di un titoletto la frase non ne apre un secondo: si rifrasa.

**Anteprima.** `./deploy.sh preview` pubblica su Vercel e assegna l'alias fisso [kb-design-ai-preview.vercel.app](https://kb-design-ai-preview.vercel.app), che punta sempre all'ultima. Manda quello, mai l'URL del singolo deployment: cambia a ogni giro e chi riapre il vecchio guarda una versione superata credendola aggiornata.


## Aperto

**Le Figma Agent Skills**, rinviate dall'utente. Servono le fonti e la scelta della collocazione. Il dettaglio è in `docs/MEMORY.md`.

**Otto fonti aspettano in `docs/FONTI-DA-INTEGRARE.md`,** ordinate per tema. Il gruppo più denso è sull'economia del contesto e dei token, tre fonti di cui una primaria di Anthropic. I PDF delle cinque su Medium li passa l'utente, perché Medium blocca ogni lettura automatica.

**La versione a cui la tabella dei comandi è verificata non è più scritta in pagina.** È la 2.1.258 e resta nei documenti. Se al lettore serve, si rimette in tre parole.

**La tabella dei comandi invecchia da sola.** «I comandi di Claude Code» ne elenca cinquantanove su 111 documentati, e la documentazione cambia a ogni versione di Claude Code. Il testo lo dichiara e rimanda a `/help`. Rileggendola, la fonte comoda è la stessa pagina col suffisso `.md`, che dà il markdown grezzo.

**Due valori interpolati nel tema scuro.** `--surface` e `--surface-2` non poggiano su un gradino, perché la scala Shark si ferma a 950 e sotto il fondo non c'è niente. Se al file Figma vengono aggiunti un 960 e un 980, si agganciano.

**L'immagine di apertura è self-hostata** in `assets/`, 67 KB di materiale di Figma dentro un repo pubblico. La scelta serve a non far dipendere il PDF da un CDN esterno, visto che si genera a ogni deploy. Non ha didascalia né credito in pagina.

**Il capitolo «Scrivere il contesto» è il più grosso, al 22%.** È coerente, ma se un giorno servisse spezzarlo l'unica cucitura è fra l'elenco dei formati e i singoli file.

**Le categorie del catalogo delle skill sono ancora H3**, quindi nella spalla pesano quanto un capitolo. Per le librerie è risolto, per le skill no.

**Il capitolo sulle skill sta dopo tutto il resto per decisione dell'utente**, contro il mio parere. Dal 27 agosto 2026 non è più l'ultimo, perché lo segue «Far lavorare l'agente da solo», ma la decisione resta: non riaprire senza un motivo nuovo.

**Da provare a mano**: i pulsanti di copia non sono mai stati testati con un click vero, perché il browser headless non dà accesso agli appunti.

**Nota**: questo file è in un repo pubblico, quindi le valutazioni che contiene sono leggibili da chiunque.

## Come riprendere

```bash
cd ~/Projects/kb-design-ai
npm run build                 # rigenera index.html
python3 -m http.server 8899   # anteprima su http://localhost:8899
./deploy.sh preview           # anteprima su kb-design-ai-preview.vercel.app
./deploy.sh                   # build + deploy Vercel in produzione
```

A fine sessione vanno aggiornati `docs/CHANGELOG.md` (cosa è cambiato) e `docs/MEMORY.md` (decisioni e contesto). Questo file va riscritto quando lo stato si sposta in modo sostanziale; i suoi numeri li rifà `npm run build`.
