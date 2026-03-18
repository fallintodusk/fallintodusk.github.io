# Improve Claim and Site Structure

Reviewed on 2026-03-18.

This note is based on:
- Alis root README and high-level docs
- inventory and vitals vision/docs
- site pages and site root docs (`ALIS_PACT.md`, `CONTRIBUTING.md`, `TRADEMARKS.md`)
- official external examples listed below

## Short Take

The current site undersells ALIS.

The repository already shows a much stronger story than the site:
- serious survival simulation direction
- real technical architecture
- public trust tooling
- long-horizon world and ecosystem ambition

Right now the site mostly reads like a small project blog with light philosophy.
The repo reads like a serious open survival project with public proof.

The site should be rebuilt around this order:

1. What ALIS is
2. What is real now
3. Where it is going
4. Why people should trust it

Use this document as a strategy and structure draft, not final source-of-truth public copy, until every claim is checked for:
- tense
- public proof
- policy consistency
- shipped vs planned behavior

## What Is Publicly Verifiable Today

These are the strongest public claims already supported by the local repo/site/docs:

- Open-source Unreal Engine 5 project with public code and architecture docs
- Public mirror policy and mirror automation docs for source publication
- Public release packaging/signing/verification docs and scripts
- Public signing key and fingerprint published on the site
- Modular architecture across Boot, Launcher, CDN, Orchestrator, and runtime loading
- Real-world survival direction, not arcade survival
- Physiology-based vitals model using GAS primitives
- Server-authoritative inventory with weight, grid space, equipment-granted containers
- Real locations and believable world framing
- Public policy docs for pact, contributing, and trademarks

This is already much more serious than what the current pages communicate.

## What Must Not Be Presented As Shipped Product Behavior Without Proof

These may be valid direction, policy, or long-term goals, but they should not be written as if they are already a public mainstream player experience unless the site can prove them clearly:

- privacy by default as working shipped UX
- community servers as a real present-day public capability
- resilient public mirrors/torrent distribution as active public download infrastructure
- decentralization/governance language that is still roadmap-level

Safe framing:
- policy
- commitment
- direction
- long-term survivability goal
- current public trust infrastructure

## Current Site Problems

### 1. Home is not a real landing page

`index.html` currently behaves like a blog home with a slogan, not like a product front page.

That means a first-time visitor does not quickly learn:
- what ALIS is
- what makes it different
- what exists now
- why they should trust it

### 2. "About" is overloaded and mixed

`/about/` currently mixes:
- mission statement
- trust/authenticity
- GPG key material

Those are different jobs.

Mission should be emotional and strategic.
Trust should be operational and verifiable.

### 3. "Core" is too thin and outdated

`/core/` currently reads like an early concept page.
It does not reflect the real system depth visible in the repo:
- GAS-based vitals
- threshold states
- server-authoritative inventory
- equipment-granted storage
- public release verification
- modular plugin architecture

### 4. "Roadmap" is too abstract

`/roadmap/` says "now / next / later", but it is not anchored to current proof.
It does not clearly separate:
- implemented direction
- in-progress work
- long-term vision

This makes the ambition feel less credible than it should.

### 5. "Community" is too small

`/community/` is basically Discord + GitHub.

It should also answer:
- how to contribute
- what the governance stance is
- whether community servers matter
- what is open vs protected
- where public source lives

### 6. Site root trust docs are hidden

`ALIS_PACT.md`, `CONTRIBUTING.md`, and `TRADEMARKS.md` are useful, but they are not surfaced as first-class public material.

That is a mistake. These documents are part of the trust story.

### 7. Credibility details hurt the tone

The site still has small credibility leaks:
- placeholder metadata in `_config.yml` like `Your Name`
- encoding/mojibake in some root docs and posts (broken punctuation artifacts in public text)
- very generic page names like "Core"

For a project that wants seriousness and public trust, these details matter.

## Publication Guardrails

Before any of this becomes public source-of-truth copy:

