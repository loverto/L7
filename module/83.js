'use strict';
require.d(exports, 'a', function () {
  return Layers;
});
function Layers() {
  this.mask = 1 | 0;
}
Object.assign(Layers.prototype, {
  set: function (channel) {
    this.mask = 1 << channel | 0;
  },
  enable: function (channel) {
    this.mask |= 1 << channel | 0;
  },
  toggle: function (channel) {
    this.mask ^= 1 << channel | 0;
  },
  disable: function (channel) {
    this.mask &= ~(1 << channel | 0);
  },
  test: function (layers) {
    return (this.mask & layers.mask) !== 0;
  }
});