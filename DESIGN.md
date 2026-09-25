# DESIGN.md

Il design system di questa piattaforma, scritto perché lo legga un agente prima di toccare `src/template.html`. Fotografa i valori in uso al 24 agosto 2026, dice quali sono verificati contro il file Figma e quali no, e dichiara i punti dove il sistema non c'è ancora.

Regola sola che vale su tutto: nessun valore nuovo si inventa a occhio. O è qui dentro, o si aggiunge qui prima di scriverlo nel CSS.

## Da dove vengono i valori

La fonte del colore e delle icone è il file Figma WTF, chiave `29FQjdxBn7fesbU3NJkDxM`. Contiene cinque sezioni: Palette, Primary palette, Semantic palette, Color pairings, Icons. Non contiene tipografia, spaziature né componenti, che arrivano dal CSS di produzione di lotrek.it.

**Cosa si rilegge da MCP:** nel file solo Electric Lime, con undici gradini da 50 a 950, e la palette semantica, con ventisette gradini fra Success, Warning e Danger, sono legati a variabili Figma. La sezione Palette espone sei valori nominati. Shark, Edward e Nebula esistono come scale disegnate ma sono riempimenti crudi, quindi `get_variable_defs` su quei frame torna vuoto.

**Cosa ne segue per noi:** dieci dei nostri valori si possono riverificare in automatico, gli altri no. Chi cambia un token che non sta nell'elenco verificato apre il file Figma e legge il gradino a mano, poi annota qui il valore letto.

Verificati contro le variabili del file il 23 agosto 2026:

| Gradino del sistema | Valore | Dove lo usiamo |
|---|---|---|
| Electric Lime/400 | `#cbfb0e` | `--accent` nei due temi |
| Electric Lime/500 | `#b1e201` | `--accent-line` in chiaro |
| Shark/950 | `#232323` | `--ink` in chiaro, `--bg` in scuro |
| Nebula/50 | `#f3f8f7` | `--bg` in chiaro, `--ink` in scuro |
| Nebula/200 | `#cce0df` | `--border` e `--code-line` in chiaro |
| Edward/500 | `#9baaaa` | `--muted` in scuro |
| Success/800 | `#3a8a0d` | `--ok` in chiaro |
| Success/600 | `#6ccd1e` | `--ok` in scuro |
| Danger/600 | `#db2e30` | `--ko` in chiaro |
| Danger/500 | `#ff4c3e` | `--ko` in scuro |

## Colore

Diciassette token per tema, dichiarati in `:root` e `:root[data-theme="dark"]`.

| Token | Chiaro | Scuro | Gradino |
|---|---|---|---|
| `--bg` | `#f3f8f7` | `#232323` | Nebula/50 · Shark/950 |
| `--bg-chrome` | `#f3f8f7` | `#232323` | uguale al fondo |
| `--surface` | `#ffffff` | `#2c2c2c` | bianco · interpolato |
| `--surface-2` | `#f7f8f7` | `#282828` | Edward/50 · interpolato |
| `--ink` | `#232323` | `#f3f8f7` | Shark/950 · Nebula/50 |
| `--ink-soft` | `#3d3d3d` | `#dfedec` | Shark/900 · Nebula/100 |
| `--muted` | `#546061` | `#9baaaa` | Edward/800 · Edward/500 |
| `--border` | `#cce0df` | `#454545` | Nebula/200 · Shark/800 |
| `--border-strong` | `#9ec3c1` | `#4f4f4f` | Nebula/300 · Shark/700 |
| `--accent` | `#cbfb0e` | `#cbfb0e` | Electric Lime/400 |
| `--accent-ink` | `#232323` | `#232323` | Shark/950 |
| `--accent-line` | `#b1e201` | `#cbfb0e` | Electric Lime/500 · 400 |
| `--tint-hover` | `#dfedec` | `#3d3d3d` | Nebula/100 · Shark/900 |
| `--code-tint` | `#dfedec` | `#2c2c2c` | Nebula/100 · interpolato |
| `--code-line` | `#cce0df` | `#3d3d3d` | Nebula/200 · Shark/900 |
| `--ok` | `#3a8a0d` | `#6ccd1e` | Success/800 · Success/600 |
| `--ko` | `#db2e30` | `#ff4c3e` | Danger/600 · Danger/500 |

