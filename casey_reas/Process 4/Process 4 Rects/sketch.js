const NUM_CIRCLES = 90;
const MIN_RADIUS = 50;
const MAX_RADIUS = 60;

const MIN_SPEED = 0.3;
const MAX_SPEED = 1.4;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.99;
const saturation = 49;

const MIN_HUE = 100;
const MAX_HUE = 202;

rectHeightWidthRatio = 1;
 
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
      true,
      TWO_PI / 360 / 5,
      0.4
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }
  background(245);
}
 
function draw() {
  // background(0,0,245, 0.01);
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
        const alphaHere = map(distIJ, 1, 0, alpha, 0);
        
        
        push();
        const midPoint = pointBtw(iCircle.position, jCircle.position, 0.5);
        const diff = p5.Vector.sub(jCircle.position, iCircle.position);
        const ang = diff.heading();
        translate(midPoint.x, midPoint.y);
        rotate(ang);
        stroke(myHue(i, j), saturation, lum, alphaHere);
        strokeWeight(1);
        rectMode(CENTER);
        fill(myHue(i, j), saturation, lum, alphaHere);
        rect(0, 0, diff.mag(), diff.mag()*rectHeightWidthRatio);
        // line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
        pop();

    
      }
    }
  }
}

