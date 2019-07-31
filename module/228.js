'use strict';
require.d(exports, 'a', function () {
  return WebGLTextures;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
var __WEBPACK_IMPORTED_MODULE_1__math_Math_js__ = require('./6');
function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {
  var _videoTextures = {};
  var _canvas;
  function clampToMaxSize(image, maxSize) {
    if (image.width > maxSize || image.height > maxSize) {
      if ('data' in image) {
        console.warn('THREE.WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
        return;
      }
      var scale = maxSize / Math.max(image.width, image.height);
      var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      canvas.width = Math.floor(image.width * scale);
      canvas.height = Math.floor(image.height * scale);
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
      console.warn('THREE.WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height);
      return canvas;
    }
    return image;
  }
  function isPowerOfTwo(image) {
    return __WEBPACK_IMPORTED_MODULE_1__math_Math_js__['a'].isPowerOfTwo(image.width) && __WEBPACK_IMPORTED_MODULE_1__math_Math_js__['a'].isPowerOfTwo(image.height);
  }
  function makePowerOfTwo(image) {
    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {
      if (_canvas === undefined)
        _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      _canvas.width = __WEBPACK_IMPORTED_MODULE_1__math_Math_js__['a'].floorPowerOfTwo(image.width);
      _canvas.height = __WEBPACK_IMPORTED_MODULE_1__math_Math_js__['a'].floorPowerOfTwo(image.height);
      var context = _canvas.getContext('2d');
      context.drawImage(image, 0, 0, _canvas.width, _canvas.height);
      console.warn('THREE.WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height);
      return _canvas;
    }
    return image;
  }
  function textureNeedsPowerOfTwo(texture) {
    if (capabilities.isWebGL2)
      return false;
    return texture.wrapS !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['k'] || texture.wrapT !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['k'] || texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'] && texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['T'];
  }
  function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {
    return texture.generateMipmaps && isPowerOfTwo && texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'] && texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['T'];
  }
  function generateMipmap(target, texture, width, height) {
    _gl.generateMipmap(target);
    var textureProperties = properties.get(texture);
    textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;
  }
  function getInternalFormat(glFormat, glType) {
    if (!capabilities.isWebGL2)
      return glFormat;
    if (glFormat === _gl.RGB) {
      if (glType === _gl.FLOAT)
        return _gl.RGB32F;
      if (glType === _gl.HALF_FLOAT)
        return _gl.RGB16F;
      if (glType === _gl.UNSIGNED_BYTE)
        return _gl.RGB8;
    }
    if (glFormat === _gl.RGBA) {
      if (glType === _gl.FLOAT)
        return _gl.RGBA32F;
      if (glType === _gl.HALF_FLOAT)
        return _gl.RGBA16F;
      if (glType === _gl.UNSIGNED_BYTE)
        return _gl.RGBA8;
    }
    return glFormat;
  }
  function filterFallback(f) {
    if (f === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'] || f === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_12'] || f === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_11']) {
      return _gl.NEAREST;
    }
    return _gl.LINEAR;
  }
  function onTextureDispose(event) {
    var texture = event.target;
    texture.removeEventListener('dispose', onTextureDispose);
    deallocateTexture(texture);
    if (texture.isVideoTexture) {
      delete _videoTextures[texture.id];
    }
    info.memory.textures--;
  }
  function onRenderTargetDispose(event) {
    var renderTarget = event.target;
    renderTarget.removeEventListener('dispose', onRenderTargetDispose);
    deallocateRenderTarget(renderTarget);
    info.memory.textures--;
  }
  function deallocateTexture(texture) {
    var textureProperties = properties.get(texture);
    if (texture.image && textureProperties.__image__webglTextureCube) {
      _gl.deleteTexture(textureProperties.__image__webglTextureCube);
    } else {
      if (textureProperties.__webglInit === undefined)
        return;
      _gl.deleteTexture(textureProperties.__webglTexture);
    }
    properties.remove(texture);
  }
  function deallocateRenderTarget(renderTarget) {
    var renderTargetProperties = properties.get(renderTarget);
    var textureProperties = properties.get(renderTarget.texture);
    if (!renderTarget)
      return;
    if (textureProperties.__webglTexture !== undefined) {
      _gl.deleteTexture(textureProperties.__webglTexture);
    }
    if (renderTarget.depthTexture) {
      renderTarget.depthTexture.dispose();
    }
    if (renderTarget.isWebGLRenderTargetCube) {
      for (var i = 0; i < 6; i++) {
        _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);
        if (renderTargetProperties.__webglDepthbuffer)
          _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i]);
      }
    } else {
      _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
      if (renderTargetProperties.__webglDepthbuffer)
        _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);
    }
    properties.remove(renderTarget.texture);
    properties.remove(renderTarget);
  }
  function setTexture2D(texture, slot) {
    var textureProperties = properties.get(texture);
    if (texture.isVideoTexture)
      updateVideoTexture(texture);
    if (texture.version > 0 && textureProperties.__version !== texture.version) {
      var image = texture.image;
      if (image === undefined) {
        console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined');
      } else if (image.complete === false) {
        console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete');
      } else {
        uploadTexture(textureProperties, texture, slot);
        return;
      }
    }
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
  }
  function setTextureCube(texture, slot) {
    var textureProperties = properties.get(texture);
    if (texture.image.length === 6) {
      if (texture.version > 0 && textureProperties.__version !== texture.version) {
        if (!textureProperties.__image__webglTextureCube) {
          texture.addEventListener('dispose', onTextureDispose);
          textureProperties.__image__webglTextureCube = _gl.createTexture();
          info.memory.textures++;
        }
        state.activeTexture(_gl.TEXTURE0 + slot);
        state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube);
        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        var isCompressed = texture && texture.isCompressedTexture;
        var isDataTexture = texture.image[0] && texture.image[0].isDataTexture;
        var cubeImage = [];
        for (var i = 0; i < 6; i++) {
          if (!isCompressed && !isDataTexture) {
            cubeImage[i] = clampToMaxSize(texture.image[i], capabilities.maxCubemapSize);
          } else {
            cubeImage[i] = isDataTexture ? texture.image[i].image : texture.image[i];
          }
        }
        var image = cubeImage[0], isPowerOfTwoImage = isPowerOfTwo(image), glFormat = utils.convert(texture.format), glType = utils.convert(texture.type), glInternalFormat = getInternalFormat(glFormat, glType);
        setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture, isPowerOfTwoImage);
        for (var i = 0; i < 6; i++) {
          if (!isCompressed) {
            if (isDataTexture) {
              state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, cubeImage[i].width, cubeImage[i].height, 0, glFormat, glType, cubeImage[i].data);
            } else {
              state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, glFormat, glType, cubeImage[i]);
            }
          } else {
            var mipmap, mipmaps = cubeImage[i].mipmaps;
            for (var j = 0, jl = mipmaps.length; j < jl; j++) {
              mipmap = mipmaps[j];
              if (texture.format !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'] && texture.format !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_52']) {
                if (state.getCompressedTextureFormats().indexOf(glFormat) > -1) {
                  state.compressedTexImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                } else {
                  console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()');
                }
              } else {
                state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
              }
            }
          }
        }
        if (!isCompressed) {
          textureProperties.__maxMipLevel = 0;
        } else {
          textureProperties.__maxMipLevel = mipmaps.length - 1;
        }
        if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {
          generateMipmap(_gl.TEXTURE_CUBE_MAP, texture, image.width, image.height);
        }
        textureProperties.__version = texture.version;
        if (texture.onUpdate)
          texture.onUpdate(texture);
      } else {
        state.activeTexture(_gl.TEXTURE0 + slot);
        state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube);
      }
    }
  }
  function setTextureCubeDynamic(texture, slot) {
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_CUBE_MAP, properties.get(texture).__webglTexture);
  }
  function setTextureParameters(textureType, texture, isPowerOfTwoImage) {
    var extension;
    if (isPowerOfTwoImage) {
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, utils.convert(texture.wrapS));
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, utils.convert(texture.wrapT));
      _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, utils.convert(texture.magFilter));
      _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, utils.convert(texture.minFilter));
    } else {
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
      if (texture.wrapS !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['k'] || texture.wrapT !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['k']) {
        console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.');
      }
      _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback(texture.magFilter));
      _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback(texture.minFilter));
      if (texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'] && texture.minFilter !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['T']) {
        console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.');
      }
    }
    extension = extensions.get('EXT_texture_filter_anisotropic');
    if (extension) {
      if (texture.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__['E'] && extensions.get('OES_texture_float_linear') === null)
        return;
      if (texture.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__['L'] && (capabilities.isWebGL2 || extensions.get('OES_texture_half_float_linear')) === null)
        return;
      if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {
        _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
        properties.get(texture).__currentAnisotropy = texture.anisotropy;
      }
    }
  }
  function uploadTexture(textureProperties, texture, slot) {
    if (textureProperties.__webglInit === undefined) {
      textureProperties.__webglInit = true;
      texture.addEventListener('dispose', onTextureDispose);
      textureProperties.__webglTexture = _gl.createTexture();
      info.memory.textures++;
    }
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    var image = clampToMaxSize(texture.image, capabilities.maxTextureSize);
    if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {
      image = makePowerOfTwo(image);
    }
    var isPowerOfTwoImage = isPowerOfTwo(image), glFormat = utils.convert(texture.format), glType = utils.convert(texture.type), glInternalFormat = getInternalFormat(glFormat, glType);
    setTextureParameters(_gl.TEXTURE_2D, texture, isPowerOfTwoImage);
    var mipmap, mipmaps = texture.mipmaps;
    if (texture.isDepthTexture) {
      glInternalFormat = _gl.DEPTH_COMPONENT;
      if (texture.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__['E']) {
        if (!capabilities.isWebGL2)
          throw new Error('Float Depth Texture only supported in WebGL2.0');
        glInternalFormat = _gl.DEPTH_COMPONENT32F;
      } else if (capabilities.isWebGL2) {
        glInternalFormat = _gl.DEPTH_COMPONENT16;
      }
      if (texture.format === __WEBPACK_IMPORTED_MODULE_0__constants_js__['u'] && glInternalFormat === _gl.DEPTH_COMPONENT) {
        if (texture.type !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_82'] && texture.type !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_78']) {
          console.warn('THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.');
          texture.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__['_82'];
          glType = utils.convert(texture.type);
        }
      }
      if (texture.format === __WEBPACK_IMPORTED_MODULE_0__constants_js__['v']) {
        glInternalFormat = _gl.DEPTH_STENCIL;
        if (texture.type !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_77']) {
          console.warn('THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.');
          texture.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__['_77'];
          glType = utils.convert(texture.type);
        }
      }
      state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null);
    } else if (texture.isDataTexture) {
      if (mipmaps.length > 0 && isPowerOfTwoImage) {
        for (var i = 0, il = mipmaps.length; i < il; i++) {
          mipmap = mipmaps[i];
          state.texImage2D(_gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
        }
        texture.generateMipmaps = false;
        textureProperties.__maxMipLevel = mipmaps.length - 1;
      } else {
        state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data);
        textureProperties.__maxMipLevel = 0;
      }
    } else if (texture.isCompressedTexture) {
      for (var i = 0, il = mipmaps.length; i < il; i++) {
        mipmap = mipmaps[i];
        if (texture.format !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'] && texture.format !== __WEBPACK_IMPORTED_MODULE_0__constants_js__['_52']) {
          if (state.getCompressedTextureFormats().indexOf(glFormat) > -1) {
            state.compressedTexImage2D(_gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
          } else {
            console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()');
          }
        } else {
          state.texImage2D(_gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
        }
      }
      textureProperties.__maxMipLevel = mipmaps.length - 1;
    } else {
      if (mipmaps.length > 0 && isPowerOfTwoImage) {
        for (var i = 0, il = mipmaps.length; i < il; i++) {
          mipmap = mipmaps[i];
          state.texImage2D(_gl.TEXTURE_2D, i, glInternalFormat, glFormat, glType, mipmap);
        }
        texture.generateMipmaps = false;
        textureProperties.__maxMipLevel = mipmaps.length - 1;
      } else {
        state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image);
        textureProperties.__maxMipLevel = 0;
      }
    }
    if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {
      generateMipmap(_gl.TEXTURE_2D, texture, image.width, image.height);
    }
    textureProperties.__version = texture.version;
    if (texture.onUpdate)
      texture.onUpdate(texture);
  }
  function setupFrameBufferTexture(framebuffer, renderTarget, attachment, textureTarget) {
    var glFormat = utils.convert(renderTarget.texture.format);
    var glType = utils.convert(renderTarget.texture.type);
    var glInternalFormat = getInternalFormat(glFormat, glType);
    state.texImage2D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null);
    _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
    _gl.framebufferTexture2D(_gl.FRAMEBUFFER, attachment, textureTarget, properties.get(renderTarget.texture).__webglTexture, 0);
    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
  }
  function setupRenderBufferStorage(renderbuffer, renderTarget) {
    _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);
    if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {
      _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height);
      _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
    } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {
      _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height);
      _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
    } else {
      _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height);
    }
    _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
  }
  function setupDepthTexture(framebuffer, renderTarget) {
    var isCube = renderTarget && renderTarget.isWebGLRenderTargetCube;
    if (isCube)
      throw new Error('Depth Texture with cube render targets is not supported');
    _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
    if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {
      throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');
    }
    if (!properties.get(renderTarget.depthTexture).__webglTexture || renderTarget.depthTexture.image.width !== renderTarget.width || renderTarget.depthTexture.image.height !== renderTarget.height) {
      renderTarget.depthTexture.image.width = renderTarget.width;
      renderTarget.depthTexture.image.height = renderTarget.height;
      renderTarget.depthTexture.needsUpdate = true;
    }
    setTexture2D(renderTarget.depthTexture, 0);
    var webglDepthTexture = properties.get(renderTarget.depthTexture).__webglTexture;
    if (renderTarget.depthTexture.format === __WEBPACK_IMPORTED_MODULE_0__constants_js__['u']) {
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
    } else if (renderTarget.depthTexture.format === __WEBPACK_IMPORTED_MODULE_0__constants_js__['v']) {
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
    } else {
      throw new Error('Unknown depthTexture format');
    }
  }
  function setupDepthRenderbuffer(renderTarget) {
    var renderTargetProperties = properties.get(renderTarget);
    var isCube = renderTarget.isWebGLRenderTargetCube === true;
    if (renderTarget.depthTexture) {
      if (isCube)
        throw new Error('target.depthTexture not supported in Cube render targets');
      setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);
    } else {
      if (isCube) {
        renderTargetProperties.__webglDepthbuffer = [];
        for (var i = 0; i < 6; i++) {
          _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[i]);
          renderTargetProperties.__webglDepthbuffer[i] = _gl.createRenderbuffer();
          setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i], renderTarget);
        }
      } else {
        _gl.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
        renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
        setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget);
      }
    }
    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
  }
  function setupRenderTarget(renderTarget) {
    var renderTargetProperties = properties.get(renderTarget);
    var textureProperties = properties.get(renderTarget.texture);
    renderTarget.addEventListener('dispose', onRenderTargetDispose);
    textureProperties.__webglTexture = _gl.createTexture();
    info.memory.textures++;
    var isCube = renderTarget.isWebGLRenderTargetCube === true;
    var isTargetPowerOfTwo = isPowerOfTwo(renderTarget);
    if (isCube) {
      renderTargetProperties.__webglFramebuffer = [];
      for (var i = 0; i < 6; i++) {
        renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();
      }
    } else {
      renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();
    }
    if (isCube) {
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
      setTextureParameters(_gl.TEXTURE_CUBE_MAP, renderTarget.texture, isTargetPowerOfTwo);
      for (var i = 0; i < 6; i++) {
        setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i], renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i);
      }
      if (textureNeedsGenerateMipmaps(renderTarget.texture, isTargetPowerOfTwo)) {
        generateMipmap(_gl.TEXTURE_CUBE_MAP, renderTarget.texture, renderTarget.width, renderTarget.height);
      }
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
    } else {
      state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
      setTextureParameters(_gl.TEXTURE_2D, renderTarget.texture, isTargetPowerOfTwo);
      setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D);
      if (textureNeedsGenerateMipmaps(renderTarget.texture, isTargetPowerOfTwo)) {
        generateMipmap(_gl.TEXTURE_2D, renderTarget.texture, renderTarget.width, renderTarget.height);
      }
      state.bindTexture(_gl.TEXTURE_2D, null);
    }
    if (renderTarget.depthBuffer) {
      setupDepthRenderbuffer(renderTarget);
    }
  }
  function updateRenderTargetMipmap(renderTarget) {
    var texture = renderTarget.texture;
    var isTargetPowerOfTwo = isPowerOfTwo(renderTarget);
    if (textureNeedsGenerateMipmaps(texture, isTargetPowerOfTwo)) {
      var target = renderTarget.isWebGLRenderTargetCube ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D;
      var webglTexture = properties.get(texture).__webglTexture;
      state.bindTexture(target, webglTexture);
      generateMipmap(target, texture, renderTarget.width, renderTarget.height);
      state.bindTexture(target, null);
    }
  }
  function updateVideoTexture(texture) {
    var id = texture.id;
    var frame = info.render.frame;
    if (_videoTextures[id] !== frame) {
      _videoTextures[id] = frame;
      texture.update();
    }
  }
  this.setTexture2D = setTexture2D;
  this.setTextureCube = setTextureCube;
  this.setTextureCubeDynamic = setTextureCubeDynamic;
  this.setupRenderTarget = setupRenderTarget;
  this.updateRenderTargetMipmap = updateRenderTargetMipmap;
}