**Il lime segna lo stato attivo:** l'hover resta neutro con `--tint-hover` e il codice inline resta nella famiglia del fondo con `--code-tint`. Sopra L\* 95 il lime perde identità e legge giallo, quindi le velature chiare non funzionano come accento.

**Una superficie sola:** topbar, spalla e colonna di lettura stanno sullo stesso fondo, come su lotrek.it, e a separarle c'è il filetto `--border`.

**I due token semantici cambiano gradino col tema,** come già fanno `--muted` e `--accent-line`. Sono icone e non testo, quindi la soglia è il 3:1 del criterio 1.4.11, misurato su `--surface-2`. Sul fondo chiaro passano solo i gradini fondi, perché Success/500 sta a 1,37:1 e Success/700 a 2,71, mentre l'800 arriva a 4,09. Sul fondo scuro succede il contrario, perché Success/800 scende a 3,38 e il 600 sale a 7,29. Sul rosso il salto è più corto, con Danger/600 a 4,44 in chiaro e Danger/500 a 4,46 in scuro. Il segno di spunta e la croce dicono la stessa cosa senza il colore, che resta un rinforzo e non l'unico portatore di significato.

**Tre deviazioni dichiarate:** `--muted` in chiaro usa Edward/800 `#546061` invece dei due grigi della sezione Palette, perché Edward/600 `#78898a` si ferma a 3,9:1 sul fondo e non passa AA sul testo piccolo; questo sta a 6,08:1 sulla colonna e 5,42:1 sulla spalla. `--surface` e `--surface-2` del tema scuro sono interpolati, perché la scala Shark finisce a 950 e sotto il fondo non c'è nessun gradino; se al file Figma arrivano un 960 e un 980 si agganciano. `--accent-line` in chiaro scende al 500 perché il 400 puro sul fondo chiaro fa 1,13:1 e il filetto dei link sparisce.

## Tipografia

Ronzino di Collletttivo, licenza SIL OFL 1.1, self-hostata in `assets/fonts/` con sei file woff2. Il monospace è IBM Plex Mono da Google Fonts, l'unica dipendenza esterna a runtime.

**La famiglia ha 400, 500 e 700, senza il 600:** si usano i token `--w-regular`, `--w-medium` e `--w-bold`. Un `font-weight: 600` scritto a mano il browser lo risolve in Bold ovunque, quindi sparisce la distinzione fra testo medio e grassetto.

**La scala della prosa** si misura in `rem` e ha cinque gradini: 18 corpo, 20 h4, 24 h3, 33,6 h2, 52,8 h1. H1 e h2 sono `clamp()` e scendono a 33,6 e 25,6 sui viewport stretti. La crenatura si stringe man mano che il corpo cresce, da −.005em sui micro-testi a −.025em sull'h1: Lotrek non ha maiuscoletti nel sistema e stringe sempre.

**Sotto la prosa c'è un gradino solo,** `.92rem` con interlinea 1,55 invece dell'1,7, e lo usano la nota dello schema a tre passaggi e il testo dei riquadri affiancati. L'1,7 è tarato sui 18px su una colonna larga il doppio, e a corpo minore in mezza colonna apre troppo.

**Il ritmo verticale della prosa** poggia su tre token, tutti multipli di 8px: `--gap-cap` 128px sopra un capitolo, `--gap-sez` 56px sopra una sezione, `--gap-sub` 32px sopra un h4. Sotto i titoli lo spazio scala 32 / 16 / 12 / 8 per h1–h4. Nella colonna di lettura non ci sono filetti orizzontali e a separare è solo il vuoto, che è la ragione di un gap di capitolo così ampio. I margini dei titoli non vanno mai in `em`, altrimenti un capitolo prende meno aria di una sezione perché il suo occhiello ha corpo 12px.

