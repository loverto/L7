'use strict';
require.d(exports, 'a', function () {
  return WebGLClipping;
});
var __WEBPACK_IMPORTED_MODULE_0__math_Matrix3_js__ = require('./9');
var __WEBPACK_IMPORTED_MODULE_1__math_Plane_js__ = require('./41');
function WebGLClipping() {
  var scope = this, globalState = null, numGlobalPlanes = 0, localClippingEnabled = false, renderingShadows = false, plane = new __WEBPACK_IMPORTED_MODULE_1__math_Plane_js__['a'](), viewNormalMatrix = new __WEBPACK_IMPORTED_MODULE_0__math_Matrix3_js__['a'](), uniform = {
      value: null,
      needsUpdate: false
    };
  this.uniform = uniform;
  this.numPlanes = 0;
  this.numIntersection = 0;
  this.init = function (planes, enableLocalClipping, camera) {
    var enabled = planes.length !== 0 || enableLocalClipping || numGlobalPlanes !== 0 || localClippingEnabled;
    localClippingEnabled = enableLocalClipping;
    globalState = projectPlanes(planes, camera, 0);
    numGlobalPlanes = planes.length;
    return enabled;
  };
  this.beginShadows = function () {
    renderingShadows = true;
    projectPlanes(null);
  };
  this.endShadows = function () {
    renderingShadows = false;
    resetGlobalState();
  };
  this.setState = function (planes, clipIntersection, clipShadows, camera, cache, fromCache) {
    if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {
      if (renderingShadows) {
        projectPlanes(null);
      } else {
        resetGlobalState();
      }
    } else {
      var nGlobal = renderingShadows ? 0 : numGlobalPlanes, lGlobal = nGlobal * 4, dstArray = cache.clippingState || null;
      uniform.value = dstArray;
      dstArray = projectPlanes(planes, camera, lGlobal, fromCache);
      for (var i = 0; i !== lGlobal; ++i) {
        dstArray[i] = globalState[i];
      }
      cache.clippingState = dstArray;
      this.numIntersection = clipIntersection ? this.numPlanes : 0;
      this.numPlanes += nGlobal;
    }
  };
  function resetGlobalState() {
    if (uniform.value !== globalState) {
      uniform.value = globalState;
      uniform.needsUpdate = numGlobalPlanes > 0;
    }
    scope.numPlanes = numGlobalPlanes;
    scope.numIntersection = 0;
  }
  function projectPlanes(planes, camera, dstOffset, skipTransform) {
    var nPlanes = planes !== null ? planes.length : 0, dstArray = null;
    if (nPlanes !== 0) {
      dstArray = uniform.value;
      if (skipTransform !== true || dstArray === null) {
        var flatSize = dstOffset + nPlanes * 4, viewMatrix = camera.matrixWorldInverse;
        viewNormalMatrix.getNormalMatrix(viewMatrix);
        if (dstArray === null || dstArray.length < flatSize) {
          dstArray = new Float32Array(flatSize);
        }
        for (var i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4) {
          plane.copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);
          plane.normal.toArray(dstArray, i4);
          dstArray[i4 + 3] = plane.constant;
        }
      }
      uniform.value = dstArray;
      uniform.needsUpdate = true;
    }
    scope.numPlanes = nPlanes;
    return dstArray;
  }
}