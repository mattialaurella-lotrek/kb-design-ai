# Progettare con l'AI, una guida per non perdere la rotta (e il senno)

Questa guida raccoglie il metodo e gli strumenti per progettare con l'AI: come si prepara il contesto, come lo si mette per iscritto, come si lavora fra Claude e Figma, come si rende il design system leggibile da un agente e come si arriva a un prototipo pubblicato. Il taglio è operativo, quindi metodi, comandi e strumenti concreti.

**Gli strumenti e i temi in gioco:**

- **Claude** per ragionare in conversazione e **Claude Code** nel terminale per costruire.
- **I file markdown di contesto** (`CLAUDE.md`, `DESIGN.md`, `UX.md`), la fonte di verità che l'agente legge.
- **Figma** come libreria visiva e, con l'MCP, superficie che l'AI legge e su cui scrive.
- **Il design system**, da rendere comprensibile a una macchina prima che a una persona.
- **Le Claude Skills**, istruzioni scritte una volta che l'AI carica quando servono.
- **Le librerie** di icone, componenti, motion ed effetti con cui si monta il prototipo.
- **GitHub e Vercel** per versionare il lavoro e pubblicarlo a un indirizzo condivisibile.

Sei capitoli in sequenza: il contesto e come si scrive nei file, il collegamento con Figma, il design system, le Claude Skills, la costruzione e la pubblicazione del prototipo. Chiudono i prossimi argomenti, il glossario e le fonti. Usa l'**indice laterale** per saltare dove ti serve, oppure leggi in ordine. Buona lettura ( ͡ʘ ͜ʖ ͡ʘ)

**Indice**

- **Progettare il contesto**
  - Dal comando al contesto
  - Il contesto è una risorsa finita
  - Requisiti minimi di partenza
  - Scrivere una richiesta
  - Mantenere il contesto nel tempo
  - Checklist pre-richiesta e segnali
  - Human-in-the-loop
- **Scrivere il contesto**
  - I file di contesto
  - CLAUDE.md
  - DESIGN.md
  - UX.md
  - Organizzare il progetto
- **Collegare Claude e Figma**
  - Dividere il lavoro tra Claude Desktop e Claude Code
  - Tre modi di collegare Figma a confronto
  - Setup e loop con Figma MCP
  - Le skill Figma per Claude Code
  - Comandi e subagent per il design
- **Il design system per l'AI**
  - Rendere il design system leggibile dall'AI
  - Creare una skill dal proprio design system
  - Enforcement del design system
- **Costruire e pubblicare un prototipo**
  - Dal codice al canvas e ritorno
  - Librerie per asset ed effetti
  - Deploy del prototipo
- **Lavorare con le Claude Skills**
  - Cosa sono le skill e come si creano
  - Catalogo di skill di riferimento
- **Prossimi argomenti**
- **Glossario**
- **Fonti**

---

## Progettare il contesto

Perché l'AI produce spesso qualcosa di corretto e generico, cosa le serve davvero per fare di meglio e quali sono le quattro cose che devi portarle tu. È il capitolo da cui dipendono tutti gli altri.

### Dal comando al contesto

Quasi tutti i risultati deludenti con l'AI hanno la stessa causa, cioè al modello mancavano le informazioni per ragionare. Riscrivere il prompt non gliele aggiunge, e allungarlo nemmeno, perché oltre una certa soglia il dettaglio in più fa calare l'accuratezza.

La pratica si è mossa in tre tempi, che NN/g distingue così. Il **prompt engineering** lavora sulla formulazione della richiesta, ed è la fase in cui i team collezionavano prompt come risorse da riusare. Il **context engineering** allarga il problema alla configurazione di tutto ciò che il modello ha davanti quando risponde, cioè istruzioni di sistema, conoscenza recuperata, strumenti collegati, memoria e stato della conversazione. La **context architecture** è il livello sopra e riguarda la struttura di quell'informazione, come è gerarchizzata, come è nominata, come si trova. È l'applicazione dei principi di information architecture ai sistemi AI, e l'analogia è quella dell'edificio, dove l'ingegnere garantisce che stia in piedi e l'architetto decide come lo si attraversa.

La definizione utile da tenere a mente è quella di Anthropic, cioè curare **il più piccolo insieme possibile di token ad alto segnale** che massimizza la probabilità del risultato voluto. È l'opposto dell'istinto comune ("carico tutto: brand PDF + ricerca + design system"). Caricare tutto fa peggiorare l'output, perché il modello si distrae e "dimentica" i vincoli. Vale lo stesso principio della progressive disclosure nell'interfaccia, dove si rivela l'informazione quando è rilevante.

**Comando e contesto, in pratica:**

- **Approccio a comando:** con "Genera un layout di checkout" si ottengono opzioni generiche dal training generale, di cui poche realmente utili a fronte di un elevato rework.
- **Approccio a contesto:** si forniscono token e un esempio del pattern, vincoli espliciti, dati reali derivati dalla ricerca, e infine la richiesta con i criteri di successo. In questo modo si ottengono varianti informate, coerenti col sistema, già inquadrate.

### Il contesto è una risorsa finita

La finestra di contesto è lo spazio in cui l'AI tiene tutto quello che sta considerando in quel momento: le tue istruzioni, i file che le hai dato, la conversazione fin lì. Più la riempi, meno riesce a tenere a fuoco ogni singola parte, perché ogni pezzo di testo che legge lo confronta con tutti gli altri e il lavoro cresce molto più in fretta della lunghezza. L'effetto è misurato: al crescere del testo cala la capacità di ritrovare con precisione una singola informazione. La discesa è graduale, quindi sui contesti lunghi il modello continua a funzionare e diventa solo meno affidabile quando deve recuperare un dettaglio o collegare due punti lontani fra loro.

Il **context rot** è la versione che si incontra lavorando. Anche partendo da un contesto curato, falsi avvii, tentativi di debug e divagazioni riempiono la finestra di rumore, e il modello comincia a riferirsi ai propri output scadenti. Le contromisure sono quattro.

- **Riassumere e ripartire:** chiudere l'istanza, riassumere e aprirne una nuova col riassunto come seme (la meccanica sta in «Mantenere il contesto nel tempo»).
- **Confini espliciti:** marcare le sezioni ("tentativi precedenti, solo riferimento" contro "contesto di lavoro attuale").
- **Checkpoint periodici:** far riassumere stato e decisioni a intervalli regolari.
- **Non "buttare tutto dentro":** decidere cosa includere, cosa escludere e quando rinfrescare pesa quanto scrivere la richiesta. Anche gli strumenti collegati occupano spazio, perché ogni MCP attivo si mangia una fetta della finestra (vedi «Setup e loop con Figma MCP»).

**Cosa tenere e cosa lasciare fuori:** prima di riempire il contesto, guarda quello che stai per dargli e chiediti quanto serve a questo compito. Per ridisegnare la pagina delle impostazioni all'agente servono i token pertinenti, i componenti che si usano in quell'area, due o tre vincoli di prodotto, l'implementazione attuale della pagina, i requisiti di accessibilità e un paio di esempi. Restano fuori la strategia di prodotto, l'intero catalogo dei componenti, la documentazione dell'architettura di backend, tre anni di storia del progetto e cinquanta screenshot di altre schermate. Chi prepara il contesto tende a mettere dentro tutte e due le liste, perché aggiungere sembra la mossa prudente, e l'informazione che conta finisce annegata in quella che non serve.

### Requisiti minimi di partenza

Nella finestra di contesto finiscono anche le istruzioni di sistema, gli strumenti collegati e la memoria della conversazione, che però non dipendono da te. Quello che dipende da te sono quattro cose, e ognuna ha più avanti il posto in cui si scrive.

1. **Il design system:** il vocabolario e le regole di base. All'AI non serve il file Figma né un PDF. Servono token colore come variabili CSS (`--color-primary-500`), una scala di spaziatura con rapporti chiari, qualche componente d'esempio che mostra i token in uso, e soprattutto **nomi che dicono il ruolo del token invece del suo aspetto**, perché `--color-text-primary` dà all'AI qualcosa su cui ragionare e `#1a1a1a` no (vai a «Il design system per l'AI»).
2. **Le linee guida di brand:** da PDF aspirazionale a vincoli operativi. Blocca gli elementi critici (logo, colori primari, caratteri), dichiara dove c'è libertà e definisci confini misurabili, quindi «headline in Inter Bold, 24–48px» e non «headline moderne». Il file dove si scrivono è `BRAND.md` (vai a «I file di contesto»).
3. **La ricerca sugli utenti:** il livello più sottovalutato. Tiene le proposte ancorate alla realtà con chi sono le persone, i requisiti di accessibilità, i comportamenti osservati, i casi limite e la lingua. Senza, l'AI progetta per l'utente medio, l'unico che conosce (vai a «UX.md»).
4. **Il modo di chiedere:** come strutturi la richiesta (vai a «Scrivere una richiesta»).

**Provalo adesso:** prendi un compito che daresti all'AI oggi e scrivi in quattro righe cosa hai da darle su ciascuno dei quattro punti. Quello che non riesci a riempire è il motivo per cui l'output ti tornerà generico.

### Scrivere una richiesta

Due cose separate: come formuli quello che chiedi, e in che ordine glielo dai.

**Le tecniche che cambiano il risultato:**

- **Chain-of-thought:** invece di chiedere l'output finale, si struttura la richiesta in passi (analizza lo stato → individua i vincoli → genera 3 approcci → valuta ciascuno contro i vincoli e raccomanda). Migliora i risultati e rende il ragionamento trasparente, così gli errori si intercettano a metà processo.
- **Tree-of-thought:** per decisioni strategiche con trade-off, esplora più percorsi di ragionamento; si vede l'albero decisionale, non solo la conclusione.
- **Spezzare le richieste lunghe:** un problema per richiesta. Una richiesta che tocca insieme layout, copy e stati torna sbagliata in tutti e tre.
- **Partire dall'obiettivo dell'utente:** cosa deve riuscire a fare, e in quanti passi. La forma visiva discende da lì.
- **Dichiarare i vincoli prima della richiesta:** piattaforma, soglie di accessibilità, regole di brand. Un vincolo scritto restringe lo spazio delle risposte, uno sottinteso viene ignorato.
- **Tradurre lo stile in implementazione:** "rendilo moderno" non significa nulla operativamente; va convertito in regole ("ritmo 8px", "gerarchia primario/secondario chiara", "stati hover/focus/disabled visibili").

**L'ordine dei blocchi:** Il contesto va **prima** della richiesta, perché l'AI processa in sequenza e ciò che vede prima condiziona il resto.