**L'interfaccia non ha ancora una scala:** topbar, spalla, tooltip, CTA e badge usano nove corpi in px fra 12 e 18, sette dei quali si concentrano in cinque pixel di distanza (13, 13,5, 14, 14,5, 15, 16, 16,5). Sono aggiustamenti stratificati, non gradini di un sistema. Finché la scala non c'è, un valore nuovo si prende fra quelli già in uso e non se ne aggiungono altri.

## Spaziatura

La prosa poggia su multipli di 8 in `rem`, come sopra. L'interfaccia usa ventisette valori px distinti fra 2 e 120, senza token, e quattro di questi (8, 12, 20, 18) coprono trentadue dichiarazioni su settanta. Stessa regola della tipografia: si pesca fra i valori già in uso, si preferiscono i quattro frequenti, non se ne inventano di nuovi.

## Bersagli da dito

Vale sotto i 1024px, cioè dove la spalla diventa il pannello a pieno schermo. Sopra, l'indice è denso e si legge col mouse, e una riga da 35px va bene.

- **48px** le macro-voci dell'indice, la CTA e il campo di ricerca. È la soglia Material, e sono i bersagli che si toccano più spesso.
- **44px** le sotto-voci, il link «Playbook», il pulsante del menu e quello del tema. È la soglia Apple, ed è anche il massimo che sta in una topbar alta 60px lasciando 8px di respiro.
- **4px almeno fra due bersagli adiacenti.** Le sotto-voci erano attaccate, senza un pixel fra l'una e l'altra: un pollice che sbaglia di poco apriva la sezione sbagliata.

## Raggi

Il sistema Lotrek usa due raggi, `0` e `100px`. Qui ne servono quattro, e tre stanno scritti a mano nel CSS:

- **Spigolo vivo:** frame, tabelle, blocchi di codice, immagini. Token `--radius` e `--radius-sm`, che valgono entrambi zero.
- **4px:** voci dell'indice, chip di codice inline, tooltip. Cinque occorrenze scritte a mano.
- **100px:** pillole, CTA, bottone Menu.
- **50%:** bottoni tondi con la sola icona.

Due token per lo stesso valore e i tre raggi veri fuori dai token: da sistemare quando si mette mano ai token dell'interfaccia.

## Icone

Il sistema ne ha quindici nella sezione Icons del file WTF, nodo `1:427`: `arrow-right`, `arrow-upright`, `check`, `chevron-down`, `chevron-up`, `close`, `copy`, `download`, `share`, `link`, `menu`, `mode-dark`, `mode-light`, `plus`, `minus`. La sedicesima è `search`, disegnata il 23 agosto 2026 per il campo di ricerca ed entrata nel file Figma come nodo `10:2`.

**Forma:** 24×24, tratto 1,5, `stroke-miterlimit: 10`, nessun raccordo arrotondato. Le Lucide, che stavano a tratto 2, sono state tolte il 22 agosto. Un'icona che serve e sta già nel file si copia da lì con questi quattro attributi.

I loghi di prodotti terzi non sono icone di sistema e non seguono questa regola: si prende il file ufficiale del marchio e non lo si ridisegna.

**Un'icona che non c'è la disegna Mattia.** Non si prende da Lucide, da Feather o da altre librerie, e non si abbozza un path a mano: si chiede a lui, che la aggiunge al file Figma, e poi entra nello sprite. Un segno estraneo si vede accanto a quelli di casa, ed è già successo.

**Dove stanno le nostre dieci:** nove come `<symbol>` nello sprite in coda a `src/template.html`, che porta i nomi del sistema con il prefisso `ico-` (`ico-copy`, `ico-link`, `ico-check`, `ico-mode-light`, `ico-mode-dark`, `ico-arrow-upright`, `ico-close`, `ico-chevron-down`, `ico-search`). La decima è `arrow-right`, che sta come maschera CSS dentro il token `--ico-arrow-right` perché un `::before` non può puntare a un `<symbol>` dello sprite.

Un'icona nuova entra nello sprite, non nel markup generato da `scripts/build.mjs` e non in un token. Il chevron dell'indice ci stava fino al 23 agosto 2026.

Due cose restano aperte, e sono scelte di design da fare. La CTA «Scarica la guida» non ha l'icona `download`, che nel sistema esiste. Il bottone «Menu» non ha `icon/menu`.

