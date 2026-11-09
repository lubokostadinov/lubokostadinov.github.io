#include "platform.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_vulkan.h>
#include <cmath>

static SDL_Window* DemoWindow;
static bool Closing;
static int Frame;
bool32 Initialize() { return SDL_Init(SDL_INIT_VIDEO) == 0; }
void Shutdown() { SDL_DestroyWindow(DemoWindow); SDL_Quit(); }
bool32 ShouldClose() { return Closing; }
bool32 CreateWindow(int16, int16, const char* name, WINDOW_STYLE_FLAGS) {
    DemoWindow = SDL_CreateWindow(name, 0, 0, 1280, 720, SDL_WINDOW_VULKAN | SDL_WINDOW_BORDERLESS);
    if (!DemoWindow) throw std::runtime_error(SDL_GetError());
    SDL_ShowCursor(SDL_DISABLE);
    return true;
}
std::vector<const char*> PlatformExtensions() {
    CreateWindow(1280, 720, "Vulkan MacOS", 0);
    unsigned count = 0;
    SDL_Vulkan_GetInstanceExtensions(DemoWindow, &count, nullptr);
    std::vector<const char*> extensions(count);
    SDL_Vulkan_GetInstanceExtensions(DemoWindow, &count, extensions.data());
    return extensions;
}
void PlatformSurface(VkInstance instance, VkSurfaceKHR* surface) {
    if (!SDL_Vulkan_CreateSurface(DemoWindow, instance, surface))
        throw std::runtime_error(SDL_GetError());
}
bool32 PollEvents() {
    SDL_Event event;
    while (SDL_PollEvent(&event)) if (event.type == SDL_QUIT) Closing = true;
    ++Frame;
    return true;
}
// Scripted keyboard/mouse input follows the original camera movement code.
int32 ProcessKey(int32 key) {
    const float seconds = Frame / 30.f;
    if (seconds > 2 && seconds < 11 && key == KeyW) return 1;
    if (seconds > 6 && seconds < 6.5f && key == KeyD) return 1;
    if (seconds > 22 && seconds < 29 && key == KeyW) return 1;
    return -1;
}
void ProcessMouseMove(float* x, float* y) {
    const float seconds = Frame / 30.f;
    *x = (seconds > 11 && seconds < 21) ? 6.f : 0.f;
    *y = (seconds > 13 && seconds < 17) ? -1.f : 0.f;
    if (seconds > 21 && seconds < 25) *y = 1.f;
}
