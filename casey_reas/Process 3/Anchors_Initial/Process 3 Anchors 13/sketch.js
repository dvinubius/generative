const NUM_CIRCLES = 60;
const MIN_RADIUS = 60;
const MAX_RADIUS = 80;

const MIN_SPEED = 0.3;
const MAX_SPEED = 0.8;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.2;
const saturation = 45;

const MIN_HUE = 160;
const MAX_HUE = 220;
 
let elements; const anchorPullFactor = 0.7;
 
 

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
  background(0,0,245, 0.01);

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

        push();
        noFill();
        stroke(myHue(i, j), saturation, lum, alpha);
        const anchorPt = anchorPoint(iCircle, jCircle);
        const anchorPt2 = anchorPt.copy();
        anchorPt2.add(createVector(5, 5));
        strokeWeight(1);
        bezier(
          iCircle.x, iCircle.y, 
          anchorPt.x, anchorPt.y, 
          anchorPt2.x, anchorPt2.y, 
          jCircle.x, jCircle.y,
        );

        line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);

        strokeWeight(3);
        iCircle.drawCenter();
        jCircle.drawCenter();

        pop();
      }
    }
  }
}

function anchorPoint(p1, p2) {
  const center = createVector(width/2, height/2);
  const midPointP1P2 = pointBtw(p1, p2, 0.5);
  return pointBtw(midPointP1P2, center, anchorPullFactor);
}

