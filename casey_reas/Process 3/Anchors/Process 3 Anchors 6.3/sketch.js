const NUM_CIRCLES = 100;
const MIN_RADIUS = 40;
const MAX_RADIUS = 60;

const MIN_SPEED = 2.3;
const MAX_SPEED = 2.8;

const MIN_LUM = 20;
const MAX_LUM = 100;

const alpha = 0.09;
const saturation = 45;

const MIN_HUE = 290;
const MAX_HUE = 380;
 
let elements; let sliderWithState;
let anchorPullFactor;
 
 

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
sliderWithState = createSliderWithState(0.7);
}
 
function draw() {
  if (sliderWithState.hasRecentChange) {
    background(245);
    sliderWithState.hasRecentChange = false;
    return;
  }

  for (let i = 0; i < elements.length; i++) {
    elements[i].update(elements);
  }

  anchorPullFactor = map(sliderWithState.sliderEl.value(), 0, 100, 0, 1);
signalTouches();
}
function signalTouches() {
  for (let i = 0; i < elements.length - 1; i++) {
    const iCircle = elements[i].form;
    for (let j = i + 1; j < elements.length; j++) {
      const jCircle = elements[j].form;
      if (touchingForms(iCircle, jCircle)) {
        const invDistIJ = inverseRelativeDistance(iCircle, jCircle);
        const lum = map(invDistIJ, 1, 0, MIN_LUM, MAX_LUM);  
        const alphaHere = map(invDistIJ, 1, 0, 0, alpha);
        
        push();
        noFill();
        stroke(myHue(i, j), saturation, lum, alphaHere);
        const anchorPt = anchorPoint(iCircle, jCircle);
        strokeWeight(1);
        bezier(
          iCircle.x, iCircle.y, 
          width/2, height/2, 
          anchorPt.x, anchorPt.y, 
          width/2, height/2, 
          jCircle.x, jCircle.y,
        );

        // strokeWeight(1);
        // stroke(myHue(i, j), saturation, lum, alphaHere*3);
        // line(iCircle.x, iCircle.y, jCircle.x, jCircle.y);
        pop();
      }
    }
  }
}

function anchorPoint(p1, p2) {
  const tl = createVector(0,0);
  const tr = createVector(width, 0);
  const br = createVector(width, height);
  const bl = createVector(0, height);
  const refPoints = [tl, tr, br, bl, 
  ];
  const distances = refPoints.map(p => 
    dist(p1.x, p1.y, p.x, p.y) + dist(p2.x, p2.y, p.x, p.y)  
  );
  let minPos = 0;
  let minD = distances[0];
  distances.forEach((d,i) => {
    if (d < minD) {
      minD = d;
      minPos = i;
    }
  });
  const target = refPoints[minPos];
  const midPointP1P2 = pointBtw(p1, p2, 0.5);
  return pointBtw(midPointP1P2, target, anchorPullFactor);
}


function keyPressed() {
  if (keyCode === ENTER) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}