1. Every "already has" claim should be publicly verifiable from the site or repo.
2. Every policy claim should be labeled as policy if it is not yet visible as shipped behavior.
3. Every roadmap claim should be separated from current proof.
4. Every governance/legal statement should match the actual project documents.

## Recommended Positioning

ALIS should not present itself as only:
- an "educational game"
- a vague survival dream
- a philosophical art project

It should present itself as:

"A serious open survival project built around real locations, real systems, and public trust."

That combines the three strongest public pillars:
- world realism
- systemic depth
- verifiable openness

But ALIS must also keep the differentiators that make it more than a generic hardcore survival game:
- practical knowledge
- meaningful player choice
- human connection and like-minded community

Best corrected high-level position:

Hero:
`ALIS is a serious open survival project built around real locations, believable systems, and public trust.`

Subhead:
`It combines practical knowledge, meaningful player choice, and long-term open development while clearly separating what exists now from what is still ahead.`

## Candidate Hero Claims

Option A:

"An open survival world built on real locations, real systems, and public trust."

Option B:

"ALIS is a serious survival project where real-world knowledge, systemic design, and open development meet."

Option C:

"Open code. Real systems. A survival world you can verify."

Best direction:
- use "Learn. Survive. Connect." as supporting language
- do not use it as the only main claim
- main headline should explain what ALIS is in one sentence

## ALIS Differentiators To Preserve

Do not let the new site erase the parts that make ALIS distinct:

- Practical knowledge transfer
  - grounded survival knowledge
  - believable real-world constraints
  - historical and real-location context where relevant
- Meaningful player choice
  - choices should matter
  - tradeoffs should be visible
  - systems should create consequences, not just tasks
- Human connection
  - finding like-minded people
  - cooperation and community
  - social trust, not just survival friction

This is how ALIS avoids sounding like "just another hardcore survival game."

## Recommended Information Architecture

### Preferred top-level navigation

- Home
- Vision
- Systems
- Status
- Trust
- Community
- Journal

If navigation must stay smaller:
- Home
- Vision
- Systems
- Status
- Trust
- Community

`Journal` can also live in the home page and footer if needed.

## Recommended Pages

### 1. Home

Job:
- explain ALIS in 10 seconds
- prove it in 30 seconds
- show status in 60 seconds

Recommended sections:
- Hero claim
- Short subhead
- "What ALIS is"
- "What exists now"
- "Core systems"
- "Why trust ALIS"
- "Now / Next / Later"
- Latest journal posts
- CTA to Trust and Source

### 2. Vision

Job:
- explain the deeper purpose without becoming vague

Recommended content:
- Learn / Survive / Connect
- why real-world knowledge matters
- why meaningful player choice matters
- why human connection matters
- why real locations matter
- why openness matters
- what "open code, protected world" means

This page should carry the emotional and philosophical thesis.

### 3. Systems

Job:
- show ALIS as a serious systems-driven project

Recommended sections:
- Survival physiology
- Inventory and carrying logic
- Interaction and equipment
- Meaningful choice and consequence loops
- Practical knowledge through systems
- World and loading architecture
- Real-time / believable simulation rules

Concrete proof already exists in docs:
- vitals use a physiology-based model with calories, hydration, fatigue, condition
- vitals are split across GAS state, server-side calculations, and UI readers
- inventory is server-authoritative
- naked baseline is hands only, storage comes from equipped grants
- weight and spatial limits matter

This page should replace the current "Core" page.

### 4. Status

Job:
- show progress without fake certainty

Recommended structure:
- What is real now
- What is actively being expanded next
- What belongs to long-term vision
- Links to latest journal posts

Important:
- separate current proof from future ambition
- show that roadmap items can change
- keep named horizons, but anchor them in real current systems

This should replace or heavily rewrite the current "Roadmap" page.

### 5. Trust

Job:
- turn repo-level trust proof into a public user page

This should be a first-class page, not a subsection inside About.

