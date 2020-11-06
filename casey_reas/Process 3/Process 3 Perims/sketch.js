const NUM_CIRCLES = 100;
const MIN_RADIUS = 20;
const MAX_RADIUS = 50;

const MIN_SPEED = 0.3;
const MAX_SPEED = 1.2;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.3;
const saturation = 45;

const MIN_HUE = 160;
const MAX_HUE = 220;
 
let elements;
 
 

function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  frameRate(50);
  smooth();
  elements = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    elements[i] = new ElementY1(
      random(width),
      random(height),
      random(MIN_RADIUS, MAX_RADIUS)
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }
  background(245);
}
 
function draw() {
  background(245);

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
        iCircle.drawPerimeter();
        jCircle.drawPerimeter();
      }
    }
  }
}

