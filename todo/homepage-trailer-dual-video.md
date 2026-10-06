# Homepage dual-video trailer carousel

**Status:** REVIEW REQUIRED
**Scope:** Homepage trailer card (`index.html`), custom Sass, custom head include, new homepage JS, `assets/media`, `.gitattributes`
**Stable documentation owner:** root `README.md` (proposed short "Homepage preview media" section). No existing stable doc owns the served preview clips; the recipe currently lives only in the completed `todo/done/homepage-trailer-proxy-card.md`.

## Contents

- [Goal](#goal)
- [Authority register](#authority-register)
- [Non-goals](#non-goals)
- [Verified evidence](#verified-evidence)
- [Current architecture and source of truth](#current-architecture-and-source-of-truth)
- [Problem and root cause](#problem-and-root-cause)
- [Decision](#decision)
- [Required invariants](#required-invariants)
- [Implementation tasks](#implementation-tasks)
- [Test-first and verification plan](#test-first-and-verification-plan)
- [Documentation plan](#documentation-plan)
- [Rollout and rollback](#rollout-and-rollback)
- [Completion criteria](#completion-criteria)
- [Review record](#review-record)

## Goal

On the homepage trailer card, show one of two muted loop clips chosen at random on each page load; when the current clip ends, automatically show the other, continuing to alternate; provide small dot controls at the bottom of the card so a visitor can switch clips manually. The second clip is the world-generation footage compressed with the same codec/recipe/target as the existing homepage clip, stored in the site repo's media folder.

## Authority register

### Operator decisions

- **D1** Add a second homepage video that alternates with the existing one; the first clip shown is chosen randomly per page open; when a clip ends, show the next in a loop; provide bottom dots for manual switching.
  - Effect: defines the observable goal; does not prescribe the mechanism.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D2** The second source video is the world-generation capture at `E:\Repos_Alis\promotion\tmp\resources\world_generation_raw\WorldGeneration.mp4`, and it must be compressed with the same codecs/approach already used for the homepage video, then placed in a relative media folder inside this site repo.
  - Effect: fixes the source and the output location/approach.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D3** Check whether Minimal Mistakes already provides an out-of-box slider or similar for video switching before adding new machinery.
  - Effect: constrains the design to reuse an existing feature if one exists.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request

### Operator gates

- **Q1 [OPEN - NON-BLOCKING]:** Keep the current "whole card opens the YouTube trailer" link wrapping the video, with the dots as a small separate control row at the card's bottom? - default while open: A1
- **Q2 [OPEN - NON-BLOCKING]:** Use the full ~68 s world-generation clip as the second clip, or trim it shorter? - default while open: A2
- **Q3 [OPEN - NON-BLOCKING]:** Apply the same dark grade/fades as the trailer clip to the (bright) world-generation footage, or keep it closer to its original look? - default while open: A3
- **Q4 [OPEN - NON-BLOCKING]:** Hard cut between clips, or an animated crossfade? - default while open: A4

### Working assumptions

- **A1 [ACTIVE]:** Keep the existing whole-card anchor to YouTube; the dots are sibling `<button>`s overlaid at the card bottom, so a dot click switches the clip without navigating.
- **A2 [ACTIVE]:** Use the entire ~68.3 s world-generation clip; the measured encode is ~2.2 MB, inside the existing ≤3 MB budget.
- **A3 [ACTIVE]:** Apply the same grade/fade recipe as the trailer clip so both clips share the card's dark look and each fades to/from black, which also masks the `src` swap.
- **A4 [ACTIVE]:** Hard cut on the `ended` event (no crossfade); each clip's own fade-in/out supplies the transition.
- **A5 [ACTIVE]:** Without JavaScript the inline preview does not play, but the card still links to YouTube and the dots stay hidden. No empty broken-looking controls.

## Non-goals

- No third-party carousel/slider library or new runtime dependency.
- No change to the full-trailer YouTube link target or the copy-overlay text.
- No poster images, play buttons, or browser-native video controls.
- No changes to theme files (`_layouts`, `_includes` outside `custom`, `_sass/minimal-mistakes`).
- No unrelated homepage cleanup.

## Verified evidence

**Verified facts**

- Minimal Mistakes has **no** built-in slider. Searched `_sass`, `_includes`, `_layouts`, `assets`, `_config.yml`, and the installed gem `minimal-mistakes-jekyll 4.26.2` for `slick|splide|swiper|carousel|slider` → no matches. The theme ships Magnific Popup (lightbox) and FitVids only; `_includes/video` renders a provider iframe, not a carousel. (D3 answered: nothing to reuse.)
- `index.html` wraps a single `<video autoplay muted loop playsinline preload="metadata">` plus `.alis-trailer-copy` inside an `<a>` to `https://www.youtube.com/watch?v=eIJHYsPgNnM`.
- `assets/media/alis-trailer-loop.mp4`: h264, 720x406, 24 fps, 41.167 s, 2,301,411 bytes (~447 kbps), no audio.
- Raw `WorldGeneration.mp4`: h264 1920x1080 30 fps + aac audio, 68.331 s, 134,823,232 bytes (~15.8 Mbps).
- Test encode `tmp/investigate-wg/world-generation-graded-crf34.mp4` using the recipe in [Implementation tasks](#implementation-tasks) → 720x404, 24 fps, 68.292 s, **2,215,801 bytes** (~260 kbps), no audio. Sampled frames (0/12/24/36/48/60/66 s) still readable; branded text overlays legible after grade.
- `.gitattributes` tracks `*.mp4` in Git LFS and exempts only `assets/media/alis-trailer-loop.mp4` as a plain blob. `git check-attr -a -- assets/media/alis-trailer-loop.mp4` confirms `filter: unset`, `diff: unset`, `merge: unset`.
- `_includes/head/custom.html` loads `/assets/css/trailer.css?v={{ site.time | date: '%s' }}` and is the established custom-head hook. `_includes/head.html` adds `js` to `<html>`.
- Custom styles live in `_sass/custom/_trailer_custom.scss`, imported by both `_sass/minimal-mistakes.scss` and `assets/css/trailer.scss`.
- No CI, test harness, `package.json`, or HTML proofer exists (`find .github` → empty). Working tree is clean; `main` is behind `origin/main` by 4 commits (pre-existing, left untouched).

**Inferences**

- The world-generation footage is flat-shaded and low-detail, so CRF 34 compresses it ~1.7x smaller per second than the darker trailer; the size budget is not at risk.
- A single `<video>` element with a JS-swapped `src` is sufficient; no second element is needed.

**Assumptions / unverified areas**

- Only static frames were inspected; the graded world-generation clip has not been watched in motion on a real device.
- `autoplay` / `ended` / `play()` behavior across target browsers is not yet exercised; it is runtime-verified in the plan below.

**Refuted**

- "Minimal Mistakes provides an out-of-box slider for video switching" — no such feature exists in the theme or this repo (searches above).

## Current architecture and source of truth

- `index.html` (layout `home`) owns the homepage trailer card markup.
- `_includes/head/custom.html` owns custom head assets (trailer CSS + analytics + nav highlight).
- `_sass/custom/_trailer_custom.scss` owns card styles, surfaced on the homepage through the separately built `assets/css/trailer.css` (cache-busted in the head include).
- `assets/media/` owns served media; `.gitattributes` owns LFS/blob policy.
- No stable document owns these preview clips today.

## Problem and root cause

Capability gap: the card plays one static clip only. It cannot show a second clip, cannot start on a random clip, and cannot advance on end or accept manual switching.

## Decision

Drive the card from **one** `<video>` element whose `src` is chosen and advanced by a small vanilla-JS module.

- `index.html`: `<video class="alis-trailer-video" autoplay muted playsinline preload="auto" data-clips='["/assets/media/alis-trailer-loop.mp4","/assets/media/alis-worldgen-loop.mp4"]'>` (remove `loop`; no `<source>` child), plus a sibling `.alis-trailer-dots` group of two `<button>`s inside the existing `.alis-trailer-card`.
- New `assets/js/alis-trailer.js`: pick a random index, set `video.src`, `load()`, `play()`; on `ended` advance `(i+1) % n`; dot click selects a clip; toggle `.is-active` + `aria-current`; unhide the dots only when JS runs.
- Dot styles appended to `_sass/custom/_trailer_custom.scss` (theme variables only).
- Load the JS from `_includes/head/custom.html` with `defer` and the same `?v=` cache-bust used for `trailer.css`.
- `assets/media/alis-worldgen-loop.mp4` encoded with the documented recipe; `.gitattributes` gets an exemption so it stays a plain Git blob.

### Premise / KISS gate

The `<video>` element already owns playback lifecycle; the simplest design lets it own the sequence too, driven by ~30 lines of vanilla JS. Versus a typical carousel, this removes: a library, CSS transforms/tracks, drag/touch handling, and a second DOM layer. It adds: one MP4, one small JS file, one dot row. Knowingly given up: inline preview without JavaScript (the card still links to YouTube) and a crossfade animation between clips. The theme provides no slider, so no existing machinery is retained merely for being present.

### Alternatives considered

1. Vendor/import Slick, Swiper, or Splide — rejected: a new dependency and payload for switching between two items; none exists in the repo or theme (YAGNI).
2. Two stacked `<video>` elements crossfading — rejected: duplicate fetching, more state and CSS, and crossfade was not requested.
3. Build-time random selection via Liquid — rejected: Liquid has no per-request random; every visitor would see the same clip, failing D1.
4. YouTube iframes for both clips — rejected: heavier and slower, losing the fast local loop D1 requires.

## Required invariants

1. The homepage autoplays a muted, `playsinline` preview without a user gesture.
2. Exactly one clip is active; `ended` advances to the other and wraps.
3. The first clip is chosen randomly on each page load.
4. The dots reflect the active clip and switch clips by mouse and keyboard (real `<button>`s).
5. The whole-card YouTube link keeps working; dots are never nested inside the anchor.
6. No theme files are modified; styles use only `_sass/custom/` and theme variables.
7. Both MP4s are plain Git blobs (no LFS pointers), h264/yuv420p, faststart, no audio, 24 fps, 720-wide, each ≤3 MB.
8. `prefers-reduced-motion` visitors keep the current behavior (preview not blocked); no new required animation.
9. Without JavaScript no empty interactive controls render (dots hidden) and the card still links to YouTube.

## Implementation tasks

- [ ] Encode the second clip. From the repo root:
  ```bash
  ffmpeg -i "/mnt/e/Repos_Alis/promotion/tmp/resources/world_generation_raw/WorldGeneration.mp4" \
    -vf "scale=720:-2:flags=lanczos,fps=24,eq=brightness=-0.04:contrast=1.08:saturation=0.92,vignette=PI/5,fade=t=in:st=0:d=0.5,fade=t=out:st=67.0:d=0.8,format=yuv420p" \
    -an -c:v libx264 -profile:v high -level 3.1 -crf 34 -preset slow -movflags +faststart \
    assets/media/alis-worldgen-loop.mp4
  ```
  Fade start may be set to `duration - 0.8` (~67.5 s) for a tighter tail; the measured run used 67.0 and produced 2,215,801 bytes. Recompute if a shorter cut (Q2) is chosen.
- [ ] Add the plain-blob exemption to `.gitattributes` next to the existing one:
  ```gitattributes
  assets/media/alis-worldgen-loop.mp4 -filter -diff -merge -text
  ```
- [ ] Restructure `index.html`: remove `loop`, add class `alis-trailer-video` and `data-clips`, add the sibling `.alis-trailer-dots` group with two `<button type="button" class="alis-trailer-dot" data-clip="0|1" aria-label="...">` elements and `hidden` on the group.
- [ ] Add `assets/js/alis-trailer.js` per [Decision](#decision): random start, `ended` advance, dot click, active/`aria-current` sync, unhide dots.
- [ ] Add dot styles to `_sass/custom/_trailer_custom.scss` using theme variables; ensure `.alis-trailer-dots` is `position:absolute; bottom; z-index:3; left:50%; transform:translateX(-50%)`, does not render when `hidden` (`:not([hidden]){display:flex}` or a `[hidden]{display:none}` rule), and give each button a ≥24x24 px hit area with a small visual dot via `::before`. Add `transition:none` for the dot under the existing `prefers-reduced-motion` block.
- [ ] Load the JS in `_includes/head/custom.html` with `defer` and `?v={{ site.time | date: '%s' }}`.
- [ ] Update root `README.md` per [Documentation plan](#documentation-plan).
- [ ] Run the verification matrix and review the final diff against this todo.

## Test-first and verification plan

### Red evidence

- **Acceptance evidence (outcome the operator asked for):** before the change, reloading `/` always shows the same single clip and there are no dot controls and no advance at clip end. After: reloading several times shows both clips across loads; a dot row is present and tracks the active clip; forcing `ended` (or seeking to the end) switches to the other clip and wraps.
- **Permanent regression guards:** none available — this repo has no test harness, no `package.json`, and no CI (see [Verified evidence](#verified-evidence)). State the limitation and rely on the runtime browser evidence plus the Jekyll build; do not add a test framework for a two-item switch.
- **Reviewer-checked judgements** (verify by inspection, not encoded as a test): visual consistency of the grade between clips; the fade masks the `src` swap; dots are legible, focused, and hit-area adequate; no layout shift; no theme files touched; dots are outside the `<a>`.

### Green evidence

- Clip facts: `du -h assets/media/alis-trailer-loop.mp4 assets/media/alis-worldgen-loop.mp4` (each ≤3 MB) and `ffprobe -hide_banner -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 <file>` (h264, 720-wide, 24 fps, no audio).
- Blob policy: `git check-attr -a -- assets/media/alis-worldgen-loop.mp4` shows no `filter: lfs`; `file assets/media/alis-worldgen-loop.mp4` reports MP4 data.
- Build: `bundle exec jekyll build` succeeds; `_site/index.html` contains both clip paths and the dots; `_site/assets/media/alis-worldgen-loop.mp4`, `_site/assets/js/alis-trailer.js`, and dot rules in `_site/assets/css/trailer.css` exist.
- Runtime smoke (WSL2 polling per project rules): `bundle exec jekyll serve --host 0.0.0.0 --force_polling`, open `/`, reload several times for the random start, drive `ended` to confirm advance + wrap, click and keyboard-tab the dots, check a narrow mobile width, and emulate `prefers-reduced-motion`.
- HTML validity: confirm the dots are siblings of the `<a>`, not descendants (no nested interactive content).

## Documentation plan

- **Authoritative stable owner:** root `README.md` — add a short "Homepage preview media" section.
- **Router / TOC update:** none (no docs router exists; `/docs` is not a convention here).
- **Content to add:** the two clip files and their roles; the shared encode recipe (parameterized, without machine-absolute paths); the ≤3 MB budget; 720-wide / 24 fps / no audio / faststart; the `.gitattributes` plain-blob requirement.
- **Duplication avoided:** `index.html` and `alis-trailer.js` own the runtime contract; README names the files but does not restate the markup or JS. The completed `todo/done/homepage-trailer-proxy-card.md` is a historical record and is left untouched.

## Rollout and rollback

- Rollout: commit the new MP4, `.gitattributes`, `index.html`, JS, Sass, head include, and README; deploy as usual (GitHub Pages). Both clips must be plain blobs before the branch deploys.
- Rollback: revert the commit. The new MP4 is additive; removing it does not affect the existing `alis-trailer-loop.mp4`.

## Completion criteria

`PASS` requires: both MP4s present, ≤3 MB, h264/24 fps/720-wide/no-audio; `alis-worldgen-loop.mp4` not LFS-tracked; `bundle exec jekyll build` clean with the expected `_site` outputs; runtime evidence of random start, `ended` advance + wrap, and working dot switching (mouse + keyboard); no theme files modified; README section added; no unrelated changes.

## Review record

### 2026-10-06 - Investigation

- **Trigger (operator):** "check existing short alis video when site openings ... we need add secondary video that will auto change slide between two videos, with bottom some dots to manually switch if needed. when site first openings by user - randomly shown one of two videos ... also need properly compress with our existing codecs like already on site video ... second raw video here E:\Repos_Alis\promotion\tmp\resources\world_generation_raw\WorldGeneration.mp4 ... goal is simple users could see any of 2 videos randomly very fast, and when ended show next video in loop. by default random video."
- D1, D2, D3 recorded; Q1-Q4 opened as non-blocking; A1-A5 recorded.
- D3 answered by evidence: Minimal Mistakes offers no slider; the lowest-moving-parts design is a single `<video>` with JS-swapped `src`.
- Test encode measured at 2.2 MB for the full 68 s clip, so A2 (full clip) stays within budget.
