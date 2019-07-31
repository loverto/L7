'use strict';
require.d(exports, 'a', function () {
  return WebGLLights;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Color_js__ = require('./7');
var __WEBPACK_IMPORTED_MODULE_1__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_2__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__ = require('./0');
function UniformsCache() {
  var lights = {};
  return {
    get: function (light) {
      if (lights[light.id] !== undefined) {
        return lights[light.id];
      }
      var uniforms;
      switch (light.type) {
      case 'DirectionalLight':
        uniforms = {
          direction: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          color: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](),
          shadow: false,
          shadowBias: 0,
          shadowRadius: 1,
          shadowMapSize: new __WEBPACK_IMPORTED_MODULE_2__math_Vector2_js__['a']()
        };
        break;
      case 'SpotLight':
        uniforms = {
          position: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          direction: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          color: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0,
          shadow: false,
          shadowBias: 0,
          shadowRadius: 1,
          shadowMapSize: new __WEBPACK_IMPORTED_MODULE_2__math_Vector2_js__['a']()
        };
        break;
      case 'PointLight':
        uniforms = {
          position: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          color: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](),
          distance: 0,
          decay: 0,
          shadow: false,
          shadowBias: 0,
          shadowRadius: 1,
          shadowMapSize: new __WEBPACK_IMPORTED_MODULE_2__math_Vector2_js__['a'](),
          shadowCameraNear: 1,
          shadowCameraFar: 1000
        };
        break;
      case 'HemisphereLight':
        uniforms = {
          direction: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          skyColor: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](),
          groundColor: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a']()
        };
        break;
      case 'RectAreaLight':
        uniforms = {
          color: new __WEBPACK_IMPORTED_MODULE_0__math_Color_js__['a'](),
          position: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          halfWidth: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a'](),
          halfHeight: new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a']()
        };
        break;
      }
      lights[light.id] = uniforms;
      return uniforms;
    }
  };
}
var count = 0;
function WebGLLights() {
  var cache = new UniformsCache();
  var state = {
    id: count++,
    hash: {
      stateID: -1,
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      shadowsLength: -1
    },
    ambient: [
      0,
      0,
      0
    ],
    directional: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotShadowMap: [],
    spotShadowMatrix: [],
    rectArea: [],
    point: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: []
  };
  var vector3 = new __WEBPACK_IMPORTED_MODULE_3__math_Vector3_js__['a']();
  var matrix4 = new __WEBPACK_IMPORTED_MODULE_1__math_Matrix4_js__['a']();
  var matrix42 = new __WEBPACK_IMPORTED_MODULE_1__math_Matrix4_js__['a']();
  function setup(lights, shadows, camera) {
    var r = 0, g = 0, b = 0;
    var directionalLength = 0;
    var pointLength = 0;
    var spotLength = 0;
    var rectAreaLength = 0;
    var hemiLength = 0;
    var viewMatrix = camera.matrixWorldInverse;
    for (var i = 0, l = lights.length; i < l; i++) {
      var light = lights[i];
      var color = light.color;
      var intensity = light.intensity;
      var distance = light.distance;
      var shadowMap = light.shadow && light.shadow.map ? light.shadow.map.texture : null;
      if (light.isAmbientLight) {
        r += color.r * intensity;
        g += color.g * intensity;
        b += color.b * intensity;
      } else if (light.isDirectionalLight) {
        var uniforms = cache.get(light);
        uniforms.color.copy(light.color).multiplyScalar(light.intensity);
        uniforms.direction.setFromMatrixPosition(light.matrixWorld);
        vector3.setFromMatrixPosition(light.target.matrixWorld);
        uniforms.direction.sub(vector3);
        uniforms.direction.transformDirection(viewMatrix);
        uniforms.shadow = light.castShadow;
        if (light.castShadow) {
          var shadow = light.shadow;
          uniforms.shadowBias = shadow.bias;
          uniforms.shadowRadius = shadow.radius;
          uniforms.shadowMapSize = shadow.mapSize;
        }
        state.directionalShadowMap[directionalLength] = shadowMap;
        state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
        state.directional[directionalLength] = uniforms;
        directionalLength++;
      } else if (light.isSpotLight) {
        var uniforms = cache.get(light);
        uniforms.position.setFromMatrixPosition(light.matrixWorld);
        uniforms.position.applyMatrix4(viewMatrix);
        uniforms.color.copy(color).multiplyScalar(intensity);
        uniforms.distance = distance;
        uniforms.direction.setFromMatrixPosition(light.matrixWorld);
        vector3.setFromMatrixPosition(light.target.matrixWorld);
        uniforms.direction.sub(vector3);
        uniforms.direction.transformDirection(viewMatrix);
        uniforms.coneCos = Math.cos(light.angle);
        uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
        uniforms.decay = light.distance === 0 ? 0 : light.decay;
        uniforms.shadow = light.castShadow;
        if (light.castShadow) {
          var shadow = light.shadow;
          uniforms.shadowBias = shadow.bias;
          uniforms.shadowRadius = shadow.radius;
          uniforms.shadowMapSize = shadow.mapSize;
        }
        state.spotShadowMap[spotLength] = shadowMap;
        state.spotShadowMatrix[spotLength] = light.shadow.matrix;
        state.spot[spotLength] = uniforms;
        spotLength++;
      } else if (light.isRectAreaLight) {
        var uniforms = cache.get(light);
        uniforms.color.copy(color).multiplyScalar(intensity);
        uniforms.position.setFromMatrixPosition(light.matrixWorld);
        uniforms.position.applyMatrix4(viewMatrix);
        matrix42.identity();
        matrix4.copy(light.matrixWorld);
        matrix4.premultiply(viewMatrix);
        matrix42.extractRotation(matrix4);
        uniforms.halfWidth.set(light.width * 0.5, 0, 0);
        uniforms.halfHeight.set(0, light.height * 0.5, 0);
        uniforms.halfWidth.applyMatrix4(matrix42);
        uniforms.halfHeight.applyMatrix4(matrix42);
        state.rectArea[rectAreaLength] = uniforms;
        rectAreaLength++;
      } else if (light.isPointLight) {
        var uniforms = cache.get(light);
        uniforms.position.setFromMatrixPosition(light.matrixWorld);
        uniforms.position.applyMatrix4(viewMatrix);
        uniforms.color.copy(light.color).multiplyScalar(light.intensity);
        uniforms.distance = light.distance;
        uniforms.decay = light.distance === 0 ? 0 : light.decay;
        uniforms.shadow = light.castShadow;
        if (light.castShadow) {
          var shadow = light.shadow;
          uniforms.shadowBias = shadow.bias;
          uniforms.shadowRadius = shadow.radius;
          uniforms.shadowMapSize = shadow.mapSize;
          uniforms.shadowCameraNear = shadow.camera.near;
          uniforms.shadowCameraFar = shadow.camera.far;
        }
        state.pointShadowMap[pointLength] = shadowMap;
        state.pointShadowMatrix[pointLength] = light.shadow.matrix;
        state.point[pointLength] = uniforms;
        pointLength++;
      } else if (light.isHemisphereLight) {
        var uniforms = cache.get(light);
        uniforms.direction.setFromMatrixPosition(light.matrixWorld);
        uniforms.direction.transformDirection(viewMatrix);
        uniforms.direction.normalize();
        uniforms.skyColor.copy(light.color).multiplyScalar(intensity);
        uniforms.groundColor.copy(light.groundColor).multiplyScalar(intensity);
        state.hemi[hemiLength] = uniforms;
        hemiLength++;
      }
    }
    state.ambient[0] = r;
    state.ambient[1] = g;
    state.ambient[2] = b;
    state.directional.length = directionalLength;
    state.spot.length = spotLength;
    state.rectArea.length = rectAreaLength;
    state.point.length = pointLength;
    state.hemi.length = hemiLength;
    state.hash.stateID = state.id;
    state.hash.directionalLength = directionalLength;
    state.hash.pointLength = pointLength;
    state.hash.spotLength = spotLength;
    state.hash.rectAreaLength = rectAreaLength;
    state.hash.hemiLength = hemiLength;
    state.hash.shadowsLength = shadows.length;
  }
  return {
    setup: setup,
    state: state
  };
}