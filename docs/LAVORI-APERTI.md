# Lavori aperti

La coda del lavoro sul testo della guida, in un posto solo. Ogni voce dice dove va a finire, su che materiale si regge e cosa la tiene ferma, così una sessione nuova sceglie cosa prendere senza rileggere tre file per capirlo.

**Non è l'elenco delle fonti.** Quello si trova in `docs/FONTI-DA-INTEGRARE.md`, ordinato per tema, ed è lì che una fonte si annota con il suo verdetto. Qui ci sono i lavori, che spesso stanno su più fonti insieme e a volte su nessuna. Le decisioni di lungo periodo restano in `docs/MEMORY.md` e i temi annunciati al lettore restano in «Prossimi argomenti».

**Una voce esce di qui quando il testo è pubblicato.** Nello stesso giro la fonte entra in `docs/FONTI.md` e nella sezione «Fonti» del sorgente, e se il lavoro era un tema annunciato la voce si toglie da «Prossimi argomenti» e l'occhiello si riscrive.

**Ogni voce ha una chiave,** da `I1` a `I9` per le integrazioni e da `T1` a `T9` per i temi, e la stessa chiave apre la sezione corrispondente in `docs/FONTI-DA-INTEGRARE.md`. I due file hanno la stessa spina dal 21 settembre 2026, quindi per sapere su cosa si regge un lavoro basta aprire là la sezione con la stessa chiave. Un titolo si riscrive e una chiave no, ed è per questo che c'è.

<!-- conteggio:inizio -->
- 9 integrazioni in sezioni che esistono, da `I1` a `I9`
- 9 temi annunciati, da `T1` a `T9`
- Le fonti di questi lavori si trovano in `docs/FONTI-DA-INTEGRARE.md`, dove 18 sezioni portano le stesse chiavi
- Ultima build: 23 settembre 2026
<!-- conteggio:fine -->

---

## Come si legge insieme a `docs/FONTI-DA-INTEGRARE.md`

**La chiave è il legame.** Ogni lavoro qui ha una chiave, e là c'è una sezione con la stessa chiave che porta le sue fonti. Un lavoro senza fonti in attesa ha lo stesso la sua sezione, che dice dove il materiale si trova: `I2` rimanda alla voce 54 di `docs/FONTI.md` e `I9` alle librerie in fondo a quel file.

**Lo stato di una fonte dice se si può partire,** ed è scritto solo là per non averlo in due posti. `Pronta` vuol dire che se ne può scrivere, `aperta` che la pagina è stata letta ma il materiale che conta non è stato preso, `da aprire` che nessuno l'ha ancora guardata. `Senza firma` non è uno stato ma un debito, perché una fonte priva di autore o data può reggere il testo e non può diventare una voce di `docs/FONTI.md`.

**Cosa ne esce, al 22 settembre 2026.** Sei integrazioni si possono scrivere senza aspettare niente, cioè `I1`, `I2`, `I4`, `I5`, `I6` e `I9`. Due sono ferme sulla stessa cosa, una lettura, e sono `I7` e `I8`: si recuperano tutte e due da `freedium-mirror.cfd`, che è la strada già collaudata, quindi conviene prenderle in un giro solo. Su `I8` una parte della risposta può arrivare dalla fonte nuova di `T8`, che tratta una skill della stessa famiglia. `I3` è letta e ferma su altro, cioè autore e data che la stampa dal mirror non porta. Fra i temi il più pronto è `T1`, dove il lavoro è di traduzione e non di ricerca, il più ricco è `T2` con otto fonti e tre verifiche da fare prima, e l'unico fermo per mancanza di materiale è `T7`, che aspetta le fonti dall'utente. I due arrivati il 22 settembre 2026, `T8` e `T9`, hanno le fonti in casa e aspettano una decisione invece di una lettura, cioè dove va la design critique e se Claude Design è una sezione sua o la stessa di `T3`.

