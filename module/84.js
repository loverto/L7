'use strict';
require.d(exports, 'a', function () {
  return WebGLRenderer;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__math_Math_js__ = require('./6');
var __WEBPACK_IMPORTED_MODULE_2__textures_DataTexture_js__ = require('./39');
var __WEBPACK_IMPORTED_MODULE_3__math_Frustum_js__ = require('./40');
var __WEBPACK_IMPORTED_MODULE_4__math_Matrix4_js__ = require('./4');
var __WEBPACK_IMPORTED_MODULE_5__shaders_ShaderLib_js__ = require('./42');
var __WEBPACK_IMPORTED_MODULE_6__shaders_UniformsLib_js__ = require('./44');
var __WEBPACK_IMPORTED_MODULE_7__shaders_UniformsUtils_js__ = require('./32');
var __WEBPACK_IMPORTED_MODULE_8__math_Vector3_js__ = require('./0');
var __WEBPACK_IMPORTED_MODULE_9__math_Vector4_js__ = require('./11');
var __WEBPACK_IMPORTED_MODULE_10__webgl_WebGLAnimation_js__ = require('./33');
var __WEBPACK_IMPORTED_MODULE_11__webgl_WebGLAttributes_js__ = require('./201');
var __WEBPACK_IMPORTED_MODULE_12__webgl_WebGLBackground_js__ = require('./202');
var __WEBPACK_IMPORTED_MODULE_13__webgl_WebGLBufferRenderer_js__ = require('./207');
var __WEBPACK_IMPORTED_MODULE_14__webgl_WebGLCapabilities_js__ = require('./208');
var __WEBPACK_IMPORTED_MODULE_15__webgl_WebGLClipping_js__ = require('./209');
var __WEBPACK_IMPORTED_MODULE_16__webgl_WebGLExtensions_js__ = require('./210');
var __WEBPACK_IMPORTED_MODULE_17__webgl_WebGLGeometries_js__ = require('./211');
var __WEBPACK_IMPORTED_MODULE_18__webgl_WebGLIndexedBufferRenderer_js__ = require('./212');
var __WEBPACK_IMPORTED_MODULE_19__webgl_WebGLInfo_js__ = require('./213');
var __WEBPACK_IMPORTED_MODULE_20__webgl_WebGLMorphtargets_js__ = require('./214');
var __WEBPACK_IMPORTED_MODULE_21__webgl_WebGLObjects_js__ = require('./215');
var __WEBPACK_IMPORTED_MODULE_22__webgl_WebGLPrograms_js__ = require('./216');
var __WEBPACK_IMPORTED_MODULE_23__webgl_WebGLProperties_js__ = require('./220');
var __WEBPACK_IMPORTED_MODULE_24__webgl_WebGLRenderLists_js__ = require('./221');
var __WEBPACK_IMPORTED_MODULE_25__webgl_WebGLRenderStates_js__ = require('./222');
var __WEBPACK_IMPORTED_MODULE_26__webgl_WebGLShadowMap_js__ = require('./224');
var __WEBPACK_IMPORTED_MODULE_27__webgl_WebGLState_js__ = require('./227');
var __WEBPACK_IMPORTED_MODULE_28__webgl_WebGLTextures_js__ = require('./228');
var __WEBPACK_IMPORTED_MODULE_29__webgl_WebGLUniforms_js__ = require('./53');
var __WEBPACK_IMPORTED_MODULE_30__webgl_WebGLUtils_js__ = require('./229');
var __WEBPACK_IMPORTED_MODULE_31__webvr_WebVRManager_js__ = require('./230');
var __WEBPACK_IMPORTED_MODULE_32__webvr_WebXRManager_js__ = require('./231');
function WebGLRenderer(parameters) {
  console.log('THREE.WebGLRenderer', __WEBPACK_IMPORTED_MODULE_0__constants_js__['_27']);
  parameters = parameters || {};
  var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'), _context = parameters.context !== undefined ? parameters.context : null, _alpha = parameters.alpha !== undefined ? parameters.alpha : false, _depth = parameters.depth !== undefined ? parameters.depth : true, _stencil = parameters.stencil !== undefined ? parameters.stencil : true, _antialias = parameters.antialias !== undefined ? parameters.antialias : false, _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true, _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false, _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';
  var currentRenderList = null;
  var currentRenderState = null;
  this.domElement = _canvas;
  this.context = null;
  this.autoClear = true;
  this.autoClearColor = true;
  this.autoClearDepth = true;
  this.autoClearStencil = true;
  this.sortObjects = true;
  this.clippingPlanes = [];
  this.localClippingEnabled = false;
  this.gammaFactor = 2;
  this.gammaInput = false;
  this.gammaOutput = false;
  this.physicallyCorrectLights = false;
  this.toneMapping = __WEBPACK_IMPORTED_MODULE_0__constants_js__['W'];
  this.toneMappingExposure = 1;
  this.toneMappingWhitePoint = 1;
  this.maxMorphTargets = 8;
  this.maxMorphNormals = 4;
  var _this = this, _isContextLost = false, _framebuffer = null, _currentRenderTarget = null, _currentFramebuffer = null, _currentMaterialId = -1, _currentGeometryProgram = {
      geometry: null,
      program: null,
      wireframe: false
    }, _currentCamera = null, _currentArrayCamera = null, _currentViewport = new __WEBPACK_IMPORTED_MODULE_9__math_Vector4_js__['a'](), _currentScissor = new __WEBPACK_IMPORTED_MODULE_9__math_Vector4_js__['a'](), _currentScissorTest = null, _usedTextureUnits = 0, _width = _canvas.width, _height = _canvas.height, _pixelRatio = 1, _viewport = new __WEBPACK_IMPORTED_MODULE_9__math_Vector4_js__['a'](0, 0, _width, _height), _scissor = new __WEBPACK_IMPORTED_MODULE_9__math_Vector4_js__['a'](0, 0, _width, _height), _scissorTest = false, _frustum = new __WEBPACK_IMPORTED_MODULE_3__math_Frustum_js__['a'](), _clipping = new __WEBPACK_IMPORTED_MODULE_15__webgl_WebGLClipping_js__['a'](), _clippingEnabled = false, _localClippingEnabled = false, _projScreenMatrix = new __WEBPACK_IMPORTED_MODULE_4__math_Matrix4_js__['a'](), _vector3 = new __WEBPACK_IMPORTED_MODULE_8__math_Vector3_js__['a']();
  function getTargetPixelRatio() {
    return _currentRenderTarget === null ? _pixelRatio : 1;
  }
  var _gl;
  try {
    var contextAttributes = {
      alpha: _alpha,
      depth: _depth,
      stencil: _stencil,
      antialias: _antialias,
      premultipliedAlpha: _premultipliedAlpha,
      preserveDrawingBuffer: _preserveDrawingBuffer,
      powerPreference: _powerPreference
    };
    _canvas.addEventListener('webglcontextlost', onContextLost, false);
    _canvas.addEventListener('webglcontextrestored', onContextRestore, false);
    _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);
    if (_gl === null) {
      if (_canvas.getContext('webgl') !== null) {
        throw new Error('Error creating WebGL context with your selected attributes.');
      } else {
        throw new Error('Error creating WebGL context.');
      }
    }
    if (_gl.getShaderPrecisionFormat === undefined) {
      _gl.getShaderPrecisionFormat = function () {
        return {
          'rangeMin': 1,
          'rangeMax': 1,
          'precision': 1
        };
      };
    }
  } catch (error) {
    console.error('THREE.WebGLRenderer: ' + error.message);
  }
  var extensions, capabilities, state, info;
  var properties, textures, attributes, geometries, objects;
  var programCache, renderLists, renderStates;
  var background, morphtargets, bufferRenderer, indexedBufferRenderer;
  var utils;
  function initGLContext() {
    extensions = new __WEBPACK_IMPORTED_MODULE_16__webgl_WebGLExtensions_js__['a'](_gl);
    capabilities = new __WEBPACK_IMPORTED_MODULE_14__webgl_WebGLCapabilities_js__['a'](_gl, extensions, parameters);
    if (!capabilities.isWebGL2) {
      extensions.get('WEBGL_depth_texture');
      extensions.get('OES_texture_float');
      extensions.get('OES_texture_half_float');
      extensions.get('OES_texture_half_float_linear');
      extensions.get('OES_standard_derivatives');
      extensions.get('OES_element_index_uint');
      extensions.get('ANGLE_instanced_arrays');
    }
    extensions.get('OES_texture_float_linear');
    utils = new __WEBPACK_IMPORTED_MODULE_30__webgl_WebGLUtils_js__['a'](_gl, extensions, capabilities);
    state = new __WEBPACK_IMPORTED_MODULE_27__webgl_WebGLState_js__['a'](_gl, extensions, utils, capabilities);
    state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio));
    state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio));
    info = new __WEBPACK_IMPORTED_MODULE_19__webgl_WebGLInfo_js__['a'](_gl);
    properties = new __WEBPACK_IMPORTED_MODULE_23__webgl_WebGLProperties_js__['a']();
    textures = new __WEBPACK_IMPORTED_MODULE_28__webgl_WebGLTextures_js__['a'](_gl, extensions, state, properties, capabilities, utils, info);
    attributes = new __WEBPACK_IMPORTED_MODULE_11__webgl_WebGLAttributes_js__['a'](_gl);
    geometries = new __WEBPACK_IMPORTED_MODULE_17__webgl_WebGLGeometries_js__['a'](_gl, attributes, info);
    objects = new __WEBPACK_IMPORTED_MODULE_21__webgl_WebGLObjects_js__['a'](geometries, info);
    morphtargets = new __WEBPACK_IMPORTED_MODULE_20__webgl_WebGLMorphtargets_js__['a'](_gl);
    programCache = new __WEBPACK_IMPORTED_MODULE_22__webgl_WebGLPrograms_js__['a'](_this, extensions, capabilities);
    renderLists = new __WEBPACK_IMPORTED_MODULE_24__webgl_WebGLRenderLists_js__['a']();
    renderStates = new __WEBPACK_IMPORTED_MODULE_25__webgl_WebGLRenderStates_js__['a']();
    background = new __WEBPACK_IMPORTED_MODULE_12__webgl_WebGLBackground_js__['a'](_this, state, objects, _premultipliedAlpha);
    bufferRenderer = new __WEBPACK_IMPORTED_MODULE_13__webgl_WebGLBufferRenderer_js__['a'](_gl, extensions, info, capabilities);
    indexedBufferRenderer = new __WEBPACK_IMPORTED_MODULE_18__webgl_WebGLIndexedBufferRenderer_js__['a'](_gl, extensions, info, capabilities);
    info.programs = programCache.programs;
    _this.context = _gl;
    _this.capabilities = capabilities;
    _this.extensions = extensions;
    _this.properties = properties;
    _this.renderLists = renderLists;
    _this.state = state;
    _this.info = info;
  }
  initGLContext();
  var vr = 'xr' in navigator ? new __WEBPACK_IMPORTED_MODULE_32__webvr_WebXRManager_js__['a'](_this) : new __WEBPACK_IMPORTED_MODULE_31__webvr_WebVRManager_js__['a'](_this);
  this.vr = vr;
  var shadowMap = new __WEBPACK_IMPORTED_MODULE_26__webgl_WebGLShadowMap_js__['a'](_this, objects, capabilities.maxTextureSize);
  this.shadowMap = shadowMap;
  this.getContext = function () {
    return _gl;
  };
  this.getContextAttributes = function () {
    return _gl.getContextAttributes();
  };
  this.forceContextLoss = function () {
    var extension = extensions.get('WEBGL_lose_context');
    if (extension)
      extension.loseContext();
  };
  this.forceContextRestore = function () {
    var extension = extensions.get('WEBGL_lose_context');
    if (extension)
      extension.restoreContext();
  };
  this.getPixelRatio = function () {
    return _pixelRatio;
  };
  this.setPixelRatio = function (value) {
    if (value === undefined)
      return;
    _pixelRatio = value;
    this.setSize(_width, _height, false);
  };
  this.getSize = function () {
    return {
      width: _width,
      height: _height
    };
  };
  this.setSize = function (width, height, updateStyle) {
    if (vr.isPresenting()) {
      console.warn('THREE.WebGLRenderer: Can\'t change size while VR device is presenting.');
      return;
    }
    _width = width;
    _height = height;
    _canvas.width = width * _pixelRatio;
    _canvas.height = height * _pixelRatio;
    if (updateStyle !== false) {
      _canvas.style.width = width + 'px';
      _canvas.style.height = height + 'px';
    }
    this.setViewport(0, 0, width, height);
  };
  this.getDrawingBufferSize = function () {
    return {
      width: _width * _pixelRatio,
      height: _height * _pixelRatio
    };
  };
  this.setDrawingBufferSize = function (width, height, pixelRatio) {
    _width = width;
    _height = height;
    _pixelRatio = pixelRatio;
    _canvas.width = width * pixelRatio;
    _canvas.height = height * pixelRatio;
    this.setViewport(0, 0, width, height);
  };
  this.getCurrentViewport = function () {
    return _currentViewport;
  };
  this.setViewport = function (x, y, width, height) {
    _viewport.set(x, _height - y - height, width, height);
    state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio));
  };
  this.setScissor = function (x, y, width, height) {
    _scissor.set(x, _height - y - height, width, height);
    state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio));
  };
  this.setScissorTest = function (boolean) {
    state.setScissorTest(_scissorTest = boolean);
  };
  this.getClearColor = function () {
    return background.getClearColor();
  };
  this.setClearColor = function () {
    background.setClearColor.apply(background, arguments);
  };
  this.getClearAlpha = function () {
    return background.getClearAlpha();
  };
  this.setClearAlpha = function () {
    background.setClearAlpha.apply(background, arguments);
  };
  this.clear = function (color, depth, stencil) {
    var bits = 0;
    if (color === undefined || color)
      bits |= _gl.COLOR_BUFFER_BIT;
    if (depth === undefined || depth)
      bits |= _gl.DEPTH_BUFFER_BIT;
    if (stencil === undefined || stencil)
      bits |= _gl.STENCIL_BUFFER_BIT;
    _gl.clear(bits);
  };
  this.clearColor = function () {
    this.clear(true, false, false);
  };
  this.clearDepth = function () {
    this.clear(false, true, false);
  };
  this.clearStencil = function () {
    this.clear(false, false, true);
  };
  this.clearTarget = function (renderTarget, color, depth, stencil) {
    this.setRenderTarget(renderTarget);
    this.clear(color, depth, stencil);
  };
  this.dispose = function () {
    _canvas.removeEventListener('webglcontextlost', onContextLost, false);
    _canvas.removeEventListener('webglcontextrestored', onContextRestore, false);
    renderLists.dispose();
    renderStates.dispose();
    properties.dispose();
    objects.dispose();
    vr.dispose();
    animation.stop();
  };
  function onContextLost(event) {
    event.preventDefault();
    console.log('THREE.WebGLRenderer: Context Lost.');
    _isContextLost = true;
  }
  function onContextRestore() {
    console.log('THREE.WebGLRenderer: Context Restored.');
    _isContextLost = false;
    initGLContext();
  }
  function onMaterialDispose(event) {
    var material = event.target;
    material.removeEventListener('dispose', onMaterialDispose);
    deallocateMaterial(material);
  }
  function deallocateMaterial(material) {
    releaseMaterialProgramReference(material);
    properties.remove(material);
  }
  function releaseMaterialProgramReference(material) {
    var programInfo = properties.get(material).program;
    material.program = undefined;
    if (programInfo !== undefined) {
      programCache.releaseProgram(programInfo);
    }
  }
  function renderObjectImmediate(object, program) {
    object.render(function (object) {
      _this.renderBufferImmediate(object, program);
    });
  }
  this.renderBufferImmediate = function (object, program) {
    state.initAttributes();
    var buffers = properties.get(object);
    if (object.hasPositions && !buffers.position)
      buffers.position = _gl.createBuffer();
    if (object.hasNormals && !buffers.normal)
      buffers.normal = _gl.createBuffer();
    if (object.hasUvs && !buffers.uv)
      buffers.uv = _gl.createBuffer();
    if (object.hasColors && !buffers.color)
      buffers.color = _gl.createBuffer();
    var programAttributes = program.getAttributes();
    if (object.hasPositions) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.position);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW);
      state.enableAttribute(programAttributes.position);
      _gl.vertexAttribPointer(programAttributes.position, 3, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasNormals) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.normal);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW);
      state.enableAttribute(programAttributes.normal);
      _gl.vertexAttribPointer(programAttributes.normal, 3, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasUvs) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.uv);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW);
      state.enableAttribute(programAttributes.uv);
      _gl.vertexAttribPointer(programAttributes.uv, 2, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasColors) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.color);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW);
      state.enableAttribute(programAttributes.color);
      _gl.vertexAttribPointer(programAttributes.color, 3, _gl.FLOAT, false, 0, 0);
    }
    state.disableUnusedAttributes();
    _gl.drawArrays(_gl.TRIANGLES, 0, object.count);
    object.count = 0;
  };
  this.renderBufferDirect = function (camera, fog, geometry, material, object, group) {
    var frontFaceCW = object.isMesh && object.normalMatrix.determinant() < 0;
    state.setMaterial(material, frontFaceCW);
    var program = setProgram(camera, fog, material, object);
    var updateBuffers = false;
    if (_currentGeometryProgram.geometry !== geometry.id || _currentGeometryProgram.program !== program.id || _currentGeometryProgram.wireframe !== (material.wireframe === true)) {
      _currentGeometryProgram.geometry = geometry.id;
      _currentGeometryProgram.program = program.id;
      _currentGeometryProgram.wireframe = material.wireframe === true;
      updateBuffers = true;
    }
    if (object.morphTargetInfluences) {
      morphtargets.update(object, geometry, material, program);
      updateBuffers = true;
    }
    var index = geometry.index;
    var position = geometry.attributes.position;
    var rangeFactor = 1;
    if (material.wireframe === true) {
      index = geometries.getWireframeAttribute(geometry);
      rangeFactor = 2;
    }
    var attribute;
    var renderer = bufferRenderer;
    if (index !== null) {
      attribute = attributes.get(index);
      renderer = indexedBufferRenderer;
      renderer.setIndex(attribute);
    }
    if (updateBuffers) {
      setupVertexAttributes(material, program, geometry);
      if (index !== null) {
        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
      }
    }
    var dataCount = Infinity;
    if (index !== null) {
      dataCount = index.count;
    } else if (position !== undefined) {
      dataCount = position.count;
    }
    var rangeStart = geometry.drawRange.start * rangeFactor;
    var rangeCount = geometry.drawRange.count * rangeFactor;
    var groupStart = group !== null ? group.start * rangeFactor : 0;
    var groupCount = group !== null ? group.count * rangeFactor : Infinity;
    var drawStart = Math.max(rangeStart, groupStart);
    var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
    var drawCount = Math.max(0, drawEnd - drawStart + 1);
    if (drawCount === 0)
      return;
    if (object.isMesh) {
      if (material.wireframe === true) {
        state.setLineWidth(material.wireframeLinewidth * getTargetPixelRatio());
        renderer.setMode(_gl.LINES);
      } else {
        switch (object.drawMode) {
        case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_73']:
          renderer.setMode(_gl.TRIANGLES);
          break;
        case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_72']:
          renderer.setMode(_gl.TRIANGLE_STRIP);
          break;
        case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_71']:
          renderer.setMode(_gl.TRIANGLE_FAN);
          break;
        }
      }
    } else if (object.isLine) {
      var lineWidth = material.linewidth;
      if (lineWidth === undefined)
        lineWidth = 1;
      state.setLineWidth(lineWidth * getTargetPixelRatio());
      if (object.isLineSegments) {
        renderer.setMode(_gl.LINES);
      } else if (object.isLineLoop) {
        renderer.setMode(_gl.LINE_LOOP);
      } else {
        renderer.setMode(_gl.LINE_STRIP);
      }
    } else if (object.isPoints) {
      renderer.setMode(_gl.POINTS);
    } else if (object.isSprite) {
      renderer.setMode(_gl.TRIANGLES);
    }
    if (geometry && geometry.isInstancedBufferGeometry) {
      if (geometry.maxInstancedCount > 0) {
        renderer.renderInstances(geometry, drawStart, drawCount);
      }
    } else {
      renderer.render(drawStart, drawCount);
    }
  };
  function setupVertexAttributes(material, program, geometry) {
    if (geometry && geometry.isInstancedBufferGeometry & !capabilities.isWebGL2) {
      if (extensions.get('ANGLE_instanced_arrays') === null) {
        console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }
    }
    state.initAttributes();
    var geometryAttributes = geometry.attributes;
    var programAttributes = program.getAttributes();
    var materialDefaultAttributeValues = material.defaultAttributeValues;
    for (var name in programAttributes) {
      var programAttribute = programAttributes[name];
      if (programAttribute >= 0) {
        var geometryAttribute = geometryAttributes[name];
        if (geometryAttribute !== undefined) {
          var normalized = geometryAttribute.normalized;
          var size = geometryAttribute.itemSize;
          var attribute = attributes.get(geometryAttribute);
          if (attribute === undefined)
            continue;
          var buffer = attribute.buffer;
          var type = attribute.type;
          var bytesPerElement = attribute.bytesPerElement;
          if (geometryAttribute.isInterleavedBufferAttribute) {
            var data = geometryAttribute.data;
            var stride = data.stride;
            var offset = geometryAttribute.offset;
            if (data && data.isInstancedInterleavedBuffer) {
              state.enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);
              if (geometry.maxInstancedCount === undefined) {
                geometry.maxInstancedCount = data.meshPerAttribute * data.count;
              }
            } else {
              state.enableAttribute(programAttribute);
            }
            _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
            _gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement);
          } else {
            if (geometryAttribute.isInstancedBufferAttribute) {
              state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
              if (geometry.maxInstancedCount === undefined) {
                geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
              }
            } else {
              state.enableAttribute(programAttribute);
            }
            _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
            _gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);
          }
        } else if (materialDefaultAttributeValues !== undefined) {
          var value = materialDefaultAttributeValues[name];
          if (value !== undefined) {
            switch (value.length) {
            case 2:
              _gl.vertexAttrib2fv(programAttribute, value);
              break;
            case 3:
              _gl.vertexAttrib3fv(programAttribute, value);
              break;
            case 4:
              _gl.vertexAttrib4fv(programAttribute, value);
              break;
            default:
              _gl.vertexAttrib1fv(programAttribute, value);
            }
          }
        }
      }
    }
    state.disableUnusedAttributes();
  }
  this.compile = function (scene, camera) {
    currentRenderState = renderStates.get(scene, camera);
    currentRenderState.init();
    scene.traverse(function (object) {
      if (object.isLight) {
        currentRenderState.pushLight(object);
        if (object.castShadow) {
          currentRenderState.pushShadow(object);
        }
      }
    });
    currentRenderState.setupLights(camera);
    scene.traverse(function (object) {
      if (object.material) {
        if (Array.isArray(object.material)) {
          for (var i = 0; i < object.material.length; i++) {
            initMaterial(object.material[i], scene.fog, object);
          }
        } else {
          initMaterial(object.material, scene.fog, object);
        }
      }
    });
  };
  var onAnimationFrameCallback = null;
  function onAnimationFrame(time) {
    if (vr.isPresenting())
      return;
    if (onAnimationFrameCallback)
      onAnimationFrameCallback(time);
  }
  var animation = new __WEBPACK_IMPORTED_MODULE_10__webgl_WebGLAnimation_js__['a']();
  animation.setAnimationLoop(onAnimationFrame);
  if (typeof window !== 'undefined')
    animation.setContext(window);
  this.setAnimationLoop = function (callback) {
    onAnimationFrameCallback = callback;
    vr.setAnimationLoop(callback);
    animation.start();
  };
  this.render = function (scene, camera, renderTarget, forceClear) {
    if (!(camera && camera.isCamera)) {
      console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
      return;
    }
    if (_isContextLost)
      return;
    _currentGeometryProgram.geometry = null;
    _currentGeometryProgram.program = null;
    _currentGeometryProgram.wireframe = false;
    _currentMaterialId = -1;
    _currentCamera = null;
    if (scene.autoUpdate === true)
      scene.updateMatrixWorld();
    if (camera.parent === null)
      camera.updateMatrixWorld();
    if (vr.enabled) {
      camera = vr.getCamera(camera);
    }
    currentRenderState = renderStates.get(scene, camera);
    currentRenderState.init();
    scene.onBeforeRender(_this, scene, camera, renderTarget);
    _projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromMatrix(_projScreenMatrix);
    _localClippingEnabled = this.localClippingEnabled;
    _clippingEnabled = _clipping.init(this.clippingPlanes, _localClippingEnabled, camera);
    currentRenderList = renderLists.get(scene, camera);
    currentRenderList.init();
    projectObject(scene, camera, _this.sortObjects);
    if (_this.sortObjects === true) {
      currentRenderList.sort();
    }
    if (_clippingEnabled)
      _clipping.beginShadows();
    var shadowsArray = currentRenderState.state.shadowsArray;
    shadowMap.render(shadowsArray, scene, camera);
    currentRenderState.setupLights(camera);
    if (_clippingEnabled)
      _clipping.endShadows();
    if (this.info.autoReset)
      this.info.reset();
    if (renderTarget === undefined) {
      renderTarget = null;
    }
    this.setRenderTarget(renderTarget);
    background.render(currentRenderList, scene, camera, forceClear);
    var opaqueObjects = currentRenderList.opaque;
    var transparentObjects = currentRenderList.transparent;
    if (scene.overrideMaterial) {
      var overrideMaterial = scene.overrideMaterial;
      if (opaqueObjects.length)
        renderObjects(opaqueObjects, scene, camera, overrideMaterial);
      if (transparentObjects.length)
        renderObjects(transparentObjects, scene, camera, overrideMaterial);
    } else {
      if (opaqueObjects.length)
        renderObjects(opaqueObjects, scene, camera);
      if (transparentObjects.length)
        renderObjects(transparentObjects, scene, camera);
    }
    if (renderTarget) {
      textures.updateRenderTargetMipmap(renderTarget);
    }
    state.buffers.depth.setTest(true);
    state.buffers.depth.setMask(true);
    state.buffers.color.setMask(true);
    state.setPolygonOffset(false);
    scene.onAfterRender(_this, scene, camera);
    if (vr.enabled) {
      vr.submitFrame();
    }
    currentRenderList = null;
    currentRenderState = null;
  };
  function projectObject(object, camera, sortObjects) {
    if (object.visible === false)
      return;
    var visible = object.layers.test(camera.layers);
    if (visible) {
      if (object.isLight) {
        currentRenderState.pushLight(object);
        if (object.castShadow) {
          currentRenderState.pushShadow(object);
        }
      } else if (object.isSprite) {
        if (!object.frustumCulled || _frustum.intersectsSprite(object)) {
          if (sortObjects) {
            _vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
          }
          var geometry = objects.update(object);
          var material = object.material;
          currentRenderList.push(object, geometry, material, _vector3.z, null);
        }
      } else if (object.isImmediateRenderObject) {
        if (sortObjects) {
          _vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
        }
        currentRenderList.push(object, null, object.material, _vector3.z, null);
      } else if (object.isMesh || object.isLine || object.isPoints) {
        if (object.isSkinnedMesh) {
          object.skeleton.update();
        }
        if (!object.frustumCulled || _frustum.intersectsObject(object)) {
          if (sortObjects) {
            _vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
          }
          var geometry = objects.update(object);
          var material = object.material;
          if (Array.isArray(material)) {
            var groups = geometry.groups;
            for (var i = 0, l = groups.length; i < l; i++) {
              var group = groups[i];
              var groupMaterial = material[group.materialIndex];
              if (groupMaterial && groupMaterial.visible) {
                currentRenderList.push(object, geometry, groupMaterial, _vector3.z, group);
              }
            }
          } else if (material.visible) {
            currentRenderList.push(object, geometry, material, _vector3.z, null);
          }
        }
      }
    }
    var children = object.children;
    for (var i = 0, l = children.length; i < l; i++) {
      projectObject(children[i], camera, sortObjects);
    }
  }
  function renderObjects(renderList, scene, camera, overrideMaterial) {
    for (var i = 0, l = renderList.length; i < l; i++) {
      var renderItem = renderList[i];
      var object = renderItem.object;
      var geometry = renderItem.geometry;
      var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
      var group = renderItem.group;
      if (camera.isArrayCamera) {
        _currentArrayCamera = camera;
        var cameras = camera.cameras;
        for (var j = 0, jl = cameras.length; j < jl; j++) {
          var camera2 = cameras[j];
          if (object.layers.test(camera2.layers)) {
            if ('viewport' in camera2) {
              state.viewport(_currentViewport.copy(camera2.viewport));
            } else {
              var bounds = camera2.bounds;
              var x = bounds.x * _width;
              var y = bounds.y * _height;
              var width = bounds.z * _width;
              var height = bounds.w * _height;
              state.viewport(_currentViewport.set(x, y, width, height).multiplyScalar(_pixelRatio));
            }
            currentRenderState.setupLights(camera2);
            renderObject(object, scene, camera2, geometry, material, group);
          }
        }
      } else {
        _currentArrayCamera = null;
        renderObject(object, scene, camera, geometry, material, group);
      }
    }
  }
  function renderObject(object, scene, camera, geometry, material, group) {
    object.onBeforeRender(_this, scene, camera, geometry, material, group);
    currentRenderState = renderStates.get(scene, _currentArrayCamera || camera);
    object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
    object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
    if (object.isImmediateRenderObject) {
      state.setMaterial(material);
      var program = setProgram(camera, scene.fog, material, object);
      _currentGeometryProgram.geometry = null;
      _currentGeometryProgram.program = null;
      _currentGeometryProgram.wireframe = false;
      renderObjectImmediate(object, program);
    } else {
      _this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
    }
    object.onAfterRender(_this, scene, camera, geometry, material, group);
    currentRenderState = renderStates.get(scene, _currentArrayCamera || camera);
  }
  function initMaterial(material, fog, object) {
    var materialProperties = properties.get(material);
    var lights = currentRenderState.state.lights;
    var shadowsArray = currentRenderState.state.shadowsArray;
    var lightsHash = materialProperties.lightsHash;
    var lightsStateHash = lights.state.hash;
    var parameters = programCache.getParameters(material, lights.state, shadowsArray, fog, _clipping.numPlanes, _clipping.numIntersection, object);
    var code = programCache.getProgramCode(material, parameters);
    var program = materialProperties.program;
    var programChange = true;
    if (program === undefined) {
      material.addEventListener('dispose', onMaterialDispose);
    } else if (program.code !== code) {
      releaseMaterialProgramReference(material);
    } else if (lightsHash.stateID !== lightsStateHash.stateID || lightsHash.directionalLength !== lightsStateHash.directionalLength || lightsHash.pointLength !== lightsStateHash.pointLength || lightsHash.spotLength !== lightsStateHash.spotLength || lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength || lightsHash.hemiLength !== lightsStateHash.hemiLength || lightsHash.shadowsLength !== lightsStateHash.shadowsLength) {
      lightsHash.stateID = lightsStateHash.stateID;
      lightsHash.directionalLength = lightsStateHash.directionalLength;
      lightsHash.pointLength = lightsStateHash.pointLength;
      lightsHash.spotLength = lightsStateHash.spotLength;
      lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
      lightsHash.hemiLength = lightsStateHash.hemiLength;
      lightsHash.shadowsLength = lightsStateHash.shadowsLength;
      programChange = false;
    } else if (parameters.shaderID !== undefined) {
      return;
    } else {
      programChange = false;
    }
    if (programChange) {
      if (parameters.shaderID) {
        var shader = __WEBPACK_IMPORTED_MODULE_5__shaders_ShaderLib_js__['a'][parameters.shaderID];
        materialProperties.shader = {
          name: material.type,
          uniforms: __WEBPACK_IMPORTED_MODULE_7__shaders_UniformsUtils_js__['a'].clone(shader.uniforms),
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
        };
      } else {
        materialProperties.shader = {
          name: material.type,
          uniforms: material.uniforms,
          vertexShader: material.vertexShader,
          fragmentShader: material.fragmentShader
        };
      }
      material.onBeforeCompile(materialProperties.shader, _this);
      code = programCache.getProgramCode(material, parameters);
      program = programCache.acquireProgram(material, materialProperties.shader, parameters, code);
      materialProperties.program = program;
      material.program = program;
    }
    var programAttributes = program.getAttributes();
    if (material.morphTargets) {
      material.numSupportedMorphTargets = 0;
      for (var i = 0; i < _this.maxMorphTargets; i++) {
        if (programAttributes['morphTarget' + i] >= 0) {
          material.numSupportedMorphTargets++;
        }
      }
    }
    if (material.morphNormals) {
      material.numSupportedMorphNormals = 0;
      for (var i = 0; i < _this.maxMorphNormals; i++) {
        if (programAttributes['morphNormal' + i] >= 0) {
          material.numSupportedMorphNormals++;
        }
      }
    }
    var uniforms = materialProperties.shader.uniforms;
    if (!material.isShaderMaterial && !material.isRawShaderMaterial || material.clipping === true) {
      materialProperties.numClippingPlanes = _clipping.numPlanes;
      materialProperties.numIntersection = _clipping.numIntersection;
      uniforms.clippingPlanes = _clipping.uniform;
    }
    materialProperties.fog = fog;
    if (lightsHash === undefined) {
      materialProperties.lightsHash = lightsHash = {};
    }
    lightsHash.stateID = lightsStateHash.stateID;
    lightsHash.directionalLength = lightsStateHash.directionalLength;
    lightsHash.pointLength = lightsStateHash.pointLength;
    lightsHash.spotLength = lightsStateHash.spotLength;
    lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
    lightsHash.hemiLength = lightsStateHash.hemiLength;
    lightsHash.shadowsLength = lightsStateHash.shadowsLength;
    if (material.lights) {
      uniforms.ambientLightColor.value = lights.state.ambient;
      uniforms.directionalLights.value = lights.state.directional;
      uniforms.spotLights.value = lights.state.spot;
      uniforms.rectAreaLights.value = lights.state.rectArea;
      uniforms.pointLights.value = lights.state.point;
      uniforms.hemisphereLights.value = lights.state.hemi;
      uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
      uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
      uniforms.spotShadowMap.value = lights.state.spotShadowMap;
      uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
      uniforms.pointShadowMap.value = lights.state.pointShadowMap;
      uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
    }
    var progUniforms = materialProperties.program.getUniforms(), uniformsList = __WEBPACK_IMPORTED_MODULE_29__webgl_WebGLUniforms_js__['a'].seqWithValue(progUniforms.seq, uniforms);
    materialProperties.uniformsList = uniformsList;
  }
  function setProgram(camera, fog, material, object) {
    _usedTextureUnits = 0;
    var materialProperties = properties.get(material);
    var lights = currentRenderState.state.lights;
    var lightsHash = materialProperties.lightsHash;
    var lightsStateHash = lights.state.hash;
    if (_clippingEnabled) {
      if (_localClippingEnabled || camera !== _currentCamera) {
        var useCache = camera === _currentCamera && material.id === _currentMaterialId;
        _clipping.setState(material.clippingPlanes, material.clipIntersection, material.clipShadows, camera, materialProperties, useCache);
      }
    }
    if (material.needsUpdate === false) {
      if (materialProperties.program === undefined) {
        material.needsUpdate = true;
      } else if (material.fog && materialProperties.fog !== fog) {
        material.needsUpdate = true;
      } else if (material.lights && (lightsHash.stateID !== lightsStateHash.stateID || lightsHash.directionalLength !== lightsStateHash.directionalLength || lightsHash.pointLength !== lightsStateHash.pointLength || lightsHash.spotLength !== lightsStateHash.spotLength || lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength || lightsHash.hemiLength !== lightsStateHash.hemiLength || lightsHash.shadowsLength !== lightsStateHash.shadowsLength)) {
        material.needsUpdate = true;
      } else if (materialProperties.numClippingPlanes !== undefined && (materialProperties.numClippingPlanes !== _clipping.numPlanes || materialProperties.numIntersection !== _clipping.numIntersection)) {
        material.needsUpdate = true;
      }
    }
    if (material.needsUpdate) {
      initMaterial(material, fog, object);
      material.needsUpdate = false;
    }
    var refreshProgram = false;
    var refreshMaterial = false;
    var refreshLights = false;
    var program = materialProperties.program, p_uniforms = program.getUniforms(), m_uniforms = materialProperties.shader.uniforms;
    if (state.useProgram(program.program)) {
      refreshProgram = true;
      refreshMaterial = true;
      refreshLights = true;
    }
    if (material.id !== _currentMaterialId) {
      _currentMaterialId = material.id;
      refreshMaterial = true;
    }
    if (refreshProgram || _currentCamera !== camera) {
      p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);
      if (capabilities.logarithmicDepthBuffer) {
        p_uniforms.setValue(_gl, 'logDepthBufFC', 2 / (Math.log(camera.far + 1) / Math.LN2));
      }
      if (_currentCamera !== camera) {
        _currentCamera = camera;
        refreshMaterial = true;
        refreshLights = true;
      }
      if (material.isShaderMaterial || material.isMeshPhongMaterial || material.isMeshStandardMaterial || material.envMap) {
        var uCamPos = p_uniforms.map.cameraPosition;
        if (uCamPos !== undefined) {
          uCamPos.setValue(_gl, _vector3.setFromMatrixPosition(camera.matrixWorld));
        }
      }
      if (material.isMeshPhongMaterial || material.isMeshLambertMaterial || material.isMeshBasicMaterial || material.isMeshStandardMaterial || material.isShaderMaterial || material.skinning) {
        p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);
      }
    }
    if (material.skinning) {
      p_uniforms.setOptional(_gl, object, 'bindMatrix');
      p_uniforms.setOptional(_gl, object, 'bindMatrixInverse');
      var skeleton = object.skeleton;
      if (skeleton) {
        var bones = skeleton.bones;
        if (capabilities.floatVertexTextures) {
          if (skeleton.boneTexture === undefined) {
            var size = Math.sqrt(bones.length * 4);
            size = __WEBPACK_IMPORTED_MODULE_1__math_Math_js__['a'].ceilPowerOfTwo(size);
            size = Math.max(size, 4);
            var boneMatrices = new Float32Array(size * size * 4);
            boneMatrices.set(skeleton.boneMatrices);
            var boneTexture = new __WEBPACK_IMPORTED_MODULE_2__textures_DataTexture_js__['a'](boneMatrices, size, size, __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'], __WEBPACK_IMPORTED_MODULE_0__constants_js__['E']);
            boneTexture.needsUpdate = true;
            skeleton.boneMatrices = boneMatrices;
            skeleton.boneTexture = boneTexture;
            skeleton.boneTextureSize = size;
          }
          p_uniforms.setValue(_gl, 'boneTexture', skeleton.boneTexture);
          p_uniforms.setValue(_gl, 'boneTextureSize', skeleton.boneTextureSize);
        } else {
          p_uniforms.setOptional(_gl, skeleton, 'boneMatrices');
        }
      }
    }
    if (refreshMaterial) {
      p_uniforms.setValue(_gl, 'toneMappingExposure', _this.toneMappingExposure);
      p_uniforms.setValue(_gl, 'toneMappingWhitePoint', _this.toneMappingWhitePoint);
      if (material.lights) {
        markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
      }
      if (fog && material.fog) {
        refreshUniformsFog(m_uniforms, fog);
      }
      if (material.isMeshBasicMaterial) {
        refreshUniformsCommon(m_uniforms, material);
      } else if (material.isMeshLambertMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        refreshUniformsLambert(m_uniforms, material);
      } else if (material.isMeshPhongMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        if (material.isMeshToonMaterial) {
          refreshUniformsToon(m_uniforms, material);
        } else {
          refreshUniformsPhong(m_uniforms, material);
        }
      } else if (material.isMeshStandardMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        if (material.isMeshPhysicalMaterial) {
          refreshUniformsPhysical(m_uniforms, material);
        } else {
          refreshUniformsStandard(m_uniforms, material);
        }
      } else if (material.isMeshDepthMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        refreshUniformsDepth(m_uniforms, material);
      } else if (material.isMeshDistanceMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        refreshUniformsDistance(m_uniforms, material);
      } else if (material.isMeshNormalMaterial) {
        refreshUniformsCommon(m_uniforms, material);
        refreshUniformsNormal(m_uniforms, material);
      } else if (material.isLineBasicMaterial) {
        refreshUniformsLine(m_uniforms, material);
        if (material.isLineDashedMaterial) {
          refreshUniformsDash(m_uniforms, material);
        }
      } else if (material.isPointsMaterial) {
        refreshUniformsPoints(m_uniforms, material);
      } else if (material.isSpriteMaterial) {
        refreshUniformsSprites(m_uniforms, material);
      } else if (material.isShadowMaterial) {
        m_uniforms.color.value = material.color;
        m_uniforms.opacity.value = material.opacity;
      }
      if (m_uniforms.ltc_1 !== undefined)
        m_uniforms.ltc_1.value = __WEBPACK_IMPORTED_MODULE_6__shaders_UniformsLib_js__['a'].LTC_1;
      if (m_uniforms.ltc_2 !== undefined)
        m_uniforms.ltc_2.value = __WEBPACK_IMPORTED_MODULE_6__shaders_UniformsLib_js__['a'].LTC_2;
      __WEBPACK_IMPORTED_MODULE_29__webgl_WebGLUniforms_js__['a'].upload(_gl, materialProperties.uniformsList, m_uniforms, _this);
    }
    if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {
      __WEBPACK_IMPORTED_MODULE_29__webgl_WebGLUniforms_js__['a'].upload(_gl, materialProperties.uniformsList, m_uniforms, _this);
      material.uniformsNeedUpdate = false;
    }
    if (material.isSpriteMaterial) {
      p_uniforms.setValue(_gl, 'center', object.center);
    }
    p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
    p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);
    p_uniforms.setValue(_gl, 'modelMatrix', object.matrixWorld);
    return program;
  }
  function refreshUniformsCommon(uniforms, material) {
    uniforms.opacity.value = material.opacity;
    if (material.color) {
      uniforms.diffuse.value = material.color;
    }
    if (material.emissive) {
      uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
    }
    if (material.map) {
      uniforms.map.value = material.map;
    }
    if (material.alphaMap) {
      uniforms.alphaMap.value = material.alphaMap;
    }
    if (material.specularMap) {
      uniforms.specularMap.value = material.specularMap;
    }
    if (material.envMap) {
      uniforms.envMap.value = material.envMap;
      uniforms.flipEnvMap.value = !(material.envMap && material.envMap.isCubeTexture) ? 1 : -1;
      uniforms.reflectivity.value = material.reflectivity;
      uniforms.refractionRatio.value = material.refractionRatio;
      uniforms.maxMipLevel.value = properties.get(material.envMap).__maxMipLevel;
    }
    if (material.lightMap) {
      uniforms.lightMap.value = material.lightMap;
      uniforms.lightMapIntensity.value = material.lightMapIntensity;
    }
    if (material.aoMap) {
      uniforms.aoMap.value = material.aoMap;
      uniforms.aoMapIntensity.value = material.aoMapIntensity;
    }
    var uvScaleMap;
    if (material.map) {
      uvScaleMap = material.map;
    } else if (material.specularMap) {
      uvScaleMap = material.specularMap;
    } else if (material.displacementMap) {
      uvScaleMap = material.displacementMap;
    } else if (material.normalMap) {
      uvScaleMap = material.normalMap;
    } else if (material.bumpMap) {
      uvScaleMap = material.bumpMap;
    } else if (material.roughnessMap) {
      uvScaleMap = material.roughnessMap;
    } else if (material.metalnessMap) {
      uvScaleMap = material.metalnessMap;
    } else if (material.alphaMap) {
      uvScaleMap = material.alphaMap;
    } else if (material.emissiveMap) {
      uvScaleMap = material.emissiveMap;
    }
    if (uvScaleMap !== undefined) {
      if (uvScaleMap.isWebGLRenderTarget) {
        uvScaleMap = uvScaleMap.texture;
      }
      if (uvScaleMap.matrixAutoUpdate === true) {
        uvScaleMap.updateMatrix();
      }
      uniforms.uvTransform.value.copy(uvScaleMap.matrix);
    }
  }
  function refreshUniformsLine(uniforms, material) {
    uniforms.diffuse.value = material.color;
    uniforms.opacity.value = material.opacity;
  }
  function refreshUniformsDash(uniforms, material) {
    uniforms.dashSize.value = material.dashSize;
    uniforms.totalSize.value = material.dashSize + material.gapSize;
    uniforms.scale.value = material.scale;
  }
  function refreshUniformsPoints(uniforms, material) {
    uniforms.diffuse.value = material.color;
    uniforms.opacity.value = material.opacity;
    uniforms.size.value = material.size * _pixelRatio;
    uniforms.scale.value = _height * 0.5;
    uniforms.map.value = material.map;
    if (material.map !== null) {
      if (material.map.matrixAutoUpdate === true) {
        material.map.updateMatrix();
      }
      uniforms.uvTransform.value.copy(material.map.matrix);
    }
  }
  function refreshUniformsSprites(uniforms, material) {
    uniforms.diffuse.value = material.color;
    uniforms.opacity.value = material.opacity;
    uniforms.rotation.value = material.rotation;
    uniforms.map.value = material.map;
    if (material.map !== null) {
      if (material.map.matrixAutoUpdate === true) {
        material.map.updateMatrix();
      }
      uniforms.uvTransform.value.copy(material.map.matrix);
    }
  }
  function refreshUniformsFog(uniforms, fog) {
    uniforms.fogColor.value = fog.color;
    if (fog.isFog) {
      uniforms.fogNear.value = fog.near;
      uniforms.fogFar.value = fog.far;
    } else if (fog.isFogExp2) {
      uniforms.fogDensity.value = fog.density;
    }
  }
  function refreshUniformsLambert(uniforms, material) {
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
  }
  function refreshUniformsPhong(uniforms, material) {
    uniforms.specular.value = material.specular;
    uniforms.shininess.value = Math.max(material.shininess, 0.0001);
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsToon(uniforms, material) {
    refreshUniformsPhong(uniforms, material);
    if (material.gradientMap) {
      uniforms.gradientMap.value = material.gradientMap;
    }
  }
  function refreshUniformsStandard(uniforms, material) {
    uniforms.roughness.value = material.roughness;
    uniforms.metalness.value = material.metalness;
    if (material.roughnessMap) {
      uniforms.roughnessMap.value = material.roughnessMap;
    }
    if (material.metalnessMap) {
      uniforms.metalnessMap.value = material.metalnessMap;
    }
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
    if (material.envMap) {
      uniforms.envMapIntensity.value = material.envMapIntensity;
    }
  }
  function refreshUniformsPhysical(uniforms, material) {
    refreshUniformsStandard(uniforms, material);
    uniforms.reflectivity.value = material.reflectivity;
    uniforms.clearCoat.value = material.clearCoat;
    uniforms.clearCoatRoughness.value = material.clearCoatRoughness;
  }
  function refreshUniformsDepth(uniforms, material) {
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsDistance(uniforms, material) {
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
    uniforms.referencePosition.value.copy(material.referencePosition);
    uniforms.nearDistance.value = material.nearDistance;
    uniforms.farDistance.value = material.farDistance;
  }
  function refreshUniformsNormal(uniforms, material) {
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'])
        uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function markUniformsLightsNeedsUpdate(uniforms, value) {
    uniforms.ambientLightColor.needsUpdate = value;
    uniforms.directionalLights.needsUpdate = value;
    uniforms.pointLights.needsUpdate = value;
    uniforms.spotLights.needsUpdate = value;
    uniforms.rectAreaLights.needsUpdate = value;
    uniforms.hemisphereLights.needsUpdate = value;
  }
  function allocTextureUnit() {
    var textureUnit = _usedTextureUnits;
    if (textureUnit >= capabilities.maxTextures) {
      console.warn('THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);
    }
    _usedTextureUnits += 1;
    return textureUnit;
  }
  this.allocTextureUnit = allocTextureUnit;
  this.setTexture2D = function () {
    var warned = false;
    return function setTexture2D(texture, slot) {
      if (texture && texture.isWebGLRenderTarget) {
        if (!warned) {
          console.warn('THREE.WebGLRenderer.setTexture2D: don\'t use render targets as textures. Use their .texture property instead.');
          warned = true;
        }
        texture = texture.texture;
      }
      textures.setTexture2D(texture, slot);
    };
  }();
  this.setTexture = function () {
    var warned = false;
    return function setTexture(texture, slot) {
      if (!warned) {
        console.warn('THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead.');
        warned = true;
      }
      textures.setTexture2D(texture, slot);
    };
  }();
  this.setTextureCube = function () {
    var warned = false;
    return function setTextureCube(texture, slot) {
      if (texture && texture.isWebGLRenderTargetCube) {
        if (!warned) {
          console.warn('THREE.WebGLRenderer.setTextureCube: don\'t use cube render targets as textures. Use their .texture property instead.');
          warned = true;
        }
        texture = texture.texture;
      }
      if (texture && texture.isCubeTexture || Array.isArray(texture.image) && texture.image.length === 6) {
        textures.setTextureCube(texture, slot);
      } else {
        textures.setTextureCubeDynamic(texture, slot);
      }
    };
  }();
  this.setFramebuffer = function (value) {
    _framebuffer = value;
  };
  this.getRenderTarget = function () {
    return _currentRenderTarget;
  };
  this.setRenderTarget = function (renderTarget) {
    _currentRenderTarget = renderTarget;
    if (renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined) {
      textures.setupRenderTarget(renderTarget);
    }
    var framebuffer = _framebuffer;
    var isCube = false;
    if (renderTarget) {
      var __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;
      if (renderTarget.isWebGLRenderTargetCube) {
        framebuffer = __webglFramebuffer[renderTarget.activeCubeFace];
        isCube = true;
      } else {
        framebuffer = __webglFramebuffer;
      }
      _currentViewport.copy(renderTarget.viewport);
      _currentScissor.copy(renderTarget.scissor);
      _currentScissorTest = renderTarget.scissorTest;
    } else {
      _currentViewport.copy(_viewport).multiplyScalar(_pixelRatio);
      _currentScissor.copy(_scissor).multiplyScalar(_pixelRatio);
      _currentScissorTest = _scissorTest;
    }
    if (_currentFramebuffer !== framebuffer) {
      _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
      _currentFramebuffer = framebuffer;
    }
    state.viewport(_currentViewport);
    state.scissor(_currentScissor);
    state.setScissorTest(_currentScissorTest);
    if (isCube) {
      var textureProperties = properties.get(renderTarget.texture);
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderTarget.activeCubeFace, textureProperties.__webglTexture, renderTarget.activeMipMapLevel);
    }
  };
  this.readRenderTargetPixels = function (renderTarget, x, y, width, height, buffer) {
    if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
      console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
      return;
    }
    var framebuffer = properties.get(renderTarget).__webglFramebuffer;
    if (framebuffer) {
      var restore = false;
      if (framebuffer !== _currentFramebuffer) {
        _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
        restore = true;
      }
      try {
        var texture = renderTarget.texture;
        var textureFormat = texture.format;
        var textureType = texture.type;
        if (textureFormat !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'] && utils.convert(textureFormat) !== _gl.getParameter(_gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
          return;
        }
        if (textureType !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_76'] && utils.convert(textureType) !== _gl.getParameter(_gl.IMPLEMENTATION_COLOR_READ_TYPE) && !(textureType === __WEBPACK_IMPORTED_MODULE_0__constants_js__['E'] && (capabilities.isWebGL2 || extensions.get('OES_texture_float') || extensions.get('WEBGL_color_buffer_float'))) && !(textureType === __WEBPACK_IMPORTED_MODULE_0__constants_js__['L'] && (capabilities.isWebGL2 ? extensions.get('EXT_color_buffer_float') : extensions.get('EXT_color_buffer_half_float')))) {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
          return;
        }
        if (_gl.checkFramebufferStatus(_gl.FRAMEBUFFER) === _gl.FRAMEBUFFER_COMPLETE) {
          if (x >= 0 && x <= renderTarget.width - width && y >= 0 && y <= renderTarget.height - height) {
            _gl.readPixels(x, y, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);
          }
        } else {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');
        }
      } finally {
        if (restore) {
          _gl.bindFramebuffer(_gl.FRAMEBUFFER, _currentFramebuffer);
        }
      }
    }
  };
  this.copyFramebufferToTexture = function (position, texture, level) {
    var width = texture.image.width;
    var height = texture.image.height;
    var glFormat = utils.convert(texture.format);
    this.setTexture2D(texture, 0);
    _gl.copyTexImage2D(_gl.TEXTURE_2D, level || 0, glFormat, position.x, position.y, width, height, 0);
  };
  this.copyTextureToTexture = function (position, srcTexture, dstTexture, level) {
    var width = srcTexture.image.width;
    var height = srcTexture.image.height;
    var glFormat = utils.convert(dstTexture.format);
    var glType = utils.convert(dstTexture.type);
    this.setTexture2D(dstTexture, 0);
    if (srcTexture.isDataTexture) {
      _gl.texSubImage2D(_gl.TEXTURE_2D, level || 0, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data);
    } else {
      _gl.texSubImage2D(_gl.TEXTURE_2D, level || 0, position.x, position.y, glFormat, glType, srcTexture.image);
    }
  };
}