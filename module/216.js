'use strict';
require.d(exports, 'a', function () {
  return WebGLPrograms;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__WebGLProgram_js__ = require('./217');
function WebGLPrograms(renderer, extensions, capabilities) {
  var programs = [];
  var shaderIDs = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distanceRGBA',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'phong',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite'
  };
  var parameterNames = [
    'precision',
    'supportsVertexTextures',
    'map',
    'mapEncoding',
    'envMap',
    'envMapMode',
    'envMapEncoding',
    'lightMap',
    'aoMap',
    'emissiveMap',
    'emissiveMapEncoding',
    'bumpMap',
    'normalMap',
    'objectSpaceNormalMap',
    'displacementMap',
    'specularMap',
    'roughnessMap',
    'metalnessMap',
    'gradientMap',
    'alphaMap',
    'combine',
    'vertexColors',
    'fog',
    'useFog',
    'fogExp',
    'flatShading',
    'sizeAttenuation',
    'logarithmicDepthBuffer',
    'skinning',
    'maxBones',
    'useVertexTexture',
    'morphTargets',
    'morphNormals',
    'maxMorphTargets',
    'maxMorphNormals',
    'premultipliedAlpha',
    'numDirLights',
    'numPointLights',
    'numSpotLights',
    'numHemiLights',
    'numRectAreaLights',
    'shadowMapEnabled',
    'shadowMapType',
    'toneMapping',
    'physicallyCorrectLights',
    'alphaTest',
    'doubleSided',
    'flipSided',
    'numClippingPlanes',
    'numClipIntersection',
    'depthPacking',
    'dithering'
  ];
  function allocateBones(object) {
    var skeleton = object.skeleton;
    var bones = skeleton.bones;
    if (capabilities.floatVertexTextures) {
      return 1024;
    } else {
      var nVertexUniforms = capabilities.maxVertexUniforms;
      var nVertexMatrices = Math.floor((nVertexUniforms - 20) / 4);
      var maxBones = Math.min(nVertexMatrices, bones.length);
      if (maxBones < bones.length) {
        console.warn('THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.');
        return 0;
      }
      return maxBones;
    }
  }
  function getTextureEncodingFromMap(map, gammaOverrideLinear) {
    var encoding;
    if (!map) {
      encoding = __WEBPACK_IMPORTED_MODULE_0__constants_js__['S'];
    } else if (map.isTexture) {
      encoding = map.encoding;
    } else if (map.isWebGLRenderTarget) {
      console.warn('THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.');
      encoding = map.texture.encoding;
    }
    if (encoding === __WEBPACK_IMPORTED_MODULE_0__constants_js__['S'] && gammaOverrideLinear) {
      encoding = __WEBPACK_IMPORTED_MODULE_0__constants_js__['I'];
    }
    return encoding;
  }
  this.getParameters = function (material, lights, shadows, fog, nClipPlanes, nClipIntersection, object) {
    var shaderID = shaderIDs[material.type];
    var maxBones = object.isSkinnedMesh ? allocateBones(object) : 0;
    var precision = capabilities.precision;
    if (material.precision !== null) {
      precision = capabilities.getMaxPrecision(material.precision);
      if (precision !== material.precision) {
        console.warn('THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
      }
    }
    var currentRenderTarget = renderer.getRenderTarget();
    var parameters = {
      shaderID: shaderID,
      precision: precision,
      supportsVertexTextures: capabilities.vertexTextures,
      outputEncoding: getTextureEncodingFromMap(!currentRenderTarget ? null : currentRenderTarget.texture, renderer.gammaOutput),
      map: !!material.map,
      mapEncoding: getTextureEncodingFromMap(material.map, renderer.gammaInput),
      envMap: !!material.envMap,
      envMapMode: material.envMap && material.envMap.mapping,
      envMapEncoding: getTextureEncodingFromMap(material.envMap, renderer.gammaInput),
      envMapCubeUV: !!material.envMap && (material.envMap.mapping === __WEBPACK_IMPORTED_MODULE_0__constants_js__['n'] || material.envMap.mapping === __WEBPACK_IMPORTED_MODULE_0__constants_js__['o']),
      lightMap: !!material.lightMap,
      aoMap: !!material.aoMap,
      emissiveMap: !!material.emissiveMap,
      emissiveMapEncoding: getTextureEncodingFromMap(material.emissiveMap, renderer.gammaInput),
      bumpMap: !!material.bumpMap,
      normalMap: !!material.normalMap,
      objectSpaceNormalMap: material.normalMapType === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_19'],
      displacementMap: !!material.displacementMap,
      roughnessMap: !!material.roughnessMap,
      metalnessMap: !!material.metalnessMap,
      specularMap: !!material.specularMap,
      alphaMap: !!material.alphaMap,
      gradientMap: !!material.gradientMap,
      combine: material.combine,
      vertexColors: material.vertexColors,
      fog: !!fog,
      useFog: material.fog,
      fogExp: fog && fog.isFogExp2,
      flatShading: material.flatShading,
      sizeAttenuation: material.sizeAttenuation,
      logarithmicDepthBuffer: capabilities.logarithmicDepthBuffer,
      skinning: material.skinning && maxBones > 0,
      maxBones: maxBones,
      useVertexTexture: capabilities.floatVertexTextures,
      morphTargets: material.morphTargets,
      morphNormals: material.morphNormals,
      maxMorphTargets: renderer.maxMorphTargets,
      maxMorphNormals: renderer.maxMorphNormals,
      numDirLights: lights.directional.length,
      numPointLights: lights.point.length,
      numSpotLights: lights.spot.length,
      numRectAreaLights: lights.rectArea.length,
      numHemiLights: lights.hemi.length,
      numClippingPlanes: nClipPlanes,
      numClipIntersection: nClipIntersection,
      dithering: material.dithering,
      shadowMapEnabled: renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
      shadowMapType: renderer.shadowMap.type,
      toneMapping: renderer.toneMapping,
      physicallyCorrectLights: renderer.physicallyCorrectLights,
      premultipliedAlpha: material.premultipliedAlpha,
      alphaTest: material.alphaTest,
      doubleSided: material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['w'],
      flipSided: material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'],
      depthPacking: material.depthPacking !== undefined ? material.depthPacking : false
    };
    return parameters;
  };
  this.getProgramCode = function (material, parameters) {
    var array = [];
    if (parameters.shaderID) {
      array.push(parameters.shaderID);
    } else {
      array.push(material.fragmentShader);
      array.push(material.vertexShader);
    }
    if (material.defines !== undefined) {
      for (var name in material.defines) {
        array.push(name);
        array.push(material.defines[name]);
      }
    }
    for (var i = 0; i < parameterNames.length; i++) {
      array.push(parameters[parameterNames[i]]);
    }
    array.push(material.onBeforeCompile.toString());
    array.push(renderer.gammaOutput);
    return array.join();
  };
  this.acquireProgram = function (material, shader, parameters, code) {
    var program;
    for (var p = 0, pl = programs.length; p < pl; p++) {
      var programInfo = programs[p];
      if (programInfo.code === code) {
        program = programInfo;
        ++program.usedTimes;
        break;
      }
    }
    if (program === undefined) {
      program = new __WEBPACK_IMPORTED_MODULE_1__WebGLProgram_js__['a'](renderer, extensions, code, material, shader, parameters, capabilities);
      programs.push(program);
    }
    return program;
  };
  this.releaseProgram = function (program) {
    if (--program.usedTimes === 0) {
      var i = programs.indexOf(program);
      programs[i] = programs[programs.length - 1];
      programs.pop();
      program.destroy();
    }
  };
  this.programs = programs;
}