# Fonti — Progettare con l'AI

Bibliografia dei 48 documenti che compongono il corpus di riferimento della guida. Per ogni voce: titolo come pubblicato, autore, testata, data di pubblicazione, link per esteso e nome del PDF.

I PDF vivono in `sources/`, che è **gitignored**: sono articoli di terzi, non nostri e non ridistribuibili, quindi restano in locale. Questo file è versionato e basta a ricostruire il corpus da zero.

Due avvertenze sulle date. Molti PDF sono stampe di snapshot `archive.is`, e la data in testa alla stampa è quella di archiviazione, non di pubblicazione: qui è sempre sostituita con la data reale della pagina originale, che in alcuni casi la precede di settimane. Diversi articoli Medium hanno slug URL diversi dal titolo attuale perché sono stati rititolati dopo l'uscita: il link resta valido.

Quarantasette fonti su 48 hanno l'originale online verificato. L'unica senza pagina sorgente rintracciabile è il deck `Design with AI IAAD.pdf` (voce 48). Delle 48, 45 hanno il PDF in `sources/`: fanno eccezione le voci 30, 31 e 45, due pagine pubbliche e stabili che non serve archiviare.

---

## File di contesto e formati `.md`

**1. CLAUDE.md Best Practices** — sottotitolo *10 Sections to Include in your CLAUDE.md*
Nick Babich — UX Planet (Medium), 6 marzo 2026
https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c
File: `CLAUDE.md best practices.pdf`

**2. Claude Code Project Structure Best Practices**
Nick Babich — UX Planet (Medium), 16 marzo 2026
https://uxplanet.org/claude-code-project-structure-best-practices-5a9c3c97f121
File: `Claude Code project structure best practices.pdf`

**3. CLAUDE.md Tips & Tricks for Product Designers**
Nick Babich — UX Planet (Medium), 20 marzo 2026
https://uxplanet.org/claude-md-tips-tricks-for-product-designers-4cc47f2084c1
File: `CLAUDE.md tips and tricks for product designers.pdf`

**4. Comprehensive Guide to CLAUDE.md**
Nick Babich — UX Planet (Medium), 2 aprile 2026
https://uxplanet.org/comprehensive-guide-to-the-claude-md-8e60f860d9f9
File: `Comprehensive guide to CLAUDE.md.pdf`

**5. What is DESIGN.md and How To Use It**
Nick Babich — UX Planet (Medium), 7 maggio 2026
https://uxplanet.org/what-is-design-md-and-how-to-use-it-70532359b311
File: `What is DESIGN.md and how to use it.pdf`

**6. 7 Advanced CLAUDE.md Tips for Claude Code**
Nick Babich — UX Planet (Medium), 11 maggio 2026
https://uxplanet.org/7-advanced-claude-md-tips-for-claude-code-b34e86b3275a
File: `Advanced CLAUDE.md tips for Claude Code.pdf`

**7. How to write a DESIGN.md file Claude can actually use**
Lisa Demchenko — UX Collective (Medium), 16 maggio 2026
https://uxdesign.cc/how-to-write-a-design-md-file-claude-can-actually-use-2d89d183f823
Versione precedente sul Substack dell'autrice (*Writing a DESIGN.md file Claude can actually use*, Process to Pixels, 5 maggio 2026): https://processtopixels.substack.com/p/writing-a-designmd-file-claude-can
File: `How to write a DESIGN.md file Claude can actually use.pdf`

**8. DESIGN.md Best Practices**
Nick Babich — UX Planet (Medium), 17 giugno 2026
https://uxplanet.org/design-md-best-practices-c00325e8b23a
File: `DESIGN.md Best Practices.pdf`

**9. CLAUDE.md vs DESIGN.md: What to Put in Each for Claude Code**
Nick Babich — UX Planet (Medium), 15 luglio 2026
https://uxplanet.org/claude-md-vs-design-md-what-to-put-in-each-for-claude-code-53647d015bfd
File: `CLAUDE.md vs DESIGN.md for Claude Code.pdf`

**10. Design.md: the one standard file carries your visual identity, for humans and agents**
Patrick Neeman — UX Collective (Medium), 1 agosto 2026
https://uxdesign.cc/design-md-the-one-standard-file-carries-your-visual-identity-for-humans-and-agents-9058d5b39d9b
File: `Design.md the one standard file carries your visual identity, for humans and agents.pdf`

