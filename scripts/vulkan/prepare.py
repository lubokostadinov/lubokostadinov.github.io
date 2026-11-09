"""Apply the Linux recording adapter to a fresh handmade_vulkan checkout."""
from pathlib import Path
import shutil
import subprocess
import sys

root = Path(sys.argv[1]).resolve()
def change(name, old, new):
    path = root / name
    text = path.read_text()
    if old not in text:
        raise RuntimeError(f"Expected source not found in {name}: {old[:70]}")
    path.write_text(text.replace(old, new))

change('Engine/platform.h', '#include <QuartzCore/QuartzCore.h>', '#include <stdexcept>')
change('Engine/platform.h', '#include <vulkan/vulkan_metal.h>', '')
change('Engine/platform.h', 'CAMetalLayer* GetInternalStateMetalLayer();',
       'std::vector<const char*> PlatformExtensions();\nvoid PlatformSurface(VkInstance, VkSurfaceKHR*);')
change('Engine/render_backend.h', '#include <CoreVideo/CoreVideo.h>', '')
change('Engine/render_backend.cpp', 'RenderBackend.EnableValidationLayers = true;', 'RenderBackend.EnableValidationLayers = false;')
change('Engine/render_backend.cpp', 'InstanceCreateInfo.flags = VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR;', 'InstanceCreateInfo.flags = 0;')
change('Engine/render_backend.cpp', '''std::vector<const char*> Extensions;
    Extensions.push_back("VK_KHR_surface");
    Extensions.push_back("VK_EXT_metal_surface");
    Extensions.push_back("VK_KHR_portability_enumeration");''',
       'std::vector<const char*> Extensions = PlatformExtensions();')
path = root / 'Engine/render_backend.cpp'
text = path.read_text()
start = text.index('    CreateWindow(640,')
end = text.index('    //////////////////////////////////////////////////////////////////////////////////////////', start)
text = text[:start] + '    PlatformSurface(RenderBackend.Instance, &RenderBackend.Surface);\n\n' + text[end:]
text = text.replace('if (CreateDebugUtilsMessengerEXT != nullptr)', 'if (RenderBackend.EnableValidationLayers && CreateDebugUtilsMessengerEXT != nullptr)')
text = text.replace('RenderBackend.Camera->Position = glm::vec3(0.0f, 0.0f, 0.0f);', 'RenderBackend.Camera->Position = glm::vec3(-160.0f, 25.0f, -10.0f);')
text = text.replace('RenderBackend.Camera->Yaw = -90.0f;', 'RenderBackend.Camera->Yaw = 0.0f;')
text = text.replace('TextureSamplerInfo.maxAnisotropy = DeviceProperties.limits.maxSamplerAnisotropy;', 'TextureSamplerInfo.maxAnisotropy = 1.0f; // Software capture: avoid expensive anisotropic filtering')
path.write_text(text)
change('Engine/main.cpp', 'RenderBackend.DeltaTime = (float)DeltaTime;',
       'RenderBackend.DeltaTime = 1.0f / 30.0f; // Deterministic recording time step')
change('Engine/main.cpp', '    while (!ShouldClose())', '    int CaptureFrame = 0;\n    while (!ShouldClose() && CaptureFrame < 960)')
change('Engine/main.cpp', '        Render(&GameMemory);', '''        Render(&GameMemory);
        // Capture the actual presented X11 window, including software Vulkan output.
        vkDeviceWaitIdle(RenderBackend.Device);
        CapturePresentedFrame(CaptureFrame++);''')
change('Engine/main.cpp', '#include <time.h>', '#include <time.h>\n#include "capture_linux.h"')
shutil.copyfile(Path(__file__).with_name('platform_linux.cpp'), root / 'Engine/platform_linux.cpp')
shutil.copyfile(Path(__file__).with_name('capture_linux.h'), root / 'Engine/capture_linux.h')
subprocess.run([sys.executable, str(Path(__file__).with_name('lighting.py')), str(root)], check=True)
