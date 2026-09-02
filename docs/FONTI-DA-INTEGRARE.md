# Fonti da integrare

Anticamera di `docs/FONTI.md`. Qui si annotano le fonti raccolte ma non ancora entrate nel testo della guida, ordinate per il tema a cui servono.

**Perché non stanno già in `docs/FONTI.md`.** Quel file è la bibliografia di quello che la guida ha usato davvero, e le sue voci sono numerate in sequenza continua: infilarci una fonte non ancora integrata vuol dire rinumerare tutto il resto e dichiarare un debito che non c'è. La regola di `CLAUDE.md` dice che una fonte entra nelle fonti quando entra nel testo, e questo file è il posto dove aspetta.

**Cosa succede quando una fonte viene integrata.** Esce da qui ed entra in due posti, la sezione «Fonti» di `src/content.md` e `docs/FONTI.md`, con il PDF in `sources/` quando si riesce ad archiviarlo. Se il tema era in «Prossimi argomenti», la voce va tolta anche da lì e l'occhiello riscritto.

---

## Temi già svolti nella guida

Le caselle qui sotto ricalcano i sette capitoli. Una fonte che rafforza o corregge una sezione esistente va qui, con una riga che dice cosa aggiunge rispetto a quello che c'è già.

### Progettare il contesto
Tre fonti sull'economia del contesto e dei token, che è il tema di «Il contesto è una risorsa finita» e «Mantenere il contesto nel tempo». Le prime due si sovrappongono e vanno lette insieme prima di decidere se diventano una sottosezione o due paragrafi.

