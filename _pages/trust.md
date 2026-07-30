---
title: "Trust"
permalink: /trust/
layout: single
---

# Trust

How to verify what ALIS claims.

## Public Source

- Public source code
- Architecture and systems documentation
- Mirror-friendly source publication

## Release Verification

Packaged ALIS releases authenticate `SHA256SUMS.txt` with a detached signature.
The manifest covers the release payload, bundled public key, install guide, and
verification helpers.

- Confirm the bundled key against the fingerprint published below.
- Run the bundled `VERIFY_RELEASE.bat`, or verify the detached signature and
  listed SHA-256 hashes manually.

## Signed Project Messages

The same signing identity may authenticate important project messages published
through different channels. A valid signature proves control of the signing key;
always confirm the exact fingerprint and message bytes.

## Public Key

Fingerprint:

`3B98 85F0 C2D8 D927 C27F AB58 F61A 5300 34CF B5E7`

Download:

- [keys.openpgp.org](https://keys.openpgp.org)
- [Direct from fall.is](/assets/security/public-key.asc){: type="application/pgp-keys" }

Always check the fingerprint before trusting a downloaded key.

## License and Provenance

The main game repository owns the operative policy for code, tools, assets,
data, generated artifacts, contributions, and third-party exclusions.

- [ALIS Component License Policy](/license/)

## Project Commitments

- No pay-to-win
- No predatory mechanics
- Privacy by default as design direction
- Transparency over secrecy
- No surprise relicensing

Read the full policies:

- [The Alis Pact](/pact/)
- [Contributing](/contributing/)
- [Trademarks](/trademarks/)

## Public Evidence

- Code, architecture docs, and build and verification workflows
- Contribution and policy documents
- Current development status and system boundaries
