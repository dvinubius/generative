const NUM_CIRCLES = 35;
const MIN_RADIUS = 20;
const MAX_RADIUS = 120;

const MIN_SPEED = 0.9;
const MAX_SPEED = 2;

const MIN_LUM = 35;
const MAX_LUM = 80;

const alpha = 0.3;
const saturation = 25;

const constrainWithRadius = false;

const MIN_HUE = 160;
const MAX_HUE = 250;
 
let elements;

function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  frameRate(50);
  smooth();
  elements = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    elements[i] = new ElementX1(
      random(width),
      random(height),
      random(MIN_RADIUS, MAX_RADIUS),
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
  for (let i = 0; i < elements.length - 1; i++) {
    const iCircle = elements[i].form;
    for (let j = i + 1; j < elements.length; j++) {
      const jCircle = elements[j].form;
      if (touchingForms(iCircle, jCircle)) {
        const distIJ = inverseRelativeDistance(iCircle, jCircle);
        const lum = map(distIJ, 1, 0, MIN_LUM, MAX_LUM);
        stroke(myHue(i, j), saturation, lum, alpha);
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
      }
    }
  }
}

