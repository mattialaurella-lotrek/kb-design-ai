# KB Design · AI — Guida HTML

Guida HTML del documento **«Progettare con l'AI»**, knowledge base del team di design Lotrek.
La sorgente è un unico markdown (`src/content.md`); un piccolo build script lo converte in una pagina HTML statica.

**🔗 Live: https://kb-design-ai.vercel.app**

Il design segue il design system Lotrek: palette e icone arrivano dal file Figma WTF, non da valori dedotti a occhio. I valori in uso, con l'indicazione di quali sono verificati contro il file, stanno in [`DESIGN.md`](./DESIGN.md).

## Come funziona

```
src/content.md        ← la fonte di verità (modifichi qui)
src/template.html     ← il design bespoke (CSS, layout, tema, interazioni)
scripts/build.mjs     ← converte content.md → index.html (genera anche l'indice)
index.html            ← output generato (non versionato)
scripts/make-pdf.mjs  ← stampa index.html in PDF con Chrome headless
progettare-con-lai.pdf ← il PDF scaricabile (non versionato)
```

Il corpo della guida è **generato dal markdown**, mentre il template è **fatto a mano**: così il design resta curato e aggiornare i contenuti resta banale.

## Aggiornare la guida

1. Modifica `src/content.md`.
2. `npm run build` (rigenera `index.html` in locale per l'anteprima).
3. Pubblica: `./deploy.sh` (build, PDF e deploy su Vercel produzione).
4. Committa la fonte: `git add -A && git commit && git push`.

Prerequisito d'autenticazione per `deploy.sh`: una tantum `vercel login` nel tuo terminale, oppure `export VERCEL_TOKEN=…`.

## Sviluppo in locale

```bash
npm install
npm run build
# apri index.html nel browser, oppure servilo:
npx serve .
```

Prima di pubblicare in produzione conviene passare da `./deploy.sh preview`, che assegna l'alias fisso [kb-design-ai-preview.vercel.app](https://kb-design-ai-preview.vercel.app) all'ultima anteprima.

## Hosting

Il sito è pubblicato su **Vercel** (`deploy.sh`), scope `lotrek`. Per un auto-deploy su ogni push, si può collegare il repo GitHub al progetto Vercel dalla dashboard (Project → Settings → Git).

## Struttura

| File | Ruolo |
|---|---|
| `CLAUDE.md` | Come si lavora sul repo: comandi, regole, convenzioni |
| `DESIGN.md` | Il design system della piattaforma: colore, tipografia, icone |
| `src/content.md` | Contenuto della guida (fonte) |
| `src/template.html` | Shell HTML + CSS + JS (design) |
| `scripts/build.mjs` | Generatore markdown → HTML + indice |
| `scripts/make-pdf.mjs` | Genera il PDF scaricabile della guida |
| `deploy.sh` | Build + deploy su Vercel |
| `docs/MEMORY.md` | Decisioni di lungo periodo e contesto |
| `docs/CHANGELOG.md` | Cronologia delle modifiche |
| `docs/FONTI.md` | Bibliografia del corpus di riferimento |
| `docs/HANDOFF.md` | Stato del progetto da incollare in una chat |
