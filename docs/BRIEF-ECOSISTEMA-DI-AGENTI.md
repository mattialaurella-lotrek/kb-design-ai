# Brief per «Un ecosistema di agenti»

Materiale di partenza per la voce di «Prossimi argomenti», arrivato dall'utente l'8 settembre 2026. Non è una bozza della sezione: è una mappa del campo, scritta in inglese da un'altra istanza di Claude per essere letta da un modello, quindi tassonomica e rivolta a chi implementa. La sezione della guida parla a chi progetta, in forma impersonale, e va scritta da capo. Il file tiene due documenti, la mappa del campo arrivata l'8 settembre e in coda la guida alla costruzione degli agenti arrivata il 12, ognuno con la sua premessa.

**Cosa se ne prende.** L'impianto, cioè quando conviene un subagent e quando una squadra di agenti, con la risposta per il nostro caso già decisa: una catena da token a componenti a build a revisione vuole subagent più una sessione che orchestra, perché le fasi dipendono l'una dall'altra invece di essere esplorazioni indipendenti. La documentazione ufficiale delle agent team dice la stessa cosa dall'altro verso, sconsigliandole per il lavoro sequenziale. Della tabella finale valgono quattro righe su sei, perché quelle sull'SDK e sui Managed Agents restano fuori dal perimetro della guida.

**Cosa non se ne prende.** Nessuna frase, perché è in inglese e perché lo stile è quello che `/not-ai` segna riga per riga. E nessuna citazione presa per buona: questo documento riassume fonti che non abbiamo ancora letto.

**Cosa è stato verificato l'8 settembre 2026.** I due paper esistono con i titoli dichiarati, arXiv 2508.08322 e arXiv 2512.06046. Il flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, la casella di posta, la lista di compiti condivisa e il costo maggiore sono confermati dalla pagina ufficiale delle agent team. Il post di Anthropic sui Managed Agents esiste. Un solo scarto: il repository citato come `raveracker/figma-code-composer` è stato rinominato in [`punkadillo/figma-code-composer`](https://github.com/punkadillo/figma-code-composer), ha tre stelle e un autore solo, quindi vale come esempio della forma della catena e non come consiglio.

**Cosa resta da fare prima di scrivere.** Leggere AI4UI per intero, perché è la fonte che darebbe alla sezione la parte di metodo e qui c'è solo il suo riassunto. Decidere quanto dire della parte ospitata fuori dalla macchina di chi progetta, che oggi è dichiarata fuori perimetro in `docs/FONTI-DA-INTEGRARE.md`. E aggiungere le due cose che qui non ci sono, cioè i costi in numeri e la verifica del lavoro sparpagliato fra più agenti, che nella guida è già il tema di «Verificare il risultato».

---

# Multi-agent orchestration for design workflows: an overview

*Prepared for reference by another Claude instance. Covers current (2026) patterns for building a super-agent / orchestrator that governs specialised sub-agents, with particular attention to design and design-to-code workflows using Claude Code.*

## 1. The foundational distinction

Anthropic separates agentic systems into two categories:

- **Workflows** — LLMs and tools orchestrated through predefined code paths. Predictable, consistent, good for well-defined tasks.
- **Agents** — systems where the LLM dynamically directs its own process and tool use. Better for open-ended problems where the steps can't be hardcoded in advance.

Within workflows, the pattern that matches "a super-agent governing other agents for specific tasks" is **orchestrator-workers**: a central LLM dynamically breaks a task into subtasks, delegates each to a worker LLM, and synthesises the results. The key property distinguishing it from simple parallelisation is that the subtasks aren't fixed in advance — the orchestrator decides them based on the specific input. This fits design-to-code work well, since the number of components needing rework, or the number of screens affected by a token change, can't be known until the orchestrator inspects the input.

Source: Anthropic, "Building effective agents" — anthropic.com/engineering/building-effective-agents

## 2. How this exists today in Claude Code

Two built-in mechanisms implement orchestrator-worker style delegation, at different weights.

### Subagents (lightweight)

- Defined as markdown files with YAML frontmatter, in `.claude/agents/` (project-level, shareable via git) or `~/.claude/agents/` (user-level, cross-project).
- Each has its own name, description (used as a routing hint), restricted tool access, its own system prompt, and optionally its own model.
- Claude Code delegates automatically when a task matches a subagent's description, or a subagent can be invoked by name.
- Each subagent runs in its own context window. It does the work and returns a final result to the calling session — no further back-and-forth, no shared state.
- Subagents cannot spawn further subagents by default; the delegation graph lives in the main conversation, which acts as the conductor of a linear or fan-out/fan-in chain.
- Lower token cost, because only the summarised result re-enters the parent's context, not the subagent's full working trace.

