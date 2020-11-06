const NUM_CIRCLES = 100;
const MIN_RADIUS = 30;
const MAX_RADIUS = 35;

const MIN_SPEED = 1.9;
const MAX_SPEED = 2.9;

const MIN_LUM = 20;
const MAX_LUM = 90;

const alpha = 0.15;
const saturation = 45;

const radiusBoss = 440;
const alphaBoss = 0.02;
const speedBoss = 1;

const MIN_HUE = 410;
const MAX_HUE = 490;
 
let elements;
 
function myHueLocal(i, j) {
  const diffHue = MAX_HUE - MIN_HUE;
  return (MIN_HUE + (i*11 + j*3) % diffHue) % 360;
}
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
  const boss = new ElementX3(
    width/2,
    height/2,
    radiusBoss,
    TWO_PI / 360,
    8
  );
  boss.speed = speedBoss;
  elements[elements.length] = boss;

  background(245);
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
        const alphaHere = j === elements.length - 1 ? alphaBoss : alpha; 
        stroke(myHueLocal(i, j), saturation, lum, alphaHere);
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
      }
    }
  }
}

