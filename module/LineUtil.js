var add = require('./add');
var set = require('./set');
var normalize = require('./normalize');
var subtract = require('./subtract');
var dot = require('./dot');
var tmp = [
  0,
  0
];
module.exports.computeMiter = function computeMiter(tangent, miter, lineA, lineB, halfThick) {
  add(tangent, lineA, lineB);
  normalize(tangent, tangent);
  set(miter, -tangent[1], tangent[0]);
  set(tmp, -lineA[1], lineA[0]);
  return halfThick / dot(miter, tmp);
};
module.exports.normal = function normal(out, dir) {
  set(out, -dir[1], dir[0]);
  return out;
};
module.exports.direction = function direction(out, a, b) {
  subtract(out, a, b);
  normalize(out, out);
  return out;
};
