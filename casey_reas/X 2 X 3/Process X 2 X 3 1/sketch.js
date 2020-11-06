const NUM_CIRCLES_2 = 40;
const MIN_RADIUS_2 = 40;
const MAX_RADIUS_2 = 120;

const NUM_CIRCLES_3 = 100;
const MIN_RADIUS_3 = 40;
const MAX_RADIUS_3 = 45;

const MIN_SPEED_2 = 0.2;
const MAX_SPEED_2 = 0.7;

const MIN_SPEED_3 = 1.1;
const MAX_SPEED_3 = 1.5;

const MIN_LUM = 20;
const MAX_LUM = 90;

const alpha2 = 0.25;
const saturation2 = 35;

const alpha3 = 0.25;
const saturation3 = 35;

const alpha23 = 0.1;
const saturation23 = 35;

const MIN_HUE_2 = 0;
const MAX_HUE_2 = 60;

const MIN_HUE_3 = 130;
const MAX_HUE_3 = 230;

const MIN_HUE_23 = 290;
const MAX_HUE_23 = 320;
 
let elements;
 
function myHueLocal(i, j) {
  let minHue;
  let maxHue;
  if (i < NUM_CIRCLES_2 && j < NUM_CIRCLES_2) {
    minHue = MIN_HUE_2;
    maxHue = MAX_HUE_2;
  }
  else if (i >= NUM_CIRCLES_2 && j >= NUM_CIRCLES_2) {
    minHue = MIN_HUE_3;
    maxHue = MAX_HUE_3;
  } else {
    minHue = MIN_HUE_23;
    maxHue = MAX_HUE_23;
  }

  const diffHue = maxHue - minHue;
  return (minHue + (i*11 + j*3) % diffHue) % 360;
}

function alph(i,j) {
  if (i < NUM_CIRCLES_2 && j < NUM_CIRCLES_2) {
    return alpha2;
  }
  else if (i >= NUM_CIRCLES_2 && j >= NUM_CIRCLES_2) {
    return alpha3;
  } else {
    return alpha23;
  }
}

function satur(i,j) {
  if (i < NUM_CIRCLES_2 && j < NUM_CIRCLES_2) {
    return saturation2;
  }
  else if (i >= NUM_CIRCLES_2 && j >= NUM_CIRCLES_2) {
    return saturation3;
  } else {
    return saturation23;
  }
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  frameRate(40);
  smooth();
  elements = [];
  setupElementsX2();
  setupElementsX3();
  background(245);
}

function setupElementsX2() {
  for (let i = 0; i < NUM_CIRCLES_2; i++) {
    elements[i] = new ElementX2(
      random(width),
      random(height),
      random(MIN_RADIUS_2, MAX_RADIUS_2),
      TWO_PI / 360,
      8
    );
    elements[i].speed = random(MIN_SPEED_2, MAX_SPEED_2);
  }
}

function setupElementsX3() {
  for (let i = NUM_CIRCLES_2; i < NUM_CIRCLES_2 + NUM_CIRCLES_3 - 1 ; i++) {
    elements[i] = new ElementX3(
      random(width),
      random(height),
      random(MIN_RADIUS_3, MAX_RADIUS_3),
      TWO_PI / 360,
      8
    );
    elements[i].speed = random(MIN_SPEED_3, MAX_SPEED_3);
  }
}
 
function draw() {
  for (let i = 0; i < elements.length; i++) {
    
    elements[i].update(elements);
    // elements[i].draw();
  }

  signalTouches();

  push();
  strokeWeight(8);
  stroke(255);
  noFill();
  rect(0,0,width, height);
  pop();
}
function signalTouches() {
  for (let i = 0; i < elements.length - 1; i++) {
    const iCircle = elements[i].form;
    for (let j = i + 1; j < elements.length; j++) {
      const jCircle = elements[j].form;
      if (touchingForms(iCircle, jCircle)) {
        const distIJ = inverseRelativeDistance(iCircle, jCircle);
        const lum = map(distIJ, 1, 0, MIN_LUM, MAX_LUM);
        stroke(myHueLocal(i, j), satur(i,j), lum, alph(i,j));
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
      }
    }
  }
}