## Il campo di ricerca

Componente nuovo del 23 agosto 2026, e usa solo materiale che c'era già.

**Forma:** pillola da 100px come i bottoni di casa, alta 38px, fondo `--surface` e filetto `--border`. Sul fondo unico della chrome un campo trasparente si leggerebbe come un'etichetta, e il gradino di superficie è l'unico modo di dire che ci si può scrivere dentro.

**In focus il filetto del campo passa al lime** `--accent-line`, con un'ombra da 1px dello stesso colore che ne raddoppia lo spessore senza spostare niente. Non è il token `--accent`, perché il 400 pieno sul fondo chiaro fa 1,13:1 e la riga sparirebbe. Gli altri comandi della topbar tengono l'anello `:focus-visible` con lo scostamento: qui il campo ha già un suo filetto, e cambiargli colore dice la stessa cosa senza aggiungere un secondo segno.

**La X di svuotamento compare solo quando c'è del testo.** Nel CSS serve `[hidden] { display: none !important; }`, perché un `display` d'autore batte lo stile che l'attributo `hidden` porta da sé.

**La tendina** poggia su `--surface` con raggio 4px, lo stesso dei tooltip e delle voci d'indice, e l'ombra `--shadow`.

**Il termine trovato** si segna con un filetto sotto in `--accent-line`, che è il ruolo che quel token ha già sui link. Il lime pieno resta lo stato attivo e non entra nei risultati.

**L'atterraggio lampeggia** per due secondi con `--tint-hover`, la stessa velatura neutra dell'hover, e sfuma senza lasciare stato. Serve perché su una riga di glossario o di catalogo si arriva in mezzo a quaranta righe uguali.

**Corpi:** 15px il campo, come il bottone di sistema; 14,5px il titolo del risultato; 13,5px lo spezzone; 12px l'etichetta del tipo. Tutti già in uso altrove, secondo la regola qui sopra.

## Lo schema a riquadri

Componente nato il 2 settembre 2026 come schema a tre passaggi e generalizzato il 21 settembre in una famiglia, perché servivano anche due riquadri e tre riquadri senza freccia. Si compone di tre classi.

- **`flow`** porta la griglia, i riquadri e i corpi. Da sola non basta.
- **`flow-2` e `flow-3`** dicono quante colonne. Sotto i 700px tutte e due passano a una colonna sola.
- **`flow-steps`** aggiunge la freccia `arrow-right` fra un riquadro e l'altro, e sotto i 700px la freccia diventa verticale.

**Il numero di colonne e la freccia sono separati apposta,** perché non tutti gli schemi sono sequenze. Dove i riquadri sono categorie affiancate la freccia direbbe una cosa falsa, quindi `flow-steps` si mette solo dove c'è un ordine. Gli usi sono tre. In «Rendere il design system leggibile dall'AI» `flow-3 flow-steps` porta authoring, specification e delivery. In «Dividere il lavoro tra Claude Desktop e Claude Code» `flow-2 flow-steps` porta i due ambienti, e la freccia è il markdown che passa dall'uno all'altro. In «I file di contesto» `flow-3` senza freccia porta i tre regimi di caricamento, cioè caricati sempre, aperti quando servono e collegati.

**Forma:** `--surface`, filetto `--border`, raggio `--radius`, padding 18 sopra e sotto e 20 ai lati. Dal 2 settembre 2026 il fondo è **bianco** e non più `--surface-2`, su indicazione dell'utente: erano gli unici riquadri della guida su fondo grigio, mentre i riquadri affiancati stavano già su `--surface`. Sono le card che nel sistema si distinguono dalla pagina per la superficie, non per la velatura.

**Corpi:** l'occhiello del passaggio a `.82rem` in peso regular, il luogo in `--w-medium` sul corpo della prosa, la nota in fondo a `.92rem` con interlinea 1,55, separata da un filetto.

## I riquadri affiancati

Componente del 23 agosto 2026, usato due volte. In coda a «Checklist pre-richiesta e segnali» porta i due esiti, quello che dice che il lavoro sta funzionando e quello che dice il contrario. In coda a «Deploy del prototipo» mette a confronto GitHub Pages e Vercel.

