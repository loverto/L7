'use strict';
exports['a'] = PickingMaterial;
var geom_material_material = require('./Material');
var picking_frag_glsl = require('./picking_frag_glsl');
var picking_frag_glsl___default = require.n(picking_frag_glsl);
var picking_vert_glsl = require('./picking_vert_glsl');
var picking_vert_glsl___default = require.n(picking_vert_glsl);
function PickingMaterial(options) {
  var material = new geom_material_material['a']({
    uniforms: { u_zoom: { value: options.u_zoom || 1 } },
    vertexShader: picking_vert_glsl___default.a,
    fragmentShader: picking_frag_glsl___default.a,
    transparent: false
  });
  return material;
}
