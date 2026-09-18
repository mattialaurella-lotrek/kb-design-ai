#!/usr/bin/env node
// Controlla i repository citati in src/content.md e stampa solo i casi da guardare:
// spariti, archiviati, fermi da oltre un anno, senza una licenza che GitHub riconosca.
//
// Non aggiorna niente e non tocca il sorgente: il registro dei repository resta il
// catalogo, e questo script lo ricontrolla invece di duplicarlo in un elenco a mano.
// Serve `gh` autenticato. Si lancia con `npm run check-repos`.
//
//   GIORNI_FERMO=730 npm run check-repos   # alza la soglia dell'abbandono

import { readFileSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const run = promisify(execFile)
const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..')
const GIORNI_FERMO = Number(process.env.GIORNI_FERMO ?? 365)
const PARALLELE = 8

function raccogli(sorgente) {
  const righe = readFileSync(join(RADICE, sorgente), 'utf8').split('\n')
  const trovati = new Map()
  const schema = /https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/g
  righe.forEach((riga, i) => {
    for (const [, proprietario, nome] of riga.matchAll(schema)) {
      const chiave = `${proprietario}/${nome.replace(/\.git$/, '')}`
      if (!trovati.has(chiave)) trovati.set(chiave, i + 1)
    }
  })
  return trovati
}

async function interroga(chiave) {
  try {
    const { stdout } = await run('gh', [
      'api',
      `repos/${chiave}`,
      '--jq',
      '{archiviato: .archived, licenza: .license.spdx_id, ultimo: .pushed_at, stelle: .stargazers_count, nome: .full_name}',
    ])
    return { chiave, ...JSON.parse(stdout) }
  } catch (errore) {
    const messaggio = String(errore.stderr || errore.message).split('\n')[0]
    return { chiave, irraggiungibile: messaggio.slice(0, 120) }
  }
}

async function aCoda(chiavi) {
  const esiti = []
  let prossima = 0
  const lavoratori = Array.from({ length: PARALLELE }, async () => {
    while (prossima < chiavi.length) {
      const mia = prossima++
      esiti[mia] = await interroga(chiavi[mia])
      if (process.stderr.isTTY) {
        process.stderr.write(`\r  controllati ${esiti.filter(Boolean).length}/${chiavi.length}`)
      }
    }
  })
  await Promise.all(lavoratori)
  if (process.stderr.isTTY) process.stderr.write('\r'.padEnd(40) + '\r')
  return esiti
}

function giorniDa(data) {
  return Math.floor((Date.now() - new Date(data)) / 86400000)
}

function stampa(titolo, voci, formato) {
  if (!voci.length) return
  console.log(`\n${titolo} (${voci.length})`)
  for (const voce of voci) console.log(`  ${formato(voce)}`)
}

const sorgente = process.argv[2] ?? 'src/content.md'
const trovati = raccogli(sorgente)
console.log(`${trovati.size} repository citati in ${sorgente}, soglia di abbandono a ${GIORNI_FERMO} giorni.\n`)

const esiti = await aCoda([...trovati.keys()])
const riga = (e) => trovati.get(e.chiave)

stampa(
  'Spariti o irraggiungibili',
  esiti.filter((e) => e.irraggiungibile),
  (e) => `${e.chiave} (riga ${riga(e)}): ${e.irraggiungibile}`
)
stampa(
  'Archiviati dal proprietario',
  esiti.filter((e) => e.archiviato),
  (e) => `${e.chiave} (riga ${riga(e)}), ${e.stelle} stelle`
)
stampa(
  `Fermi da oltre ${GIORNI_FERMO} giorni`,
  esiti
    .filter((e) => e.ultimo && !e.archiviato && giorniDa(e.ultimo) > GIORNI_FERMO)
    .sort((a, b) => giorniDa(b.ultimo) - giorniDa(a.ultimo)),
  (e) => `${e.chiave} (riga ${riga(e)}): ultimo commit ${e.ultimo.slice(0, 10)}, ${giorniDa(e.ultimo)} giorni fa`
)
stampa(
  'Licenza da verificare a mano',
  esiti.filter((e) => !e.irraggiungibile && (!e.licenza || e.licenza === 'NOASSERTION')),
  (e) =>
    `${e.chiave} (riga ${riga(e)}): ${
      e.licenza ? 'file di licenza presente ma non riconosciuto da GitHub' : 'nessun file di licenza'
    }`
)

const daGuardare = esiti.filter(
  (e) =>
    e.irraggiungibile ||
    e.archiviato ||
    (e.ultimo && giorniDa(e.ultimo) > GIORNI_FERMO) ||
    !e.licenza ||
    e.licenza === 'NOASSERTION'
).length

console.log(
  daGuardare
    ? `\n${daGuardare} repository su ${esiti.length} da guardare.`
    : `\nNessun caso da guardare: tutti e ${esiti.length} i repository sono vivi, con licenza e aggiornati.`
)
