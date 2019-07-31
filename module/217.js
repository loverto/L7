'use strict';
require.d(exports, 'a', function () {
  return WebGLProgram;
});
var __WEBPACK_IMPORTED_MODULE_0__WebGLUniforms_js__ = require('./53');
var __WEBPACK_IMPORTED_MODULE_1__WebGLShader_js__ = require('./219');
var __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderChunk_js__ = require('./43');
var __WEBPACK_IMPORTED_MODULE_3__constants_js__ = require('./3');
var programIdCount = 0;
function getEncodingComponents(encoding) {
  switch (encoding) {
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['S']:
    return [
      'Linear',
      '( value )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_88']:
    return [
      'sRGB',
      '( value )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_50']:
    return [
      'RGBE',
      '( value )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_54']:
    return [
      'RGBM',
      '( value, 7.0 )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_53']:
    return [
      'RGBM',
      '( value, 16.0 )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_49']:
    return [
      'RGBD',
      '( value, 256.0 )'
    ];
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['I']:
    return [
      'Gamma',
      '( value, float( GAMMA_FACTOR ) )'
    ];
  default:
    throw new Error('unsupported encoding: ' + encoding);
  }
}
function getTexelDecodingFunction(functionName, encoding) {
  var components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
}
function getTexelEncodingFunction(functionName, encoding) {
  var components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';
}
function getToneMappingFunction(functionName, toneMapping) {
  var toneMappingName;
  switch (toneMapping) {
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['W']:
    toneMappingName = 'Linear';
    break;
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_59']:
    toneMappingName = 'Reinhard';
    break;
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_75']:
    toneMappingName = 'Uncharted2';
    break;
  case __WEBPACK_IMPORTED_MODULE_3__constants_js__['j']:
    toneMappingName = 'OptimizedCineon';
    break;
  default:
    throw new Error('unsupported toneMapping: ' + toneMapping);
  }
  return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';
}
function generateExtensions(extensions, parameters, rendererExtensions) {
  extensions = extensions || {};
  var chunks = [
    extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap && !parameters.objectSpaceNormalMap || parameters.flatShading ? '#extension GL_OES_standard_derivatives : enable' : '',
    (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '',
    extensions.drawBuffers && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '',
    (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''
  ];
  return chunks.filter(filterEmptyLine).join('\n');
}
function generateDefines(defines) {
  var chunks = [];
  for (var name in defines) {
    var value = defines[name];
    if (value === false)
      continue;
    chunks.push('#define ' + name + ' ' + value);
  }
  return chunks.join('\n');
}
function fetchAttributeLocations(gl, program) {
  var attributes = {};
  var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (var i = 0; i < n; i++) {
    var info = gl.getActiveAttrib(program, i);
    var name = info.name;
    attributes[name] = gl.getAttribLocation(program, name);
  }
  return attributes;
}
function filterEmptyLine(string) {
  return string !== '';
}
function replaceLightNums(string, parameters) {
  return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights).replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights);
}
function replaceClippingPlaneNums(string, parameters) {
  return string.replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, parameters.numClippingPlanes - parameters.numClipIntersection);
}
function parseIncludes(string) {
  var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function replace(match, include) {
    var replace = __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderChunk_js__['a'][include];
    if (replace === undefined) {
      throw new Error('Can not resolve #include <' + include + '>');
    }
    return parseIncludes(replace);
  }
  return string.replace(pattern, replace);
}
function unrollLoops(string) {
  var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
  function replace(match, start, end, snippet) {
    var unroll = '';
    for (var i = parseInt(start); i < parseInt(end); i++) {
      unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');
    }
    return unroll;
  }
  return string.replace(pattern, replace);
}
function WebGLProgram(renderer, extensions, code, material, shader, parameters, capabilities) {
  var gl = renderer.context;
  var defines = material.defines;
  var vertexShader = shader.vertexShader;
  var fragmentShader = shader.fragmentShader;
  var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';
  if (parameters.shadowMapType === __WEBPACK_IMPORTED_MODULE_3__constants_js__['_25']) {
    shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';
  } else if (parameters.shadowMapType === __WEBPACK_IMPORTED_MODULE_3__constants_js__['_26']) {
    shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';
  }
  var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
  var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
  var envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
  if (parameters.envMap) {
    switch (material.envMap.mapping) {
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['l']:
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['m']:
      envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
      break;
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['n']:
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['o']:
      envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
      break;
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['A']:
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['B']:
      envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';
      break;
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_64']:
      envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';
      break;
    }
    switch (material.envMap.mapping) {
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['m']:
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['B']:
      envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
      break;
    }
    switch (material.combine) {
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_9']:
      envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
      break;
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['_7']:
      envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
      break;
    case __WEBPACK_IMPORTED_MODULE_3__constants_js__['b']:
      envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
      break;
    }
  }
  var gammaFactorDefine = renderer.gammaFactor > 0 ? renderer.gammaFactor : 1;
  var customExtensions = capabilities.isWebGL2 ? '' : generateExtensions(material.extensions, parameters, extensions);
  var customDefines = generateDefines(defines);
  var program = gl.createProgram();
  var prefixVertex, prefixFragment;
  if (material.isRawShaderMaterial) {
    prefixVertex = [customDefines].filter(filterEmptyLine).join('\n');
    if (prefixVertex.length > 0) {
      prefixVertex += '\n';
    }
    prefixFragment = [
      customExtensions,
      customDefines
    ].filter(filterEmptyLine).join('\n');
    if (prefixFragment.length > 0) {
      prefixFragment += '\n';
    }
  } else {
    prefixVertex = [
      'precision ' + parameters.precision + ' float;',
      'precision ' + parameters.precision + ' int;',
      '#define SHADER_NAME ' + shader.name,
      customDefines,
      parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',
      '#define GAMMA_FACTOR ' + gammaFactorDefine,
      '#define MAX_BONES ' + parameters.maxBones,
      parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
      parameters.useFog && parameters.fogExp ? '#define FOG_EXP2' : '',
      parameters.map ? '#define USE_MAP' : '',
      parameters.envMap ? '#define USE_ENVMAP' : '',
      parameters.envMap ? '#define ' + envMapModeDefine : '',
      parameters.lightMap ? '#define USE_LIGHTMAP' : '',
      parameters.aoMap ? '#define USE_AOMAP' : '',
      parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
      parameters.bumpMap ? '#define USE_BUMPMAP' : '',
      parameters.normalMap ? '#define USE_NORMALMAP' : '',
      parameters.normalMap && parameters.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
      parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
      parameters.specularMap ? '#define USE_SPECULARMAP' : '',
      parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
      parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
      parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
      parameters.vertexColors ? '#define USE_COLOR' : '',
      parameters.flatShading ? '#define FLAT_SHADED' : '',
      parameters.skinning ? '#define USE_SKINNING' : '',
      parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',
      parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
      parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
      parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
      parameters.flipSided ? '#define FLIP_SIDED' : '',
      parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
      parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
      parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
      parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
      parameters.logarithmicDepthBuffer && (capabilities.isWebGL2 || extensions.get('EXT_frag_depth')) ? '#define USE_LOGDEPTHBUF_EXT' : '',
      'uniform mat4 modelMatrix;',
      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform mat4 viewMatrix;',
      'uniform mat3 normalMatrix;',
      'uniform vec3 cameraPosition;',
      'attribute vec3 position;',
      'attribute vec3 normal;',
      'attribute vec2 uv;',
      '#ifdef USE_COLOR',
      '\tattribute vec3 color;',
      '#endif',
      '#ifdef USE_MORPHTARGETS',
      '\tattribute vec3 morphTarget0;',
      '\tattribute vec3 morphTarget1;',
      '\tattribute vec3 morphTarget2;',
      '\tattribute vec3 morphTarget3;',
      '\t#ifdef USE_MORPHNORMALS',
      '\t\tattribute vec3 morphNormal0;',
      '\t\tattribute vec3 morphNormal1;',
      '\t\tattribute vec3 morphNormal2;',
      '\t\tattribute vec3 morphNormal3;',
      '\t#else',
      '\t\tattribute vec3 morphTarget4;',
      '\t\tattribute vec3 morphTarget5;',
      '\t\tattribute vec3 morphTarget6;',
      '\t\tattribute vec3 morphTarget7;',
      '\t#endif',
      '#endif',
      '#ifdef USE_SKINNING',
      '\tattribute vec4 skinIndex;',
      '\tattribute vec4 skinWeight;',
      '#endif',
      '\n'
    ].filter(filterEmptyLine).join('\n');
    prefixFragment = [
      customExtensions,
      'precision ' + parameters.precision + ' float;',
      'precision ' + parameters.precision + ' int;',
      '#define SHADER_NAME ' + shader.name,
      customDefines,
      parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + (parameters.alphaTest % 1 ? '' : '.0') : '',
      '#define GAMMA_FACTOR ' + gammaFactorDefine,
      parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
      parameters.useFog && parameters.fogExp ? '#define FOG_EXP2' : '',
      parameters.map ? '#define USE_MAP' : '',
      parameters.envMap ? '#define USE_ENVMAP' : '',
      parameters.envMap ? '#define ' + envMapTypeDefine : '',
      parameters.envMap ? '#define ' + envMapModeDefine : '',
      parameters.envMap ? '#define ' + envMapBlendingDefine : '',
      parameters.lightMap ? '#define USE_LIGHTMAP' : '',
      parameters.aoMap ? '#define USE_AOMAP' : '',
      parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
      parameters.bumpMap ? '#define USE_BUMPMAP' : '',
      parameters.normalMap ? '#define USE_NORMALMAP' : '',
      parameters.normalMap && parameters.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
      parameters.specularMap ? '#define USE_SPECULARMAP' : '',
      parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
      parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
      parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
      parameters.vertexColors ? '#define USE_COLOR' : '',
      parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',
      parameters.flatShading ? '#define FLAT_SHADED' : '',
      parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
      parameters.flipSided ? '#define FLIP_SIDED' : '',
      parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
      parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
      parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
      parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',
      parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
      parameters.logarithmicDepthBuffer && (capabilities.isWebGL2 || extensions.get('EXT_frag_depth')) ? '#define USE_LOGDEPTHBUF_EXT' : '',
      parameters.envMap && (capabilities.isWebGL2 || extensions.get('EXT_shader_texture_lod')) ? '#define TEXTURE_LOD_EXT' : '',
      'uniform mat4 viewMatrix;',
      'uniform vec3 cameraPosition;',
      parameters.toneMapping !== __WEBPACK_IMPORTED_MODULE_3__constants_js__['_16'] ? '#define TONE_MAPPING' : '',
      parameters.toneMapping !== __WEBPACK_IMPORTED_MODULE_3__constants_js__['_16'] ? __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderChunk_js__['a']['tonemapping_pars_fragment'] : '',
      parameters.toneMapping !== __WEBPACK_IMPORTED_MODULE_3__constants_js__['_16'] ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '',
      parameters.dithering ? '#define DITHERING' : '',
      parameters.outputEncoding || parameters.mapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding ? __WEBPACK_IMPORTED_MODULE_2__shaders_ShaderChunk_js__['a']['encodings_pars_fragment'] : '',
      parameters.mapEncoding ? getTexelDecodingFunction('mapTexelToLinear', parameters.mapEncoding) : '',
      parameters.envMapEncoding ? getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding) : '',
      parameters.emissiveMapEncoding ? getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.emissiveMapEncoding) : '',
      parameters.outputEncoding ? getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding) : '',
      parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',
      '\n'
    ].filter(filterEmptyLine).join('\n');
  }
  vertexShader = parseIncludes(vertexShader);
  vertexShader = replaceLightNums(vertexShader, parameters);
  vertexShader = replaceClippingPlaneNums(vertexShader, parameters);
  fragmentShader = parseIncludes(fragmentShader);
  fragmentShader = replaceLightNums(fragmentShader, parameters);
  fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);
  vertexShader = unrollLoops(vertexShader);
  fragmentShader = unrollLoops(fragmentShader);
  if (capabilities.isWebGL2 && !material.isRawShaderMaterial) {
    var isGLSL3ShaderMaterial = false;
    var versionRegex = /^\s*#version\s+300\s+es\s*\n/;
    if (material.isShaderMaterial && vertexShader.match(versionRegex) !== null && fragmentShader.match(versionRegex) !== null) {
      isGLSL3ShaderMaterial = true;
      vertexShader = vertexShader.replace(versionRegex, '');
      fragmentShader = fragmentShader.replace(versionRegex, '');
    }
    prefixVertex = [
      '#version 300 es\n',
      '#define attribute in',
      '#define varying out',
      '#define texture2D texture'
    ].join('\n') + '\n' + prefixVertex;
    prefixFragment = [
      '#version 300 es\n',
      '#define varying in',
      isGLSL3ShaderMaterial ? '' : 'out highp vec4 pc_fragColor;',
      isGLSL3ShaderMaterial ? '' : '#define gl_FragColor pc_fragColor',
      '#define gl_FragDepthEXT gl_FragDepth',
      '#define texture2D texture',
      '#define textureCube texture',
      '#define texture2DProj textureProj',
      '#define texture2DLodEXT textureLod',
      '#define texture2DProjLodEXT textureProjLod',
      '#define textureCubeLodEXT textureLod',
      '#define texture2DGradEXT textureGrad',
      '#define texture2DProjGradEXT textureProjGrad',
      '#define textureCubeGradEXT textureGrad'
    ].join('\n') + '\n' + prefixFragment;
  }
  var vertexGlsl = prefixVertex + vertexShader;
  var fragmentGlsl = prefixFragment + fragmentShader;
  var glVertexShader = Object(__WEBPACK_IMPORTED_MODULE_1__WebGLShader_js__['a'])(gl, gl.VERTEX_SHADER, vertexGlsl);
  var glFragmentShader = Object(__WEBPACK_IMPORTED_MODULE_1__WebGLShader_js__['a'])(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
  gl.attachShader(program, glVertexShader);
  gl.attachShader(program, glFragmentShader);
  if (material.index0AttributeName !== undefined) {
    gl.bindAttribLocation(program, 0, material.index0AttributeName);
  } else if (parameters.morphTargets === true) {
    gl.bindAttribLocation(program, 0, 'position');
  }
  gl.linkProgram(program);
  var programLog = gl.getProgramInfoLog(program).trim();
  var vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
  var fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();
  var runnable = true;
  var haveDiagnostics = true;
  if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
    runnable = false;
    console.error('THREE.WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
  } else if (programLog !== '') {
    console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', programLog);
  } else if (vertexLog === '' || fragmentLog === '') {
    haveDiagnostics = false;
  }
  if (haveDiagnostics) {
    this.diagnostics = {
      runnable: runnable,
      material: material,
      programLog: programLog,
      vertexShader: {
        log: vertexLog,
        prefix: prefixVertex
      },
      fragmentShader: {
        log: fragmentLog,
        prefix: prefixFragment
      }
    };
  }
  gl.deleteShader(glVertexShader);
  gl.deleteShader(glFragmentShader);
  var cachedUniforms;
  this.getUniforms = function () {
    if (cachedUniforms === undefined) {
      cachedUniforms = new __WEBPACK_IMPORTED_MODULE_0__WebGLUniforms_js__['a'](gl, program, renderer);
    }
    return cachedUniforms;
  };
  var cachedAttributes;
  this.getAttributes = function () {
    if (cachedAttributes === undefined) {
      cachedAttributes = fetchAttributeLocations(gl, program);
    }
    return cachedAttributes;
  };
  this.destroy = function () {
    gl.deleteProgram(program);
    this.program = undefined;
  };
  Object.defineProperties(this, {
    uniforms: {
      get: function () {
        console.warn('THREE.WebGLProgram: .uniforms is now .getUniforms().');
        return this.getUniforms();
      }
    },
    attributes: {
      get: function () {
        console.warn('THREE.WebGLProgram: .attributes is now .getAttributes().');
        return this.getAttributes();
      }
    }
  });
  this.name = shader.name;
  this.id = programIdCount++;
  this.code = code;
  this.usedTimes = 1;
  this.program = program;
  this.vertexShader = glVertexShader;
  this.fragmentShader = glFragmentShader;
  return this;
}