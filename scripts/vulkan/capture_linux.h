#include <X11/Xlib.h>
#include <X11/Xutil.h>
#undef CurrentTime
#include <vector>

// Frame-by-frame capture avoids uneven video timing on a software-rendered VM.
void CapturePresentedFrame(int frame) {
    static Display* display = XOpenDisplay(nullptr);
    static FILE* output = fopen("capture.rgb", "wb");
    if (!display || !output) throw std::runtime_error("Cannot open capture output/display");
    XSync(display, False);
    XImage* image = XGetImage(display, DefaultRootWindow(display), 0, 0, 1280, 720, AllPlanes, ZPixmap);
    if (!image) throw std::runtime_error("Cannot capture Vulkan window");
    std::vector<unsigned char> pixels(1280 * 720 * 3);
    for (int y = 0; y < 720; ++y) for (int x = 0; x < 1280; ++x) {
        unsigned long p = XGetPixel(image, x, y);
        const int i = (y * 1280 + x) * 3;
        pixels[i] = (p >> 16) & 255;
        pixels[i+1] = (p >> 8) & 255;
        pixels[i+2] = p & 255;
    }
    fwrite(pixels.data(), 1, pixels.size(), output);
    fflush(output);
    XDestroyImage(image);
    if (frame % 90 == 0) { printf("Captured frame %d\n", frame); fflush(stdout); }
}
