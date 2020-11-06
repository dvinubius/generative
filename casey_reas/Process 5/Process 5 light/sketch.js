const NUM_CIRCLES = 33;
const MIN_RADIUS = 80;
const MAX_RADIUS = 140;

const MIN_SPEED = 0.3;
const MAX_SPEED = 0.9;

const constrainWithRadius = false;

const PERIM_COL = [100,60,83,0.2];
const PERIM_WEIGHT = 1;

const CENTER_COL = [204, 50, 10, 0.5];
const CENTER_WEIGHT = 3;

const LINE_COL = [100, 30, 25, 0.2];
const LINE_WEIGHT = 1;

const BG_COL = [34,5,50];


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
      constrainWithRadius,
      TWO_PI / 360 / 5,
      0.3
    );
    elements[i].speed = random(MIN_SPEED, MAX_SPEED);
  }
  background(...BG_COL);
}
 
function draw() {
  for (let i = 0; i < elements.length; i++) {
    elements[i].update(elements);
  }

  signalTouches();

  for (let i = 0; i < elements.length; i++) {
    stroke(...PERIM_COL);
    strokeWeight(PERIM_WEIGHT);
    elements[i].form.drawPerimeter();
    stroke(...CENTER_COL);
    strokeWeight(CENTER_WEIGHT);
    elements[i].form.drawCenter();
  }
}
function signalTouches() {
  const pairsForLines = new Map();
  for (let i = 0; i < elements.length - 1; i++) {
    const iCircle = elements[i].form;
    const mapForI = new Map();
    pairsForLines.set(i, mapForI);

    for (let j = i + 1; j < elements.length; j++) {
      const jCircle = elements[j].form;
      if (touchingForms(iCircle, jCircle)) {
        mapForI.set(j, {});
      }
    }
  }
  pairsForLines.forEach((mapI, i) => {
    mapI.forEach((_, j) => {
      const iCircle = elements[i].form;
      const jCircle = elements[j].form;
      stroke(LINE_COL);
      strokeWeight(LINE_WEIGHT);
      line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
    });
  });
}

