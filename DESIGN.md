# DESIGN.md

Il design system di questa piattaforma, scritto perché lo legga un agente prima di toccare `src/template.html`. Fotografa i valori in uso al 24 agosto 2026, dice quali sono verificati contro il file Figma e quali no, e dichiara i punti dove il sistema non c'è ancora.

Regola sola che vale su tutto: nessun valore nuovo si inventa a occhio. O sta qui dentro, o si aggiunge qui prima di scriverlo nel CSS.

## Da dove vengono i valori

La fonte del colore e delle icone è il file Figma WTF, chiave `29FQjdxBn7fesbU3NJkDxM`. Contiene cinque sezioni: Palette, Primary palette, Semantic palette, Color pairings, Icons. Non contiene tipografia, spaziature né componenti, che arrivano dal CSS di produzione di lotrek.it.

**Cosa si rilegge da MCP:** nel file solo Electric Lime, con undici gradini da 50 a 950, e la palette semantica, con ventisette gradini fra Success, Warning e Danger, sono legati a variabili Figma. La sezione Palette espone sei valori nominati. Shark, Edward e Nebula esistono come scale disegnate ma sono riempimenti crudi, quindi `get_variable_defs` su quei frame torna vuoto.

**Cosa ne segue per noi:** sei dei nostri valori si possono riverificare in automatico, gli altri sette no. Chi cambia un token che non sta nell'elenco verificato apre il file Figma e legge il gradino a mano, poi annota qui il valore letto.

Verificati contro le variabili del file il 23 agosto 2026:

| Gradino del sistema | Valore | Dove lo usiamo |
|---|---|---|
| Electric Lime/400 | `#cbfb0e` | `--accent` nei due temi |
| Electric Lime/500 | `#b1e201` | `--accent-line` in chiaro |
| Shark/950 | `#232323` | `--ink` in chiaro, `--bg` in scuro |
| Nebula/50 | `#f3f8f7` | `--bg` in chiaro, `--ink` in scuro |
| Nebula/200 | `#cce0df` | `--border` e `--code-line` in chiaro |
| Edward/500 | `#9baaaa` | `--muted` in scuro |

## Colore

Tredici token per tema, dichiarati in `:root` e `:root[data-theme="dark"]`.

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

**Il lime segna lo stato attivo:** l'hover resta neutro con `--tint-hover` e il codice inline sta nella famiglia del fondo con `--code-tint`. Sopra L\* 95 il lime perde identità e legge giallo, quindi le velature chiare non funzionano come accento.

**Una superficie sola:** topbar, spalla e colonna di lettura stanno sullo stesso fondo, come su lotrek.it, e a separarle c'è il filetto `--border`.

**Tre deviazioni dichiarate:** `--muted` in chiaro usa Edward/800 `#546061` invece dei due grigi della sezione Palette, perché Edward/600 `#78898a` si ferma a 3,9:1 sul fondo e non passa AA sul testo piccolo; questo sta a 6,08:1 sulla colonna e 5,42:1 sulla spalla. `--surface` e `--surface-2` del tema scuro sono interpolati, perché la scala Shark finisce a 950 e sotto il fondo non c'è nessun gradino; se al file Figma arrivano un 960 e un 980 si agganciano. `--accent-line` in chiaro scende al 500 perché il 400 puro sul fondo chiaro fa 1,13:1 e il filetto dei link sparisce.

## Tipografia

Ronzino di Collletttivo, licenza SIL OFL 1.1, self-hostata in `assets/fonts/` con sei file woff2. Il monospace è IBM Plex Mono da Google Fonts, l'unica dipendenza esterna a runtime.

**La famiglia ha 400, 500 e 700, senza il 600:** si usano i token `--w-regular`, `--w-medium` e `--w-bold`. Un `font-weight: 600` scritto a mano il browser lo risolve in Bold ovunque, quindi sparisce la distinzione fra testo medio e grassetto.

**La scala della prosa** vive in `rem` e ha cinque gradini: 18 corpo, 20 h4, 24 h3, 33,6 h2, 52,8 h1. H1 e h2 sono `clamp()` e scendono a 33,6 e 25,6 sui viewport stretti. La crenatura si stringe man mano che il corpo cresce, da −.005em sui micro-testi a −.025em sull'h1: Lotrek non ha maiuscoletti nel sistema e stringe sempre.

