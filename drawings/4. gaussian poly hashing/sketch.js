const offsetFraction = 100;
let iterations = 600;
let depthIterations = 80;
let maxWeightMain = 0.4;
let maxWeightSec = 0.1;
let minHueMain = 180;
let maxHueMain = minHueMain + 30;
let minHueSec = 290;
let maxHueSec = minHueSec + 30;
let clicked = false;

let hostPoly;
let walkPolys;
let pulls;

let randomTarget;

function mouseClicked() {
  clicked = !clicked;
  if (clicked) {
    loop();
  } else {
    noLoop();
  }
}

function setup() {
  createCanvas(740, 740);
  colorMode(HSL);
  initHostHash();
  background(52, 2, 97);
  randomTarget = createVector(
    map(
      random(),
      0,
      1,
      width / offsetFraction,
      (width * (offsetFraction - 1)) / offsetFraction
    ),
    map(
      random(),
      0,
      1,
      height / offsetFraction,
      (height * (offsetFraction - 1)) / offsetFraction
    )
  );

  noLoop();
}

function draw() {
  strokeWeight(maxWeightMain);
  stroke(minHueMain, 50, 50);

  background(52, 2, 97);
  drawPulledHashes();
  drawHostHash();
}

function initHostHash() {
  hostPoly = [
    createVector(0, 0),
    createVector(width, 0),
    createVector(width, height),
    createVector(0, height),
  ];
  walkPolys = walkPolygonIterations(hostPoly, iterations, () =>
    gaussianPosForHash(0.08)
  );
}

function drawHostHash() {
  drawPolygon(hostPoly);

  walkPolys.forEach((p, i) => {
    const hue = map(i, 0, walkPolys.length, minHueMain, maxHueMain);
    const weight = gaussianPosForHash() * maxWeightMain;
    stroke(hue, 50, 50);
    strokeWeight(weight);
    drawPolygon(p);
  });
}

function drawPulledHashes() {
  pulls = generatePullsTowards(hostPoly);
  pulls.forEach((p, i) => {
    stroke(map(i / depthIterations, 0, 1, maxHueSec, minHueSec), 50, 50, 1);
    strokeWeight(map(i / depthIterations, 0, 1, maxWeightSec, 0));
    const localWalkPolys = walkPolygonIterations(p, iterations / 8, () =>
      gaussianPosForHash(0.05)
    );
    localWalkPolys.forEach((wp) => drawPolygon(wp));
  });
}

const generatePullsTowards = (p) => {
  const ret = [p];
  for (let i = 1; i < depthIterations; i++) {
    const target = clicked ? createVector(mouseX, mouseY) : randomTarget;
    randomTarget = target;
    const pulled = polygonPointsPulledTowards(
      ret[i - 1],
      target,
      2.6 / depthIterations
    );
    ret.push(pulled);
  }
  return ret;
};

const gaussianPosForHash = (std) => {
  // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
  let xloc = randomGaussian();
  const sd = std || 0.1; // Define a standard deviation
  const mean = 0.5; // Define a mean value (middle of the screen along the x-axis)
  const scaled = xloc * sd + mean;
  return constrain(scaled, 0, 1); // Scale the gaussian random number by standard deviation and mean
};

const drawPolygon = (points) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
};
