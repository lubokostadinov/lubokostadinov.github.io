#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.work/handmade_vulkan/bin-linux"
export VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/lvp_icd.x86_64.json
export SDL_VIDEODRIVER=x11
export LP_NUM_THREADS=4
xvfb-run -a -s '-screen 0 1280x720x24' ./app
ffmpeg -y -f rawvideo -pixel_format rgb24 -video_size 1280x720 -framerate 30 -i capture.rgb -c:v libx264 -crf 20 -pix_fmt yuv420p -movflags +faststart ../../../public/videos/handmade-vulkan.mp4
ffmpeg -v error -y -i ../../../public/videos/handmade-vulkan.mp4 -vframes 1 ../../../src/assets/png/handmade-vulkan.jpg
