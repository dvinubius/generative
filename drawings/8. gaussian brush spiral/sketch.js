let density = 12;
let lineWeightMin = 0.07;
let lineWeightMax = 0.08;
let sdGaussPos = 0.28;
let sdGaussOffset = 0.4;
let maxLongOffset = 15;
let baseOpacity = 0.4;
let totalStrokes = 300;
let maxRadFactor = 3.6;
let baseWeight = 20;
let baseLength = 60;

function setup() {
  createCanvas(740, 740);
  colorMode(HSL);
  background(52, 2, 97);
  noLoop();
}

function draw() {
  background(52, 2, 97);
  translate(width / 2, height / 2);
  spiralStrokes(14, 4, 80, 29, 30, 20, 180);
}

const spiralStrokes = (
  initialR,
  incR,
  many,
  angleInc,
  initialLength,
  initialWeight,
  hue
) => {
  let radius = initialR;
  for (let i = 0; i < many; i++) {
    const angle = radians(i * angleInc);
    const s1 = createVector(cos(angle), sin(angle)).mult(radius);
    const w = map(i, 0, many - 1, initialWeight, initialWeight * 6);
    const l = map(i, 0, many - 1, initialLength, initialLength * 3.4);
    masterStroke(
      s1,
      angle - PI / 2 - radians(1),
      l,
      w,
      density,
      hue,
      baseOpacity
    );
    radius += incR;
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
    stroke(hue, 50, 50, opacity);
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
