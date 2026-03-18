# Draft Home Page

Reviewed on 2026-03-18.

Status:
- draft only
- do not publish without checking against `todo/claim_matrix.md`

## Recommended Title

`ALIS - Real locations. Believable systems. Public trust.`

## Recommended Hero

### Headline

`ALIS is a serious open survival project built around real locations, believable systems, and public trust.`

### Subhead

`It combines practical knowledge, meaningful player choice, and long-term open development while clearly separating what exists now from what is still ahead.`

### Supporting line

`Learn. Survive. Connect.`

### Primary calls to action

- `See Systems`
- `See Trust`

### Secondary calls to action

- `Read Vision`
- `Follow Status`

## What ALIS Is

ALIS is an open Unreal Engine 5 project focused on survival under believable constraints, real locations, and long-horizon worldbuilding.

The public codebase already exposes architecture, systems direction, build and release workflows, and trust-oriented documentation. At the same time, ALIS does not pretend that every part of the world is open or already complete. The code and public docs are open. Protected world assets, licensed payloads, and private infrastructure are handled separately.

## Why ALIS Is Different

### Practical knowledge

ALIS is not trying to be "educational software." It is trying to make practical knowledge matter inside play. Survival decisions should feel grounded, not arbitrary.

### Meaningful choice

ALIS should not reduce the player to following scripted checklists. Choices, tradeoffs, and consequences need to be visible.

### Human connection

ALIS is not only about personal survival. It is also about trust, cooperation, and finding like-minded people in a harsh world.

## What Is Publicly Real Today

- Public source code and architecture docs
- Public mirror policy and source publication tooling
- Public packaging and verification docs for release trust
- Public signing key and fingerprint on the site
- Public docs for a physiology-based vitals model
- Public docs for a server-authoritative inventory model
- Public docs for the Build Service -> CDN -> Launcher -> Orchestrator -> runtime loading chain

## Core Systems

### Survival physiology

Current public docs describe a vitals model built around calories, hydration, fatigue, condition, and threshold states. The goal is grounded survival pressure, not a single generic health bar.

### Inventory and carrying

Current public docs describe inventory as a real constraint system. Item size matters. Weight matters. Storage comes from equipment. Naked baseline means hands only.

### World and delivery architecture

ALIS already documents a serious technical chain from build and content delivery to boot and runtime loading. This matters because long-term trust depends on more than lore and screenshots.

## Trust, Not Blind Trust

ALIS should be trusted through public proof where possible:

- public code and docs
- public contribution rules
- public trust key and fingerprint
- documented signing and verification flow
- a clear boundary between what is open and what is protected

This is not a side topic. It is part of the product identity.

## Status

### Public now

- public repo and docs
- systems-level documentation for vitals, inventory, loading, and trust workflows
- site-published trust key and verification path

### In progress

- clearer public presentation of current systems
- clearer public trust page
- better status communication between current proof and future scope

### Long-term direction

- deeper survival loops
- broader world scale
- stronger community and hosting resilience
- more open long-term project governance

## Closing Position

ALIS should present itself as a serious systems-driven survival project with public proof, not as a vague concept page and not as a generic hardcore survival clone.

That means the homepage should do four jobs quickly:

1. define what ALIS is
2. show what is real today
3. explain what makes it distinct
4. point visitors toward trust and systems pages

## Proof Anchors For This Page

- `Alis/README.md`
- `Alis/docs/loading/README.md`
- `Alis/docs/build/packaging_guide.md`
- `Alis/scripts/git/mirror/README.md`
- `Alis/Plugins/Gameplay/ProjectVitals/README.md`
- `Alis/Plugins/Features/ProjectInventory/README.md`
- `site/_pages/about.md`
- `site/ALIS_PACT.md`
- `site/CONTRIBUTING.md`