**Prima del 21 settembre 2026 i due file non combaciavano,** ed è il motivo per cui la spina esiste. Erano ordinati su assi diversi, uno per lavoro e uno per capitolo, quindi le fonti di nove integrazioni erano sparse in tre sezioni. Il legame era il titolo dell'articolo scritto per esteso in tutti e due i posti, che si rompe appena qualcuno riscrive una frase. E «letta» non aveva una definizione, tanto che sulla ricerca UX un file diceva che le tre fonti erano lette e l'altro che nessuna lo era: avevano ragione tutti e due, perché le pagine erano state aperte e il PDF di cinque pagine no.


---

## Integrazioni in sezioni che esistono

**I1 · L'economia del contesto e dei token:** va in «Il contesto è una risorsa finita» e «Mantenere il contesto nel tempo», su quattro fonti già smistate. La decisione aperta è se le prime due diventano una sottosezione nuova o due paragrafi dentro quelle che ci sono, e si prende leggendole insieme, perché si sovrappongono. Dal 21 settembre 2026 fra le due sezioni ce n'è una terza, «I tre ruoli del contesto», quindi una sottosezione nuova spezzerebbe una sequenza che ora regge da sola. Da questo giro esce anche una riga per «I comandi di Claude Code», dove `/config` non è in tabella. Attenzione a due dati che la stampa dell'articolo su Concise non conferma, cioè il campo `outputStyle` in `settings.json` e la versione 2.1.237, che vanno ripresi dalla documentazione ufficiale o tolti.

**I2 · Il secondo giro sul context engineering:** è il seguito della voce 54, il post di Anthropic sulle regole nuove, di cui il primo giro è pubblicato dal 28 agosto 2026. Restano due pezzi. La misura dell'80% di system prompt rimosso va in «Il contesto è una risorsa finita», dove oggi la guida si regge su fonti di seconda mano. Una sottosezione breve su regola e giudizio va in «Scrivere il contesto», con i rimandi al posto delle postille. La verifica su `/doctor` è fatta dal 23 settembre 2026 e dà ragione al post, perché dentro la sessione il comando controlla anche skill, MCP, plugin e `CLAUDE.md`, mentre `claude doctor` da terminale guarda solo l'installazione. Il terzo giro, sui riferimenti al codice al posto delle specifiche tecniche in markdown, si decide dopo il secondo, e dal 23 settembre 2026 ha una misura da cui partire, il preprint annotato sotto la stessa chiave.

**I3 · Il diario di cantiere di Prerender:** è la fonte più ricca in attesa e si spezza in quattro. I token prima dei componenti vanno in «Rendere il design system leggibile dall'AI». Il file markdown del piano usato come consegna fra una sessione e l'altra va in «Mantenere il contesto nel tempo». Puntare Claude a un nodo Figma per volta, con `get_design_context` invece dello screenshot, e scaricare gli asset perché gli URL della CDN scadono in sette giorni, vanno in «Setup e loop con Figma MCP». La tesi sull'attenzione che si spalma sull'ampiezza del compito va in «Il contesto è una risorsa finita». Prima di citarlo servono autore e data, che la stampa dal mirror non porta.

**I4 · I cinque modi di usare `DESIGN.md`:** il grosso rafforza «DESIGN.md», e il quinto modo è l'unico che la guida non ha, cioè il file come griglia di controllo a valle della generazione, che appartiene a «Enforcement del design system». Il rischio da tenere presente è la ripetizione, perché su quel file ci sono già otto fonti.

**I5 · Il sandbox per prototipare con i componenti veri:** l'indice dei componenti va in «Rendere il design system leggibile dall'AI», dove è il nostro registro dello strato specification, e le salvaguardie contro i componenti inventati vanno in «Enforcement del design system».

**I6 · Il percorso dal mockup alla pull request:** va in «Costruire e pubblicare il prototipo» ed è il capitolo 5 tirato fino in fondo, cioè sandbox con dati finti, primo accesso al codice vero su modifiche a basso rischio, poi branch, PR e deploy. Va letto insieme alla fonte qui sopra, che è della stessa autrice e descrive il passaggio che questa dà per fatto. Cita anche i workflow multi-agente sopra i 400mila token, che serve al tema degli agenti.