### Agent teams (heavier, still experimental)

- Enabled via an environment flag (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).
- One session becomes the **team lead**; it spawns **teammates**, each a fully independent Claude Code instance with its own context window.
- Teammates coordinate through a **shared task list** (claim, assign, mark complete, with dependency blocking) and a **mailbox** messaging system, communicating directly with each other rather than only reporting to the lead.
- Meaningfully higher token cost — each teammate is a separate running instance.
- Best suited to work that benefits from independent parallel exploration or genuine debate: competing hypotheses on a bug, several reviewers each applying a different lens to the same PR, cross-layer work (frontend/backend/tests) that can proceed with minimal interdependency.
- Teammates can be spun up from the same subagent definitions used for lightweight delegation, so a role only needs to be authored once.

**Practical heuristic:** if the work is sequential and only the end result matters (research a library, then implement, then verify), use subagents. If the work benefits from several angles being explored simultaneously and challenging each other, use an agent team. For most design-to-code pipelines — tokens, then components, then build, then review — subagents plus one orchestrating session is the natural fit; the stages depend on each other rather than needing independent exploration.

Source: Claude Code docs, "Orchestrate teams of Claude Code sessions" and "Create custom subagents" — code.claude.com/docs/en/agent-teams and /sub-agents

## 3. The API-level picture (Agent SDK / Managed Agents)

For orchestration built outside the CLI — e.g. a hosted service rather than an interactive session — two further concepts matter:

