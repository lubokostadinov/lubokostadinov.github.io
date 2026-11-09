// import opengl from '../assets/svg/projects/opengl.svg';
// import descent from '../assets/svg/projects/descent.svg';
// import gameEngine from '../assets/svg/projects/game-engine.svg';
// import rayTrace from '../assets/svg/projects/raytrace.svg';
// import empires from '../assets/svg/projects/empires.svg';
// import rouglike from '../assets/svg/projects/rougelike.svg';

import image1 from '../assets/png/scrn0000.png';
import image2 from '../assets/png/Engine2.png';
import image3 from '../assets/png/setsuko.png';
import image4 from '../assets/png/Screenshot (61).png';
import image5 from '../assets/png/result.png';
import image6 from '../assets/png/empires.png';
import nullRhythm from '../assets/png/null-rhythm.png';
import npLib from '../assets/png/np-lib.png';
import handmadeVulkan from '../assets/png/handmade-vulkan.jpg';

//import snack from '../assets/svg/projects/snack.svg';

// import whisp from '../assets/svg/projects/whisp.svg';
// import motoretta from '../assets/svg/projects/motoretta.svg';
// import aakasha from '../assets/svg/projects/aakasha.svg';
// import artGallery from '../assets/svg/projects/artGallery.svg';
// import hearteum from '../assets/svg/projects/hearteum.svg';
// import plygear from '../assets/svg/projects/plygear.svg';
// import michael from '../assets/svg/projects/michael.svg';

export const projectsData = [
  {
    id: 7,
    projectName: 'Null Rhythm',
    projectDesc:
      'An audio plugin for rhythmic tremolo and vibrato, developed in C++ with JUCE. Null Rhythm combines Classic, Euclidean, and Generative patterns with full-band or multiband processing, tempo-synced modulation, and controls for evolving rhythmic movement.',
    tags: ['C++', 'JUCE', 'Audio DSP'],
    code: 'https://github.com/lubokostadinov/null_point_audio',
    demo: 'https://youtu.be/nQvzma4iZYc',
    image: nullRhythm,
  },
  {
    id: 8,
    projectName: 'np_lib',
    projectDesc:
      'A C++ library and JUCE wrapper for developing audio plugins, with reusable DSP, parameter, and UI components. Its demo project is a wavetable synthesizer with two oscillators, filtering, envelopes, and LFO modulation. A built-in UI editor mode supports editing layouts and saving them as JSON.',
    tags: ['C++', 'JUCE', 'UI Editor'],
    code: 'https://github.com/lubokostadinov/np_lib',
    demo: '',
    image: npLib,
  },
  {
    id: 9,
    projectName: 'Vulkan MacOS',
    projectDesc:
      'A Vulkan graphics engine developed in C++ using MoltenVK for macOS. The engine features glTF model loading with textures, point lights, and post-processing for a torch light flicker effect.',
    tags: ['C++', 'Vulkan', 'MoltenVK'],
    code: 'https://github.com/lubokostadinov/handmade_vulkan',
    demo: `${process.env.PUBLIC_URL}/videos/handmade-vulkan.mp4?v=brighter-torch`,
    image: handmadeVulkan,
  },
  {
    id: 1,
    projectName: 'Descent Raytraced',
    projectDesc:
      'During my third year at university, I worked on Descent Raytraced with six other programmers. The goal of the project was to replace the graphics of the old game Descent with modern GPU ray tracing. For this project, we used the DirectX Raytracing API. I worked primarily on developing the renderer and implementing the path-traced global illumination, the physically-based rendering, and importance sampling.',
    tags: ['C/C++', 'HLSL', 'DirectX 12'],
    code: 'https://github.com/BredaUniversityGames/DXX-Raytracer',
    demo: 'https://youtu.be/wCGnQoakOWc',
    image: image1,
  },
  {
    id: 2,
    projectName: 'Game Engine',
    projectDesc:
      'During my second year at university, with 3 other programmers, we developed a cross-platform game engine for Windows and PlayStation 4 using C++, DirectX 12 for Windows graphics, and GNMX for PlayStation 4 graphics. The engine runs a demo game on both Windows and PlayStation 4. I worked on implementing the Windows renderer. The engine includes model loading, textures, directional lights, and a post-processing pipeline.',
    tags: ['C++', 'DirectX 12', 'PlayStation 4'],
    code: '',
    demo: 'https://www.youtube.com/watch?v=mJh2_gTsIok&feature=youtu.be',
    image: image2,
  },

  {
    id: 3,
    projectName: 'Rougelike Game',
    projectDesc:
      'During the second year at university, I collaborated with other programmers, artists, and designers to create a game using a custom game engine built in C++ and DirectX 12. The game runs on both Windows and PlayStation 4. For this project, I focused primarily on implementing the functionality of UI elements and developing a UI editor to allow designers to create menus.',
    tags: ['C++', 'DirectX 12', 'PlayStation 4'],
    code: '',
    demo: 'https://youtu.be/xErvTAX_Lc8',
    image: image3,
  },
  {
    id: 4,
    projectName: '3D OpenGL',
    projectDesc:
      'Side project to explore the OpenGL API. The project contains model loading in OBJ format, materials with multiple textures, instanced rendering, point lights, and post-processing shaders.',
    tags: ['C++', 'OpenGL'],
    code: 'https://github.com/lubokostadinov/3DopenGL.git',
    demo: 'https://youtu.be/DDv-jmcb5X4',
    image: image4,
  },
  {
    id: 5,
    projectName: 'Simple Ray Tracer',
    projectDesc:
      'This project is a C++ program that generates a ray traced image with a plane and spheres using diffuse shading and reflection. It uses my own math library and SFML. I implemented unit tests for vector operations to ensure accuracy.',
    tags: ['C++'],
    code: 'https://github.com/lubokostadinov/RayTracer-Project',
    demo: 'https://github.com/lubokostadinov/RayTracer-Project',
    image: image5,
  },
  {
    id: 6,
    projectName: 'Empires',
    projectDesc:
      'During my first year at university, I collaborated with another programmer to create a game on Raspberry Pi, using C++, OpenGL ES 3, and ImGui. The game generates a galaxy and assigns each player a home planet. The objective is to gather resources, craft spaceships, and conquer enemy planets. I worked on implementing the renderer, which includes loading 3D models (OBJ format), instanced rendering, and post-processing effects.',
    tags: ['C++', 'OpenGL', 'ImGui'],
    code: '',
    demo: 'https://youtu.be/T96Bzpo98Is',
    image: image6,
  },

];

/*
    Do not remove any fields.
    Leave it blank instead as shown below
*/
/* 
{
    id: 1,
    projectName: 'Car Pooling System',
    projectDesc: '',
    tags: ['Flutter', 'React'],
    code: '',
    demo: '',
    image: ''
}, 
*/
