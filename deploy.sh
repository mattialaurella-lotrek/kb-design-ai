#!/usr/bin/env bash
# Build + deploy della guida su Vercel.
#
# Prerequisito d'autenticazione (una delle due):
#   - una tantum nel tuo terminale:  vercel login
#   - oppure esporta un token:        export VERCEL_TOKEN=xxxxx
#
# Uso:
#   ./deploy.sh            pubblica in produzione su kb-design-ai.vercel.app
#   ./deploy.sh preview    pubblica un'anteprima con URL a sé, senza toccare la produzione
set -euo pipefail
cd "$(dirname "$0")"

PREVIEW_ALIAS="kb-design-ai-preview.vercel.app"

npm install
npm run build
# Il PDF scaricabile dalla CTA in coda all'indice. Si rigenera a ogni deploy,
# cosi' non puo' restare indietro rispetto alla pagina.
node scripts/make-pdf.mjs index.html progettare-con-lai.pdf

# staging con nome fisso = nome progetto Vercel (kb-design-ai -> kb-design-ai.vercel.app)
out="$(mktemp -d)/kb-design-ai"
mkdir -p "$out"
cp index.html "$out/"
cp progettare-con-lai.pdf "$out/"
cp -R assets "$out/"
cd "$out"

if [ "${1:-}" = "preview" ]; then
  # Ogni preview deploy nasce con un URL usa e getta. L'alias fisso serve a poter
  # mandare sempre lo stesso link: chi lo apre vede l'ultima anteprima pubblicata.
  url="$(vercel deploy --yes --scope lotrek ${VERCEL_TOKEN:+--token="$VERCEL_TOKEN"} | grep -Eo 'https://[a-z0-9.-]+\.vercel\.app' | tail -1)"
  vercel alias set "$url" "$PREVIEW_ALIAS" --scope lotrek ${VERCEL_TOKEN:+--token="$VERCEL_TOKEN"} >/dev/null
  echo
  echo "Anteprima: https://$PREVIEW_ALIAS"
else
  vercel deploy --prod --yes --scope lotrek ${VERCEL_TOKEN:+--token="$VERCEL_TOKEN"}
fi
