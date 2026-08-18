# Handoff: stato del progetto

Sintesi da incollare in una chat per allineare un assistente che non ha accesso al repo.
Aggiornato al **18 agosto 2026**. Le decisioni di lungo periodo stanno in `MEMORY.md`, la cronologia in `CHANGELOG.md`, la bibliografia in `FONTI.md`.

---

## Cos'è

Guida HTML **«Progettare con l'AI, una guida per non perdere la rotta (e il senno)»**, knowledge base del team di design Lotrek. Quattro capitoli: progettare il contesto, il flusso fra Claude e Figma, le Claude Skills, le librerie per prototipare. Più glossario e fonti.

- Repo pubblico: `mattialaurella-lotrek/kb-design-ai`
- Online su [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app) e su [GitHub Pages](https://mattialaurella-lotrek.github.io/kb-design-ai/)

## Come è fatta

`content.md` (unico sorgente) → `build.mjs` (marked) inietta nel `template.html` bespoke → `index.html`.

`index.html` è **gitignored**: è un artefatto, non si modifica mai a mano. Ogni intervento passa da `content.md` (testo) o `template.html` (stile e comportamento) o `build.mjs` (markup generato).

## Dove siamo

- 14.022 parole di prosa, 4 capitoli, 39 sezioni, 45 voci nell'indice laterale
- 51 fonti citate, 108 repository nel catalogo (59 skill, 47 librerie, alcuni condivisi)
- `index.html` pesa 206 KB, senza dipendenze esterne a runtime tranne IBM Plex Mono da Google Fonts
- Pubblicato su entrambi i canali il 18 agosto 2026. Niente di sospeso in locale.

## Le regole che vincolano il lavoro

Sono le cose che un assistente nuovo romperebbe per primo.

**Sorgente e indici.** `content.md` ha due indici da tenere allineati: quello manuale in testa al file e quello che `build.mjs` genera per la spalla. Aggiungendo o togliendo una sezione vanno aggiornati entrambi, il primo a mano.

**Convenzioni editoriali.** Niente numeri di sezione nei titoli. I rimandi interni si scrivono col titolo fra guillemet: `«Il contesto visivo»`. Corsivi sui termini tecnici e stranieri. Smart quotes e neutralizzazione delle tilde sono automatiche in `build.mjs`, non si gestiscono a mano.

**Scrittura.** Ogni testo passa da un audit anti-AI-ism: zero em dash (la casa sta a 0,2 ogni 1000 parole), niente costrutti «X, non Y» se non portano una distinzione reale, niente frasi di calibrazione tipo «vale la pena notare», niente nomi astratti al posto di conseguenze concrete. La prosa attuale è stata ripulita così: mantenerla lì.

**Tipografia.** Ronzino (Collletttivo, SIL OFL 1.1), self-hostato in `assets/fonts/`. **La famiglia ha 400 / 500 / 700 e non ha il 600**: usare i token `--w-medium` e `--w-bold`, mai `font-weight: 600`, che il browser risolverebbe in Bold ovunque.

Scala: 18 corpo · 20 h4 · 24 h3 · 33,6 h2 · 52,8 h1 px, a rapporti crescenti.

**Ritmo verticale.** Due regole, in `rem` su multipli di 8. Lo spazio *sopra* un titolo cresce col livello: 128 capitolo, 56 sezione, 32 sotto-sezione. Lo spazio *sotto*: 32 / 16 / 12 / 8 per h1–h4. Nella colonna di lettura non ci sono filetti orizzontali, a separare è solo il vuoto: è per questo che il gap di capitolo è così ampio. **Mai margini in `em` sui titoli**: era quello a dare a un capitolo meno aria di una sezione, perché l'occhiello ha corpo 12px.

**Colore.** Accento lime `#d9fb12` usato con parsimonia e mai come fondo esteso, secondo il design DNA in `repass.io.md`. Per questo la numerazione a pallini è in inchiostro e non in lime. Tre livelli di fondo: `--bg-chrome` per topbar e spalla, `--bg` per la colonna di lettura, `--surface` per codice e tabelle.

**Icone.** Tutte da [Lucide](https://lucide.dev/icons/), inline in uno sprite `<symbol>` in cima al `<body>`. In uso: `copy`, `link`, `check`, `sun`, `moon`, `monitor`, `menu`. Niente glifi Unicode nell'interfaccia.

**Fonti.** Le date sono di **pubblicazione**, non di snapshot: i PDF archiviati con `archive.is` portano in testa la data di archiviazione, che sbaglia anche di tre settimane. La bibliografia completa sta in `FONTI.md`, l'elenco compatto nella sezione «Fonti» di `content.md`: aggiungendo una fonte vanno aggiornati entrambi.

**Materiale di riferimento.** I PDF degli articoli stanno in `sources/`, che è **gitignored**: sono contenuti di terzi, non ridistribuibili. `FONTI.md` è versionato e basta a ricostruire il corpus.

**Forma del testo, tre regole introdotte il 18 agosto.** Mai il corsivo, in nessun caso: dove serviva si usa il tondo, o il grassetto se il segno faceva da etichetta. I titoletti in grassetto chiudono coi due punti dentro il grassetto, poi spazio e minuscola (`**Titolo:** testo`), mai col punto. Ogni file `.md` citato va in codice inline, tranne nei titoli degli articoli in Fonti. E dopo i due punti di un titoletto la frase non ne apre un secondo: si rifrasa.

**Anteprima.** `./deploy.sh preview` pubblica su Vercel e assegna l'alias fisso [kb-design-ai-preview.vercel.app](https://kb-design-ai-preview.vercel.app), che punta sempre all'ultima. Manda quello, mai l'URL del singolo deployment: cambia a ogni giro e chi riapre il vecchio guarda una versione superata credendola aggiornata.

**Pubblicazione, due canali.** GitHub Pages si rigenera da sé a ogni push su `main`. Vercel riceve la build locale da `./deploy.sh`. **Un push non aggiorna Vercel**: per allineare entrambi servono push *e* `./deploy.sh`.

## Fatto in questa sessione

**Struttura.** Nuovo capitolo «Librerie per prototipare», che raccoglie i quattro blocchi del catalogo che skill non erano (fondamenta e asset, componenti UI, motion, suono) più la nuova categoria «Effetti e transizioni». Il criterio della divisione: nel capitolo delle skill sta ciò che istruisce l'agente, in quello delle librerie ciò che finisce dentro il prototipo. Capitolo 1 rifatto e rinominato «Progettare il contesto», capitolo 2 rinominato «Flusso tra Claude e Figma». Il blocco sul design system rimesso in ordine cronologico: rendere leggibile, impacchettare in una skill, imporre.

**Contenuti nuovi.** Il capitolo 1 passa da 908 a 1.906 parole con tre sezioni: «Il contesto è una risorsa finita» (attention budget e meccanismo del context rot), «Dare struttura al contesto» (i quattro pilastri di context architecture di Paz Perez) e «Tenere sano il contesto nel tempo» (compaction, note esterne, sub-agenti, recupero just-in-time). «Le skill ufficiali di Figma» passa da 10 a 16 voci, raggruppate per direzione del lavoro, con un blocco su requisiti e limiti che prima mancava.

**Catalogo.** 23 repository nuovi dalle stelle GitHub non ancora catalogate, quattro link rotti riparati, il conteggio in apertura ricalcolato (diceva 82, sono 106 fra i due capitoli).

**Forma.** 78 corsivi eliminati, 156 titoletti uniformati ai due punti, 65 file `.md` passati in monospace, 67 paragrafi riscritti per togliere i doppi due punti. Corretto un difetto tipografico che ne è uscito: la punteggiatura dopo un chip di codice restava staccata, ora la recupera uno span con margine negativo generato in `build.mjs`.

**Infrastruttura.** `./deploy.sh preview` con alias fisso come canale standard di revisione.

## Aperto

**Prossima sessione, già concordato.** Integrazioni sui temi `DESIGN.md` e `CLAUDE.md`, per cui c'è materiale non sfruttato in `sources/`. E una sezione nuova sulle **skill per l'agente AI di Figma**, che sono cosa diversa dalle skill dell'MCP già coperte: quelle servono a un agente esterno che scrive su Figma, queste riguardano l'agente che vive dentro Figma.

**Il capitolo 2 è il 57% della guida** (7.800 parole, 14 sezioni), contro il 14% del capitolo 1 e il 16% del 3. Resta lo squilibrio strutturale principale, anche se il rifacimento del capitolo 1 lo ha ridotto di cinque punti. Proposta discussa e non eseguita: spezzarlo lungo la cucitura naturale, «come si imposta il contesto» e «come si lavora con Figma e si arriva in produzione».

**Le categorie del catalogo sono H3 come le sezioni che si leggono**, quindi nella spalla un contenitore di link pesa quanto un capitolo di prosa. Si vede dal disallineamento fra i due indici. Da sciogliere portandole a H4.

**33 paragrafi senza titoletto hanno ancora i doppi due punti.** I 67 col titoletto sono stati riscritti, questi no: la regola non ci si aggancia in modo ovvio, perché i due segni stanno in frasi diverse dello stesso paragrafo.

**Due repository da portare nel testo** invece che nel solo catalogo: `sherizan/designagent-design`, che impianta `DESIGN.md` e ci fa il lint del codice, per «Il contesto visivo»; e `southleft/ds-contracts-poc`, che genera libreria React e libreria Figma da un'unica fonte con un differ a tre vie, per «Enforcement del design system».

**Navigazione a capitolo singolo**: valutata e scartata. Nascondere i capitoli uccide Cmd+F, che è il modo con cui una knowledge base si consulta davvero. Da riconsiderare semmai dopo aver riequilibrato i capitoli.

**Sezioni 2-bis e 2-ter**, da scrivere quando servirà: plugin per Claude Code, e architettura ad agenti e sub-agenti. Per la 2-bis c'è materiale pronto in `sources/Claude Code for designers.pdf`.

**Tre fonti senza link**: le tre schede NN/g raggruppate su una riga, «Design with AI, Five insights from workflows» e il carosello di @friendlyunit, che non ha una pagina sorgente.

**Due PDF citati ma assenti** da `sources/`: `Figma skills for Claude Code 1.pdf` e `Design with AI IAAD.pdf`.

**Da provare a mano**: i pulsanti copia sui titoli non sono mai stati testati con un click vero, perché il browser headless non dà accesso agli appunti. Serve anche una verifica del tema chiaro nel browser reale.

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