**Forma:** la stessa dei blocchi di codice e delle tabelle, cioè `--surface`, filetto `--border`, spigolo vivo e ombra `--shadow`. Padding 24 sopra e sotto e 20 ai lati. Fra il segno in cima e il testo ci sono 20px. Sotto i 700px i due riquadri si impilano.

**L'icona apre il riquadro in alto a sinistra,** `check` nel primo e `close` nel secondo, dallo sprite. Sotto stanno il titolo, sul corpo della prosa, e il testo, che scende a `.92rem` come la nota dello schema a tre passaggi. Il riquadro è da 32px sul disegno da 24, quindi il tratto 1,5 del sistema scala a 2px ottici senza che si debba ridisegnare niente. Un tratto 2 scritto nel simbolo diventerebbe 2,67 a questa misura, e sarebbe un peso che il sistema non ha.

**Il colore viene dalla palette semantica,** con `--ok` e `--ko`, ed è il primo posto in cui la usiamo.

**Nella variante di confronto il logo prende il posto dell'icona,** alto 24px e allineato a sinistra come lei, e il riquadro non ha titolo perché il marchio lo fa già. I due file si trovano in `assets/logo-github.png` e `assets/logo-vercel.png`, ridotti a 80px di altezza, cioè tre volte la misura a schermo. Restano del loro nero invece di prendere `--ink`, perché le linee guida dei due marchi non li vogliono ricolorati, e sul tema scuro si invertono in bianco, che è l'uso monocromatico che entrambe prevedono. Nel blocco `@media print` l'inversione va spenta, altrimenti chi stampa dal tema scuro ottiene un logo bianco su carta bianca. La misura è su `.prose .verdict-logo` e non sulla classe da sola, perché `.prose img` porta `height: auto` ed è più specifica.

## La card di rimando

Componente del 24 agosto 2026, usato una volta, in coda a «Rendere il design system leggibile dall'AI». Porta a un articolo esterno e non sostituisce la voce nelle fonti, che resta.

**Forma:** la stessa dei riquadri affiancati, cioè `--surface`, filetto `--border`, spigolo vivo e ombra `--shadow`. Tre colonne, l'immagine da 120px, il testo e la freccia, con 20px fra l'una e l'altra e 20px di padding sopra e sotto il testo. L'immagine non ha padding e riempie la colonna in altezza, quindi la card è alta quanto il testo e il taglio lo fa `cover`. Sotto i 700px l'immagine scende a 80px e il resto non cambia.

**Il bersaglio è tutta la card,** quindi il filetto lime che il link di prosa porta con sé qui si toglie, e a toglierlo è il fondo pieno, che azzera il gradiente ereditato da `a[href]`.

**L'hover cambia due cose sole,** il filetto che sale a `--border-strong` e la freccia, che passa da `--muted` a `--ink` e scarta di 2px nella direzione in cui punta. La superficie non si muove: due segni bastano, e un terzo sul fondo avrebbe fatto lampeggiare tutta la card sotto il mouse. Lo scarto della freccia è il solo movimento del componente, e sotto `prefers-reduced-motion` cade insieme alla transizione. Il lime non entra, perché segna lo stato attivo e non il passaggio del mouse. Il fuoco prende l'anello `--accent-line` con lo scostamento, come gli altri comandi dell'interfaccia: il link di prosa non ne ha uno, e una card che si raggiunge da tastiera senza vedersi non va bene.

**La freccia è `arrow-upright`** dallo sprite, a 24px. È lo stesso segno che in topbar dice che il link esce dal sito.

**L'immagine di anteprima** è quella pubblicata dall'articolo, in `assets/fantasy-caroline-hilman.webp`: 360px di larghezza per 120 a schermo, 15 KB.

## La figura

Componente del 21 settembre 2026, nato per spezzare i muri di testo delle sezioni che spiegano un concetto. Porta uno schema pubblicato da una fonte, non un'illustrazione decorativa, e la didascalia dichiara da dove viene. È il solo posto della guida dove autore e testata compaiono fuori dalle fonti, perché la didascalia è fuori dal filo del ragionamento e l'attribuzione è quello che rende difendibile la ripubblicazione.

