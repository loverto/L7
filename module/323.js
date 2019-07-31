'use strict';
exports['a'] = ImageMaterial;
var __WEBPACK_IMPORTED_MODULE_0__shader_image_frag_glsl__ = require('./324');
var __WEBPACK_IMPORTED_MODULE_0__shader_image_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_0__shader_image_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_1__shader_image_vert_glsl__ = require('./325');
var __WEBPACK_IMPORTED_MODULE_1__shader_image_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_1__shader_image_vert_glsl__);
var __WEBPACK_IMPORTED_MODULE_2__material__ = require('./Material');
function ImageMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_2__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity },
      u_texture: { value: options.u_texture }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_1__shader_image_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_0__shader_image_frag_glsl___default.a,
    transparent: true
  });
  return material;
}
