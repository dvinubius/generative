let nextPoly;

const descentDepth = 60;

let drawCt = 0;

let descents = 0;


let upperPs = [];
let lowerPs = [];
let leftPs = [];
let rightPs = [];

const totalPsEdge = 20;


function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(60,50,97);
  initPoints();
}

function initPoints() {
  for (let i = 0; i < totalPsEdge; i++) {
    upperPs.push(createVector(random(width),0));
    lowerPs.push(createVector(random(width),height));
    leftPs.push(createVector(0, random(height)));
    rightPs.push(createVector(width, random(height)));
  } 
}

function draw() {
  if (frameCount >= 100) {
    noLoop();
  }
  strokeWeight(0.2);
  stroke(140,50,9, 0.1);
  noFill();
  
  const upForPairs = [];
  const lowForPairs = [];
  const leftForPairs = [];
  const rightForPairs = [];
  const TBPairs = [];
  const LRPairs = [];
  for (let i = 0; i < totalPsEdge; i++) {
    const newUp = upperPs.splice(floor(random(upperPs.length)), 1)[0];
    const newLow = lowerPs.splice(floor(random(lowerPs.length)), 1)[0];
    const newLeft = leftPs.splice(floor(random(leftPs.length)), 1)[0];
    const newRight = rightPs.splice(floor(random(rightPs.length)), 1)[0];
    upForPairs.push(newUp);
    lowForPairs.push(newLow);
    leftForPairs.push(newLeft);
    rightForPairs.push(newRight);
    
    TBPairs.push([newUp, newLow]);
    LRPairs.push([newLeft, newRight]);
  }
  
  const polys = [];
  for (let i = 0; i < TBPairs.length; i++) {
    polys.push([
      TBPairs[i][0],
      LRPairs[i][1],
      TBPairs[i][1],
      LRPairs[i][0]
    ]);
  }
  
  polys.forEach((p) => {
    const descentPolys = descentInner(p, descentDepth, () => 0.1 + random()*0.1);
    descentPolys.forEach(dp => drawPolygonCurved(dp));
  });

  upperPs = upForPairs;
  lowerPs = lowForPairs;
  leftPs = leftForPairs;
  rightPs = rightForPairs;
}
