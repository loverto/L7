'use strict';
require.d(exports, 'a', function () {
  return WebGLObjects;
});
function WebGLObjects(geometries, info) {
  var updateList = {};
  function update(object) {
    var frame = info.render.frame;
    var geometry = object.geometry;
    var buffergeometry = geometries.get(object, geometry);
    if (updateList[buffergeometry.id] !== frame) {
      if (geometry.isGeometry) {
        buffergeometry.updateFromObject(object);
      }
      geometries.update(buffergeometry);
      updateList[buffergeometry.id] = frame;
    }
    return buffergeometry;
  }
  function dispose() {
    updateList = {};
  }
  return {
    update: update,
    dispose: dispose
  };
}