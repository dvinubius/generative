let density = 8;
let lineWeightMin = 0.07;
let lineWeightMax = 0.08;
let sdGaussPos = 0.28;
let sdGaussOffset = 0.27;
let maxLongOffset = 35;
let baseOpacity = 0.3;

function setup() {
  createCanvas(740, 740);
  colorMode(HSL);
  background(52, 2, 97);
  noLoop();
}

function draw() {
  background(52, 2, 97);
  let verticalPad = 180;
  const s1 = createVector(width / 2, height - verticalPad);
  let hue = 10;
  masterStroke(
    s1,
    PI,
    height - 2 * verticalPad,
    260,
    density,
    hue,
    baseOpacity
  );
  hue = 20;
  masterStroke(
    s1,
    PI,
    height - 2 * verticalPad,
    260,
    density,
    hue,
    baseOpacity
  );
  hue = 30;
  masterStroke(
    s1,
    PI,
    height - 2 * verticalPad,
    260,
    density,
    hue,
    baseOpacity
  );
}

const masterStroke = (origin, angle, length, weight, density, hue, opacity) => {
  const stroke = genStroke(angle, length, weight, density);
  push();
  translate(origin.x, origin.y);
  drawBezierStroke(stroke, hue, opacity);
  pop();
};

const genStroke = (angle, length, weight, density) => {
  const pairs = [];
  for (let i = 0; i < weight * density; i++) {
    const gPos = gaussianPosForStroke(sdGaussPos);
    if (gPos < -0.5 || gPos > 0.5) continue;

    const lineWeight = map(
      Math.abs(Math.abs(gPos) - 0.5),
      0,
      0.5,
      lineWeightMin,
      lineWeightMax
    );

    const distFactor = gPos * weight;
    const longOffset = map(
      gaussianPosForStroke(sdGaussOffset),
      -0.5,
      0.5,
      -maxLongOffset,
      maxLongOffset
    );
    const transStart = createVector(distFactor, longOffset);
    const transEnd = createVector(distFactor, length + longOffset);
    transStart.rotate(angle);
    transEnd.rotate(angle);
    pairs.push(new PointPair(transStart, transEnd, lineWeight));
  }
  return pairs;
};

const gaussianPosForStroke = (std) => {
  // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
  let xloc = randomGaussian();
  const sd = std || 0.1; // Define a standard deviation
  const scaled = xloc * sd;
  return scaled; // Scale the gaussian random number by standard deviation and mean
};

const drawBezierStroke = (pointPairs, hue) => {
  noFill();
  pointPairs.forEach((pair) => {
    stroke(hue, 100, 20);
    strokeWeight(pair.lineWeight);
    const cp1 = createVector(
      (pair.p1.x + pair.p2.x) / 4,
      (pair.p1.y + pair.p2.y) / 4
    );
    const cp2 = createVector(
      ((pair.p1.x + pair.p2.x) * 7) / 8,
      ((pair.p1.y + pair.p2.y) * 7) / 8
    );
    bezier(
      pair.p1.x,
      pair.p1.y,
      cp1.x,
      cp1.y,
      cp2.x,
      cp2.y,
      pair.p2.x,
      pair.p2.y
    );
  });
};

class PointPair {
  constructor(p1, p2, lineWeight) {
    // 2 vectors
    this.p1 = p1;
    this.p2 = p2;
    this.lineWeight = lineWeight;
  }
}
