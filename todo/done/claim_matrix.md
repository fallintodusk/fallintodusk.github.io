# ALIS Claim Matrix

Editorial guardrails for site content.

## Claim Types

- **Public now** — supported by public repo/site/docs today. Safe for Home, Systems, Trust.
- **Policy** — project commitment or public rule. Write as commitment, not shipped UX.
- **In progress** — active work. Belongs mainly on Status.
- **Long-term direction** — strategic horizon. Belongs on Vision, Status, Community.

## Publication Rules

1. Do not use present-tense product language for anything that is only policy or direction.
2. Every Public now claim should have a proof anchor in public docs or site files.
3. Every Policy claim should read as commitment, not completed feature.
4. Every In progress claim should be framed as active work, not guaranteed date.
5. Every Long-term direction claim should be visibly separate from current public proof.

## Page Use

- **Home:** mostly Public now, small amount of Policy, one clear Long-term block
- **Vision:** Policy and Long-term direction, supported by Public now anchors
- **Systems:** mostly Public now, light Long-term for consequence loops
- **Status:** Public now, In progress, Long-term direction
- **Trust:** Public now and Policy
- **Community:** Public now plus clearly labeled Long-term direction

## Blocked Phrases

| Phrase to avoid | Why | Use instead |
| --- | --- | --- |
| `community servers welcome` | not current reality | `community hosting is part of the long-term direction` |
| `privacy by default` as shipped UX | reads like completed implementation | `privacy by default is a project commitment and design direction` |
| `ALIS already has public mirrors` | may imply active endpoints | `ALIS has a documented public mirror strategy and tooling` |
| `educational game` | too narrow, undersells the project | practical knowledge as a design principle |
| `DCO/CLA` | conflicts with current policy | `DCO` (that's the policy) |