Recommended sections:
- Public source mirror
- What is open and what is not
- Release verification
- Public key and fingerprint
- Mirrors and download integrity
- ALIS Pact
- Contributing policy
- Trademark policy
- Licensing summary

This page should link directly to:
- public repo/mirror
- public key
- `ALIS_PACT.md`
- `CONTRIBUTING.md`
- `TRADEMARKS.md`

### 6. Community

Job:
- make participation feel structured, not casual only

Recommended content:
- Discord
- GitHub
- contribution path
- DCO summary
- community hosting as direction or current capability, depending on proof
- future modding / hosting direction
- governance stance from the Pact

### 7. Journal

Job:
- prove that development is active and reflective

The current posts can support this, but the site should frame them as evidence of ongoing development, not as the main landing experience.

## How The Home Page Should Read

Recommended narrative order:

1. ALIS is a serious open survival project.
2. It is built around real locations and believable survival systems.
3. The project is open where trust matters: source, docs, release verification.
4. The world is ambitious and long-term, but the site clearly separates what exists now from what is still ahead.

This is much stronger than:
- vague inspiration
- mood-first copy
- broad promises without proof

## What "Serious But Epic" Means In Copy

Do:
- use precise nouns
- use real mechanisms
- state limits openly
- separate "now" from "later"
- show proof next to ambition
- keep ALIS-specific differentiation visible

Do not:
- oversell with cinematic language only
- hide what is not public
- imply systems are complete if they are still evolving
- make the site sound like a manifesto without evidence

Seriousness comes from specificity.
Epic scale comes from horizon and coherence.
You need both.

## Trust Page Requirements

This is the biggest missed opportunity right now.

ALIS already has better trust material than many projects:
- source mirror strategy
- signed release flow
- checksum manifests
- detached signatures
- verify scripts
- public key
- explicit public/private boundary
- public contribution rules

That should become one clean public story:

1. Source can be inspected
2. Releases can be verified
3. Mirrors exist or will exist
4. Policies are written down
5. Players know what is open and what is protected

Important detail:
- mirror/sources should be framed as trust infrastructure, not just "GitHub link"

Important copy rule:
- if a trust feature is policy or direction, say so
- if it is public and verifiable now, show the proof link next to it

## What Should Be Explicitly Added About Mirrors

Recommended public language:

- source is mirrored publicly for inspection and contribution
- release files should use official hashes and signatures
- mirrors can support resilience, but integrity must always be verifiable
- official public key fingerprint is the source of truth

Ideal trust stack on the site:
- Official source
- Public source mirror
- Official release downloads
- Public mirrors / torrent when available
- Hashes
- Detached signature
- Verification instructions

This is the right answer if the goal is trust.

## What The Site Should Say About Current Systems

The site should stop describing ALIS only in broad terms and start naming real systems.

Strong current public proof points:

- Vitals are based on real-world physiology concepts:
  - calories
  - hydration
  - fatigue
  - condition
  - threshold states
- Vitals use a clean split:
  - GAS owns replicated state
  - ProjectVitals owns server-side calculations
  - UI reads the shared state
- Inventory is not abstract weight-only storage:
  - it is server-authoritative
  - item size matters
  - weight matters
  - equipment grants containers
  - hands-only naked baseline is part of the design
- ALIS also has a stronger conceptual differentiator than generic survival:
  - practical knowledge through grounded systems
  - meaningful player choice with consequences
  - connection between players and communities as part of the vision
- The project has a serious delivery architecture:
  - Build Service
  - CDN
  - Launcher
  - Orchestrator
  - runtime loading

Even if the public player build is still early, these points make ALIS look like a real systems project already.

## Recommended Rename Decisions

Strong recommendation:
- rename `Core` -> `Systems`
- split `About` into `Vision` and `Trust`
- evolve `Roadmap` into `Status`

Possible final nav:
- Vision
- Systems
- Status
- Trust
- Community

This is clearer and more serious than:
- About
- Core
- Roadmap
- Community

