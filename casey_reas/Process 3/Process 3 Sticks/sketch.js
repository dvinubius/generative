const NUM_CIRCLES = 70;
const MIN_RADIUS = 40;
const MAX_RADIUS = 45;

const MIN_SPEED = 0.3;
const MAX_SPEED = 0.9;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 1;
const saturation = 49;

const MIN_HUE = 300;
const MAX_HUE = 442;

stickHeightToBaseRatio = 2;
 
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
  // background(0,0,100, 0.01);
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
        strokeWeight(1);
        const w = diff.mag();
        stroke(myHue(i, j), saturation, lum, alphaHere);
        line(0, 0, 0, w * stickHeightToBaseRatio);
        pop();
        
        push();
        stroke(myHue(i, j), saturation, lum, alphaHere);
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
        // stroke(0,0,80,0.2);
        strokeWeight(3);
        iCircle.drawCenter();
        jCircle.drawCenter();

        pop();
      }
    }
  }
}

