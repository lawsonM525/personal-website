#!/usr/bin/env bash

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required to generate the OpenAI video posters."
  exit 1
fi

video_directory="public/begin/reels"
poster_directory="$video_directory/posters"

mkdir -p "$poster_directory"

for video_path in "$video_directory"/*.mp4; do
  video_filename=$(basename "$video_path")
  video_name="${video_filename%.*}"
  poster_path="$poster_directory/$video_name.jpg"
  poster_time="0"

  if [[ "$video_name" == "how-to-vibe-code-properly" ]]; then
    poster_time="1"
  fi

  ffmpeg \
    -loglevel error \
    -y \
    -ss "$poster_time" \
    -i "$video_path" \
    -frames:v 1 \
    -vf "scale=720:-2:force_original_aspect_ratio=decrease" \
    -q:v 3 \
    "$poster_path"

  echo "Generated $poster_path from 0:0$poster_time"
done
