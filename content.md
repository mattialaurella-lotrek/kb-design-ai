# Progettare con l'AI: knowledge base del team di design Lotrek

Questa guida raccoglie il metodo e gli strumenti per progettare con l'AI nel team di design. Ti serve per tre cose: impostare un progetto con context engineering e prompting, far lavorare insieme Claude e Figma, e scegliere le skill già pronte da cui partire. Il taglio è operativo: metodi, comandi e strumenti concreti.

Come leggerla: la prima parte copre context engineering e prompting, la seconda il flusso tra Claude e Figma, la terza il catalogo di skill di riferimento, poi un glossario dei termini e le fonti. Trovi tutti i sotto-capitoli nell'indice qui sotto: leggila in ordine per costruirti il quadro, oppure salta al punto che ti serve quando hai un problema specifico davanti.

**Indice**

- **Context engineering e prompting**
  - Dal comando al contesto
  - Context rot: perché le sessioni lunghe degradano
  - I quattro layer del contesto
  - Architettura dei token a tre tier
  - Tecniche di prompting
  - Tre framework di prompt pronti
  - Lo "spec" come ancora
  - Checklist pre-task e segnali
  - Human-in-the-loop
- **Flusso ottimale tra Claude e Figma**
  - Il quadro d'insieme
  - Claude Desktop e Claude Code: come dividere il lavoro (in locale)
  - I file di contesto (CLAUDE.md, AGENTS.md, DESIGN.md, SKILL.md, MEMORY.md)
  - Struttura di file e cartelle di un progetto di design
  - Setup e loop con Figma MCP
  - MCP nativo di Figma, Figma Desktop Bridge e DesignAgent a confronto
  - Le skill Figma ufficiali
  - Enforcement del design system
  - Rendere il design system leggibile dall'AI
  - Comandi, slash command e subagent per il design
  - Creare una skill dal proprio design system
  - Deploy del prototipo (locale, Vercel, GitHub Pages)
- **Repository di skill di riferimento**
  - Categorie tematiche (collezioni, design system, ponte Figma, qualità UI, a11y, content, asset, componenti, motion, infrastruttura)
  - Starter pack di skill per product designer (cheatsheet)
  - Skill UI/UX con comando (roundup)
- **Glossario**
- **Fonti**

---

## Context engineering e prompting

### Dal comando al contesto

Il problema di gran parte del lavoro con l'AI non è il "prompt scritto male": è non aver dato al modello le informazioni per ragionare con chiarezza. Aggiungere dettaglio non equivale ad aggiungere qualità. Anzi, oltre una certa soglia l'accuratezza cala. Il *context engineering* è "design thinking applicato all'AI": si struttura il contesto come si progetta un sistema, e l'AI diventa un collaboratore affidabile invece di un generatore di varianti casuali.

La definizione utile da tenere a mente è quella di Anthropic: curare **il più piccolo insieme possibile di token ad alto segnale** che massimizza la probabilità del risultato voluto. È l'opposto dell'istinto comune ("carico tutto: brand PDF + ricerca + design system"). Caricare tutto fa peggiorare l'output, non migliorarlo: il modello si distrae e "dimentica" i vincoli. Vale lo stesso principio della progressive disclosure nell'interfaccia: si rivela l'informazione quando è rilevante.

**Comando vs contesto, in pratica:**

- *Approccio comando*: "Genera 5 layout di checkout." → opzioni generiche dal training generale; poche utili, molto rework.
- *Approccio contesto*: si forniscono token + esempio del pattern, vincoli di brand espliciti, dati reali sugli utenti e sui punti di abbandono, e infine il task con criteri di successo. → varianti informate, coerenti col sistema, già inquadrate.

### Context rot: perché le sessioni lunghe degradano

Anche partendo da un contesto curato, la qualità si degrada col tempo: falsi avvii, tentativi di debug, divagazioni riempiono la finestra di "rumore" e il modello inizia a riferirsi ai propri output scadenti. Strategie pratiche:

- **Riassumere e ripartire**: chiudere l'istanza, fare un summary, aprirne una nuova col summary come seme.
- **Confini espliciti**: marcare le sezioni ("tentativi precedenti, solo riferimento" vs "contesto di lavoro attuale").
- **Checkpoint periodici**: far riassumere stato e decisioni a intervalli regolari.
- **Non "buttare tutto dentro"**: la gestione intenzionale dell'informazione (cosa includere, cosa escludere, quando rinfrescare) è parte del lavoro. Anche gli strumenti collegati pesano: gli MCP attivi occupano la finestra di contesto (vedi «Setup e loop con Figma MCP»).

### I quattro layer del contesto

Un framework per capire cos'è "buon contesto":

