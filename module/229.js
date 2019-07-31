'use strict';
require.d(exports, 'a', function () {
  return WebGLUtils;
});
var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = require('./3');
function WebGLUtils(gl, extensions, capabilities) {
  function convert(p) {
    var extension;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_60'])
      return gl.REPEAT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['k'])
      return gl.CLAMP_TO_EDGE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_6'])
      return gl.MIRRORED_REPEAT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_10'])
      return gl.NEAREST;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_12'])
      return gl.NEAREST_MIPMAP_NEAREST;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_11'])
      return gl.NEAREST_MIPMAP_LINEAR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['T'])
      return gl.LINEAR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['V'])
      return gl.LINEAR_MIPMAP_NEAREST;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['U'])
      return gl.LINEAR_MIPMAP_LINEAR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_76'])
      return gl.UNSIGNED_BYTE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_79'])
      return gl.UNSIGNED_SHORT_4_4_4_4;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_80'])
      return gl.UNSIGNED_SHORT_5_5_5_1;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_81'])
      return gl.UNSIGNED_SHORT_5_6_5;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['i'])
      return gl.BYTE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_62'])
      return gl.SHORT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_82'])
      return gl.UNSIGNED_SHORT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['M'])
      return gl.INT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_78'])
      return gl.UNSIGNED_INT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['E'])
      return gl.FLOAT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['L']) {
      if (capabilities.isWebGL2)
        return gl.HALF_FLOAT;
      extension = extensions.get('OES_texture_half_float');
      if (extension !== null)
        return extension.HALF_FLOAT_OES;
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['d'])
      return gl.ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_52'])
      return gl.RGB;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_29'])
      return gl.RGBA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_2'])
      return gl.LUMINANCE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_1'])
      return gl.LUMINANCE_ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['u'])
      return gl.DEPTH_COMPONENT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['v'])
      return gl.DEPTH_STENCIL;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['a'])
      return gl.FUNC_ADD;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_68'])
      return gl.FUNC_SUBTRACT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_61'])
      return gl.FUNC_REVERSE_SUBTRACT;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_86'])
      return gl.ZERO;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_20'])
      return gl.ONE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_67'])
      return gl.SRC_COLOR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_24'])
      return gl.ONE_MINUS_SRC_COLOR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_65'])
      return gl.SRC_ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_23'])
      return gl.ONE_MINUS_SRC_ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['x'])
      return gl.DST_ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_21'])
      return gl.ONE_MINUS_DST_ALPHA;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['y'])
      return gl.DST_COLOR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_22'])
      return gl.ONE_MINUS_DST_COLOR;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_66'])
      return gl.SRC_ALPHA_SATURATE;
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_58'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_46'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_47'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_48']) {
      extension = extensions.get('WEBGL_compressed_texture_s3tc');
      if (extension !== null) {
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_58'])
          return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_46'])
          return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_47'])
          return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_48'])
          return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_57'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_56'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_45'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_44']) {
      extension = extensions.get('WEBGL_compressed_texture_pvrtc');
      if (extension !== null) {
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_57'])
          return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_56'])
          return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_45'])
          return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_44'])
          return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_55']) {
      extension = extensions.get('WEBGL_compressed_texture_etc1');
      if (extension !== null)
        return extension.COMPRESSED_RGB_ETC1_WEBGL;
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_36'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_37'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_38'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_39'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_40'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_41'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_42'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_43'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_31'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_32'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_33'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_30'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_34'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_35']) {
      extension = extensions.get('WEBGL_compressed_texture_astc');
      if (extension !== null) {
        return p;
      }
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_5'] || p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_4']) {
      if (capabilities.isWebGL2) {
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_5'])
          return gl.MIN;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_4'])
          return gl.MAX;
      }
      extension = extensions.get('EXT_blend_minmax');
      if (extension !== null) {
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_5'])
          return extension.MIN_EXT;
        if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_4'])
          return extension.MAX_EXT;
      }
    }
    if (p === __WEBPACK_IMPORTED_MODULE_0__constants_js__['_77']) {
      if (capabilities.isWebGL2)
        return gl.UNSIGNED_INT_24_8;
      extension = extensions.get('WEBGL_depth_texture');
      if (extension !== null)
        return extension.UNSIGNED_INT_24_8_WEBGL;
    }
    return 0;
  }
  return { convert: convert };
}