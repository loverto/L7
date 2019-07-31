var add = require('./291');
var set = require('./292');
var normalize = require('./293');
var subtract = require('./294');
var dot = require('./295');
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