'use strict';
exports['a'] = PickingMaterial;
var __WEBPACK_IMPORTED_MODULE_0__geom_material_material__ = require('./16');
var __WEBPACK_IMPORTED_MODULE_1__picking_frag_glsl__ = require('./276');
var __WEBPACK_IMPORTED_MODULE_1__picking_frag_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_1__picking_frag_glsl__);
var __WEBPACK_IMPORTED_MODULE_2__picking_vert_glsl__ = require('./277');
var __WEBPACK_IMPORTED_MODULE_2__picking_vert_glsl___default = require.n(__WEBPACK_IMPORTED_MODULE_2__picking_vert_glsl__);
function PickingMaterial(options) {
  var material = new __WEBPACK_IMPORTED_MODULE_0__geom_material_material__['a']({
    uniforms: { u_zoom: { value: options.u_zoom || 1 } },
    vertexShader: __WEBPACK_IMPORTED_MODULE_2__picking_vert_glsl___default.a,
    fragmentShader: __WEBPACK_IMPORTED_MODULE_1__picking_frag_glsl___default.a,
    transparent: false
  });
  return material;
}