'use strict';
require.d(exports, 'a', function () {
  return ShaderLib;
});
var __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__ = require('./43');
var __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__ = require('./32');
var __WEBPACK_IMPORTED_MODULE_2__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__ = require('./44');
var __WEBPACK_IMPORTED_MODULE_4__math_Color_js__ = require('./7');
var ShaderLib = {
  basic: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].specularmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].envmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].aomap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lightmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshbasic_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshbasic_frag
  },
  lambert: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].specularmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].envmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].aomap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lightmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].emissivemap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lights,
      { emissive: { value: new __WEBPACK_IMPORTED_MODULE_4__math_Color_js__['a'](0) } }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshlambert_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshlambert_frag
  },
  phong: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].specularmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].envmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].aomap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lightmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].emissivemap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].bumpmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].normalmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].displacementmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].gradientmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lights,
      {
        emissive: { value: new __WEBPACK_IMPORTED_MODULE_4__math_Color_js__['a'](0) },
        specular: { value: new __WEBPACK_IMPORTED_MODULE_4__math_Color_js__['a'](1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphong_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphong_frag
  },
  standard: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].envmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].aomap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lightmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].emissivemap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].bumpmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].normalmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].displacementmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].roughnessmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].metalnessmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lights,
      {
        emissive: { value: new __WEBPACK_IMPORTED_MODULE_4__math_Color_js__['a'](0) },
        roughness: { value: 0.5 },
        metalness: { value: 0.5 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphysical_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphysical_frag
  },
  points: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].points,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].points_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].points_frag
  },
  dashed: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].linedashed_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].linedashed_frag
  },
  depth: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].displacementmap
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].depth_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].depth_frag
  },
  normal: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].bumpmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].normalmap,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].normal_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].normal_frag
  },
  sprite: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].sprite,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].sprite_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].sprite_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].cube_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].equirect_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].equirect_frag
  },
  distanceRGBA: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].common,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].displacementmap,
      {
        referencePosition: { value: new __WEBPACK_IMPORTED_MODULE_2__math_Vector3_js__['a']() },
        nearDistance: { value: 1 },
        farDistance: { value: 1000 }
      }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].distanceRGBA_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].distanceRGBA_frag
  },
  shadow: {
    uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].lights,
      __WEBPACK_IMPORTED_MODULE_3__UniformsLib_js__['a'].fog,
      {
        color: { value: new __WEBPACK_IMPORTED_MODULE_4__math_Color_js__['a'](0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].shadow_vert,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].shadow_frag
  }
};
ShaderLib.physical = {
  uniforms: __WEBPACK_IMPORTED_MODULE_1__UniformsUtils_js__['a'].merge([
    ShaderLib.standard.uniforms,
    {
      clearCoat: { value: 0 },
      clearCoatRoughness: { value: 0 }
    }
  ]),
  vertexShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphysical_vert,
  fragmentShader: __WEBPACK_IMPORTED_MODULE_0__ShaderChunk_js__['a'].meshphysical_frag
};