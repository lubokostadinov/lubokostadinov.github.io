# Handmade Vulkan portfolio recording

The portfolio video is a capture of the original Vulkan renderer and Sponza
assets from https://github.com/lubokostadinov/handmade_vulkan at commit
`aa8e44f8218966a076de0e08fc226e78673c6c6a`.

It was built and recorded in Ubuntu 22.04 under WSL2 using Mesa lavapipe
(software Vulkan) and an Xvfb display. This is a Linux recording port of the
macOS project, not footage from macOS or a GPU performance benchmark.

## Reproduce

Install `g++ libvulkan-dev mesa-vulkan-drivers libsdl2-dev xvfb glslang-tools
ffmpeg python3` in Ubuntu. From the portfolio root, clone a fresh checkout:

```sh
git clone https://github.com/lubokostadinov/handmade_vulkan.git .work/handmade_vulkan
git -C .work/handmade_vulkan checkout aa8e44f8218966a076de0e08fc226e78673c6c6a
python3 scripts/vulkan/prepare.py .work/handmade_vulkan
bash scripts/vulkan/build.sh
mkdir -p public/videos
bash scripts/vulkan/record.sh
```

Run `prepare.py` once against a fresh checkout; it fails if the expected original
source is absent. The scripts operate on the ignored `.work` copy and do not
push changes to the original repository.

## Capture adaptations

- SDL2 replaces Cocoa/Metal window and Vulkan surface creation; Apple framework
  headers and portability extensions are removed for the Linux build.
- The original C++ renderer, geometry, textures, GLSL lighting, and camera
  movement code are retained. GLSL is compiled to SPIR-V in the VM.
- The starting camera is placed in the Sponza corridor. Scripted key and mouse
  input walks forward, strafes, turns, and looks up using the original controls.
- Simulation advances at a fixed 1/30 second per rendered frame. Each presented
  frame is captured from X11 and encoded into a 32-second, 1280x720, 30 fps H.264
  MP4. Offline capture avoids stutter caused by software-rendering delays.
- Texture anisotropy is limited to 1 for software rendering; validation layers
  are disabled. Mesa uses four rendering threads.
- The raw RGB capture is about 2.7 GB and remains in the ignored working folder.
  The portfolio uses only the compressed MP4 and a captured JPEG thumbnail.

The scene includes the original test cube and lantern shader. The Sponza model
is a sample scene bundled by the source repository; the portfolio describes the
engine work rather than claiming authorship of the scene artwork.