**Forma:** `<figure class="figure">` con l'immagine e una `<figcaption>`. Larghezza massima 560px e non i 74ch della prosa, perché uno schema quadrato a piena colonna diventa un blocco alto mezzo schermo e spezza la lettura invece di aiutarla. Centrata, con 2em sopra e sotto. Sotto i 700px la massima cade e la figura prende tutta la colonna.

**Il filetto `--border` attorno all'immagine non è decorazione.** Gli schemi delle fonti portano il loro fondo, che è quasi sempre chiaro: senza filetto, in tema scuro l'immagine galleggia sulla pagina senza un bordo che la chiuda. Spigolo vivo come le tabelle e i blocchi di codice.

**La didascalia** è a 0,92rem in `--muted`, con 10px di stacco dall'immagine. Regola dell'utente del 21 settembre 2026: un titolo molto stringato e il link alla fonte, separati da un punto mediano, e niente frasi. Il titolo dice cosa mostra il disegno e non ripete il titolo della sezione, quindi sotto «I tre ruoli del contesto» la didascalia è «Globale, locale e di sfondo». Il link prende il filetto lime del link di prosa, che qui va bene perché porta fuori dal sito.

**Il formato è WebP,** ricavato dal PDF in `sources/` e ridimensionato al doppio della misura a schermo. La prima, `assets/nng-tre-ruoli-contesto.webp`, è 1106×1120 per 560 a schermo e pesa 29 KB. Si rifà con tre comandi:

```bash
pdfimages -png -p "sources/<articolo>.pdf" /tmp/fig
sips -Z 1120 /tmp/fig-<pagina>-<indice>.png
cwebp -q 82 /tmp/fig-<pagina>-<indice>.png -o assets/<nome>.webp
```

**L'immagine non si ritocca.** Niente ritagli, niente cambi di fondo per avvicinarla alla palette: una figura di altri si riproduce intera o non si riproduce. Se il fondo stona troppo, la strada è ridisegnare lo schema, non correggere il loro.

## Il badge di stato

Pill lime accanto a un titolo, fondo `--accent` e testo `--accent-ink`, che segnala una sezione ancora in movimento. La sintassi è `{badge:Testo}` a fine heading e la gestisce `scripts/build.mjs`. Il corpo è fisso a 15px, uno dei nove già in uso nell'interfaccia, e non in `em`: legato al titolo darebbe 14,9px su un h3 e 20,8px su un h2, cioè due badge diversi per la stessa etichetta.

Nell'indice laterale la stessa marcatura diventa un pallino da 6px in `--accent-line`, davanti alla voce. Sulla macro-voce di un H2, che è un flex con gap 8px, il pallino azzera il margine destro che gli serve nelle voci di terzo livello, altrimenti lo stacco si somma e diventa 16.

## La nota delle novità

Componente del 25 settembre 2026. Dice a chi apre la guida cosa è stato aggiunto, in una frase, e sparisce da sé. Si scrive in `src/content.md` come riga `{novita:AAAA-MM-GGTHH:MM+02:00|testo}` sotto il titolo, e la gestisce `scripts/build.mjs`, che ci mette sopra il titolo «Aggiornamento del» con giorno e mese e converte i rimandi «Titolo» in link come nel corpo.

**Resta sette giorni dalla data scritta nel sorgente.** La build non la scrive più dopo la scadenza, e fino alla build successiva la nasconde il browser. Chi la chiude con la X non la rivede: il browser si ricorda la data della nota chiusa, quindi una nota nuova, con un'altra data, torna a comparire.

