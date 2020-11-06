const NUM_CIRCLES = 50;
const MIN_RADIUS = 20;
const MAX_RADIUS = 120;

const MIN_SPEED = 0.3;
const MAX_SPEED = 1.2;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.3;
const saturation = 25;

const constrainWithRadius = false;

const MIN_HUE = 60;
const MAX_HUE = 250;
 
let elements;

function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  frameRate(50);
  smooth();
  elements = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    elements[i] = new Element1(
      random(width),
      random(height),
      random(MIN_RADIUS, MAX_RADIUS),
      constrainWithRadius,
      TWO_PI / 360 / 5,
      0.3
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }
  background(245);
}
 
function draw() {
  for (let i = 0; i < elements.length; i++) {
    elements[i].update(elements);
  }

  signalTouches();
}
function signalTouches() {
  const pairsForLines = new Map();
  let minLength;
  let maxLength;
  for (let i = 0; i < elements.length - 1; i++) {
    const iCircle = elements[i].form;
    const mapForI = new Map();
    pairsForLines.set(i, mapForI);

    for (let j = i + 1; j < elements.length; j++) {
      const jCircle = elements[j].form;
      if (touchingForms(iCircle, jCircle)) {
        const distIJ = dist(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
        mapForI.set(j, distIJ);
        if (minLength == null || distIJ < minLength) {
          minLength = distIJ;
        }
        if (maxLength == null || distIJ > maxLength) {
          maxLength = distIJ;
        }
      }
    }
  }
  pairsForLines.forEach((mapI, i) => {
    mapI.forEach((dist, j) => {
      const iCircle = elements[i].form;
      const jCircle = elements[j].form;
      const lum = map(dist, minLength, maxLength, MIN_LUM, MAX_LUM);
      stroke(myHue(i, j), saturation, lum, alpha);
      line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
    });
  });
}

