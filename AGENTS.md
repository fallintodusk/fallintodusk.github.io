# Project Instructions

## Theme Override Rules

- **NEVER modify theme files** — this includes `_sass/minimal-mistakes/`, `_includes/` (except `custom` subdirs/files), and `_layouts/`
- Style overrides go in `_sass/custom/` following the existing pattern (`_*_custom.scss`)
- Register new custom partials via `@import` in `_sass/minimal-mistakes.scss` under the `/* Custom */` section
- HTML/JS customizations go in `_includes/head/custom.html`, `_includes/footer/custom.html`, or new custom includes
- Use theme variables (`$text-color`, `$link-color`, `$muted-text-color`, `$warning-color`, etc.) — no hardcoded colors

## Jekyll on WSL2

- If repo is on a Windows-mounted drive in WSL2, `inotify` doesn't work
- Always use `--force_polling` flag: `bundle exec jekyll serve --host 0.0.0.0 --force_polling`
- After SCSS/include changes, verify the built output before confirming to user
