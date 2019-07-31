'use strict';
exports['a'] = ImageMaterial;
var __WEBPACK_IMPORTED_MODULE_0__material__ = require('./Material');
var __WEBPACK_IMPORTED_MODULE_1__shader_raster_frag_glsl__ = require('./329');
var __WEBPACK_IMPORTED_MODULE_1__shader_raster_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_1__shader_raster_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_2__shader_raster_vert_glsl__ = require('./330');
var __WEBPACK_IMPORTED_MODULE_2__shader_raster_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_2__shader_raster_vert_glsl__);
function ImageMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_0__material__['a']({
    uniforms: {
      u_opacity: { value: options.u_opacity },
      u_texture: { value: options.u_texture },
      u_colorTexture: { value: options.u_colorTexture },
      u_min: { value: options.u_min },
      u_max: { value: options.u_max },
      u_extent: { value: options.u_extent },
      u_dimension: { value: options.u_dimension }
    },
    vertexShader: __WEBPACK_IMPORTED_MODULE_2__shader_raster_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_1__shader_raster_frag_glsl___default.a,
    transparent: false
  });
  return material;
}
