
const deJong = (a, b, c, d) => (v) =>
createVector(sin(a * v.y) - cos(b * v.x), sin(c * v.x) - cos(d * v.y));

const deJong2 = (a, b, c, d) => (v) =>
createVector(-sin(a * v.y) + cos(b * v.x), sin(c * v.x) - cos(d * v.y));

const deJong3 = (a, b) => (v) =>
createVector(sin(a * v.y) - cos(a * v.x), cos(b * v.y) - sin(b * v.x));

const deJong4 = (a, b, c) => (v) =>
createVector(
  sin(a * v.y + c * v.x) - cos(a * v.x),
  cos(a * v.x - c * v.x) - sin(b * v.y)
);