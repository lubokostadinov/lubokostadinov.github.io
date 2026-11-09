"""Apply the brighter camera-mounted torch used in the portfolio recording."""
from pathlib import Path
import sys

root = Path(sys.argv[1]).resolve()

def replace_once(path, original, replacement):
    text = path.read_text()
    if replacement in text:
        return
    if original not in text:
        raise RuntimeError(f"Expected lighting code not found in {path}")
    path.write_text(text.replace(original, replacement))

renderer = root / 'Engine/render_backend.cpp'
replace_once(renderer, '''glm::vec3 LanternPos = Camera->Position
                         + Camera->Front * 0.5f
                         - Camera->Up    * 0.4f
                         + Camera->Right * 0.2f;''',
             'glm::vec3 LanternPos = Camera->Position;')
replace_once(renderer, '//NOTE(Lyubomir): Lantern - held slightly in front, below, and to the right of the camera',
             '// Portfolio torch: point light follows the camera position exactly.')
replace_once(renderer, 'glm::vec4(1.0f, 0.6f, 0.15f, 8.0f)',
             'glm::vec4(1.0f, 0.6f, 0.15f, 48.0f)')

shader = root / 'shaders/fragment_shader.frag'
replace_once(shader, 'Dist * Dist * 0.04', 'Dist * Dist * 0.004')
replace_once(shader, 'OutColor = vec4(Ambient + Diffuse + Specular, 1.0);',
             '''// Reinhard tone mapping preserves texture detail near the brighter torch.
    vec3 LitColor = Ambient + Diffuse + Specular;
    OutColor = vec4(LitColor / (vec3(1.0) + LitColor), 1.0);''')