- [Maximizing the value of your Claude Code sessions](https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions), Lydia Hallie, blog di Claude, 14 agosto 2026. Fonte primaria. `/clear` fra un compito e l'altro, modello ed effort fissati all'inizio per non rompere la cache, i file richiamati con `@` invece che a percorso, `/context` per vedere cosa è caricato e `/compact` prima di una pausa lunga, perché la cache scade dopo un'ora. Chiude sui subagent per il lavoro che produce molto output di scarto
- [Claude Code's New Concise Style Can Save You a Lot of Tokens](https://uxplanet.org/claude-codes-new-concise-style-can-save-you-a-lot-of-tokens-5ef2bd0241fc), Nick Babich, UX Planet, agosto 2026. Lo stile di output Concise, che toglie il preambolo e la cronaca dei passaggi lasciando il risultato. Si accende da `/config` alla voce Output style o con `"outputStyle": "Concise"` in `settings.json`, dalla versione 2.1.237. Tocca anche «I comandi di Claude Code», dove `/config` non è in tabella
- [Claude Code 101, for Designers](https://yaronschoen.com/blog/claude-code-101-for-designers), Yaron Schoen, 10 agosto 2026. Primer per designer senza background di codice, che definisce LLM, finestra di contesto, token e MCP, poi sessioni, modalità di approvazione, `CLAUDE.md` e agenti. Non abbiamo un capitolo di primer e non è detto che serva, quindi vale come materiale da saccheggiare per le definizioni, non come sezione

### Scrivere il contesto
- [My Top 5 Favorite Ways of Using DESIGN.md in Claude Code](https://uxplanet.org/my-top-5-favorite-ways-of-using-design-md-in-claude-code-d1b52fd49cea), Nick Babich, UX Planet, agosto 2026. Cinque modi di usare `DESIGN.md`, fra cui il richiamo permanente dentro `CLAUDE.md` quando il design system esiste già e ogni richiesta di UI deve seguirlo. Va confrontato con quello che «DESIGN.md» dice oggi, perché su quel file abbiamo già otto fonti e il rischio è aggiungere la nona che ripete

### Collegare Claude e Figma
- [You Can Now Design in Claude Code](https://uxplanet.org/you-can-now-design-in-claude-code-2946d6088e4a), Nick Babich, UX Planet, agosto 2026. La skill `/design`, che apre una tela con gli artboard dentro Claude Code, e un processo di ideazione in tre passaggi. La tesi è che serva a praticare il design prima del codice, non a rendere Claude un designer migliore. `/design` è già nella tabella di «I comandi di Claude Code» con una riga sola, e questo articolo è il materiale per farne un paragrafo
- ⚠️ [From Figma to front-end without losing your mind](https://medium.com/design-bootcamp/from-figma-to-front-end-without-losing-your-mind-65518cafe5b6), Bootcamp (Medium). **Titolo, autore e data non verificati:** Medium risponde 403 alla lettura automatica, anche da browser vero, e la ricerca non trova l'articolo. Prima di trattarlo come fonte va aperto a mano e vanno presi autore e data dalla pagina

### Il design system per l'AI
Nessuna in attesa.

### Costruire e pubblicare il prototipo
- [How to build a design sandbox for your team to prototype with real code](https://designwithai.substack.com/p/how-to-build-a-design-sandbox-for-your-team-to-prototype-with-real-code), Xinran Ma, Design with AI, 1 settembre 2026. Sette passaggi per montare un ambiente in cui il team prototipa con i componenti veri del design system invece che con quelli di produzione, con AWS Cloudscape come caso di studio. Dentro ci sono l'indice dei componenti, le regole per l'AI, le salvaguardie che impediscono componenti inventati e le skill che chiudono il giro. Tocca anche «Rendere il design system leggibile dall'AI», perché l'indice dei componenti è il nostro registro

### Progettare con le skill di Claude
Nessuna in attesa.

### Far lavorare l'agente da solo
Nessuna in attesa.

---

## Temi annunciati e non ancora scritti

Sono le voci di «Prossimi argomenti» e i temi rinviati. Le fonti qui sotto arrivano dall'utente e sono ferme in attesa che il tema diventi testo.

### VS Code e Cursor a confronto
Voce di «Prossimi argomenti». Perimetro ristretto il 2 settembre 2026: quello che cambia per Claude Code dentro un editor è già in «I comandi di Claude Code», quindi al tema resta il confronto fra i due editor in sé.

- [Use Claude Code in VS Code](https://code.claude.com/docs/en/vs-code), documentazione di Claude Code
- [Claude Code + Cursor 2026](https://www.futureproofing.dev/resources/ai-native-team/claude-code-cursor-integration-2026), FutureProofing

### La ricerca UX con l'AI
Voce di «Prossimi argomenti», dal 26 agosto 2026. Sta un gradino prima di «UX.md», perché quel file dice come le evidenze diventano contesto e questo tema direbbe come le evidenze si producono.

- [How to AI UXR: A Map for Building AI-Augmented Research Operations](https://www.theresearchopsreview.com/p/how-to-ai-uxr-a-map), Kate Towsey, The ResearchOps Review, 21 maggio 2026. La mappa vera è un PDF di cinque pagine scaricabile dall'articolo
- [The UX Researcher's Guide to Claude, Claude Cowork, and Claude Code](https://productimpactpod.com/news/ux-researcher-guide-claude-tools/), Brittany Hobbs, Product Impact, 27 aprile 2026, aggiornato al 27 luglio 2026. Ha due seguiti citati in pagina, sul cambio di mentalità e sulla ricerca come strato di contesto
- [Researcher-in-the-loop](https://uxdesign.cc/researcher-in-the-loop-18a8ffddf48e), Jennifer L. Bowie, UX Collective, agosto 2026. Un modello di ricerca UX con l'AI dentro in cui a governare resta chi la ricerca la conduce. È il pezzo che regge la parte di metodo del tema, dove gli altri due stanno sull'attrezzatura e sull'organizzazione

### Le skill dell'agente di Figma
Tema rinviato dall'utente il 21 agosto 2026, distinto da «Le skill Figma per Claude Code» perché lì la skill la esegue Claude Code e qui l'agente che vive dentro Figma. Manca la collocazione, fra il capitolo sulle skill e la coda di «Collegare Claude e Figma».

Nessuna fonte fornita.

---

## Fonti citate ma non integrate

Articoli che stanno già in `docs/FONTI.md` perché sono stati letti e valutati, ma il cui contenuto non è entrato nel testo. Per questi vale la convenzione delle note, cioè un file `docs/NOTE-<SEZIONE>.md` che dice se e quando riaprire la sezione.

- Voce 16, `If You Use Claude, You Need This Simple Folder System`, analizzata in `docs/NOTE-ORGANIZZARE-IL-PROGETTO.md`

---

## Nota sull'archiviazione

Medium risponde 403 a qualunque lettura automatica, browser headless compreso, quindi per le fonti su `medium.com`, `uxplanet.org` e `uxdesign.cc` il PDF va preso a mano o via `archive.is` al momento dell'integrazione. Vale la solita avvertenza di `docs/FONTI.md`, cioè che la data in testa a uno snapshot è quella di archiviazione e non di pubblicazione.
