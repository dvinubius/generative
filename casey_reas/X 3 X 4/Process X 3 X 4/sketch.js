const NUM_CIRCLES = 30;
const MIN_RADIUS = 30;
const MAX_RADIUS = 32;

const MIN_SPEED = 0.2;
const MAX_SPEED = 0.8;

const MIN_LUM = 5;
const MAX_LUM = 70;

const alpha = 0.15;
const saturation = 45;

const MIN_HUE = 110;
const MAX_HUE = 190;

const radiusBoss = 540;
const alphaBoss = 0.015;
const speedBoss = 1;
const offsetBoss = 40;
const satBoss = 40;
const lumBoss = (distIJ) => map(distIJ, 1, 0, 50, 80);
function hueBoss(i,j) {
  const MIN_HUE_BOSS = 20;
  const MAX_HUE_BOSS = 40;
  const diffHue = MAX_HUE_BOSS - MIN_HUE_BOSS;
  return (MIN_HUE_BOSS + (i*11 + j*3) % diffHue) % 360;
}

let elements;
 
function myHue(i, j) {
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
    elements[i] = new ElementX4(
      width/2,
      height/2,
      random(MIN_RADIUS, MAX_RADIUS),
      false,
      TWO_PI / 360,
      1.2
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }

  const boss = new ElementX3(
    offsetBoss,
    offsetBoss,
    radiusBoss,
    TWO_PI / 360,
    8
  );
  boss.speed = speedBoss;
  elements.push(boss);

  const boss2 = new ElementX3(
    width - offsetBoss,
    height - offsetBoss,
    radiusBoss,
    TWO_PI / 360,
    8
  );
  boss2.speed = speedBoss;
  elements.push(boss2);

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
        const alphaHere = j >= elements.length - 2 ? alphaBoss : alpha;
        const satHere =  j >= elements.length - 2 ? satBoss : saturation;
        const hueHere = j >= elements.length - 2 ? hueBoss(i,j) : myHue(i,j);
        const lumHere = j >= elements.length - 2 ? lumBoss(distIJ) : lum;
        stroke(hueHere, satHere, lumHere, alphaHere);
        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
      }
    }
  }
}

