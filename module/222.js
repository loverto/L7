'use strict';
require.d(exports, 'a', function () {
  return WebGLRenderStates;
});
var __WEBPACK_IMPORTED_MODULE_0__WebGLLights_js__ = require('./223');
function WebGLRenderState() {
  var lights = new __WEBPACK_IMPORTED_MODULE_0__WebGLLights_js__['a']();
  var lightsArray = [];
  var shadowsArray = [];
  function init() {
    lightsArray.length = 0;
    shadowsArray.length = 0;
  }
  function pushLight(light) {
    lightsArray.push(light);
  }
  function pushShadow(shadowLight) {
    shadowsArray.push(shadowLight);
  }
  function setupLights(camera) {
    lights.setup(lightsArray, shadowsArray, camera);
  }
  var state = {
    lightsArray: lightsArray,
    shadowsArray: shadowsArray,
    lights: lights
  };
  return {
    init: init,
    state: state,
    setupLights: setupLights,
    pushLight: pushLight,
    pushShadow: pushShadow
  };
}
function WebGLRenderStates() {
  var renderStates = {};
  function get(scene, camera) {
    var renderState;
    if (renderStates[scene.id] === undefined) {
      renderState = new WebGLRenderState();
      renderStates[scene.id] = {};
      renderStates[scene.id][camera.id] = renderState;
    } else {
      if (renderStates[scene.id][camera.id] === undefined) {
        renderState = new WebGLRenderState();
        renderStates[scene.id][camera.id] = renderState;
      } else {
        renderState = renderStates[scene.id][camera.id];
      }
    }
    return renderState;
  }
  function dispose() {
    renderStates = {};
  }
  return {
    get: get,
    dispose: dispose
  };
}