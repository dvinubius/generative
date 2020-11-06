function setup() {
  createCanvas(400, 400);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);
  
}

let p1;
let p2;
let hostPoly;
const drawDepth = 20;


function draw() {
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  translate(width/2, height/2);
  rotate(-90);
  translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  // const maxX = frameCount;
  const maxX = width;

  const high1 = random(maxX);
  const high2 = random(maxX);
  const low1 = random(maxX);
  const low2 = random(maxX);
  
  pTL = createVector(min(high1, high2),0);
  pTR = createVector(max(high1, high2),0);
  pBR = createVector(max(low1, low2), height);
  pBL = createVector(min(low1, low2), height);
  
  hostPoly = [
    createVector(pTL.x,pTL.y),
    createVector(pTR.x,pTR.y),
    createVector(pBR.x,pBR.y),
    createVector(pBL.x, pBL.y),
  ];
  
  noFill();
  strokeWeight(.2);
  stroke(100);
  
  drawDescendingSubPolys(hostPoly, drawDepth);
  
  if (frameCount >= 300) {
    noLoop();
  }
}

const drawDescendingSubPolys = (hostPoly, depth) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    drawPolygon(nextPoly);
    nextPoly = walkPolygonIterations(nextPoly, 1, () => 0.5)[0];
  }
}

const drawPolygon = (points) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
};