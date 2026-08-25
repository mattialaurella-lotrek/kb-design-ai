# Note per «Organizzare il progetto»

Analisi di **If You Use Claude, You Need This Simple Folder System** (Frank Andrade e Kevin Gargate Osorio, Artificial Corner, 28 giugno 2026), voce 16 di `docs/FONTI.md`. L'articolo è citato fra le fonti e non è integrato nel testo: la sezione «Organizzare il progetto» è chiusa e questo file dice se e quando vale la pena riaprirla.

Link: https://artificialcorner.com/p/claude-file-system · PDF in `sources/If you use Claude you need this simple folder system.pdf`

## Verdetto

Come fonte da integrare vale poco. Parla a un altro lettore, cioè a chi lavora in un workspace da Claude Desktop o Cowork fatto di bozze, note e consegne, dove l'ordine va costruito perché non c'è nient'altro a darlo. La nostra sezione descrive un repo, dove l'ordine lo danno già git e le convenzioni del progetto, quindi metà dell'articolo risolve un problema che qui non si presenta.

Restano due righe vere, i candidati 1 e 2 qui sotto. Se un giorno «Organizzare il progetto» si riapre per altri motivi, si aggiungono e sono tempo ben speso. Riaprirla apposta per questo articolo no. Gli altri tre candidati sono da scartare.

## Cosa dice l'articolo

Cinque cartelle al primo livello, numerate perché restino in ordine di lettura.

```
YOUR-WORKSPACE/
├── [01] system/     ← le regole che Claude deve seguire
├── [02] context/    ← conoscenza stabile e riferimenti riutilizzabili
├── [03] projects/   ← lavoro attivo
├── [04] outputs/    ← lavoro finito
└── [99] archive/    ← vecchio, ma ancora cercabile
```

Il `[99]` tiene l'archivio in fondo per sempre. Dentro `projects/` la numerazione continua, perché lì c'è una sequenza vera (`00_BRIEF.md`, `01_SOURCES/`, `02_NOTES/`, `03_DRAFTS/`, `04_VISUALS/`, `05_FINAL/`). Dentro `context/` no: gli autori la trattano come una biblioteca, dove non esiste un ordine di lettura, e i file prendono nomi descrittivi (`HOW-I-WORK.md`, `voice-guide.md`, `audience.md`, `references/`).

La seconda metà dell'articolo sta sui nomi dei file. Un nome deve rispondere a tre domande, quando, cosa e a che punto è, e la forma proposta è `[DATA]_[ARGOMENTO]_[STATUS]`: `2026-06-24_claude-file-system_draft-v1.md`. La precisione della data si sceglie in base al tipo di file, con quattro gradini: anno per i file di lungo periodo, anno e trimestre per i cicli di pianificazione, anno e mese per il lavoro ricorrente, data intera per i file legati a un compito singolo.

La chiusura è una regola in cinque righe: markdown per le istruzioni, numeri per l'ordine, nomi per il significato, date per la ricerca, archivio per il rumore.

## Come si rapporta alla nostra sezione

L'articolo parla di un workspace di lavoro personale, tipo Claude Desktop o Cowork, dove i file sono bozze, note e consegne. La nostra sezione parla di un repo di prodotto, dove sopra i file c'è git e accanto ci sono `.claude/`, `.mcp.json` e il codice. Le due cose si sovrappongono meno di quanto sembri, ed è il motivo per cui l'integrazione non è ovvia.

La tesi d'apertura invece coincide: la cartella fa parte del prompt, e un workspace disordinato costringe l'AI a spendere lettura per capire dove sta la roba invece che per il lavoro. È quello che la nostra sezione dice già nella prima riga.

## Candidati per un'integrazione futura

**1. Dove finisce ciò che non serve più (da fare, se la sezione si riapre):** nella nostra struttura manca la dimensione del tempo. C'è un posto per ogni tipo di file, non ce n'è uno per i file superati. È lo stesso problema che la sezione «CLAUDE.md» descrive per le regole che si accumulano, dove togliere è manutenzione quanto aggiungere. Una cartella di archivio dà un'alternativa alla cancellazione, perché il contesto vecchio esce dalla lettura dell'agente e resta cercabile da una persona. Vale per le decisioni di design superate, per le sintesi di ricerca invecchiate e per gli screenshot di una versione precedente del prodotto. È il candidato più solido dei cinque e il meno invasivo, perché costa una voce nell'albero e una riga fra le buone pratiche. Il pensiero però ce l'abbiamo già in casa, e l'archivio non fa che dargli un posto fisico invece di lasciarlo come consiglio.

**2. Il nome del file come contesto, dentro `reference/` (da fare, se la sezione si riapre):** la convenzione `[DATA]_[ARGOMENTO]_[STATUS]` risolve un problema che abbiamo. `reference/screenshots/` e `reference/research/` si riempiono di file che nessuno sa più a quando risalgono, e l'agente ci ragiona sopra come se fossero attuali. La stessa regola sul codice però stona, perché `src/` è già versionato da git e una data nel nome di un componente è rumore. Se si integra, va scritta come regola locale alle cartelle di riferimento e di ricerca, mai come regola generale del progetto.

**3. Numerare solo dove c'è una sequenza (da scartare):** il criterio degli autori è più utile della numerazione in sé. Si numera dove esiste un ordine di lavoro, si descrive dove esiste una biblioteca. Nella nostra struttura `ux/` è una biblioteca e sta bene con nomi parlanti, mentre una ricerca condotta per fasi avrebbe un ordine reale da mostrare. La numerazione `[01]` al primo livello invece la lascerei fuori: in un repo i nomi delle cartelle sono già convenzioni riconoscibili, e `[03] src/` non aiuterebbe nessuno.

**4. La regola mnemonica in cinque righe (da scartare):** funziona come chiusura di sezione. La guida però non usa slogan da ricordare a memoria, e «Organizzare il progetto» chiude già bene con la scorciatoia `/init`. Da tenere solo se un giorno la sezione dovesse allungarsi al punto da servire un riassunto.

**5. La distinzione fra `context/` e `projects/` (da scartare):** riutilizzabile fra progetti contro specifico di questo progetto. Da noi passa già implicitamente dalla divisione fra i file alla root e `docs/`, ma non è detta. Una riga che la renda esplicita costerebbe poco, e chiarirebbe dove va a finire un file quando è utile due volte.

## Cosa lasciare fuori

Le cartelle `system/`, `context/`, `projects/` e `outputs/` come primo livello sono un'alternativa alla nostra struttura, non un'aggiunta. Portarle dentro vorrebbe dire riscrivere la sezione attorno a un modello pensato per chi scrive articoli, perdendo `.claude/`, `.mcp.json`, `/tools` e `/workflows`, che sono la parte che serve a un progetto di design. Resta buono come conferma della tesi di partenza e come fonte per il capitolo sui nomi dei file.

## Se si decide di integrare

Il candidato 1 sta in una riga dentro l'elenco delle buone pratiche, più una voce nell'albero. Il candidato 2 chiede un blocco a sé, tre o quattro frasi con la convenzione e i quattro gradini di data, ed è la sola cosa che l'articolo dice e noi no. In tutti i casi la sezione resta una, quindi i due indici di `src/content.md` non si toccano.
