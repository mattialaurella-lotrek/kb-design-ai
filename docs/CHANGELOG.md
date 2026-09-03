# Changelog

Tutte le modifiche degne di nota a questa guida.
Il formato si ispira a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); essendo un sito/guida senza versioni, le voci sono raggruppate per data (più recente in cima).

## [2026-09-03]

### Aggiunto
- **[`southleft/figma-console-mcp`](https://github.com/southleft/figma-console-mcp) nel catalogo,** in «Ponte tra Claude e Figma», subito dopo `sherizan/designagent-figma` perché sono i due bridge di terze parti. Il Desktop Bridge era già descritto per esteso in «Tre modi di collegare Figma a confronto» e già presente nelle fonti, ma dei tre modi di collegare Figma era l'unico che nel catalogo non compariva. La voce ha 212 battute, URL escluso, e rimanda al confronto invece di ripetere i ~107 tool, l'export dei token e lo scan WCAG.

## [2026-09-02]

### Aggiunto
- **Sezione «I comandi di Claude Code»,** seconda del capitolo 3, subito dopo «Dividere il lavoro tra Claude Desktop e Claude Code» e prima delle sezioni su Figma. Tre piani distinti, cioè i comandi da terminale che fissano le condizioni della sessione, gli slash command che la governano mentre lavora e le scorciatoie da tastiera. In mezzo una tabella di cinquantanove righe con tre colonne, comando, dove si scrive e a cosa serve progettando. Sta prima di Figma perché il plan mode, che la sezione spiega, va usato prima di un passaggio da Figma a codice, e finora arrivava dopo il loop che avrebbe dovuto preparare.
- **Quattro fonti, voci 55-58 di `docs/FONTI.md`,** con i PDF in `sources/` e un gruppo nuovo, «Comandi di Claude Code», anche nella sezione «Fonti» della guida. Sono le due pagine di documentazione ufficiale su comandi e CLI, l'articolo di Akari Iku su DEV Community e il repository `wshobson/commands`. Le due pagine di documentazione sono vive e senza data di pubblicazione, quindi la voce dichiara che il PDF vale come istantanea del 2 settembre 2026.

### Corretto
- **L'intestazione delle tabelle resta come è sempre stata,** `position: sticky; top: 0`. Avevo provato a spostarla a `top: 60px` perché con una tabella più alta del viewport finisce dietro la topbar, e a limitarla poi alle sole tabelle lunghe con una classe scritta dalla build. Tutte e due le versioni cambiavano l'aspetto dell'intestazione rispetto a quella pubblicata, che è quella giusta, quindi la regola è tornata identica e il conteggio delle righe è uscito da `scripts/build.mjs`. Sulla tabella lunga l'intestazione scorre via come ovunque.
- **La stampa teneva `break-inside: avoid` sull'involucro della tabella,** cosa impossibile per una tabella più alta di una pagina. Nel blocco `@media print` la regola passa dall'involucro alle righe, l'intestazione si ripete a ogni pagina con `display: table-header-group` e la `sticky` torna `static`, che in stampa non serve. Verificato sul PDF rigenerato.

- **Le card dello schema a tre passaggi passano al fondo bianco,** da `--surface-2` a `--surface`, su indicazione dell'utente. Erano gli unici riquadri della guida su fondo grigio, mentre i riquadri affiancati stavano già su `--surface`. Il componente ora ha una sua sezione in `DESIGN.md`, che prima non aveva.
- **Nove comandi aggiunti alla tabella,** che sale a 67 righe: `/add-dir`, `/agents`, `/background`, `/btw`, `/export`, `/hooks`, `/insights`, `/schedule` e `/security-review`. Due erano già citati altrove nella guida e mancavano qui, cioè `/schedule` in «I quattro tipi di loop» e `/insights` in «CLAUDE.md».

- **Le due sezioni nuove ripassate con `/clarity` e con `italiano-chiaro`.** Il primo giro con `/clarity` era stato troppo timido e non copriva la correttezza dell'italiano, che è il perimetro dell'altra skill. Il secondo giro ha trovato quattro errori veri, cioè «tre posti, e fanno cose diverse» con il soggetto che non regge, «impedisce alla squadra di lavorare tutti allo stesso modo», «il fuoco sono i flussi» con l'accordo rotto, e due costruzioni con il soggetto implicito sbagliato, fra cui «le poche cose che useresti troppo spesso per scriverle», segnalata dall'utente. Sono cadute anche «Il riferimento è la versione 2.1.258 di settembre 2026» e «È materia che cambia in fretta», che non dicevano niente. Diciannove passaggi in tutto.

- **[`addyosmani/clarity`](https://github.com/addyosmani/clarity) nel catalogo,** in «UX writing e contenuto», subito dopo `avoid-ai-writing` perché fanno mestieri vicini. È la skill usata in questa stessa sessione per ripassare le due sezioni nuove.
- **Regola nuova in `CLAUDE.md`: le voci del catalogo stanno fra le 80 e le 240 battute,** URL escluso. Sono i quartili delle sessantaquattro voci già scritte, che hanno mediana 156. La prima stesura della voce `clarity` ne aveva 765, cioè quasi cinque volte la mediana e metà più della voce più lunga del catalogo, ed è stata riportata a 236. Quattordici voci precedenti restano sopra il tetto, fra 245 e 519 battute, e la regola le dichiara debito da accorciare quando si mette mano alla loro riga. Il tetto è 240 e il bersaglio 150, non il terzo quartile, perché un tetto messo sul quartile viene sforato da un quarto delle voci per definizione.

- **Regola nuova in `CLAUDE.md`: «stare» non dice dove si trova una cosa.** La collocazione in italiano vuole «si trova», «è», «compare» o «vive», e dove la frase prescrive dove mettere qualcosa si usa «va in». Chiesta dall'utente su «Cosa cambia per l'agente sta già in «I comandi di Claude Code»», che è un uso regionale ripetuto in tutta la guida.
- **Ventinove correzioni in `src/content.md`,** dai rimandi interni («la meccanica sta in» diventa «si trova in») ai percorsi dei file, più diciannove in `CLAUDE.md`, `DESIGN.md` e `docs/HANDOFF.md`. Cinque occorrenze restano perché sono legittime, cioè due «stare in piedi», «sta dentro il brand» nel senso di conformità, «la differenza sta nella sola aggiunta» nel senso di consistere e «sta sopra» come precedenza fra regole. `docs/CHANGELOG.md` e `docs/MEMORY.md` non sono stati toccati, perché sono registri di quello che è successo e non testi da mantenere. Corretti anche undici commenti nel CSS e nel JavaScript di `src/template.html`, che non si vedono in pagina ma li legge chi mette mano al foglio.

- **`docs/FONTI-DA-INTEGRARE.md`,** anticamera di `docs/FONTI.md` per le fonti raccolte e non ancora entrate nel testo. Le caselle ricalcano i sette capitoli, così una fonte trova il suo tema, e sotto stanno i temi annunciati e non ancora scritti. Ci sono dentro le quattro fonti dei due temi rimasti in «Prossimi argomenti», che finora vivevano solo dentro `docs/MEMORY.md`. Serve perché una fonte non integrata non può entrare in `docs/FONTI.md`, che è numerato in sequenza continua e dichiara quello che la guida ha usato davvero. Dentro ci sono anche le **otto fonti nuove fornite dall'utente**, smistate in quattro temi: tre sull'economia del contesto e dei token in «Progettare il contesto», una su `DESIGN.md`, due su «Collegare Claude e Figma» e una sull'ambiente di prototipazione in «Costruire e pubblicare il prototipo», più «Researcher-in-the-loop» che diventa la terza fonte del tema sulla ricerca UX. Di una sola, l'articolo Bootcamp su Figma e front-end, non si sono potuti verificare titolo, autore e data, perché Medium risponde 403 a ogni lettura automatica: la voce lo dichiara.

### Modificato
- **«Comandi e subagent per il design» diventa «Slash command e subagent per il design»** e resta in coda al capitolo, riscritta da capo su quello che ti scrivi tu. Dove mettere i comandi con la precedenza del personale sul progetto, il criterio per scegliere fra un comando e una skill, la raccolta `wshobson/commands` con la nota che di cinquantasette comandi uno solo è di design, i sei profili di subagent con la parte dei divieti, e i tre comandi con cui si chiamano. Il plan mode e il blocco sull'IDE escono da qui e passano alla sezione nuova.
- **«Prossimi argomenti» scende da tre temi a due,** perché «Gestire Claude Code dal terminale» è diventato testo. L'occhiello ora conta un tema di attrezzatura e uno di metodo. **«VS Code e Cursor a confronto» resta ma cambia perimetro:** quello che cambia per l'agente sta ora nella guida, e al tema resta il confronto fra i due editor.
- **Tre rimandi interni al vecchio titolo di sezione,** due nel glossario alle voci «IDE» e «Plan mode» e uno in «Versionare il progetto su GitHub». I primi due puntano a «I comandi di Claude Code», il terzo ai commit atomici in «Dividere il lavoro tra Claude Desktop e Claude Code», che è dove stanno davvero. Il controllo dei rimandi della build li ha segnalati tutti e tre.

## [2026-08-28]

### Modificato
- **«Quali sezioni mettere» del `CLAUDE.md` passa da sei sezioni a quattro.** `# Role` e `# Output format` escono e un paragrafo nuovo dice perché: la prima assegna a Claude una competenza che ha già, la seconda fissa in un file valido per tutte le sessioni una cosa che cambia da una richiesta all'altra, e per quel caso il posto è una skill o uno slash command. Le sei sezioni contraddicevano «Cosa ci va dentro», due paragrafi sopra, che chiede di scrivere solo quello che Claude sbaglierebbe da solo. La correzione viene dal post di Anthropic sul context engineering per i modelli di generazione Claude 5 (voce 54).
- **«Sotto le duecento righe» diventa «Duecento righe sono il tetto»,** perché la soglia veniva letta come traguardo. Il paragrafo ora dice che l'obiettivo sta più in basso e che sessanta righe di trappole del progetto valgono più di centottanta che ripetono quello che si vede aprendo la cartella. Cade anche l'indicazione di spezzare il file richiamando le parti con `@`: un file importato si carica comunque a ogni avvio, quindi in `CLAUDE.md` resta il puntatore che dice quando aprirlo, com'era già scritto in «`CLAUDE.md` come indice, non contenitore».
- **Il punto 2 delle buone pratiche in «Organizzare il progetto»** allineato alla stessa logica. Diceva di dividere oltre le duecento righe in file importati con `@path/to/import.md`, cioè la terza versione della stessa istruzione e l'unica che non riduceva il contesto caricato.

### Aggiunto
- **Fonte 54,** il post di Thariq Shihipar per Anthropic del 24 luglio 2026 sulle nuove regole del context engineering. In `docs/FONTI.md` con la nota sul PDF che manca, e nella sezione «Fonti» della guida sotto «Contesto e pratica di design con l'AI». Il corpo si monta via JavaScript e la stampa headless esce vuota, come per la voce 52.

## [2026-08-27]

### Aggiunto
- **Capitolo «Far lavorare l'agente da solo»,** il settimo, dopo quello sulle skill. Tre sezioni: «I quattro tipi di loop» con la tabella che li distingue per innesco, arresto e uso; «Le parti di un loop», le sette da scrivere prima di lanciarlo, con l'obiettivo debole contro quello forte e lo stato che sopravvive fra una corsa e l'altra; «Verificare il risultato», cioè cosa può fare da controllo in un lavoro di design, la skill in cui scrivi il tuo giro di QA, gli hook, gli agenti in parallelo con i worktree e la chiusura sul giudizio che si sposta invece di sparire. Sta in fondo perché usa tutto quello che viene prima, dal design system come criterio di verifica alle skill.
- **Sezione «Versionare il progetto su GitHub»** nel capitolo 5, prima del deploy. Sorgente contro derivato con `node_modules` e i file di lock, il `.gitignore` scritto prima del primo commit, i cinque comandi con `gh repo create`, i commit chiesti a Claude, il push automatico con l'hook `post-commit` e i limiti di GitHub sui file pesanti con Git LFS.
- **Sezione «Archiviare un progetto concluso»,** in coda al capitolo 5. I sette passaggi dalla pulizia delle cartelle rigenerabili alla cancellazione in locale, i file di Claude Code da conservare, il `.git` che non va dentro una cartella sincronizzata e le tre strade per la repository, con l'archiviazione consigliata.
- **Sezione «Dove vivono le skill»,** fra «Cosa sono le skill e come si creano» e il catalogo. I due percorsi con quello che comportano, la precedenza della skill personale su quella di progetto, i comandi per installarne una da GitHub, il caso in cui serve riavviare e il criterio per scegliere il livello. Chiude il buco per cui il catalogo elencava decine di skill senza dire dove si mettono.
- **Sei voci di glossario:** `.gitignore`, Git LFS, hook, JSON, loop e worktree. Quella su loop dichiara i tre sensi che la parola ha nella guida, così il capitolo nuovo non deve spiegarlo nel testo.
- **Cinque fonti, voci 49-53 di `docs/FONTI.md`,** con i PDF in `sources/`: i due articoli UX Planet sui loop, il post Anthropic sui dynamic workflows, quello sul loop engineering e il pezzo di Addy Osmani. Nella guida nascono il gruppo «Loop e autonomia dell'agente» e tre pagine di documentazione GitHub nel gruppo del deploy. Le date sono verificate sulle pagine originali, non dedotte dalle sintesi.
- **Regola in `CLAUDE.md`: un tema integrato esce da «Prossimi argomenti»,** e l'occhiello che conta i temi rimasti si riscrive. Chiesta dall'utente come regola permanente.

### Modificato
- **I titoli dei capitoli 5 e 6,** su indicazione dell'utente: «Costruire e pubblicare il prototipo» e «Progettare con le skill di Claude». Rinominati anche l'indice manuale e i due rimandi interni, che la build risolve per corrispondenza esatta del titolo.
- **«Deploy del prototipo» perde il punto 2,** quello che faceva `.gitignore`, `git init` e `git push`: la stessa procedura stava per finire in due sezioni. Ora i passaggi sono tre e l'attacco rimanda a «Versionare il progetto su GitHub». Nella stessa riga «l'ultimo anello del loop» diventa «del ciclo», perché con un capitolo sui loop la parola deve significare una cosa sola.
- **Il blocco sui pattern di affidabilità per le lavorazioni lunghe** si sposta da «Comandi e subagent per il design» a «Verificare il risultato», dove sta col resto del tema. Nel capitolo 3 resta un rimando.
- **«Prossimi argomenti» scende da sette temi a tre,** perché installare le skill in locale, il versionamento, l'archiviazione e il loop engineering sono diventati testo. L'occhiello ora conta due temi di attrezzatura e uno di metodo.
- **Punteggiatura dei titoletti in grassetto,** quindici correzioni. Tredici chiudevano col punto invece che coi due punti, e due grassetti a metà frase tenevano la virgola dentro. Due erano precedenti a questo giro, in «Dal codice al canvas e ritorno». Cinque paragrafi sono stati rifrasati perché, spostando i due punti sul titoletto, ne aprivano un secondo più avanti.
- **L'attacco di «I quattro tipi di loop»** entra dal concetto invece che dal preambolo su dove la parola loop era già comparsa.
- **L'attacco di «Librerie per asset ed effetti»** dice a cosa servono quelle librerie invece di annunciare quante famiglie sono. Frase dell'utente: «Servono a costruire il prototipo con elementi già impostati invece di progettarli singolarmente: icone, componenti, animazioni, effetti e suoni». Le mie due versioni precedenti erano roboanti, e la seconda spiegava anche come si nomina una libreria nel prompt, che lì non serviva.



### Aggiunto
- **La voce `Personal Access Token (PAT)` resta con la sigla in coda,** valutata e confermata. È l'unica delle nove scritta al contrario, e il motivo è che «PAT» nella guida non compare mai: l'unica ricorrenza sta in «Tre modi di collegare Figma a confronto» ed è per esteso. Il lemma segue la forma che il lettore incontra leggendo, ed è la regola che spiega tutti e nove i casi invece di lasciarne uno come eccezione. Annotata in `docs/MEMORY.md`.
- **Regola sullo scioglimento delle sigle in `CLAUDE.md`,** iniziali maiuscole in tutte e due le direzioni. Nella guida erano mischiate quattro a due: `MCP (Model Context Protocol)`, `DTCG (Design Tokens Community Group)` e `Personal Access Token (PAT)` in maiuscolo, `SPA (single page application)` e `IDE (integrated development environment)` in minuscolo. La regola opposta era impraticabile, perché avrebbe imposto `MCP (model context protocol)` su un nome proprio. Allineate le due voci fuori regola, glossario e riga in «Deploy del prototipo».
- **Tutte le sigle del glossario sono sciolte,** nessuna esclusa: `CLI (Command Line Interface)`, `SSR (Server-Side Rendering)`, `WCAG (Web Content Accessibility Guidelines)` e `YAML (YAML Ain't Markup Language)`. Due definizioni sono state ritoccate perché l'espansione le faceva ripetere, quella di SSR che apriva con «rendering lato server» e quella di WCAG che apriva con «le linee guida internazionali».
- **Voce «IDE» nel glossario,** fra «Happy path» e «Lint». L'acronimo compariva una volta sola nella guida, in «Comandi e subagent per il design», senza essere spiegato da nessuna parte. La voce dice cosa tiene insieme un IDE, nomina VS Code e Cursor come esempi e ricorda che Claude Code ci gira dentro come estensione.
- **`pedrobalsa/balsa-ui` fra le librerie e i kit di componenti UI,** subito dopo `shadcn-ui/ui` perché ne condivide l'idea del codice che si copia nel progetto. Un centinaio di componenti per Vue 3 e React 19, con lo stesso comando in entrambi i framework, e una specifica in JSON per componente ricavata dal sorgente, con cui l'agente cerca per intento e installa senza passare dalla documentazione. Testo della voce scritto dall'utente.
- **Sesto tema in «Prossimi argomenti», il loop engineering,** con i quattro tipi di loop distinti per innesco e criterio di arresto e il gradino che si sale cedendo prima la verifica, poi la condizione di arrivo, poi l'innesco. Il rimando è a «Human-in-the-loop».
- **Settimo tema in «Prossimi argomenti», la ricerca UX con l'AI,** dalla scala di maturità che porta dall'automazione dei compiti singoli al lavoro di sistema fino alla scelta fra Claude, Claude Cowork e Claude Code, che stanno in tre momenti diversi di una ricerca e hanno tre regimi diversi sui dati dei partecipanti. Il rimando è a «UX.md», di cui questo tema è il gradino a monte.
- **Il perimetro del settimo tema in `docs/MEMORY.md`,** con le due fonti fornite dall'utente, la mappa di Kate Towsey per The ResearchOps Review e la guida di Brittany Hobbs per Product Impact. Vale la stessa regola degli altri temi, quindi niente voce in `docs/FONTI.md` e niente PDF in `sources/` finché nulla è integrato nel testo.
- **Il perimetro del sesto tema in `docs/MEMORY.md`,** con le tre fonti fornite dall'utente e il posto in cui la sezione andrà a finire, cioè la coda del capitolo «Progettare il contesto». Come le altre diciannove non entrano in `docs/FONTI.md` e non hanno PDF in `sources/`, perché nessun articolo è ancora integrato nel testo.

### Modificato
- **L'apertura di «Prossimi argomenti» non dice più che i temi stanno tutti dalla parte dell'attrezzatura,** perché il loop engineering e la ricerca UX con l'AI sono di metodo. Ora la frase separa i cinque di attrezzatura dai due di metodo e dice in una riga a cosa servono questi ultimi.
- **Il tema «Il versionamento chiesto a Claude» si chiama «Versionamento e backup del progetto»,** titolo dell'utente. Il vecchio nominava lo strumento e non il tema, e chi leggeva l'indice dei prossimi argomenti non capiva di cosa si trattasse. Il nuovo copre le due metà del tema, il versionamento quotidiano e il push automatico. Nel testo del bullet «backup» ha lasciato il posto a «manda tutto sul remoto», per non ripetere la parola del titolo tre righe sotto.
- **Le descrizioni dei sette temi sono più semplici,** su richiesta dell'utente e con le skill di scrittura attive. I periodi lunghi si sono spezzati, le nominalizzazioni sono tornate verbi («dall'inizializzazione del repo» diventa «come si crea il repo») e il bullet sul loop engineering, che apriva con un periodo di sessantacinque parole, ora ne ha cinque brevi. «VS Code e Cursor a confronto» e «Archiviare un progetto su Google Drive» erano già asciutti e non sono stati toccati.

## [2026-08-25]

### Aggiunto
- **`guillermolg00/morphicons` fra le librerie di motion:** un'icona a tratto che passa in un'altra con un'animazione a molla, sui dati di Lucide, Tabler, Heroicons o sui propri tracciati, con le rotazioni ricavate dall'allineamento delle due forme invece che dichiarate a mano.
- **Voce 16 in `docs/FONTI.md`,** *If You Use Claude, You Need This Simple Folder System* di Frank Andrade e Kevin Gargate Osorio (Artificial Corner, 28 giugno 2026), con la riga nel gruppo «File di contesto e formati `.md`» della sezione «Fonti». Le voci da 16 in poi sono rinumerate e i conteggi in testa al file passano a 48. Il PDF sta in `sources/`, stampato da Chrome headless.
- **`docs/NOTE-ORGANIZZARE-IL-PROGETTO.md`,** l'analisi di quell'articolo con il verdetto in testa e cinque candidati di integrazione per la sezione «Organizzare il progetto», due da tenere e tre da scartare, ognuno con l'obiezione che gli si può fare. Il verdetto è che come fonte da integrare vale poco, perché descrive un workspace personale e non un repo. La sezione non è toccata.

- **Hook `post-commit` in `.githooks/`,** che manda su GitHub ogni commit appena chiuso. Serve perché i commit si fermavano in locale e il remoto restava indietro, tre prima di questo giro. Lo script è versionato, ma `core.hooksPath` è configurazione locale: su un clone nuovo va acceso una volta con `git config core.hooksPath .githooks`, altrimenti il file c'è e non parte. Quando il push non riesce, l'hook lo dice e il commit resta in locale, da recuperare a mano. Le due righe che lo spiegano stanno in `CLAUDE.md`, nella mappa del repo e fra le regole.
- **Nota in `docs/MEMORY.md` su come spostare il progetto su Google Drive,** sotto «In sospeso / da valutare». L'unica cosa senza backup è `sources/`, 47 PDF per 118 MB tenuti fuori da git perché il repo è pubblico, e perderla lascerebbe `docs/FONTI.md` a puntare a file che non esistono più. La nota segnala anche che un repo git dentro una cartella sincronizzata si può corrompere e che Drive tiene l'ultima copia, non la storia. Nessuna decisione presa, la valutazione resta aperta.
- **Sezione «Prossimi argomenti»,** prima del glossario, con l'occhiello «In arrivo». Elenca i cinque temi su cui si lavora, tutti di attrezzatura e non di metodo: le skill installate in `~/.claude/skills/`, il governo di MCP, effort, plugin e marketplace dal terminale, VS Code e Cursor a confronto, il versionamento chiesto a Claude e l'archiviazione di un progetto su Google Drive. L'indice sale da 40 voci a 41 e la frase di apertura della guida cambia di conseguenza.
- **`BACKMATTER_KICKER` conosce una terza voce** in `scripts/build.mjs`. Un H2 senza sezioni figlie prendeva l'occhiello «Appendice», che su una sezione di temi futuri diceva la cosa sbagliata.
- **Sezione «Prossimi argomenti» in `docs/MEMORY.md`,** con il perimetro di ognuno dei cinque temi e diciannove fonti di partenza fornite dall'utente. Non entrano in `docs/FONTI.md` e non hanno PDF in `sources/`, perché nessun articolo è ancora integrato nel testo, e la nota lo dichiara insieme a cosa fare quando lo saranno.
- **Badge «In lavorazione» su «Prossimi argomenti»,** con il pallino sulla voce della spalla, come su «UX.md». Era la prima volta su un H2, quindi la classe `flag` è stata estesa alla macro-voce del TOC e il badge nel CSS a `.prose h2`. Il pallino sulla macro-voce azzera il margine destro, perché lì il contenitore è un flex con gap 8px e lo stacco si sarebbe sommato.
- **Il badge ha un corpo fisso di 15px** invece di `.62em`, uno dei nove già in uso nell'interfaccia. Legato al titolo valeva 14,9px su un h3 e sarebbe salito a 20,8px su un h2. Voce nuova in `DESIGN.md`.
- **L'occhiello della sezione è «What next»,** al posto del primo «In arrivo», che accanto al badge «In lavorazione» diceva due volte la stessa cosa.

## [2026-08-24]

### Aggiunto
- **Ricerca nella guida.** Campo nella topbar, prima di «Playbook», con i suggerimenti che si aprono dal secondo carattere. Trova tre cose: le 51 sezioni, le 43 voci di glossario e i 120 repository del catalogo, ognuna con la sua etichetta e il capitolo o la categoria che la contiene. Dal suggerimento si va diritti alla voce in pagina, senza schermata intermedia.
- **L'indice si costruisce nel browser al primo fuoco sul campo,** leggendo il DOM. La guida è una pagina sola, quindi il testo c'è già: incorporarlo come JSON dalla build avrebbe aggiunto un centinaio di KB su 249 e avrebbe potuto disallinearsi dal contenuto. Nessuna libreria esterna. La pagina cresce di 20 KB non compressi, 5 sulla rete: sarebbero stati un centinaio incorporando il testo una seconda volta.
- **Icona `search`**, disegnata da Mattia, sedicesima del sistema e nona nello sprite. Da riportare nel file Figma WTF, dove ancora non c'è.
- **Un `id` su ogni voce di glossario** (43), generato dal termine come quelli dei titoli. Serve alla ricerca per atterrare sulla definizione invece che sulla sezione che ne contiene quaranta, e rende ogni definizione linkabile da fuori.
- **Lampeggio sul bersaglio del salto**, due secondi di velatura `--tint-hover` che sfuma. Su una riga di glossario o di catalogo si arriva in mezzo a quaranta righe uguali e senza un segno non si capisce quale era la propria.
- **Scorciatoie `/` e `⌘K`** portano il fuoco al campo visibile in quel momento; su mobile aprono il pannello e ci mettono dentro il cursore.

- **Rimando all'articolo di Fantasy** in coda a «Rendere il design system leggibile dall'AI»: due paragrafi che dicono cosa aggiunge il caso di studio di Caroline Hilman, cioè che i nomi dei token non si ripensano per il modello e che il risultato lei lo chiama vibe-coded design, e dove il suo metodo diverge dal nostro, cioè l'estrazione in un file unico. Poi la card che porta al pezzo. Non è una sezione nuova, quindi l'indice resta di 40 voci.
- **Card di rimando a un articolo esterno,** immagine da 120px a sinistra, titolo e testata al centro, `arrow-upright` a destra. Stessa forma dei riquadri affiancati, con `--surface`, filetto `--border`, spigolo vivo e ombra. Il bersaglio è tutta la card, quindi il filetto lime del link di prosa si toglie; all'hover cambiano due cose sole, il filetto che sale a `--border-strong` e la freccia, mentre la superficie resta ferma; il fuoco prende l'anello `--accent-line`. All'hover la freccia scarta di 2px in alto a destra, cioè dove punta, ed è il solo movimento della card. Sotto i 700px l'immagine scende a 80px. Nel copia-sezione la card torna come link markdown con la testata dopo la virgola, invece del testo dei due span incollato.
- **`assets/fantasy-caroline-hilman.webp`,** l'immagine dell'articolo ridotta a 360px di larghezza per 120 a schermo, 15 KB.
- **Voce 27 in `docs/FONTI.md`** e riga nel gruppo «Design system leggibili dall'AI» della sezione «Fonti». Le voci da 27 in poi sono rinumerate e i conteggi in testa al file passano a 47. Il PDF sta in `sources/`, stampato da Chrome headless.

- **Due riquadri di esito** in coda a «Checklist pre-richiesta e segnali», al posto dei due paragrafi «Sta funzionando se» e «Sta andando storto se». Stanno su `--surface` con l'ombra `--shadow`, come i blocchi di codice e le tabelle. Icona in alto a sinistra, `check` nel primo e `close` nel secondo, poi il titolo e il testo, che sta un gradino sotto a `.92rem`. Il «se» passa dal titolo all'attacco del testo. Sotto i 700px si impilano.
- **`--ok` e `--ko`, i primi due token semantici,** presi dalle scale Success e Danger del file Figma WTF. Cambiano gradino col tema come `--muted` e `--accent-line`: Success/800 e Danger/600 in chiaro, Success/600 e Danger/500 in scuro. Sono icone e non testo, quindi la soglia è il 3:1 di 1.4.11, e su `--surface-2` stanno fra 4,09 e 7,29. Nel chiaro i gradini alti non servivano, perché Success/500 si ferma a 1,37:1.
- **Due riquadri di confronto in coda a «Deploy del prototipo»,** GitHub Pages e Vercel, al posto del paragrafo «Quale scegliere» che impilava quattro titoletti in grassetto e tre paia di due punti in una riga sola. Stessa forma dei riquadri di esito, ma con il logo del prodotto al posto dell'icona e senza titolo, perché il marchio lo fa già.
- **`assets/logo-github.png` e `assets/logo-vercel.png`,** ridotti a 80px di altezza per 24 a schermo. Restano neri come vogliono le linee guida dei due marchi e sul tema scuro si invertono, con l'inversione spenta in stampa perché un logo bianco su carta bianca non si vede.
- **Voce di glossario «SPA (single page application)»,** con la regola in più che serve a pubblicarne una su un hosting statico. Nella card di GitHub la sigla è sciolta per esteso al primo incontro.
- **Interlinea 1,55 sul gradino `.92rem`,** cioè il testo dei riquadri e la nota dello schema a tre passaggi. L'1,7 della prosa è tarato sui 18px su una colonna larga il doppio.
- **L'icona a 32px dà il tratto 2 senza ridisegnare niente,** perché il disegno da 24 con tratto 1,5 scala esattamente a 2px ottici. Un tratto 2 scritto nel simbolo, a questa misura, sarebbe diventato 2,67.

### Modificato
- **«Il controllo a due vie» diventa «Il doppio controllo»,** nel titoletto di «Enforcement del design system» e nel rimando che gli arriva dallo strato di delivery. Le voci più vecchie di questo changelog tengono il nome di allora.
- **«Una routine che qualcuno possiede» diventa «una routine che qualcuno deve governare».**
- **Riscritto l'attacco di «Una risposta possibile»** in «Rendere il design system leggibile dall'AI». «Cambia un ruolo che esiste già invece di crearne uno nuovo» faceva capire poco: chiedeva al lettore di tenere insieme due ruoli ipotetici prima di sapere di chi si parlasse. Ora la figura si nomina subito, chi mantiene il design system, e lo spostamento del mestiere viene dopo, in una frase sua.
- **Su mobile il campo entra in cima al pannello a pieno schermo,** a tutta larghezza, e i risultati prendono il posto dell'elenco dei capitoli invece di sovrapporglisi. La CTA in coda passa a tutta larghezza.
- **Le voci di elenco hanno uno `scroll-margin-top`** di 84px. Senza, un salto della ricerca su una riga di glossario o di catalogo la faceva atterrare sotto la topbar appiccicata.
- **Il testo di una sezione si ferma al primo titolo di qualunque livello** e non ripete ciò che è già indicizzato per conto suo. Prima un capitolo si prendeva anche il testo delle sue sezioni e ogni parola usciva due volte nei risultati; la sezione «Glossario» ripeteva tutte le definizioni e le categorie del catalogo tutte le righe dei repository.
- **«Buona lettura»** chiude con `( ͡ʘ ͜ʖ ͡ʘ)` al posto dell'emoji del libro.
- **Il pannello mobile copre davvero tutto.** La topbar sta sopra il pannello perché ospita il pulsante che lo chiude, ma il suo fondo è velato all'84% con un blur, quindi a pannello aperto ci si vedeva attraverso la pagina che scorre. Aperto, il fondo diventa pieno.
- **Il pannello scorre per conto suo.** `overscroll-behavior: contain` e blocco dello scroll del `body`: arrivato in fondo all'indice, lo scroll passava alla pagina sotto, che si muoveva mentre credevi di muovere il menu.
- **Nel pannello mobile la macro-voce è un interruttore.** Il secondo tap sullo stesso capitolo lo richiude, invece di riportare la pagina dov'è già. Il tap che chiude non fa saltare la lettura: la pagina resta dove il primo tap l'aveva messa. Su desktop non cambia niente, perché lì la spalla è alta quanto la finestra e un capitolo resta sempre aperto.
- **Il pannello mobile si apre con tutti gli accordion chiusi.** I dieci capitoli stanno in una schermata sola: con uno aperto la lista sforava di 380px e per vedere cosa c'era sotto bisognava scorrere subito. Su desktop il primo capitolo resta aperto di default, perché lì la spalla è alta quanto la finestra. Il capitolo in lettura resta segnato in lime anche da chiuso.
- **Un gruppo chiuso restava alto 380px.** La transizione su `grid-template-rows` non partiva, perché il cambio arrivava nello stesso fotogramma in cui il pannello entra da destra, e la riga restava incastrata al valore aperto. Ora la chiusura all'apertura del pannello avviene senza animazione. Le tracce sono passate anche a `minmax(0, …)`: con `auto` come minimo la riga non scendeva sotto il contenuto minimo delle voci, da quando le sotto-voci hanno un `min-height` da dito.
- **Lo scrollspy non espande più niente a pannello aperto.** Un tocco per scorrere fa scattare `releasePin`, e da lì un accordion si apriva sotto il dito.
- **Il fondo del pannello mobile lasciava vedere la pagina.** Il pannello aveva `inset: 0` e `height: 100dvh` insieme: con un'altezza esplicita il `bottom: 0` non conta più, e mentre la barra del browser si ritrae il box resta corto. Ora la misura la dà solo `inset: 0`. Serve anche `align-self: stretch`, perché lo `start` che la spalla desktop usa come cella di griglia impediva lo stiramento e faceva tornare l'altezza a fit-content. Il padding basso tiene conto della barra di casa dell'iPhone con `env(safe-area-inset-bottom)`.
- **Spaziature della coda del pannello.** Prima 18px sopra e 18 sotto il filetto, che sotto diventavano 32 ottici per la centratura del link, quindi il divisore era schiacciato verso la CTA. Ora 40px separano l'ultimo capitolo dalla CTA, e il filetto sta fra 24 sopra e 26 ottici sotto: il link «Playbook» è alto 44 con dentro una riga da 15, e quei 14,5px di centratura vanno contati.
- **Misure da dito nel pannello mobile.** Nessun bersaglio arrivava al minimo: macro-voci a 35px, sotto-voci a 31 e per giunta attaccate senza un pixel fra l'una e l'altra, campo e CTA a 38, pulsanti della topbar a 38. Ora le macro-voci, la CTA e il campo stanno a 48 (soglia Material), le sotto-voci, «Playbook» e i due pulsanti della topbar a 44 (soglia Apple), e fra due bersagli adiacenti restano almeno 4px. Sopra i 1024px non cambia niente, perché lì l'indice è denso e si usa col mouse.
- **«Playbook» va a destra nel pannello,** staccato dalla CTA da un filetto a tutta larghezza. È un link fuori dalla guida, non un'altra azione sulla guida, e il filetto è il modo in cui il sito separa le cose.
- **In focus il campo di ricerca cambia il filetto invece di prendere l'anello.** Il token è `--accent-line`, perché il lime 400 pieno sul fondo chiaro fa 1,13:1 e la riga sparirebbe; un'ombra da 1px dello stesso colore ne raddoppia lo spessore senza spostare niente.
- **Riscritto un titoletto del capitolo 2.** «Le prime trenta righe pesano più di tutte le altre» diceva due volte la stessa cosa insieme alla frase che seguiva, e il paragone fra le prime trenta e «tutte le altre» era ambiguo. Ora è «Le prime trenta righe orientano la lettura di tutto il resto».

- **«Tenere sano il contesto nel tempo» diventa «Mantenere il contesto nel tempo»,** con i tre rimandi interni e la voce d'indice allineati.
- **«mestiere» diventa «compito»** ovunque compaia nella guida: i due `CLAUDE.md` hanno «due compiti diversi», tenere gli appunti è «il compito di `SESSIONS.md`», e l'ipotesi sul ruolo di chi mantiene il design system è «un'ipotesi sul compito».
- **«La domanda che seleziona» diventa «Cosa ci va dentro»** dentro la sezione «CLAUDE.md». Il titoletto precedente non diceva niente a chi legge in italiano.
- **«Se parti da zero» apre un ordine per «un flusso standard di design»** invece che per «un product designer». I cinque passaggi, prima numerati dentro il paragrafo con i punti e virgola, sono un elenco numerato vero.

### Rimosso
- **La sezione «Dare struttura al contesto»** del primo capitolo. Le sue tre regole riguardavano i nomi dei file e delle skill, ma arrivavano prima che il lettore avesse incontrato gli uni o le altre, e l'esempio (`account-support`, `customer-help`, `access-workflow`) veniva da un servizio di assistenza clienti e non dal design. Delle tre resta solo la precedenza fra fonti che si contraddicono, spostata in «I file di contesto» come «Dichiara quale file vince», dove i file di cui parla sono già sul tavolo.

### Corretto
- **La X di svuotamento restava a vista a campo vuoto.** La regola `.search-clear { display: flex }` batteva lo stile che l'attributo `hidden` porta da sé. Aggiunto `[hidden] { display: none !important; }`, che chiude la stessa classe di errore per tutto il documento.
- **`aria-activedescendant` puntava a un `<button>` dentro il `<li role="option">`,** quindi a un elemento che opzione non era. Ora l'opzione è il `<li>` stesso.

## [2026-08-23]

### Aggiunto
- **`CLAUDE.md` e `DESIGN.md` in radice.** Il repo che insegna a scriverli non ne aveva nessuno, e le regole vincolanti vivevano sparse fra `docs/MEMORY.md` e la memoria di sessione. `CLAUDE.md` tiene pipeline, comandi, le regole che non si rompono e le convenzioni editoriali; `DESIGN.md` tiene il design system con i valori verificati contro il file Figma, le deviazioni motivate e il debito noto.
- **Blocco di stato generato in `docs/HANDOFF.md`.** Fra i marcatori `<!-- stato:inizio -->` e `<!-- stato:fine -->` la build riscrive parole, capitoli, sezioni, voci d'indice, fonti e peso della pagina. I numeri scritti a mano si erano sfasati due volte: il file diceva «quattro capitoli» quando erano sei da due giorni.
- **`BUILD_DATE` per la data del piè di pagina.** `BUILD_DATE=2026-08-24 npm run build` pubblica una revisione datata al giorno in cui va online invece che al giorno del build. Senza la variabile vale la data di oggi, come prima.
- **Undici repository in catalogo,** ricavati sciogliendo le due sezioni-appendice e le righe compatte: `vercel-labs/agent-skills`, `mblode/agent-skills`, `shadcn-ui/ui`, `VoltAgent/awesome-design-md`, `kaokaohate/design-system-extractor`, `ceorkm/mobile-app-ui-design`, `HermeticOrmus/LibreUIUX-Claude-Code`, più le descrizioni per `agno-agi/agno`, `google-gemini/gemini-cli`, `jackwener/OpenCLI` e gli altri nomi che stavano nudi.
- **Regola sulle icone:** se ne serve una che il file Figma WTF non ha, si chiede a Mattia e la disegna lui. Scritta in `CLAUDE.md` e in `DESIGN.md`.

### Modificato
- **Cartelle.** `src/` per contenuto e template, `scripts/` per build e PDF, `docs/` per memoria, changelog, fonti e handoff. La radice passa da undici elementi a nove e tiene solo ciò che si legge per primo. Percorsi aggiornati in `scripts/build.mjs`, `deploy.sh`, `package.json` e nei file di `docs/`.
- **`SESSIONS.md` è diventato `docs/HANDOFF.md`,** senza la sezione «Fatto in questa sessione», che era un diario e duplicava questo changelog.
- **Icone in un posto solo.** `ico-sun` e `ico-moon` prendono i nomi del sistema, `ico-mode-light` e `ico-mode-dark`. Il chevron dell'indice stava inline in `scripts/build.mjs` ed è entrato nello sprite come `ico-chevron-down`, con la misura spostata in `.toc-chev`. Restano nove icone in due posti, perché `arrow-right` è una maschera CSS e uno pseudo-elemento non può puntare a un `<symbol>`.
- **CTA della spalla:** padding verticale da 12 a 8px e l'etichetta che torna ai 15px del bottone di sistema, togliendo l'eccezione a 14px. La pillola scende da 46 a 38px di altezza.
- **Il catalogo ha una forma sola,** una riga per repository con la sua descrizione. Le due sezioni «Starter pack di skill per product designer» e «Skill UI/UX con comando» erano tabelle di nomi commerciali senza link, e le cinque righe compatte tenevano undici repository ammucchiati con due parole a testa.
- **Un canale di pubblicazione solo.** Il workflow GitHub Pages è stato eliminato: le build erano in coda da luglio senza mai partire, quindi il canale non è mai stato verificato e teneva in vita una cartella `dist/` e un secondo percorso di build.
- **`awesome-design-md` corretto:** i prodotti analizzati sono 73, non 55, e non è una skill con uno slash command ma una raccolta di file `DESIGN.md` da copiare nella radice del progetto.

### Rimosso
- **L'etichetta «Indice»** nella spalla. Il nome della regione resta l'`aria-label` dell'`<aside>`, quindi per uno screen reader non cambia niente.
- **La riga «UX UI Mastery».** Non corrisponde a nessun repository rintracciabile, e nell'articolo di origine il suo nome e il suo comando non combaciano con quelli della riga accanto. Quello che descriveva è coperto da `nextlevelbuilder/ui-ux-pro-max-skill` e da LibreUIUX.
- **Tre comandi d'installazione morti.** `giuseppe-trisciglio/developer-kite` non esiste su GitHub, e `mblode/agent-skillse` e `vercel-labs/agent-skillse` avevano una «e» di troppo.
- **`dist/` e il workflow Actions,** con la riga `dist/` tolta dal `.gitignore`.

## [2026-08-22]

### Aggiunto
- **Palette Lotrek, presa dal design system e non dedotta.** Il file Figma WTF (`29FQjdxBn7fesbU3NJkDxM`) porta quattro scale nominate da 50 a 950, Electric Lime, Shark, Edward e Nebula, più una palette semantica. Tutti e tredici i token dei due temi ora poggiano su un gradino vero di quelle scale. I portanti: fondo `#f3f8f7` Nebula/50, inchiostro `#232323` Shark/950, accento `#cbfb0e` Electric Lime/400.
- **Icone del design system**, sezione Icons del file WTF (nodo `1:427`), 24×24 a tratto 1,5 con `stroke-miterlimit: 10` e nessun raccordo arrotondato. Sostituiscono le Lucide, che erano a tratto 2. In uso: `copy`, `link`, `check`, `chevron-down`, `close`, `arrow-right`, `arrow-upright`, `mode-dark`, `mode-light`.
- **Tooltip** su copia sezione, copia link e menu, in forma di breadcrumb Lotrek: raggio 4px, spaziatura 8/12, corpo 13px. Al click la copia diventa «Copiato» insieme alla spunta. I `title` nativi sono stati tolti dai pulsanti che hanno un `data-tip`, altrimenti se ne vedevano due.
- **Componente CTA** ricalcato su `.btn__primary` del sito: pillola a 100px e l'etichetta che ruota all'hover, con tre `<span>` dentro un `<p>` che li ritaglia. Sotto i 1024px la rotazione non c'è, come su lotrek.it.
- **PDF scaricabile dell'intera guida**, con la CTA in coda all'indice. `make-pdf.mjs` stampa `index.html` con Chrome headless e un nuovo blocco `@media print` decide la resa: tema chiaro su bianco anche se lo schermo sta in scuro, niente interfaccia, ogni capitolo su pagina nuova, titoli che non si staccano dal testo. Esce a 83 pagine e circa 2 MB, e si rigenera a ogni pubblicazione su entrambi i canali.
- **Link «Playbook»** nella topbar verso `docs.lotrek.net`, con la freccia in alto a destra del design system. Su mobile esce dalla topbar ed entra nel pannello a pieno schermo, sotto la CTA.
- **Immagine di apertura** fra il titolo e il lede, con 32px sopra e sotto. WebP a 1520px e q84, 67 KB contro i 501 del PNG originale.
- **Otto repository in catalogo**: `Checklist-Design/skills` e `vercel/vercel` fra le skill, `anime`, `motion`, `scrollama`, `locomotive-scroll`, `swiper` e `Chart.js` fra le librerie. Gli ultimi due c'erano già come nomi nudi dentro righe compatte e ora hanno una voce descritta.
- **Cinque token nuovi**: `--w-regular` (il 400 di Ronzino finiva scritto a mano), `--code-tint` e `--code-line` per il codice inline, `--tint-hover` per l'hover neutro, `--ico-arrow-right` per la freccia come maschera CSS.

### Modificato
- **Occhielli.** Lotrek non ha maiuscoletti nel sistema e stringe sempre, da −.03em sui titoloni a −.005em sui micro-testi. I quattro occhielli passano al tondo alto/basso a 16px con crenatura negativa, in inchiostro pieno e a peso Regular: con l'inchiostro il Medium li faceva pesare quasi quanto il titolo che introducono.
- **Tema a due stati**, chiaro e scuro. L'opzione «sistema» è sparita e la preferenza del sistema decide solo la prima visita. L'inizializzazione è passata in uno script nel `<head>`, perché senza il caso «auto» nel CSS chi ha il sistema in scuro avrebbe visto lampeggiare la pagina chiara.
- **Il fondo scuro** era `#0c1a1f`, un blu-verde senza corrispondenza nel brand. Ora è Shark/950 `#232323`.
- **Mobile rifatto sul sito**: pillola «Menu» a sinistra del tondo della modalità, che si stringe a cerchio con la X quando il pannello è aperto, e la spalla che entra da destra a pieno schermo in 500ms.
- **Angoli.** Lotrek usa due raggi soli, `0` e `100px`. Frame, tabelle, blocchi di codice e immagini vanno a spigolo; voci dell'indice, chip di codice e tooltip stanno a 4px; restano le pillole e i cerchi.
- **Una superficie sola.** Topbar e spalla non sono più un gradino sotto la colonna di lettura: a separarle è il filetto, come sul sito.
- **Il filetto dei link** passa a Electric Lime/500 `#b1e201`. Il 400 puro sul fondo chiaro fa 1,13:1 e sparisce.
- **Il lime dice una cosa sola.** La velatura faceva insieme stato attivo, hover e fondo del codice, tre mestieri con esigenze opposte. Ora la voce selezionata prende il lime pieno con l'inchiostro sopra a 12,98:1, l'hover è Nebula/100 e il codice inline sta nella famiglia del fondo.
- **Nove frasi riscritte** perché goffe o illogiche, fra cui «Quanto di questo serve adesso», «Come si gonfia, una regola alla volta», «Potare fa parte della manutenzione» e «Il responsive si scrive in prosa».
- **«task» diventa «richiesta»** in quattordici occorrenze su diciassette. Nelle altre tre voleva dire unità di lavoro e non prompt, quindi sono diventate «passaggio», «lavorazione» e niente.
- **Il blocco «Comando vs contesto»** è ora «Comando e contesto», riscritto in prosa piena al posto delle frecce.
- **Comandi di copia a 20px** invece di 16, con il pulsante da 28 a 32 e il bersaglio dell'hover tondo.

### Rimosso
- **`repass.io.md`**, il design DNA di riferimento da cui era partito il progetto. Ogni suo valore è stato sostituito dal sistema Lotrek e la coppia tipografica che proponeva non è mai stata adottata.
- **Il cancelletto sui titoli**, che faceva lo stesso mestiere del pulsante «Copia il link» accanto.
- **Il paragrafo «Documentare il design system in markdown»** e lo schema «Button rules» dal capitolo 2: erano una versione povera di quello che il capitolo 4 fa per esteso con i tre strati e i registri. Al loro posto un rimando.
- **Il token `--accent-wash`** e l'unico `color-mix` rimasto in tutto il foglio di stile.

### Corretto
- **Il pulsante «Menu» non compariva a nessuna larghezza.** Era rimasta la regola `#menuBtn { display: none }` nel blocco base, e un ID batte una classe, quindi la regola mobile non poteva vincere.
- **La coda della «g» nella CTA era tagliata.** Il `<p>` ritagliava all'altezza di una riga con `line-height: 1`, che per definizione esclude i discendenti.
- **Lo stato attivo dell'indice perdeva il colore** sul lime, perché `.toc-group.open > .toc-macro` viene dopo nel foglio e riportava il testo a `--ink`, illeggibile in tema scuro.
- **`.flow3-step` era rimasto maiuscoletto** con crenatura positiva `.09em` e usava `--accent-ink`, che è il token dell'inchiostro sopra il lime, come colore di testo normale.

### Da sapere
- **Il PDF si rigenera a ogni pubblicazione**, perché `deploy.sh` e il workflow di Actions chiamano `make-pdf.mjs` prima di preparare i file. Il file è gitignored, come `index.html`.
- **La scala Shark si ferma a 950.** Sotto il fondo scuro non c'è nessun gradino, quindi `--surface` e `--surface-2` del tema scuro restano gli unici due valori interpolati di tutta la palette.
- ⚠️ **Nel file Figma `mode-dark` e `mode-light` erano lo stesso cerchio vuoto**, poi corretti in due semicerchi speculari. Se un'icona sembra sbagliata, conviene riscaricare il nodo prima di metterci una toppa nel CSS.

## [2026-08-21]

### Aggiunto
- **Struttura a sei capitoli.** Il vecchio capitolo 2 valeva il 58% della guida e teneva insieme due cose che non si parlavano: i file di contesto e il lavoro con Figma. Adesso sono capitoli distinti, e i temi del design system e della prototipazione hanno un capitolo loro. L'ordine è «Progettare il contesto», «Scrivere il contesto», «Collegare Claude e Figma», «Il design system per l'AI», «Costruire e pubblicare un prototipo», «Lavorare con le Claude Skills». L'equilibrio passa da 12/58/16/5 a **10/26/16/10/10/15**.
- **Sezione «CLAUDE.md»**, che mancava del tutto: progetto contro globale con l'errore di mescolarli, `/init` più i due passaggi che rendono utile la bozza, il peso delle prime trenta righe, quali sezioni mettere, regole ferme e anti-pattern separati, il limite delle duecento righe, i file annidati e la regola dei conflitti, `/insights` per misurare se funziona, e la potatura con cinque domande.
- **Sezione «Dal codice al canvas e ritorno»**, sul giro completo fra Claude e Figma introdotto da Code to Canvas a febbraio 2026, con i quattro passaggi e l'avvertenza che quello che arriva su Figma non è mai perfetto al primo colpo.
- **Rimandi interni cliccabili.** Nel sorgente restano scritti in guillemets e `build.mjs` li trasforma in link all'ancora, togliendo le virgolette. Sono 53. La build stampa un avviso quando un rimando somiglia a una sezione ma non la centra, quindi una rinomina non lascia più vicoli ciechi.
- **Introduzione riscritta** come panoramica completa: sette voci fra strumenti e temi, con GitHub e Vercel che prima non comparivano prima del capitolo finale.
- **Un esercizio** in coda a «Requisiti minimi di partenza», l'unico della guida: prendi un compito che daresti all'AI, scrivi cosa hai da darle sui quattro punti, e quello che non riesci a riempire è il motivo per cui l'output tornerà generico.
- **Cappelli su tutti e sei i capitoli.** Due non ne avevano affatto.
- Quattro fonti nuove, da 42 a 46 documenti: l'annuncio Figma di Code to Canvas, l'analisi Muz.li, il tutorial in quattro passi di Nick Babich e la misura sul consumo di token di Adam Jacob.

### Modificato
- **Glossario da 12 a 43 voci, in ordine alfabetico.** I termini tecnici usati nel corpo e spiegati da nessuna parte erano 29, ora sono zero. Sono entrate le parole che fermano chi comincia: repo, commit, build, canvas, frame, plugin, marketplace, front matter, YAML, lint, CLI, Dev Mode, agente, subagent, deploy, edge case, happy path, scope.
- **Confronto prima del setup**: «Tre modi di collegare Figma a confronto» viene ora prima di «Setup e loop con Figma MCP», così si sceglie lo strumento e poi lo si configura.
- **Le cinque sezioni sulle librerie diventano una**, «Librerie per asset ed effetti», con le famiglie come sottotitoli.
- **Capitolo 1 da 2.105 a 1.896 parole.** «Dare struttura al contesto» scende da 406 a 168 (via i quattro pilastri e l'esempio dell'assistenza clienti), «Tenere sano il contesto nel tempo» da 314 a 178 (restano le due mosse che dipendono da te, il resto lo fa lo strumento), «Checklist pre-task» diventa una checklist vera invece di tre paragrafi con i punti e virgola. «Tecniche di prompting» e «Framework di prompting» si fondono in «Scrivere una richiesta».
- **Sezioni rinominate:** «Il contesto visivo» → «DESIGN.md», «Il contesto di UX» → «UX.md», «Le skill ufficiali di Figma» → «Le skill Figma per Claude Code», «I quattro livelli del contesto» → «Requisiti minimi di partenza», «Struttura di file e cartelle» → «Organizzare il progetto».
- **Riferimenti agli autori tolti dal corpo**, undici su dodici. Restano solo dove identificano uno strumento, non una tesi. Gli autori sono comunque tracciabili nelle fonti.
- **Il prompt pack non è più un blockquote.** Era l'unico della guida e il CSS lo rendeva come citazione, grigio e in corsivo, contro la convenzione che vieta il corsivo. Ora è testo normale.
- **Lo schema dei tre strati è in HTML**, tre card responsive, al posto dell'arte ASCII in un blocco di codice: 67 caratteri di larghezza che su mobile scorrevano in orizzontale, con il confronto a tre che spariva.

### Rimosso
- **Tre duplicazioni.** La regola sui nomi dei token era insegnata per esteso tre volte con tre esempi diversi, ora sta una volta sola in «DESIGN.md». Stessa cosa per il limite delle duecento righe e per gli stati dei componenti. Delle sette ripetizioni misurate, quattro erano falsi positivi, cioè la stessa parola per cose diverse.
- **Le sezioni consigliate del `CLAUDE.md`** stavano in due posti e mancavano dalla sezione che insegna a scrivere il file. Spostate lì, con rimando dagli altri due.
- Il paragrafo su UX-context design, il paragrafo su DesignAgent nell'elenco dei formati (già coperto dal catalogo), «Il collegamento al sistema vivo», la sotto-sezione sulla frequenza di lettura dei file e la voce di glossario «UX-context design», rimasta orfana.

### Corretto
- **La voce attiva della spalla laterale illuminava sempre la sezione precedente a quella cliccata.** Lo scrollspy confrontava i titoli con una costante di 90px presa dallo `scroll-padding-top`, ignorando lo `scroll-margin-top` di ogni titolo (76, 84 o 108px), che si somma: dopo un salto d'ancora il titolo si ferma a 174px e per lo scrollspy non ha ancora passato la linea. Misurato su quattro bersagli, quattro su quattro sbagliati. La linea si calcola ora per titolo dai valori reali della CSS.
- **I capitoli si aprivano e chiudevano durante un salto.** Dopo un click lo scrollspy veniva zittito per 700ms fissi, mentre uno smooth scroll lungo su questa pagina dura fino a 1.635ms. Ora il click aggancia la voce e la rilascia su `scrollend`.
- **`smartQuotes` distruggeva gli attributi HTML**, trasformando `class="flow3"` in `class=&rdquo;flow3&rdquo;`. Saltava già il codice inline, ora salta anche i tag.
- **Doppia sottolineatura sui rimandi interni**: allo stile di casa, fatto con un gradiente che si ritrae all'hover, ne era stato aggiunto sopra un `border-bottom` che restava fisso. Lo stile in più è stato tolto.

### Da sapere
- **I riferimenti interni si scrivono in guillemets e diventano link in fase di build.** Il testo dentro deve corrispondere esattamente al titolo della sezione, backtick esclusi. Se non corrisponde a nessuna sezione resta testo, e la build lo segnala solo quando somiglia molto a un titolo esistente, così le citazioni normali non fanno rumore.
- **Il lede dell'hero ha la stessa dimensione del corpo del testo**, 18,56px. Rimpicciolire una lista lì dentro per far stare l'hero sopra la piega non serve: fra il corpo più piccolo e quello giusto ballano 70px, e il primo capitolo resta sotto la piega comunque.

## [2026-08-20]

### Aggiunto
- **«Rendere il design system leggibile dall'AI» diventa la sezione portante del capitolo 2**, da 349 a 1.207 parole, integrando [How to Make Your Design System Agent-Ready](https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270) di Eva Nudea Hörner (Design Bootcamp, 13 agosto 2026). Prima la sezione si fermava ai token, cioè allo strato dell'aspetto; ora copre il percorso completo **authoring → specification → delivery**, che è il vero argomento del capitolo.
- **Due schemi invece di uno.** Il primo mette i tre strati in **tre colonne** (nome, fonte di verità, cosa contiene, cosa risolve) con le frecce fra le intestazioni, dove sta davvero il flusso. Il secondo è **l'albero della cartella `design-system/`**, nell'idioma già usato in «Struttura di file e cartelle», e mostra dove vivono `tokens.json`, `DESIGN.md`, i tre registri e le spec per oggetto.
- Prima era un blocco solo con tre riquadri impilati, scartato dopo averlo misurato: **47% dell'inchiostro era cornice**, il 59% delle celle era vuoto, e il glifo `|` faceva due mestieri diversi (44 volte parete, 7 volte connettore di flusso). Un blocco stava facendo due lavori, il flusso degli strati e la gerarchia dei file, e li faceva peggio entrambi.
- **Lo strato delle specifiche**, che alla guida mancava del tutto: i registri `components.md`, `patterns.md` e `templates.md` fanno da mappa, e le regole vere stanno in un file per oggetto con l'estensione che ne dichiara la famiglia (`button.component.md`, `dialog.pattern.md`, `wizard.template.md`). Un template referenzia i suoi pezzi invece di ridefinirli.
- **Esempio completo di `wizard.template.md`** con le cinque intestazioni che valgono da modello per qualunque spec, cioè Purpose, Dependencies, Behaviour, Actions e Accessibility, più il paragrafo che spiega cosa va in ognuna.
- **La diagnosi del «quasi giusto»** in apertura, che è il secondo modo di sbagliare e il più difficile da vedere: hover sbagliato, colore usato per un significato che non è il suo, spaziature fuori regola, gerarchia primaria/secondaria a intermittenza. Codice funzionante in pochi minuti che semplicemente non è il tuo sistema.
- **Il motivo per cui le spec stanno su più file invece che in un `DESIGN.md` enorme**, agganciato a «Il contesto è una risorsa finita»: con i registri l'agente recupera solo il ramo che gli serve, invece di caricare l'intero design system a ogni richiesta.
- **Lo strato di delivery** con il movimento dal prodotto verso il file, cioè l'agente che trova gli scostamenti dal sistema e li propone come pull request, con revisione e merge in mano a una persona. Rimanda al controllo a due vie di «Enforcement del design system».
- **La domanda aperta su chi mantiene le specifiche**, dichiarata come irrisolta anche dalla fonte, con il vincolo che ne deriva: le spec vanno trattate come codice, quindi versionate, revisionate e sincronizzate da qualcuno che se ne assume la proprietà.
- Fonte nuova in `content.md` e voce **19** in `FONTI.md`, che passa da 34 a 35 documenti (le voci da 19 a 34 slittano di uno).

### Modificato
- **I token passano da «tre livelli» a «tre tier»**, così il numero tre resta libero per gli strati authoring/specification/delivery. Le tre voci dell'elenco perdono il doppio due punti che avevano (`**Tier 1: Primitive:**` → `**Tier 1, primitive:**`).
- **`FONTI.md` dichiara la regola nuova** in testa alla sezione «Manutenzione»: ogni articolo integrato nella guida entra sia lì sia nella sezione «Fonti» di `content.md`, anche quando il PDF non si riesce ad archiviare. In quel caso il campo `File:` dichiara perché manca.

### Da sapere
- **I caratteri box-drawing non stanno in IBM Plex Mono.** Il fallback li disegna a 8,70px contro gli 8,27px della cella mono: `┌ ─ ┐ ┬ ┼ ▼ →` e anche il `·` sono più larghi del 5%. La regola che ne esce non è «vietati», è che **il numero di glifi Unicode deve restare quasi uguale su ogni riga del blocco**, perché lo scarto è di 0,43px a carattere. Un albero di cartelle sfasa di 1 carattere fra un livello e l'altro e non si vede; la riga di bordo di un riquadro ne ha decine in più della riga di contenuto e sfasa di ~8px. Lettere accentate, caporali e apostrofo tipografico sono a larghezza giusta.

## [2026-08-18]

### Aggiunto
- **Capitolo 1 rifatto e rinominato «Progettare il contesto»** (era «Context engineering e prompting»). La spina dorsale è ora la progressione che NN/g descrive, prompt engineering → context engineering → context architecture: la formulazione della richiesta, poi la cura di cosa entra nella finestra, poi la struttura dell'ambiente informativo in cui l'agente ragiona. Il terzo stadio mancava del tutto e il prompting era trattato come tema parallelo invece che come tecnica del primo. Da 908 a 1.906 parole, dall'8% al 15% della guida.
- Nuova sezione **«Il contesto è una risorsa finita»**, che assorbe e sostituisce «Context rot». Spiega il meccanismo invece dei soli rimedi: nei transformer ogni token guarda ogni altro token, quindi con n token le relazioni sono n² e l'attenzione si diluisce man mano che la finestra si riempie. Il degrado è un gradiente e non un muro, cioè il modello resta capace sui contesti lunghi ma perde precisione nel recupero e nel ragionamento a lungo raggio. Il context rot resta come nome del fenomeno, con le quattro contromisure di prima.
- Nuova sezione **«Dare struttura al contesto»** coi quattro pilastri di Paz Perez: gerarchia, categorizzazione ed etichettatura per strutturare; tassonomia, vocabolario controllato e nomi non ambigui per rendere trovabile; ontologia e allineamento ai modelli mentali; classificazione a faccette, regole di ambito e politiche di conservazione per la memoria. L'esempio delle tre skill che si sovrappongono (`account-support`, `customer-help`, `access-workflow`) parla direttamente al catalogo del capitolo 3.
- Nuova sezione **«Tenere sano il contesto nel tempo»** con le quattro strategie di Anthropic: compaction, note fuori dalla finestra, sub-agenti che bruciano decine di migliaia di token e ne restituiscono mille o duemila, e recupero just-in-time con la strategia ibrida di Claude Code (`CLAUDE.md` caricato subito, `glob` e `grep` per il resto).
- Voce **Context architecture** nel glossario e due fonti nuove, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) di Anthropic (settembre 2025), finora citata per una frase sola senza comparire nell'elenco, e [Context Architecture](https://www.nngroup.com/articles/context-architecture/) di Paz Perez per NN/g (giugno 2026).
- In **«I quattro livelli del contesto»** una riga che dichiara cosa è quella lista, cioè ciò che tocca a chi progetta portare, distinta dalla mappa di tutto quello che occupa la finestra. I due elenchi vengono da fonti diverse e prima si somigliavano abbastanza da confondersi.
- Nuovo capitolo **«Librerie per prototipare»** (Capitolo 4, fra «Lavorare con le skill» e il Glossario), con i quattro blocchi che skill non erano: *Fondamenta e asset*, *Librerie e kit di componenti UI*, *Motion, animazioni e scroll*, *Suono e feedback audio*. Il criterio della divisione: nel capitolo 3 sta ciò che istruisce l'agente, nel 4 ciò che finisce dentro il prototipo. Il capitolo delle skill scende da 12 a 8 categorie e torna a contenere solo skill.
- Nuova categoria **«Effetti e transizioni»**, estratta da Motion: con i quattro tutorial nuovi i Codrops erano diventati otto voci schiacciate in due righe, di cui una sola URL collettiva a `github.com/codrops`. Ora ogni demo ha il suo link e la sua riga, e i tutorial dei singoli autori sono un elenco invece di un paragrafo dentro un punto elenco.
- **14 repository nuovi nel catalogo skill**, dalle stelle GitHub non ancora catalogate: `wshobson/agents` e `zarazhangrui/frontend-slides` (quest'ultima era citata per nome nel capitolo 2 senza mai avere un link) e `DietrichGebert/ponytail` in *Collezioni*; `southleft/ds-contracts-poc`, `DirectedEdges/specs`, `marvkr/better-design` e `tt-a1i/archify` in *Design system*; `sherizan/designagent` coi tre plugin `-brand`, `-design`, `-voice` e `alima-max/prototype-to-figma-skill` in *Ponte con Figma*; `conorbronsdon/avoid-ai-writing` in *UX writing*; `Suleiman19/ai-design-buddy` e `LewisLiu007/full-page-screenshot` in *Agenti e infrastruttura*.
- **9 repository nuovi nel capitolo delle librerie**: `lucide-icons/lucide` (le icone con cui è fatta questa guida), `Jakubantalik/Libraries`, `rexa-developer/tiks`, `codrops/ModalWindowEffects` e quattro tutorial Codrops.
- **`./deploy.sh preview`**: stessa build, `vercel deploy` senza `--prod`, più un alias fisso su **kb-design-ai-preview.vercel.app** che punta sempre all'ultima anteprima. Senza l'alias ogni deploy nasce con un URL usa e getta, e chi riapre il link di ieri guarda una versione vecchia credendola aggiornata. La produzione su `kb-design-ai.vercel.app` non viene toccata.

### Modificato
- **Voce `sherizan/designagent-figma` riscritta come coppia**: sopra il marketplace `sherizan/designagent`, da cui si installano i plugin che scrivono e mantengono `DESIGN.md`, `BRAND.md` e `VOICE.md`, sotto il bridge da cui il marketplace è nato. Prima c'era solo il secondo, che è il predecessore.
- **Intro del catalogo skill**: il conteggio passa da «82 repository stellati» a 59, contati sulle URL vere e non a memoria, e l'ultima riga rimanda al capitolo 4 per le librerie. Il totale delle due liste è 106.
- **Apertura e indice manuale** riallineati al nuovo capitolo: «Ti serve per quattro cose», la frase «Come leggerla» che prima si fermava alle skill, e le cinque voci nuove nell'indice in testa a `content.md`.

### Modificato (forma)
- **Riscritti i due paragrafi d'apertura** con dei grassetti sui concetti chiave. Nel primo sono in evidenza le quattro cose per cui la guida serve, nel secondo i tre temi del capitolo 1 e il rimando all'indice laterale. Le quattro parti non sono in grassetto due volte: nel secondo paragrafo restano in tondo, perché ripeterle a distanza di tre righe avrebbe reso l'apertura un blocco di neretto.
- **Capitolo 2 rinominato «Flusso tra Claude e Figma»** (era «Flusso ottimale tra Claude e Figma»). Cambia anche l'ancora, da `#flusso-ottimale-tra-claude-e-figma` a `#flusso-tra-claude-e-figma`.
- **«Il quadro d'insieme» dichiarava tre ruoli e ne mancava uno.** Claude, Figma e le skill c'erano, i file markdown di contesto no, pur essendo l'argomento di metà del capitolo (`I file di contesto`, `Il contesto visivo`, `Il contesto di UX` e la struttura di cartelle valgono circa 3.500 parole su 7.800). Ora i ruoli sono quattro, e quello nuovo sta al secondo posto perché è ciò che l'agente legge prima di fare qualsiasi altra cosa.
- **Il blocco sul design system rimesso in ordine cronologico.** Prima era «Enforcement» → «Rendere leggibile» → «Comandi e subagent» → «Creare una skill»: la regola veniva prima della cosa da regolare, e una sezione su come si guida Claude Code spezzava il blocco a metà. Ora si legge nell'ordine in cui il lavoro si fa davvero, cioè **rendere leggibile il sistema** (token a tre livelli, nomi per ruolo, stati documentati), **impacchettarlo in una skill**, **imporlo** (catena di governance, token binding e QA, controllo a due vie). «Comandi e subagent per il design» scende accanto a «Deploy del prototipo», che è l'altra sezione su come si opera lo strumento invece che su cosa gli si dà da leggere.
- **Riscritto l'attacco di «Enforcement del design system»**, che apriva il blocco e ora lo chiude: da «L'AI sa scrivere su Figma e sa scrivere React» a «Un sistema leggibile e impacchettato in una skill può ancora essere disatteso». La frase sul separare uno strumento potente da uno di cui ti puoi fidare resta, perché regge anche in terza posizione.
- **Via i doppi due punti dai paragrafi con titoletto**, 67 righe riscritte a mano. Dopo i due punti del titoletto la frase ne apriva un secondo, e a volte un terzo, con l'effetto di una prosa a scalini: «Remoto o desktop: il server remoto è quello consigliato (…): è la scelta di default». Ogni caso è stato rifrasato per conto suo, non sostituito meccanicamente, perché quasi sempre il secondo segno introduceva un'enumerazione o una spiegazione che andava sciolta in un'altra forma. Restano i due punti dei titoletti in mezzo al paragrafo, che titoletti sono a tutti gli effetti (`Cosa fa:`, `Come lo fa:`, `Da sapere:`), e quelli dentro i prompt citati, dove fanno parte del testo da scrivere.
- **Via il corsivo da tutta la guida.** I 78 corsivi del sorgente sono spariti: 24 sono diventati grassetto, dove il segno faceva da etichetta (`Cosa fa:`, `Role`, `Do not`, `Dashboard`, `CLI`) o reggeva un contrasto su cui gira il paragrafo (descrizione contro vincolo, il cosa contro il perché, inventare contro prima cerca); gli altri 54 sono tornati in tondo, perché erano termini tecnici e stranieri che il tondo regge benissimo (context engineering, happy path, heartbeat, append-only, i nomi degli stati di un componente). Nell'HTML generato non resta un solo `<em>`.
- **I titoletti in grassetto chiudono con i due punti, non col punto**, poi spazio e minuscola: `**Estensioni facoltative del contesto di progetto:** su progetti più strutturati…`. Erano 42 col punto. Nello stesso passaggio i due punti sono entrati dentro il grassetto anche nei 114 casi che li avevano fuori (`**MCP**: standard` → `**MCP:** standard`), comprese le voci del glossario e gli elenchi di file, così la forma è una sola in tutto il documento. Restano fuori nei grassetti a metà frase, che etichette non sono.
- **Tre categorie del catalogo rinominate**: «Qualità UI, taste e wireframe» → **UI design e wireframing**, «Accessibilità e audit» → **Accessibilità e performance**, «UX writing e content» → **UX writing e contenuto**.
- **Ogni file `.md` citato è passato in codice inline**, quindi monospace col fondo lime, com'era già per `DESIGN.md` nella sezione «Il contesto visivo». Sono 65 le occorrenze convertite, dai file di contesto del capitolo 2 alle voci del glossario. Restano in tondo i titoli degli articoli nelle Fonti, dove `.md` fa parte del nome di un pezzo pubblicato.
- **Punteggiatura riattaccata al codice inline.** Il chip di `code` ha `.38em` di padding a destra, quindi i due punti che lo seguono si leggevano come «`CLAUDE.md` :». Con 65 chip in più il difetto diventava visibile: `build.mjs` avvolge ora la punteggiatura che segue un `</code>` in uno `span.tight-punct` con `-.16em` di margine sinistro. Escluso il codice a blocchi, dove il chip non c'è.
- **Paragrafo d'apertura del capitolo 4** ridotto a una riga, che dichiara che si tratta di librerie open source. La seconda frase spiegava perché stanno fuori dal catalogo delle skill, cosa che l'intro del catalogo già dice.

### Corretto
- **Tre link rotti nel catalogo**, verificati uno per uno insieme agli altri 104: `leonxiinx/taste-skill` nella tabella dello starter pack era un refuso e dava 404 (il repo è `Leonxlnx/taste-skill`, citato correttamente due paragrafi sopra); `Manavarya09/design-extract` non esiste più ed è stato tolto; `jacob-bd/notebooklm-mcp-cli` è stato rinominato in `gemini-notebook-mcp-cli`.
- **Link mancante su «Awesome Design MD»** nella tabella «Skill UI/UX con comando»: la skill era citata per nome dall'articolo di origine senza puntare al repository (`VoltAgent/awesome-design-md`).

## [2026-08-17]

### Aggiunto
- **«I file di contesto» riorganizzata su un secondo asse**: il raggruppamento per frequenza di lettura (sempre attivi / per feature / di riferimento) e la logica di costo che ne discende, più i quattro file che i due elenchi esistenti non coprivano — **FLOWS.md** (tutti gli stati della feature, contro l'agente che costruisce solo l'*happy path*), **DECISIONS.md** (registro in sola aggiunta, anche degli scarti), **REVIEW.md** (checklist sì/no prima del «fatto») e **COMPONENTS.md** (risposta canonica a «esiste già?»). Aggiunti anche il collegamento dei file al design system vivo via MCP, la distinzione fra regola per l'agente e documentazione per una persona, e il metodo delle tre varianti per far emergere i vincoli mancanti. Dichiarata la divergenza fra le fonti su quali file tenere sempre attivi. Fonte: Lisa Demchenko, agosto 2026.
- Nella voce **PLAN.md**, la lista dei non-goal come unico freno all'allargamento di scope da parte degli agenti.
- Nuova sezione **«Il contesto visivo»** nel capitolo «Flusso ottimale tra Claude e Figma», prima di «Il contesto di UX»: origine e stato della spec DESIGN.md (Google Stitch → Google Labs, aprile 2026, spec alpha, CLI di lint/diff/export), le due meccaniche di contratto (token normativi, riferimenti `{colors.primary}`, intestazione duplicata che invalida il file), descrizione contro vincolo con la forma valore→intento→confine, la sequenza di scrittura (brief prima dei token, logica di componente, don't) e il controllo diagnostico a tre schermate. Chiude l'asimmetria per cui `UX.md`, dichiarato una proposta, aveva una sezione dedicata e `DESIGN.md`, che una spec ce l'ha, una riga sola.
- **Nomi per ruolo e stati dei componenti** in «Rendere il design system leggibile dall'AI»: perché `button.primary` sopravvive al rebrand e `bigRedButton` no, il vocabolario condiviso invece di un dizionario privato, e i componenti documentati anche in hover/active/disabled/loading/focus.
- **Controllo a due vie** in «Enforcement del design system»: confrontare `DESIGN.md` col prodotto live per capire chi dei due è rimasto indietro.
- Voce **DESIGN.md** nel Glossario e quattro fonti promosse da «(memoria di progetto)» a citazioni per esteso.

- **«Le skill ufficiali di Figma» riscritta e portata a 16 voci.** L'elenco ne aveva otto più due citate di sfuggita in coda; il catalogo pubblicato da Figma ne conta una ventina contando le varianti. Entrano `figma-use-motion`, `figma-design-to-code`, `figma-implement-motion`, `figma-swiftui`, `generate-project-plan`, `video-interaction-mapper` e la variante `figma-code-connect-components`. Con sedici voci la lista numerata piatta non si consultava più, quindi le skill sono raggruppate per direzione del lavoro: scrivere sul canvas, da Figma al codice, dal codice a Figma, ponte e regole, utilità.
- **Apertura della sezione**: che cosa è una skill Figma e perché esiste, più la distinzione dichiarata da Figma fra le nove documentate nell'help center, che sono il set stabile, e `figma-generate-library` con `figma-generate-design`, presentate come esempi da leggere e adattare.
- **Nuovo blocco «Requisiti e limiti»**, che nella guida mancava del tutto: Full seat o Dev seat su piano a pagamento per scrivere sul canvas, Dev seat in sola lettura fuori dalle bozze, `figma-code-connect` che vuole i componenti pubblicati e un piano Organization o Enterprise. La funzione è gratuita durante la beta e Figma dichiara che passerà a pagamento a consumo.
- **Due strade d'installazione in più** nel paragrafo esistente: lo scaricamento a mano da [`figma/mcp-server-guide`](https://github.com/figma/mcp-server-guide) per i client senza plugin, e la raccolta di skill della comunità in [`figma/community-resources`](https://github.com/figma/community-resources/tree/main/agent_skills), segnalata come cosa diversa dal set ufficiale.
- **Due fonti nuove**: la pagina *Figma skills for MCP* dell'help center e l'elenco delle agent skill pubblicate da Figma su mcpservers.org. Restano fuori da `FONTI.md`, che cataloga i PDF archiviati in `sources/`: come le altre pagine di documentazione ufficiale stanno solo nell'elenco della guida.

### Aggiunto (interfaccia)
- **Comandi copia e condividi sui titoli** H2 e H3: due pulsanti che compaiono in hover accanto all'ancora `#`, uno copia la sezione ricostruita in markdown, l'altro il link diretto. Icone Lucide (ISC) inline in uno sprite `<symbol>` definito una volta sola, perché ripeterle su 41 titoli pesava 78 KB. Il markdown si ricostruisce dal DOM al momento del click, quindi il sorgente non viene duplicato nella pagina. Su touch i comandi restano visibili al 50% di opacità; senza `navigator.clipboard` c'è il fallback su `execCommand`.

### Modificato (interfaccia)
- **Link del testo ridisegnati.** Sottolineatura lime come gradiente invece che come `text-decoration`, perché quella non si anima: a riposo è ancorata a sinistra e piena, all'hover l'ancora salta a destra e la larghezza va a zero, quindi il filetto si ritira verso destra; all'uscita l'ancora torna a sinistra e ricresce da lì. È il gesto delle voci di menu di termecomano.com, con `box-decoration-break: clone` così un link andato a capo ha il filetto su ogni riga. Transizione di 360ms su `cubic-bezier(.4, 0, .2, 1)`. Il testo dei link è **Medium già a riposo**: il peso non cambia all'hover, quindi il testo attorno non si sposta. Via il fondo lime che compariva prima. Sottolineatura vera ripristinata in `forced-colors`, dove i background vengono rimossi dal sistema.
- **Tutti i link esterni aprono in una scheda nuova** (129), con `rel="noopener noreferrer"`. Restano nella stessa scheda le ancore interne e il `mailto` del piè di pagina.
- Nelle Fonti, gruppo «Claude Code e Figma: setup e workflow» rinominato in **«Flusso tra Claude Code e Figma»**.
- **Via i filetti dalla colonna di lettura**: rimossi i quattro `<hr>` fra i capitoli e il bordo inferiore dell'hero, che separava l'introduzione dal capitolo 1 ed era rimasto l'unica riga in mezzo al testo. La separazione la fa il vuoto: `--gap-cap` sale da 96 a 128px, così un capitolo stacca più del doppio di una sezione. Resta solo il filetto del piè di pagina.
- **Occhielli senza trattino**: tolto il `::before` lime da `.eyebrow` e da `.chapter-kicker`, restano i soli testi in maiuscoletto.
- **Spazio sotto l'H1** portato a 32px: con `line-height: 1.04` il titolo mangia lo spazio ottico che gli altri livelli hanno di loro.
- **Filetto in inchiostro sotto ogni titolo di capitolo** (H2, incluse le voci di chiusura Glossario e Fonti; il titolo d'apertura resta senza). Titolo e filetto distano 12px, il filetto e il contenuto 24px. È l'unica riga rimasta nel testo, ed è di tipo diverso da quelle tolte: segna dove comincia un capitolo invece di separare due blocchi.
- **Piè di pagina allineato al testo.** Era largo ~600px contro i ~758px della colonna: `--content-max` vale `74ch` e l'unità `ch` si calcola sul corpo dell'elemento, quindi a 13px dava una colonna molto più stretta. Il difetto c'era da sempre. Tolta la `max-width` propria: il piè di pagina eredita la larghezza di `.prose`, e il filetto è allineato al testo per costruzione.
- Tolta la riga di chiusura della sezione «Fonti» che rimandava a `FONTI.md`.
- **Apertura riparata**: `build.mjs` cercava un blockquote dopo l'H1 per riempire il lede dell'hero, ma il sorgente lì ha paragrafi normali. Il lede era sempre stato vuoto e il bordo inferiore dell'hero collassava fra titolo e primo paragrafo, sembrando un divisore voluto. Ora l'intro è quello che sta fra l'H1 e l'indice manuale.
- **Voce «Introduzione»** in cima all'indice, puntata all'hero. Lo scrollspy la attiva sopra il primo titolo, e in quello stato l'accordion resta aperto sul capitolo corrente invece di richiudersi: il lede promette «trovi tutti i sotto-capitoli nell'indice qui sotto».
- **Icone Lucide nella topbar** al posto dei glifi `◐ ☀ ☾` e `☰`: `monitor` per il tema automatico, `sun`, `moon`, `menu`. Il `title` del pulsante dichiara lo stato corrente. Via anche la dipendenza dal font di sistema per i glifi Unicode.
- **Numerazione a pallini pieni**: le liste ordinate e i passi `**N) Titolo.**` (oggi solo in «Deploy del prototipo») mostrano il numero dentro un cerchio in inchiostro. Scelto l'inchiostro e non il lime: la palette di riferimento vuole l'accento raro e mai come fondo esteso, e qui i numeri sono decine. Il pattern `N)` è convertito in `build.mjs`, così il sorgente markdown resta leggibile.
- **Separazione fra colonna di lettura e chrome**: nuovo token `--bg-chrome`, un gradino sotto `--bg`, applicato a topbar e spalla. Tre livelli distinti (chrome, colonna, superfici di codice e tabelle) senza toccare i componenti esistenti.
- **Ritmo verticale riscritto su una regola dichiarata.** I margini dei titoli erano in `em` e quelli dell'occhiello di capitolo erano legati al suo corpo da 12px: un capitolo apriva con 36px di respiro contro i 57,6px di una sezione interna, cioè la gerarchia rovesciata. Ora tutto in `rem` su multipli di 8, con lo spazio sopra un titolo che cresce col livello e quello sotto che resta molto minore. Valori finali della giornata nella voce sui filetti qui sopra. Regola scritta come commento nel template.
- Occhiello dell'hero da «Knowledge base · Team di design Lotrek» a **«Knowledge base per il team di design»**.
- Piè di pagina: al posto di «Generato da content.md · repass.io design DNA» ora **«Per domande o considerazioni, scrivi a design@lotrek.it»** con link `mailto`.

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
