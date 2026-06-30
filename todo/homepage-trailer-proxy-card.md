# Homepage Trailer Proxy Card

Status: TODO

Goal: add a small muted MP4 trailer preview card on the homepage between the
intro paragraph and `Recent posts`. The card opens the full YouTube trailer:
https://www.youtube.com/watch?v=eIJHYsPgNnM

Implementation checklist:

- Do not use fullscreen video, animated GIF, a full trailer file, or an initial
  homepage YouTube iframe.
- Host only a tiny muted loop preview locally; keep the full trailer on YouTube.
- Add assets:
  - `assets/images/teaser.jpg`
  - `assets/media/alis-trailer-loop.mp4`
- Target preview assets:
  - `teaser.jpg` under 200 KB
  - `alis-trailer-loop.mp4` under 1-1.5 MB
  - duration 4-6 seconds
  - audio removed
  - width 720 px
  - 16:9 preview framing if possible, ideally 720x405 rather than 4:3
- Ensure `assets/media/alis-trailer-loop.mp4` is committed as a plain Git blob,
  not Git LFS. GitHub Pages branch deploy will not materialize LFS objects.
  This repo has a generic `*.mp4 filter=lfs` rule, so add a later exemption
  for this served preview file.
- Insert straight HTML in the homepage after the intro paragraph and before
  posts, using `autoplay muted loop playsinline preload="metadata"`, a poster
  image, and one H.264 MP4 source.
- Add a `prefers-reduced-motion: reduce` fallback that hides the video and
  shows the poster image as the clickable card background.
- Add styles only through the project custom Sass path. Do not modify theme
  files. Use Minimal Mistakes theme variables instead of hardcoded colors.
- Prevent layout shift in the trailer card with CSS `aspect-ratio: 16 / 9` and
  `object-fit: cover`.
- After SCSS/include changes, verify built output. On WSL2 use:
  `bundle exec jekyll serve --host 0.0.0.0 --force_polling`

Required `.gitattributes` exemption after the generic video LFS rules:

```gitattributes
# Tiny served homepage preview: must be a plain Git blob for GitHub Pages.
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
- Minimal Mistakes video support:
  https://mmistakes.github.io/minimal-mistakes/layout/uncategorized/layout-header-video/

Suggested preview encode:

```bash
mkdir -p assets/media

ffmpeg -ss 00:00:05 -t 6 -i trailer.mp4 \
  -vf "scale=720:-2,fps=24" \
  -an -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart \
  assets/media/alis-trailer-loop.mp4
```