- **Foundation-first (generazione di design):** `SYSTEM CONTEXT` → `BRAND CONSTRAINTS` → `USER REQUIREMENTS` → `TASK` → `SUCCESS CRITERIA`.
- **Reasoning-forward (decisioni strategiche):** `CONTEXT` → `CONSTRAINTS` → `QUESTION` → `PROCESS` (per ogni opzione l'approccio, i vantaggi dati i vincoli, i rischi e una raccomandazione motivata).
- **Iterative refinement (miglioramento):** `CURRENT STATE` → `FEEDBACK` → `NEW CONSTRAINTS` → `TASK` (raffina e spiega cosa è cambiato e perché).

### Mantenere il contesto nel tempo

Su un lavoro lungo la finestra si sporca da sé, con falsi avvii, tentativi di debug e file aperti una volta e mai più usati. Due mosse dipendono da te.

**Chiudere e ripartire da un riassunto:** quando la conversazione si allunga e le risposte peggiorano, chiudila, fatti scrivere un riassunto di dove sei arrivato e aprine una nuova con quello dentro. Claude Code lo fa anche da solo avvicinandosi al limite, tenendo le decisioni prese e i problemi ancora aperti, ma farlo tu prima costa meno.

**Tenere gli appunti in un file, non nella chat:** quello che deve sopravvivere alla sessione va scritto in un file, così alla ripresa lo rileggi invece di ricostruirlo a memoria. È il compito di `SESSIONS.md`, descritto in «I file di contesto».

Il resto lo fa lo strumento. Claude Code carica i `CLAUDE.md` all'avvio e va a prendere gli altri file solo quando servono, e può affidare un'esplorazione lunga a un subagent che lavora in una finestra sua e restituisce la sola sintesi.

### Checklist pre-richiesta e segnali

**Prima di lanciare una richiesta, verifica di avere:**

- i token con una gerarchia e nomi che dicono il ruolo, più qualche componente d'esempio che li mostra in uso;
- i casi limite scritti da qualche parte, non solo il percorso in cui va tutto bene;
- le linee guida di brand tradotte in vincoli, con dichiarato cosa è bloccato e cosa è libero;
- chi è l'utente, con i requisiti di accessibilità e gli attriti che la ricerca ha trovato davvero;
- la richiesta divisa in fasi, con i criteri per dire che è riuscita e la priorità fra i vincoli che si contraddicono.

<div class="verdict">
<div class="verdict-ok">
<svg class="verdict-ico" aria-hidden="true"><use href="#ico-check"/></svg>
<p class="verdict-title">Sta funzionando</p>
<p>Se l'output rispetta il design system senza che tu debba ricordarglielo, le varianti sono on brand senza correzioni pesanti, l'accessibilità c'è dall'inizio e passi più tempo a decidere che a rifare.</p>
</div>
<div class="verdict-ko">
<svg class="verdict-ico" aria-hidden="true"><use href="#ico-close"/></svg>
<p class="verdict-title">Non sta funzionando</p>
<p>Se rilavori molto gli output, le varianti sono generiche o quasi giuste, aggiungi vincoli in continuazione, la qualità cambia parecchio da una sessione all'altra. Quasi sempre si tratta di un problema di contesto e non del modello.</p>
</div>
</div>

### Human-in-the-loop

Il lavoro critico va fatto **prima** di coinvolgere l'AI: ricerca, framing, ipotesi. Ogni cosa generata va poi provata su due domande, se funziona e se sta dentro il brand. La competenza che conta è saper guardare una soluzione già pronta e chiedersi se è quella giusta, quali assunzioni fa, cosa non stiamo vedendo. Pesa più della padronanza di Figma o di Claude. E le fonti che l'AI cita vanno sempre verificate, perché sa di doversi attenere ai dati di progetto e può comunque allucinare.

## Scrivere il contesto

I concetti del capitolo precedente diventano file che l'agente legge. Qui trovi quali sono, cosa scriverci dentro e come tenerli in ordine.

### I file di contesto

Un agente che progetta senza contesto consegna qualcosa di corretto e generico insieme: manca lo stato vuoto, il colore da solo porta il significato, ricompare un pattern che il team aveva scartato settimane prima. Ha fatto un lavoro onesto sul brief che aveva davanti, era il brief a essere molto più sottile di quello che avevi in testa. I file di contesto servono a scrivere la parte di brief che di solito nessuno mette per iscritto.

Sono formati con funzioni diverse, spesso complementari:

- **`CLAUDE.md`:** memoria di progetto di Claude Code, caricata a inizio sessione (è contesto, non enforcement rigido). Tienilo **snello**. Come si scrive e quali sezioni contiene sta in «CLAUDE.md».
- **`CLAUDE.local.md`:** le tue preferenze personali, tenute fuori dal repo (gitignored). Utile per non imporre al team le tue abitudini.
- **`AGENTS.md`:** il **livello di orchestrazione**. Non è documentazione del design system, ma dice all'agente dove guardare per ogni cosa (quale file ha i token canonici, dove vive la libreria componenti, quali MCP consultare, se usare utility Tailwind o token quando confliggono). Se si adotta un solo formato, questo è quello a maggior ritorno, perché costa poche ore di scrittura e viene consultato di continuo.
- **`DESIGN.md`:** l'identità visiva condensata in un front matter YAML con i token più un corpo markdown con le regole visive. La spec definisce otto sezioni in ordine fisso (overview, colori, tipografia, layout, elevazione/profondità, forme, componenti, do's & don'ts). Aperta da Google Labs nell'aprile 2026, è la più matura della lista. Estrarre i token però è il passo che costa meno, perché quello che sposta l'output sono l'intento e i confini scritti attorno (vai a «DESIGN.md»).
- **`UX.md`:** quello che il team sa sugli utenti, scritto perché lo legga l'AI. Se `DESIGN.md` dice come deve apparire il prodotto, `UX.md` dice per chi è e come deve comportarsi, con i finding di ricerca ridotti a vincoli, gli standard di interazione, il glossario di dominio, il modello dell'utente e quello del suo contesto d'uso. È il più giovane della lista, una proposta di NN/g del luglio 2026 che nessuno strumento carica in automatico. Copre però un vuoto che gli altri file lasciano aperto (vai a «UX.md»).
- **`MEMORY.md`:** memoria di progetto a lungo termine, con le decisioni prese e il contesto che deve sopravvivere tra le sessioni (perché abbiamo scelto X, cosa abbiamo scartato).
- **`SKILL.md`:** conoscenza **procedurale** per workflow specifici. Una skill è una cartella con un `SKILL.md` in cima più eventuali script/template. La struttura è a progressive disclosure. I metadati (~100 token) caricano per primi e decidono se la skill è rilevante, il corpo markdown (~500–2000 token) dà le istruzioni, i file di reference si caricano on-demand. Così non si bruciano token quando la skill non serve. Come si scrivono e quali adottare sta in «Lavorare con le Claude Skills», l'ultimo capitolo.

A questi si aggiungono i file di configurazione: **`.mcp.json`** (connessioni a Figma, Notion, GitHub…) e, dentro `.claude/`, **`settings.json`** (permessi condivisi col team) e **`settings.local.json`** (permessi personali, gitignored).

**Estensioni facoltative del contesto di progetto:** su progetti più strutturati può aiutare un set esteso di markdown. Sono estensioni possibili, non file obbligatori. I primi tre vanno scritti in quest'ordine, perché `BRAND.md` e `VOICE.md` si appoggiano a quello che li precede; gli altri stanno in piedi da soli.

- **`PLAN.md`:** cosa stai costruendo, per chi, i flussi principali, cosa è in scope e i non-goal, i vincoli. Va scritto per primo, perché i plugin che generano brand e voice lo leggono per farti domande sul prodotto reale invece che sul nome della cartella. La lista dei non-goal, il «questo no, e non adesso», è la parte che si tende a saltare ed è l'unico freno che regge, perché gli agenti allargano lo scope di continuo, e lo fanno con le migliori intenzioni.
- **`BRAND.md`:** chi sei (audience, personalità, promessa, carattere). È la radice da cui parole e design attingono, così restano coerenti tra loro.
- **`VOICE.md`:** come parli (personalità, parole bandite, punteggiatura, con esempi). È l'equivalente a livello di progetto di uno standard editoriale, con le regole scritte una volta e un passo di proofread che le applica lasciando intatti codice, id, comandi e versioni.
- **`BACKLOG.md`:** la coda ordinata di cosa fare (Now / Next / Later / Done). Tiene la priorità in un file che l'agente legge, non nella tua testa. Il prompt tipico suona "costruisci l'item a priorità più alta in @`BACKLOG.md`". Quando la coda supera lo schermo o serve a più persone, spostala su GitHub Issues e punta `CLAUDE.md` al repo.
- **`SESSIONS.md`:** dove eri rimasto (cosa aspetti, i fatti che ti tocca rispiegare, un log datato con l'ultimo in cima). Da leggere per primo a ogni ripresa. A fine sessione il prompt tipico suona "riassumi in @`SESSIONS.md` cosa abbiamo fatto". Va distinto da `MEMORY.md`, che tiene le decisioni di lungo periodo, mentre `SESSIONS.md` tiene l'handoff tra una sessione e la successiva.
- **`CONTRACT.md` (avanzato):** serve solo quando il progetto ha più repo. Vive in un piccolo repo condiviso e lista ciò su cui i repo devono concordare (formati dei link, impostazioni condivise, versioni che si muovono insieme, chi possiede cosa); ogni `CLAUDE.md` lo importa. La regola è cambiare prima il contratto, poi il codice.

- **`FLOWS.md`:** tutti gli stati in cui una feature può trovarsi (default, caricamento, vuoto, salvataggio, errore, bloccato) e cosa porta dall'uno all'altro. Gli agenti costruiscono l'happy path perché di solito è l'unico percorso che qualcuno ha descritto. Lo stato vuoto che nessuno si ricorda mai di progettare non sparisce, se è scritto qui.
- **`DECISIONS.md`:** registro in sola aggiunta (append-only) delle scelte fatte e soprattutto di quelle scartate, sul modello degli architecture decision record. Il vincolo di non riscrivere il log è la parte che conta. Se correggi la storia, cancelli la prova che quell'alternativa l'avevi già pesata e messa via, e un mese dopo la stessa proposta torna con un vestito diverso. Si sovrappone in parte a `MEMORY.md`; la differenza sta nella sola aggiunta e nel registrare anche gli scarti.
- **`REVIEW.md`:** la checklist che l'agente esegue prima di potersi dichiarare a posto, ogni voce una domanda con risposta sì o no. Cresce da sé, e quando lo stesso tipo di errore ricompare due volte si aggiunge una riga.
- **`COMPONENTS.md`:** la risposta canonica a «questo esiste già?». Lasciato a sé, un agente costruisce un componente nuovo invece di trovare quello che hai, ed è la causa più frequente di deriva del design system. Funziona solo se è onesto. Un file che ammette dove Figma e codice si sono allontanati regge il peso, uno pulito e sbagliato insegna all'agente a sbagliare con sicurezza.

**I file di una singola feature vanno archiviati il giorno del rilascio:** il PRD, la mappa dei flussi e la sintesi di ricerca servono finché quella feature si costruisce. L'agente non ha modo di sapere che un file è scaduto, quindi finché resta nel progetto lo legge come se valesse oggi e ti progetta addosso i requisiti del mese scorso.

**Una regola che l'agente possa applicare:** viene naturale immaginare questi markdown come documentazione, le istruzioni che forniresti a un collega che entra nel progetto. È la ragione per cui i primi tentativi di solito non servono a niente. Una persona vuole la storia e il ragionamento, e vuole capire perché una regola esiste prima di fidarsene. All'agente serve la regola e basta, in una forma contro cui misurare il proprio output prima di generare qualsiasi cosa.

**Non scriverli tutti insieme:** tutti questi documenti ipotetici forniti in blocco non aiutano e, anzi, una buona metà non verrà nemmeno usata, perché non serviva davvero. Si parte da pochi documenti, quelli essenziali, il file root e quello di design, e gli altri si aggiungono in seguito, quando la loro assenza inizia a farsi sentire.

**Dichiara quale file vince:** con più file capita che due si contraddicano, e l'agente non ha modo di sapere quale dei due vale. L'ordine di precedenza va scritto in `CLAUDE.md`, così la regola approvata sta sopra gli appunti di lavoro e la procedura corrente sopra quella dismessa.

**`CLAUDE.md` come indice, non contenitore:** con molti file di contesto la tentazione è fare `@import` di tutti in `CLAUDE.md`, così l'agente ha sempre tutto. Funziona ma spreca, perché ogni sessione carica brand, contratto e backlog che non stai toccando, e il contesto utile per il lavoro vero è già consumato prima di iniziare. Meglio un **indice**, dove `CLAUDE.md` dice cosa è ogni file e quando leggerlo, e l'agente apre quello che serve (progressive disclosure, la stessa logica dei metadati delle skill). Conviene caricare sempre solo due file, **`SESSIONS.md`** (dove eri rimasto è sempre rilevante) e **`PLAN.md`** (l'obiettivo è sempre rilevante); il resto sono puntatori, che l'agente apre al momento (`VOICE.md` quando scrivi copy, `DESIGN.md` quando tocchi l'interfaccia, `CONTRACT.md` sul secondo repo). Come test pratico, se `CLAUDE.md` è così lungo che lo scorri veloce, lo scorre veloce anche l'agente.

### CLAUDE.md

`CLAUDE.md` è il primo file che Claude Code legge quando apri un progetto, e decide come Claude si comporterà per il resto della sessione. Nell'elenco qui sopra è una voce fra tante. Qui c'è come si scrive, perché è il file da cui si parte e quello su cui si sbaglia di più.

**Due file con lo stesso nome, due compiti diversi:** quello di progetto sta nella cartella del progetto e vale solo lì, con l'architettura, le regole del design system, i vincoli di prodotto e i comandi. Quello globale sta in `~/.claude/CLAUDE.md` e vale su tutto quello che apri, quindi raccoglie le tue abitudini di lavoro, il formato con cui vuoi le risposte e i passaggi che ripeti su ogni progetto. Mescolarli è l'inciampo più frequente di chi comincia. Se scrivi nel file globale come vanno commentati i componenti React, te lo ritrovi applicato a un progetto iOS in Swift, e non capisci da dove sia uscito.

**Il primo file non si scrive dal foglio bianco:** il comando `/init` guarda la cartella e ne butta giù una bozza. Claude sta ricostruendo il progetto a ritroso da quello che vede, quindi quella bozza è generica e non contiene niente delle tue intenzioni: vale come punto di partenza, non come file finito. I due passaggi che la rendono utile vengono dopo. Il primo si fa lontano dal computer, su un foglio. Immagina che domani entri in squadra una persona che sa progettare e sa scrivere codice: scrivi cosa le spiegheresti del progetto, quali vincoli ha (tecnici e commerciali) e quale livello di qualità ti aspetti. Il secondo passaggio è tornare sulla bozza con quel foglio davanti, cancellare quello che non serve e aggiungere quello che sai solo tu.

**Cosa ci va dentro:** quello che Claude sbaglierebbe se nessuno glielo dicesse. Il resto occupa contesto e basta. In pratica sono quattro famiglie, cioè i comandi veri del progetto (installazione, sviluppo, build, lint, test), i passaggi che vuoi sempre nello stesso ordine (cosa succede prima di un commit), i vincoli tecnici (questa versione del framework e non un'altra) e i vincoli commerciali (le cose da non toccare perché il danno arriverebbe fino agli utenti).

**Le prime trenta righe orientano la lettura di tutto il resto:** Claude guarda l'inizio del file con più attenzione, quindi lì vanno l'identità del progetto, i vincoli non negoziabili, la tecnologia principale e le cose che non deve mai fare.

```
# Panoramica
Piattaforma di analytics per uso interno.

Obiettivi: velocità, chiarezza, gerarchia densa, uso da tastiera.
Da evitare: estetica SaaS generica, spaziature larghe, decorazione.
Tecnologia: Next.js, TypeScript, Tailwind, shadcn/ui.
```

**Quali sezioni mettere:** dopo l'apertura il file si organizza per aree, e per un lavoro di design queste sei coprono quasi tutto. `# Role` dice chi deve essere Claude (per esempio «sei un senior product designer e frontend engineer»). `# Product context` dice cosa fa il prodotto e per chi. `# Design principles` elenca i principi a cui attenersi, come la chiarezza prima della decorazione o una sola azione primaria per schermata. `# Design system rules` fissa le regole del sistema, quindi riusare i componenti che esistono, seguire i token, non scrivere gli stili a mano. `# Workflow` descrive l'ordine dei passaggi, per esempio analizza la UX, spiega la modifica, individua i componenti coinvolti, proponi un piano e aspetta l'approvazione. `# Output format` dice in che forma vuoi la risposta, per esempio ragionamento, modifiche proposte, file toccati e rischi.

Su un progetto più tecnico le aree cambiano nome ma non logica, quindi `# Project Overview`, `# Architecture`, `# Tech Stack`, `# Coding Conventions`, `# Folder Structure`, `# Commands` e `# Important Rules`.

**Regole ferme, preferenze e anti-pattern in tre gruppi separati:** se li mescoli, Claude non ha modo di sapere a cosa cedere quando due istruzioni si pestano i piedi. Gli anti-pattern sono il gruppo che quasi nessuno scrive, e quello che ferma la deriva. Viene naturale descrivere cosa vorresti, molto meno mettere per iscritto cosa non deve succedere mai.

```
# Regole ferme
- Mai il blu di default di Tailwind
- Nessun file nuovo senza approvazione
- Ogni risposta delle API va tipizzata

# Preferenze
- Nomi brevi
- Layout densi

# Anti-pattern
- Mai testo segnaposto tipo lorem ipsum
- Mai aggiungere dipendenze senza chiedere
- Mai rifattorizzare file che non c'entrano
- Mai un hero centrato se non è stato chiesto
```

**Sotto le duecento righe:** il file entra nel contesto a ogni sessione, quindi ogni riga si paga per sempre (vedi «Il contesto è una risorsa finita»). Quando il materiale cresce, il file si spezza in file separati che `CLAUDE.md` richiama con `@`, secondo il principio di «`CLAUDE.md` come indice, non contenitore». Una convenzione diffusa è tenerli in una cartella `.claude/rules/` divisi per tema (`ui.md`, `accessibility.md`, `copywriting.md`). Quella cartella però non ha niente di speciale: Claude Code non la carica da sola, e i file si leggono perché li hai richiamati con `@`.

**Un `CLAUDE.md` per cartella, quando serve:** Claude legge il file più vicino a quello su cui sta lavorando, quindi parti diverse dello stesso progetto possono avere regole diverse.

```
CLAUDE.md                ← regole generali del progetto
app/CLAUDE.md            ← regole per il front-end
app/dashboard/CLAUDE.md  ← regole per le pagine dense di dati
```

Quando due file dicono cose diverse sullo stesso argomento, vince la regola più vicina e più specifica: il progetto batte il globale, la sottocartella batte la radice.

**Sapere se sta funzionando:** il segnale è quante volte ti tocca correggere Claude a mano su un'operazione di routine. Tenere il conto è noioso e c'è un comando che lo fa al posto tuo: `/insights` genera un report HTML sulle tue sessioni, e la sezione «Where Things Go Wrong» elenca i punti di attrito ricorrenti. Lanciato una volta a settimana, dice quali regole mancano.

**Vive col progetto:** si aggiorna quando noti un errore che ricompare, quando introduci uno strumento nuovo, quando i requisiti cambiano. E va committato in git come qualunque altro file del repo, così tutta la squadra ottiene lo stesso comportamento e le regole hanno una storia leggibile.

**Come cresce, una regola alla volta:** l'accumulo arriva da una lunga serie di decisioni ragionevoli, ognuna giusta il giorno in cui l'hai presa. Claude duplica un componente e aggiungi una regola. Tocca un file che non doveva toccare, un'altra regola. Dimentica di lanciare i test, un'altra ancora. Sbaglia un token di spaziatura, un'altra. Sei mesi dopo il file ha centinaia di istruzioni, alcune si sovrappongono, alcune si contraddicono, e parecchie risolvono problemi che non capitano più. A quel punto è diventato l'archivio storico del progetto invece della sua guida, e Claude se lo legge tutto prima di cominciare.

**Togliere è manutenzione quanto aggiungere:** su un progetto maturo il lavoro sul file di contesto è fatto più di cancellature che di aggiunte. Passando in rassegna le regole, cinque domande dicono cosa tenere.

- Claude ha ancora bisogno di questa istruzione? Se no, via.
- La regola vale su tutto il progetto? Se vale solo su una parte, spostala nella cartella giusta.
- Claude può ricavarla guardando il codice? Se sì, scriverla è fiato sprecato.
- Un'altra regola dice già la stessa cosa? Uniscile.
- Sta rimediando a un singolo errore che Claude ha fatto sei mesi fa? Cancellala.

È così che il file resta corto mentre il progetto cresce.

### DESIGN.md

`DESIGN.md` è l'identità visiva del prodotto scritta in un file che l'agente legge, e il resto del capitolo lo dà per scontato: i prompt del bridge bidirezionale ci scrivono dentro i token estratti dal canvas, il loop di auto-verifica confronta lo screenshot con quello che c'è scritto, il passaggio dalla chat a Claude Code lo usa come ponte. Qui c'è come si scrive. La sintassi è la parte facile: un file che lascia l'output dov'era è quasi sempre un file scritto nell'ordine sbagliato e senza confini.

Il formato nasce dentro Google Stitch, dove è il primo artefatto che l'AI produce quando le chiedi una schermata, e Google Labs lo apre come specifica nell'aprile 2026. È una spec **alpha**: dark mode, motion e breakpoint responsive sono tra le questioni aperte, e quanto attecchirà dipende da quanti strumenti decideranno di leggerlo e scriverlo. Porta con sé un CLI che fa lint (controlla i riferimenti ai token e segnala le coppie di colori sotto le soglie WCAG), diff tra due versioni ed export verso una configurazione Tailwind o il formato DTCG. Si lancia senza installare niente, con `npx @google/design.md lint DESIGN.md` per il controllo e `npx @google/design.md diff DESIGN.md DESIGN-v2.md` per il confronto fra due versioni. Le otto sezioni del corpo, in ordine fisso, sono elencate in «I file di contesto».

**Due meccaniche fanno da contratto:** la prima è che i token sono **normativi**. Se il corpo in prosa e il front matter si contraddicono, vince il front matter; alla prosa restano l'intento e i confini. La seconda è che i valori si referenziano invece di ripetersi. L'aspetto di un componente diventa una serie di puntatori, e un rebrand si risolve in una riga invece che in una caccia su quaranta file.

```
## Components
Bottone primario: sfondo {colors.primary}, testo {colors.on-primary},
raggio {rounded.lg}, padding {spacing.md}.
```

La validazione è severa in un punto solo: un'intestazione di sezione sconosciuta viene conservata, un token sconosciuto viene accettato se il valore è valido, ma **un'intestazione duplicata fa fallire l'intero file**. Ordine e unicità delle sezioni sono strutturali.

**Il nome del token è già metà del vincolo:** una palette fatta di `blue`, `gray-900`, `gray-500` e `red` obbliga l'agente a indovinare a cosa serve ogni colore. Il blu è dei link, dei pulsanti principali, della voce di menu attiva o del focus? Dei due grigi, quale va sullo sfondo di pagina? Un nome che dichiara il ruolo toglie la domanda prima che si ponga: `action-primary`, `surface-page`, `text-secondary`, `border-default`, `status-danger`. È anche la scelta che invecchia meglio, perché `bigRedButton` si rompe al primo rebrand mentre `button.primary` sopravvive a qualunque cambio visivo. La spec incoraggia proprio questo, cioè assegnare ai colori un ruolo semantico invece di elencare una tavolozza.

**Descrizione contro vincolo:** è qui che quasi tutti i `DESIGN.md` si perdono. Un file che inizia dalla palette offre **descrizione**, e racconta com'è fatto il sistema. Al modello serve **vincolo**, cioè cosa il sistema permette, cosa vieta e cosa fare quando arriva a un caso limite. Sono due compiti di scrittura diversi. La forma buona di un token è **valore, poi intento, poi confine**, e il confine è quello che salta quasi sempre.

```
primary: #1B4DFF — solo per CTA e stati attivi. Mai come sfondo,
mai decorativo. Una sola azione primaria per schermata: se ne
servono due, ripensa il layout.
```

Per capire se una regola è scritta abbastanza stretta c'è una prova rapida: chiediti se due designer della tua squadra potrebbero leggerla in due modi diversi. Se la risposta è sì, manca un pezzo.

**La sequenza conta più della completezza:** l'ordine in cui scrivi le sezioni decide quanto vale il file.

1. **Brief di prodotto**, due o tre frasi, prima di qualsiasi token: cosa fa il prodotto, chi lo usa, cosa l'interfaccia deve permettergli di ottenere. La spec lo prevede già, è la sezione Overview, ma quasi tutti la scrivono sottile e decorativa. È l'errore che si paga a valle, perché quel brief orienta ogni decisione successiva.
2. **Token** scritti come vincoli, nella forma vista sopra.
3. **Tipografia:** definita per ruoli (`h1`, `body-md`, `label-caps`) e non per sola famiglia, con corpo, peso e interlinea dentro ciascun ruolo, più l'indicazione di quando usare ogni livello e quando lasciarlo stare. Un ruolo dichiarato fa scegliere l'agente fra stili che esistono già, invece di fargli inventare un trattamento nuovo a ogni schermata. Stessa logica per la spaziatura, dove una scala chiusa (`xs`, `sm`, `md`, `lg`, `xl`) è quello che impedisce a 13px, 18px e 27px di spuntare qua e là.
4. **Logica di componente:** quando si usa una card invece di una riga di lista, più che com'è fatta una card. È il livello che manca nei file che sembrano completi e continuano a produrre interfacce incoerenti.
5. **Stati di interazione:** hover, pressed, disabled, focus. Quasi tutti descrivono il componente a riposo e si fermano lì, dando per scontato che il resto si deduca. L'agente invece se lo inventa da capo a ogni sessione. Nella spec le varianti sono voci componente a sé, quindi accanto a `button-primary` si scrive `button-primary-hover`.
6. **Do's and don'ts:** niente gradienti, i colori di stato sono riservati, un errore si comunica con testo più colore e mai col colore da solo.

Otto regole ben scelte prevengono più output sbagliato che raddoppiare la sezione dei token. Scriverle costa fatica, perché richiede di sapere cosa il sistema non farebbe mai, e quasi nessuno se l'è mai dovuto chiedere.

**Il responsive resta fuori dai token:** qui la spec ha un vuoto che conviene conoscere. La sezione Layout esiste, ma i suoi unici token sono quelli di spaziatura, e le parole «breakpoint» e «responsive» nella specifica non compaiono mai. Il comportamento adattivo va quindi descritto a parole, ed è un bene, perché all'agente serve sapere come cambia la logica più di quanto gli servano le larghezze: a che punto due colonne diventano una, dove finisce la navigazione laterale quando lo schermo si stringe, quali elementi spariscono e quali restano, come cambiano i margini di pagina, se una finestra di dialogo diventa un pannello a tutto schermo.

**Un file alla root non viene letto da solo:** è la svista che vanifica tutto il lavoro fatto sopra. Creare `DESIGN.md` nella cartella del progetto non basta a farlo entrare nel contesto. Ogni strumento decide per conto suo cosa caricare, e Claude Code si aspetta di trovare le istruzioni di progetto in `CLAUDE.md`, quindi il collegamento va scritto a mano.

```
# CLAUDE.md
Segui il design system e le regole di interfaccia in @DESIGN.md.

Prima di creare o modificare interfaccia:
1. Leggi l'implementazione del componente che stai toccando.
2. Riusa i componenti e i token che esistono già.
3. Controlla le regole responsive e di accessibilità in DESIGN.md.
4. Segnala dove DESIGN.md e il codice in produzione non coincidono.
```

Il comando `/context` elenca i file di memoria e di istruzioni che si sono caricati davvero nella sessione, e conviene lanciarlo la prima volta che colleghi un file nuovo.

**Il livello che l'AI si inventa:** il caso più istruttivo è un esperimento raccontato su UX Collective. L'autrice dà a Claude i file Figma di un prodotto reale, UI e libreria di token, più una skill costruita apposta, e gli chiede di scrivere il `DESIGN.md`. Claude estrae tutto con precisione, dalla palette con hex e varianti di opacità alla scala tipografica completa coi valori di tracking, e poi spaziature, raggi, ombre, anatomia dei componenti. Poi lei gli chiede se ha usato la skill. Risponde di averla usata come guida di formattazione, saltando l'intervista iniziale, cioè quello che rende il file buono. **I token erano accurati, il livello di ragionamento era inventato**, con principi di design scritti senza che nessuno glieli avesse detti e vincoli dedotti dai pattern visivi osservati. È la stessa asimmetria di «Human-in-the-loop», dove il **cosa** l'AI lo estrae da un file Figma meglio di te e il **perché** no. E un livello lasciato vuoto non resta vuoto, si riempie di inferenza plausibile.

**Come resta onesto:** il file vive alla root del repo accanto a `README.md`, così ogni modifica al design ha un autore e un diff e passa da una revisione come qualunque altro cambiamento. Poi c'è l'abitudine che non richiede tooling. Punta un assistente al `DESIGN.md` e al sito live e chiedigli dove non coincidono. A volte è sbagliato il sito, a volte il file è vecchio. Una fonte di verità che nessuno riconcilia diventa la documentazione di un prodotto che non esiste più.

**Da dove partire:** non serve un repo. Si apre una chat, si passa un `DESIGN.md` di esempio e si chiede all'assistente di intervistarti sul brand (i colori centrali e cosa deve segnalare ciascuno, due o tre livelli di tipo, il raggio che ti sembra giusto), poi di scrivere il tuo nello stesso formato. Quello è già un draft. Da lì il file cresce per diagnosi, perché ogni punto in cui l'agente tira a indovinare indica il prossimo token da definire.

### UX.md {badge:In lavorazione}

I file di contesto visti finora descrivono il prodotto: token, componenti, comandi, decisioni tecniche. Nessuno dice per chi è fatto. Così l'AI progetta per un utente medio, perché è l'unico che conosce: schermate corrette e generiche, che nessuna ricerca ha mai toccato. NN/g usa l'immagine della casa progettata senza sapere chi ci abiterà.

**Cosa includere all'interno:** cinque famiglie di contenuto, che NN/g raggruppa sotto il nome di lavoro `UX.md`.

- **Sintesi di ricerca:** i finding principali scritti come vincoli su cui l'agente può ragionare. «Gli utenti abbandonano il setup se devono cercare dati che non hanno sottomano» è usabile; «il 62% dei partecipanti ha mostrato frustrazione nella fase 2» non lo è.
- **Standard di interazione:** come si comporta il prodotto. Quando chiedere conferma e quando invece offrire un undo, come sono formulati gli errori, cosa è reversibile e cosa no.
- **Glossario:** le parole che il prodotto e i suoi esperti di dominio usano, con le definizioni. Serve a impedire all'AI di inventare sinonimi, e se in azienda si dice «pratica» e non «richiesta», l'interfaccia deve dire pratica.
- **Modello dell'utente:** cosa la ricerca ha stabilito sulle persone che lo usano, dalle competenze agli obiettivi ai punti di attrito ricorrenti.
- **Modello del mondo:** le condizioni in cui lavorano. Interruzioni continue, un turno di notte, uno schermo condiviso con un collega, un vincolo normativo che non si può aggirare.

Le ultime due sono quelle che cambiano di più l'output, e anche le più difficili da recuperare a posteriori: vivono nella testa di chi ha condotto le interviste.

**Come gestirlo:** su un progetto piccolo basta un file alla root. Quando cresce, `UX.md` diventa l'indice di una cartella `ux/` con un file per famiglia, e vale la stessa regola di «`CLAUDE.md` come indice, non contenitore», dove l'agente apre il glossario quando scrive copy e gli standard di interazione quando disegna un flusso, senza caricare tutto a ogni sessione. Vale anche l'avvertenza di «Il contesto è una risorsa finita», perché un `UX.md` che diventa l'archivio della ricerca peggiora le risposte invece di migliorarle. Va inclusa la sintesi, non le citazioni integrali delle interviste. E va curato di continuo, perché ogni studio nuovo lo aggiorna, e non c'è un momento in cui puoi considerarlo finito.

**Da dove partire:** NN/g presenta `UX.md` come ipotesi, non come formato con una spec al pari di `DESIGN.md`, e lascia aperte le domande che contano, a partire da quali artefatti di ricerca spostano l'output, quando servono i dati grezzi, come si misura l'effetto, se esista una soglia oltre la quale il contesto è troppo. Il consiglio pratico è di non aspettare le risposte. Prendi tre o quattro finding che ti tocca rispiegare all'inizio di ogni progetto, scrivili in markdown, guarda come cambia quello che l'AI produce. Poi taglia quello che non ha spostato niente.

### Organizzare il progetto

Claude lavora meglio dentro una **cartella di progetto** che dentro un prompt: gli dai la fonte di verità prima di chiedergli di generare qualcosa. Una struttura completa e orientata al design raggruppa i file per funzione:

```
product-design/
# CONTEXT — ciò che Claude carica
├── CLAUDE.md             ← brief di progetto, letto a ogni sessione
├── CLAUDE.local.md       ← preferenze personali (gitignored)
├── DESIGN.md             ← identità visiva, regole di design, direzione UI
├── UX.md                 ← utenti, contesto d'uso, standard di interazione
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
├── ux/                          ← se UX.md cresce: un file per famiglia
│   ├── research-synthesis.md    ← finding scritti come vincoli
│   ├── interaction-standards.md ← conferme, undo, errori
│   ├── glossary.md              ← le parole del dominio
│   ├── user-models.md           ← competenze, obiettivi, attriti
│   └── world-models.md          ← condizioni d'uso e vincoli
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
├── UX.md
└── .mcp.json
```

Le sezioni da scrivere dentro il `CLAUDE.md` sono elencate in «CLAUDE.md».

Come si scrivono i file sotto `design/` perché un agente li sappia leggere è il tema di «Rendere il design system leggibile dall'AI».

**Cinque buone pratiche di organizzazione:**

1. **`CLAUDE.md` alla root:** letto automaticamente all'avvio; è la guida di onboarding al progetto per l'AI.
2. **Spezzare i `CLAUDE.md` grandi:** oltre le duecento righe si divide in file importati con `@path/to/import.md`, per esempio `@claude/architecture.md` o `@claude/ui_guidelines.md`. Il perché e il come stanno in «CLAUDE.md».
3. **Cartella `/docs`:** Claude legge benissimo il markdown; ci metti roadmap, requisiti, API, decisioni, così puoi dirgli "leggi `docs/api.md` e implementa…".
4. **Cartella `/workflows`:** i workflow ripetibili come file dedicati (`build-new-component.md`, `code-refactoring.md`, `write-auto-tests.md`, `migrate-db.md`). Un workflow può richiamarne un altro (es. dopo aver creato un componente, invoca `@workflows/write-auto-tests.md`).
5. **Cartella `/tools`:** gli script di servizio che Claude scrive (`migrate-db.py`, `seed-data.py`, `export-data.py`). Nome `/tools` (non `/scripts`) per non confonderli con gli script di front/back-end del progetto.

Scorciatoia: il comando **`/init`** esplora un codebase esistente e genera una prima bozza di `CLAUDE.md`, da rifinire.

## Collegare Claude e Figma

Come si mettono in comunicazione i due strumenti, quale ponte scegliere fra i tre disponibili e cosa si può chiedere all'agente una volta collegato.

### Dividere il lavoro tra Claude Desktop e Claude Code

Due ambienti con vincoli diversi: uno vede i tuoi file, l'altro no. È quella differenza a decidere cosa conviene fare dove.

- **Claude in chat (web o app desktop):** ambiente conversazionale, con un set di skill fisso e senza accesso al filesystem locale. È il posto giusto per la parte a monte, dove stanno ricerca e sintesi delle fonti, ragionamento strategico, stesura di brief, spec e documenti in markdown, esplorazione di opzioni. Ottimo per produrre l'artefatto testuale che poi guiderà la costruzione (un `DESIGN.md`, un PRD, la sintesi di una knowledge base). Non fa girare skill di coding (es. `frontend-slides`), non apre un progetto locale, non si collega agli MCP locali.
- **Claude Code (Terminal o dentro VS Code):** vive in una **cartella di progetto locale** e ha accesso a file, git, MCP e alle skill installate sulla tua macchina. È il posto giusto per la parte a valle, dove si costruisce l'artefatto (deck HTML, prototipo, componenti), si collega Figma via MCP nativo o via bridge, si eseguono workflow e skill locali, si fa commit e deploy.

**Pattern operativo (lo schema che stiamo usando su un progetto reale):**

1. **In chat:** raccogli e verifica le fonti, ragiona sull'impostazione, produci la sintesi o lo spec in markdown (es. `KB-…-sintesi.md`, oppure un `DESIGN.md` con i token).
2. Sposta il markdown in una cartella locale dedicata (es. `~/Projects/<progetto>/`), anche solo una sottocartella del repo.
3. Apri quella cartella in VS Code (editor + terminale integrato + preview HTML) e lancia `claude`; da Terminal l'equivalente è `cd ~/Projects/<progetto> && claude`.
4. **In Claude Code:** invoca le skill locali (es. `/frontend-slides` per un deck, le skill Figma per il canvas), collega solo gli MCP necessari e costruisci.
5. Sempre in Claude Code: commit atomici e deploy (vedi «Deploy del prototipo»).

Regola pratica: **la parte di pensiero (ricerca, framing, decisioni) sta bene in chat; la parte di costruzione (file, MCP, build, deploy) sta in Claude Code.** Lo spec o il `DESIGN.md` scritto in chat è il ponte tra i due ambienti, che passi a Claude Code come fonte di verità.

Scrivere la soluzione è a sua volta contesto. Messo per iscritto, lo spec di un flusso diventa l'ancora da cui l'AI ricava output diversi: prototipo hi-fi, journey map, piano d'implementazione. Sui flussi complessi tiene anche a bada le allucinazioni, perché i passaggi l'agente li ha davanti invece di ricostruirseli a ogni richiesta.

### Tre modi di collegare Figma a confronto

Tre modi di collegare l'AI a Figma, con obiettivi diversi.

- **MCP nativo di Figma (Dev Mode MCP server):** prima parte, ufficiale. Ne esistono due versioni, la remota (endpoint ospitato da Figma, non serve l'app desktop, funzioni più ampie, consigliata) e locale desktop (integrata nell'app, `http://127.0.0.1:3845/mcp`, per casi org/enterprise). **Cosa fa:** legge il design context del layer selezionato, genera codice dal frame selezionato, si aggancia a Code Connect (la mappatura che lega un componente Figma al componente di codice reale, così l'agente usa quello vero invece di ricostruirne uno simile) e, con le skill Figma installate, scrive sul canvas e cattura la UI live ("code to canvas"). **Come lo fa:** dati strutturati via protocollo MCP; input per selezione (desktop) o link al nodo (node-id). **Da sapere:** in beta, diventerà a pagamento a consumo, con rate limit per piano; client supportati solo quelli del Figma MCP Catalog (VS Code, Cursor, Claude Code).
- **Figma Desktop Bridge (`southleft/figma-console-mcp`):** terze parti, "il tuo design system come API". È un MCP server con un plugin bridge che importi tra i plugin di sviluppo di Figma Desktop; comunica via WebSocket (porte 9223–9232) e sblocca il Plugin API **senza piano Enterprise**. **Cosa fa in più del nativo:** lettura/scrittura completa di variabili e descrizioni componenti, creazione/modifica di design, cattura in tempo reale di **console log e network** (debug di plugin e prototipi), export token in ~10 formati (DTCG, CSS, Tailwind, SCSS, Style Dictionary, Tokens Studio…), diff tra versioni, scan di accessibilità WCAG. **Come lo fa:** doppio contesto del plugin (UI con rete, worker con Figma API) più un watchdog che si riconnette da solo; ~107 tool in locale, funziona con Claude Code, Claude Desktop e Cursor insieme, con anche una modalità cloud per i client web. **Da sapere:** il bridge WebSocket locale non è autenticato (problema segnalato), e qualunque processo locale può connettersi e potenzialmente iniettare testo nei log; valutalo su macchine condivise. **Installazione (due parti):** 1) registra il server MCP nel client, in Claude Code con `claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN=figd_IL_TUO_TOKEN -e ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest` (o l'equivalente in `.mcp.json`); 2) in Figma Desktop importa il plugin (Plugins → Development → Import plugin from manifest → `figma-desktop-bridge/manifest.json`, oppure il percorso stabile `~/.figma-console-mcp/plugin/manifest.json`) e avvialo fino allo stato «Desktop Bridge active». Il token è un Personal Access Token (Figma → Settings → Security); verifica la connessione chiedendo `figma_get_status`.
- **DesignAgent (Sherizan, Figma Community):** terze parti, bridge **bidirezionale** orientato al design-to-code. Un plugin dalla Community di Figma più un plugin Claude Code (install da marketplace); ~30 tool per leggere la selezione e agire sul canvas (crea/edita frame, testo, forme, ricolora, ri-layouta). Gira in locale e gratuito, con heartbeat e la disciplina di scope stretto più auto-verifica contro `DESIGN.md` (vedi «Setup e loop con Figma MCP»). Rispetto al Desktop Bridge di southleft è più snello e orientato al "costruisci ed edita", meno a debug/console ed export multi-formato; si installa dalla Community (plugin pubblicato) più marketplace, non importando un manifest di sviluppo.

**Come scegliere:**

| Obiettivo | Strumento |
|---|---|
| Passaggio da design a codice ufficiale, Code Connect, code-to-canvas fedele, senza ricorrere a plugin di terze parti | MCP nativo di Figma |
| Variabili o componenti completi senza il piano Enterprise, export token multi-formato, debug console/network | Figma Desktop Bridge (southleft) |
| Loop bidirezionale rapido per ricostruire e modificare layout sul canvas da Claude Code, locale e gratuito | DesignAgent |

Si possono combinare (es. MCP nativo per il boilerplate, Desktop Bridge per estrarre i valori esatti dei token). Montando più MCP Figma insieme, attenzione all'attribuzione delle risposte e all'occupazione del contesto (vedi «Setup e loop con Figma MCP»).

### Setup e loop con Figma MCP

L'MCP (Model Context Protocol) di Figma consente a Claude di leggere il design context (gerarchia, layout, variabili, componenti, token) e, con le skill giuste, di scrivere sul canvas. L'MCP **nativo** di Figma ha due versioni: quella **remota** (endpoint ospitato da Figma, non serve l'app desktop, set di funzioni più ampio, consigliata) e quella **locale desktop** (integrata nell'app: passa in Dev Mode e abilita il server, che gira su `http://127.0.0.1:3845/mcp`). Checklist per una sessione in locale: apri Figma Desktop aggiornato all'ultima versione → apri un file Design (l'MCP non compare in FigJam) → Dev Mode (Shift+D) → Enable MCP server → collega il client (VS Code, Cursor, Claude Code) all'indirizzo del server. Verifica rapida: nel client chiedi di elencare i tool MCP, o digita `#get_design_context`. Nota: è in beta e diventerà una funzione a pagamento a consumo; i rate limit dipendono dal piano. (I bridge di terze parti che usano un plugin "Desktop Bridge" con stato "MCP ready" sono un'altra cosa: vedi «Tre modi di collegare Figma a confronto».)

**Il loop completo:** Design in Figma → Extract con MCP → Build → Deploy → Test → Iterate. La condizione critica lato Figma è il **naming e l'organizzazione corretti** dei componenti, che sono la struttura da cui l'AI legge, più Auto Layout per la responsività.

**Collega solo gli MCP che ti servono:** ogni MCP attivo immette dati nella finestra di contesto, e il comando **`/context`** mostra l'occupazione e, con molti tool attivi, gli MCP possono arrivare a occupare una fetta enorme del contesto (~45% in casi reali). Disconnetti i tool rumorosi quando non servono (incluso Figma, che inietta molto contesto) quando stai lavorando su documentazione estesa o con più tool di progetto sovrapposti. Come regola pratica, **meno rumore nel contesto = output migliore** (si lega a «Il contesto è una risorsa finita»).

**Bridge bidirezionale, Claude "con le mani" sul canvas:** oltre a leggere Figma, Claude può agire sul file aperto se si usa un bridge a due vie. Un esempio è **DesignAgent** (tool di terze parti, distinto dall'MCP nativo di Figma; confronto completo in «Tre modi di collegare Figma a confronto»), ed è un plugin Figma più un plugin Claude Code che aprono un socket locale ed espongono ~30 tool sul file live, con cui sposta layer, sistema le spaziature, sostituisce un hex con il token corretto, crea frame/testo/forme, ricolora e ri-layouta. Si installa da marketplace (`/plugin marketplace add sherizan/designagent` poi `/plugin install designagent@designagent`) e porta con sé la skill `design-to-code` e l'MCP server `designagent`; gira in locale (nessun token, nessun dato esce dalla macchina) con un heartbeat che segnala se la connessione è davvero viva e si riconnette da sola. Due regole rendono affidabili questi flussi, lo **scope stretto** (un frame o un flusso per volta, perché l'agente è preciso sul piccolo e va alla deriva se lo punti sull'intero file) e l'**auto-verifica** (build → screenshot → confronto con `DESIGN.md` → fix).

**Prompt pack operativo (esempio, con bridge bidirezionale e `DESIGN.md` come fonte di verità):**
- Estrai i token dalla selezione (colori, type, spaziatura, raggio) e scrivili in `DESIGN.md`, con i valori reali, senza arrotondare o inventare.
- Guarda il logo selezionato: crea la foundation del design system e crea/aggiorna `DESIGN.md`.
- Usando i token in `DESIGN.md`, costruisci un primo set di componenti su un nuovo frame (bottoni primario/secondario/ghost, slider, toggle, form con label e stato d'errore). Solo on-system.
- Usando i token in `DESIGN.md`, progetta una landing page marketing.
- Leggi `voice.md` e scrivi la copy della schermata selezionata con quel tono, applicandola ai nodi di testo; mostrami ogni modifica prima di applicarla.
- Crea template di asset social (LinkedIn/Substack) usando il branding in `DESIGN.md`; mantieni ogni valore on-system.

### Le skill Figma per Claude Code

Una skill Figma è un blocco di istruzioni già scritte che insegna all'agente come portare a termine un compito ricorrente: creare un file, costruire una schermata dal design system, generare codice da un design. Senza, quei passaggi vanno descritti a mano a ogni giro, e il risultato cambia a seconda di come li hai descritti quella volta.

Il catalogo pubblico ne conta una ventina contando le varianti. Figma ne documenta nove nell'help center, che sono il set stabile, e presenta `figma-generate-library` e `figma-generate-design` come skill di esempio: workflow lunghi, pensati per essere letti e adattati più che usati così come sono.

**Scrivere sul canvas:**

- `figma-use`: crea e modifica frame, componenti, variabili e layout su un file Design. Produce contenuto vero e editabile, non un'immagine.
- `figma-use-figjam`: sticky, sezioni, connettori, forme, tabelle e blocchi di codice su una board FigJam.
- `figma-use-slides`: slide, sezioni, temi e speaker notes su un deck Figma Slides.
- `figma-use-motion`: aggiunge alle scritture sul canvas il contesto di motion e animazione.

**Da Figma al codice:**

- `figma-design-to-code`: prerequisito da caricare prima di chiedere il contesto di un design. Imposta il modo di implementarlo, e saltarla è il motivo per cui l'agente ricostruisce a occhio quello che poteva leggere.
- `figma-implement-design`: traduce un nodo in codice di produzione. La sequenza è contesto del design, screenshot di riferimento, ispezione del design system di progetto, mapping dei valori Figma sui token, generazione, validazione contro lo screenshot.
- `figma-implement-motion`: porta in codice le animazioni definite in Figma.
- `figma-swiftui`: traduce nei due sensi fra Figma e SwiftUI, riconoscendo i pattern iOS (`NavigationStack`, `TabView`, SF Symbols).

**Dal codice a Figma:**

- `figma-generate-design`: genera schermate intere usando componenti, variabili e stili reali del design system collegato.
- `figma-generate-library`: costruisce o aggiorna una libreria a partire da un codebase, in fasi: ricognizione, fondamenta, struttura del file, componenti, controllo finale.
- `figma-generate-diagram`: trasforma la descrizione di un sistema, di un processo o di un flusso in un diagramma FigJam editabile (flowchart, sequence, ER, stati, Gantt).
- `generate-project-plan`: da un PRD più il contesto del codebase costruisce una board FigJam di piano di progetto.

**Ponte con il codice e regole di casa:**

- `figma-code-connect`: collega i componenti Figma pubblicati alla loro implementazione, così da Dev Mode si arriva al codice vero. Il catalogo espone anche la variante `figma-code-connect-components`, che fa il mapping componente per componente.
- `figma-create-design-system-rules`: analizza il codebase e scrive il file di regole (`AGENTS.md` o `CLAUDE.md`) con le convenzioni di organizzazione, styling e token da rispettare quando traduce un design.

**Utilità:**

- `figma-create-new-file`: crea un file vuoto nelle bozze, Design o FigJam, come punto di partenza per gli altri workflow. Si invoca con `/figma-create-new-file [editorType] [fileName]`.
- `video-interaction-mapper`: analizza la registrazione di uno schermo e ne mappa in Figma gli stati di interazione.

**Come si installano e attivano:** le skill non si installano una ad una, in quanto sono incluse nel **plugin Figma per il client**, che porta con sé sia le impostazioni dell'MCP server sia le skill. In Claude Code il flusso comincia dal comando d'installazione del plugin Figma (dallo snippet fornito da Figma), poi riavvia Claude Code, apri `/plugin`, vai alla scheda Installed, seleziona il server `figma` e completa l'autenticazione (si apre il browser per l'OAuth); da lì il server risulta connesso e le skill sono disponibili. In alternativa, per il solo server desktop, abilitalo in Dev Mode e aggiungilo con `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`. Su un client senza plugin le skill si scaricano a mano dal repository [`figma/mcp-server-guide`](https://github.com/figma/mcp-server-guide) e si fanno collocare all'agente nella cartella giusta. Figma tiene anche una raccolta di skill della comunità in [`figma/community-resources`](https://github.com/figma/community-resources/tree/main/agent_skills), che è cosa diversa dal set ufficiale e va valutata voce per voce.

**Requisiti e limiti:** le skill che scrivono sul canvas vogliono l'URL del file e il permesso di modifica, più un Full seat o un Dev seat su un piano a pagamento; i Dev seat, fuori dalle bozze, leggono soltanto. `figma-code-connect` chiede di più, cioè componenti pubblicati in una libreria di team e un piano Organization o Enterprise. Durante la beta è tutto gratuito, e Figma dichiara che diventerà a pagamento a consumo. Chi ci costruisce sopra un flusso di squadra metta in conto quel passaggio.

**Remoto o desktop:** il **server remoto** è quello consigliato e con il set di funzioni più ampio (comprese scrittura sul canvas e code-to-canvas su client selezionati), ed è la scelta di default, quella a cui sono agganciate le skill. Il **server desktop** (locale, `127.0.0.1:3845`, abilitato in Dev Mode) aggiunge l'input per selezione ma è pensato per casi org/enterprise. In pratica parti dal remoto e passa al desktop solo se un caso specifico lo richiede.

### Comandi e subagent per il design

**Comandi e pratiche utili in Claude Code:**

- **Plan mode (Shift+Tab / `/plan`):** Claude legge, ragiona e propone un piano senza toccare i file finché non approvi. Particolarmente utile prima di richieste complesse e prima di un Figma→codice via MCP (spesso migliora il risultato anche senza modifiche al piano).
- **`/init`:** esplora il codebase e scrive un `CLAUDE.md` (briefing letto a ogni sessione). Tienilo lean; aggiorna dopo molte modifiche.
- **`/skills`:** elenca le skill disponibili sul tuo computer (utile quando diventano tante).
- **`/help`:** cheat sheet dei comandi.
- **`/rewind` (o doppio Esc):** torna a un checkpoint precedente (conversazione, codice o entrambi).
- **Ctrl+V:** incolla immagini/screenshot come riferimento (su Mac è Ctrl+V, non Cmd+V).

**Slash command custom per workflow ripetibili:** ripetere a voce/per iscritto gli stessi prompt porta a drift di qualità e rende impossibile standardizzare le operazioni per il team. Conviene creare comandi dedicati come `/page-review`, `/component-review`, `/prd-to-ui`, `/flow-map`, `/design-system-check`, e ognuno è un file markdown in `.claude/commands/` (es. `.claude/commands/page-review.md` = "Rivedi la pagina e segnala gli elementi che impattano usabilità e accessibilità, con focus sulle best practice UX").

**Subagent specializzati per il design:** per automatizzare le richieste ricorrenti tenendo pulita la conversazione principale, si creano subagent (file markdown in `.claude/agents/`) che lavorano in autonomia, senza tempestare l'utente di domande. Fra i profili utili in product design ci sono **UX Reviewer**, **Design System Guardian**, **Frontend Implementer**, **Accessibility Reviewer**, **Interaction Designer**, **QA Tester**. Una descrizione di esempio per lo UX Reviewer suona **Role** = senior UX reviewer; **Focus** = user flow, friction point, information architecture, usabilità dei form, error prevention, empty state; **Do not** = riscrivere codice se non richiesto, suggerire decorazione senza motivazione UX. (Questo tema si espande in una futura sezione dedicata all'architettura ad agenti e sub-agenti.)

**Claude Code dentro l'IDE + Plan mode:** usare Claude Code dentro VS Code (o altro IDE) evita il continuo salto tra ambiente di codice e app, e l'integrazione offre inline diff, plan review, file mention e shortcut. Per il lavoro di design non chiedere di costruire subito. Passa in **Plan mode** e segui il flusso analizza l'esperienza attuale → chiedi un piano UX → rivedi le modifiche proposte → approva → check finale design-system + accessibilità. Così Claude non si butta sul codice prima di aver capito il problema di prodotto.

**Pattern di affidabilità per le lavorazioni lunghe:** **agente esecutore con contesto fresco** per ogni fase (sessione principale pulita, nessun degrado), **commit atomici** a ogni passaggio (history revertibile, `git bisect` per isolare quello che ha rotto qualcosa), **agente verificatore** che a fine esecuzione controlla il codebase contro gli obiettivi di fase.

## Il design system per l'AI

Un design system nato per essere letto da una persona non basta a un agente. Qui c'è cosa aggiungere perché lo capisca, come impacchettarlo in una skill e come far rispettare le regole invece di sperarci.

### Rendere il design system leggibile dall'AI

Un agente che vede solo hex e valori grezzi, senza riferimenti ai token né significato semantico, scrive componenti con gli stili incollati dentro. Quei componenti smettono di essere agganciati alla fonte di verità: al primo cambio di palette restano indietro, e i contrasti che qualcuno aveva verificato si perdono per strada.

C'è un secondo modo di sbagliare, più insidioso perché il risultato sembra a posto. Generi il frontend dai file Figma con l'MCP e in pochi minuti hai codice funzionante. Poi lo guardi da vicino. Una card con lo stato hover sbagliato. Un colore usato per un significato che non era il suo. Spaziature fuori dalle regole, e la gerarchia fra azione primaria e secondaria applicata a intermittenza. Niente di brutto, semplicemente non è il tuo sistema. Generare l'interfaccia era la parte facile; mancava il contesto per costruirla come la costruisce la tua squadra.

**I token risolvono lo stile e si fermano lì:** un `tokens.json` consegna colori, tipografia, spaziature e raggi, quindi copre l'aspetto. Resta fuori tutto il resto. Non dice che il wizard è fatto di top bar, stepper, header, area di contenuto e barra di azioni in fondo, non dice quali azioni stanno dove, e nemmeno quando un utente può passare allo step successivo. Quella parte del sistema oggi vive nelle librerie Figma e nelle pagine di documentazione, cioè in posti costruiti perché una persona li cerchi e li interpreti.

**I tre strati, dal disegno al prodotto:** il sistema si divide in authoring, specification e delivery. Il primo strato è dove il sistema si disegna, il secondo è la stessa conoscenza scritta in una forma che un agente può leggere, il terzo è ciò che finisce nel prodotto. È la struttura che tiene insieme il resto di questa sezione.

<div class="flow3">
<div>
<p class="flow3-step">Authoring</p>
<p class="flow3-where">Figma</p>
<ul><li>foundations</li><li>components</li><li>patterns</li><li>templates</li></ul>
<p class="flow3-note">Come appare e com'è composto</p>
</div>
<div>
<p class="flow3-step">Specification</p>
<p class="flow3-where">Repo di progetto</p>
<ul><li>tokens.json</li><li>DESIGN.md</li><li>i tre registri</li><li>una spec per oggetto</li></ul>
<p class="flow3-note">Cosa fare e come si comporta</p>
</div>
<div>
<p class="flow3-step">Delivery</p>
<p class="flow3-where">Prodotto e codice</p>
<ul><li>pacchetti versionati</li><li>token, icone, font</li><li>componenti e pattern</li><li>pull request</li></ul>
<p class="flow3-note">Cosa si consegna e chi lo approva</p>
</div>
</div>

**Authoring, il file Figma:** resta il posto dove il sistema visivo si disegna e si mantiene, organizzato in quattro famiglie che salgono per grado di composizione. Le **foundations** sono colori, tipografia, spazi e raggi; i **components** sono i mattoni singoli; i **patterns** dicono come i componenti lavorano insieme; i **templates** danno la struttura di partenza per pagine e flussi ricorrenti. Un wizard, per esempio, è un template, e in Figma se ne definiscono layout, pattern, componenti e stati visivi. Quello che Figma non sa dire bene sono le regole di struttura e di comportamento, ed è esattamente ciò che serve a un agente.

**Specification, lo strato dei token:** i token sono il primo pezzo di sistema da mettere per iscritto, e conviene organizzarli su tre tier.

- **Tier 1, primitive:** valori grezzi (colori, unità di spazio, dimensioni type). Raramente referenziati direttamente.
- **Tier 2, semantic:** token che mappano le primitive a un significato (`--color-feedback-error`, `--spacing-content-gap`, `--text-heading-large`). Qui vive l'intento, ed è il livello su cui l'AI ragiona.
- **Tier 3, component:** pattern pre-composti che combinano token semantici, come una card con spaziature, colori, type e ombre già corretti.

**Nomina per ruolo, non per aspetto:** è la regola che rende utile il Tier 2, ed è la stessa già vista in «DESIGN.md». Vale anche per i componenti, dove conviene prendere in prestito il vocabolario che ogni strumento già conosce (button, input, card, badge, tabs) invece di inventare un dizionario privato che l'agente deve indovinare. C'è anche un effetto collaterale utile, perché costringersi a dare un ruolo a ogni token vale come audit della palette, e fa emergere i colori che non usa nessuno, i doppioni che servono allo stesso scopo e quelli usati a sproposito.

**Specification, i registri e le spec:** sopra i token stanno i file che dicono cosa costruire. Il `DESIGN.md` porta le regole globali e le convenzioni, come già visto nella sezione «`DESIGN.md`». Sotto di lui tre registri, `components.md`, `patterns.md` e `templates.md`, danno all'agente la mappa di cosa esiste e dove trovarne la specifica. Le specifiche vere stanno in un file per oggetto, e l'estensione ne dichiara la famiglia, da `button.component.md` a `dialog.pattern.md` fino a `wizard.template.md`. Un file di template non ridefinisce il Button o lo Stepper, li referenzia e descrive come si combinano per fare quell'esperienza.

```
design-system/
├── tokens.json                 ← le fondamenta visive
├── DESIGN.md                   ← regole globali e convenzioni
│
├── components.md               ← i registri: cosa esiste
├── patterns.md                    e dove trovarne la spec
├── templates.md
│
├── components/
│   ├── button.component.md
│   └── stepper.component.md
├── patterns/
│   ├── bottom-action-bar.pattern.md
│   └── dialog.pattern.md
└── templates/
    └── wizard.template.md      ← referenzia i pezzi che usa,
                                   non li ridefinisce
```

Ecco come può apparire `wizard.template.md`.

```
# Wizard
## Purpose
Guida l'utente in un compito complesso spezzandolo in una sequenza
di step gestibili.
## Dependencies
### Patterns
- [Top Bar](../patterns/top-bar.pattern.md)
- [Header](../patterns/header.pattern.md)
- [Bottom Action Bar](../patterns/bottom-action-bar.pattern.md)
- [Dialog](../patterns/dialog.pattern.md)
### Components
- [Stepper](../components/stepper.component.md)
- [Status label](../components/status-label.component.md)
- [Button](../components/button.component.md)
## Behaviour
- L'utente avanza fra gli step in sequenza.
- Può tornare su uno step completato.
- Non può saltare su uno step futuro non completato.
- I dati inseriti si conservano passando da uno step all'altro.
- Lo Stepper segnala lo step corrente e quelli completati.
## Actions
- Exit usa Button / Tertiary e sta nella Top Bar.
- Back usa Button / Secondary e sta nella Bottom Action Bar.
- Next usa Button / Primary e sta nella Bottom Action Bar.
- Back torna allo step precedente.
- Next valida lo step corrente prima di proseguire.
- Exit chiede conferma con un dialog.
## Accessibility
- Lo step corrente è comunicato in modo programmatico.
- Gli errori di validazione sono associati al campo che li genera.
- Tutte le azioni sono raggiungibili da tastiera.
```

Le cinque intestazioni di quel file sono un buon modello di partenza per qualunque spec. **Purpose** dice a cosa serve l'oggetto e quando sceglierlo, **Dependencies** elenca i pezzi che usa con il link alla loro specifica, **Behaviour** descrive come si comporta nel tempo, **Actions** assegna a ogni azione il suo componente e la sua posizione, **Accessibility** fissa i requisiti che non si negoziano.

**Documenta anche gli stati:** vale qui la stessa regola vista in «DESIGN.md», cioè che accanto al comportamento a riposo vanno scritti hover, active, disabled, loading e focus. In una spec di componente la dimenticanza pesa di più, perché è il file da cui l'agente copia.

**Perché tanti file invece di uno solo:** la tentazione è mettere tutto dentro un `DESIGN.md` enorme, e sarebbe la scelta sbagliata per due motivi. Il primo riguarda la manutenzione, perché un file per oggetto si aggiorna da sé e si assegna a chi possiede quell'oggetto. Il secondo è il costo in contesto. Con i registri l'agente recupera solo il ramo che gli serve invece di caricare l'intero design system a ogni richiesta, ed è la stessa economia descritta in «Il contesto è una risorsa finita». Il risultato è un grafo di regole con un punto d'ingresso e rimandi espliciti da seguire quando servono, al posto di un manuale da leggere in blocco.

**Delivery, dove il sistema tocca il prodotto:** oggi la strada normale sono i pacchetti versionati che gli sviluppatori installano, con token, icone, font, componenti e pattern. Un agente che ha davanti sia le specifiche sia il codice del prodotto può fare un passo in più. Trova i punti in cui l'applicazione si discosta dal sistema, propone la sostituzione con i componenti che esistono già, aiuta a migrare un prodotto vecchio verso lo standard corrente. Quel lavoro deve però arrivare sotto forma di pull request, con revisione, test e approvazione in mano a una persona. È lo stesso movimento dal prodotto verso il file del doppio controllo descritto in «Enforcement del design system».

**Da dove partire:** si comincia da 3–5 componenti. Per ognuno si genera una spec leggibile dall'agente, cioè markdown strutturato con la gerarchia dei componenti e i riferimenti ai token, anche con strumenti come [FigSpecs](https://www.figma.com/community/plugin/1612756059828219731/figspecs-ai-design-system-generator); la si porta nel flusso di lavoro reale, per esempio allegandola ai ticket; poi si misura quanti token l'agente azzecca prima e dopo. Da lì si allarga un gruppo di componenti alla volta.

Resta aperta la domanda su chi tiene aggiornate le specifiche. La risposta non può essere un designer che riscrive markdown a mano ogni volta che qualcosa cambia in Figma, perché è proprio il lavoro che il sistema doveva togliere di mezzo. Al momento il problema non ha una risposta, quindi va messo in conto e le spec vanno trattate come codice, versionate, revisionate e sincronizzate con una routine che qualcuno deve governare.

**Una risposta possibile** dà il compito a chi mantiene il design system, cioè a una figura che il team ha già. Il suo mestiere cambia. Dal ricostruire soluzioni che il sistema conosce già passa al tenere aggiornate le regole che gli agenti seguono, e a decidere quando la soluzione nota non basta. È un'ipotesi sul compito più che un metodo, e va presa per quella. Indica però dove sta il materiale, perché ogni organizzazione ha migliaia di decisioni di design che nessuno ha mai messo per iscritto, visto che c'era da costruire, e sono quelle che rendono un agente capace di progettare come progetta l'azienda.

Fantasy ha provato a portare l'idea fino in fondo. Caroline Hilman ha preso il design system di un progetto già consegnato, l'ha fatto estrarre in un file `.md` da un plugin Figma e l'ha passato a Claude Code senza aggiungere altro contesto. Due cose che ne ha ricavato servono anche a chi parte da qui. I nomi dei token non si ripensano per il modello, perché quelli chiari e coerenti che servono già a uno sviluppatore vanno bene così come sono. E il codice che ne esce lei lo chiama vibe-coded design, buono per esplorare e prototipare, corto sugli allineamenti e sulle spaziature, cioè proprio i dettagli che un designer non sbaglia.

L'estrazione le consegna però un file solo, che è la scelta opposta ai registri e alle spec separate di qui sopra. Il resto del racconto sta nell'articolo, dalla domanda su Slack che ha fatto partire tutto a dove passa oggi il confine fra l'agente e il designer.

<div class="linkcard-wrap">
<a href="https://fantasy.co/latest/figma-design-system-ai-components" class="linkcard">
<img class="linkcard-img" src="assets/fantasy-caroline-hilman.webp" width="360" height="255" alt="" loading="lazy">
<span class="linkcard-text"><span class="linkcard-title">Can AI Generate UI Components from a Figma Design System?</span><span class="linkcard-src">Fantasy</span></span>
<svg class="linkcard-ico" aria-hidden="true"><use href="#ico-arrow-upright"/></svg>
</a>
</div>

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
- Nel corpo, indicare chiaramente quando usarla (creare componenti Figma, costruire layout UI, generare componenti React/TS, scrivere documentazione).
- **Split in più skill** quando il `SKILL.md` supera ~500 righe o quando team diversi possiedono parti diverse del sistema (es. `design-tokens/`, `component-specs/`, `accessibility/`, `figma-workflow/`): Claude le combina automaticamente.
- Le skill **non si auto-sincronizzano** con Figma: vanno aggiornate quando il sistema cambia (in Claude Code le modifiche ai file sono colte subito; su Claude.ai va ricaricato lo ZIP).
- Il formato `SKILL.md` è portabile tra agenti, ma il modello di esecuzione no: lo stesso file è leggibile ovunque, non è detto che "giri" allo stesso modo ovunque.

**Skill di design ricorrenti** da costruire per un team di product design: PRD → User Flow, User Flow → UI Mockup, Design System Audit, UX Copy Review, Accessibility Review, Prototype Polish. Ogni skill è una cartella con `SKILL.md` più file di supporto (`checklist.md`, `examples.md`). Esempio di `SKILL.md` per design-system-audit:

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

### Enforcement del design system

Un sistema leggibile e impacchettato in una skill può ancora essere disatteso, e a separare uno strumento potente da uno di cui ti puoi fidare è quasi sempre un insieme di regole che nessuno ha messo per iscritto. Esempio di "catena di governance" (pattern delle 4 skill di `claude2figma`): il comportamento di default dell'AI è **inventare**; la regola lo cambia in **prima cerca** ("look up before invent"). La skill più essenziale è il **token binding/QA**: ogni proprietà visiva (colore, type, spaziatura, raggio) deve legarsi alla variabile/stile corrispondente (niente valori grezzi), e dopo la scrittura su Figma parte una QA che verifica i binding uno a uno (riporta `#5C6AC4` a `color/brand/primary`).

Lo stesso strumento gioca ruoli diversi secondo il contesto: in modalità "assistente di design" produce output che un umano può riprendere e modificare (DS enforcement attivo); in modalità "prototipo rapido" la velocità ha priorità sull'enforcement e i valori grezzi sono accettati.

**Il doppio controllo:** l'enforcement guarda in avanti, dal file verso quello che viene generato. Serve anche il controllo opposto, dal prodotto verso il file, perché il confronto periodico tra `DESIGN.md` e il sito live dice chi dei due è rimasto indietro, e il divario che emerge è il lavoro da fare (vedi la sezione «`DESIGN.md`»). Dove il formato ha un CLI, una parte si automatizza, dal lint dei riferimenti ai token ai contrasti WCAG e al diff tra versioni.

## Costruire e pubblicare un prototipo

Questo capitolo sviluppa il giro completo fra Claude e Figma, cioè come si porta su canvas un'interfaccia costruita in codice e come si rimandano indietro le modifiche fatte lì; le librerie di icone, componenti, motion, effetti e suono con cui si mette insieme quello che serve; e i due modi per pubblicare il risultato, GitHub Pages e Vercel, con il criterio per scegliere fra i due.

### Dal codice al canvas e ritorno

Per anni il passaggio è andato in una direzione sola: si disegnava in Figma e qualcuno traduceva in codice. Da febbraio 2026 Figma e Anthropic hanno aperto anche la direzione opposta, che si chiama **Code to Canvas**: prendi un'interfaccia che gira davvero nel browser, sul tuo computer o in produzione, e la porti su Figma come frame modificabile. Non uno screenshot incollato, ma layer veri, con auto layout e componenti, su cui si può lavorare.

**A cosa serve davvero:** costruire in codice fa convergere, perché lanci una build, clicchi un percorso e vedi uno stato per volta, con tutto il quadro in testa a una persona sola. Il canvas fa l'opposto, perché ci metti accanto tutte le schermate, ci lasci commenti e decidete insieme. Con gli agenti la strozzatura si è spostata: la domanda non è più come si costruisce, ma quale delle versioni si spedisce, e quella decisione si prende sul canvas.

**Il giro completo, in quattro passaggi.**

1. **Collega Claude a Figma** con l'MCP e installa il plugin ufficiale, `/plugin install figma@claude-plugins-official`, che è quello che abilita il doppio senso. La configurazione dell'MCP è in «Setup e loop con Figma MCP».
2. **Fatti scrivere l'interfaccia**, passando nel prompt anche il link al file Figma che userai dopo. Se quel file è ancora vuoto Claude segnala che non trova niente da leggere, e a questo punto l'errore si ignora.
3. **Chiedi di portarla su Figma**, con una richiesta diretta del tipo «trasferisci questo design in Figma». Dopo qualche istante il file si popola con la pagina come frame editabili.
4. **Modifica sul canvas e rimanda indietro.** Cambi un colore o rifai la spaziatura di una card in Figma, poi chiedi a Claude di applicare la modifica al codice. Ti mostra prima cosa intende cambiare, e tocca solo quello.

Quando la connessione a due vie è attiva, in cima all'anteprima della pagina compare un pannello con cui selezionare un elemento e mandarlo su Figma senza passare dal prompt.

**Cosa aspettarsi:** quello che arriva su Figma non è mai perfetto al primo colpo. Le spaziature vanno riviste e qualche elemento della pagina originale non compare. Si sistema con richieste di correzione successive, quindi mettilo in conto invece di considerarlo un fallimento del passaggio.

### Librerie per asset ed effetti

Cinque famiglie, dalle fondamenta al dettaglio. Non servono tutte: si prende quella che risolve il problema che hai davanti.

**Fondamenta e asset**

- [`lucide-icons/lucide`](https://github.com/lucide-icons/lucide): set di icone della comunità, fork di Feather, con pacchetti per React, Vue e Svelte oltre agli SVG statici; è quello con cui è fatta questa guida
- [`feathericons/feather`](https://github.com/feathericons/feather): icone open source
- [`google/material-design-icons`](https://github.com/google/material-design-icons): Material Symbols
- [`meodai/color-names`](https://github.com/meodai/color-names): nomi di colori curati
- [`evilmartians/oklch-picker`](https://github.com/evilmartians/oklch-picker): color picker OKLCH/LCH

**Librerie e kit di componenti UI**

- [`ibelick/prompt-kit`](https://github.com/ibelick/prompt-kit): componenti per interfacce AI
- [`ibelick/buttons`](https://github.com/ibelick/buttons): collezione bottoni Tailwind
- [`themesberg/flowbite`](https://github.com/themesberg/flowbite): libreria componenti su Tailwind
- [`imskyleen/animate-ui`](https://github.com/imskyleen/animate-ui): component distribution animata (React, TypeScript, Tailwind, Motion via Shadcn CLI): componenti pronti da installare, modificare e usare
- [`chartjs/Chart.js`](https://github.com/chartjs/Chart.js): grafici disegnati su `<canvas>`, otto tipi di base già pronti, responsive e animati; è la strada corta quando al prototipo serve un grafico credibile senza montare una pipeline di dataviz
- [`shadcn-ui/ui`](https://github.com/shadcn-ui/ui): componenti accessibili su Tailwind che si copiano dentro il progetto invece di installarli come dipendenza, quindi restano modificabili. Nel repo c'è anche la skill ufficiale `skills/shadcn`, che legge il `components.json` del progetto e la documentazione di ogni componente, così l'agente sceglie fra quelli che esistono invece di inventarne uno. È la base su cui poggiano `animate-ui` qui sopra e il registry di `marvkr/better-design`
- [`pedrobalsa/balsa-ui`](https://github.com/pedrobalsa/balsa-ui): un centinaio di componenti per Vue 3 e React 19 che si installano come sorgente dentro il progetto con lo stesso comando in entrambi i framework. Ogni componente porta con sé una specifica in JSON ricavata dal sorgente, così l'agente cerca per intento, analizza e installa quello che gli serve senza passare dalla documentazione
- [`Jakubantalik/Libraries`](https://github.com/Jakubantalik/Libraries): raccolta di effetti React da copiare nel progetto (border beam, liquid gooey, thinking orbs), dallo stesso autore di transitions.dev

**Motion, animazioni e scroll**

- Animazione/scroll: [`greensock/GSAP`](https://github.com/greensock/GSAP), [`darkroomengineering/lenis`](https://github.com/darkroomengineering/lenis), [`michalsnik/aos`](https://github.com/michalsnik/aos), [`dixonandmoe/rellax`](https://github.com/dixonandmoe/rellax)
- [`juliangarnier/anime`](https://github.com/juliangarnier/anime): motore di animazione JavaScript con una sola API per proprietà CSS, attributi SVG, nodi del DOM e oggetti JavaScript, con timeline, easing e stagger già dentro
- [`motiondivision/motion`](https://github.com/motiondivision/motion): la libreria di animazione erede di Framer Motion, per React e per JavaScript puro, con gesture, layout animation e animazioni guidate dallo scroll; una parte gira sulla Web Animations API, quindi fuori dal thread principale
- [`nolimits4web/swiper`](https://github.com/nolimits4web/swiper): slider e caroselli touch con transizioni accelerate in hardware, senza dipendenze, con i componenti per React, Vue e Web Components
- [`locomotivemtl/locomotive-scroll`](https://github.com/locomotivemtl/locomotive-scroll): scorrimento morbido con parallasse e rilevamento degli elementi che entrano nel viewport, dallo studio Locomotive
- [`russellsamora/scrollama`](https://github.com/russellsamora/scrollama): scrollytelling costruito su IntersectionObserver invece che sugli eventi di scroll, quindi senza il costo dei listener continui; fa scattare i passaggi di una narrazione mentre la pagina scorre
- [`alvarotrigo/fullpage.js`](https://github.com/alvarotrigo/fullpage.js): siti a scorrimento full-screen, con sezioni verticali a tutta pagina e slide orizzontali; vanilla JS (jQuery opzionale) con wrapper Vue/React/Angular, per one-page, portfolio e showcase
- [`Jakubantalik/transitions.dev`](https://github.com/Jakubantalik/transitions.dev): transizioni essenziali (con "product motion skill")
- [`delphi-ai/animate-skill`](https://github.com/delphi-ai/animate-skill): skill animazioni Next.js/React (corso di Emil Kowalski)
- CSS pronte: [`ibelick/animation`](https://github.com/ibelick/animation), [`tilomitra/infinite`](https://github.com/tilomitra/infinite), [`IanLunn/Hover`](https://github.com/IanLunn/Hover)
- [`barvian/number-flow`](https://github.com/barvian/number-flow): numeri animati · [`0xGF/boneyard`](https://github.com/0xGF/boneyard): skeleton loading
- [`guillermolg00/morphicons`](https://github.com/guillermolg00/morphicons): fa passare un'icona a tratto in un'altra con un'animazione a molla, prendendo i tracciati da Lucide, Tabler, Heroicons o dai tuoi. Le rotazioni non si dichiarano a mano, escono dal calcolo che allinea le due forme, così `arrow-right` verso `arrow-down` gira di 90 gradi da sé. ESM, ~7 KB gzip e nessuna dipendenza a runtime, con i pacchetti per React, Vue, Svelte, React Native e Astro più il custom element `<morph-icon>`
- Particelle/physics: [`VincentGarreau/particles.js`](https://github.com/VincentGarreau/particles.js), [`liabru/matter-js`](https://github.com/liabru/matter-js)
- SVG/3D/canvas: [`renatoworks/3dsvg`](https://github.com/renatoworks/3dsvg), [`meodai/heerich`](https://github.com/meodai/heerich), [`edoardolunardi/infinite-canvas`](https://github.com/edoardolunardi/infinite-canvas)

**Effetti e transizioni**

Le demo di [Codrops](https://tympanus.net/codrops/), ognuna con l'articolo che la spiega, più i tutorial pubblicati dai singoli autori. Sono esperimenti da studiare e adattare, non librerie da installare.

- [`codrops/PageTransitions`](https://github.com/codrops/PageTransitions): transizioni di pagina in CSS
- [`codrops/SidebarTransitions`](https://github.com/codrops/SidebarTransitions): transizioni per le navigazioni off-canvas
- [`codrops/ModalWindowEffects`](https://github.com/codrops/ModalWindowEffects): comparsa delle finestre modali
- [`codrops/HoverEffectIdeas`](https://github.com/codrops/HoverEffectIdeas): effetti hover discreti
- [`codrops/StickySections`](https://github.com/codrops/StickySections): sezioni sticky animate mentre escono dal viewport
- [`codrops/ScrollBlurTypography`](https://github.com/codrops/ScrollBlurTypography): testo che si rivela sfocandosi allo scroll
- [`codrops/ElasticGridScroll`](https://github.com/codrops/ElasticGridScroll): colonne di una griglia a velocità diverse, per un effetto elastico
- [`codrops/ImageToGridTransition`](https://github.com/codrops/ImageToGridTransition): un'immagine grande che si anima fino al suo posto in griglia
- [`codrops/ImageExpansionTypography`](https://github.com/codrops/ImageExpansionTypography): immagine che si espande dentro un blocco tipografico

Tutorial e fork pubblicati dai singoli autori:

- [`houmahani/codrops-depth-gallery`](https://github.com/houmahani/codrops-depth-gallery): galleria Three.js in cui le immagini generano il proprio sfondo GLSL, con parallasse che reagisce alla velocità
- [`gaspoorf/curve-gallery`](https://github.com/gaspoorf/curve-gallery): galleria 3D scroll-driven con camera lungo un path Blender (Three.js + GSAP)
- [`davidfaure/horizontal-parallax-gallery-codrops`](https://github.com/davidfaure/horizontal-parallax-gallery-codrops): parallasse orizzontale in CSS e JavaScript, con variante WebGL
- [`Ibaliqbal/codrops-motion-path-transition`](https://github.com/Ibaliqbal/codrops-motion-path-transition): thumbnail che fluiscono tra stack e layout con il plugin GSAP MotionPath
- [`ValentinDBS/codrops-tutorial-text-animation`](https://github.com/ValentinDBS/codrops-tutorial-text-animation): testo a onda su due colonne, guidato dallo scroll con una sinusoide
- [`blenkcode/codrops-demo`](https://github.com/blenkcode/codrops-demo): page transition asincrone in vanilla JavaScript con GSAP, un router SPA leggero senza framework
- [`bnpne/page-transitions-with-webgpu-vanilla-js`](https://github.com/bnpne/page-transitions-with-webgpu-vanilla-js): page transition interattive con WebGPU e Vanilla JS (Vite)

**Suono e feedback audio**

- [`romainsimon/uisfx`](https://github.com/romainsimon/uisfx): UI SFX, sistema sonoro semantico per interfacce: 78 effetti in 12 "personalità" audio richiamati per nome (`success`, `drop`…) invece che gestendo i singoli file; TypeScript su Web Audio API, ~12KB e zero dipendenze, per web app, mobile, SaaS e giochi
- [`rexa-developer/tiks`](https://github.com/rexa-developer/tiks): suoni di interfaccia generati per sintesi invece che caricati da file: nessun asset audio da distribuire e timbro regolabile da codice

### Deploy del prototipo

Il deploy è l'ultimo anello del loop (Design → Build → **Deploy** → Test → Iterate): serve a passare da "gira sulla mia macchina" a un URL condivisibile. Tre livelli, dal più veloce al più pubblico: anteprima in locale, pubblicazione su Vercel, pubblicazione su GitHub Pages.

**1) Anteprima in locale:** prima di pubblicare, conviene sempre far girare il progetto in locale, perché una build che fallisce sul server è più lenta da debuggare di una intercettata subito. Per un progetto Vite tipico valgono questi comandi.

```
npm install
npm run dev        # anteprima di sviluppo su http://localhost:5173
npm run build      # genera la build di produzione in /dist
npm run preview    # serve la build di produzione in locale, per verificarla
```

**2) Preparare il repository Git:** crea un `.gitignore` (almeno `node_modules/`, `.env`, `.env.local`, `dist/`) prima del primo `git add`; non committare mai file `.env` in un repo pubblico. Poi inizializza e pubblica su GitHub.

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<utente>/<repo>.git
git push -u origin main
```

**3) Pubblicare su Vercel:** due strade. **Dashboard (consigliata la prima volta):** `vercel.com` → Add New → Project → Import del repo GitHub → Vercel rileva il framework (React/Vite/Next.js…) e propone Build Command `npm run build` e Output Directory `dist` (per Vite) → Deploy. **CLI:** `npm i -g vercel`, poi `vercel login` e `vercel`, rispondendo ai prompt. Restano da tenere presenti alcuni punti.
- **CI/CD automatico:** collegando GitHub, Vercel installa un webhook, quindi ogni push su `main` diventa un deploy di produzione, e ogni branch/PR ottiene un preview URL da condividere.
- **SPA 404 al refresh (es. React Router):** aggiungi un `vercel.json` con un rewrite di tutte le rotte su `/`.
- **Variabili d'ambiente:** si impostano nel dashboard (Settings → Environment Variables), non nel repo; per Vite devono avere il prefisso `VITE_`.
- **Dominio custom:** Settings → Domains, SSL automatico. Il piano gratuito (Hobby) basta per prototipi.
- In alternativa, si può deployare da dentro Claude Code con il plugin `vercel/vercel-deploy-claude-code-plugin`.

**4) Pubblicare su GitHub Pages** (hosting statico gratuito, ideale per la guida stessa e per prototipi senza backend). Passo obbligato: impostare il `base` in `vite.config.js`, perché le Pages di progetto vivono in un sottopercorso:

```
// vite.config.js — project page su <utente>.github.io/<repo>/
export default defineConfig({ plugins: [react()], base: '/<repo>/' })
// se pubblichi su <utente>.github.io/ o su dominio custom: base '/'
```

Poi due approcci:
- **GitHub Actions (via ufficiale Vite):** Settings → Pages → Source = GitHub Actions, quindi un workflow `.github/workflows/deploy.yml` che fa checkout, `npm ci`, `npm run build` e pubblica `dist/` con `actions/upload-pages-artifact` + `actions/deploy-pages`. Ogni push su `main` ripubblica. Il workflow minimo è questo.

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
- **Pacchetto `gh-pages`:** aggiungi `"homepage": "https://<utente>.github.io/<repo>"` in `package.json`, gli script `"predeploy": "npm run build"` e `"deploy": "gh-pages -d dist"`, lancia `npm run deploy` e imposta la Source delle Pages sul branch `gh-pages`.

Se usi React Router, allinea il `basename` del router al `base` di Vite (altrimenti 404 sulle rotte). Dominio custom: file `CNAME` nella cartella pubblicata.

**Quale scegliere:** dipende da una cosa sola, se il prototipo resta statico o gli serve qualcosa che giri su un server. Ricorda che entrambe danno HTTPS e ripubblicano da sé a ogni push.

<div class="verdict">
<div>
<img class="verdict-logo" src="assets/logo-github.png" alt="GitHub Pages" width="349" height="80">
<p>Pubblica solo statico, quindi HTML, CSS e JavaScript o una Single Page Application (SPA) già buildata. È gratis ed è la scelta giusta per un portfolio, per una landing e per una knowledge base come questa. Non ha backend né funzioni serverless, e il base path va sistemato a mano.</p>
</div>
<div>
<img class="verdict-logo" src="assets/logo-vercel.png" alt="Vercel" width="355" height="80">
<p>Pubblica statico e framework con SSR e funzioni serverless, per esempio le API routes di Next.js. Apre un'anteprima a ogni pull request, tiene le variabili d'ambiente e sulla maggior parte dei framework non chiede configurazione. È la strada migliore per un prototipo che potrebbe includere funzioni dinamiche.</p>
</div>
</div>

## Lavorare con le Claude Skills

Cosa sono le skill di Claude, come si scrive la propria e quali adottare senza installarne cinquanta. Chiude un catalogo di repository ordinati per area, da consultare quando serve invece che da leggere in fila.

### Cosa sono le skill e come si creano

Una skill è un insieme di istruzioni che dicono all'AI come svolgere un compito: la scrivi una volta e, quando serve, l'AI la segue e produce un risultato coerente. Funziona come una ricetta. Nei prodotti Anthropic si chiamano **Claude Skills** e funzionano in Claude in chat (l'app web, senza accesso ai file del computer), in Claude Code e in Claude Cowork (l'app desktop).

**Come si attiva:** una volta creata e caricata, la skill parte da sola quando il prompt corrisponde alla sua `description`. Scrivi «voglio creare una skill» e Claude carica la skill che ha quel caso tra i trigger, poi legge le istruzioni e le esegue. È lo stesso principio di progressive disclosure delle skill Figma, e a differenza di `CLAUDE.md`, che l'AI rilegge a ogni sessione, la skill si carica solo quando serve e consuma meno token. L'auto-attivazione non è sempre affidabile, e se la `description` è scritta male conviene dire esplicitamente «usa la skill xxx». Per le skill che usi spesso, crea uno slash command e le richiami con «/».

**Quando conviene costruirne una:** quando ti accorgi di ripetere le stesse istruzioni. Una skill si aggiorna in un minuto, e messo a punto un workflow lo riversi dentro perché la volta dopo Claude parta da lì («aggiorna la skill xxx di conseguenza»). L'altro caso utile è passare al team un metodo che hai già trovato, così chi lo segue arriva a un risultato simile senza ricostruire ogni dettaglio.

**Quando la skill è lo strumento sbagliato:** una skill che orchestra molti passaggi e delega ad altri agenti costa parecchio, perché a ogni giro chiede a un modello di decidere qualcosa che spesso è già deciso. Una misura pubblicata a luglio 2026 confronta una skill di revisione del codice con lo stesso lavoro riscritto come procedura deterministica: da 4,6 milioni di token a 506mila, da 23 agenti a 3, e metà del tempo. Il segnale da tenere d'occhio è la ripetitività, perché se i passaggi sono sempre gli stessi nello stesso ordine quella parte è codice travestito da prompt, e conviene scriverla come codice lasciando al modello solo i punti in cui serve un giudizio.

**Com'è fatta:** una skill è un file markdown, `SKILL.md`, più eventuali file di supporto (script, template, asset, esempi) quando servono. Può stare a due livelli, **globale** (nella cartella root di Claude sul computer, si attiva in qualsiasi progetto, comodo per le skill che usi ovunque) o **di progetto** (dentro la cartella del progetto, si attiva solo lì, utile per il team, perché in un repo GitHub condiviso la skill diventa disponibile a tutti). Il file centrale è sempre `SKILL.md`, l'unico che ogni skill deve avere. Ha due parti, il front matter YAML (tra i marcatori `---`) con `name` e `description`, che dicono cosa fa la skill e quando usarla, e il corpo markdown con le istruzioni. Non è codice, è testo in linguaggio naturale. Lo scheletro minimo è questo.

```
---
name: my-skill
description: Cosa fa la skill e quando usarla. Sii specifico su frasi trigger e contesti, così Claude sa quando consultarla.
---
# Nome della skill
## Steps
1. Cosa fare per primo.
2. Cosa fare dopo.
3. Come chiudere.
### Output
Descrivi come dev'essere l'output finale.
```

**Come crearne o caricarne una:** tre strade.

- **Fartela scrivere da Claude:** descrivi il compito con «Generami una skill Claude a partire da questa esigenza: [descrizione]».
- **Partire da una skill già fatta:** Anthropic ne pubblica alcune «ufficiali» ([`anthropics/skills`](https://github.com/anthropics/skills)), ampie e generiche, quindi conviene leggerne la `description` prima di adottarle. `frontend-design`, la più usata, dà istruzioni precise (evita i font generici Arial e Inter, layout attesi, elementi che rompono la griglia, indicazioni di motion), e leggere cosa fa una skill prima di adottarla conta più che installarne tante. Lo stesso vale per le skill di terze parti da marketplace, dove conviene leggere la `description`, perché spesso contengono più di quanto ti serve e consumano token, o script che è meglio verificare prima di eseguire. Per cercarle puoi chiedere a Claude o usare una skill come `find-skill` (team Vercel), che interroga il marketplace al posto tuo. Si caricano da claude.ai (in `claude.ai/customize/skills` carichi il file dal computer) o da Claude Code.
- **Usare `skill-creator`:** è la skill ufficiale di Anthropic per creare skill, con un loop di verifica integrato.

Chi vuole l'esempio operativo, dal design system alla skill, lo trova in «Creare una skill dal proprio design system». Il catalogo qui sotto raccoglie skill e repository di riferimento, ordinati per area.

### Catalogo di skill di riferimento

Selezione di skill, classificate per area. Le prime categorie sono le più centrali per il lavoro di design (collezioni, ponte con Figma, design system, qualità dell'interfaccia); chiudono accessibilità, UX writing e i toolbox di esecuzione, da tenere come risorse. Dove la skill ha un comando d'installazione, sta nella riga della sua voce. Le librerie che servono a costruire il prototipo (icone, componenti, motion, effetti, suono) non stanno qui: hanno un capitolo loro, «Costruire e pubblicare un prototipo».

**Dove girano queste skill:** quasi tutto il catalogo è fatto di skill per **Claude Code** (e altri coding agent come Cursor), che si installano da terminale con `npx skills add …` o dal marketplace dei plugin (`/plugin marketplace add …`), e vivono nella cartella locale `~/.claude/skills/` o dentro `.claude/` del progetto. Non girano nella chat di claude.ai, che ha un suo set fisso di skill (docx, pdf, pptx, frontend-design e le skill utente). Le skill Figma sono un caso a parte, perché arrivano col plugin Figma installato nel client MCP (vedi «Le skill Figma per Claude Code»). Come regola pratica, strategia e sintesi in chat, installazione e uso delle skill del catalogo in Claude Code (vedi «Dividere il lavoro tra Claude Desktop e Claude Code»).

**Se parti da zero**, un ordine sensato per un flusso standard di design può essere questo:

1. `frontend-design`, che si auto-attiva sulle richieste di UI e alza subito la qualità dei layout.
2. Una skill di "taste" come [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) o [`senlindesign/taste-skill`](https://github.com/senlindesign/taste-skill), per la rifinitura e la coerenza visiva.
3. Un ponte Figma, cioè l'MCP nativo di «Setup e loop con Figma MCP» oppure il plugin [`sherizan/designagent`](https://github.com/sherizan/designagent) per il loop bidirezionale.
4. [`airowe/claude-a11y-skill`](https://github.com/airowe/claude-a11y-skill) per l'accessibilità.
5. [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) per rifinire le UI generate.

Aggiungi il resto quando ti serve, senza installare tutto in una volta (ogni skill attiva è contesto in più).

### Collezioni di skill multi-disciplina
- [`Owl-Listener/designer-skills`](https://github.com/Owl-Listener/designer-skills): research → sistemi → UI → interazione → delivery
- [`Owl-Listener/ai-design-skills`](https://github.com/Owl-Listener/ai-design-skills): 42 skill e 18 comandi in 6 plugin per l'Agentic Experience Design (model interaction, alignment, system behavior, evaluation, agent orchestration, prompt architecture); per Claude Code e Gemini CLI, install da marketplace (`claude plugin marketplace add Owl-Listener/ai-design-skills`). Utile anche per la futura sezione agenti/Opus
- [`cuellarfr/design-skills`](https://github.com/cuellarfr/design-skills): research, critique, accessibilità, journey mapping
- [`jamiemill/layers-skills`](https://github.com/jamiemill/layers-skills): i "sette layer" del product design
- [`designagentlab/skills`](https://github.com/designagentlab/skills): libreria open: Figma, UX research, copywriting, immagini
- [`PatternsDev/skills`](https://github.com/PatternsDev/skills): agent skill di patterns.dev
- [`edenspiekermann/Skills`](https://github.com/edenspiekermann/Skills): raccolta skill dello studio Eden Spiekermann
- [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills): marketplace di 68 skill + 42 workflow in 9 plugin (discovery, strategy, execution, research, analytics, GTM, growth, toolkit, AI-shipping); per Claude Code e Cowork, install da marketplace; include `strategy-red-team` / `/red-team-prd` e `/ship-check` (adiacente, lato PM)
- [`anthropics/skills`](https://github.com/anthropics/skills): repository ufficiale Anthropic delle Agent Skills (riferimento canonico); qui dentro sta `frontend-design`, che si auto-attiva sulle richieste di UI e alza subito la qualità dei layout, install `npx skills add frontend-design`
- [`nexu-io/open-design`](https://github.com/nexu-io/open-design): alternativa open a Claude Design (259+ skill, 142+ design system)
- [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills): la raccolta ufficiale di Vercel, da cui viene `web-design-guidelines`, oltre cento principi di layout, tipografia, responsività e accessibilità; nello stesso repo stanno `composition-patterns`, `react-best-practices` e le skill di deploy. Si prende solo quella che serve, con `npx skills add vercel-labs/agent-skills@web-design-guidelines`
- [`mblode/agent-skills`](https://github.com/mblode/agent-skills): venticinque skill di cui quattro toccano il design, cioè `ui-animation` (easing, timing, transizioni, `prefers-reduced-motion`), `ui-design`, `typography-audit` e `product-design`; install `npx skills add mblode/agent-skills@ui-animation`
- [`HermeticOrmus/LibreUIUX-Claude-Code`](https://github.com/HermeticOrmus/LibreUIUX-Claude-Code): il cassetto di tutto, con 74 skill, 152 agent, 70 plugin e 76 comandi che applicano psicologia cognitiva, regole di accessibilità e componenti nativi di piattaforma. È tanto, e conviene installare il plugin che serve invece del pacchetto intero, perché ogni skill attiva è contesto in più
- [`wshobson/agents`](https://github.com/wshobson/agents): marketplace di plugin agentici che gira su più harness (Claude Code, Codex CLI, Cursor, OpenCode, Copilot, Gemini CLI): utile se il team non usa tutti lo stesso client
- [`zarazhangrui/frontend-slides`](https://github.com/zarazhangrui/frontend-slides): la skill `frontend-slides` citata in «Dividere il lavoro tra Claude Desktop e Claude Code», che costruisce deck come pagine web sfruttando le capacità front-end dell'agente
- [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail): fa ragionare l'agente come il senior più pigro della stanza, cioè spinge a non scrivere il codice che si può evitare; non è una skill di design, ma tiene a bada la tendenza a produrre più artefatti del necessario

### Ponte tra Claude e Figma
- [`figma/mcp-server-guide`](https://github.com/figma/mcp-server-guide): guida ufficiale al Figma MCP server
- [`senlindesign/claude2figma`](https://github.com/senlindesign/claude2figma): 4 skill che tengono l'AI "sui binari" del DS (token/componenti vincolati)
- [`renfei-design/Figma_AI_Bridge`](https://github.com/renfei-design/Figma_AI_Bridge): agent + skill per controllare Figma e automatizzare il design
- [`sherizan/designagent`](https://github.com/sherizan/designagent): il marketplace DesignAgent per designer, da cui si installano i plugin che scrivono e mantengono i file di contesto: [`designagent-design`](https://github.com/sherizan/designagent-design) impianta `DESIGN.md` e poi fa il lint del codice contro le sue stesse regole (ombre dove la spec chiede bordi, spaziature fuori griglia, pesi oltre il massimo dichiarato), [`designagent-brand`](https://github.com/sherizan/designagent-brand) e [`designagent-voice`](https://github.com/sherizan/designagent-voice) fanno lo stesso per `BRAND.md` e `VOICE.md`
- [`sherizan/designagent-figma`](https://github.com/sherizan/designagent-figma): il bridge bidirezionale da cui è nato il marketplace: legge e modifica il canvas live con ~30 tool, plugin più MCP server, locale e gratuito
- [`alima-max/prototype-to-figma-skill`](https://github.com/alima-max/prototype-to-figma-skill): il verso opposto del solito: analizza un prototipo fatto in Claude Code, mappa i componenti sulla libreria Figma via ricerca e Code Connect, ed esplode ogni flusso di interazione nei suoi stati
- [`kreako/fig2json`](https://github.com/kreako/fig2json): CLI in Rust che converte i file `.fig` salvati in locale in JSON pulito e ottimizzato (rimuove metadati e valori di default), pensato per far leggere e implementare il design all'AI (HTML/CSS)

### Design system e documentazione
- [`dylantarre/design-system-skills`](https://github.com/dylantarre/design-system-skills): skill DS per agentic coding
- [`somerandomdude/design-system-documentation-schema`](https://github.com/somerandomdude/design-system-documentation-schema): DSDS: formato JSON machine-readable per documentare un DS (8 entità: componenti, token, temi, foundation, pattern, guide, chunk); complementare al W3C Design Tokens (che tiene i valori), pensato esplicitamente anche per gli agenti AI
- [`NateBaldwinDesign/proportio`](https://github.com/NateBaldwinDesign/proportio): scale proporzionali (tipografia, icone, spaziature)
- [`southleft/ds-contracts-poc`](https://github.com/southleft/ds-contracts-poc): contratti di componente: un'unica fonte macchina-leggibile da cui si generano sia la libreria React sia quella Figma, con un differ a tre vie che dimostra se combaciano davvero (vedi «Enforcement del design system»)
- [`DirectedEdges/specs`](https://github.com/DirectedEdges/specs): schema, tipi e CLI per registrare e mantenere le specifiche dei componenti UI in un formato che l'agente può leggere
- [`marvkr/better-design`](https://github.com/marvkr/better-design): MCP server open source più un registry shadcn/ui con 31 temi ricavati da prodotti reali (Linear, Stripe, Vercel…), per dare all'agente un sistema di partenza invece di un foglio bianco
- [`VoltAgent/awesome-design-md`](https://github.com/VoltAgent/awesome-design-md): 73 file `DESIGN.md` già scritti, ricavati da siti reali come Stripe, Vercel, Figma e Spotify, con token, logica di layout e comportamento dei componenti veri. Si copia il file nella radice del progetto e l'agente lo legge, nel formato `DESIGN.md` introdotto da Google Stitch (vedi «DESIGN.md»), quindi non c'è nessuna skill da installare. Vale come punto di partenza, e il rischio è copiare la superficie di un prodotto scambiandola per una strategia
- [`kaokaohate/design-system-extractor`](https://github.com/kaokaohate/design-system-extractor): da uno screenshot di interfaccia ricava un design system intero, cioè classificazione dello stile, token di colore in forma `color.primary.500`, scala tipografica, griglia a 8pt, raggi e ombre, inventario dei componenti con varianti e stati, differenza fra tema chiaro e scuro e la specifica di uno sticker sheet Figma, tutto in un solo `.md` scaricabile. Parte dall'immagine, dove `senlindesign/taste-skill` parte da un URL, e uno screenshot compresso o riscalato mente sui valori
- [`tt-a1i/archify`](https://github.com/tt-a1i/archify): skill che genera diagrammi di architettura, flusso, sequenza e stati come HTML autonomo, con validazione ed export

### UI design e wireframing
- [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill): dà "buon gusto" all'AI, anti-slop: spaziature, tipografia, colore e rifinitura contro il vibe generico; install `npx skills add Leonxlnx/taste-skill`
- [`senlindesign/taste-skill`](https://github.com/senlindesign/taste-skill): Design DNA Extractor: `/taste <url>` fa reverse-engineering del "gusto" di un sito (token + il perché dietro le scelte) con pipeline Playwright; esporta in `CLAUDE.md`, Cursor, Windsurf, ecc.
- [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable): design language per rendere l'AI più brava nel design
- [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills): skill per rifinire le UI generate dagli agenti: `baseline-ui`, `fixing-accessibility`, `fixing-metadata`, `fixing-motion-performance`; install `npx skills add ibelick/ui-skills`, uso `/baseline-ui review src/`
- [`jakubkrehel/make-interfaces-feel-better`](https://github.com/jakubkrehel/make-interfaces-feel-better): i dettagli che fanno "sentire" meglio un'interfaccia
- [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): design intelligence UI/UX multi-piattaforma: analizza i requisiti e genera un design system su misura; install `npx skills add nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max`
- [`Magdoub/claude-wireframe-skill`](https://github.com/Magdoub/claude-wireframe-skill): wireframe B&W come HTML interattivo
- [`ceorkm/mobile-app-ui-design`](https://github.com/ceorkm/mobile-app-ui-design): pattern mobile ricavati da Airbnb, Duolingo, Spotify, Revolut e Phantom, con convenzioni per nove settori (AI, crypto, finance, health…), griglia a 8 punti, la regola 60/30/10 sul colore e i principi di emotional design. Si attiva da sé quando chiedi una schermata mobile, un onboarding o una navigazione, e arriva fino all'implementazione in React e Tailwind
- [`Checklist-Design/skills`](https://github.com/Checklist-Design/skills): review del design fondata sulle oltre cento checklist pubblicate da Checklist Design. Con `audit` percorre voce per voce la checklist che c'entra e restituisce una tabella con lo stato di ognuna, con `critique` scrive una lettura rapida di gerarchia, layout, tipografia, colore, accessibilità e interazione. Gli basta uno screenshot e sceglie da sé quale dei due modi usare, e le checklist viaggiano dentro la skill, quindi funziona senza rete

### Accessibilità e performance
- [`airowe/claude-a11y-skill`](https://github.com/airowe/claude-a11y-skill): audit a11y (axe-core + jsx-a11y)
- [`mgifford/accessibility-skills`](https://github.com/mgifford/accessibility-skills): skill che rispecchia un `ACCESSIBILITY.md`
- [`fecarrico/A11Y.md`](https://github.com/fecarrico/A11Y.md): sistema di contesto con regole WCAG applicabili
- [`Ashutos1997/claude-design-auditor-skill`](https://github.com/Ashutos1997/claude-design-auditor-skill): verifica contro 19 regole di design
- [`w3c/wcag`](https://github.com/w3c/wcag): linee guida WCAG (riferimento normativo)
- [`YellowLabTools/YellowLabTools`](https://github.com/YellowLabTools/YellowLabTools): testing qualità/performance front-end

### UX writing e contenuto
- [`conorbronsdon/avoid-ai-writing`](https://github.com/conorbronsdon/avoid-ai-writing): audit e riscrittura di un testo per togliere i tell della scrittura AI; è la disciplina che vale anche per le pagine di prodotto, non solo per gli articoli
- [`content-designer/ux-writing-skill`](https://github.com/content-designer/ux-writing-skill): UX writing sistematico su quattro standard (Purposeful, Concise, Conversational, Clear), con pattern per bottoni/errori/empty state/form e checklist di scoring; per Claude, Codex e Cursor, install `npx skills add content-designer/ux-writing-skill`

### Agenti, CLI, plugin e infrastruttura
- [`anthropics/claude-code`](https://github.com/anthropics/claude-code): l'agente da terminale su cui poggia tutta la guida, riferimento canonico
- [`agno-agi/agno`](https://github.com/agno-agi/agno): framework per costruire e gestire piattaforme di agenti; sta un gradino sotto il lavoro di design e serve quando l'agente diventa il prodotto
- [`google-gemini/gemini-cli`](https://github.com/google-gemini/gemini-cli): l'agente open source di Google nel terminale, l'alternativa diretta a Claude Code; le raccolte che girano su più harness, come `Owl-Listener/ai-design-skills` e `wshobson/agents`, lo supportano
- [`jackwener/OpenCLI`](https://github.com/jackwener/OpenCLI): trasforma un sito qualsiasi in una CLI e fa usare all'agente il browser dove sei già autenticato
- [`makenotion/claude-code-notion-plugin`](https://github.com/makenotion/claude-code-notion-plugin): collega Claude Code a Notion, utile quando la documentazione di progetto vive lì
- [`vercel/vercel-deploy-claude-code-plugin`](https://github.com/vercel/vercel-deploy-claude-code-plugin): porta il deploy su Vercel dentro Claude Code, senza uscire dal terminale (vedi «Deploy del prototipo»)
- [`jacob-bd/gemini-notebook-mcp-cli`](https://github.com/jacob-bd/gemini-notebook-mcp-cli): accesso programmatico a Gemini Notebook da riga di comando, da server MCP e da skill (ex `notebooklm-mcp-cli`, rinominato)
- [`PleasePrompto/notebooklm-skill`](https://github.com/PleasePrompto/notebooklm-skill): fa parlare Claude Code con i tuoi notebook NotebookLM, per interrogare i documenti che ci hai caricato
- [`Suleiman19/ai-design-buddy`](https://github.com/Suleiman19/ai-design-buddy): una struttura di cartelle che dà a Claude contesto persistente lungo un progetto di design (vai a «Organizzare il progetto»)
- [`LewisLiu007/full-page-screenshot`](https://github.com/LewisLiu007/full-page-screenshot): skill che cattura lo screenshot di una pagina intera via Chrome DevTools Protocol, senza dipendenze; serve per l'auto-verifica del prototipo
- [`vercel/vercel`](https://github.com/vercel/vercel): il repository della piattaforma e della CLI con cui si pubblica il prototipo, quella dei comandi `vercel` e `vercel deploy` descritti in «Deploy del prototipo»
- [`ibelick/zola`](https://github.com/ibelick/zola): interfaccia di chat aperta che parla con tutti i modelli, dallo stesso autore di `ui-skills` e `prompt-kit`
- [`withastro/astro`](https://github.com/withastro/astro): framework web per siti fatti di contenuto, l'alternativa a Next.js quando il prototipo è una pagina da leggere più che un'applicazione
- [`supabase/supabase`](https://github.com/supabase/supabase): database Postgres gestito con autenticazione e storage, per il prototipo che deve salvare qualcosa davvero

## Prossimi argomenti {badge:In lavorazione}

Quello che ancora manca e su cui stiamo lavorando. Cinque temi stanno dalla parte dell'attrezzatura, cioè come si installa, si configura e si mette al sicuro l'ambiente in cui la guida ti chiede di lavorare. Gli altri due sono di metodo. Il loop engineering riguarda quanto lavoro puoi lasciar fare all'agente da solo, la ricerca UX con l'AI riguarda come si decide cosa costruire.

- **Installare le skill in locale:** una skill che sta dentro `~/.claude/skills/` vale in tutti i progetti, non solo in quello dove l'hai scritta. Serve a dividere le skill tue da quelle del repo, la distinzione che oggi manca al catalogo di «Lavorare con le Claude Skills».
- **Gestire Claude Code dal terminale:** i comandi della CLI gestiscono le connessioni MCP, il livello di effort, i plugin e i marketplace, così non devi aprire i file di configurazione. È il seguito di «Setup e loop con Figma MCP», dove l'MCP si collega una volta e poi non lo si tocca più.
- **VS Code e Cursor a confronto:** lo stesso progetto Claude Code aperto nei due editor, con le differenze che contano davvero e cosa conviene in quale caso.
- **Versionamento e backup del progetto:** come si crea il repo, come lo si collega a GitHub con la CLI ufficiale e come si arriva al push automatico che a ogni commit manda tutto sul remoto. I comandi git puoi chiederli a Claude invece di ricordarteli, e una parte del giro poi va avanti da sola.
- **Archiviare un progetto su Google Drive:** dove tenere un progetto Claude Code quando il disco di una sola macchina non basta più, e cosa succede a un repo git dentro una cartella sincronizzata.
- **Loop engineering:** un loop è un agente che ripete lo stesso ciclo di lavoro finché non incontra la condizione che lo ferma. I tipi sono quattro. Il giro a turni lo guidi tu, `/goal` si ferma quando l'obiettivo è verificato, `/loop` e `/schedule` ripartono a intervallo, i loop proattivi scattano su un evento senza nessuno davanti allo schermo. A ogni passaggio lasci andare qualcosa, prima la verifica del risultato, poi la condizione di arrivo, poi l'innesco. È una prospettiva differente rispetto alla sezione «Human-in-the-loop», che spiega invece cosa resta in capo a chi progetta.
- **La ricerca UX con l'AI:** come si conduce uno studio che includa l'AI, senza che decida lei cosa hai trovato. All'inizio serve ad automatizzare i compiti singoli, poi diventa lavoro di sistema, cioè un archivio delle ricerche e un panel che si aggiornano da soli e segnalano cosa manca prima che qualcuno lo chieda. Conta anche quale strumento usi, perché Claude, Claude Cowork e Claude Code stanno in tre momenti diversi della ricerca e trattano in tre modi diversi i dati dei partecipanti. Sta un gradino prima di «UX.md», il file dove le evidenze diventano contesto per l'agente.

## Glossario

In ordine alfabetico. Se una parola della guida non è qui e non si capisce dal contesto, segnalala.

- **Agente:** un'AI che non si limita a rispondere ma esegue passaggi per conto tuo, cioè legge file, lancia comandi e verifica il risultato. Claude Code è un agente.
- **Auto Layout:** sistema di Figma che rende i frame reattivi, con spaziature, allineamenti e ridimensionamento automatici; un file in Auto Layout è più leggibile dall'AI.
- **Boilerplate:** la struttura di partenza standard di un file o di un progetto, che si riusa così com'è invece di riscriverla ogni volta.
- **Build:** il passaggio che trasforma i file sorgente nella versione pronta da pubblicare. Si lancia con un comando, di solito `npm run build`.
- **Canvas:** l'area di lavoro di un file Figma, quella dove stanno frame e layer.
- **CLI (Command Line Interface):** programma che si usa scrivendo comandi in un terminale invece che cliccando. Claude Code è una CLI.
- **Code Connect:** mappatura ufficiale di Figma che lega un componente Figma al componente di codice reale, così l'agente usa quello vero invece di ricostruirne uno simile. Vedi «Tre modi di collegare Figma a confronto» e «Le skill Figma per Claude Code».
- **Compaction:** riassunto automatico della conversazione quando la finestra si avvicina al limite, per ripartire da una finestra nuova senza perdere le decisioni prese. Vedi «Mantenere il contesto nel tempo».
- **Commit:** un salvataggio registrato nella storia del progetto, con un messaggio che dice cosa è cambiato. Permette di tornare indietro e di far capire agli altri cosa hai fatto.
- **Context architecture:** applicazione dei principi di information architecture all'ambiente in cui un agente lavora, cioè come l'informazione è gerarchizzata, nominata e resa trovabile. Sta un livello sopra il context engineering, che si occupa di cosa entra nella finestra. Vedi «Dal comando al contesto» e «I file di contesto».
- **Context engineering:** la pratica di decidere cosa entra nella finestra di contesto e cosa resta fuori. Vedi «Dal comando al contesto».
- **Context rot:** degrado della qualità delle risposte quando la finestra di contesto si riempie di materiale accessorio, come falsi avvii, tentativi di debug e divagazioni. Vedi «Il contesto è una risorsa finita».
- **Deploy:** la pubblicazione della versione buildata su un indirizzo che si può aprire nel browser. Vedi «Deploy del prototipo».
- **Design context:** l'insieme strutturato di dati di un layer che l'MCP di Figma espone (gerarchia, layout, variabili, componenti, token), diverso da uno screenshot.
- **`DESIGN.md`:** file di testo che dichiara l'identità visiva di un prodotto in due modi insieme, con front matter YAML coi token leggibili dalla macchina e corpo markdown con l'intento e i confini leggibili da una persona. Formato nato in Google Stitch e aperto da Google Labs nell'aprile 2026, ancora in spec alpha. I token sono normativi, e se la prosa li contraddice vincono i token. Vedi «DESIGN.md».
- **Dev Mode:** la modalità di Figma pensata per chi implementa, da cui si leggono misure, token e codice di un elemento e si abilita il server MCP locale.
- **DTCG (Design Tokens Community Group):** formato standard e aperto per i design token, usato per esportarli e scambiarli fra strumenti diversi.
- **Edge case:** un caso limite, raro ma possibile, che l'interfaccia deve comunque gestire: testo lunghissimo, lista vuota, connessione assente.
- **Enforcement:** far rispettare una regola in modo automatico, invece di sperare che qualcuno se la ricordi. Vedi «Enforcement del design system».
- **Finestra di contesto:** lo spazio in cui l'AI tiene insieme istruzioni, file e conversazione mentre lavora. Vedi «Il contesto è una risorsa finita».
- **Frame:** in Figma, il contenitore che tiene dentro altri elementi. È l'unità con cui si costruisce una schermata.
- **Front matter:** il blocco di dati strutturati in cima a un file markdown, delimitato da `---`, che gli strumenti leggono come configurazione invece che come testo.
- **Handoff:** il passaggio di consegne a chi riprende il lavoro dopo di te, che può essere un collega o te stesso alla sessione successiva.
- **Happy path:** il percorso in cui tutto va bene e nessuno sbaglia niente. È quello che gli agenti costruiscono per primo, e spesso l'unico.
- **IDE (Integrated Development Environment):** il programma in cui si scrive il codice, che tiene nello stesso posto editor, ricerca nei file, terminale e strumenti di debug. VS Code e Cursor sono due IDE, e Claude Code ci gira dentro come estensione. Vedi «Comandi e subagent per il design».
- **Lint:** controllo automatico che segnala errori e violazioni delle regole dentro un file, prima che diventino un problema.
- **Marketplace:** il catalogo da cui si installano i plugin di Claude Code, con `/plugin marketplace add`.
- **MCP (Model Context Protocol):** standard che permette a un client AI di collegarsi a strumenti esterni (Figma, Notion, GitHub…) e leggerne o scriverne i dati tramite i tool esposti dal server.
- **node-id:** identificatore di un nodo (frame, layer, componente) in un file Figma; serve all'MCP per sapere su quale oggetto lavorare.
- **Personal Access Token (PAT):** chiave personale (in Figma inizia con `figd_`) che autentica un client verso un servizio; va trattata come una password e tenuta fuori dal repo.
- **Plan mode:** modalità di Claude Code in cui legge e propone un piano senza toccare i file finché non approvi (Shift+Tab o `/plan`). Vedi «Comandi e subagent per il design».
- **Plugin:** pacchetto che aggiunge funzioni a uno strumento. In Figma estende l'editor, in Claude Code porta comandi, skill e connessioni già configurate.
- **Progressive disclosure:** mostrare un'informazione solo quando serve, invece di darla tutta subito. Vale per le interfacce e per come l'AI carica skill e file di contesto.
- **Prompt engineering:** curare la formulazione della singola richiesta. È il livello sotto al context engineering. Vedi «Dal comando al contesto».
- **Repo (repository):** la cartella di un progetto tenuta sotto controllo di versione con git, con tutta la storia delle modifiche.
- **Scope:** quello che un lavoro comprende e, per differenza, quello che lascia fuori.
- **Skill:** un insieme di istruzioni scritte una volta, che l'AI carica quando il compito corrisponde, per svolgere sempre allo stesso modo un'attività ricorrente. Vedi «Cosa sono le skill e come si creano».
- **Slash command:** comando che si richiama scrivendo `/` seguito dal nome, per esempio `/init`.
- **SPA (Single Page Application):** un sito che carica una pagina sola e da lì in poi cambia i contenuti col JavaScript invece di ricaricare. Pubblicarne una su un hosting statico chiede una regola in più, perché il server deve rispondere con quella pagina anche sulle rotte interne (vedi «Deploy del prototipo»).
- **SSR (Server-Side Rendering) / serverless:** pagine costruite dal server a ogni richiesta e funzioni eseguite on-demand senza gestire un server dedicato; distinguono un sito statico da un'app con logica dinamica. Vedi «Deploy del prototipo».
- **Subagent:** agente separato che svolge un compito con una finestra di contesto sua e restituisce solo il risultato, senza consumare quella principale.
- **Token (design token):** un valore del design system a cui è stato dato un nome, per esempio un colore o una misura di spaziatura, così si richiama per nome invece di ricopiarne il valore.
- **Variante:** in Figma, una versione alternativa dello stesso componente (il pulsante primario e quello secondario) raccolta insieme alle altre.
- **WCAG (Web Content Accessibility Guidelines):** lo standard internazionale per l'accessibilità dei contenuti web. I livelli AA e AAA fissano soglie precise, per esempio sul contrasto fra testo e sfondo.
- **YAML (YAML Ain't Markup Language):** formato per scrivere dati strutturati in modo leggibile, usato per esempio nel front matter di `DESIGN.md`.

## Fonti

**Contesto e pratica di design con l'AI**
- Addy Osmani, [Context Engineering: Bringing Engineering Discipline to Prompts](https://addyo.substack.com/p/context-engineering-bringing-engineering) (agosto 2025)
- Anthropic, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (settembre 2025)
- Paz Perez, [Context Architecture: Applying IA Principles to AI Systems](https://www.nngroup.com/articles/context-architecture/), NN/g (giugno 2026)
- Vadym Grin, [Context engineering: A repeatable AI workflow for product designers](https://uxdesign.cc/context-engineering-a-repeatable-ai-workflow-for-product-designers-8d7b55b83b2b) (marzo 2026)
- Suleiman Shakir, [How I use AI to partner on design problems](https://uxdesign.cc/how-i-use-ai-to-think-through-design-problems-4a484080484b) (maggio 2026)
- Tony Alicea, [UX-Context Design: Using UX Knowledge to Inform AI-Generated Design](https://www.nngroup.com/articles/ux-context-design/), NN/g (luglio 2026)
- [The AI Design Library](https://library.aidesign.guide/)
- NN/g, AI prototyping; Testing AI methodology; Vague prototyping
- Design with AI, Five insights from workflows to think, test, build, ship with AI

**File di contesto e formati `.md`**
- Nick Babich, [CLAUDE.md Best Practices](https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c) (marzo 2026)
- Nick Babich, [Claude Code Project Structure Best Practices](https://uxplanet.org/claude-code-project-structure-best-practices-5a9c3c97f121) (marzo 2026)
- Nick Babich, [CLAUDE.md Tips & Tricks for Product Designers](https://uxplanet.org/claude-md-tips-tricks-for-product-designers-4cc47f2084c1) (marzo 2026)
- Nick Babich, [Comprehensive Guide to CLAUDE.md](https://uxplanet.org/comprehensive-guide-to-the-claude-md-8e60f860d9f9) (aprile 2026)
- Nick Babich, [What is DESIGN.md and How To Use It](https://uxplanet.org/what-is-design-md-and-how-to-use-it-70532359b311) (maggio 2026)
- Nick Babich, [7 Advanced CLAUDE.md Tips for Claude Code](https://uxplanet.org/7-advanced-claude-md-tips-for-claude-code-b34e86b3275a) (maggio 2026)
- Lisa Demchenko, [How to write a DESIGN.md file Claude can actually use](https://uxdesign.cc/how-to-write-a-design-md-file-claude-can-actually-use-2d89d183f823) (maggio 2026)
- Murphy Trueman, [Your design system is fragmenting into agent files](https://www.designsystemscollective.com/your-design-system-is-fragmenting-into-agent-files-26a9b19a2fad) (maggio 2026)
- Nick Babich, [DESIGN.md Best Practices](https://uxplanet.org/design-md-best-practices-c00325e8b23a) (giugno 2026)
- Frank Andrade e Kevin Gargate Osorio, [If You Use Claude, You Need This Simple Folder System](https://artificialcorner.com/p/claude-file-system) (giugno 2026)
- Nick Babich, [CLAUDE.md vs DESIGN.md: What to Put in Each for Claude Code](https://uxplanet.org/claude-md-vs-design-md-what-to-put-in-each-for-claude-code-53647d015bfd) (luglio 2026)
- Patrick Neeman, [Design.md: the one standard file carries your visual identity, for humans and agents](https://uxdesign.cc/design-md-the-one-standard-file-carries-your-visual-identity-for-humans-and-agents-9058d5b39d9b) (agosto 2026)
- Lisa Demchenko, [What your AI co-designer can't infer from your hex values](https://uxdesign.cc/what-your-ai-co-designer-cant-infer-from-your-hex-values-d2023364e80e) (agosto 2026)
- Nick Babich, [7 DESIGN.md Mistakes That Make AI-Generated UI Worse](https://uxplanet.org/7-design-md-mistakes-that-make-ai-generated-ui-worse-9ec2dfcc44cd) (agosto 2026)
- Nick Babich, [7 DESIGN.md Tips for Better, More Consistent AI-Generated UI](https://uxplanet.org/7-design-md-tips-for-better-more-consistent-ai-generated-ui-b01736d07748) (agosto 2026)
- Nick Babich, [Claude Code Doesn't Need More Context. It Needs Less.](https://uxplanet.org/claude-code-doesnt-need-more-context-it-needs-less-7a988e2c7210) (agosto 2026)

**Design system leggibili dall'AI**
- Kir Romanovsky, [Key Principles of Scalable Design System Architecture](https://medium.com/design-bootcamp/understanding-design-system-architecture-key-insights-0b7bb7b415c5) (aprile 2024)
- Dean Harrison, [Design systems: simplifying documentation writing](https://uxdesign.cc/design-systems-simplifying-documentation-writing-5ec240c484fe) (ottobre 2024)
- Nurkhon, [Your Figma library is invisible to AI agents](https://nurxmedov.medium.com/your-figma-library-is-invisible-to-ai-agents-31ff99d0ff9c) (aprile 2026)
- Nick Babich, [AI and Design System](https://uxplanet.org/ai-and-design-system-3dab36a5cc50) (aprile 2026)
- Nurkhon, [Context is the new component library (and your agents can't work without it)](https://nurxmedov.medium.com/context-is-the-new-component-library-and-your-agents-cant-work-without-it-91632d4175f2) (maggio 2026)
- The Maker's Lab, [My 4-step framework to make design systems AI-readable](https://medium.muz.li/my-4-step-framework-to-make-design-systems-ai-readable-74ba07145312) (maggio 2026)
- Nick Babich, [Creating AI-Ready Design System: Checklist](https://uxplanet.org/creating-ai-ready-design-system-checklist-547a0256ad87) (giugno 2026)
- Christine Vallaure, [You design it. Then what? A clear map of the Figma-to-code AI mess](https://uxdesign.cc/you-design-it-then-what-a-clear-map-of-the-figma-to-code-ai-mess-954a4084175f) (luglio 2026)
- Christine Vallaure, [Design system contracts: the component lives in neither Figma nor code](https://uxdesign.cc/design-system-contracts-the-component-lives-in-neither-figma-nor-code-3032d94ca067) (luglio 2026)
- Nick Babich, [Design Systems Are About to Become Executable](https://uxplanet.org/design-systems-are-about-to-become-executable-f125a94fe4ad) (agosto 2026)
- Eva Nudea Hörner, [How to Make Your Design System Agent-Ready](https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270) (agosto 2026)
- Fantasy, [Can AI Generate UI Components from a Figma Design System?](https://fantasy.co/latest/figma-design-system-ai-components) (agosto 2026)

**Flusso tra Claude Code e Figma**
- Tommaso Nervegna, [Claude Code for Designers: A Practical Guide](https://nervegna.substack.com/p/claude-code-for-designers-a-practical) (gennaio 2026)
- Figma, [From Claude Code to Figma: Turning production code into editable Figma designs](https://www.figma.com/blog/introducing-claude-code-to-figma/) (febbraio 2026)
- Muz.li, [Claude Code to Figma: How the New "Code to Canvas" Integration Works](https://muz.li/blog/claude-code-to-figma-how-the-new-code-to-canvas-integration-works/) (febbraio 2026)
- Nick Babich, [Claude Code + Figma](https://uxplanet.org/claude-code-figma-f647facbe181) (marzo 2026)
- Nick Babich, [Claude Code + Figma Design System](https://uxplanet.org/claude-code-figma-design-system-498573c5d357) (marzo 2026)
- Nick Babich, [Figma Skills for Claude Code](https://uxplanet.org/figma-skills-for-claude-code-bb05a21984fd) (aprile 2026)
- Garima Agarwal, [How to Connect Figma to Claude (MCP Setup Guide 2026)](https://medium.com/@garimaagarwal1200/claude-desktop-figma-console-mcp-complete-setup-guide-2026-babba46b12a0) (aprile 2026)
- Sen Lin, [How to make Claude Code follow your design system in Figma](https://uxdesign.cc/how-to-make-claude-code-follow-your-design-system-in-figma-559618cffaa9) (maggio 2026)
- Nick Babich, [Ultimate Claude Code Setup for Product Designers](https://uxplanet.org/ultimate-claude-code-setup-for-product-designers-f8b2fff4ac69) (giugno 2026)
- Nick Babich, [Figma skills for Claude Code: Complete Guide](https://uxplanet.org/figma-skills-for-claude-code-complete-guide-c8db2b581a76) (giugno 2026)
- Xinran Ma, [My Top 14 Claude Code Commands](https://designwithai.substack.com/p/my-top-14-claude-code-commands) (giugno 2026)
- Nick Babich, [Claude Code Cheatsheets for Product Designer](https://uxplanet.org/claude-code-cheatsheets-for-product-designer-e1d9c16d577a) (giugno 2026)
- Arpan Patel, [Beyond the Prompt: Claude Code](https://arps18.github.io/posts/claude-code-mastery/) (giugno 2026)
- Figma, [Guide to the Figma MCP server](https://developers.figma.com/docs/figma-mcp-server/)
- Figma, [Workflow lab: Code to canvas](https://help.figma.com/hc/en-us/articles/40219873508247-Workflow-lab-Code-to-canvas)
- Figma, [Figma skills for MCP](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP)
- [Agent skills pubblicate da Figma](https://mcpservers.org/agent-skills/author/figma), mcpservers.org
- southleft, [Figma Console MCP e plugin Figma Desktop Bridge](https://github.com/southleft/figma-console-mcp)
- Sherizan, [DesignAgent, plugin Claude Code per designer](https://designagent.dev/) e il [plugin Figma Community](https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge)
- [FigSpecs, AI Design System Generator](https://www.figma.com/community/plugin/1612756059828219731/figspecs-ai-design-system-generator), plugin Figma Community
- @friendlyunit, Figma console MCP to Claude: Setup Guide for Designers

**Claude Skills**
- Anthropic, [A complete guide to building skills for Claude](https://claude.com/blog/complete-guide-to-building-skills-for-claude) e la sua versione [PDF](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) (gennaio 2026)
- Garima Agarwal, [Design Systems in 2026: Turn Your System into a Claude Skill](https://www.designsystemscollective.com/design-systems-in-2026-turn-your-system-into-a-claude-skill-3dd4d8bf5feb) (maggio 2026)
- Jack Henry, [5 New claude skills for UI/UX designers](https://medium.com/@jackhenrys/5-new-claude-skills-for-ui-ux-designers-c23446dfb2e6) (giugno 2026)
- Paweł Huryn, [PM Skills 2.0: Red-Team Your Roadmap, Then Check the Code Before You Ship](https://www.productcompass.pm/p/pm-skills-2-red-team-ship) (giugno 2026)
- Xinran Ma, [The Claude Skills Playbook](https://designwithai.substack.com/p/the-claude-skills-playbook)
- Adam Jacob, [A Practical Guide to Reducing Token Spend](https://www.adamhjk.com/blog/a-practical-guide-to-reducing-token-spend) (luglio 2026)

**Deploy**
- MindStudio, [How to Deploy a Claude Code Project to GitHub and Vercel in Under 10 Minutes](https://www.mindstudio.ai/blog/deploy-claude-code-project-github-vercel)
- Vite, [Deploying a Static Site](https://vite.dev/guide/static-deploy)