**11. What your AI co-designer can't infer from your hex values**
Lisa Demchenko — UX Collective (Medium), 4 agosto 2026
https://uxdesign.cc/what-your-ai-co-designer-cant-infer-from-your-hex-values-d2023364e80e
File: `What your AI co-designer can't infer from your hex values.pdf`

**12. 7 DESIGN.md Mistakes That Make AI-Generated UI Worse**
Nick Babich — UX Planet (Medium), 6 agosto 2026
https://uxplanet.org/7-design-md-mistakes-that-make-ai-generated-ui-worse-9ec2dfcc44cd
File: `DESIGN.md mistakes that make AI-generated UI worse.pdf`

**13. 7 DESIGN.md Tips for Better, More Consistent AI-Generated UI**
Nick Babich — UX Planet (Medium), 10 agosto 2026
https://uxplanet.org/7-design-md-tips-for-better-more-consistent-ai-generated-ui-b01736d07748
File: `DESIGN.md tips for better more consistent AI-generated UI.pdf`

**14. Claude Code Doesn't Need More Context. It Needs Less.**
Nick Babich — UX Planet (Medium), 12 agosto 2026
https://uxplanet.org/claude-code-doesnt-need-more-context-it-needs-less-7a988e2c7210
File: `Claude Code doesn't need more contex, it needs less.pdf`
Nota: il refuso «contex» è nel nome del file salvato, non nel titolo dell'articolo.

**15. Your design system is fragmenting into agent files**
Murphy Trueman — Design Systems Collective (Medium), 14 maggio 2026
https://www.designsystemscollective.com/your-design-system-is-fragmenting-into-agent-files-26a9b19a2fad
Mirror sul blog dell'autore: https://blog.murphytrueman.com/your-design-system-is-fragmenting-into-agent-files/
File: `Your design system is fragmenting into agent files.pdf`

**16. If You Use Claude, You Need This Simple Folder System** — sottotitolo *Five folders, a naming system, and a structure Claude can navigate without guessing*
Frank Andrade e Kevin Gargate Osorio — Artificial Corner (Substack), 28 giugno 2026
https://artificialcorner.com/p/claude-file-system
File: `If you use Claude you need this simple folder system.pdf`
Nota: citata come riferimento, non integrata nel testo. Parla di un workspace personale e non di un repo, quindi come fonte da integrare vale poco: se ne salvano due righe, e solo se la sezione «Organizzare il progetto» si riapre per altri motivi. L'analisi e il verdetto stanno in `docs/NOTE-ORGANIZZARE-IL-PROGETTO.md`.

---

## Design system leggibili dall'AI

**17. Key Principles of Scalable Design System Architecture**
Kir Romanovsky — Bootcamp (Medium), 3 aprile 2024
https://medium.com/design-bootcamp/understanding-design-system-architecture-key-insights-0b7bb7b415c5
File: `Key principles of scalable design system architecture.pdf`

**18. Design systems: simplifying documentation writing**
Dean Harrison — UX Collective (Medium), 14 ottobre 2024
https://uxdesign.cc/design-systems-simplifying-documentation-writing-5ec240c484fe
File: `Simplifying documentation writing.pdf`

**19. Your Figma library is invisible to AI agents**
Nurkhon (@nurxmedov) — Medium, 16 aprile 2026
https://nurxmedov.medium.com/your-figma-library-is-invisible-to-ai-agents-31ff99d0ff9c
File: `Your Figma library is invisible to AI agents.pdf`

**20. AI and Design System** — sottotitolo *How to optimize your Figma design system for Claude Code*
Nick Babich — UX Planet (Medium), 28 aprile 2026
https://uxplanet.org/ai-and-design-system-3dab36a5cc50
File: `AI and design system.pdf`

