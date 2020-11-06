const pointBtw = (p1, p2, farFromP1) => {
  if (p1.x == p2.x) {
    return createVector(p1.x, p1.y + farFromP1 * (p2.y - p1.y));
  }
  const slope = (p1.y - p2.y) / (p1.x - p2.x);
  const dx = p2.x - p1.x;
  const newX = p1.x + dx * farFromP1;
  const newY = slope * newX + p1.y - slope * p1.x;
  return createVector(newX, newY);
};

const polygonPulledTowards = (source, target, pullFactor) => {
  return [
    pointBtw(source.p1, target, pullFactor),
    pointBtw(source.p2, target, pullFactor),
    pointBtw(source.p3, target, pullFactor),
    pointBtw(source.p4, target, pullFactor),
  ];
};

const polygonPointsPulledTowards = (sourcePoints, targetPoint, pullFactor) =>
  sourcePoints.map((p) => pointBtw(p, targetPoint, pullFactor));

const walkPolygonIterations = (polygonPoints, manyIterations, stepFactorFn) => {
  const genPolys = [];
  for (let n = 0; n < manyIterations; n++) {
    const len = polygonPoints.length;
    const newPoly = polygonPoints.map((point, i) => {
      const nextPoint = i < len - 1 ? polygonPoints[i + 1] : polygonPoints[0];
      return pointBtw(point, nextPoint, stepFactorFn(n));
    });
    genPolys.push(newPoly);
  }
  return genPolys;
};

const regPolygon = (x, y, radius, npoints) => {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
};

function createSliderWithState(initial = 1, posX = 30, posY = 60, index = 0) {
  const sl = createSlider(0, 100, initial * 100, 1);
  const ret = {
    sliderEl: sl, 
    hasRecentChange: false
  }
  sl.position(posX + index * (200 + posX), posY);
  sl.style("width", `200px`);
  sl.input(() => ret.hasRecentChange = true);
  return ret;
}