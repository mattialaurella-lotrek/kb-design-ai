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

out="$(mktemp -d)"
cp index.html "$out/"
cd "$out"

vercel deploy --prod --yes --scope lotrek ${VERCEL_TOKEN:+--token="$VERCEL_TOKEN"}
