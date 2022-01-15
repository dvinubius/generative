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
  return source.map(p => pointBtw(p, target, pullFactor));
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

const genSingleSubPolygon = (hostPolygonPoints, ratioFn) => walkPolygonIterations(hostPolygonPoints, 1, ratioFn)[0];

const drawDescendingSubPolys = (hostPoly, depth, ratio = 0.5, curved = false) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    curved ? drawPolygonCurved(nextPoly) : drawPolygon(nextPoly);
    nextPoly = genSingleSubPolygon(nextPoly, () => ratio);
  }
}

const drawDescendingSubPolysWithAnchor = (anchorGen, hostPoly, depth, ratio = 0.5, curved = false, strkFn) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    const doClose = false;
    if (strkFn) {
      strkFn(i);
    }
    curved ? drawPolygonCurved(nextPoly, doClose) : drawPolygon(nextPoly, doClose);
    
    const polygonPoints = nextPoly;
    const len = polygonPoints.length;
    nextPoly = [anchorGen(i)].concat(polygonPoints.map((point, i) => {
      const nextPoint = i < len - 1 ? polygonPoints[i + 1] : polygonPoints[0];
      return pointBtw(point, nextPoint, ratio);
    }));
    nextPoly[nextPoly.length - 1] = nextPoly[0];
  }
};

const descentInner = (polygonPoints, manyIterations, stepFactorFn1) => {
  const genPolys = [];
  for (let n = 0; n < manyIterations; n++) {
    const len = polygonPoints.length;
    const newPoly = [];
    polygonPoints.forEach((point, idx) => {
      const nextPoint = idx < len - 1 ? polygonPoints[idx + 1] : polygonPoints[0];
      newPoly.push(pointBtw(point, nextPoint, stepFactorFn1(n)));
    });
    genPolys.push(newPoly);
    polygonPoints = newPoly;
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

function createSliderWithState(initial = 1, posX = 30, posY = 60) {
  const sl = createSlider(0, 100, initial * 100, 1);
  const ret = {
    sliderEl: sl, 
    hasRecentChange: false
  }
  sl.position(posX, posY);
  sl.style("width", `200px`);
  sl.input(() => ret.hasRecentChange = true);
  return ret;
}

function createSliderWithStateAndText(initial = 1, posX = 30, posY = 60, text) {
  const ret = createSliderWithState(initial, posX + 28, posY);
  const sp = createSpan(text);
  sp.position(posX, posY);
  sp.style('font-size', '14px');
  sp.style('color', '#ffffff');
  return ret;
};

const chaikin = (polygonPoints, manyIterations, stepFactorFn1, stepFactorFn2) => {
  const genPolys = [];
  for (let n = 0; n < manyIterations; n++) {
    const len = polygonPoints.length;
    const newPoly = [];
    polygonPoints.forEach((point, idx) => {
      const nextPoint = idx < len - 1 ? polygonPoints[idx + 1] : polygonPoints[0];
      newPoly.push(pointBtw(point, nextPoint, stepFactorFn1(n)));
      newPoly.push(pointBtw(point, nextPoint, stepFactorFn2(n)));
    });
    genPolys.push(newPoly);
    polygonPoints = newPoly;
  }
  return genPolys;
};


const drawPolygon = (points, doClose = true) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(doClose ? CLOSE : null);
};

const drawPolygonCurved = (points, doClose = true) => {
  noFill();
  beginShape();
  points.forEach((p) => curveVertex(p.x, p.y));
  endShape(doClose ? CLOSE : null);
};

