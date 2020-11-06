const NUM_CIRCLES = 60;
const MIN_RADIUS = 20;
const MAX_RADIUS = 35;

const MIN_SPEED = 0.3;
const MAX_SPEED = 0.4;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.2;
const saturation = 49;

const MIN_HUE = 100;
const MAX_HUE = 242;

let stickHeightToBaseRatio;
let squareSizeToBaseRatio;
 
let elements;
let slider1WithState;
let slider2WithState;
 
 

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
  slider1WithState = createSliderWithState(0.25, 0);
  slider2WithState = createSliderWithState(0.05, 1);

  rectMode(CENTER);
}
 
function draw() {
  for (let i = 0; i < elements.length; i++) {
    elements[i].update(elements);
  }

  stickHeightToBaseRatio = map(slider1WithState.sliderEl.value(), 0, 100, 1, 8);
  squareSizeToBaseRatio = map(slider2WithState.sliderEl.value(), 0, 100, 1, 8);
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
        const totalLen = w * stickHeightToBaseRatio;        
        const squareSize = w * squareSizeToBaseRatio;
        noFill();
        stroke(myHue(i, j), saturation, lum, alphaHere);
        line(0, 0, 0, totalLen);
        rect(0, totalLen, squareSize);
        pop();
        
        // push();
        // stroke(myHue(i, j), saturation, lum, alphaHere);
        // line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
        // stroke(0,0,80,0.2);
        // strokeWeight(3);
        // iCircle.drawCenter();
        // jCircle.drawCenter();

        pop();
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }

  if (keyCode === 82) {
    background(245);
  }
}
