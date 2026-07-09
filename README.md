# KB Design · AI — Guida HTML

Guida HTML del documento **"Progettare con l'AI"**, knowledge base del team di design Lotrek.
La sorgente è un unico markdown (`content.md`); un piccolo build script lo converte in una pagina HTML statica.

**🔗 Live: https://kb-design-ai.vercel.app**

Il design è ispirato a [repass.io](https://repass.io) — vedi `repass.io.md` per i token estratti (colori, tipografia, forme).

## Come funziona

```
content.md      ← la fonte di verità (modifichi qui)
template.html   ← il design bespoke (CSS, layout, tema, interazioni)
build.mjs       ← converte content.md → index.html (genera anche l'indice)
index.html      ← output generato (non versionato)
```

Il corpo della guida è **generato dal markdown**, mentre il template è **fatto a mano**: così il design resta curato e aggiornare i contenuti resta banale.

## Aggiornare la guida

1. Modifica `content.md`.
2. `npm run build` (rigenera `index.html` in locale per l'anteprima).
3. Pubblica: `./deploy.sh` (build + deploy su Vercel produzione).
4. Committa la fonte: `git add -A && git commit && git push`.

Prerequisito d'autenticazione per `deploy.sh`: una tantum `vercel login` nel tuo terminale, oppure `export VERCEL_TOKEN=…`.

## Sviluppo in locale

```bash
npm install
npm run build
# apri index.html nel browser, oppure servilo:
npx serve .
```

## Hosting

Il sito è pubblicato su **Vercel** (`deploy.sh`). Il progetto ospita anche la configurazione per **GitHub Pages** (`.github/workflows/deploy.yml`): al momento le build di Pages su questo account sono in coda lato GitHub; quando si sbloccano, il push su `main` ripubblica anche lì. Per un auto-deploy su ogni push, si può collegare il repo GitHub al progetto Vercel dalla dashboard (Project → Settings → Git).

## Struttura

| File | Ruolo |
|---|---|
| `content.md` | Contenuto della guida (fonte) |
| `template.html` | Shell HTML + CSS + JS (design) |
| `build.mjs` | Generatore markdown → HTML + indice |
| `deploy.sh` | Build + deploy su Vercel |
| `repass.io.md` | Design DNA di riferimento |
| `.github/workflows/deploy.yml` | CI/CD verso GitHub Pages (in attesa) |