**Forma:** il riquadro ha fondo `--accent` e testo `--accent-ink`, le stesse due tinte del badge di stato, uguali nei due temi. Spigolo vivo, perché su due o tre righe una pillola da 100px si deforma. Padding 20 sopra e sotto, 24 a sinistra e 60 a destra, dove si trova la X, con 40px di stacco dall'occhiello dell'apertura, lo stesso margine che l'apertura ha sotto. Il titolo è a 1rem in `--w-bold`, come il titolo dei riquadri affiancati, con l'interlinea 1,35 dell'h4 e 2px sotto, così titolo e testo si leggono come un blocco solo, e il testo è sul gradino `.92rem` con interlinea 1,55, quello della nota dello schema. Le regole stanno sotto `.prose .novita`, perché `.prose p` viene dopo nel CSS e rimetterebbe 20px sotto l'ultimo paragrafo.

**Il link cambia colore e non gesto:** tiene il filetto animato del link di prosa, in `--accent-ink` invece che in `--accent-line`, che sul lime sparirebbe.

**La X è `close` dallo sprite,** su un bottone tondo da 38px, come quello del tema, che sotto i 1024px sale a 44. Sta nell'angolo in alto a destra, a 12px dall'alto e da destra, che sotto i 1024px diventano 8: il centro cade sulla riga del titolo e il segno visibile finisce a 24px dal bordo, come il testo a sinistra. L'hover inverte le due tinte, fondo `--accent-ink` e segno `--accent`: `--tint-hover` sul lime darebbe un grigio che nel tema scuro diventa quasi nero, e la coppia invertita è la stessa nei due temi. Il fuoco prende un anello di 2px in `--accent-ink`, perché l'anello `--accent-line` degli altri comandi sul lime non si vede.

**Non si stampa,** quindi non entra nel PDF, che si genera durante il deploy mentre la nota è ancora valida e resterebbe con un avviso scaduto.

**Si riscrive a ogni contenuto nuovo** e non per correzioni, tagli o ritocchi di forma. È una regola dell'utente del 25 settembre 2026, scritta per intero in `CLAUDE.md`.

## L'immagine di anteprima del link

Scheda di Open Graph, dal 16 settembre 2026, in `assets/og-image.jpg`: 1200×630, 137 KB. La leggono Slack, WhatsApp, LinkedIn e X quando qualcuno incolla l'indirizzo della guida.

**È il ritaglio dell'immagine di apertura,** così la scheda e la pagina mostrano la stessa figura e non restano due immagini da aggiornare. `assets/hero-figma-skills.webp` è 1520×855, cioè 16:9, e la scheda vuole 1200×630. Il ritaglio centrato toglie 57px di altezza, divisi fra sopra e sotto, e il terminale, che occupa la fascia fra 215 e 640, resta intero. Si rifà con quattro comandi, dove gli ultimi tre riscrivono il file temporaneo:

```bash
sips -s format png assets/hero-figma-skills.webp --out /tmp/og.png
sips -c 798 1520 /tmp/og.png
sips -z 630 1200 /tmp/og.png
sips -s format jpeg -s formatOptions 88 /tmp/og.png --out assets/og-image.jpg
```

**JPEG e non il WebP dell'originale,** perché non tutti gli scraper leggono il WebP, e una scheda senza immagine costa più dei 137 KB. Lo stesso ritaglio in PNG pesa 380 KB, e a questa misura gli artefatti del JPEG all'88 non si vedono.

Il testo alternativo è quello dell'immagine di apertura, che descrive anche il ritaglio. Gli indirizzi nei meta tag sono assoluti e puntano alla produzione, quindi la scheda è la stessa anche condividendo il link dell'anteprima.

## Cosa il sistema ha e noi non usiamo

**Palette semantica:** dei ventisette gradini fra Success, Warning e Danger ne usiamo quattro, i due di `--ok` e i due di `--ko`. Warning resta fuori, perché la guida non ha un blocco attenzione.

**Color pairings:** venticinque accostamenti approvati nel file, mai consultati per questa piattaforma.

## Debito noto

- Il blocco `@media print` di `src/template.html` riscrive a mano diciassette token di colore invece di poggiare sul tema chiaro. Sono gli unici diciotto valori esadecimali fuori dai token, e ogni ritocco alla palette va fatto due volte.
- L'interfaccia non ha token di corpo, di spaziatura e di raggio.
- La favicon in `assets/lotrek-favicon.svg` pesa 139 KB con un solo `<path>`, il doppio dell'immagine di apertura.
