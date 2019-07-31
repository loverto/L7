'use strict';
require.d(exports, 'a', function () {
  return WebGLGeometries;
});
var __WEBPACK_IMPORTED_MODULE_0__core_BufferAttribute_js__ = require('./15');
var __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__ = require('./14');
var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = require('./49');
function WebGLGeometries(gl, attributes, info) {
  var geometries = {};
  var wireframeAttributes = {};
  function onGeometryDispose(event) {
    var geometry = event.target;
    var buffergeometry = geometries[geometry.id];
    if (buffergeometry.index !== null) {
      attributes.remove(buffergeometry.index);
    }
    for (var name in buffergeometry.attributes) {
      attributes.remove(buffergeometry.attributes[name]);
    }
    geometry.removeEventListener('dispose', onGeometryDispose);
    delete geometries[geometry.id];
    var attribute = wireframeAttributes[buffergeometry.id];
    if (attribute) {
      attributes.remove(attribute);
      delete wireframeAttributes[buffergeometry.id];
    }
    info.memory.geometries--;
  }
  function get(object, geometry) {
    var buffergeometry = geometries[geometry.id];
    if (buffergeometry)
      return buffergeometry;
    geometry.addEventListener('dispose', onGeometryDispose);
    if (geometry.isBufferGeometry) {
      buffergeometry = geometry;
    } else if (geometry.isGeometry) {
      if (geometry._bufferGeometry === undefined) {
        geometry._bufferGeometry = new __WEBPACK_IMPORTED_MODULE_1__core_BufferGeometry_js__['a']().setFromObject(object);
      }
      buffergeometry = geometry._bufferGeometry;
    }
    geometries[geometry.id] = buffergeometry;
    info.memory.geometries++;
    return buffergeometry;
  }
  function update(geometry) {
    var index = geometry.index;
    var geometryAttributes = geometry.attributes;
    if (index !== null) {
      attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
    }
    for (var name in geometryAttributes) {
      attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
    }
    var morphAttributes = geometry.morphAttributes;
    for (var name in morphAttributes) {
      var array = morphAttributes[name];
      for (var i = 0, l = array.length; i < l; i++) {
        attributes.update(array[i], gl.ARRAY_BUFFER);
      }
    }
  }
  function getWireframeAttribute(geometry) {
    var attribute = wireframeAttributes[geometry.id];
    if (attribute)
      return attribute;
    var indices = [];
    var geometryIndex = geometry.index;
    var geometryAttributes = geometry.attributes;
    if (geometryIndex !== null) {
      var array = geometryIndex.array;
      for (var i = 0, l = array.length; i < l; i += 3) {
        var a = array[i + 0];
        var b = array[i + 1];
        var c = array[i + 2];
        indices.push(a, b, b, c, c, a);
      }
    } else {
      var array = geometryAttributes.position.array;
      for (var i = 0, l = array.length / 3 - 1; i < l; i += 3) {
        var a = i + 0;
        var b = i + 1;
        var c = i + 2;
        indices.push(a, b, b, c, c, a);
      }
    }
    attribute = new ((Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__['a'])(indices)) > 65535 ? __WEBPACK_IMPORTED_MODULE_0__core_BufferAttribute_js__['h'] : __WEBPACK_IMPORTED_MODULE_0__core_BufferAttribute_js__['g'])(indices, 1);
    attributes.update(attribute, gl.ELEMENT_ARRAY_BUFFER);
    wireframeAttributes[geometry.id] = attribute;
    return attribute;
  }
  return {
    get: get,
    update: update,
    getWireframeAttribute: getWireframeAttribute
  };
}