const NUM_CIRCLES = 270;
const MIN_RADIUS = 10;
const MAX_RADIUS = 20;

const MIN_SPEED = 1.8;
const MAX_SPEED = 2.7;

const MIN_LUM = 25;
const MAX_LUM = 80;

const alpha = 0.4;
const saturation = 35;


const MIN_HUE = 340;
const MAX_HUE = 430;
 
let elements;

function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  frameRate(40);
  smooth();
  elements = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    elements[i] = new ElementX3(
      random(width),
      random(height),
      random(MIN_RADIUS, MAX_RADIUS),
      TWO_PI / 360,
      8
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }
  background(245);
}
 
function draw() {
  for (let i = 0; i < elements.length; i++) {
    
    elements[i].update(elements);
    // elements[i].draw();
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
        stroke(myHue3(i, j), saturation, lum, alpha);
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
      }
    }
  }
}

