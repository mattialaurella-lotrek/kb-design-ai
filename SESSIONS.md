# Handoff: stato del progetto

Sintesi da incollare in una chat per allineare un assistente che non ha accesso al repo.
Aggiornato al **17 agosto 2026**. Le decisioni di lungo periodo stanno in `MEMORY.md`, la cronologia in `CHANGELOG.md`, la bibliografia in `FONTI.md`.

---

## Cos'è

Guida HTML **«Progettare con l'AI, una guida per non perdere la rotta (e il senno)»**, knowledge base del team di design Lotrek. Copre context engineering e prompting, il flusso fra Claude e Figma, le Claude Skills, più glossario e fonti.

- Repo pubblico: `mattialaurella-lotrek/kb-design-ai`
- Online su [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app) e su [GitHub Pages](https://mattialaurella-lotrek.github.io/kb-design-ai/)

## Come è fatta

`content.md` (unico sorgente) → `build.mjs` (marked) inietta nel `template.html` bespoke → `index.html`.

`index.html` è **gitignored**: è un artefatto, non si modifica mai a mano. Ogni intervento passa da `content.md` (testo) o `template.html` (stile e comportamento) o `build.mjs` (markup generato).

## Dove siamo

- 11.693 parole di prosa, 5 capitoli, 37 sezioni, 41 voci nell'indice laterale
- 47 fonti citate con autore, titolo linkato e data
- `index.html` pesa 172 KB, senza dipendenze esterne a runtime tranne IBM Plex Mono da Google Fonts
- Ultimo commit pubblicato su entrambi i canali il 17 agosto 2026. Niente di sospeso in locale.

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

**Pubblicazione, due canali.** GitHub Pages si rigenera da sé a ogni push su `main`. Vercel riceve la build locale da `./deploy.sh`. **Un push non aggiorna Vercel**: per allineare entrambi servono push *e* `./deploy.sh`.

## Fatto in questa sessione

**Tipografia e layout.** Sostituito Instrument Sans con Ronzino. Allargata la scala dei titoli: l'h4 stava sotto al corpo e l'h3 lo superava solo dell'1,14×, mentre l'h2 saltava del 1,64×. Riscritto il ritmo verticale, che dava a un capitolo meno respiro di una sezione. Aggiunta la separazione di fondo fra chrome e colonna di lettura. Numerazione a pallini pieni. Icone Lucide al posto dei glifi.

**Contenuti.** Nuova sezione «Il contesto visivo» su DESIGN.md, che fa coppia con «Il contesto di UX»: chiude l'asimmetria per cui `UX.md`, dichiarato una proposta, aveva una sezione e `DESIGN.md`, che una spec ce l'ha, una riga sola. Ampliata «I file di contesto» col raggruppamento per frequenza di lettura e quattro file che mancavano (`FLOWS.md`, `DECISIONS.md`, `REVIEW.md`, `COMPONENTS.md`). Rimossa «Lo "spec" come ancora», diventata ridondante, con la parte che valeva confluita nel capitolo 2. Passaggio anti-AI-ism su tutti i testi.

**Fonti.** Creato `FONTI.md`, bibliografia dei 34 documenti del corpus in cinque gruppi. Riscritta la sezione «Fonti» della guida nel formato autore + titolo linkato + data. Corretta un'attribuzione sbagliata: due articoli sono di **Lisa Demchenko**, non di «Lisa Wade».

**Interfaccia.** Comandi copia-sezione e copia-link sui titoli, in hover. Voce «Introduzione» nell'indice. Riparata l'apertura, dove il lede dell'hero era sempre stato vuoto per una convenzione mai usata nel sorgente. Link del testo in Medium con sottolineatura lime animata, e link esterni in scheda nuova.

**Bug collaterali sistemati.** Il workflow GitHub Pages copiava in `dist/` solo `index.html` e non `assets/`: logo e favicon erano rotti da tempo. L'indice manuale in testa a `content.md` era fuori sincrono.

## Aperto

**Il capitolo 2 è il 62% della guida** (7.297 parole, 14 sezioni), contro l'8% del capitolo 1 e il 18,5% del 3. È lo squilibrio strutturale principale. Proposta discussa e non ancora eseguita: spezzarlo in due lungo la cucitura naturale, «come si imposta il contesto» (ambienti, file di contesto, contesto visivo, contesto di UX, struttura di cartelle) e «come si lavora con Figma e si arriva in produzione» (MCP, bridge, skill Figma, enforcement, design system, comandi, deploy). Verrebbero due capitoli da circa 3.500 parole.

**Navigazione a capitolo singolo**: valutata e scartata. Nascondere i capitoli uccide Cmd+F, che è il modo con cui una knowledge base si consulta davvero. L'ibrido con `hidden="until-found"` preserverebbe la ricerca, ma Safari lo ha solo in Technology Preview e il pubblico è un team di design su Mac. Da riconsiderare semmai dopo aver riequilibrato i capitoli.

**Sezioni 2-bis e 2-ter**, da scrivere quando servirà: plugin per Claude Code, e architettura ad agenti e sub-agenti. Per la 2-bis c'è materiale pronto in `sources/Claude Code for designers.pdf`, che documenta il workflow spec-driven del plugin GSD.

**Tre fonti senza link**: le tre schede NN/g raggruppate su una riga, «Design with AI, Five insights from workflows» e il carosello di @friendlyunit, che non ha una pagina sorgente. Da spacchettare e verificare, o da togliere.

**Due PDF citati ma assenti** da `sources/`: `Figma skills for Claude Code 1.pdf` (quello di aprile) e `Design with AI IAAD.pdf`.

**Da provare a mano**: i pulsanti copia sui titoli non sono stati testati con un click vero, perché il browser headless non dà accesso agli appunti. Serve anche una verifica del tema chiaro nel browser reale.

**Nota**: questo file sta in un repo pubblico, quindi le valutazioni che contiene sono leggibili da chiunque.

## Come riprendere

```bash
cd ~/Projects/kb-design-ai
npm run build                 # rigenera index.html
python3 -m http.server 8899   # anteprima su http://localhost:8899
./deploy.sh                   # build + deploy Vercel in produzione
```

A fine sessione vanno aggiornati `CHANGELOG.md` (cosa è cambiato) e `MEMORY.md` (decisioni e contesto). Questo file va riscritto quando lo stato si sposta in modo sostanziale.
