const NUM_CIRCLES = 60;
const MIN_RADIUS = 20;
const MAX_RADIUS = 35;

const MIN_SPEED = 0.3;
const MAX_SPEED = 0.4;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.2;
const saturation = 49;

const MIN_HUE = 200;
const MAX_HUE = 342;

let anchorHeightToBaseRatio;
let wingWidth;
let wingHeight;
 
let elements;
let slider1WithState;
let slider2WithState;
let slider3WithState;
 
 

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
  slider2WithState = createSliderWithState(0.5, 1);
  slider3WithState = createSliderWithState(0.3, 2);
}
 
function draw() {
  // background(0,0,100, 0.01);
  // background(245);
  for (let i = 0; i < elements.length; i++) {
    elements[i].update(elements);
  }

  stickHeightToBaseRatio = map(
    slider1WithState.sliderEl.value(), 0, 100, 1, 8);
  wingWidth = map(
    slider2WithState.sliderEl.value(), 0, 100, 1, 5);
  wingHeight = map(
    slider3WithState.sliderEl.value(), 0, 100, 0,2);
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

        const w = diff.mag();
        const totalLen = w * stickHeightToBaseRatio;
        const targetPointHalf = createVector(0, totalLen/2);
        const wingPtLeft = createVector(
          -w/2 * wingWidth,
          totalLen*wingHeight
        );
        const wingPtRight = createVector(
          w/2 * wingWidth,
          totalLen*wingHeight
        );
        const wingPtLeftHalf = createVector(
          -w/2 * wingWidth*0.5,
          totalLen*wingHeight
        );
        const wingPtRightHalf = createVector(
          w/2 * wingWidth * 0.5,
          totalLen*wingHeight
        );

        noFill();
        strokeWeight(1);
        stroke(myHue(i, j), saturation, lum, alphaHere);
        line(0, 0, wingPtLeft.x, wingPtLeft.y);
        line(0, 0, wingPtRight.x, wingPtRight.y);
        line(targetPointHalf.x, targetPointHalf.y, wingPtLeftHalf.x, wingPtLeftHalf.y);
        line(targetPointHalf.x, targetPointHalf.y, wingPtRightHalf.x, wingPtRightHalf.y);
        pop();
        
        push();
        stroke(myHue(i, j), saturation, lum, alphaHere);
        // line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);

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
