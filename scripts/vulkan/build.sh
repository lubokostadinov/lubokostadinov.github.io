#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.work/handmade_vulkan"
mkdir -p bin-linux
glslangValidator -V shaders/vertex_shader.vert -o shaders/vertex_default_shader.spv
glslangValidator -V shaders/fragment_shader.frag -o shaders/fragment_default_shader.spv
g++ -std=c++17 -O2 -shared -fPIC game/game.cpp -o bin-linux/libgame.dylib
g++ -std=c++17 -O2 -IEngine -Ilibs Engine/main.cpp Engine/platform_linux.cpp -o bin-linux/app -lvulkan -lSDL2 -lX11 -ldl