## External Examples Worth Learning From

Benchmarked on 2026-03-18.

### Gray Zone Warfare
Source:
- https://www.grayzonewarfare.com/about
- https://www.grayzonewarfare.com/news/roadmap

Useful pattern:
- clear pillar-based "about" page
- concrete survival/combat/world claims
- roadmap split into near-term named updates and longer-term horizon
- explicit note that the roadmap can change

Key lesson for ALIS:
- break ambition into proof-backed pillars
- make "what is next" concrete without pretending certainty

### SCUM
Source:
- https://scumgame.com/index.php/about-page/

Useful pattern:
- system-first public pitch
- large world, crafting, loot, base building, metabolism, solo/squad all presented as distinct pillars

Key lesson for ALIS:
- the systems page should talk like a systems page, not like a concept note

### Star Citizen Development Hub
Source:
- https://robertsspaceindustries.com/en/development

Useful pattern:
- public roadmap
- public telemetry
- issue reporting
- patch notes
- visible developer activity

Key lesson for ALIS:
- seriousness is reinforced by public tools and visible process, not only by lore or promises

### DayZ official FAQ / Dev Hub routing
Source:
- https://forums.dayz.com/topic/237979-faq/

Useful pattern:
- official status reports
- bug tracker
- community server stance
- modding/server files surfaced as product-relevant information

Key lesson for ALIS:
- community hosting and public contribution should be visible, not buried

### Mullvad
Source:
- https://mullvad.net/en/why-mullvad-vpn

Useful pattern:
- "what sets us apart" page
- explicit trust claims backed by mechanisms
- open source, external audits, GPG key, anti-hype stance

Key lesson for ALIS:
- trust should be a dedicated page with concrete proofs, not just ideals

### Tails
Source:
- https://tails.net/install/download/

Useful pattern:
- official download and mirror links on one page
- verification integrated into the user flow
- release notes and verification linked directly from download

Key lesson for ALIS:
- mirrors and verification should be part of one trust/download journey

## Local Policy Check: DCO vs CLA

Current local site docs align on:
- `DCO, not CLA`

Verified locally in:
- `site/ALIS_PACT.md`
- `site/CONTRIBUTING.md`

So for public copy today, the safe wording is:
- DCO, not CLA

If another business or strategy document still says `DCO/CLA`, resolve that conflict before publishing public source-of-truth copy.

## Current Safe Language For Risky Claims

Use these safer forms unless product proof is public today:

- Instead of `community servers welcome`
  - use `community hosting is part of the long-term survivability direction`
- Instead of `privacy by default` as shipped UX
  - use `privacy by default is a project commitment and design direction`
- Instead of `ALIS already has mirrors`
  - use `ALIS has a public mirror strategy and trust-oriented mirror direction`
- Instead of `all trust infrastructure is already live`
  - use `the public trust model is already visible in docs, scripts, and site materials, with some parts still maturing`

## Recommended First Pass

### Phase 1: Structure and copy

Do this before visual redesign:

1. Turn home into a true landing page
2. Create a dedicated Trust page
3. Replace Core with Systems
4. Rewrite Roadmap into Status
5. Surface Pact / Contributing / Trademark links
6. Resolve any off-site contradiction about DCO vs CLA before publication

### Phase 2: Proof and detail

Add:
- public source mirror links
- release verification flow
- current systems summary
- "what is open vs protected" explanation
- clearer now/next/later status blocks
- explicit practical knowledge / meaningful choice / human connection block
- label policy vs shipped behavior wherever needed

### Phase 3: Ongoing credibility

Keep current:
- monthly or milestone journal posts
- status updates
- release notes
- trust page details

## Final Direction

If the goal is "serious and epic", the site should not act like a vague indie project page.

It should act like:
- a serious systems-driven survival project
- with a real public architecture
- with verifiable trust mechanisms
- and with a clear long-term world ambition

That is already what the repo suggests.
The site just needs to catch up.
