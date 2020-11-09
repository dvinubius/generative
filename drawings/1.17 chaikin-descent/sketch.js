let nextPoly;

const descentDepth = 50;

let drawCt = 0;

let pullTarget;

const pullFactor = 0.06;

const chaikinIterations = 4;

let descents = 0;

function setup() {
  createCanvas(400, 400);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);
  initHost();
}

function initHost() {
  const p1 = createVector(random(width/4),0);
  const p2 = createVector(random(width/4),height);
  
  nextPoly = [
    createVector(p1.x,p1.y),
    createVector(width, random(height/2)),
    createVector(width, height - random(height/2)),
    createVector(p2.x,p2.y),
  ];
  
  const r = min(width/2, height/2);
  const theta = descents * 30;
  pullTarget = createVector(width/2 + r * cos(theta), height/2 + r*sin(theta));
  
  descents++;
}

function draw() {
  drawCt++;
  if (drawCt > descentDepth) {
    initHost();
    drawCt = 0;
  }
  nextPoly = polygonPulledTowards(
    nextPoly,
    pullTarget,
    pullFactor
  );
  
  strokeWeight(0.8);
  stroke(100, 0.4);
  noFill();
  
  const descentPolys = chaikin(nextPoly, chaikinIterations, () => 0.25, () => 0.75);
  drawPolygon(descentPolys[descentPolys.length - 1]);
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