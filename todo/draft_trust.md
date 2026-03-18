# Draft Trust Page

Reviewed on 2026-03-18.

Status:
- draft only
- intended to replace the trust subsection currently buried inside `/about/`

## Recommended Title

`Trust`

## Recommended Intro

ALIS should be trusted through public proof where possible, not through vague promises.

The trust model has three layers:

- public source and documentation
- verifiable release flow
- written policy and contribution rules

This page should explain all three in one place.

## Public Source

ALIS publishes public code and public documentation.

The project also documents a mirror policy and mirror tooling for source publication. That matters because resilience and reviewability are part of trust, not afterthoughts.

Safe wording:
- code and public docs are open
- source publication is designed to be mirror-friendly
- active public mirror links should be listed here only when they exist

## What Is Open And What Is Protected

ALIS should state this clearly:

- open:
  - code
  - architecture docs
  - build, packaging, and verification workflows
  - contribution and policy docs
- protected or separate:
  - licensed asset payloads
  - protected world assets
  - private infrastructure
  - secrets and machine-local configuration

Recommended one-line explanation:

`Open code does not mean every world asset or private operational detail belongs in the public mirror.`

## Release Verification

ALIS already documents a release verification model built around:

- checksums
- detached signatures
- verification helpers
- a site-published public key and fingerprint

This section should link directly to:

- public key file
- fingerprint
- packaging guide
- verification helper docs

Recommended copy:

`Public releases should be verifiable, not just downloadable.`

## Public Key

This section should include the exact published fingerprint:

`3B98 85F0 C2D8 D927 C27F AB58 F61A 5300 34CF B5E7`

Recommended supporting text:

`Always check the fingerprint before trusting a downloaded key or signature.`

## Project Commitments

These should be framed as policy commitments, not as claims that every implementation detail is already complete:

- no pay-to-win
- no predatory mechanics
- privacy by default as project commitment and design direction
- transparency over secrecy
- no surprise relicensing

This section should also link to:

- `ALIS_PACT.md`
- `CONTRIBUTING.md`
- `TRADEMARKS.md`

## Contribution Rules

Current local public docs align on:

- DCO, not CLA

Recommended copy:

`Contributions use DCO. The current public policy is DCO, not CLA.`

That wording is safe because it matches the current local site docs.

## Community Hosting And Long-Term Resilience

This section must stay careful with tense.

Safe wording:

`Community hosting and broader distribution resilience are part of the long-term survivability direction. Announce live public mirrors, torrents, or hosting support only when active public links and instructions exist.`

Avoid:

- `community servers welcome` as if fully public now
- `download from our mirrors` without actual mirror endpoints

## Recommended Closing

Trust is not one feature. It is the combination of:

- public code and docs
- public verification paths
- written commitments
- clear boundaries about what is open and what is not

ALIS should make that structure visible and easy to inspect.

## Proof Anchors For This Page

- `site/_pages/about.md`
- `site/assets/security/public-key.asc`
- `site/ALIS_PACT.md`
- `site/CONTRIBUTING.md`
- `site/TRADEMARKS.md`
- `Alis/docs/build/packaging_guide.md`
- `Alis/scripts/ue/package/README.md`
- `Alis/scripts/git/mirror/README.md`
- `Alis/README.md`
