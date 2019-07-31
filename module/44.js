'use strict';
require.d(exports, 'a', function () {
  return UniformsLib;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Color_js__ = require('./7');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__ = require('./9');
var UniformsLib = {
  common: {
    diffuse: { value: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](15658734) },
    opacity: { value: 1 },
    map: { value: null },
    uvTransform: { value: new __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__['a']() },
    alphaMap: { value: null }
  },
  specularmap: { specularMap: { value: null } },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    refractionRatio: { value: 0.98 },
    maxMipLevel: { value: 0 }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 }
  },
  emissivemap: { emissiveMap: { value: null } },
  bumpmap: {
    bumpMap: { value: null },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalScale: { value: new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a'](1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  roughnessmap: { roughnessMap: { value: null } },
  metalnessmap: { metalnessMap: { value: null } },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 0.00025 },
    fogNear: { value: 1 },
    fogFar: { value: 2000 },
    fogColor: { value: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {},
        shadow: {},
        shadowBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {},
        shadow: {},
        shadowBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotShadowMap: { value: [] },
    spotShadowMatrix: { value: [] },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {},
        shadow: {},
        shadowBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    }
  },
  points: {
    diffuse: { value: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](15658734) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    uvTransform: { value: new __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__['a']() }
  },
  sprite: {
    diffuse: { value: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](15658734) },
    opacity: { value: 1 },
    center: { value: new __WEBPACK_IMPORTED_MODULE_1__math_Vector2_js__['a'](0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    uvTransform: { value: new __WEBPACK_IMPORTED_MODULE_2__math_Matrix3_js__['a']() }
  }
};