**I7 · L'audit del design system con Claude Code:** fermo perché non è ancora stato letto, e la collocazione dipende da cosa dice. Il titolo della pagina parla di design system in Figma e l'indirizzo solo di design system, quindi il pezzo appartiene al capitolo su Figma nel primo caso e a «Rendere il design system leggibile dall'AI» nel secondo. Si recupera da `freedium-mirror.cfd`, la strada che ha funzionato per gli altri quattro articoli Medium.

**I8 · Il plugin `design` di terze parti:** fermo per lo stesso motivo, e serve a una cosa sola, sapere da quale marketplace arriva, perché nel catalogo ufficiale quel plugin non c'è. Verificato l'8 settembre 2026 che `/design` è la skill inclusa che apre la tela, quindi qui si parla di due oggetti diversi con lo stesso nome. Dal 22 settembre 2026 la fonte di `T8` complica il quadro, perché chiama nativa una quinta skill della stessa famiglia, `/design:design-critique`, e la verifica va rifatta su un catalogo fresco.

**I9 · I controlli di pre-deploy di Higgsfield:** `higgsfield-websites/references/review-rubric.md` è una lista di undici controlli che si verificano col `grep` prima di pubblicare, e si divide fra due sezioni. In «Enforcement del design system» vanno quelli sul sistema visivo, cioè le famiglie di palette vietate, il rapporto fra occhielli e sezioni tenuto sotto `ceil(sezioni / 3)` e `h-screen` sostituito da `h-dvh`. In «Verificare il risultato» vanno quelli sulla verifica, cioè nessun elemento a `opacity: 0` in attesa di un trigger di scroll, perché uno screenshot headless a pagina intera deve mostrare tutte le sezioni, `prefers-reduced-motion` accoppiato a ogni sorgente di animazione, nessun `window` o `localStorage` al livello del modulo e la rilettura del testo contro i verbi riempitivi e i numeri finto-precisi senza fonte. Da decidere prima di scrivere se il divieto di em dash sulle stringhe visibili entra qui o resta una regola nostra di `CLAUDE.md`. Il secondo pezzo è il meccanismo delle approvazioni di `higgsfield-brandkit` e va in «Human-in-the-loop», cioè uno `state.json` con `approve_palette` e `approve_logo`, un Brand Lock che congela gli asset ufficiali del cliente come vincoli, la regola scritta di non dedurre mai l'approvazione dal silenzio o dalla generazione riuscita, e la rigenerazione che tocca solo gli output che dipendono da quello cambiato. Il rischio è dare spazio a un fornitore a pagamento per regole che la guida può dire da sé, quindi la regola si prende e la fonte si nomina una volta. I fatti e i limiti del pacchetto si trovano in `docs/FONTI-DA-INTEGRARE.md`.

---

## Temi nuovi annunciati

Sono le nove voci di «Prossimi argomenti», in ordine di quanto sono pronte, quindi le chiavi non scendono in fila.

**T1 · Scegliere il modello e l'effort corretti per lo scopo in Claude:** il materiale basta, cioè le due pagine ufficiali su `model-config` e sulla scelta del modello, più la scheda in `docs/BRIEF-SCELTA-DEL-MODELLO.md`. Il lavoro è tradurre criteri scritti per chi costruisce applicazioni in criteri per chi progetta, e tenere fuori quello che alla guida non serve, a partire dal listino a prezzo per token. La sezione va datata e riletta prima di ogni pubblicazione, perché il listino cambia ogni pochi mesi. Della scheda restano da controllare i cutoff di conoscenza, la disponibilità per piano e il tetto di 64mila token in uscita di Haiku, mentre la riga su Mythos è sbagliata come è scritta.

**T2 · Gestire una rete di agenti in Claude:** è il tema con più materiale, sette fonti più un repository e due documenti in `docs/BRIEF-ECOSISTEMA-DI-AGENTI.md`. La forma è già decisa, cioè subagent più una sessione che orchestra, perché il nostro giro da token a componenti a build a revisione è sequenziale e le squadre di agenti servono ad altro. Restano tre cose. Leggere AI4UI per intero, perché è la fonte che darebbe la parte di metodo e finora ne abbiamo solo il riassunto. Confermare sulla pagina ufficiale dei subagent i campi di frontmatter che il secondo documento cita. Aggiungere i costi in numeri e il legame con «Verificare il risultato», che è dove la guida oggi dice l'unica cosa che dice sugli agenti in parallelo.

