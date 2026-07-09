# KB Design · AI — Guida HTML

Guida HTML del documento **"Progettare con l'AI"**, knowledge base del team di design Lotrek.
La sorgente è un unico markdown (`content.md`); un piccolo build script lo converte in una pagina HTML statica pubblicata su **GitHub Pages**.

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
3. Commit + push su `main`.

Al push, la GitHub Action ricostruisce e ripubblica automaticamente su Pages. Nessun passaggio manuale.

## Sviluppo in locale

```bash
npm install
npm run build
# apri index.html nel browser, oppure servilo:
npx serve .
```

## Deploy (una tantum)

1. Crea un repository su GitHub e fai push di questo progetto.
2. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Il workflow `.github/workflows/deploy.yml` fa il resto a ogni push su `main`.

## Struttura

| File | Ruolo |
|---|---|
| `content.md` | Contenuto della guida (fonte) |
| `template.html` | Shell HTML + CSS + JS (design) |
| `build.mjs` | Generatore markdown → HTML + indice |
| `repass.io.md` | Design DNA di riferimento |
| `.github/workflows/deploy.yml` | CI/CD verso GitHub Pages |
