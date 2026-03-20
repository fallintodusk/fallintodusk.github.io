# Project Instructions

## Styling Rules

- **NEVER modify theme files** in `_sass/minimal-mistakes/` directly
- All style overrides go in `_sass/custom/` following the existing pattern (`_*_custom.scss`)
- Register new custom partials via `@import` in `_sass/minimal-mistakes.scss` under the `/* Custom */` section
- Use theme variables (`$text-color`, `$link-color`, `$muted-text-color`, etc.) — no hardcoded colors
