# Homepage Trailer Proxy Card

Status: DONE

Goal: add a muted compressed MP4 cinematic motion band on the homepage after
the page title and before `Recent posts`. The whole band opens the full YouTube
trailer:
https://www.youtube.com/watch?v=eIJHYsPgNnM

Selected repo assets:

- `assets/media/alis-trailer-loop.mp4` uses the no-inventory baseline:
  `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-no-inventory.mp4`
- Do not add a trailer poster for now.
- Do not add a visible play button or "Watch trailer" label; the whole video
  card opens YouTube in a new tab.
- Do not modify `assets/images/teaser.jpg`; it is used by another site surface
  and is not part of this trailer card.

Implementation checklist:

- Do not use fullscreen video, animated GIF, a full trailer file, or an initial
  homepage YouTube iframe.
- Do not autoplay a full 60 second local trailer. If a local full-length video
  is ever needed, use click-to-play with `controls preload="none"`. Prefer
  YouTube for the full trailer.
- Host only a compact muted loop preview locally; keep the full trailer on
  YouTube.
- Add assets:
  - `assets/media/alis-trailer-loop.mp4`
- Target preview assets:
  - `alis-trailer-loop.mp4` target 2-3 MB max
  - duration may use the 41 second cleaned motion-card cut if compression holds
    up visually; otherwise fall back to a 12-18 second cut
  - audio removed
  - H.264 MP4, 24 fps, 640-720 px wide
  - 16:9 preview framing if possible, ideally 720x405 rather than 4:3
- Keep the video technically simple. Use shot choice and CSS overlay for style:
  slow atmospheric fragment, clean crop/scale, subtle dark grade, soft vignette,
  fade-in/fade-out to dark, no burned-in play button. Avoid heavy grain, noise,
  glitch, fast cuts, dialogue, UI interaction, sharp explosions, or anything
  where restart is obvious.
- Preferred grade: the simple baseline encode. Keep the footage readable and
  natural: slight darkening, mild contrast, mild desaturation, vignette, and
  fade-to-dark only. Do not use the tested ember, glow, ash, cold-abandoned,
  damaged-archive, scratch, or heavy-grain variants for the homepage card.
- Do not bake or overlay a play button. Keep the video card visually clean and
  use the anchor `aria-label` for accessibility.
- Ensure `assets/media/alis-trailer-loop.mp4` is committed as a plain Git blob,
  not Git LFS. GitHub Pages branch deploy will not materialize LFS objects.
  This repo has a generic `*.mp4 filter=lfs` rule, so add a later exemption
  for this served preview file.
- Insert straight HTML in the homepage after the page title and before posts,
  using `autoplay muted loop playsinline preload="metadata"` and one H.264 MP4
  source. Do not include a `poster` attribute.
- Move the homepage intro copy into a small translucent overlay on the video
  band instead of keeping it as a separate paragraph above the video.
- Add a `prefers-reduced-motion: reduce` fallback that disables decorative hover
  scaling without hiding the video while no separate poster exists.
- Add styles only through the project custom Sass path. Do not modify theme
  files. Use Minimal Mistakes theme variables instead of hardcoded colors.
- Prevent layout shift in the trailer card with CSS `aspect-ratio: 16 / 9` and
  `object-fit: cover`.
- Break the trailer band out of the narrow archive text column using responsive
  CSS. Keep the video at the source-friendly 16:9 ratio to avoid cropping.
- Do not hide the video for `prefers-reduced-motion` unless a separate poster
  asset is added; with no poster and no button, hiding the video leaves an empty
  clickable area.
- After SCSS/include changes, verify built output. On WSL2 use:
  `bundle exec jekyll serve --host 0.0.0.0 --force_polling`

Required `.gitattributes` exemption after the generic video LFS rules:

```gitattributes
# Small served homepage preview: must be a plain Git blob for GitHub Pages.
assets/media/alis-trailer-loop.mp4 -filter -diff -merge -text
```

Git LFS verification:

```bash
git check-attr -a -- assets/media/alis-trailer-loop.mp4
git lfs ls-files | grep -F alis-trailer-loop.mp4 || true
git cat-file -p :assets/media/alis-trailer-loop.mp4 | head
```

Expected result: no `filter=lfs`, no `git lfs ls-files` match, and binary MP4
bytes instead of a `version https://git-lfs.github.com/spec/v1` pointer.

Reference links:

- Current homepage: https://fall.is/
- Web video performance:
  https://web.dev/learn/performance/video-performance
- Cloudflare video delivery policy:
  https://developers.cloudflare.com/fundamentals/reference/policies-compliances/delivering-videos-with-cloudflare/
- Replace GIFs with video:
  https://web.dev/articles/replace-gifs-with-videos
- Cloudflare default cache behavior:
  https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
- MDN `<video>` reference:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video
- Lazy loading video:
  https://web.dev/articles/lazy-loading-video
- Minimal Mistakes video support:
  https://mmistakes.github.io/minimal-mistakes/layout/uncategorized/layout-header-video/

Current working source:

```text
C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-clips-merged-no-inventory-temp.mp4
```

Cut history:

- Initial merged source used:
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-clips-merged-temp.mp4`
  - `00:05.005-00:11.857`
  - `00:17.861-00:53.486`
- Removed inventory segment from merged source:
  - `00:06.741-00:08.058`

Known compression tests:

- original merged source `720x406`, 24 fps, no audio, CRF 34: `2.3 MB`,
  `42.459s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-42s-720-crf34-original-comparison.mp4`
- no-inventory `720x406`, 24 fps, no audio, CRF 34: `2.2 MB`, `41.167s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-no-inventory.mp4`
- no-inventory conservative desaturation, saturation `0.78`, `720x406`,
  24 fps, no audio, CRF 34: `2.2 MB`, `41.167s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-desat78-no-inventory.mp4`
- no-inventory stronger desaturation, saturation `0.68`, `720x406`, 24 fps,
  no audio, CRF 34: `2.2 MB`, `41.167s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-desat68-no-inventory.mp4`
- no-inventory monochrome, saturation `0`, `720x406`, 24 fps, no audio,
  CRF 34: `2.1 MB`, `41.167s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-mono-no-inventory.mp4`
- no-inventory contrast monochrome, saturation `0`, `720x406`, 24 fps,
  no audio, CRF 34: `2.2 MB`, `41.167s`
  - `C:\Users\vslvg\OneDrive\Desktop\Temp\teaser-homepage-41s-720-crf34-mono-contrast-no-inventory.mp4`
- rejected experiments were too stylized for the site: ash, ember, ember bloom,
  cold abandoned, damaged archive, bleak survival, and strong damaged archive.

Recommendation: ship the no-inventory baseline unless the original merged
comparison, a conservative desaturation variant, or the contrast monochrome
variant is explicitly preferred after review.

Suggested 41 second no-inventory baseline encode:

```bash
mkdir -p assets/media

ffmpeg -i /mnt/c/Users/vslvg/OneDrive/Desktop/Temp/teaser-clips-merged-no-inventory-temp.mp4 \
  -vf "scale=720:-2:flags=lanczos,fps=24,eq=brightness=-0.04:contrast=1.08:saturation=0.92,vignette=PI/5,fade=t=in:st=0:d=0.5,fade=t=out:st=40.3:d=0.8,format=yuv420p" \
  -an \
  -c:v libx264 -profile:v high -level 3.1 \
  -crf 34 -preset slow -movflags +faststart \
  assets/media/alis-trailer-loop.mp4
```

For conservative desaturation comparison, use the same command with
`saturation=0.78` or `saturation=0.68`.

For monochrome comparison, use `saturation=0`. For contrast monochrome, use:

```bash
ffmpeg -i /mnt/c/Users/vslvg/OneDrive/Desktop/Temp/teaser-clips-merged-no-inventory-temp.mp4 \
  -vf "scale=720:-2:flags=lanczos,fps=24,eq=brightness=-0.055:contrast=1.18:saturation=0:gamma=0.96,vignette=PI/4.8,fade=t=in:st=0:d=0.5,fade=t=out:st=40.3:d=0.8,format=yuv420p" \
  -an \
  -c:v libx264 -profile:v high -level 3.1 \
  -crf 34 -preset slow -movflags +faststart \
  assets/media/alis-trailer-loop.mp4
```

Check size:

```bash
du -h assets/media/alis-trailer-loop.mp4
ffprobe -hide_banner assets/media/alis-trailer-loop.mp4
```

Hard size limits:

- `<= 3 MB`: good, ship.
- `3-5 MB`: acceptable only if it looks much better.
- `> 5 MB`: too heavy for homepage; reduce to 640 px wide or shorter cut.
