'use strict';
require.d(exports, 'a', function () {
  return WebGLUniforms;
});
var __WEBPACK_IMPORTED_MODULE_0__textures_CubeTexture_js__ = require('./218');
var __WEBPACK_IMPORTED_MODULE_1__textures_Texture_js__ = require('./10');
var emptyTexture = new __WEBPACK_IMPORTED_MODULE_1__textures_Texture_js__['a']();
var emptyCubeTexture = new __WEBPACK_IMPORTED_MODULE_0__textures_CubeTexture_js__['a']();
function UniformContainer() {
  this.seq = [];
  this.map = {};
}
var arrayCacheF32 = [];
var arrayCacheI32 = [];
var mat4array = new Float32Array(16);
var mat3array = new Float32Array(9);
var mat2array = new Float32Array(4);
function flatten(array, nBlocks, blockSize) {
  var firstElem = array[0];
  if (firstElem <= 0 || firstElem > 0)
    return array;
  var n = nBlocks * blockSize, r = arrayCacheF32[n];
  if (r === undefined) {
    r = new Float32Array(n);
    arrayCacheF32[n] = r;
  }
  if (nBlocks !== 0) {
    firstElem.toArray(r, 0);
    for (var i = 1, offset = 0; i !== nBlocks; ++i) {
      offset += blockSize;
      array[i].toArray(r, offset);
    }
  }
  return r;
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return false;
  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      return false;
  }
  return true;
}
function copyArray(a, b) {
  for (var i = 0, l = b.length; i < l; i++) {
    a[i] = b[i];
  }
}
function allocTexUnits(renderer, n) {
  var r = arrayCacheI32[n];
  if (r === undefined) {
    r = new Int32Array(n);
    arrayCacheI32[n] = r;
  }
  for (var i = 0; i !== n; ++i)
    r[i] = renderer.allocTextureUnit();
  return r;
}
function setValue1f(gl, v) {
  var cache = this.cache;
  if (cache[0] === v)
    return;
  gl.uniform1f(this.addr, v);
  cache[0] = v;
}
function setValue1i(gl, v) {
  var cache = this.cache;
  if (cache[0] === v)
    return;
  gl.uniform1i(this.addr, v);
  cache[0] = v;
}
function setValue2fv(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y) {
      gl.uniform2f(this.addr, v.x, v.y);
      cache[0] = v.x;
      cache[1] = v.y;
    }
  } else {
    if (arraysEqual(cache, v))
      return;
    gl.uniform2fv(this.addr, v);
    copyArray(cache, v);
  }
}
function setValue3fv(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
      gl.uniform3f(this.addr, v.x, v.y, v.z);
      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
    }
  } else if (v.r !== undefined) {
    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
      gl.uniform3f(this.addr, v.r, v.g, v.b);
      cache[0] = v.r;
      cache[1] = v.g;
      cache[2] = v.b;
    }
  } else {
    if (arraysEqual(cache, v))
      return;
    gl.uniform3fv(this.addr, v);
    copyArray(cache, v);
  }
}
function setValue4fv(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
      gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
      cache[3] = v.w;
    }
  } else {
    if (arraysEqual(cache, v))
      return;
    gl.uniform4fv(this.addr, v);
    copyArray(cache, v);
  }
}
function setValue2fm(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v))
      return;
    gl.uniformMatrix2fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements))
      return;
    mat2array.set(elements);
    gl.uniformMatrix2fv(this.addr, false, mat2array);
    copyArray(cache, elements);
  }
}
function setValue3fm(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v))
      return;
    gl.uniformMatrix3fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements))
      return;
    mat3array.set(elements);
    gl.uniformMatrix3fv(this.addr, false, mat3array);
    copyArray(cache, elements);
  }
}
function setValue4fm(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v))
      return;
    gl.uniformMatrix4fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements))
      return;
    mat4array.set(elements);
    gl.uniformMatrix4fv(this.addr, false, mat4array);
    copyArray(cache, elements);
  }
}
function setValueT1(gl, v, renderer) {
  var cache = this.cache;
  var unit = renderer.allocTextureUnit();
  if (cache[0] !== unit) {
    gl.uniform1i(this.addr, unit);
    cache[0] = unit;
  }
  renderer.setTexture2D(v || emptyTexture, unit);
}
function setValueT6(gl, v, renderer) {
  var cache = this.cache;
  var unit = renderer.allocTextureUnit();
  if (cache[0] !== unit) {
    gl.uniform1i(this.addr, unit);
    cache[0] = unit;
  }
  renderer.setTextureCube(v || emptyCubeTexture, unit);
}
function setValue2iv(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v))
    return;
  gl.uniform2iv(this.addr, v);
  copyArray(cache, v);
}
function setValue3iv(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v))
    return;
  gl.uniform3iv(this.addr, v);
  copyArray(cache, v);
}
function setValue4iv(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v))
    return;
  gl.uniform4iv(this.addr, v);
  copyArray(cache, v);
}
function getSingularSetter(type) {
  switch (type) {
  case 5126:
    return setValue1f;
  case 35664:
    return setValue2fv;
  case 35665:
    return setValue3fv;
  case 35666:
    return setValue4fv;
  case 35674:
    return setValue2fm;
  case 35675:
    return setValue3fm;
  case 35676:
    return setValue4fm;
  case 35678:
  case 36198:
    return setValueT1;
  case 35680:
    return setValueT6;
  case 5124:
  case 35670:
    return setValue1i;
  case 35667:
  case 35671:
    return setValue2iv;
  case 35668:
  case 35672:
    return setValue3iv;
  case 35669:
  case 35673:
    return setValue4iv;
  }
}
function setValue1fv(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v))
    return;
  gl.uniform1fv(this.addr, v);
  copyArray(cache, v);
}
function setValue1iv(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v))
    return;
  gl.uniform1iv(this.addr, v);
  copyArray(cache, v);
}
function setValueV2a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 2);
  if (arraysEqual(cache, data))
    return;
  gl.uniform2fv(this.addr, data);
  this.updateCache(data);
}
function setValueV3a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 3);
  if (arraysEqual(cache, data))
    return;
  gl.uniform3fv(this.addr, data);
  this.updateCache(data);
}
function setValueV4a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 4);
  if (arraysEqual(cache, data))
    return;
  gl.uniform4fv(this.addr, data);
  this.updateCache(data);
}
function setValueM2a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 4);
  if (arraysEqual(cache, data))
    return;
  gl.uniformMatrix2fv(this.addr, false, data);
  this.updateCache(data);
}
function setValueM3a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 9);
  if (arraysEqual(cache, data))
    return;
  gl.uniformMatrix3fv(this.addr, false, data);
  this.updateCache(data);
}
function setValueM4a(gl, v) {
  var cache = this.cache;
  var data = flatten(v, this.size, 16);
  if (arraysEqual(cache, data))
    return;
  gl.uniformMatrix4fv(this.addr, false, data);
  this.updateCache(data);
}
function setValueT1a(gl, v, renderer) {
  var cache = this.cache;
  var n = v.length;
  var units = allocTexUnits(renderer, n);
  if (arraysEqual(cache, units) === false) {
    gl.uniform1iv(this.addr, units);
    copyArray(cache, units);
  }
  for (var i = 0; i !== n; ++i) {
    renderer.setTexture2D(v[i] || emptyTexture, units[i]);
  }
}
function setValueT6a(gl, v, renderer) {
  var cache = this.cache;
  var n = v.length;
  var units = allocTexUnits(renderer, n);
  if (arraysEqual(cache, units) === false) {
    gl.uniform1iv(this.addr, units);
    copyArray(cache, units);
  }
  for (var i = 0; i !== n; ++i) {
    renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
  }
}
function getPureArraySetter(type) {
  switch (type) {
  case 5126:
    return setValue1fv;
  case 35664:
    return setValueV2a;
  case 35665:
    return setValueV3a;
  case 35666:
    return setValueV4a;
  case 35674:
    return setValueM2a;
  case 35675:
    return setValueM3a;
  case 35676:
    return setValueM4a;
  case 35678:
    return setValueT1a;
  case 35680:
    return setValueT6a;
  case 5124:
  case 35670:
    return setValue1iv;
  case 35667:
  case 35671:
    return setValue2iv;
  case 35668:
  case 35672:
    return setValue3iv;
  case 35669:
  case 35673:
    return setValue4iv;
  }
}
function SingleUniform(id, activeInfo, addr) {
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.setValue = getSingularSetter(activeInfo.type);
}
function PureArrayUniform(id, activeInfo, addr) {
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.size = activeInfo.size;
  this.setValue = getPureArraySetter(activeInfo.type);
}
PureArrayUniform.prototype.updateCache = function (data) {
  var cache = this.cache;
  if (data instanceof Float32Array && cache.length !== data.length) {
    this.cache = new Float32Array(data.length);
  }
  copyArray(cache, data);
};
function StructuredUniform(id) {
  this.id = id;
  UniformContainer.call(this);
}
StructuredUniform.prototype.setValue = function (gl, value, renderer) {
  var seq = this.seq;
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i];
    u.setValue(gl, value[u.id], renderer);
  }
};
var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
function addUniform(container, uniformObject) {
  container.seq.push(uniformObject);
  container.map[uniformObject.id] = uniformObject;
}
function parseUniform(activeInfo, addr, container) {
  var path = activeInfo.name, pathLength = path.length;
  RePathPart.lastIndex = 0;
  while (true) {
    var match = RePathPart.exec(path), matchEnd = RePathPart.lastIndex, id = match[1], idIsIndex = match[2] === ']', subscript = match[3];
    if (idIsIndex)
      id = id | 0;
    if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
      addUniform(container, subscript === undefined ? new SingleUniform(id, activeInfo, addr) : new PureArrayUniform(id, activeInfo, addr));
      break;
    } else {
      var map = container.map, next = map[id];
      if (next === undefined) {
        next = new StructuredUniform(id);
        addUniform(container, next);
      }
      container = next;
    }
  }
}
function WebGLUniforms(gl, program, renderer) {
  UniformContainer.call(this);
  this.renderer = renderer;
  var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < n; ++i) {
    var info = gl.getActiveUniform(program, i), addr = gl.getUniformLocation(program, info.name);
    parseUniform(info, addr, this);
  }
}
WebGLUniforms.prototype.setValue = function (gl, name, value) {
  var u = this.map[name];
  if (u !== undefined)
    u.setValue(gl, value, this.renderer);
};
WebGLUniforms.prototype.setOptional = function (gl, object, name) {
  var v = object[name];
  if (v !== undefined)
    this.setValue(gl, name, v);
};
WebGLUniforms.upload = function (gl, seq, values, renderer) {
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i], v = values[u.id];
    if (v.needsUpdate !== false) {
      u.setValue(gl, v.value, renderer);
    }
  }
};
WebGLUniforms.seqWithValue = function (seq, values) {
  var r = [];
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i];
    if (u.id in values)
      r.push(u);
  }
  return r;
};