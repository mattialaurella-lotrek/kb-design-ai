# CLAUDE.md

Guida HTML «Progettare con l'AI», knowledge base del team di design Lotrek. Un solo markdown sorgente diventa una pagina statica e un PDF. Questo file dice come si lavora sul repo. Il sistema visivo si trova in `DESIGN.md`, le decisioni di lungo periodo in `docs/MEMORY.md`.

## Come è fatta

```
src/content.md      la fonte del testo, si modifica qui
src/template.html   shell HTML, CSS, tema, interazioni: fatto a mano
scripts/build.mjs   converte content.md in index.html e genera l'indice
index.html          artefatto, gitignored, non si tocca mai a mano
scripts/make-pdf.mjs stampa index.html in PDF con Chrome headless
deploy.sh           build, PDF e deploy su Vercel
.githooks/post-commit manda ogni commit su GitHub, si attiva a mano
```

Il corpo della guida è generato dal markdown, il template è scritto a mano. Ogni intervento passa da uno di tre posti: `src/content.md` per il testo, `src/template.html` per stile e comportamento, `scripts/build.mjs` per il markup generato.

## Comandi

```bash
npm run build                          # rigenera index.html
BUILD_DATE=2026-08-24 npm run build    # forza la data del piè di pagina
python3 -m http.server 8899            # anteprima su http://localhost:8899
./deploy.sh preview                    # pubblica su kb-design-ai-preview.vercel.app
./deploy.sh                            # build, PDF e deploy in produzione
```

`deploy.sh` rilancia la build da sé, quindi `BUILD_DATE` va passata anche a lui se serve una data diversa da oggi.

Per gli screenshot in locale serve Chrome Beta, che è l'unico installato su questa macchina: `"/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta" --headless --disable-gpu --hide-scrollbars --screenshot=out.png --window-size=1440,1400 --virtual-time-budget=4000 http://localhost:8899/index.html`. Due limiti noti da non scambiare per bug del sito: l'headless renderizza sempre in scuro anche forzando `data-theme="light"`, e sotto i 1024px di larghezza lo screenshot esce tagliato a destra.

## Le regole che non si rompono

**I testi passano da `/not-ai`,** sempre e senza che l'utente lo chieda. La skill si carica prima di scrivere, insieme al modulo `references/lexicon-it.md`, e la bozza si rilegge col secondo passaggio prima di finire nel sorgente. Profilo `docs`, con la doppia natura attiva: la guida è prosa vera, quindi l'audit va fatto a livello di frase e non solo sugli elenchi.

**Ogni articolo integrato entra nelle fonti,** sia nella sezione «Fonti» di `src/content.md` sia in `docs/FONTI.md`. Vale anche quando il PDF non si riesce ad archiviare in `sources/`, e in quel caso il campo `File:` dichiara perché manca.

**Un tema integrato esce da «Prossimi argomenti».** Quando una voce di quella sezione diventa testo della guida, la voce si toglie e si riscrive l'occhiello, che conta i temi rimasti e li divide fra attrezzatura e metodo. Vale anche al contrario: un tema che si decide di rinviare entra lì.

**Il design system si trova in `DESIGN.md`,** che è la fonte dei colori, dei corpi, delle spaziature e delle icone. Un valore che non compare lì dentro non si scrive nel CSS: prima si aggiunge al file, con il gradino del sistema Lotrek da cui viene.

**Un'icona che manca la disegna Mattia.** L'inventario del sistema si trova in `DESIGN.md`. Se quella che serve non c'è, si chiede a lui invece di prenderla da una libreria esterna o di disegnarne una simile. I loghi di prodotti terzi sono un'altra cosa e non seguono questa regola: si usa il file ufficiale del marchio, senza ridisegnarlo e senza ricolorarlo.

**Il push lo fa un hook,** `.githooks/post-commit`, che manda su GitHub ogni commit appena chiuso. Su un clone nuovo va acceso una volta con `git config core.hooksPath .githooks`, perché git non installa da sé gli hook che arrivano da un repo. Quando il push non riesce, l'hook lo dice e il commit resta in locale, da recuperare a mano.

**Ronzino ha 400, 500 e 700 e non ha il 600.** Si usano i token `--w-regular`, `--w-medium` e `--w-bold`.

**`index.html` e `progettare-con-lai.pdf` sono artefatti,** gitignored, rigenerati a ogni build. Una modifica scritta lì dentro sparisce al giro dopo.

