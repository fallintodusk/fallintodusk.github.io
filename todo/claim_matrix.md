# ALIS Claim Matrix

Reviewed on 2026-03-18.

Purpose:
- freeze safe public wording before rewriting live pages
- separate public proof from policy, in-progress work, and long-term direction
- stop future drift in homepage, trust page, roadmap copy, and posts

## Claim Types

- `Public now`
  - supported by public repo/site/docs today
  - safe for Home, Systems, and Trust pages
- `Policy`
  - project commitment or public rule
  - must be written as commitment, not shipped UX
- `In progress`
  - active work or near-term expansion
  - belongs mainly on Status
- `Long-term direction`
  - strategic horizon
  - belongs on Vision, Status, and Community

## Publication Rules

1. Do not use present-tense product language for anything that is only policy or direction.
2. Every `Public now` claim should have a proof anchor in public docs or site files.
3. Every `Policy` claim should read as commitment, not completed feature.
4. Every `In progress` claim should be framed as active work, not guaranteed date.
5. Every `Long-term direction` claim should be visibly separate from current public proof.

## Approved Claim Matrix

| ID | Area | Type | Safe public wording | Proof anchor | Best pages | Avoid |
| --- | --- | --- | --- | --- | --- | --- |
| C01 | Identity | Public now | `ALIS is an open Unreal Engine 5 survival project built around real locations, believable systems, and public documentation.` | `Alis/README.md` | Home, Vision | `fully open world platform` |
| C02 | Open code / protected world | Public now | `The code and public docs are open. Protected world assets, licensed payloads, and private infrastructure are handled separately.` | `Alis/README.md`, `site/ALIS_PACT.md` | Home, Vision, Trust | `everything is open-source` |
| C03 | Real-world survival | Public now | `ALIS is publicly framed around real-world survival systems rather than arcade abstraction.` | `Alis/README.md`, `Plugins/Gameplay/ProjectVitals/docs/design_vision.md` | Home, Systems, Vision | `hyper-real survival simulator shipping now` |
| C04 | Practical knowledge | Policy | `ALIS aims to turn practical knowledge into grounded play instead of abstract tutorialization.` | `Alis/README.md` plus strategy notes | Home, Vision | `ALIS already teaches real skills at scale` |
| C05 | Meaningful choice | Long-term direction | `ALIS is being shaped around meaningful player choice, visible tradeoffs, and consequences.` | strategy direction, not strong public proof yet | Home, Vision, Systems | `every choice already changes the world` |
| C06 | Human connection | Long-term direction | `ALIS is intended to help players find and build with like-minded people, not just survive alone.` | strategy direction, not strong public proof yet | Home, Vision, Community | `community network already live` |
| C07 | Vitals system | Public now | `Current public docs describe a physiology-based vitals model using calories, hydration, fatigue, condition, and threshold states.` | `Plugins/Gameplay/ProjectVitals/README.md`, `Plugins/Gameplay/ProjectVitals/docs/design_vision.md` | Home, Systems | `fully finished survival sim` |
| C08 | Inventory system | Public now | `Current public docs describe a server-authoritative inventory model where item size, weight, and equipment-granted storage matter.` | `Plugins/Features/ProjectInventory/README.md`, `Plugins/Features/ProjectInventory/docs/design_vision.md` | Home, Systems | `feature-complete Tarkov inventory` |
| C09 | Delivery architecture | Public now | `Public docs already describe a delivery stack spanning Build Service, CDN, Launcher, Orchestrator, and runtime loading.` | `docs/loading/README.md` | Home, Systems, Trust | `production service network for public players` |
| C10 | Source publication | Public now | `ALIS has a documented public mirror policy and mirror tooling for source publication.` | `scripts/git/mirror/README.md` | Trust, Home | `ALIS already has every public mirror live` |
| C11 | Release verification | Public now | `ALIS publicly documents release packaging, checksums, detached signatures, and verification helpers.` | `docs/build/packaging_guide.md`, `scripts/ue/package/README.md` | Trust, Home | `all public releases are already broadly mirrored` |
| C12 | Public key | Public now | `The site publishes the ALIS public key and fingerprint for verification.` | `site/_pages/about.md`, `site/assets/security/public-key.asc` | Trust | `trust us blindly` |
| C13 | No pay-to-win | Policy | `ALIS commits to no pay-to-win monetization.` | `site/ALIS_PACT.md` | Trust, Vision | `economy solved and final` |
| C14 | No predatory mechanics | Policy | `ALIS commits to no predatory mechanics and no exploitative scarcity loops.` | `site/ALIS_PACT.md` | Trust | `consumer-safe by implementation in every flow today` |
| C15 | Privacy by default | Policy | `Privacy by default is a project commitment and design direction.` | `site/ALIS_PACT.md` | Trust, Vision | `privacy-by-default UX is already complete everywhere` |
| C16 | Community contribution rules | Public now | `Contributions use DCO. Current public policy is DCO, not CLA.` | `site/CONTRIBUTING.md`, `site/ALIS_PACT.md` | Trust, Community | `DCO/CLA` |
| C17 | Community hosting | Long-term direction | `Community hosting is part of the long-term survivability direction.` | `site/_pages/roadmap.md`, strategy direction | Community, Status, Vision | `community servers welcome now` |
| C18 | Governance / decentralization | Long-term direction | `Governance is intended to become more open over time. Decentralization is a long-term direction, not current product structure.` | `site/ALIS_PACT.md`, `site/_pages/roadmap.md` | Status, Community, Trust | `decentralized governance already operational` |
| C19 | Mirror-friendly distribution | In progress | `Mirror-friendly distribution and optional torrent publication are part of the trust and delivery model, and should be announced only when active links exist.` | `docs/build/packaging_guide.md`, `scripts/git/mirror/README.md` | Trust, Status | `download from our public mirrors now` without links |
| C20 | Non-play-to-earn | Policy pending source | `Do not publish until a source-of-truth policy exists in site or repo docs.` | no public source found in current local docs | Trust, Vision | `not play-to-earn` without written policy |

## Blocked Phrases

| Phrase to avoid | Why | Use instead |
| --- | --- | --- |
| `community servers welcome` | too strong for current public proof | `community hosting is part of the long-term survivability direction` |
| `privacy by default` as shipped UX | reads like completed implementation | `privacy by default is a project commitment and design direction` |
| `ALIS already has public mirrors` | may imply active public mirror endpoints | `ALIS has a documented public mirror strategy and tooling` |
| `all trust infrastructure is live now` | overstates current public state | `the public trust model is already visible in docs, scripts, and site materials, with some parts still maturing` |
| `DCO/CLA` | conflicts with current local site policy docs | `DCO, not CLA` |
| `educational game` as primary identity | too narrow and undersells systems/trust | `serious open survival project` plus practical knowledge as differentiator |

## Recommended Page Use

- Home:
  - mostly `Public now`
  - a small amount of `Policy`
  - one clear `Long-term direction` block
- Vision:
  - `Policy` and `Long-term direction`
  - supported by a few `Public now` anchors
- Systems:
  - mostly `Public now`
  - light `Long-term direction` for consequence loops
- Status:
  - `Public now`, `In progress`, `Long-term direction`
- Trust:
  - `Public now` and `Policy`
- Community:
  - `Public now` plus clearly labeled `Long-term direction`

## Immediate Follow-Up

Use this matrix to review:
- homepage hero and subhead
- trust page commitments
- systems page descriptions
- roadmap/status wording
- future public posts that describe project direction
