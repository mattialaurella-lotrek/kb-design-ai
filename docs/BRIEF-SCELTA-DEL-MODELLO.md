# Brief per «La scelta del modello»

Materiale di partenza per la voce di «Prossimi argomenti», arrivato dall'utente il 12 settembre 2026 nella cartella `KB`. È scritto in inglese da un'altra istanza di Claude e non è un documento autonomo: risponde a uno schema dei modelli che l'utente aveva passato e che nel frattempo era invecchiato, quindi si apre correggendolo. La sezione della guida parla a chi progetta, in forma impersonale, e va scritta da capo.

**Cosa se ne prende.** L'accoppiata fra modello e compito di design, che è la cosa che le due pagine ufficiali già in elenco non hanno: Haiku per le varianti di microcopy e la codifica delle risposte aperte, Sonnet per il lavoro di tutti i giorni, Opus per la decisione discussa a voce con Claude, Fable per il progetto lungo che pianifica da sé. Si prende anche la chiusa, cioè che alzare l'effort è una leva più leggera del cambio di modello, che dice la stessa cosa della documentazione della piattaforma e vale come conferma.

**Cosa non se ne prende.** Nessuna frase, perché è in inglese e perché lo stile è quello che `/not-ai` segna riga per riga. E nessuna delle cifre dell'API senza la domanda che viene prima, cioè quanto serva un listino a prezzo per token a chi lavora con un abbonamento e non con una chiave.

**Cosa è stato verificato il 12 settembre 2026.** I prezzi e le finestre di contesto corrispondono al listino corrente: Haiku 4.5 a 1 e 5 dollari per milione di token con finestra da 200mila, Sonnet 5 a 2 e 10, Opus 5 a 5 e 25 e Fable 5.1 a 10 e 50, tutti e tre con la finestra da un milione.

**Cosa resta da controllare.** Tre affermazioni del documento non le abbiamo potute confermare, cioè i cutoff di conoscenza dei quattro modelli, la disponibilità per piano, con Haiku e Sonnet sul piano gratuito e Opus e Fable da Pro in su, e il tetto di 64mila token in uscita attribuito ad Haiku. Una quarta invece è sbagliata come è scritta. Mythos non è il gradino a cui Fable appartiene, è un modello distinto, `claude-mythos-5-1`, con lo stesso prezzo e le stesse capacità di Fable 5.1 ma dentro un programma ad accesso ristretto. Quella frase non entra nella guida nella forma in cui si trova qui.

**Cosa resta da fare prima di scrivere.** Datare la sezione e rileggerla prima di ogni pubblicazione, perché il listino cambia ogni pochi mesi ed è già successo a questo documento di invecchiare fra la stesura e la lettura. Decidere se i quattro modelli vanno raccontati uno per uno, come fa il brief, o se alla guida basta il criterio di scelta più la tabella di `/model` e `/effort` che «I comandi di Claude Code» ha già.

---

# Choosing a Claude model for product design work

The chart you shared is a good starting point, but the lineup it describes has moved on. Claude now ships four models instead of three: Haiku, Sonnet, Opus and Fable, each set at a different balance of speed, depth and cost. Sonnet still opens by default when you start a chat, and stays the right first choice for most design work. Opus and Fable sit above it for reasoning and autonomous work that genuinely needs more thinking time.

Access depends on plan. The free plan includes Haiku and Sonnet only; Pro and Max add Opus and Fable, plus a higher rate limit. Team and Enterprise workspaces follow a similar structure, so check your workspace's model picker if one of the four is missing.

One naming note worth knowing: Fable belongs to what Anthropic calls the Mythos tier, a step above Opus rather than a bigger Opus. In the picker it simply appears as the top option, but it's a distinct model family with its own training, not an incremental update to Opus.

## Haiku 4.5: fast and lightweight

Best for tasks where you already know what a good answer looks like and just want it produced quickly: UX copy variants, button and label options, empty-state messages, turning interview notes into bullet points, tagging open-ended survey responses, quick checklists.

Pros: near-instant responses, the lightest draw on your rate limit, and the cheapest of the four on the API at $1 per million input tokens and $5 per million output tokens.

Cons: weaker judgement on ambiguous or multi-step problems, a smaller 200K-token context window against 1M for the other three, a reliable knowledge cutoff of February 2025 that trails the rest by close to a year, and a 64K output cap that can truncate a long document.

Use when speed matters more than depth, and you'd spot a wrong answer at a glance.

## Sonnet 5: the daily driver

Best for the bulk of everyday design work: reviewing onboarding flows, writing PRDs and feature briefs, UX audits and heuristic reviews, design system documentation, accessibility reviews, turning research into opportunity statements, and Claude Code prompts for prototypes.

Pros: strong reasoning at a moderate rate-limit cost ($2/$10 per million tokens), a 1M-token context window, a January 2026 knowledge cutoff that's current enough for most design references, and speed that holds up in a live back-and-forth session.

Cons: it can still stumble on the hardest strategic trade-offs or dense technical judgement calls, the kind that reward more thinking time. Opus does noticeably better on those.

Use when you're not sure which model to pick. Sonnet is the right default for nearly everything short of deep research or a large autonomous job.

## Opus 5: the reasoning specialist

Best for complex, high-stakes decisions where you're working with Claude live: debating information architecture trade-offs, weighing design directions against each other, analysing dense research or analyst reports, multi-persona journey mapping, identifying risk in a product concept before it ships.

Pros: the deepest reasoning in the lineup while still responsive enough for a live session, a 1M-token context window, a May 2026 knowledge cutoff.

Cons: heavier rate-limit use than Sonnet, roughly two and a half times the API cost ($5/$25 per million tokens), and it's restricted to Pro plans and above. One quirk worth knowing: Claude switches to Opus automatically for biology and cybersecurity topics even when Fable is selected, so if that's your subject matter, starting on Opus saves a step.

Use when you've tried Sonnet and it genuinely struggled, or the cost of a wrong answer is high enough to justify the extra thinking time.

## Fable 5.1: the long-horizon specialist

Best for your largest, most self-contained design projects: a multi-phase workflow like a component library build, where an audit phase feeds a build phase with a gate in between, or any task where you'd rather describe the outcome and let Claude plan the steps itself. It also handles dense source material well: long specs, charts, technical diagrams.

Pros: the most capable model available, works with fewer check-ins because it plans its own steps and reviews its own work, a 1M-token context window, and the most current knowledge cutoff of the four (June 2026).

Cons: the slowest model, because its thinking runs always-on rather than adaptive; the heaviest rate-limit use; the most expensive on the API at $10/$50 per million tokens; and it's overkill for anything that doesn't genuinely need autonomous, long-horizon work.

Use when you've tried Opus and it still fell short, or the task is long and structured enough that Claude planning its own path beats you steering it turn by turn.

## Quick pick

1. Need it done in seconds, and you'd recognise a wrong answer immediately? Haiku.
2. Regular design work: audits, briefs, documentation, prototypes? Sonnet.
3. Working through a complex decision live, in conversation? Opus.
4. Handing off a large, structured project you'd rather Claude plan end to end? Fable.

One more lever, within a single model: the effort setting in the picker controls how much thinking Claude applies before answering. Lower it for quick checks, raise it for the hardest problems. It's often a lighter adjustment than switching models altogether, worth trying before reaching for Opus or Fable on a task Sonnet could handle at a higher effort.
