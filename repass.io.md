# repass.io — Design DNA

> Estratto dai CSS di produzione di repass.io (Next.js), non da screenshot. I valori sono ground-truth dal foglio di stile servito.

## Design Map

### Colori
| Ruolo | Valore | Note |
|---|---|---|
| Inchiostro (testo) | `#181818` | Near-black caldo, colore dominante del testo |
| Superficie chiara | `#ffffff` / `#f5f5f5` | Bianco e off-white per il fondo |
| **Accento firma** | `#d9fb12` | Lime elettrico — il pop del brand, usato con parsimonia |
| Accento tenue | `#edf5b1` | Lime pallido per highlight/wash di sfondo |
| Scuro profondo | `#012129` | Petrolio quasi-nero per sezioni scure / contrasto |
| Neutri | `#e5e5e6` `#d4d4d6` `#b3b4b7` `#707378` `#44464c` | Scala grigi per bordi, testo secondario, divisori |

### Tipografia
- **Display / heading**: `KMRMelangeGrotesk` — grotesque geometrico (font custom, non ridistribuibile). Sostituto open equivalente: **Space Grotesk**.
- **Testo / editoriale**: `Source Serif 4` — serif da lettura (open, SIL OFL). Usato per il corpo: taglio tech-editoriale.
- Accoppiata chiave: **grotesk per i titoli + serif per la prosa**. È la firma tipografica.

### Forme e profondità
- Radii morbidi e coerenti: card `1rem` (16px), elementi piccoli `.5rem` (8px), micro `.25rem` (4px), pill `100px`.
- Ombre discrete: `rgba(0,0,0,.1)` — niente drop-shadow marcate.

## Taste DNA

**1. Un solo accento ad alta energia su base neutra.**
Trigger: serve far risaltare azioni/momenti chiave senza rumore. Decisione: tutta la palette è inchiostro-su-bianco, con un unico lime elettrico `#d9fb12` come pop. Reason: un accento saturo e raro pesa più di dieci colori tenui; la neutralità fa lavorare il contenuto. Evidence: `#d9fb12` compare 25 volte nel CSS, sempre come accento, mai come fondo esteso.

**2. Serif per leggere, grotesk per titolare.**
Trigger: contenuto testuale che deve risultare autorevole ma non "corporate-sterile". Decisione: Source Serif 4 per il corpo, grotesque per heading e label. Reason: il serif dà ritmo editoriale alla lettura lunga; il grotesk dà struttura tech ai titoli. Evidence: 6 weight di Source Serif 4 caricati (uso esteso), grotesk riservato ai display.

**3. Morbidezza controllata (Restraint).**
Trigger: la tentazione di variare radii e ombre per "dare vita". Decisione: una sola scala di radii (16/8/4 + pill) e ombre quasi impercettibili. Reason: la coerenza delle forme è ciò che fa leggere l'interfaccia come un sistema, non come una collezione di componenti. Evidence: `border-radius:1rem` domina (12 occorrenze), ombre limitate a `rgba(0,0,0,.1)`.