**T3 · Progettare interfacce direttamente in Claude Code:** tre fonti su quattro sono lette, e il perimetro va fissato prima di scrivere, perché `/design` è il nome di almeno due cose diverse. La sezione dirà quando conviene e quando no, e la distinzione da tenere ferma è fra rispettare i token, che la tela fa, e usare i componenti della libreria, che non fa. Va detto che la funzione è in prova, perché può cambiare fra una stesura e la successiva.

**T8 · La design critique con Claude Code:** una fonte sola e letta, quindi il lavoro è tutto di collocazione, e i candidati sono due. La coda di «Verificare il risultato», dove la guida elenca già il confronto di uno screenshot con un riferimento e il secondo agente che rivede senza sapere come il risultato è stato costruito. Oppure una sezione sua nel capitolo del prototipo, accanto a «Dal codice al canvas e ritorno», visto che uno dei tre ingressi è il file Figma. Una cosa va detta comunque, ed è quella che «Verificare il risultato» dichiara già, cioè che il modello che ha fatto il lavoro è il giudice meno affidabile di quel lavoro, mentre qui si chiede a Claude di criticare quello che Claude ha appena disegnato. Prima di scrivere va sciolto il nodo di `I8`, perché la skill dell'articolo appartiene alla stessa famiglia `design:` del plugin di cui non si sa la provenienza.

**T9 · Claude Design:** due fonti ufficiali pronte, una di assistenza e una del designer che lo ha costruito, e la decisione da prendere per prima è il confine con `T3`. La proposta è che `T3` tenga `/design` e il lavoro nel terminale, e `T9` il prodotto, cioè la tela di `claude.ai/design`, il design system che il team carica e fa approvare da un amministratore, l'export in PDF, PPTX, HTML e slide e la libreria di componenti tenuta in pari col repository da `/design-sync`. Se il confine non regge alla stesura, le due voci diventano una sola e la chiave che resta è `T3`. Due cose vanno ricontrollate il giorno che si scrive, perché la pagina dell'assistenza non porta una data e perché il prodotto è in beta. Dal 22 settembre 2026 la figura della sezione è già nel repo, `assets/parrott-consigli-claude-design.webp`, quindi al momento della stesura resta da scegliere quali dei cinque consigli sviluppare nel testo, perché una figura entra se non ripete quello che si legge accanto.

**T4 · La ricerca UX con l'AI:** cinque fonti in attesa, tre aperte e due pronte. Due delle aperte tengono il materiale che conta fuori dalla pagina, cioè un PDF di cinque pagine da scaricare e la parte dietro l'abbonamento della quarta, arrivata il 22 settembre 2026. Quella quarta dà al tema la spina che gli mancava, cioè la divisione fra il lavoro meccanico, che si delega, e quello di giudizio, che resta a chi conduce la ricerca, più i compiti ibridi che si spezzano in due. La quinta, arrivata il 23 settembre 2026, fa la stessa divisione su 34 compiti in quattro fasi e si legge per intero, quindi la parte di metodo non dipende più soltanto dalla porzione a pagamento. La terza, letta per intero lo stesso giorno, aggiunge la regola per decidere quando basta una risposta dell'AI, una matrice su rischio e confidenza in cui la confidenza si ricava dalle evidenze. Due tagli si tengono, l'attrezzatura e il metodo, e il tema si colloca un gradino prima di «UX.md», perché quella sezione dice come le evidenze diventano contesto e questa direbbe come si producono. Con due fonti pronte il metodo si può scrivere, mentre l'attrezzatura aspetta ancora la guida di Hobbs.

**T5 · VS Code e Cursor a confronto:** due fonti e un perimetro già ristretto il 2 settembre 2026. Quello che cambia per Claude Code dentro un editor si trova già in «I comandi di Claude Code», quindi al tema resta il confronto fra i due editor in sé.

