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

### Aggiunto (interfaccia)
- **Comandi copia e condividi sui titoli** H2 e H3: due pulsanti che compaiono in hover accanto all'ancora `#`, uno copia la sezione ricostruita in markdown, l'altro il link diretto. Icone Lucide (ISC) inline in uno sprite `<symbol>` definito una volta sola, perché ripeterle su 41 titoli pesava 78 KB. Il markdown si ricostruisce dal DOM al momento del click, quindi il sorgente non viene duplicato nella pagina. Su touch i comandi restano visibili al 50% di opacità; senza `navigator.clipboard` c'è il fallback su `execCommand`.

### Modificato (interfaccia)
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