**21. Context is the new component library (and your agents can't work without it)**
Nurkhon (@nurxmedov) — Medium, 10 maggio 2026
https://nurxmedov.medium.com/context-is-the-new-component-library-and-your-agents-cant-work-without-it-91632d4175f2
File: `Context is the new component library for AI agents.pdf`
Nota: il nome del file corrisponde al titolo SEO della pagina; l'H1 dell'articolo è quello riportato qui.

**22. My 4-step framework to make design systems AI-readable**
The Maker's Lab — Muzli, Design Inspiration (Medium), 12 maggio 2026
https://medium.muz.li/my-4-step-framework-to-make-design-systems-ai-readable-74ba07145312
File: `My framework to make design systems AI-readable.pdf`
Nota: «The Maker's Lab» è il nome dell'account, non una persona identificabile. L'articolo è promozionale per il plugin Figma FigSpecs.

**23. Creating AI-Ready Design System: Checklist**
Nick Babich — UX Planet (Medium), 4 giugno 2026
https://uxplanet.org/creating-ai-ready-design-system-checklist-547a0256ad87
File: `Creating AI-ready design system.pdf`

**24. You design it. Then what? A clear map of the Figma-to-code AI mess**
Christine Vallaure — UX Collective (Medium), 3 luglio 2026
https://uxdesign.cc/you-design-it-then-what-a-clear-map-of-the-figma-to-code-ai-mess-954a4084175f
File: `A clear map of the Figma-to-code AI mess.pdf`

**25. Design system contracts: the component lives in neither Figma nor code**
Christine Vallaure — UX Collective (Medium), 16 luglio 2026
https://uxdesign.cc/design-system-contracts-the-component-lives-in-neither-figma-nor-code-3032d94ca067
File: `Design system contracts.pdf`

**26. Design Systems Are About to Become Executable**
Nick Babich — UX Planet (Medium), 11 agosto 2026
https://uxplanet.org/design-systems-are-about-to-become-executable-f125a94fe4ad
File: `Design systems are about to become executable.pdf`
Nota: integrato solo in parte. Il grosso dell'articolo ripete materiale già coperto da fonti più documentate; della guida sta la sola chiusura di «Rendere il design system leggibile dall'AI».

**27. How to Make Your Design System Agent-Ready** — sottotitolo *If you don't want your AI agent to choke on your design.md, stop putting your entire design system into one file*
Eva Nudea Hörner — Design Bootcamp (Medium), 13 agosto 2026
https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270
File: `How to Make Your Design System Agent-Ready.pdf`
Nota: Medium serve un 403 Cloudflare sia a curl sia a Chrome headless, quindi il PDF è stato salvato a mano dal browser.

**28. Can AI Generate UI Components from a Figma Design System?** — occhiello *When the Design System Writes the Code*, serie *How We Build*
Fantasy, 24 agosto 2026
https://fantasy.co/latest/figma-design-system-ai-components
File: `Can AI generate UI components from a Figma design system.pdf`
Nota: firmato dallo studio, ma è un'intervista a Caroline Hilman, Design Director di Fantasy, sul suo esperimento. Unica fonte del corpus che non sia un articolo di metodo: è un caso di studio con un verdetto («vibe-coded design», buono per esplorazione e prototipo). Il plugin che cita, DesignBridge, estrae il design system in un file `.md` unico, cioè la scelta opposta ai registri e alle spec separate raccontati nella guida.

---

## Flusso tra Claude Code e Figma

**29. Claude Code for Designers: A Practical Guide**
Tommaso Nervegna — Substack personale, 26 gennaio 2026
https://nervegna.substack.com/p/claude-code-for-designers-a-practical
Sistema di meta-prompting citato (GSD): https://github.com/glittercowboy/get-shit-done
File: `Claude Code for designers.pdf`

**30. From Claude Code to Figma: Turning production code into editable Figma designs**
Figma (blog ufficiale), 17 febbraio 2026
https://www.figma.com/blog/introducing-claude-code-to-figma/
File: nessun PDF, pagina pubblica e stabile.
Nota: è l'annuncio ufficiale di Code to Canvas, seconda fonte primaria del corpus dopo la guida Anthropic sulle skill.

**31. Claude Code to Figma: How the New "Code to Canvas" Integration Works**
Muz.li (blog), 17 febbraio 2026
https://muz.li/blog/claude-code-to-figma-how-the-new-code-to-canvas-integration-works/
File: nessun PDF, pagina pubblica ad accesso libero.

**32. Claude Code + Figma**
Nick Babich — UX Planet (Medium), 4 marzo 2026
https://uxplanet.org/claude-code-figma-f647facbe181
File: `Claude Code + Figma.pdf`
Nota: da non confondere con `Claude Code + Figma Design System.pdf` (voce 32), che è un articolo diverso dello stesso autore. È il tutorial in quattro passi del giro completo codice-canvas-codice.

**33. Claude Code + Figma Design System** — sottotitolo *How To Generate Design Using Figma Design System in Claude Code*
Nick Babich — UX Planet (Medium), 30 marzo 2026
https://uxplanet.org/claude-code-figma-design-system-498573c5d357
File: `Claude Code + Figma Design System.pdf`

**34. Figma Skills for Claude Code** — sottotitolo *How to create UI design in Figma without leaving Claude Code*
Nick Babich — UX Planet (Medium), 1 aprile 2026
https://uxplanet.org/figma-skills-for-claude-code-bb05a21984fd
File: `Figma skills for Claude Code.pdf`
Nota: da non confondere con il «Complete Guide» di giugno (voce 37), che è un articolo diverso dello stesso autore.

**35. How to Connect Figma to Claude (MCP Setup Guide — 2026)**
Garima Agarwal — Medium, 10 aprile 2026
https://medium.com/@garimaagarwal1200/claude-desktop-figma-console-mcp-complete-setup-guide-2026-babba46b12a0
File: `How to connect Figma to Claude (MCP setup guide).pdf`
Nota: titolo originale *Claude Desktop + Figma Console MCP: Complete Setup Guide (2026)*, poi cambiato.

**36. How to make Claude Code follow your design system in Figma**
Sen Lin — UX Collective (Medium), 7 maggio 2026
https://uxdesign.cc/how-to-make-claude-code-follow-your-design-system-in-figma-559618cffaa9
Repo citato: https://github.com/senlindesign/claude2figma
File: `How to make Claude Code follow your design system in Figma.pdf`

**37. Ultimate Claude Code Setup for Product Designers**
Nick Babich — UX Planet (Medium), 3 giugno 2026
https://uxplanet.org/ultimate-claude-code-setup-for-product-designers-f8b2fff4ac69
File: `Ultimate Claude Code setup for product designers.pdf` e la cheatsheet `Ultimate Claude Code setup.jpeg`

**38. Figma skills for Claude Code: Complete Guide**
Nick Babich — UX Planet (Medium), 8 giugno 2026
https://uxplanet.org/figma-skills-for-claude-code-complete-guide-c8db2b581a76
File: `Figma skills for Claude Code (complete guide).pdf`

**39. My Top 14 Claude Code Commands**
Xinran Ma — Design with AI (Substack), 12 giugno 2026
https://designwithai.substack.com/p/my-top-14-claude-code-commands
File: `My top Claude Code commands.pdf`

**40. Claude Code Cheatsheets for Product Designer**
Nick Babich — UX Planet (Medium), 16 giugno 2026
https://uxplanet.org/claude-code-cheatsheets-for-product-designer-e1d9c16d577a
File: `Claude Code cheatsheets for product designers.pdf` e la cheatsheet `File structure for design project in Claude Code.jpeg`

**41. Figma console MCP to Claude: Setup Guide for Designers**
@friendlyunit — carosello/deck, testata e data non indicate
Strumento documentato: https://github.com/southleft/figma-console-mcp
File: `Claude to Figma Console.pdf`
Nota: è un deck di slide senza URL sorgente stampato. L'autore è identificabile solo dall'handle nell'ultima slide.

---

## Skill: cosa sono e come si creano

**42. A complete guide to building skills for Claude**
Anthropic, 29 gennaio 2026
https://claude.com/blog/complete-guide-to-building-skills-for-claude
Versione PDF (quella in cartella, intitolata *The Complete Guide to Building Skills for Claude*): https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf
File: `The Complete Guide to Building Skills for Claude.pdf`
Nota: è la guida ufficiale di Anthropic, 32 pagine. Unica fonte primaria del corpus: tutte le altre sono articoli di terzi.

**43. Design Systems in 2026: Turn Your System into a Claude Skill**
Garima Agarwal — Design Systems Collective (Medium), 13 maggio 2026
https://www.designsystemscollective.com/design-systems-in-2026-turn-your-system-into-a-claude-skill-3dd4d8bf5feb
File: `Turn your design system into a Claude Skill.pdf`
Nota: è la parte 3 di una serie in tre puntate.

**44. 5 New claude skills for UI/UX designers**
Jack Henry — Medium, 26 giugno 2026
https://medium.com/@jackhenrys/5-new-claude-skills-for-ui-ux-designers-c23446dfb2e6
File: `New claude skills for UI-UX designers.pdf`

---

## Contesto e pratica di design con l'AI

**45. A Practical Guide to Reducing Token Spend**
Adam Jacob — blog personale, 16 luglio 2026
https://www.adamhjk.com/blog/a-practical-guide-to-reducing-token-spend
File: nessun PDF, pagina pubblica ad accesso libero.
Nota: integrata solo per il dato di confronto fra una skill che orchestra sub-agenti e la stessa procedura scritta come codice deterministico. Lo strumento che propone (Swamp) è un prodotto per sviluppatori e resta fuori dalla guida.

**46. Context engineering: A repeatable AI workflow for product designers**
Vadym Grin — UX Collective (Medium), 16 marzo 2026
https://uxdesign.cc/context-engineering-a-repeatable-ai-workflow-for-product-designers-8d7b55b83b2b
Cross-post integrale sul Substack dell'autore: https://eidosdesign.substack.com/p/context-engineering-a-repeatable
File: `Context engineering.pdf`

**47. How I use AI to partner on design problems**
Suleiman Shakir — UX Collective (Medium), 11 maggio 2026
https://uxdesign.cc/how-i-use-ai-to-think-through-design-problems-4a484080484b
Starter kit citato: https://github.com/Suleiman19/ai-design-buddy
File: `How I use AI to partner on design problems.pdf`

**48. Design with AI** — fonte non identificata
Autore non indicato nel documento, nessuna data, nessun URL
File: `Design with AI IAAD.pdf`
È un deck di slide, presumibilmente materiale didattico IAAD, non indicizzato online. Ricerche su tre frasi distintive («Now anyone can vibe something up that looks passable», «The algorithm proposes, the designer disposes», «Human-agent centred design») non hanno restituito corrispondenze. Il TOKEN framework di una delle slide compare in *A Practical Prompting Guide for Figma Make* di Nick Babich (https://uxplanet.org/a-practical-prompting-guide-for-figma-make-eb72f78ff1ce), che però non è la fonte del deck nel suo insieme.

---

## Come è distribuito il corpus

**Nick Babich firma 20 documenti su 48**, tutti su UX Planet: è il nucleo del materiale su Claude Code, Figma, design system e formati `.md`. Seguono Lisa Demchenko, Garima Agarwal, Christine Vallaure e Nurkhon (@nurxmedov) con 2 ciascuno.

Una sola fonte primaria, la guida Anthropic sulle skill. Tutto il resto è pubblicistica di seconda mano, per lo più su Medium: utile per i pattern e i workflow, da verificare quando riporta specifiche o date.

Il corpus è concentrato nel 2026: due articoli sono del 2024 (voci 17 e 18, entrambi sul design system in sé, prima dell'AI), tutti gli altri vanno da gennaio ad agosto 2026. Ventotto documenti su quarantotto escono fra marzo e giugno 2026.

## Manutenzione

**Ogni articolo integrato nella guida entra qui e nella sezione «Fonti» di `content.md`, senza eccezioni.** Vale anche quando il PDF non si riesce ad archiviare, come per le pagine dietro Cloudflare: in quel caso la voce si scrive lo stesso e il campo `File:` dichiara perché manca.

Aggiungendo un PDF in `sources/`, aggiungere qui la voce con autore e data **di pubblicazione**, non quella dello snapshot. Il modo più rapido per ricavarla è aprire l'URL stampato nella prima pagina del PDF: negli snapshot `archive.is` la stringa dopo il dominio contiene l'URL originale.

Questo file e la sezione «Fonti» di `content.md` sono due cose diverse: qui sta la bibliografia completa con i riferimenti per esteso, lì l'elenco compatto che finisce nella guida pubblicata. Aggiungendo una fonte alla guida, aggiornare entrambi.
