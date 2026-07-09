#!/usr/bin/env bash
# Build + deploy della guida su Vercel (produzione).
#
# Prerequisito d'autenticazione (una delle due):
#   - una tantum nel tuo terminale:  vercel login
#   - oppure esporta un token:        export VERCEL_TOKEN=xxxxx
#
# Uso:  ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

npm install
npm run build

# staging con nome fisso = nome progetto Vercel (kb-design-ai -> kb-design-ai.vercel.app)
out="$(mktemp -d)/kb-design-ai"
mkdir -p "$out"
cp index.html "$out/"
cp -R assets "$out/"
cd "$out"

vercel deploy --prod --yes --scope lotrek ${VERCEL_TOKEN:+--token="$VERCEL_TOKEN"}