- **Dynamic Workflows**: instead of the orchestration being predefined, Claude can generate the orchestration script itself (deciding how many subagents to spawn, how to partition work, when to run verification passes, when to stop). This shifts the orchestration burden from the human/developer to the model, and composes with ordinary subagents rather than replacing them.
- **Managed Agents** (Anthropic's hosted long-horizon agent service, described April 2026): decouples the "brain" (Claude plus its harness) from the "hands" (sandboxes and tools, each just `execute(name, input) → string`) and the "session" (a durable, append-only event log that lives outside the context window). This lets a single brain connect to many hands, and hands be passed between brains — the more formal, infrastructural version of a governing agent coordinating specialised workers. Relevant if the target is a service Claude Code sessions plug into, rather than a single local session.

Source: Anthropic, "Scaling Managed Agents: Decoupling the brain from the hands" — anthropic.com/engineering/managed-agents

## 4. Design-to-code specific implementations

Three concrete examples of this pattern applied to design workflows, in increasing order of formality:

**figma-code-composer** (open-source scaffold for Claude Code / Cursor): drops a multi-agent pipeline into a frontend repo that converts Figma files into design tokens, framework-native components, icons, stories and tests. Includes a knowledge graph that tracks component reuse across screens to avoid regenerating duplicates.

**Hub-and-spoke coding assistant pattern** (arXiv 2508.08322): a primary "Manager" Claude instance coordinates specialist subagents — backend-architect, frontend-specialist, devops-engineer, code-reviewer — each defined as a markdown/YAML file with isolated context and scoped tools. This is essentially the Claude Code subagent mechanism used deliberately to model a small cross-functional team, with a shared persistent context file (project conventions, architecture notes) provided to all agents to prevent drift between them.

**AI4UI** (arXiv 2512.06046, Infosys/EdgeVerve, 2026): the most rigorous published architecture for design-to-code governance specifically. Five specialised roles — Designer, Orchestrator, Planner, Reviewer, Implementer — coordinated through a **change-oriented workflow**: every planned UI change is first captured as a Request for Change (RFC) documenting scope, impacted components, dependencies and acceptance criteria, before any agent touches code. Human oversight is fixed at exactly two points: an LLM-friendly grammar is embedded into the Figma file at the design stage to encode requirements precisely, and domain experts refine outputs at a post-processing stage; everything between is autonomous. Also notable: a domain-aware knowledge graph maintaining component relationships across a large application, and a layered compilation-integrity pass that fixes local syntax errors before higher-level architectural issues, checking for behavioural regressions between each stage.

## 5. A governance framing from outside design

**indigo.ai's "Mother Agent" pattern** (conversational AI, not design-specific, but useful for the governance angle): a central Mother Agent orchestrates specialised vertical agents, with company-wide policy set once at the Mother Agent level and applied consistently across all of them. Its distinguishing feature is escalation logic — it is built to recognise the limits of its own and its sub-agents' competence and hand off (to a human, or a different agent) accordingly, with full traceability of which agent made which decision. Worth borrowing from if a governing layer needs to enforce cross-cutting rules (accessibility standards, brand-token compliance) across otherwise-independent design subagents, separately from the task-delegation logic itself.

## 6. Summary decision table

| Need | Reach for |
|---|---|
| One-off delegated task, result matters, not the process | Claude Code subagent |
| Several independent perspectives on the same artefact (review, debugging) | Claude Code agent team |
| Orchestration logic itself should be decided by the model, not hand-coded | Dynamic Workflows (Agent SDK) |
| Hosted, long-running, decoupled from any one container/session | Managed Agents |
| Full design-to-code pipeline with explicit human gates | RFC-style change workflow (AI4UI pattern): Designer → Orchestrator → Planner → Reviewer → Implementer |
| Cross-cutting policy enforcement across independent sub-agents | Central "governing" agent with escalation logic (Mother Agent pattern) |

## Sources

- anthropic.com/engineering/building-effective-agents
- anthropic.com/engineering/managed-agents
- code.claude.com/docs/en/agent-teams
- code.claude.com/docs/en/sub-agents
- platform.claude.com/docs/en/agent-sdk/subagents
- github.com/raveracker/figma-code-composer
- arxiv.org/pdf/2508.08322 (Context Engineering for Multi-Agent LLM Code Assistants)
- arxiv.org/pdf/2512.06046 (AI4UI: Beyond Prototyping)
- indigo.ai/en/blog/enterprise-multi-agent-ecosystem

---

# Secondo documento, arrivato il 12 settembre 2026

Nella cartella `KB` l'utente ha passato altri due file su questo tema. Uno è una seconda edizione della mappa qui sopra, `multi-agent-orchestration-design-workflows.md`, più corta di un quarto e senza niente che qui non ci sia già: le stesse sei sezioni, le stesse fonti, la stessa tabella finale, e il repository ancora col nome vecchio. Non è stata portata nel repo. L'altro è il documento che segue, che è materiale nuovo.

**Cosa aggiunge.** La mappa dice quale forma scegliere, questo dice come si costruisce: otto passaggi per mettere insieme una libreria di specialisti, ognuno un file markdown in `.claude/agents/`, più un coordinatore facoltativo che tiene scritta la logica di instradamento invece di lasciarla al giudizio di Claude ogni volta. La fonte dichiarata è una sola, la documentazione dei subagent.

**I quattro punti che valgono per la guida.** Il contesto non si eredita, quindi una regola detta in chat un'ora prima per un subagent non esiste e deve stare in `CLAUDE.md`, che ogni subagent carica da sé: è il legame diretto con «I file di contesto» e con «L'impianto di istruzioni». La lista dei tool è la leva vera della specializzazione, perché un revisore che ha solo `Read`, `Grep` e `Glob` non può riscrivere quello che sta controllando. La `description` è quello su cui Claude sceglie a chi mandare il lavoro, e tutte insieme hanno un tetto di quindicimila token. Il campo `mcpServers` lega un server MCP al singolo agente, quindi i tool di Figma pesano sulla finestra dello specialista invece che su ogni turno della conversazione principale, e questo tocca «Collegare Claude e Figma».

**Cosa resta da verificare prima di scrivere.** Ogni campo di frontmatter citato qui, cioè `tools`, `mcpServers`, la sintassi `Agent(worker, researcher)` e il limite dei tre livelli di annidamento, va confermato sulla pagina ufficiale dei subagent, perché il documento la riassume e non la cita. Vale anche per `claude plugin validate`, dato come controllo del frontmatter malformato.

---

# Building specific agents and a coordinator agent in Claude Code

A guide to setting up a small library of specialist subagents, plus an optional coordinator, for design project work in Claude Code.

## Starting point

A Claude Code session is already an orchestrator by default. The main thread carries the Agent tool and decides which subagent to call, based on what each subagent's description says it does. Building a 'super-agent' from scratch isn't needed. What you're actually building is a small library of specialists, each a markdown file, and, optionally, a dedicated coordinator that holds the routing logic explicitly rather than leaving it to automatic delegation.

## The process

1. **Map tasks to agents.** List the distinct, self-contained jobs in the design process – component audit, token mapping, accessibility check, build, copy review – and give each one exactly one agent. If a task needs frequent back-and-forth with you, it belongs in the main conversation, not a subagent.

2. **Write each subagent as a file.** A subagent is a markdown file with YAML frontmatter, saved in `.claude/agents/` (project-level, shared with your team) or `~/.claude/agents/` (personal, available in every project on your machine). Only `name` and `description` are required; the markdown body below the frontmatter becomes the system prompt.

3. **Restrict each agent's tools.** Use the `tools` field as an allowlist. An auditor that only reads and reports needs `Read, Grep, Glob` – no `Write` or `Edit`. A build agent needs `Edit` and `Write` too. This stops an agent from drifting into work that belongs to another one, and it's the main lever for keeping a specialist genuinely specialised.

4. **Write descriptions that route correctly.** Claude matches a task to a subagent using the `description` field, so it has to say clearly what the agent does and when to reach for it, distinct enough from its siblings that two agents don't both look like a fit. Keep descriptions short: combined, all your custom subagent descriptions share a 15,000-token budget.

5. **Test each agent on its own.** Before wiring anything together, invoke each subagent directly – @-mention it or name it in a prompt – and check it does its one job well in isolation. This makes any later failure in the chain traceable to a single agent rather than the whole sequence.

6. **Decide whether you need a coordinator.** The main session already delegates automatically. Build a separate coordinator agent (e.g. `design-lead.md`) only if you want the sequencing and gating logic written down explicitly rather than left to Claude's judgement each time.

7. **Give the coordinator delegation rights and gates.** A coordinator needs `Agent` in its `tools` field to spawn other agents. Tell it, in its system prompt, which specialist runs at which stage, and where to stop and wait for your sign-off before moving to the next phase – an audit-then-build split with a manual checkpoint between them, for instance.

8. **Commit `.claude/agents/` to version control.** Project-level subagents live in the repository, so your team gets the same specialists and the same coordination logic rather than everyone building their own. Run `claude plugin validate` against the directory to catch a subagent file whose frontmatter is malformed before it silently gets skipped.

## Principles and nuances

### Context is not shared

Each subagent starts with a genuinely fresh context window. It doesn't see your conversation so far, the files Claude has already read, or any rule you mentioned earlier in the session – only its own system prompt and the task message the orchestrator writes for it when delegating. Project-wide conventions, such as token-naming rules or a note not to touch a particular folder, need to live in a `CLAUDE.md` file, which every custom subagent loads automatically. If a rule only exists in an earlier message, a subagent won't have it.

### Nesting has a limit, and a narrow use case

Subagents can spawn their own subagents, up to three layers below the main session by default (adjustable with an environment variable). Anthropic's own guidance is to keep this nesting rare: use it when a delegated task genuinely splits into parallel subtasks – a build agent that dispatches a separate checker per component, say – not as a general architecture. For most design work, one coordinator plus a flat set of specialists is easier to reason about than a deep tree.

One caveat on control: a coordinator's spawning rights can be restricted to named subagents (`tools: Agent(worker, researcher)`), but that allowlist syntax only works when the coordinator itself is running as the main thread, via `claude --agent design-lead`. A coordinator that's itself a subagent can still spawn others if it has `Agent` in its tools, just without that fine-grained restriction.

### Scope MCP servers to the agent that needs them

The `mcpServers` field in a subagent's frontmatter scopes an MCP server, Figma's for instance, to that one agent rather than loading its tool descriptions into the main conversation. For design work that touches Figma MCP, this keeps Figma's tool surface confined to whichever specialist actually needs it, rather than sitting in every turn of the main thread.

### One job per agent

Each subagent should excel at one specific task. A narrow, well-scoped agent with a tight tool list is easier to test, easier to trust, and easier for Claude to route to correctly than a generalist with broad permissions.

## Applying this to a design system workflow

A two-phase structure with a hard gate between audit and build – auditing an existing component library before restructuring it, then building new components only after that review is signed off – maps closely onto this pattern already: an audit subagent, a build subagent, and a coordinator (or your own judgement in the main session) deciding when the gate opens. Formalising that as a `design-lead.md` coordinator with `Agent` access to an `auditor` and a `builder` subagent turns a manual habit into something a team can check out and reuse.

## Sources

- [Create custom subagents – Claude Code documentation](https://code.claude.com/docs/en/sub-agents)
