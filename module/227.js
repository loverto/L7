'use strict';
require.d(exports, 'a', function () {
  return WebGLState;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__ = require('./11');
function WebGLState(gl, extensions, utils, capabilities) {
  function ColorBuffer() {
    var locked = false;
    var color = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a']();
    var currentColorMask = null;
    var currentColorClear = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a'](0, 0, 0, 0);
    return {
      setMask: function (colorMask) {
        if (currentColorMask !== colorMask && !locked) {
          gl.colorMask(colorMask, colorMask, colorMask, colorMask);
          currentColorMask = colorMask;
        }
      },
      setLocked: function (lock) {
        locked = lock;
      },
      setClear: function (r, g, b, a, premultipliedAlpha) {
        if (premultipliedAlpha === true) {
          r *= a;
          g *= a;
          b *= a;
        }
        color.set(r, g, b, a);
        if (currentColorClear.equals(color) === false) {
          gl.clearColor(r, g, b, a);
          currentColorClear.copy(color);
        }
      },
      reset: function () {
        locked = false;
        currentColorMask = null;
        currentColorClear.set(-1, 0, 0, 0);
      }
    };
  }
  function DepthBuffer() {
    var locked = false;
    var currentDepthMask = null;
    var currentDepthFunc = null;
    var currentDepthClear = null;
    return {
      setTest: function (depthTest) {
        if (depthTest) {
          enable(gl.DEPTH_TEST);
        } else {
          disable(gl.DEPTH_TEST);
        }
      },
      setMask: function (depthMask) {
        if (currentDepthMask !== depthMask && !locked) {
          gl.depthMask(depthMask);
          currentDepthMask = depthMask;
        }
      },
      setFunc: function (depthFunc) {
        if (currentDepthFunc !== depthFunc) {
          if (depthFunc) {
            switch (depthFunc) {
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_13']:
              gl.depthFunc(gl.NEVER);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['e']:
              gl.depthFunc(gl.ALWAYS);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['Q']:
              gl.depthFunc(gl.LESS);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['R']:
              gl.depthFunc(gl.LEQUAL);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['z']:
              gl.depthFunc(gl.EQUAL);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['K']:
              gl.depthFunc(gl.GEQUAL);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['J']:
              gl.depthFunc(gl.GREATER);
              break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_18']:
              gl.depthFunc(gl.NOTEQUAL);
              break;
            default:
              gl.depthFunc(gl.LEQUAL);
            }
          } else {
            gl.depthFunc(gl.LEQUAL);
          }
          currentDepthFunc = depthFunc;
        }
      },
      setLocked: function (lock) {
        locked = lock;
      },
      setClear: function (depth) {
        if (currentDepthClear !== depth) {
          gl.clearDepth(depth);
          currentDepthClear = depth;
        }
      },
      reset: function () {
        locked = false;
        currentDepthMask = null;
        currentDepthFunc = null;
        currentDepthClear = null;
      }
    };
  }
  function StencilBuffer() {
    var locked = false;
    var currentStencilMask = null;
    var currentStencilFunc = null;
    var currentStencilRef = null;
    var currentStencilFuncMask = null;
    var currentStencilFail = null;
    var currentStencilZFail = null;
    var currentStencilZPass = null;
    var currentStencilClear = null;
    return {
      setTest: function (stencilTest) {
        if (stencilTest) {
          enable(gl.STENCIL_TEST);
        } else {
          disable(gl.STENCIL_TEST);
        }
      },
      setMask: function (stencilMask) {
        if (currentStencilMask !== stencilMask && !locked) {
          gl.stencilMask(stencilMask);
          currentStencilMask = stencilMask;
        }
      },
      setFunc: function (stencilFunc, stencilRef, stencilMask) {
        if (currentStencilFunc !== stencilFunc || currentStencilRef !== stencilRef || currentStencilFuncMask !== stencilMask) {
          gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
          currentStencilFunc = stencilFunc;
          currentStencilRef = stencilRef;
          currentStencilFuncMask = stencilMask;
        }
      },
      setOp: function (stencilFail, stencilZFail, stencilZPass) {
        if (currentStencilFail !== stencilFail || currentStencilZFail !== stencilZFail || currentStencilZPass !== stencilZPass) {
          gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
          currentStencilFail = stencilFail;
          currentStencilZFail = stencilZFail;
          currentStencilZPass = stencilZPass;
        }
      },
      setLocked: function (lock) {
        locked = lock;
      },
      setClear: function (stencil) {
        if (currentStencilClear !== stencil) {
          gl.clearStencil(stencil);
          currentStencilClear = stencil;
        }
      },
      reset: function () {
        locked = false;
        currentStencilMask = null;
        currentStencilFunc = null;
        currentStencilRef = null;
        currentStencilFuncMask = null;
        currentStencilFail = null;
        currentStencilZFail = null;
        currentStencilZPass = null;
        currentStencilClear = null;
      }
    };
  }
  var colorBuffer = new ColorBuffer();
  var depthBuffer = new DepthBuffer();
  var stencilBuffer = new StencilBuffer();
  var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  var newAttributes = new Uint8Array(maxVertexAttributes);
  var enabledAttributes = new Uint8Array(maxVertexAttributes);
  var attributeDivisors = new Uint8Array(maxVertexAttributes);
  var enabledCapabilities = {};
  var compressedTextureFormats = null;
  var currentProgram = null;
  var currentBlendingEnabled = null;
  var currentBlending = null;
  var currentBlendEquation = null;
  var currentBlendSrc = null;
  var currentBlendDst = null;
  var currentBlendEquationAlpha = null;
  var currentBlendSrcAlpha = null;
  var currentBlendDstAlpha = null;
  var currentPremultipledAlpha = false;
  var currentFlipSided = null;
  var currentCullFace = null;
  var currentLineWidth = null;
  var currentPolygonOffsetFactor = null;
  var currentPolygonOffsetUnits = null;
  var maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  var lineWidthAvailable = false;
  var version = 0;
  var glVersion = gl.getParameter(gl.VERSION);
  if (glVersion.indexOf('WebGL') !== -1) {
    version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 1;
  } else if (glVersion.indexOf('OpenGL ES') !== -1) {
    version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 2;
  }
  var currentTextureSlot = null;
  var currentBoundTextures = {};
  var currentScissor = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a']();
  var currentViewport = new __WEBPACK_IMPORTED_MODULE_1__math_Vector4_js__['a']();
  function createTexture(type, target, count) {
    var data = new Uint8Array(4);
    var texture = gl.createTexture();
    gl.bindTexture(type, texture);
    gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    for (var i = 0; i < count; i++) {
      gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
    return texture;
  }
  var emptyTextures = {};
  emptyTextures[gl.TEXTURE_2D] = createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
  emptyTextures[gl.TEXTURE_CUBE_MAP] = createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
  colorBuffer.setClear(0, 0, 0, 1);
  depthBuffer.setClear(1);
  stencilBuffer.setClear(0);
  enable(gl.DEPTH_TEST);
  depthBuffer.setFunc(__WEBPACK_IMPORTED_MODULE_0__constants_js__['R']);
  setFlipSided(false);
  setCullFace(__WEBPACK_IMPORTED_MODULE_0__constants_js__['p']);
  enable(gl.CULL_FACE);
  setBlending(__WEBPACK_IMPORTED_MODULE_0__constants_js__['_14']);
  function initAttributes() {
    for (var i = 0, l = newAttributes.length; i < l; i++) {
      newAttributes[i] = 0;
    }
  }
  function enableAttribute(attribute) {
    enableAttributeAndDivisor(attribute, 0);
  }
  function enableAttributeAndDivisor(attribute, meshPerAttribute) {
    newAttributes[attribute] = 1;
    if (enabledAttributes[attribute] === 0) {
      gl.enableVertexAttribArray(attribute);
      enabledAttributes[attribute] = 1;
    }
    if (attributeDivisors[attribute] !== meshPerAttribute) {
      var extension = capabilities.isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');
      extension[capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
      attributeDivisors[attribute] = meshPerAttribute;
    }
  }
  function disableUnusedAttributes() {
    for (var i = 0, l = enabledAttributes.length; i !== l; ++i) {
      if (enabledAttributes[i] !== newAttributes[i]) {
        gl.disableVertexAttribArray(i);
        enabledAttributes[i] = 0;
      }
    }
  }
  function enable(id) {
    if (enabledCapabilities[id] !== true) {
      gl.enable(id);
      enabledCapabilities[id] = true;
    }
  }
  function disable(id) {
    if (enabledCapabilities[id] !== false) {
      gl.disable(id);
      enabledCapabilities[id] = false;
    }
  }
  function getCompressedTextureFormats() {
    if (compressedTextureFormats === null) {
      compressedTextureFormats = [];
      if (extensions.get('WEBGL_compressed_texture_pvrtc') || extensions.get('WEBGL_compressed_texture_s3tc') || extensions.get('WEBGL_compressed_texture_etc1') || extensions.get('WEBGL_compressed_texture_astc')) {
        var formats = gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS);
        for (var i = 0; i < formats.length; i++) {
          compressedTextureFormats.push(formats[i]);
        }
      }
    }
    return compressedTextureFormats;
  }
  function useProgram(program) {
    if (currentProgram !== program) {
      gl.useProgram(program);
      currentProgram = program;
      return true;
    }
    return false;
  }
  function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
    if (blending === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_14']) {
      if (currentBlendingEnabled) {
        disable(gl.BLEND);
        currentBlendingEnabled = false;
      }
      return;
    }
    if (!currentBlendingEnabled) {
      enable(gl.BLEND);
      currentBlendingEnabled = true;
    }
    if (blending !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['t']) {
      if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
        if (currentBlendEquation !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['a'] || currentBlendEquationAlpha !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['a']) {
          gl.blendEquation(gl.FUNC_ADD);
          currentBlendEquation = __WEBPACK_IMPORTED_MODULE_0__constants_js__['a'];
          currentBlendEquationAlpha = __WEBPACK_IMPORTED_MODULE_0__constants_js__['a'];
        }
        if (premultipliedAlpha) {
          switch (blending) {
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_17']:
            gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['c']:
            gl.blendFunc(gl.ONE, gl.ONE);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_69']:
            gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_8']:
            gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
            break;
          default:
            console.error('THREE.WebGLState: Invalid blending: ', blending);
            break;
          }
        } else {
          switch (blending) {
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_17']:
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['c']:
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_69']:
            gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
            break;
          case __WEBPACK_IMPORTED_MODULE_0__constants_js__['_8']:
            gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
            break;
          default:
            console.error('THREE.WebGLState: Invalid blending: ', blending);
            break;
          }
        }
        currentBlendSrc = null;
        currentBlendDst = null;
        currentBlendSrcAlpha = null;
        currentBlendDstAlpha = null;
        currentBlending = blending;
        currentPremultipledAlpha = premultipliedAlpha;
      }
      return;
    }
    blendEquationAlpha = blendEquationAlpha || blendEquation;
    blendSrcAlpha = blendSrcAlpha || blendSrc;
    blendDstAlpha = blendDstAlpha || blendDst;
    if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {
      gl.blendEquationSeparate(utils.convert(blendEquation), utils.convert(blendEquationAlpha));
      currentBlendEquation = blendEquation;
      currentBlendEquationAlpha = blendEquationAlpha;
    }
    if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {
      gl.blendFuncSeparate(utils.convert(blendSrc), utils.convert(blendDst), utils.convert(blendSrcAlpha), utils.convert(blendDstAlpha));
      currentBlendSrc = blendSrc;
      currentBlendDst = blendDst;
      currentBlendSrcAlpha = blendSrcAlpha;
      currentBlendDstAlpha = blendDstAlpha;
    }
    currentBlending = blending;
    currentPremultipledAlpha = null;
  }
  function setMaterial(material, frontFaceCW) {
    material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['w'] ? disable(gl.CULL_FACE) : enable(gl.CULL_FACE);
    var flipSided = material.side === __WEBPACK_IMPORTED_MODULE_0__constants_js__['f'];
    if (frontFaceCW)
      flipSided = !flipSided;
    setFlipSided(flipSided);
    material.blending === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_17'] && material.transparent === false ? setBlending(__WEBPACK_IMPORTED_MODULE_0__constants_js__['_14']) : setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);
    depthBuffer.setFunc(material.depthFunc);
    depthBuffer.setTest(material.depthTest);
    depthBuffer.setMask(material.depthWrite);
    colorBuffer.setMask(material.colorWrite);
    setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
  }
  function setFlipSided(flipSided) {
    if (currentFlipSided !== flipSided) {
      if (flipSided) {
        gl.frontFace(gl.CW);
      } else {
        gl.frontFace(gl.CCW);
      }
      currentFlipSided = flipSided;
    }
  }
  function setCullFace(cullFace) {
    if (cullFace !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['s']) {
      enable(gl.CULL_FACE);
      if (cullFace !== currentCullFace) {
        if (cullFace === __WEBPACK_IMPORTED_MODULE_0__constants_js__['p']) {
          gl.cullFace(gl.BACK);
        } else if (cullFace === __WEBPACK_IMPORTED_MODULE_0__constants_js__['q']) {
          gl.cullFace(gl.FRONT);
        } else {
          gl.cullFace(gl.FRONT_AND_BACK);
        }
      }
    } else {
      disable(gl.CULL_FACE);
    }
    currentCullFace = cullFace;
  }
  function setLineWidth(width) {
    if (width !== currentLineWidth) {
      if (lineWidthAvailable)
        gl.lineWidth(width);
      currentLineWidth = width;
    }
  }
  function setPolygonOffset(polygonOffset, factor, units) {
    if (polygonOffset) {
      enable(gl.POLYGON_OFFSET_FILL);
      if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
        gl.polygonOffset(factor, units);
        currentPolygonOffsetFactor = factor;
        currentPolygonOffsetUnits = units;
      }
    } else {
      disable(gl.POLYGON_OFFSET_FILL);
    }
  }
  function setScissorTest(scissorTest) {
    if (scissorTest) {
      enable(gl.SCISSOR_TEST);
    } else {
      disable(gl.SCISSOR_TEST);
    }
  }
  function activeTexture(webglSlot) {
    if (webglSlot === undefined)
      webglSlot = gl.TEXTURE0 + maxTextures - 1;
    if (currentTextureSlot !== webglSlot) {
      gl.activeTexture(webglSlot);
      currentTextureSlot = webglSlot;
    }
  }
  function bindTexture(webglType, webglTexture) {
    if (currentTextureSlot === null) {
      activeTexture();
    }
    var boundTexture = currentBoundTextures[currentTextureSlot];
    if (boundTexture === undefined) {
      boundTexture = {
        type: undefined,
        texture: undefined
      };
      currentBoundTextures[currentTextureSlot] = boundTexture;
    }
    if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
      gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);
      boundTexture.type = webglType;
      boundTexture.texture = webglTexture;
    }
  }
  function compressedTexImage2D() {
    try {
      gl.compressedTexImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }
  function texImage2D() {
    try {
      gl.texImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }
  function scissor(scissor) {
    if (currentScissor.equals(scissor) === false) {
      gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
      currentScissor.copy(scissor);
    }
  }
  function viewport(viewport) {
    if (currentViewport.equals(viewport) === false) {
      gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
      currentViewport.copy(viewport);
    }
  }
  function reset() {
    for (var i = 0; i < enabledAttributes.length; i++) {
      if (enabledAttributes[i] === 1) {
        gl.disableVertexAttribArray(i);
        enabledAttributes[i] = 0;
      }
    }
    enabledCapabilities = {};
    compressedTextureFormats = null;
    currentTextureSlot = null;
    currentBoundTextures = {};
    currentProgram = null;
    currentBlending = null;
    currentFlipSided = null;
    currentCullFace = null;
    colorBuffer.reset();
    depthBuffer.reset();
    stencilBuffer.reset();
  }
  return {
    buffers: {
      color: colorBuffer,
      depth: depthBuffer,
      stencil: stencilBuffer
    },
    initAttributes: initAttributes,
    enableAttribute: enableAttribute,
    enableAttributeAndDivisor: enableAttributeAndDivisor,
    disableUnusedAttributes: disableUnusedAttributes,
    enable: enable,
    disable: disable,
    getCompressedTextureFormats: getCompressedTextureFormats,
    useProgram: useProgram,
    setBlending: setBlending,
    setMaterial: setMaterial,
    setFlipSided: setFlipSided,
    setCullFace: setCullFace,
    setLineWidth: setLineWidth,
    setPolygonOffset: setPolygonOffset,
    setScissorTest: setScissorTest,
    activeTexture: activeTexture,
    bindTexture: bindTexture,
    compressedTexImage2D: compressedTexImage2D,
    texImage2D: texImage2D,
    scissor: scissor,
    viewport: viewport,
    reset: reset
  };
}