**T6 · Regole e istruzioni tra markdown e skill:** il rischio di questa sezione è la ripetizione, perché i pezzi sono già scritti in quattro sezioni, e dal 21 settembre 2026 in cinque. Il criterio con cui si sceglie il contenitore lo dà «I tre ruoli del contesto», che dice dove va un'istruzione e non in che forma. Alla sezione restano due domande, quando una regola ripetuta diventa una skill invece di una riga in `CLAUDE.md` e come si tiene in ordine l'insieme nel tempo. Per la prima si parte dal paragrafo di `how-claude-code-works` che mette in fila skill, MCP, hook e subagent con quanto costa ognuno in contesto. Per la seconda è arrivata il 23 settembre 2026 la prima fonte, l'articolo di Addy Osmani sull'audit della configurazione, che porta una procedura da ripetere ogni due-quattro settimane e la prova di un compito senza skill per decidere quali tenere. Dell'articolo si prende solo quello che la guida non ha, perché il ciclo con cui un file di regole peggiora e le domande per sfoltirlo sono già in «CLAUDE.md».

**T7 · Le skill dell'agente di Figma:** ferma su due cose, le fonti, che fornisce l'utente, e la collocazione, fra il capitolo sulle skill e la coda di «Lavorare con Claude e Figma».

---

## Sezioni da aprire fuori dall'elenco

**I plugin per Claude Code:** annotata in `docs/MEMORY.md` come sezione da scrivere quando l'utente vorrà, con il materiale già in casa, `sources/Claude Code for designers.pdf`. Non è annunciata in «Prossimi argomenti», quindi aprirla vuol dire anche aggiungerla lì.

**L'architettura ad agenti e sub-agenti,** annotata nello stesso posto, è coperta da «Gestire una rete di agenti in Claude», che nel frattempo è diventato un tema annunciato con le sue fonti. Le due voci non vanno scritte due volte.

**Il mestiere che cambia:** proposta dall'utente il 22 settembre 2026 con una fonte sola, annotata in `docs/FONTI-DA-INTEGRARE.md` sotto «Fonti da valutare». Il mio parere è di non aprirla, perché quel pezzo descrive come si sposta il lavoro di chi progetta mentre la guida dice cosa fare, e le tre cose che se ne salvano hanno già una destinazione, cioè «Progettare il contesto», `T4` e «Verificare il risultato». La decisione è dell'utente, e fino ad allora la voce resta qui, senza chiave e senza annuncio in «Prossimi argomenti».

---

## Decisioni prese, da non riaprire

- **`a2ui-project/a2ui` non diventa un tema,** deciso l'8 settembre 2026, perché cambia la domanda a cui la guida risponde. Si riapre a una di due condizioni, un progetto Lotrek con un'interfaccia composta a runtime, oppure un formato equivalente pubblicato da Anthropic per Claude.
- **Le skill di Figma restano due sezioni distinte,** una per quelle che partono da Claude Code e una per quelle che esegue l'agente dentro Figma, e ogni titolo deve dire chi esegue la skill e dove.
- **«Lo "spec" come ancora» non si ripropone come sezione,** perché è stata fusa in «Dividere il lavoro tra Claude Desktop e Claude Code» il 17 agosto 2026. La fonte resta valida, era il peso a non reggere una sezione.
- **Due zone restano fuori dal giro sul context engineering,** cioè «Scrivere una richiesta» con chain-of-thought e tree-of-thought, che l'articolo non copre, e i nomi dei modelli, che stanno fuori dal testo perché la guida parla di metodo.
- **Il quickstart dei Managed Agents è fuori perimetro,** perché chiede una chiave API, una CLI e un SDK, mentre la guida si ferma a quello che gira sulla macchina di chi progetta.

---

## Debito che non è lavoro di testo

Si trova in `docs/MEMORY.md` sotto «In sospeso / da valutare» e qui vale solo il richiamo, perché tocca il testo da vicino. Quattordici voci del catalogo di skill, su sessantasei, sono sopra il tetto delle 240 battute e si accorciano quando si mette mano alla loro riga. «UX.md» porta ancora il badge «In lavorazione». Le categorie del catalogo di skill sono H3 e nella spalla pesano quanto un capitolo.