1. **Design system (il contenitore)**: il vocabolario e le regole fondamentali. All'AI non serve il file Figma o un PDF: servono token colore come variabili CSS (`--color-primary-500`), una scala di spaziatura con rapporti chiari, componenti d'esempio che mostrano i token in uso, e soprattutto **naming semantico che rivela l'intento**. `--color-text-primary` dice qualcosa che `#1a1a1a` non dice: l'AI può ragionare sull'intento, non su un hex arbitrario.
2. **Brand guidelines (i vincoli)**: trasformare le linee guida da PDF aspirazionale a vincoli operativi. Bloccare gli elementi critici (logo, colori primari, type core), dichiarare esplicitamente le aree di libertà, definire confini concreti ("Headline in Inter Bold, 24–48px" non "headline moderne").
3. **User research (l'ancora)**: il layer più sottovalutato. Tiene le proposte ancorate alla realtà: demografia, requisiti di accessibilità (livelli WCAG, tecnologie assistive), pattern di comportamento reali, edge case e localizzazione. È la differenza tra "generatore di varianti" e "collaboratore informato".
4. **Workflow (la messa in scena)**: come si strutturano le richieste (vedi «Tecniche di prompting»).

### Architettura dei token a tre tier

Il design system più "leggibile" dall'AI segue tre livelli:

- **Tier 1: Primitive**: valori grezzi (colori, unità di spazio, dimensioni type). Raramente referenziati direttamente.
- **Tier 2: Semantic**: token che mappano le primitive a un significato (`--color-feedback-error`, `--spacing-content-gap`, `--text-heading-large`). Qui vive l'intento.
- **Tier 3: Component**: pattern pre-composti che combinano token semantici (es. una "card" con spaziature, colori, type e ombre corretti).

### Tecniche di prompting

- **Chain-of-thought**: invece di chiedere l'output finale, si struttura la richiesta in passi (analizza lo stato → individua i vincoli → genera 3 approcci → valuta ciascuno contro i vincoli e raccomanda). Migliora i risultati e rende il ragionamento trasparente: si intercettano gli errori a metà processo.
- **Tree-of-thought**: per decisioni strategiche con trade-off, esplora più percorsi di ragionamento; si vede l'albero decisionale, non solo la conclusione.
- **Scomporre i task complessi** in sotto-task focalizzati su un problema alla volta.
- **Ancorare all'intento dell'utente**, non solo al visivo: obiettivi e comportamenti, non solo estetica.
- **Usare i vincoli come guida**: piattaforma, accessibilità, brand sono strumenti per output realistici e coerenti.
- **Tradurre lo stile in implementazione**: "rendilo moderno" non significa nulla operativamente; va convertito in regole ("ritmo 8px", "gerarchia primario/secondario chiara", "stati hover/focus/disabled visibili").

### Tre framework di prompt pronti

Il contesto va **prima** del task (l'AI processa in sequenza: ciò che vede prima condiziona il resto).

- **Foundation-first** (generazione di design): `SYSTEM CONTEXT` → `BRAND CONSTRAINTS` → `USER REQUIREMENTS` → `TASK` → `SUCCESS CRITERIA`.
- **Reasoning-forward** (decisioni strategiche): `CONTEXT` → `CONSTRAINTS` → `QUESTION` → `PROCESS` (per ogni opzione: approccio, vantaggi dati i vincoli, rischi, raccomandazione motivata).
- **Iterative refinement** (miglioramento): `CURRENT STATE` → `FEEDBACK` → `NEW CONSTRAINTS` → `TASK` (raffina e spiega cosa è cambiato e perché).

### Lo "spec" come ancora

Scrivere la soluzione è a sua volta contesto: una volta messo per iscritto lo spec del flusso, diventa l'ancora da cui l'AI genera tutto il resto (prototipo hi-fi, journey map, piano d'implementazione) e che riduce le allucinazioni nei flussi complessi. Pratica utile: tracciare le decisioni per round in una cartella `design/`, così non si ripesca dai thread di commenti Figma il "perché" di una scelta di tre settimane prima.

### Checklist pre-task e segnali

**Prima di lanciare un task con l'AI**, verificare di avere: token con gerarchia e naming semantico + componenti d'esempio + edge case documentati; guidelines come vincoli espliciti con elementi bloccati/flessibili; demografia, requisiti a11y e friction point reali; richiesta in fasi, criteri di successo e priorità tra i vincoli definiti.

**Buoni segnali**: l'output rispetta il design system senza promemoria; le varianti sono on-brand senza correzioni pesanti; l'accessibilità è inclusa, non aggiunta dopo; si passa più tempo sulla strategia che sul rework.

**Segnali d'allarme** (di solito = problema di contesto, non di capacità del modello): output da rilavorare molto; varianti generiche o "quasi giuste"; vincoli aggiunti in continuazione a metà processo; qualità che varia molto tra una sessione e l'altra.

### Human-in-the-loop

Il lavoro critico va fatto **prima** di coinvolgere l'AI: ricerca, framing, ipotesi. Ogni elemento generato va validato per funzionalità e allineamento al brand. La competenza più importante non è la padronanza di Figma o Claude, ma saper guardare una soluzione generata e chiedersi se è quella giusta, quali assunzioni fa, cosa non stiamo vedendo. E verificare sempre le fonti che l'AI cita: sa di doversi attenere ai dati di progetto, ma può comunque allucinare.

---

## Flusso ottimale tra Claude e Figma

### Il quadro d'insieme

Tre ruoli che si combinano:

- **Claude** come collaboratore in conversazione (per affinare il brief, ragionare, generare e iterare).
- **Figma** come libreria visiva e, con l'MCP, superficie leggibile/scrivibile dall'AI.
- **Le skill** come "briefing permanente": si scrivono una volta, l'AI le carica automaticamente quando il task corrisponde. Zero ri-spiegazioni, zero context drift, zero token sprecati nel setup.

### Claude Desktop e Claude Code: come dividere il lavoro (in locale)

Due ambienti con punti di forza diversi: conviene assegnare a ciascuno la parte per cui è più adatto, invece di forzarne uno solo.

- **Claude in chat (web o app desktop)**: ambiente conversazionale, con un set di skill fisso e senza accesso al filesystem locale. È il posto giusto per la parte *a monte*: ricerca e sintesi delle fonti, ragionamento strategico, stesura di brief, spec e documenti in markdown, esplorazione di opzioni. Ottimo per produrre l'artefatto testuale che poi guiderà la costruzione (un `DESIGN.md`, un PRD, la sintesi di una knowledge base). Non fa girare skill di coding (es. `frontend-slides`), non apre un progetto locale, non si collega agli MCP locali.
- **Claude Code (Terminal o dentro VS Code)**: vive in una **cartella di progetto locale** e ha accesso a file, git, MCP e alle skill installate sulla tua macchina. È il posto giusto per la parte *a valle*: costruire l'artefatto (deck HTML, prototipo, componenti), collegare Figma via MCP nativo o via bridge, eseguire workflow e skill locali, fare commit e deploy.

**Pattern operativo** (lo schema che stiamo usando su un progetto reale):

1. *In chat*: raccogli e verifica le fonti, ragiona sull'impostazione, produci la sintesi o lo spec in markdown (es. `KB-…-sintesi.md`, oppure un `DESIGN.md` con i token).
2. Sposta il markdown in una cartella locale dedicata (es. `~/Projects/<progetto>/`), anche solo una sottocartella del repo.
3. Apri quella cartella in VS Code (editor + terminale integrato + preview HTML) e lancia `claude`; da Terminal l'equivalente è `cd ~/Projects/<progetto> && claude`.
4. *In Claude Code*: invoca le skill locali (es. `/frontend-slides` per un deck, le skill Figma per il canvas), collega solo gli MCP necessari e costruisci.
5. Sempre in Claude Code: commit atomici e deploy (vedi «Deploy del prototipo»).

Regola pratica: **la parte di pensiero (ricerca, framing, decisioni) sta bene in chat; la parte di costruzione (file, MCP, build, deploy) sta in Claude Code.** Lo spec o il `DESIGN.md` scritto in chat è il ponte tra i due ambienti, che passi a Claude Code come fonte di verità.

### I file di contesto: CLAUDE.md, AGENTS.md, DESIGN.md, SKILL.md, MEMORY.md

Formati con funzioni diverse, spesso complementari:

- **CLAUDE.md**: memoria di progetto di Claude Code, caricata a inizio sessione (è contesto, non enforcement rigido). Tienilo **snello**. Sezioni utili: panoramica del prodotto (cos'è, per chi, cosa ottimizza, vincoli principali, pochi paragrafi), regole UI/design tradotte in implementazione, guida a contenuti e copy (con esempi), regole di struttura componenti, *safe-change rules* (cosa non modificare alla leggera), e i comandi reali del progetto (install, dev, build, lint, test).
- **CLAUDE.local.md**: le tue preferenze personali, tenute fuori dal repo (gitignored). Utile per non imporre al team le tue abitudini.
- **AGENTS.md**: il **livello di orchestrazione**: non è documentazione del design system, ma dice all'agente *dove* guardare per ogni cosa (quale file ha i token canonici, dove vive la libreria componenti, quali MCP consultare, se usare utility Tailwind o token quando confliggono). Se si adotta un solo formato, questo è quello a maggior ritorno: poche ore di scrittura, consultato di continuo.
- **DESIGN.md**: l'identità visiva condensata: front matter YAML con i token + corpo markdown con le regole visive. La spec definisce otto sezioni in ordine fisso (overview, colori, tipografia, layout, elevazione/profondità, forme, componenti, do's & don'ts).
- **MEMORY.md**: memoria di progetto a lungo termine: decisioni prese e contesto che deve sopravvivere tra le sessioni (perché abbiamo scelto X, cosa abbiamo scartato).
- **SKILL.md**: conoscenza **procedurale** per workflow specifici. Una skill è una cartella con un `SKILL.md` in cima più eventuali script/template. Struttura a *progressive disclosure*: i metadati (~100 token) caricano per primi e decidono se la skill è rilevante; il corpo markdown (~500–2000 token) dà le istruzioni; i file di reference si caricano on-demand. Così non si bruciano token quando la skill non serve.

A questi si aggiungono i file di configurazione: **`.mcp.json`** (connessioni a Figma, Notion, GitHub…) e, dentro `.claude/`, **`settings.json`** (permessi condivisi col team) e **`settings.local.json`** (permessi personali, gitignored).

### Struttura di file e cartelle di un progetto di design

Claude lavora meglio quando ha una **struttura di progetto reale**, non prompt isolati: dargli una fonte di verità *prima* di chiedergli di generare qualcosa. Una struttura completa e orientata al design (modello Nick Babich) raggruppa i file per funzione:

```
product-design/
# CONTEXT — ciò che Claude carica
├── CLAUDE.md             ← brief di progetto, letto a ogni sessione
├── CLAUDE.local.md       ← preferenze personali (gitignored)
├── DESIGN.md             ← identità visiva, regole di design, direzione UI
├── MEMORY.md             ← memoria a lungo termine, decisioni e contesto
├── .mcp.json             ← connessioni Figma, Notion, GitHub
# TEAM TOOLKIT
├── .claude/
│   ├── skills/           ← workflow di product design riutilizzabili
│   ├── agents/           ← reviewer e assistenti di design specializzati
│   ├── settings.json     ← permessi condivisi
│   └── settings.local.json  ← permessi personali (gitignored)
# PRODUCT KNOWLEDGE
├── docs/
│   ├── brief.md                 ← obiettivo, audience, scope
│   ├── product-requirements.md  ← feature, flussi, requisiti funzionali
│   └── design-decisions.md      ← perché certe scelte di design
# YOUR PROJECT
├── src/components/       ← UI reale che Claude legge e modifica
├── public/images/        ← immagini, loghi, illustrazioni reali
└── reference/
    ├── screenshots/      ← schermate attuali del prodotto
    ├── competitors/      ← esempi dei competitor
    ├── moodboards/       ← ispirazione visiva
    ├── flows/            ← user journey e sequenze di schermate
    └── research/         ← interviste, finding, note di usabilità
```

Una variante più snella, sufficiente per molti progetti:

```
/project
├── /app
├── /components
├── /docs
│   ├── prd.md
│   ├── user-flows.md
│   ├── ux-principles.md
│   └── design-system.md
├── /design
│   ├── tokens.md
│   ├── components.md
│   └── interaction-patterns.md
├── CLAUDE.md
├── DESIGN.md
└── .mcp.json
```

**Sezioni consigliate del CLAUDE.md per task di design** (ideazione, prototipazione): `# Role` (es. "sei un senior product designer e frontend engineer"), `# Product context` (questo prodotto aiuta [audience] a [obiettivo]), `# Design principles` (chiarezza prima della decorazione, progressive disclosure, un'azione primaria per schermata…), `# Design system rules` (usa i componenti esistenti prima di crearne, segui i token in `/design/tokens.md`, non hardcodare gli stili), `# Workflow` (analizza la UX → spiega la modifica → individua i componenti coinvolti → proponi un piano → attendi approvazione), `# Output format` (per i task UX restituisci sempre: ragionamento UX, modifiche proposte, file impattati, rischi/trade-off).

In alternativa alle sezioni orientate al design, per progetti più tecnici un CLAUDE.md "generico" può includere: `# Project Overview`, `# Architecture`, `# Tech Stack` (es. Next.js, TypeScript, ShadCN UI, Tailwind), `# Coding Conventions` (TypeScript strict, componenti funzionali, niente default export), `# Folder Structure`, `# Commands` (`npm run dev`, `npm run build`), `# Important Rules` (requisiti di performance, accessibilità, strategia di test).

**Documentare il design system in markdown.** Claude diventa molto più utile quando "conosce" il DS: conviene descriverlo in file dedicati sotto `/design/`: `tokens.md`, `components.md`, `patterns.md`, `accessibility.md`. Esempio di come può apparire una regola in `components.md`:

```
# Button rules
Primary button:
- Usa una sola volta per schermata.
- Riservato all'azione principale.
- Mai per azioni distruttive.
Secondary button:
- Per azioni alternative.
- Può comparire più volte.
Destructive button:
- Richiede sempre conferma.
- Mai come azione di default.
```

**Cinque best practice di organizzazione:**

1. **CLAUDE.md alla root**: letto automaticamente all'avvio; è la guida di onboarding al progetto per l'AI.
2. **Spezzare i CLAUDE.md grandi**: Claude lo legge a ogni sessione, quindi oltre ~200 righe conviene dividerlo in file importati con la sintassi `@path/to/import.md` (es. `@claude/architecture.md`, `@claude/coding_conventions.md`, `@claude/ui_guidelines.md`). Più facile da mantenere, contesto più veloce da caricare, riusabile tra progetti.
3. **Cartella `/docs`**: Claude legge benissimo il markdown; ci metti roadmap, requisiti, API, decisioni, così puoi dirgli "leggi `docs/api.md` e implementa…".
4. **Cartella `/workflows`**: i workflow ripetibili come file dedicati (`build-new-component.md`, `code-refactoring.md`, `write-auto-tests.md`, `migrate-db.md`). Un workflow può richiamarne un altro (es. dopo aver creato un componente, invoca `@workflows/write-auto-tests.md`).
5. **Cartella `/tools`**: gli script di servizio che Claude scrive (`migrate-db.py`, `seed-data.py`, `export-data.py`). Nome `/tools` (non `/scripts`) per non confonderli con gli script di front/back-end del progetto.

Scorciatoia: il comando **`/init`** esplora un codebase esistente e genera una prima bozza di CLAUDE.md, da rifinire.

### Setup e loop con Figma MCP

L'MCP (Model Context Protocol) di Figma consente a Claude di leggere il *design context* (gerarchia, layout, variabili, componenti, token) e, con le skill giuste, di scrivere sul canvas. L'MCP **nativo** di Figma ha due versioni: quella **remota** (endpoint ospitato da Figma, non serve l'app desktop, set di funzioni più ampio, consigliata) e quella **locale desktop** (integrata nell'app: passa in Dev Mode e abilita il server, che gira su `http://127.0.0.1:3845/mcp`). Checklist per una sessione in locale: apri Figma Desktop aggiornato all'ultima versione → apri un file Design (l'MCP non compare in FigJam) → Dev Mode (Shift+D) → *Enable MCP server* → collega il client (VS Code, Cursor, Claude Code) all'indirizzo del server. Verifica rapida: nel client chiedi di elencare i tool MCP, o digita `#get_design_context`. Nota: è in beta e diventerà una funzione a pagamento a consumo; i rate limit dipendono dal piano. (I bridge di terze parti che usano un plugin "Desktop Bridge" con stato "MCP ready" sono un'altra cosa: vedi «MCP nativo di Figma, Figma Desktop Bridge e DesignAgent a confronto».)

**Il loop completo**: Design in Figma → Extract con MCP → Build → Deploy → Test → Iterate. Condizione critica lato Figma: **naming e organizzazione corretti** dei componenti (l'AI legge questa struttura) e Auto Layout per la responsività.

**Collega solo gli MCP che ti servono.** Ogni MCP attivo immette dati nella finestra di contesto: il comando **`/context`** mostra l'occupazione e, con molti tool attivi, gli MCP possono arrivare a occupare una fetta enorme del contesto (~45% in casi reali). Disconnetti i tool rumorosi quando non servono (incluso Figma, che inietta molto contesto) quando stai lavorando su documentazione estesa o con più tool di progetto sovrapposti. Regola pratica: **meno rumore nel contesto = output migliore** (si lega al «Context rot»).

**Bridge bidirezionale: Claude "con le mani" sul canvas.** Oltre a leggere Figma, Claude può *agire* sul file aperto se si usa un bridge a due vie. Un esempio è **DesignAgent** (tool di terze parti, distinto dall'MCP nativo di Figma; confronto completo in «MCP nativo di Figma, Figma Desktop Bridge e DesignAgent a confronto»): un plugin Figma + un plugin Claude Code che aprono un socket locale ed espongono ~30 tool sul file live: sposta layer, sistema le spaziature, sostituisce un hex con il token corretto, crea frame/testo/forme, ricolora e ri-layouta. Si installa da marketplace (`/plugin marketplace add sherizan/designagent-figma` poi `/plugin install designagent@designagent`) e porta con sé la skill `design-to-code` e l'MCP server `designagent`; gira in locale (nessun token, nessun dato esce dalla macchina) con un *heartbeat* che segnala se la connessione è davvero viva e si riconnette da sola. Due regole rendono affidabili questi flussi: **scope stretto** (un frame o un flusso per volta: l'agente è preciso sul piccolo e va alla deriva se lo punti sull'intero file) e **auto-verifica** (build → screenshot → confronto con `DESIGN.md` → fix).

> **Prompt pack operativo** (esempio, con bridge bidirezionale e `DESIGN.md` come fonte di verità):
> - Estrai i token dalla selezione (colori, type, spaziatura, raggio) e scrivili in `DESIGN.md`, con i valori reali, senza arrotondare o inventare.
> - Guarda il logo selezionato: crea la foundation del design system e crea/aggiorna `DESIGN.md`.
> - Usando i token in `DESIGN.md`, costruisci un primo set di componenti su un nuovo frame (bottoni primario/secondario/ghost, slider, toggle, form con label e stato d'errore). Solo on-system.
> - Usando i token in `DESIGN.md`, progetta una landing page marketing.
> - Leggi `voice.md` e scrivi la copy della schermata selezionata con quel tono, applicandola ai nodi di testo; mostrami ogni modifica prima di applicarla.
> - Crea template di asset social (LinkedIn/Substack) usando il branding in `DESIGN.md`; mantieni ogni valore on-system.

### MCP nativo di Figma, Figma Desktop Bridge e DesignAgent a confronto

Tre modi di collegare l'AI a Figma, con obiettivi diversi.

- **MCP nativo di Figma (Dev Mode MCP server).** Prima parte, ufficiale. Due versioni: *remota* (endpoint ospitato da Figma, non serve l'app desktop, funzioni più ampie, consigliata) e *locale desktop* (integrata nell'app, `http://127.0.0.1:3845/mcp`, per casi org/enterprise). *Cosa fa*: legge il design context del layer selezionato, genera codice dal frame selezionato, si aggancia a Code Connect (la mappatura che lega un componente Figma al componente di codice reale, così l'agente usa quello vero invece di ricostruirne uno simile) e, con le skill Figma installate, scrive sul canvas e cattura la UI live ("code to canvas"). *Come lo fa*: dati strutturati via protocollo MCP; input per selezione (desktop) o link al nodo (node-id). *Da sapere*: in beta, diventerà a pagamento a consumo, con rate limit per piano; client supportati solo quelli del Figma MCP Catalog (VS Code, Cursor, Claude Code).
- **Figma Desktop Bridge (`southleft/figma-console-mcp`).** Terze parti, "il tuo design system come API". È un MCP server con un *plugin bridge* che importi tra i plugin di sviluppo di Figma Desktop; comunica via WebSocket (porte 9223–9232) e sblocca il Plugin API **senza piano Enterprise**. *Cosa fa in più del nativo*: lettura/scrittura completa di variabili e descrizioni componenti, creazione/modifica di design, cattura in tempo reale di **console log e network** (debug di plugin e prototipi), export token in ~10 formati (DTCG, CSS, Tailwind, SCSS, Style Dictionary, Tokens Studio…), diff tra versioni, scan di accessibilità WCAG. *Come lo fa*: doppio contesto del plugin (UI con rete, worker con Figma API) più un watchdog che si riconnette da solo; ~107 tool in locale, funziona con Claude Code, Claude Desktop e Cursor insieme, con anche una modalità cloud per i client web. *Da sapere*: il bridge WebSocket locale non è autenticato (problema segnalato): qualunque processo locale può connettersi e potenzialmente iniettare testo nei log; valutalo su macchine condivise. *Installazione* (due parti): 1) registra il server MCP nel client, in Claude Code con `claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN=figd_IL_TUO_TOKEN -e ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest` (o l'equivalente in `.mcp.json`); 2) in Figma Desktop importa il plugin (Plugins → Development → Import plugin from manifest → `figma-desktop-bridge/manifest.json`, oppure il percorso stabile `~/.figma-console-mcp/plugin/manifest.json`) e avvialo fino allo stato «Desktop Bridge active». Il token è un Personal Access Token (Figma → Settings → Security); verifica la connessione chiedendo `figma_get_status`.
- **DesignAgent (Sherizan, Figma Community).** Terze parti, bridge **bidirezionale** orientato al design-to-code. Un plugin dalla Community di Figma più un plugin Claude Code (install da marketplace); ~30 tool per leggere la selezione e agire sul canvas (crea/edita frame, testo, forme, ricolora, ri-layouta). Gira in locale e gratuito, con heartbeat e la disciplina di scope stretto più auto-verifica contro `DESIGN.md` (vedi «Setup e loop con Figma MCP»). Rispetto al Desktop Bridge di southleft è più snello e orientato al "costruisci ed edita", meno a debug/console ed export multi-formato; si installa dalla Community (plugin pubblicato) più marketplace, non importando un manifest di sviluppo.

**Come scegliere:**

| Se ti serve… | Strumento |
|---|---|
| design→codice ufficiale, Code Connect, code-to-canvas fedele, zero plugin di terze parti | MCP nativo di Figma |
| variabili/componenti completi senza Enterprise, export token multi-formato, debug console/network | Figma Desktop Bridge (southleft) |
| loop bidirezionale rapido "costruisci ed edita sul canvas" da Claude Code, locale e gratuito | DesignAgent |

Si possono combinare (es. MCP nativo per il boilerplate, Desktop Bridge per estrarre i valori esatti dei token). Montando più MCP Figma insieme, attenzione all'attribuzione delle risposte e all'occupazione del contesto (vedi «Setup e loop con Figma MCP»).

### Le skill Figma ufficiali

Il server MCP di Figma include diverse skill che coprono i workflow comuni. Le otto del set ufficiale:

1. **`figma-use`**: scrive direttamente su un file Figma Design: crea/modifica frame, componenti, variabili, layout.
2. **`figma-use-figjam`**: scrive su una board FigJam: sticky, sezioni, connettori, forme, tabelle.
3. **`figma-use-slides`**: scrive su un deck Figma Slides: slide, sezioni, temi, speaker notes.
4. **`figma-code-connect`**: collega componenti Figma pubblicati ai componenti di codice corrispondenti, così gli sviluppatori passano da design a implementazione.
5. **`figma-create-new-file`**: crea un nuovo file Figma Design o board FigJam vuoti come punto di partenza per altri workflow.
6. **`figma-generate-diagram`**: trasforma una descrizione, un codebase o uno spec in un diagramma FigJam editabile (flowchart, sequence diagram…).
7. **`figma-generate-library`**: costruisce o aggiorna una libreria/design system Figma a partire da un codebase (token, struttura, componenti).
8. **`figma-generate-design`**: genera schermate Figma full-page da design system e contesto di progetto, opzionalmente con reference di layout.

A queste si affiancano due skill Figma orientate al codice, citate nelle altre fonti: **`figma-implement-design`** (traduce un nodo Figma in codice di produzione: `get_design_context` → `get_screenshot` di riferimento → ispezione del DS di progetto → mapping dei valori Figma sui token → generazione del codice → validazione contro lo screenshot) e **`figma-create-design-system-rules`** (analizza il codebase e scrive il file di regole, AGENTS.md o CLAUDE.md, per tradurre i design in codice secondo le convenzioni).

**Come si installano e attivano.** Le skill non si installano una a una: arrivano insieme al **plugin Figma per il client**, che porta con sé sia le impostazioni dell'MCP server sia le Agent Skills. In Claude Code il flusso è: lancia il comando d'installazione del plugin Figma (dallo snippet fornito da Figma), riavvia Claude Code, apri `/plugin`, vai alla scheda *Installed*, seleziona il server `figma` e completa l'autenticazione (si apre il browser per l'OAuth); da lì il server risulta connesso e le skill sono disponibili. In alternativa, per il solo server desktop: abilitalo in Dev Mode e aggiungilo con `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`.

**Remoto o desktop.** Il **server remoto** è quello consigliato e con il set di funzioni più ampio (comprese scrittura sul canvas e code-to-canvas su client selezionati): è la scelta di default e a cui sono agganciate le skill. Il **server desktop** (locale, `127.0.0.1:3845`, abilitato in Dev Mode) aggiunge l'input per selezione ma è pensato per casi org/enterprise. In pratica: parti dal remoto; passa al desktop solo se un caso specifico lo richiede.

### Enforcement del design system

L'AI è capace di scrivere Figma e di scrivere React; il divario tra strumento potente e strumento usabile è spesso solo un insieme di regole che nessuno ha scritto. Esempio di "catena di governance" (pattern delle 4 skill di `claude2figma`): il comportamento di default dell'AI è *inventare*; la regola lo cambia in *prima cerca* ("look up before invent"). La skill più essenziale è il **token binding/QA**: ogni proprietà visiva (colore, type, spaziatura, raggio) deve legarsi alla variabile/stile corrispondente (niente valori grezzi), e dopo la scrittura su Figma parte una QA che verifica i binding uno a uno (riporta `#5C6AC4` a `color/brand/primary`).

Lo stesso strumento gioca ruoli diversi secondo il contesto: in modalità "assistente di design" produce output che un umano può riprendere e modificare (DS enforcement attivo); in modalità "prototipo rapido" la velocità ha priorità sull'enforcement e i valori grezzi sono accettati.

### Rendere il design system leggibile dall'AI

Se gli agenti vedono solo valori grezzi e hex (nessun riferimento ai token, nessun significato semantico), costruiscono componenti con valori hardcoded scollegati dalla fonte di verità → debito tecnico, inconsistenza, gap di accessibilità. Framework di adozione incrementale: partire da 3–5 componenti, generare spec AI-readable (markdown strutturato con gerarchia componenti + riferimenti ai token, es. via tool come FigSpecs), integrarle nel flusso (es. ticket), poi validare la token accuracy prima/dopo. Espandere di settimana in settimana finché il DS diventa AI-native.

### Comandi, slash command e subagent per il design

**Comandi e pratiche utili in Claude Code:**

- **Plan mode (Shift+Tab / `/plan`)**: Claude legge, ragiona e propone un piano senza toccare i file finché non approvi. Particolarmente utile prima di task complessi e prima di un Figma→codice via MCP (spesso migliora il risultato anche senza modifiche al piano).
- **`/init`**: esplora il codebase e scrive un CLAUDE.md (briefing letto a ogni sessione). Tienilo lean; aggiorna dopo molte modifiche.
- **`/skills`**: elenca le skill disponibili sul tuo computer (utile quando diventano tante).
- **`/help`**: cheat sheet dei comandi.
- **`/rewind` (o doppio Esc)**: torna a un checkpoint precedente (conversazione, codice o entrambi).
- **Ctrl+V**: incolla immagini/screenshot come riferimento (su Mac è Ctrl+V, non Cmd+V).

**Slash command custom per workflow ripetibili.** Ripetere a voce/per iscritto gli stessi prompt porta a drift di qualità e rende impossibile standardizzare le operazioni per il team. Conviene creare comandi dedicati come `/page-review`, `/component-review`, `/prd-to-ui`, `/flow-map`, `/design-system-check`: ognuno è un file markdown in `.claude/commands/` (es. `.claude/commands/page-review.md` = "Rivedi la pagina e segnala gli elementi che impattano usabilità e accessibilità, con focus sulle best practice UX").

**Subagent specializzati per il design.** Per automatizzare task tenendo pulita la conversazione principale, si creano subagent (file markdown in `.claude/agents/`) che lavorano in autonomia, senza tempestare l'utente di domande. Profili utili in product design: **UX Reviewer**, **Design System Guardian**, **Frontend Implementer**, **Accessibility Reviewer**, **Interaction Designer**, **QA Tester**. Esempio di descrizione (UX Reviewer): *Role* = senior UX reviewer; *Focus* = user flow, friction point, information architecture, usabilità dei form, error prevention, empty state; *Do not* = riscrivere codice se non richiesto, suggerire decorazione senza motivazione UX. (Questo tema si espande in una futura sezione dedicata all'architettura ad agenti e sub-agenti.)

**Claude Code dentro l'IDE + Plan mode.** Usare Claude Code dentro VS Code (o altro IDE) evita il continuo salto tra ambiente di codice e app: l'integrazione offre inline diff, plan review, file mention e shortcut. Per il lavoro di design, non chiedere di costruire subito: passa in **Plan mode** e segui il flusso *analizza l'esperienza attuale → chiedi un piano UX → rivedi le modifiche proposte → approva → check finale design-system + accessibilità*. Così Claude non si butta sul codice prima di aver capito il problema di prodotto.

**Pattern di affidabilità per task lunghi:** **agente esecutore con contesto fresco** per ogni fase (sessione principale pulita, nessun degrado), **commit atomici** per ogni task (history revertibile, `git bisect` per isolare il task rotto), **agente verificatore** che a fine esecuzione controlla il codebase contro gli obiettivi di fase.

### Creare una skill dal proprio design system

Struttura tipica della cartella:

```
design-system/
├── SKILL.md            ← istruzioni principali (metadati + corpo)
├── references/
│   ├── color-tokens.md
│   ├── typography.md
│   ├── spacing.md
│   └── components.md
└── assets/
    └── design_tokens.json   ← token esportati (formato W3C/DTCG)
```

Punti chiave:
- La **description** nei metadati decide se la skill viene caricata: dev'essere specifica e ricca delle keyword che useresti naturalmente (token, componenti, design system, Figma, UI, spaziatura, colori). "Aiuta col design" è troppo vago.
- Nel corpo, indicare chiaramente *quando* usarla (creare componenti Figma, costruire layout UI, generare componenti React/TS, scrivere documentazione).
- **Split in più skill** quando il SKILL.md supera ~500 righe o quando team diversi possiedono parti diverse del sistema (es. `design-tokens/`, `component-specs/`, `accessibility/`, `figma-workflow/`): Claude le combina automaticamente.
- Le skill **non si auto-sincronizzano** con Figma: vanno aggiornate quando il sistema cambia (in Claude Code le modifiche ai file sono colte subito; su Claude.ai va ricaricato lo ZIP).
- Il formato SKILL.md è portabile tra agenti, ma il modello di esecuzione no: lo stesso file è leggibile ovunque, non è detto che "giri" allo stesso modo ovunque.

**Skill di design ricorrenti** da costruire per un team di product design: *PRD → User Flow*, *User Flow → UI Mockup*, *Design System Audit*, *UX Copy Review*, *Accessibility Review*, *Prototype Polish*. Ogni skill è una cartella con `SKILL.md` più file di supporto (`checklist.md`, `examples.md`). Esempio di `SKILL.md` per *design-system-audit*:

```
---
name: design-system-audit
description: Review UI code against the product design system.
---
# Goal
Trova incoerenze tra implementazione e regole del design system.
# Inputs
- file UI
- documentazione del design system
- regole della libreria componenti
# Process
1. Identifica i componenti usati.
2. Confrontali con le regole del DS.
3. Segnala gli stili hardcoded.
4. Proponi le correzioni.
5. Ordina per gravità.
# Output
Restituisci una tabella con: Issue, Location, Severity, Fix consigliato.
```

### Deploy del prototipo (locale, Vercel, GitHub Pages)

Il deploy è l'ultimo anello del loop (Design → Build → **Deploy** → Test → Iterate): serve a passare da "gira sulla mia macchina" a un URL condivisibile. Tre livelli, dal più veloce al più pubblico: anteprima in locale, pubblicazione su Vercel, pubblicazione su GitHub Pages.

**1) Anteprima in locale.** Prima di pubblicare, conviene sempre far girare il progetto in locale: una build che fallisce sul server è più lenta da debuggare di una intercettata subito. Per un progetto Vite tipico:

```
npm install
npm run dev        # anteprima di sviluppo su http://localhost:5173
npm run build      # genera la build di produzione in /dist
npm run preview    # serve la build di produzione in locale, per verificarla
```

**2) Preparare il repository Git.** Crea un `.gitignore` (almeno `node_modules/`, `.env`, `.env.local`, `dist/`) *prima* del primo `git add`; non committare mai file `.env` in un repo pubblico. Poi inizializza e pubblica su GitHub:

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<utente>/<repo>.git
git push -u origin main
```

**3) Pubblicare su Vercel.** Due strade. *Dashboard* (consigliata la prima volta): `vercel.com` → Add New → Project → Import del repo GitHub → Vercel rileva il framework (React/Vite/Next.js…) e propone Build Command `npm run build` e Output Directory `dist` (per Vite) → Deploy. *CLI*: `npm i -g vercel`, poi `vercel login` e `vercel`, rispondendo ai prompt. Punti chiave:
- **CI/CD automatico**: collegando GitHub, Vercel installa un webhook: ogni push su `main` diventa un deploy di produzione, e ogni branch/PR ottiene un preview URL da condividere.
- **SPA 404 al refresh** (es. React Router): aggiungi un `vercel.json` con un rewrite di tutte le rotte su `/`.
- **Variabili d'ambiente**: si impostano nel dashboard (Settings → Environment Variables), non nel repo; per Vite devono avere il prefisso `VITE_`.
- **Dominio custom**: Settings → Domains, SSL automatico. Il piano gratuito (Hobby) basta per prototipi.
- In alternativa, si può deployare da dentro Claude Code con il plugin `vercel/vercel-deploy-claude-code-plugin`.

**4) Pubblicare su GitHub Pages** (hosting statico gratuito, ideale per la guida stessa e per prototipi senza backend). Passo obbligato: impostare il `base` in `vite.config.js`, perché le Pages di progetto vivono in un sottopercorso:

```
// vite.config.js — project page su <utente>.github.io/<repo>/
export default defineConfig({ plugins: [react()], base: '/<repo>/' })
// se pubblichi su <utente>.github.io/ o su dominio custom: base '/'
```

Poi due approcci:
- **GitHub Actions** (via ufficiale Vite): Settings → Pages → Source = *GitHub Actions*, quindi un workflow `.github/workflows/deploy.yml` che fa checkout, `npm ci`, `npm run build` e pubblica `dist/` con `actions/upload-pages-artifact` + `actions/deploy-pages`. Ogni push su `main` ripubblica. Workflow minimo pronto:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - id: deployment
        uses: actions/deploy-pages@v4
```
- **Pacchetto `gh-pages`**: aggiungi `"homepage": "https://<utente>.github.io/<repo>"` in `package.json`, gli script `"predeploy": "npm run build"` e `"deploy": "gh-pages -d dist"`, lancia `npm run deploy` e imposta la Source delle Pages sul branch `gh-pages`.

Se usi React Router, allinea il `basename` del router al `base` di Vite (altrimenti 404 sulle rotte). Dominio custom: file `CNAME` nella cartella pubblicata.

**Quale scegliere.** *GitHub Pages*: solo statico (HTML/CSS/JS o SPA buildate), gratis, perfetto per portfolio, landing e per pubblicare questa knowledge base; nessun backend o serverless, e va gestito il base path. *Vercel*: statico **e** framework con SSR/funzioni serverless (es. API routes di Next.js), preview per ogni PR, variabili d'ambiente gestite, zero-config sulla maggior parte dei framework; è la via più liscia per un prototipo condivisibile in fretta e che potrebbe crescere verso funzioni dinamiche. Entrambe danno HTTPS e ripubblicazione automatica a ogni push.

---

## Repository di skill di riferimento

Categorizzazione completa dei 79 repository stellati. Le categorie **A–F** sono il cuore della knowledge base (progettazione con AI, skill, Claude/Figma); **G–H** sono fondamenta/asset utili; **I–J** sono toolbox di esecuzione e infrastruttura, da tenere come appendice/risorse. In chiusura, uno **starter pack** con i comandi d'installazione.

**Dove girano queste skill.** Quasi tutto il catalogo è fatto di skill per **Claude Code** (e altri coding agent come Cursor): si installano da terminale con `npx skills add …` o dal marketplace dei plugin (`/plugin marketplace add …`), e vivono nella cartella locale `~/.claude/skills/` o dentro `.claude/` del progetto. Non girano nella chat di claude.ai, che ha un suo set fisso di skill (docx, pdf, pptx, frontend-design e le skill utente). Le skill Figma sono un caso a parte: arrivano col plugin Figma installato nel client MCP (vedi «Le skill Figma ufficiali»). Regola pratica: strategia e sintesi in chat, installazione e uso delle skill del catalogo in Claude Code (vedi «Claude Desktop e Claude Code»).

**Se parti da zero**, un ordine sensato per un product designer: 1) `frontend-design` (si auto-attiva sui task di UI, alza subito la qualità dei layout); 2) una skill di "taste" come [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) o [`senlindesign/taste-skill`](https://github.com/senlindesign/taste-skill) (rifinitura e coerenza visiva); 3) un ponte Figma (l'MCP nativo di «Setup e loop con Figma MCP», o [`sherizan/designagent-figma`](https://github.com/sherizan/designagent-figma) per il loop bidirezionale); 4) [`airowe/claude-a11y-skill`](https://github.com/airowe/claude-a11y-skill) per l'accessibilità; 5) [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) per rifinire le UI generate. Aggiungi il resto quando ti serve, senza installare tutto in una volta (ogni skill attiva è contesto in più).

### Collezioni di skill multi-disciplina (cuore della KB)
- [`Owl-Listener/designer-skills`](https://github.com/Owl-Listener/designer-skills): research → sistemi → UI → interazione → delivery
- [`Owl-Listener/ai-design-skills`](https://github.com/Owl-Listener/ai-design-skills): 42 skill e 18 comandi in 6 plugin per l'Agentic Experience Design (model interaction, alignment, system behavior, evaluation, agent orchestration, prompt architecture); per Claude Code e Gemini CLI, install da marketplace (`claude plugin marketplace add Owl-Listener/ai-design-skills`). Utile anche per la futura sezione agenti/Opus
- [`cuellarfr/design-skills`](https://github.com/cuellarfr/design-skills): research, critique, accessibilità, journey mapping
- [`jamiemill/layers-skills`](https://github.com/jamiemill/layers-skills): i "sette layer" del product design
- [`designagentlab/skills`](https://github.com/designagentlab/skills): libreria open: Figma, UX research, copywriting, immagini
- [`PatternsDev/skills`](https://github.com/PatternsDev/skills): agent skill di patterns.dev
- [`edenspiekermann/Skills`](https://github.com/edenspiekermann/Skills): raccolta skill dello studio Eden Spiekermann
- [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills): marketplace di 68 skill + 42 workflow in 9 plugin (discovery, strategy, execution, research, analytics, GTM, growth, toolkit, AI-shipping); per Claude Code e Cowork, install da marketplace; include `strategy-red-team` / `/red-team-prd` e `/ship-check` (adiacente, lato PM)
- [`anthropics/skills`](https://github.com/anthropics/skills): repository ufficiale Anthropic delle Agent Skills (riferimento canonico)
- [`nexu-io/open-design`](https://github.com/nexu-io/open-design): alternativa open a Claude Design (259+ skill, 142+ design system)

### Design system, token, scale, documentazione
- [`dylantarre/design-system-skills`](https://github.com/dylantarre/design-system-skills): skill DS per agentic coding
- [`somerandomdude/design-system-documentation-schema`](https://github.com/somerandomdude/design-system-documentation-schema): DSDS: formato JSON machine-readable per documentare un DS (8 entità: componenti, token, temi, foundation, pattern, guide, chunk); complementare al W3C Design Tokens (che tiene i valori), pensato esplicitamente anche per gli agenti AI
- [`NateBaldwinDesign/proportio`](https://github.com/NateBaldwinDesign/proportio): scale proporzionali (tipografia, icone, spaziature)
- [`Manavarya09/design-extract`](https://github.com/Manavarya09/design-extract): estrae il DS di qualsiasi sito (token DTCG, MCP server, export multi-piattaforma)

### Ponte Claude ↔ Figma (MCP, enforcement DS)
- [`figma/mcp-server-guide`](https://github.com/figma/mcp-server-guide): guida ufficiale al Figma MCP server
- [`senlindesign/claude2figma`](https://github.com/senlindesign/claude2figma): 4 skill che tengono l'AI "sui binari" del DS (token/componenti vincolati)
- [`renfei-design/Figma_AI_Bridge`](https://github.com/renfei-design/Figma_AI_Bridge): agent + skill per controllare Figma e automatizzare il design
- [`sherizan/designagent-figma`](https://github.com/sherizan/designagent-figma): *DesignAgent*: bridge bidirezionale Claude Code ↔ Figma (legge e modifica il canvas live, ~30 tool); plugin + MCP server, locale e gratuito

### Qualità UI, "taste", micro-dettagli, wireframe
- [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill): dà "buon gusto" all'AI, anti-slop
- [`senlindesign/taste-skill`](https://github.com/senlindesign/taste-skill): *Design DNA Extractor*: `/taste <url>` fa reverse-engineering del "gusto" di un sito (token + il *perché* dietro le scelte) con pipeline Playwright; esporta in CLAUDE.md, Cursor, Windsurf, ecc.
- [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable): design language per rendere l'AI più brava nel design
- [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills): skill per rifinire le UI generate dagli agenti: `baseline-ui`, `fixing-accessibility`, `fixing-metadata`, `fixing-motion-performance`; install `npx skills add ibelick/ui-skills`, uso `/baseline-ui review src/`
- [`jakubkrehel/make-interfaces-feel-better`](https://github.com/jakubkrehel/make-interfaces-feel-better): i dettagli che fanno "sentire" meglio un'interfaccia
- [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): design intelligence UI/UX multi-piattaforma
- [`Magdoub/claude-wireframe-skill`](https://github.com/Magdoub/claude-wireframe-skill): wireframe B&W come HTML interattivo

### Accessibilità & audit
- [`airowe/claude-a11y-skill`](https://github.com/airowe/claude-a11y-skill): audit a11y (axe-core + jsx-a11y)
- [`mgifford/accessibility-skills`](https://github.com/mgifford/accessibility-skills): skill che rispecchia un ACCESSIBILITY.md
- [`fecarrico/A11Y.md`](https://github.com/fecarrico/A11Y.md): sistema di contesto con regole WCAG applicabili
- [`Ashutos1997/claude-design-auditor-skill`](https://github.com/Ashutos1997/claude-design-auditor-skill): verifica contro 19 regole di design
- [`w3c/wcag`](https://github.com/w3c/wcag): linee guida WCAG (riferimento normativo)
- [`YellowLabTools/YellowLabTools`](https://github.com/YellowLabTools/YellowLabTools): testing qualità/performance front-end

### UX writing / content
- [`content-designer/ux-writing-skill`](https://github.com/content-designer/ux-writing-skill): UX writing sistematico su quattro standard (Purposeful, Concise, Conversational, Clear), con pattern per bottoni/errori/empty state/form e checklist di scoring; per Claude, Codex e Cursor, install `npx skills add content-designer/ux-writing-skill`

### Fondamenta & asset (icone, colori)
- [`feathericons/feather`](https://github.com/feathericons/feather): icone open source
- [`google/material-design-icons`](https://github.com/google/material-design-icons): Material Symbols
- [`meodai/color-names`](https://github.com/meodai/color-names): nomi di colori curati
- [`evilmartians/oklch-picker`](https://github.com/evilmartians/oklch-picker): color picker OKLCH/LCH

### Librerie e kit di componenti UI
- [`ibelick/prompt-kit`](https://github.com/ibelick/prompt-kit): componenti per interfacce AI
- [`ibelick/buttons`](https://github.com/ibelick/buttons): collezione bottoni Tailwind
- [`themesberg/flowbite`](https://github.com/themesberg/flowbite): libreria componenti su Tailwind
- [`imskyleen/animate-ui`](https://github.com/imskyleen/animate-ui): component distribution animata (React, TypeScript, Tailwind, Motion via Shadcn CLI): componenti pronti da installare, modificare e usare

### Motion, animazioni, transizioni, scroll (toolbox esecuzione)
- Animazione/scroll: [`greensock/GSAP`](https://github.com/greensock/GSAP), [`darkroomengineering/lenis`](https://github.com/darkroomengineering/lenis), [`locomotivemtl/locomotive-scroll`](https://github.com/locomotivemtl/locomotive-scroll), [`michalsnik/aos`](https://github.com/michalsnik/aos), [`dixonandmoe/rellax`](https://github.com/dixonandmoe/rellax)
- [`Jakubantalik/transitions.dev`](https://github.com/Jakubantalik/transitions.dev): transizioni essenziali (con "product motion skill")
- [`delphi-ai/animate-skill`](https://github.com/delphi-ai/animate-skill): skill animazioni Next.js/React (corso di Emil Kowalski)
- CSS pronte: [`ibelick/animation`](https://github.com/ibelick/animation), [`tilomitra/infinite`](https://github.com/tilomitra/infinite), [`IanLunn/Hover`](https://github.com/IanLunn/Hover)
- [`barvian/number-flow`](https://github.com/barvian/number-flow): numeri animati · [`0xGF/boneyard`](https://github.com/0xGF/boneyard): skeleton loading · [`nolimits4web/swiper`](https://github.com/nolimits4web/swiper): slider/carousel
- Particelle/physics: [`VincentGarreau/particles.js`](https://github.com/VincentGarreau/particles.js), [`liabru/matter-js`](https://github.com/liabru/matter-js)
- SVG/3D/canvas: [`renatoworks/3dsvg`](https://github.com/renatoworks/3dsvg), [`meodai/heerich`](https://github.com/meodai/heerich), [`edoardolunardi/infinite-canvas`](https://github.com/edoardolunardi/infinite-canvas)
- [`codrops/*`](https://github.com/codrops): demo di effetti e transizioni (ImageToGridTransition, StickySections, ScrollBlurTypography, SidebarTransitions, PageTransitions, HoverEffectIdeas, ElasticGridScroll, ImageExpansionTypography, depth-gallery e fork/tutorial relativi)
- Tutorial Codrops (singoli): [`gaspoorf/curve-gallery`](https://github.com/gaspoorf/curve-gallery): galleria 3D scroll-driven con camera lungo un path Blender (Three.js + GSAP) e focus dinamico sulle immagini; [`Ibaliqbal/codrops-motion-path-transition`](https://github.com/Ibaliqbal/codrops-motion-path-transition): thumbnail che fluiscono tra stack e layout con il plugin GSAP MotionPath; [`bnpne/page-transitions-with-webgpu-vanilla-js`](https://github.com/bnpne/page-transitions-with-webgpu-vanilla-js): page transition interattive con WebGPU e Vanilla JS (Vite)

### Agenti, CLI, plugin e infrastruttura
- [`anthropics/claude-code`](https://github.com/anthropics/claude-code): Claude Code (riferimento) · [`agno-agi/agno`](https://github.com/agno-agi/agno): framework piattaforme di agenti
- CLI: [`google-gemini/gemini-cli`](https://github.com/google-gemini/gemini-cli), [`jackwener/OpenCLI`](https://github.com/jackwener/OpenCLI)
- Plugin Claude Code: [`makenotion/claude-code-notion-plugin`](https://github.com/makenotion/claude-code-notion-plugin), [`vercel/vercel-deploy-claude-code-plugin`](https://github.com/vercel/vercel-deploy-claude-code-plugin)
- NotebookLM: [`jacob-bd/notebooklm-mcp-cli`](https://github.com/jacob-bd/notebooklm-mcp-cli), [`PleasePrompto/notebooklm-skill`](https://github.com/PleasePrompto/notebooklm-skill)
- [`ibelick/zola`](https://github.com/ibelick/zola): chat multi-modello · [`withastro/astro`](https://github.com/withastro/astro): framework web · [`supabase/supabase`](https://github.com/supabase/supabase): backend

### Starter pack di skill per product designer (cheatsheet)

Shortlist consigliata con i comandi d'installazione (da verificare al momento dell'installazione, gli handle possono cambiare):

| Skill | A cosa serve | Install |
|---|---|---|
| **ui-ux-pro-max-skill** | trasforma Claude in UX strategist: analizza requisiti e genera un design system su misura | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max` |
| **frontend-design** | layout curati e non generici, gerarchia visiva e spaziature forti; si auto-attiva sui task front-end | `npx skills add frontend-design` |
| **taste-skill** | spinge l'AI verso UI premium (spaziatura, type, colori, refinement); anti-"vibe generico" | `npx skills add https://github.com/leonxiinx/taste-skill` |
| **shadcn-ui** | conoscenza profonda di shadcn/ui: sceglie i componenti giusti, UI accessibili con Tailwind | `npx skills add giuseppe-trisciglio/developer-kite@shadcn-ui` |
| **ui-animation** | best practice di motion UI (easing, timing, transizioni, framer-motion, reduced-motion) | `npx skills add mblode/agent-skillse@ui-animation` |
| **web-design-guidelines** | 100+ principi di web design curati da Vercel (layout, type, responsività, a11y) | `npx skills add vercel-labs/agent-skillse@web-design-guidelines` |

### Skill UI/UX con comando (roundup)

Cinque skill che danno a Claude "memoria di design" (pattern, sistemi e reference di prodotti reali) senza sostituire il gusto. Comandi riportati come nell'articolo di origine; verificane nome ed esatta invocazione al momento dell'installazione, perché nella fonte alcuni nomi e comandi non combaciano del tutto.

| Skill | A cosa serve | Comando (esempio) |
|---|---|---|
| **Awesome Design MD** | design DNA di 55 prodotti reali (Stripe, Vercel, Figma, Spotify…): token, logica di layout e comportamento dei componenti reali, non un'imitazione vaga | `/awesome-design-md "build a pricing page like Stripe"` |
| **Mobile App UI Design** | pattern mobile di app come Airbnb, Duolingo, Spotify, Revolut: pattern per settore, griglie di spaziatura, principi di emotional design (utile dove conta la fiducia: finance, health, booking, education) | `/mobile-app-ui-design "fintech app dark theme"` |
| **UX UI Mastery** | "senior designer in a box": ragionamento UX senior, check di accessibilità, decisioni frontend-aware (guarda oltre l'estetica: accessibilità, flusso, implementazione) | `/design-mastery "build a SaaS onboarding flow"` |
| **LibreUIUX** | bundle molto ampio (74 skill, 152 agent, 76 slash command): applica in automatico psicologia cognitiva, regole di accessibilità e componenti platform-native | `/ux-ui-mastery "design a checkout flow"` |
| **Design System Extractor** | estrae un design system da uno screenshot UI (colori, scala tipografica, regole di spaziatura, token riutilizzabili); i risultati vanno verificati perché uno screenshot può ingannare | `/design-system-extractor "extract tokens from this Notion screenshot"` |

---

## Glossario

- **MCP (Model Context Protocol)**: standard che permette a un client AI di collegarsi a strumenti esterni (Figma, Notion, GitHub…) e leggerne o scriverne i dati tramite i tool esposti dal server.
- **Design context**: l'insieme strutturato di dati di un layer che l'MCP di Figma espone (gerarchia, layout, variabili, componenti, token), diverso da uno screenshot.
- **Context rot**: degrado della qualità delle risposte quando la finestra di contesto si riempie di materiale accessorio (falsi avvii, debug, divagazioni). Vedi «Context rot».
- **Auto Layout**: sistema di Figma che rende i frame reattivi, con spaziature, allineamenti e ridimensionamento automatici; un file in Auto Layout è più leggibile dall'AI.
- **Code Connect**: mappatura ufficiale di Figma che lega un componente Figma al componente di codice reale, così l'agente usa quello vero invece di ricostruirne uno simile. Vedi «MCP nativo di Figma, Figma Desktop Bridge e DesignAgent a confronto» e «Le skill Figma ufficiali».
- **node-id**: identificatore di un nodo (frame, layer, componente) in un file Figma; serve all'MCP per sapere su quale oggetto lavorare.
- **DTCG (Design Tokens Community Group)**: formato standard e aperto per i design token (il "W3C Design Tokens"), usato per esportare e scambiare token tra strumenti diversi.
- **Plan mode**: modalità di Claude Code in cui legge e propone un piano senza toccare i file finché non approvi (Shift+Tab o `/plan`). Vedi «Comandi, slash command e subagent per il design».
- **SSR / serverless**: rendering lato server e funzioni eseguite on-demand senza gestire un server dedicato; distinguono un sito statico da un'app con logica dinamica. Vedi «Deploy del prototipo».
- **Personal Access Token (PAT)**: chiave personale (in Figma inizia con `figd_`) che autentica un client verso un servizio; va trattata come una password e tenuta fuori dal repo.

---

## Fonti

**Context engineering e prompting**
- library.aidesign.guide (The AI Design Library)
- Addy Osmani, Context Engineering: Bringing Engineering Discipline to Prompts
- Design with AI, Five insights from workflows to think, test, build, ship with AI
- NN/g, AI prototyping; Testing AI methodology; Vague prototyping
- (memoria di progetto) Context engineering; How I use AI to partner on design problems; Context is the new component library for AI agents; Design with AI (IAAD)

**Claude e Figma**
- Claude Code for Designers: A Practical Guide
- arps18.github.io, Beyond the Prompt: Claude Code
- How to Connect Figma to Claude (MCP Setup Guide 2026)
- Design Systems in 2026: Turn Your System into a Claude Skill
- Design with AI, My Top 14 Claude Code Commands
- Product Compass, PM Skills 2.0: Red-Team & Ship
- Figma Learn, Workflow lab: Code to canvas
- Figma Developer Docs / Figma Learn, Guide to the Figma MCP server (Dev Mode MCP: server remoto e locale, code-to-canvas, Code Connect)
- `southleft/figma-console-mcp`: Figma Console MCP + plugin Figma Desktop Bridge (README, DeepWiki)
- DesignAgent, plugin Figma Community (figma.com/community/plugin/1604428052675393154)
- Sherizan (Design AI Stack), How to give Claude Code hands and eyes inside Figma (DesignAgent, bridge bidirezionale)
- Nick Babich, Claude Code Project Structure Best Practices (UX Planet, archive.is/…5a9c3c97f121)
- Nick Babich, Ultimate Claude Code Setup for Product Designers (UX Planet, archive.is/…f8b2fff4ac69)
- Nick Babich, cheatsheet "Claude Skills", "Figma Skills" e "File structure for design project in Claude Code"
- (memoria di progetto) Your design system is fragmenting into agent files; My framework to make design systems AI-readable; How to make Claude Code follow your design system in Figma; CLAUDE.md best practices; How to write a DESIGN.md file Claude can actually use; Claude Code + Figma Design System; Turn Your System into a Claude Skill

**Repository di skill**
- Lista completa degli starred di `mattialaurella-lotrek` (79 repo) + i 10 segnalati manualmente.
- Jack Henry (Medium), 5 New Claude skills for UI/UX designers

**Deploy**
- MindStudio, How to Deploy a Claude Code Project to GitHub and Vercel in Under 10 Minutes
- Vite, Deploying a Static Site (guida ufficiale: GitHub Pages, base path, workflow Actions)
