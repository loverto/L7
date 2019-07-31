'use strict';
require.d(exports, 'a', function () {
  return WebGLBackground;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__cameras_OrthographicCamera_js__ = require('./45');
var __WEBPACK_IMPORTED_MODULE_2__geometries_BoxGeometry_js__ = require('./203');
var __WEBPACK_IMPORTED_MODULE_3__geometries_PlaneGeometry_js__ = require('./205');
var __WEBPACK_IMPORTED_MODULE_4__materials_MeshBasicMaterial_js__ = require('./50');
var __WEBPACK_IMPORTED_MODULE_5__materials_ShaderMaterial_js__ = require('./51');
var __WEBPACK_IMPORTED_MODULE_6__math_Color_js__ = require('./7');
var __WEBPACK_IMPORTED_MODULE_7__objects_Mesh_js__ = require('./52');
var __WEBPACK_IMPORTED_MODULE_8__shaders_ShaderLib_js__ = require('./42');
function WebGLBackground(renderer, state, objects, premultipliedAlpha) {
  var clearColor = new __WEBPACK_IMPORTED_MODULE_6__math_Color_js__['a'](0);
  var clearAlpha = 0;
  var planeCamera, planeMesh;
  var boxMesh;
  function render(renderList, scene, camera, forceClear) {
    var background = scene.background;
    if (background === null) {
      setClear(clearColor, clearAlpha);
    } else if (background && background.isColor) {
      setClear(background, 1);
      forceClear = true;
    }
    if (renderer.autoClear || forceClear) {
      renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    }
    if (background && background.isCubeTexture) {
      if (boxMesh === undefined) {
        boxMesh = new __WEBPACK_IMPORTED_MODULE_7__objects_Mesh_js__['a'](new __WEBPACK_IMPORTED_MODULE_2__geometries_BoxGeometry_js__['a'](1, 1, 1), new __WEBPACK_IMPORTED_MODULE_5__materials_ShaderMaterial_js__['a']({
          uniforms: __WEBPACK_IMPORTED_MODULE_8__shaders_ShaderLib_js__['a'].cube.uniforms,
          vertexShader: __WEBPACK_IMPORTED_MODULE_8__shaders_ShaderLib_js__['a'].cube.vertexShader,
          fragmentShader: __WEBPACK_IMPORTED_MODULE_8__shaders_ShaderLib_js__['a'].cube.fragmentShader,
          side: __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'],
          depthTest: true,
          depthWrite: false,
          fog: false
        }));
        boxMesh.geometry.removeAttribute('normal');
        boxMesh.geometry.removeAttribute('uv');
        boxMesh.onBeforeRender = function (renderer, scene, camera) {
          this.matrixWorld.copyPosition(camera.matrixWorld);
        };
        objects.update(boxMesh);
      }
      boxMesh.material.uniforms.tCube.value = background;
      renderList.push(boxMesh, boxMesh.geometry, boxMesh.material, 0, null);
    } else if (background && background.isTexture) {
      if (planeCamera === undefined) {
        planeCamera = new __WEBPACK_IMPORTED_MODULE_1__cameras_OrthographicCamera_js__['a'](-1, 1, 1, -1, 0, 1);
        planeMesh = new __WEBPACK_IMPORTED_MODULE_7__objects_Mesh_js__['a'](new __WEBPACK_IMPORTED_MODULE_3__geometries_PlaneGeometry_js__['a'](2, 2), new __WEBPACK_IMPORTED_MODULE_4__materials_MeshBasicMaterial_js__['a']({
          depthTest: false,
          depthWrite: false,
          fog: false
        }));
        objects.update(planeMesh);
      }
      planeMesh.material.map = background;
      renderer.renderBufferDirect(planeCamera, null, planeMesh.geometry, planeMesh.material, planeMesh, null);
    }
  }
  function setClear(color, alpha) {
    state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);
  }
  return {
    getClearColor: function () {
      return clearColor;
    },
    setClearColor: function (color, alpha) {
      clearColor.set(color);
      clearAlpha = alpha !== undefined ? alpha : 1;
      setClear(clearColor, clearAlpha);
    },
    getClearAlpha: function () {
      return clearAlpha;
    },
    setClearAlpha: function (alpha) {
      clearAlpha = alpha;
      setClear(clearColor, clearAlpha);
    },
    render: render
  };
}