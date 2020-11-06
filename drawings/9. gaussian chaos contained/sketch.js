let density = 12;
let lineWeightMin = 0.07;
let lineWeightMax = 0.08;
let sdGaussPos = 0.28;
let sdGaussOffset = 0.4;
let maxLongOffset = 15;
let baseOpacity = 0.4;
let totalStrokes = 300;
let maxRadFactor = 3.6;
let baseWeight = 25;
let baseLength = 40;
let lum = 50;

function setup() {
  createCanvas(740, 740);
  colorMode(HSL);
  noLoop();
}

function draw() {
  background(42, 99, 96);
  translate(width / 2, height / 2);

  density = 7;
  baseOpacity = 0.4;
  totalStrokes = 950;
  strokeRegionContained(120, 320, baseWeight, baseLength, 0.18, 2.2, 40);
}

const strokeRegionContained = (
  hueMin,
  hueMax,
  baseW,
  baseL,
  sdGauss,
  maxRFact,
  containMargin
) => {
  const maxR = min(width / maxRFact, height / maxRFact);
  for (let i = 0; i < totalStrokes; i++) {
    const gPosX = gaussPos(sdGauss);
    let posX = gPosX * width;
    const gPosY = gaussPos(sdGauss);
    let posY = gPosY * height;
    let distToCenter = dist(posX, posY, 0, 0);
    if (distToCenter > maxR - containMargin) {
      const pos = createVector(posX, posY);
      const scaled = pos.normalize().mult(maxR);
      posX = scaled.x;
      posY = scaled.y;
      distToCenter = dist(posX, posY, 0, 0);
    }

    const isMargin = abs(distToCenter - maxR) <= containMargin;
    const regOrigin = createVector(posX, posY);
    const angle = isMargin
      ? -regOrigin.angleBetween(createVector(1, 0))
      : radians(map(random(), 0, 1, 0, 360));
    const weight = baseW * (1 + map(random(), 0, 1, -0.2, 0.2));
    let length = baseL + (1 + map(random(), 0, 1, -0.2, 0.2));
    length = isMargin ? length * 1.2 : length;
    let hue = map(random(), 0, 1, hueMin, hueMax);
    let op = isMargin ? 1 : baseOpacity;

    lum = isMargin ? 40 : 50;
    masterStroke(regOrigin, angle, length, weight, density, hue, op);
  }
};

const masterStroke = (origin, angle, length, weight, density, hue, opacity) => {
  const stroke = genStroke(angle, length, weight, density);
  push();
  translate(origin.x, origin.y);
  drawStroke(stroke, hue, opacity);
  pop();
};

const genStroke = (angle, length, weight, density) => {
  const pairs = [];
  for (let i = 0; i < weight * density; i++) {
    const gPos = gaussPos(sdGaussPos);
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
      gaussPos(sdGaussOffset),
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

const gaussPos = (std) => {
  // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
  let xloc = randomGaussian();
  const sd = std || 0.1; // Define a standard deviation
  const scaled = xloc * sd;
  return scaled; // Scale the gaussian random number by standard deviation and mean
};

const drawStroke = (pointPairs, hue, opacity) => {
  noFill();
  pointPairs.forEach((pair) => {
    stroke(hue, 50, lum, opacity);
    strokeWeight(pair.lineWeight);
    line(pair.p1.x, pair.p1.y, pair.p2.x, pair.p2.y);
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
