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

On the homepage trailer card, show one of two muted loop clips chosen at random on each page load; when the current clip ends, automatically show the other, continuing to alternate; provide small dot controls at the bottom of the card so a visitor can switch clips manually. The second clip is the world-generation footage compressed with the same codec/approach as the existing homepage clip, stored in the site repo's media folder.

## Authority register

### Operator decisions

- **D1** Add a second homepage video that alternates with the existing one; the first clip shown is chosen randomly per page open; when a clip ends, show the next in a loop; provide bottom dots for manual switching.
  - Effect: defines the observable goal; does not prescribe the mechanism.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D2** The second source video is the world-generation capture at `E:\Repos_Alis\promotion\tmp\resources\world_generation_raw\WorldGeneration.mp4`, and it must be compressed with the same codecs/approach already used for the homepage video, then placed in a relative media folder inside this site repo.
  - Effect: fixes the source and the output location/approach. The wording "codecs/approach" is satisfied by codec/container/bitrate approach; it does not ask for the previous clip's colour grade or baked fades (see D4).
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D3** Check whether Minimal Mistakes already provides an out-of-box slider or similar for video switching before adding new machinery.
  - Effect: constrains the design to reuse an existing feature if one exists.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D4** Critically evaluate the review feedback against the real code and project goals; apply the fixes that affect current functionality or future scalability; explicitly refute points that are incorrect.
  - Effect: directs this revision. Adopted fixes: per-clip link ownership, preserve source frame rate, no destructive re-grading, keep the no-JS preview, larger touch targets. Refuted/qualified points are recorded in [Review record](#review-record).
  - Reason: not stated
  - Date/source: 2026-10-06 operator request
- **D5** The homepage card link for the world-generation clip is `https://youtu.be/zZOI2uBskSA`.
  - Effect: fixes the second clip's anchor `href`/`aria-label`; closes Q5; resolves A7.
  - Reason: not stated
  - Date/source: 2026-10-06 operator confirmation
- **D6** Apply the two required review fixes: each clip preserves its own source frame rate (existing 24 fps, new 30 fps; never reduce fps for size), and the quality fallback must satisfy the homepage size budget by shortening the proxy rather than reducing frame rate or resolution. Implementation remains gated on an explicit go.
  - Effect: fixes the frame-rate rules and the fallback ladder; keeps implementation gated.
  - Reason: not stated
  - Date/source: 2026-10-06 operator request (relayed review)

### Operator gates

- **Q1 [CLOSED by D4]:** Keep the current "whole card opens the YouTube trailer" link wrapping the video, with the dots as a small separate control row at the card's bottom? - closed: keep the whole-card anchor, dots as sibling controls overlaid at the card bottom.
- **Q2 [OPEN - NON-BLOCKING]:** Use the full ~68 s world-generation clip as the second clip, or trim it shorter? - default while open: A2
- **Q3 [CLOSED by D4]:** Apply the same dark grade/fades as the trailer clip to the (bright) world-generation footage, or keep it closer to its original look? - closed: no baked grade or fades; the card's existing CSS overlay owns the dark look.
- **Q4 [OPEN - NON-BLOCKING]:** Hard cut between clips, or an animated crossfade? - default while open: A4
- **Q5 [CLOSED by D5]:** Confirm the world-generation clip's full-video destination for the card link. Evidence points to `https://youtu.be/zZOI2uBskSA` (`_posts/2026-10-06-n000005-build-the-game.md`, whose thumbnail `n5_BuildTheGame.webp` is a frame of `WorldGeneration.mp4`). - gates: the anchor `href`/`aria-label` value for the second clip. Public-facing, so it is confirmed before deploy; the plan ships the per-clip plumbing regardless.

### Working assumptions

- **A1 [ACTIVE]:** Keep the existing whole-card anchor to YouTube; the dots are sibling `<button>`s overlaid at the card bottom, so a dot click switches the clip without navigating. Each carousel item also carries the anchor `href`/`aria-label` to apply when it becomes active (D5).
- **A2 [ACTIVE]:** Use the entire ~68.3 s world-generation clip; the clean 30 fps CRF 34 encode is 2.4 MiB, inside the ≤3 MiB budget. If the in-motion review rejects CRF 34, fall through the CRF 32 / shorten ladder (D6) rather than dropping frame rate.
- **A3 [REJECTED by evidence]:** Apply the trailer's `eq`/`vignette`/`fade` recipe to the world-generation clip - the card CSS already supplies a vignette/gradient overlay, and re-grading a finished master with large spatial text risks readability for no functional gain.
- **A4 [ACTIVE]:** Hard cut on `ended` (no crossfade). No baked fades; the earlier plan relied on baked fades as the transition and that dependency is removed.
- **A5 [REJECTED by evidence]:** Without JavaScript the inline preview does not play - the existing `<video src>` is retained as the no-JS/error fallback, so the first clip still plays.
- **A6 [ACTIVE]:** Keep `loop` in the HTML for the no-JS fallback, and have JS set `video.loop = false` on init so `ended` can fire for the carousel. Without this, no-JS degrades from looping to play-once.
- **A7 [RESOLVED by D5]:** The world-generation clip's full trailer is `https://youtu.be/zZOI2uBskSA`.
- **A8 [ACTIVE]:** Carousel data lives in the JS as a plain item list (`src`, `href`, `label`); no generic carousel abstraction and no second `<video>` element.

## Non-goals

- No third-party carousel/slider library or new runtime dependency.
- No colour grade, vignette, or baked fade applied to the world-generation master (D4, A3).
- No change to the copy-overlay text or to the first clip's YouTube target.
- No poster images, play buttons, or browser-native video controls.
- No changes to theme files (`_layouts`, `_includes` outside `custom`, `_sass/minimal-mistakes`).
- No unrelated homepage cleanup; no test framework added.

## Verified evidence

**Verified facts**

- Minimal Mistakes has **no** built-in slider. Searched `_sass`, `_includes`, `_layouts`, `assets`, `_config.yml`, and the installed gem `minimal-mistakes-jekyll 4.26.2` for `slick|splide|swiper|carousel|slider` → no matches. The theme ships Magnific Popup (lightbox) and FitVids only; `_includes/video` renders a provider iframe, not a carousel. (D3 answered: nothing to reuse.)
- Current `index.html` (unchanged by the concurrent commit) still wraps a single `<video autoplay muted loop playsinline preload="metadata"><source src="/assets/media/alis-trailer-loop.mp4"></video>` plus `.alis-trailer-copy` inside an `<a>` to `https://www.youtube.com/watch?v=eIJHYsPgNnM` with `aria-label="Watch ALIS 1.0.0 trailer on YouTube"`. No carousel code exists in the repo.
- History: `main` was fast-forwarded to `origin/main` and the todo was committed as `61ea270 "Add dual-video trailer carousel to homepage"`. **That commit's diff contains only this todo file** (`git show --stat 61ea270` → 1 file changed, 201 insertions); its message describes an implementation that is not in the tree. The earlier "4 commits behind" condition no longer exists (`git rev-parse HEAD origin/main` are equal; `git branch -vv` shows `[origin/main]`).
- `assets/media/alis-trailer-loop.mp4`: h264, 720x406, 24 fps, 41.167 s, 2,301,411 bytes (~447 kbps), no audio.
- Raw `WorldGeneration.mp4`: h264 1920x1080 **30 fps** + aac audio, 68.331 s, 134,823,232 bytes (~15.8 Mbps). 30 fps ⇒ ~2050 source frames; forcing 24 fps drops ~410 frames (~20%).
- Clean encodes of the raw clip (`scale=720:-2:flags=lanczos,fps=30,format=yuv420p`, `-an`, libx264 high/3.1, `-preset slow`, `-movflags +faststart`), no colour grade:
  - CRF 34 → 2,493,452 bytes (2.4 MiB)
  - CRF 32 → 3,051,822 bytes (2.9 MiB)
  - CRF 30 → 3,784,898 bytes (3.6 MiB)
  - CRF 28 → 4,746,300 bytes (4.5 MiB)
  - CRF 34, first 45 s only → 1,676,451 bytes (1.6 MiB)
  - CRF 34 at 640-wide → 2,075,779 bytes (2.0 MiB) — measured, not part of the fallback ladder
- Homepage budget convention (inherited from the prior card): ≤3 MiB as reported by `du -h`, i.e. 3,145,728 bytes. CRF 34 and CRF 32 fit; CRF 30 does not.
- The earlier graded 24 fps CRF 34 encode was 2,215,801 bytes; ~278 KB (11%) of its saving came from dropping to 24 fps and grading detail away.
- Raw clip starts and ends on bright, fully saturated frames (frames at 0/12/24/36/48/60/66 s), so it has no existing fade and a baked fade would be new editorial content.
- `_posts/2026-10-06-n000005-build-the-game.md` ends with `Watch https://youtu.be/zZOI2uBskSA`; `tmp/resources/.../n5_BuildTheGame.webp` and `frame_49_990.png` are frames of `WorldGeneration.mp4`. No other file in the site repo maps this clip to a URL.
- `.gitattributes` tracks `*.mp4` in Git LFS and exempts only `assets/media/alis-trailer-loop.mp4` (`git check-attr -a` → `filter: unset`, `diff: unset`, `merge: unset`).
- `_includes/head/custom.html` loads `/assets/css/trailer.css?v={{ site.time | date: '%s' }}` and is the established custom-head script/style hook. `_includes/head.html` adds `js` to `<html>`.
- Custom styles live in `_sass/custom/_trailer_custom.scss`, imported by both `_sass/minimal-mistakes.scss` and `assets/css/trailer.scss`. The card already applies a radial vignette + bottom gradient via `.alis-trailer-card a::after`.
- No CI, test harness, `package.json`, or HTML proofer exists (`find .github` → empty).

**Inferences**

- `WorldGeneration.mp4` is the "Build the Game" trailer (n000005), so its YouTube destination is `https://youtu.be/zZOI2uBskSA`. The thumbnail match is strong and the URL is operator-confirmed by D5.
- The world-generation footage is flat-shaded and low-detail, so CRF 34 (2.4 MiB) and the CRF 32 fallback (2.9 MiB) both fit the ≤3 MiB budget at 30 fps; CRF 30 (3.6 MiB) does not. The size trade for keeping 30 fps over 24 fps at CRF 34 is ~0.28 MB.

**Assumptions / unverified areas**

- Frame-rate and CRF choices are measured, not watched: no full-speed motion review has been done. The plan gates the final CRF on that review.
- `autoplay` / `ended` / `play()` behaviour across target browsers is runtime-verified in the plan below.

**Refuted**

- "Minimal Mistakes provides an out-of-box slider for video switching" — no such feature exists in the theme or this repo.
- "24 fps is a required property of the homepage preview" — it is a property of the existing clip only; the new master is 30 fps and 24 fps removes ~20% of frames.
- "The second clip is bound to the existing trailer link so a single `href` is sufficient" — the second clip has its own trailer (D5, evidence above).

## Current architecture and source of truth

- `index.html` (layout `home`) owns the homepage trailer card markup.
- `_includes/head/custom.html` owns custom head assets (trailer CSS + analytics + nav highlight).
- `_sass/custom/_trailer_custom.scss` owns card styles, surfaced on the homepage through the separately built `assets/css/trailer.css` (cache-busted in the head include).
- `assets/media/` owns served media; `.gitattributes` owns LFS/blob policy.
- `todo/done/homepage-trailer-proxy-card.md` is a historical record of the single-clip card and is left untouched.
- No stable document owns these preview clips today.

## Problem and root cause

Capability gap: the card plays one static clip only. It cannot show a second clip, cannot start on a random clip, and cannot advance on end or accept manual switching. The review round also established that the second clip has its own full-trailer destination, so a single fixed card link would send a visitor from the world-generation preview to the wrong video.

## Decision

Drive the card from **one** `<video>` element whose `src` is chosen and advanced by a small vanilla-JS module; each item owns its own link.

- `index.html`: keep a real fallback source and the looping no-JS behaviour:
  ```html
  <video class="alis-trailer-video"
         src="/assets/media/alis-trailer-loop.mp4"
         autoplay muted loop playsinline preload="metadata"></video>
  ```
  plus a sibling `.alis-trailer-dots` group of two `<button>`s inside the existing `.alis-trailer-card`, `hidden` until JS runs.
- New `assets/js/alis-trailer.js`:
  - item list owning `{ src, href, label }` for both clips (single owner of carousel data; not a generic carousel model);
  - `video.loop = false` on init so `ended` fires;
  - roll a random index; if it is the fallback clip already playing, do not reload it (avoids a restart and a wasted fetch); otherwise set `video.src`, `load()`, `play()`;
  - on `ended`, advance `(i+1) % n`;
  - on every switch, also set the card anchor's `href` and `aria-label` to the active item's, and sync `.is-active` + `aria-current` on the dots;
  - unhide the dots.
- Encode `assets/media/alis-worldgen-loop.mp4` with **clean compression only** (no `eq`, no `vignette`, no baked `fade`), at its own source 30 fps, CRF 34 default, and require an in-motion review before accepting that CRF. If rejected, fall to CRF 32 and then to a shorter proxy (D6); never reduce frame rate (see verification plan). The existing 24 fps clip is not re-encoded.
- Dot styles appended to `_sass/custom/_trailer_custom.scss` using theme variables; ~44x44 px hit area with a small visual dot.
- Load the JS from `_includes/head/custom.html` with `defer` and the same `?v=` cache-bust used for `trailer.css`.
- `.gitattributes` gains an exemption so the new MP4 stays a plain Git blob.

### Premise / KISS gate

The `<video>` element already owns playback lifecycle; the simplest design lets it own the sequence too, driven by a small vanilla-JS item list. Versus a typical carousel, this removes: a library, CSS transforms/tracks, drag/touch handling, and a second DOM layer. It adds: one MP4, one small JS file, one dot row, and three data fields per item. The per-clip `href` is data on that same model, not a new abstraction. Existing machinery retained: the current whole-card anchor (a stated requirement) and the card's CSS vignette (which is why no baked grade is needed). Knowingly given up: crossfade animation between clips; preloading the inactive clip (a switch may show a brief load gap).

### Alternatives considered

1. Vendor/import Slick, Swiper, or Splide — rejected: a new dependency and payload for switching between two items; none exists in the repo or theme (YAGNI).
2. Two stacked `<video>` elements crossfading — rejected: duplicate fetching, more state and CSS, and crossfade was not requested.
3. Build-time random selection via Liquid — rejected: Liquid has no per-request random; every visitor would see the same clip, failing D1.
4. YouTube iframes for both clips — rejected: heavier and slower, losing the fast local loop D1 requires.
5. Baked `eq`/`vignette`/`fade` to match the old clip — rejected (A3): the card already provides the overlay, and re-grading risks the finished master.
6. Force 24 fps to shrink the file — rejected: drops ~20% of frames on fast motion for ~0.28 MB, and 24 fps is not a requirement (Refuted above).
7. A reversible CSS opacity fade for the swap instead of a baked fade — viable but not needed for correctness; recorded as non-blocking polish, not part of the required change.

## Required invariants

1. The homepage autoplays a muted, `playsinline` preview without a user gesture.
2. Exactly one clip is active; `ended` advances to the other and wraps.
3. The first clip is chosen randomly on each page load.
4. The dots reflect the active clip and switch clips by mouse and keyboard (real `<button>`s, ~44 px hit area).
5. The card anchor's `href`/`aria-label` always match the currently active clip's destination; dots are never nested inside the anchor.
6. No theme files are modified; styles use only `_sass/custom/` and theme variables.
7. Both MP4s are plain Git blobs (no LFS pointers), h264/yuv420p, faststart, no audio, 720-wide, each ≤3 MiB (3,145,728 bytes), and each preserves its own source frame rate: the existing clip stays 24 fps and the new clip is 30 fps.
8. No colour grade, vignette, or baked fade is applied to the world-generation master.
9. Without JavaScript the first clip still autoplays and loops, and no interactive controls render (dots hidden).
10. Never reduce a clip's frame rate for size, and do not treat a lower resolution as a quality fix.

## Implementation tasks

- [ ] Set the second item's link to `https://youtu.be/zZOI2uBskSA` and the first item's to the existing 1.0.0 trailer (D5).
- [ ] Encode the second clip (clean compression, 30 fps, no grade):
  ```bash
  ffmpeg -i "/mnt/e/Repos_Alis/promotion/tmp/resources/world_generation_raw/WorldGeneration.mp4" \
    -vf "scale=720:-2:flags=lanczos,fps=30,format=yuv420p" \
    -an -c:v libx264 -profile:v high -level 3.1 -crf 34 -preset slow -movflags +faststart \
    assets/media/alis-worldgen-loop.mp4
  ```
  Measured result: 2,493,452 bytes (2.4 MiB). Fallback ladder if the in-motion review shows artefacts on the fast flythroughs or text: (1) CRF 32 / 720 / 30 fps → 3,051,822 bytes (2.9 MiB); (2) if still unacceptable or over the ≤3 MiB budget, shorten the homepage proxy (measured example: first 45 s at CRF 34 / 720 / 30 fps → 1,676,451 bytes). Keep the full-length version on YouTube. Never reduce the frame rate, and do not treat a lower resolution as a quality fix.
- [ ] Add the plain-blob exemption to `.gitattributes` next to the existing one:
  ```gitattributes
  assets/media/alis-worldgen-loop.mp4 -filter -diff -merge -text
  ```
- [ ] Restructure `index.html`: add class `alis-trailer-video`, keep `src`/`loop` for the no-JS fallback, and add the sibling `.alis-trailer-dots` group with two `<button type="button" class="alis-trailer-dot" data-clip="0|1" aria-label="...">` elements and `hidden` on the group.
- [ ] Add `assets/js/alis-trailer.js` per [Decision](#decision): item list with `src`/`href`/`label`; `loop=false`; random start that skips a needless reload; `ended` advance; anchor `href`/`aria-label` sync; dot click; active/`aria-current` sync; unhide dots.
- [ ] Add dot styles to `_sass/custom/_trailer_custom.scss` using theme variables: `.alis-trailer-dots` `position:absolute; bottom; z-index:3; left:50%; transform:translateX(-50%)`; render only when not `hidden` (`:not([hidden]){display:flex}` or a `[hidden]{display:none}` rule); each button ≥44x44 px with a small `::before` dot; add `transition:none` for the dot under the existing `prefers-reduced-motion` block.
- [ ] Load the JS in `_includes/head/custom.html` with `defer` and `?v={{ site.time | date: '%s' }}`.
- [ ] Update root `README.md` per [Documentation plan](#documentation-plan).
- [ ] Run the verification matrix, including the in-motion CRF review, and review the final diff against this todo.

## Test-first and verification plan

### Red evidence

- **Acceptance evidence (outcome the operator asked for):** before the change, reloading `/` always shows the same single clip, there are no dot controls, and there is no advance at clip end. After: reloading several times shows both clips across loads; a dot row is present and tracks the active clip; forcing `ended` (or seeking to the end) switches to the other clip and wraps.
- **Acceptance evidence (review-driven, machine-checkable):** the built homepage video still has a real `src` and `loop` attribute (no-JS fallback); `ffprobe` reports 30 fps for the new clip; the anchor `href` equals the active item's destination after a switch.
- **Permanent regression guards:** none available — this repo has no test harness, no `package.json`, and no CI. State the limitation and rely on the runtime browser evidence plus the Jekyll build; do not add a test framework for a two-item switch.
- **Reviewer-checked judgements** (verify by inspection, not encoded as a test): watch the CRF-34 clip **in motion at full speed** and confirm the fast flythroughs and the large text overlays hold up (this is the gate the earlier revision lacked); visual consistency between clips is provided by the card overlay, not by grading; the fade-free hard cut reads acceptably; dots are legible, focused, and have ~44 px targets; no layout shift; no theme files touched; dots are outside the `<a>`.

### Green evidence

- Clip facts: `du -h assets/media/alis-trailer-loop.mp4 assets/media/alis-worldgen-loop.mp4` (each ≤3 MiB) and `ffprobe -hide_banner -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 <file>` (h264, 720-wide, no audio; existing clip 24 fps, new clip 30 fps).
- Blob policy: `git check-attr -a -- assets/media/alis-worldgen-loop.mp4` shows no `filter: lfs`; `file assets/media/alis-worldgen-loop.mp4` reports MP4 data.
- Build: `bundle exec jekyll build` succeeds; `_site/index.html` keeps `src`+`loop` on the video and contains the dots; `_site/assets/media/alis-worldgen-loop.mp4`, `_site/assets/js/alis-trailer.js`, and dot rules in `_site/assets/css/trailer.css` exist.
- Runtime smoke (WSL2 polling per project rules): `bundle exec jekyll serve --host 0.0.0.0 --force_polling`, open `/`, reload several times for the random start, drive `ended` to confirm advance + wrap, confirm the card `href` follows the active clip, click and keyboard-tab the dots, check a narrow mobile width, emulate `prefers-reduced-motion`, and disable JavaScript to confirm the first clip still autoplays and loops with no dots.
- HTML validity: confirm the dots are siblings of the `<a>`, not descendants (no nested interactive content).

## Documentation plan

- **Authoritative stable owner:** root `README.md` — add a short "Homepage preview media" section.
- **Router / TOC update:** none (no docs router exists; `/docs` is not a convention here).
- **Content to add:** the two clip files and their roles; the shared encode recipe with the "compression only, no grade, keep source frame rate" rule; the ≤3 MiB budget; 720-wide / no audio / faststart; each clip keeps its source frame rate (existing 24 fps, new 30 fps); the `.gitattributes` plain-blob requirement; the destination the card link uses for each clip.
- **Duplication avoided:** `index.html` and `alis-trailer.js` own the runtime contract; README names the files but does not restate the markup or JS. The completed `todo/done/homepage-trailer-proxy-card.md` is a historical record and is left untouched.

## Rollout and rollback

- Baseline: `HEAD` now equals `origin/main` at `61ea270`, so the earlier stale-baseline risk is gone. Before implementing, re-run `git fetch` and confirm `git status` / `git log --oneline main..origin/main` is still clean.
- Rollout: commit the new MP4, `.gitattributes`, `index.html`, JS, Sass, head include, and README; deploy as usual (GitHub Pages). Both clips must be plain blobs before the branch deploys.
- Rollback: revert the commit. The new MP4 is additive; removing it does not affect the existing `alis-trailer-loop.mp4`.

## Completion criteria

`PASS` requires: both MP4s present, ≤3 MiB, h264/720-wide/no-audio with the existing clip at 24 fps and the new clip at 30 fps; no grade or baked fade in the new clip; `alis-worldgen-loop.mp4` not LFS-tracked; `bundle exec jekyll build` clean with the expected `_site` outputs; runtime evidence of random start, `ended` advance + wrap, dot switching (mouse + keyboard), card `href` following the active clip, and the no-JS fallback still autoplaying and looping; an in-motion CRF review recorded; no theme files modified; README section added; no unrelated changes.

## Review record

### 2026-10-06 - Investigation

- **Trigger (operator):** "check existing short alis video when site openings ... we need add secondary video that will auto change slide between two videos, with bottom some dots to manually switch if needed. when site first openings by user - randomly shown one of two videos ... also need properly compress with our existing codecs like already on site video ... second raw video here E:\Repos_Alis\promotion\tmp\resources\world_generation_raw\WorldGeneration.mp4 ... goal is simple users could see any of 2 videos randomly very fast, and when ended show next video in loop. by default random video."
- D1, D2, D3 recorded; Q1-Q4 opened as non-blocking; A1-A5 recorded.
- D3 answered by evidence: Minimal Mistakes offers no slider; the lowest-moving-parts design is a single `<video>` with JS-swapped `src`.

### 2026-10-06 - Review round (PATCH) and revision

- **Trigger (operator):** "Critically evaluate the reviewer's feedback against the actual code, system architecture, and our project goals ... Update the code/docs ... If any reviewer points are incorrect, explicitly highlight and refute them."
- Reviewer verdict was `PATCH`: core architecture (one `<video>` + small vanilla JS, random first item, `ended` → next, two dots, no carousel dependency) accepted.
- D4 added; Q1 and Q3 closed by D4; A3 and A5 marked `REJECTED by evidence`; A6, A7, A8 added; Q5 opened as blocking.
- Adopted findings (evidence attached in [Verified evidence](#verified-evidence)): per-clip `href`/`aria-label`; preserve the new clip's 30 fps (24 fps drops ~410 frames for ~0.28 MB); no destructive re-grade/fades (card CSS already overlays); keep the `src` fallback and, beyond the review, keep `loop` in HTML with `loop=false` set by JS so the no-JS fallback still loops; ~44 px dot hit area.
- Refuted/qualified findings: the review asserted the existing single link was wrong while supplying a placeholder URL it did not have; the destination is not operator-confirmed and is gated as Q5 with the evidence-backed candidate. The review also did not note that keeping `loop` in HTML (not merely `src`) is what preserves the pre-existing looping fallback.
- Baseline moved during this round: `main` was fast-forwarded to `origin/main` and this todo was committed as `61ea270`, whose message claims an implementation the diff does not contain. No carousel source exists yet; the reviewer's stale-baseline gate is satisfied.

### 2026-10-06 - Operator confirmation (implementation still gated)

- **Trigger (operator):** "wait my explicit go, about clip link yes"
- D5 added; Q5 closed by D5; A7 resolved by D5.
- Interpretation: the operator confirmed the world-generation clip's destination as the evidence-backed `https://youtu.be/zZOI2uBskSA`, and explicitly withheld implementation authorization pending an explicit go. No code was changed in this round.

### 2026-10-06 - Second review round (PATCH) and revision

- **Trigger (operator):** relayed review: "Frame-rate acceptance is impossible as written ... quality fallback conflicts with its own ≤3 MB gate ... remove stale A7 wording ... Wait for explicit implementation go."
- D6 added. Both required fixes accepted; no reviewer point refuted in this round.
- Fix 1 (frame rate): the contradictory "both MP4s 30 fps" requirements are removed. Invariants 7/10, Green evidence, Documentation plan, and Completion criteria now require each clip to preserve its own source frame rate (existing 24 fps, new 30 fps) and never reduce fps for size; the existing clip is not re-encoded.
- Fix 2 (budget vs fallback): CRF 30 / 720 (3.6 MiB) is dropped as a fallback because it exceeds the budget. Measured ladder is CRF 34 / 720 / 30 fps (2.4 MiB) → CRF 32 / 720 / 30 fps (2.9 MiB) → shorten the proxy (45 s at CRF 34 = 1.6 MiB), with the full trailer staying on YouTube. The gate is stated explicitly as ≤3 MiB (`du -h`, 3,145,728 bytes), matching the prior card's convention.
- Cleanup: A7's stale "pending Q5 confirmation before deploy" clause removed; A7 remains `[RESOLVED by D5]`.
- No code changed; implementation still awaits an explicit go.
