# site
This is the official site of the FallIntoDusk / Alis project

## Homepage preview media

The homepage trailer card serves two small muted H.264 preview clips from `assets/media/`:

- `alis-trailer-loop.mp4` — ALIS 1.0.0 trailer loop, 24 fps.
- `alis-worldgen-loop.mp4` — world-generation ("Build the Game") loop, 30 fps.

`assets/js/alis-trailer.js` owns the clip list and each clip's full-video link;
`index.html` keeps the first clip as a real `<video src>` so the preview works
without JavaScript. The card plays one clip at random, advances to the other when
a clip ends, and offers dot controls to switch manually.

Encoding rules for new or re-encoded previews:

- `libx264`, yuv420p, no audio, faststart, 720 px wide, `-preset slow`.
- Preserve the source frame rate; never reduce it to save size.
- Compression only — no colour grade, vignette, or baked fade.
- Exact file length must be ≤3,145,728 bytes; check with `stat -c %s`. `du -h`
  is informational only.

`alis-trailer-loop.mp4` is a 24 fps graded encode retained unchanged and does not
follow the compression-only rule; `alis-worldgen-loop.mp4` does.

`assets/media/alis-worldgen-loop.mp4` is exempted from the repository's `*.mp4`
Git LFS rule in `.gitattributes` because GitHub Pages branch deploys serve these
previews as plain blobs.

Example for the world-generation clip:

```bash
ffmpeg -i WorldGeneration.mp4 \
  -vf "scale=720:-2:flags=lanczos,fps=30,format=yuv420p" \
  -an -c:v libx264 -profile:v high -level 3.1 -crf 34 -preset slow -movflags +faststart \
  assets/media/alis-worldgen-loop.mp4
```

## GitHub README previews

The ALIS repository README shows the same two clips as animated images, because
GitHub removes `<video>` from rendered Markdown. `assets/media/` holds one AVIF
image sequence per loop, generated from that loop and never edited by hand:

- `alis-trailer-loop.avif` — from `alis-trailer-loop.mp4`.
- `alis-worldgen-loop.avif` — from `alis-worldgen-loop.mp4`.

Regenerate a file whenever its loop changes:

- `libsvtav1`, yuv420p, no audio, infinite loop, 480 px wide, `-preset 4`.
- The whole clip at the source frame rate. The trailer skips its first 0.5 s so
  the image does not open on a black frame.
- Exact file length must be ≤3,145,728 bytes; raise `-crf` to shrink a file.
  GitHub's image proxy rejects images above roughly 5 MB.
- `*.avif` stays a plain Git blob in `.gitattributes`, as GitHub Pages requires.

```bash
ffmpeg -ss 0.5 -i assets/media/alis-trailer-loop.mp4 \
  -vf "scale=480:-2:flags=lanczos" \
  -an -c:v libsvtav1 -crf 36 -preset 4 -pix_fmt yuv420p -loop 0 \
  assets/media/alis-trailer-loop.avif

ffmpeg -i assets/media/alis-worldgen-loop.mp4 \
  -vf "scale=480:-2:flags=lanczos" \
  -an -c:v libsvtav1 -crf 40 -preset 4 -pix_fmt yuv420p -loop 0 \
  assets/media/alis-worldgen-loop.avif
```