**L'indice della ricerca lo costruisce il browser, non la build.** La guida è una pagina sola, quindi il testo è già nel DOM: incorporarlo una seconda volta come JSON costerebbe un centinaio di KB su 249. Si legge al primo fuoco sul campo. La build fa solo una cosa per la ricerca, cioè mette un `id` su ogni voce di glossario, così un risultato può atterrare sulla singola definizione.

**`src/content.md` ha due indici da tenere allineati,** quello manuale in testa al file e quello che `scripts/build.mjs` genera per la spalla. Aggiungendo o togliendo una sezione vanno aggiornati entrambi, il primo a mano.

## Convenzioni editoriali

- **Il grassetto si usa con parsimonia,** per evidenziare concetti e parole chiave, non per dare ritmo. Un paragrafo di prosa ne regge uno, al massimo tre quando marcano una serie di nomi propri. Il grassetto a raffica smette di segnalare, perché se tutto è in rilievo niente lo è.
- **Mai il corsivo,** in nessun caso. Dove serve un termine tecnico o straniero si lascia il tondo, dove il corsivo faceva da etichetta si usa il grassetto. Un `<em>` nell'HTML generato è un errore.
- **I titoletti in grassetto chiudono con i due punti dentro il grassetto,** poi spazio e minuscola: `**Titolo:** testo che continua`. Mai col punto, mai coi due punti fuori. I grassetti a metà frase non sono etichette e tengono i due punti fuori.
- **Un paio di due punti per paragrafo, non due.** Dopo i due punti del titoletto la frase non ne apre un secondo, si rifrasa.
- **Ogni file `.md` citato va in codice inline,** così prende il monospace col fondo lime. Unica eccezione i titoli degli articoli nella sezione Fonti.
- **Niente numeri di sezione** nei titoli o nell'indice.
- **Le sigle sciolte vanno con le iniziali maiuscole,** in tutte e due le direzioni, `MCP (Model Context Protocol)` e `Personal Access Token (PAT)`. Vale anche dove l'espansione da sola sarebbe un nome comune, come `IDE (Integrated Development Environment)`, perché la regola opposta obbligherebbe a scrivere in minuscolo i nomi propri veri Ogni sigla che ha una voce di glossario si scioglie lì, nessuna esclusa. La voce si apre con la forma che il lettore incontra nel testo, che di solito è la sigla ma non sempre.
- **Le voci del catalogo di skill hanno tutte lo stesso peso,** cioè intorno alle 150 battute di testo visibile, URL escluso, con 240 come tetto. La mediana delle sessantaquattro già scritte è 156, e quattordici superano il tetto, fra 245 e 519 battute: sono debito, e si accorciano quando si mette mano alla loro riga. Una voce lunga il triplo delle vicine dice al lettore che quella skill conta di più, e non è mai quello che vogliamo dire. Se una skill merita davvero più spazio, il posto è il testo della guida e non l'elenco.
- **«Stare» non dice dove si trova una cosa.** La collocazione in italiano vuole «si trova», «è», «compare» o «vive», quindi `sta in «Titolo»` diventa `si trova in «Titolo»`, e dove la frase prescrive dove mettere qualcosa si usa `va in`. Con «stare» restano soltanto gli idiomi, cioè stare in piedi, stare bene, starci dentro nel senso di entrarci, e il senso di consistere, come in «la differenza sta nella sola aggiunta».
- **Rimandi interni per titolo** fra guillemet nel sorgente: `«Il contesto visivo»`. La build li converte in virgolette curve.
- **Smart quotes e neutralizzazione delle tilde** sono automatiche in `scripts/build.mjs` e non si gestiscono a mano.

## Dove annotare

- `docs/CHANGELOG.md` per cosa è cambiato, raggruppato per data.
- `docs/MEMORY.md` per le decisioni di lungo periodo e il contesto che deve sopravvivere fra le sessioni.
- `docs/FONTI-DA-INTEGRARE.md` per le fonti raccolte e non ancora entrate nel testo, ordinate per tema. Una fonte esce di lì quando entra nella guida, e in quel momento entra anche in `docs/FONTI.md` e nella sezione «Fonti» di `src/content.md`.
- `docs/HANDOFF.md` per lo stato da incollare in una chat senza accesso al repo. Il blocco numerico fra i marcatori `<!-- stato:inizio -->` e `<!-- stato:fine -->` lo scrive la build, quindi lì non si mette mano.
- `DESIGN.md` quando si tocca un valore del sistema visivo.
