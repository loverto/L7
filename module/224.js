'use strict';
require.d(exports, 'a', function () {
  return WebGLShadowMap;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__WebGLRenderTarget_js__ = require('./54');
var __WEBPACK_IMPORTED_MODULE_2__materials_MeshDepthMaterial_js__ = require('./225');
var __WEBPACK_IMPORTED_MODULE_3__materials_MeshDistanceMaterial_js__ = require('./226');
var __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__ = require('./11');
var __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_6__math_Vector2_js__ = require('./8');
var __WEBPACK_IMPORTED_MODULE_7__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_8__math_Frustum_js__ = require('./40');
function WebGLShadowMap(_renderer, _objects, maxTextureSize) {
  var _frustum = new __WEBPACK_IMPORTED_MODULE_8__math_Frustum_js__['a'](), _projScreenMatrix = new __WEBPACK_IMPORTED_MODULE_7__math_Matrix4_js__['a'](), _shadowMapSize = new __WEBPACK_IMPORTED_MODULE_6__math_Vector2_js__['a'](), _maxShadowMapSize = new __WEBPACK_IMPORTED_MODULE_6__math_Vector2_js__['a'](maxTextureSize, maxTextureSize), _lookTarget = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](), _lightPositionWorld = new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](), _MorphingFlag = 1, _SkinningFlag = 2, _NumberOfMaterialVariants = (_MorphingFlag | _SkinningFlag) + 1, _depthMaterials = new Array(_NumberOfMaterialVariants), _distanceMaterials = new Array(_NumberOfMaterialVariants), _materialCache = {};
  var shadowSide = {
    0: __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'],
    1: __WEBPACK_IMPORTED_MODULE_0__constants_js__['H'],
    2: __WEBPACK_IMPORTED_MODULE_0__constants_js__['w']
  };
  var cubeDirections = [
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](1, 0, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](-1, 0, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 0, 1),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 0, -1),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 1, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, -1, 0)
  ];
  var cubeUps = [
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 1, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 1, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 1, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 1, 0),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 0, 1),
    new __WEBPACK_IMPORTED_MODULE_5__math_Vector3_js__['a'](0, 0, -1)
  ];
  var cube2DViewPorts = [
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a'](),
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a'](),
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a'](),
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a'](),
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a'](),
    new __WEBPACK_IMPORTED_MODULE_4__math_Vector4_js__['a']()
  ];
  for (var i = 0; i !== _NumberOfMaterialVariants; ++i) {
    var useMorphing = (i & _MorphingFlag) !== 0;
    var useSkinning = (i & _SkinningFlag) !== 0;
    var depthMaterial = new __WEBPACK_IMPORTED_MODULE_2__materials_MeshDepthMaterial_js__['a']({
      depthPacking: __WEBPACK_IMPORTED_MODULE_0__constants_js__['_28'],
      morphTargets: useMorphing,
      skinning: useSkinning
    });
    _depthMaterials[i] = depthMaterial;
    var distanceMaterial = new __WEBPACK_IMPORTED_MODULE_3__materials_MeshDistanceMaterial_js__['a']({
      morphTargets: useMorphing,
      skinning: useSkinning
    });
    _distanceMaterials[i] = distanceMaterial;
  }
  var scope = this;
  this.enabled = false;
  this.autoUpdate = true;
  this.needsUpdate = false;
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__['_25'];
  this.render = function (lights, scene, camera) {
    if (scope.enabled === false)
      return;
    if (scope.autoUpdate === false && scope.needsUpdate === false)
      return;
    if (lights.length === 0)
      return;
    var _gl = _renderer.context;
    var _state = _renderer.state;
    _state.disable(_gl.BLEND);
    _state.buffers.color.setClear(1, 1, 1, 1);
    _state.buffers.depth.setTest(true);
    _state.setScissorTest(false);
    var faceCount;
    for (var i = 0, il = lights.length; i < il; i++) {
      var light = lights[i];
      var shadow = light.shadow;
      var isPointLight = light && light.isPointLight;
      if (shadow === undefined) {
        console.warn('THREE.WebGLShadowMap:', light, 'has no shadow.');
        continue;
      }
      var shadowCamera = shadow.camera;
      _shadowMapSize.copy(shadow.mapSize);
      _shadowMapSize.min(_maxShadowMapSize);
      if (isPointLight) {
        var vpWidth = _shadowMapSize.x;
        var vpHeight = _shadowMapSize.y;
        cube2DViewPorts[0].set(vpWidth * 2, vpHeight, vpWidth, vpHeight);
        cube2DViewPorts[1].set(0, vpHeight, vpWidth, vpHeight);
        cube2DViewPorts[2].set(vpWidth * 3, vpHeight, vpWidth, vpHeight);
        cube2DViewPorts[3].set(vpWidth, vpHeight, vpWidth, vpHeight);
        cube2DViewPorts[4].set(vpWidth * 3, 0, vpWidth, vpHeight);
        cube2DViewPorts[5].set(vpWidth, 0, vpWidth, vpHeight);
        _shadowMapSize.x *= 4;
        _shadowMapSize.y *= 2;
      }
      if (shadow.map === null) {
        var pars = {
          minFilter: __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'],
          magFilter: __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'],
          format: __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29']
        };
        shadow.map = new __WEBPACK_IMPORTED_MODULE_1__WebGLRenderTarget_js__['a'](_shadowMapSize.x, _shadowMapSize.y, pars);
        shadow.map.texture.name = light.name + '.shadowMap';
        shadowCamera.updateProjectionMatrix();
      }
      if (shadow.isSpotLightShadow) {
        shadow.update(light);
      }
      var shadowMap = shadow.map;
      var shadowMatrix = shadow.matrix;
      _lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
      shadowCamera.position.copy(_lightPositionWorld);
      if (isPointLight) {
        faceCount = 6;
        shadowMatrix.makeTranslation(-_lightPositionWorld.x, -_lightPositionWorld.y, -_lightPositionWorld.z);
      } else {
        faceCount = 1;
        _lookTarget.setFromMatrixPosition(light.target.matrixWorld);
        shadowCamera.lookAt(_lookTarget);
        shadowCamera.updateMatrixWorld();
        shadowMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
        shadowMatrix.multiply(shadowCamera.projectionMatrix);
        shadowMatrix.multiply(shadowCamera.matrixWorldInverse);
      }
      _renderer.setRenderTarget(shadowMap);
      _renderer.clear();
      for (var face = 0; face < faceCount; face++) {
        if (isPointLight) {
          _lookTarget.copy(shadowCamera.position);
          _lookTarget.add(cubeDirections[face]);
          shadowCamera.up.copy(cubeUps[face]);
          shadowCamera.lookAt(_lookTarget);
          shadowCamera.updateMatrixWorld();
          var vpDimensions = cube2DViewPorts[face];
          _state.viewport(vpDimensions);
        }
        _projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
        _frustum.setFromMatrix(_projScreenMatrix);
        renderObject(scene, camera, shadowCamera, isPointLight);
      }
    }
    scope.needsUpdate = false;
  };
  function getDepthMaterial(object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar) {
    var geometry = object.geometry;
    var result = null;
    var materialVariants = _depthMaterials;
    var customMaterial = object.customDepthMaterial;
    if (isPointLight) {
      materialVariants = _distanceMaterials;
      customMaterial = object.customDistanceMaterial;
    }
    if (!customMaterial) {
      var useMorphing = false;
      if (material.morphTargets) {
        if (geometry && geometry.isBufferGeometry) {
          useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;
        } else if (geometry && geometry.isGeometry) {
          useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;
        }
      }
      if (object.isSkinnedMesh && material.skinning === false) {
        console.warn('THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object);
      }
      var useSkinning = object.isSkinnedMesh && material.skinning;
      var variantIndex = 0;
      if (useMorphing)
        variantIndex |= _MorphingFlag;
      if (useSkinning)
        variantIndex |= _SkinningFlag;
      result = materialVariants[variantIndex];
    } else {
      result = customMaterial;
    }
    if (_renderer.localClippingEnabled && material.clipShadows === true && material.clippingPlanes.length !== 0) {
      var keyA = result.uuid, keyB = material.uuid;
      var materialsForVariant = _materialCache[keyA];
      if (materialsForVariant === undefined) {
        materialsForVariant = {};
        _materialCache[keyA] = materialsForVariant;
      }
      var cachedMaterial = materialsForVariant[keyB];
      if (cachedMaterial === undefined) {
        cachedMaterial = result.clone();
        materialsForVariant[keyB] = cachedMaterial;
      }
      result = cachedMaterial;
    }
    result.visible = material.visible;
    result.wireframe = material.wireframe;
    result.side = material.shadowSide != null ? material.shadowSide : shadowSide[material.side];
    result.clipShadows = material.clipShadows;
    result.clippingPlanes = material.clippingPlanes;
    result.clipIntersection = material.clipIntersection;
    result.wireframeLinewidth = material.wireframeLinewidth;
    result.linewidth = material.linewidth;
    if (isPointLight && result.isMeshDistanceMaterial) {
      result.referencePosition.copy(lightPositionWorld);
      result.nearDistance = shadowCameraNear;
      result.farDistance = shadowCameraFar;
    }
    return result;
  }
  function renderObject(object, camera, shadowCamera, isPointLight) {
    if (object.visible === false)
      return;
    var visible = object.layers.test(camera.layers);
    if (visible && (object.isMesh || object.isLine || object.isPoints)) {
      if (object.castShadow && (!object.frustumCulled || _frustum.intersectsObject(object))) {
        object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
        var geometry = _objects.update(object);
        var material = object.material;
        if (Array.isArray(material)) {
          var groups = geometry.groups;
          for (var k = 0, kl = groups.length; k < kl; k++) {
            var group = groups[k];
            var groupMaterial = material[group.materialIndex];
            if (groupMaterial && groupMaterial.visible) {
              var depthMaterial = getDepthMaterial(object, groupMaterial, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far);
              _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);
            }
          }
        } else if (material.visible) {
          var depthMaterial = getDepthMaterial(object, material, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far);
          _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);
        }
      }
    }
    var children = object.children;
    for (var i = 0, l = children.length; i < l; i++) {
      renderObject(children[i], camera, shadowCamera, isPointLight);
    }
  }
}