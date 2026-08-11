#!/usr/bin/env bash
# Regenerates thumbnails, previews and the download bundle for the Social Outreach Kit.
# Drop new full-res originals (.png / .jpg / .pdf) into this folder, add a matching
# entry to the `assetGroups` manifest in src/pages/v3/social-outreach-kit.astro,
# then run:  bash public/social-kit/build.sh
#
# Requires: imagemagick (magick), poppler (pdftoppm), zip.
set -euo pipefail
cd "$(dirname "$0")"

mkdir -p thumb preview
originals=()

for f in *.png *.jpg *.jpeg; do
  [ -e "$f" ] || continue
  slug="${f%.*}"
  magick "$f" -resize 720x720  -quality 82 "thumb/$slug.webp"
  magick "$f" -resize 1600x1600 -quality 86 "preview/$slug.webp"
  originals+=("$f")
  echo "img  $f"
done

for f in *.pdf; do
  [ -e "$f" ] || continue
  slug="${f%.*}"
  pdftoppm -r 200 -png -singlefile "$f" "/tmp/$slug"
  magick "/tmp/$slug.png" -resize 720x  -quality 82 "thumb/$slug.webp"
  magick "/tmp/$slug.png" -resize 1600x -quality 88 "preview/$slug.webp"
  originals+=("$f")
  echo "pdf  $f"
done

rm -f api-partner-social-kit.zip
zip -j -q api-partner-social-kit.zip "${originals[@]}"
echo "zip  api-partner-social-kit.zip ($(du -h api-partner-social-kit.zip | cut -f1))"