**Il ritmo verticale della prosa** sta su tre token, tutti multipli di 8px: `--gap-cap` 128px sopra un capitolo, `--gap-sez` 56px sopra una sezione, `--gap-sub` 32px sopra un h4. Sotto i titoli lo spazio scala 32 / 16 / 12 / 8 per h1–h4. Nella colonna di lettura non ci sono filetti orizzontali e a separare è solo il vuoto, che è la ragione di un gap di capitolo così ampio. I margini dei titoli non vanno mai in `em`, altrimenti un capitolo prende meno aria di una sezione perché il suo occhiello ha corpo 12px.

**L'interfaccia non ha ancora una scala:** topbar, spalla, tooltip, CTA e badge usano nove corpi in px fra 12 e 18, sette dei quali stanno in cinque pixel di distanza (13, 13,5, 14, 14,5, 15, 16, 16,5). Sono aggiustamenti stratificati, non gradini di un sistema. Finché la scala non c'è, un valore nuovo si prende fra quelli già in uso e non se ne aggiungono altri.

## Spaziatura

La prosa sta su multipli di 8 in `rem`, come sopra. L'interfaccia usa ventisette valori px distinti fra 2 e 120, senza token, e quattro di questi (8, 12, 20, 18) coprono trentadue dichiarazioni su settanta. Stessa regola della tipografia: si pesca fra i valori già in uso, si preferiscono i quattro frequenti, non se ne inventano di nuovi.

## Raggi

Il sistema Lotrek usa due raggi, `0` e `100px`. Qui ne servono quattro, e tre stanno scritti a mano nel CSS:

- **Spigolo vivo:** frame, tabelle, blocchi di codice, immagini. Token `--radius` e `--radius-sm`, che valgono entrambi zero.
- **4px:** voci dell'indice, chip di codice inline, tooltip. Cinque occorrenze scritte a mano.
- **100px:** pillole, CTA, bottone Menu.
- **50%:** bottoni tondi con la sola icona.

Due token per lo stesso valore e i tre raggi veri fuori dai token: da sistemare quando si mette mano ai token dell'interfaccia.

## Icone

Il sistema ne ha quindici nella sezione Icons del file WTF, nodo `1:427`: `arrow-right`, `arrow-upright`, `check`, `chevron-down`, `chevron-up`, `close`, `copy`, `download`, `share`, `link`, `menu`, `mode-dark`, `mode-light`, `plus`, `minus`.

**Forma:** 24×24, tratto 1,5, `stroke-miterlimit: 10`, nessun raccordo arrotondato. Le Lucide, che stavano a tratto 2, sono state tolte il 22 agosto. Un'icona che serve e sta già nel file si copia da lì con questi quattro attributi.

**Un'icona che non c'è la disegna Mattia.** Non si prende da Lucide, da Feather o da altre librerie, e non si abbozza un path a mano: si chiede a lui, che la aggiunge al file Figma, e poi entra nello sprite. Un segno estraneo si vede accanto a quelli di casa, ed è già successo.

**Dove stanno le nostre nove:** otto come `<symbol>` nello sprite in coda a `src/template.html`, che porta i nomi del sistema con il prefisso `ico-` (`ico-copy`, `ico-link`, `ico-check`, `ico-mode-light`, `ico-mode-dark`, `ico-arrow-upright`, `ico-close`, `ico-chevron-down`). La nona è `arrow-right`, che sta come maschera CSS dentro il token `--ico-arrow-right` perché un `::before` non può puntare a un `<symbol>` dello sprite.

Un'icona nuova entra nello sprite, non nel markup generato da `scripts/build.mjs` e non in un token. Il chevron dell'indice ci stava fino al 23 agosto 2026.

Due cose restano aperte, e sono scelte di design da fare. La CTA «Scarica la guida» non ha l'icona `download`, che nel sistema esiste. Il bottone «Menu» non ha `icon/menu`.

## Cosa il sistema ha e noi non usiamo

**Palette semantica:** ventisette gradini fra Success, Warning e Danger. La guida non ha blocchi nota o attenzione, quindi oggi non servono. Se un giorno arrivano, i valori si prendono da lì e non si inventano.

**Color pairings:** venticinque accostamenti approvati nel file, mai consultati per questa piattaforma.

## Debito noto

- Il blocco `@media print` di `src/template.html`, dalla riga 626, riscrive a mano tredici token invece di poggiare sul tema chiaro. Sono gli unici sedici valori esadecimali fuori dai token, e ogni ritocco alla palette va fatto due volte.
- L'interfaccia non ha token di corpo, di spaziatura e di raggio.
- La favicon in `assets/lotrek-favicon.svg` pesa 139 KB con un solo `<path>`, il doppio dell'immagine di apertura.
