# MEMORY

Memoria di progetto: decisioni di lungo periodo, contesto e convenzioni che devono sopravvivere tra le sessioni. Per la cronologia delle modifiche vedi [`CHANGELOG.md`](./CHANGELOG.md).

## Cos'è
Guida HTML «Progettare con l'AI», knowledge base del team di design Lotrek: context engineering, prompting, workflow Claude/Figma, skill e catalogo di riferimento.

- **Repo**: `mattialaurella-lotrek/kb-design-ai` (pubblico).
- **Live**: [kb-design-ai.vercel.app](https://kb-design-ai.vercel.app) (Vercel, scope `lotrek`) e [GitHub Pages](https://mattialaurella-lotrek.github.io/kb-design-ai/).

## Architettura
- `content.md` (fonte markdown) → `build.mjs` (marked) inietta nel `template.html` bespoke → `index.html`.
- `index.html` è **gitignored**: è un artefatto di build, non si versiona.
- Accento lime `#d9fb12`; token di design in `repass.io.md`.
- Tipografia: **Instrument Sans** (display + corpo) e **IBM Plex Mono** (codice).

## Pubblicazione — due canali
- **GitHub Pages**: si rigenera da sé nel workflow Actions a ogni push su `main` (ricostruisce `index.html`).
- **Vercel**: riceve l'HTML buildato in locale da `./deploy.sh` (build + copia `assets/` + `vercel deploy --prod --scope lotrek`).
- ⚠️ **Un push su `main` NON aggiorna Vercel**: per allineare entrambi i canali serve push *e* `./deploy.sh`.

## Convenzioni editoriali
- **Niente numeri di sezione** (né 1/1.1 né lettere A–J) nei titoli o nell'indice.
- **Rimandi interni per titolo** tra guillemet `«…»` nel sorgente: `build.mjs` li converte in virgolette curve.
- **Corsivi** (`*…*`) su termini tecnici/stranieri ed etichette (es. *heartbeat*, *Role/Focus/Do not*).
- **Smart quotes** e **neutralizzazione delle tilde singole**: automatiche in `build.mjs` (non gestirle a mano nel sorgente).

## Interfaccia
- **Indice laterale ad accordion** single-open: le macro-voci (H2) collassano le sotto-voci (H3), prima aperta di default, chevron, e l'accordion segue la parte in lettura. Markup generato in `build.mjs` (`.toc-group`/`.toc-macro`/`.toc-sub`), stile e logica in `template.html`.
- **Scrollspy deterministico**: l'attivo è l'ultimo titolo il cui bordo superiore ha oltrepassato la linea di lettura (`READ_LINE`, ~90px, coerente con `scroll-padding-top`), calcolato su `scroll` throttlato via `requestAnimationFrame`. Sostituisce il vecchio `IntersectionObserver` enter-only, che sfarfallava aprendo/chiudendo gli accordion ai confini di sezione. La spalla scorre da sé (`keepLinkVisible`) senza toccare la finestra; i click hanno una finestra `suppressUntil` (700ms) in cui lo scrollspy non interviene.
- **Occhielli di capitolo**: «Capitolo N» sulle H2 con sotto-sezioni (numerazione automatica), etichette non numerate su Glossario/Fonti via la mappa `BACKMATTER_KICKER` in `build.mjs`.

## In sospeso / da valutare
- **Variante indice «macro-voce solo espande»** (senza scroll del contenuto al click): valutata ma non adottata; l'utente ci ripenserà.
- **Differenziazione visiva degli occhielli di chiusura** (Appendice/Riferimenti) dai capitoli: possibile, non fatta.
- **Sezioni «2-bis» e «2-ter»** — da scrivere da zero, quando l'utente vorrà: 2-bis = plugin per Claude Code; 2-ter = architettura ad agenti/sub-agenti e workflow. Non esistono in nessun sorgente: non riproporle come lavoro imminente.

## Convenzione di manutenzione
A ogni sessione di lavoro, aggiornare `CHANGELOG.md` (cosa è cambiato) e questo `MEMORY.md` (decisioni/contesto).
