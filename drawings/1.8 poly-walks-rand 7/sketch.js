let p1;
let p2;
let hostPoly;
const drawDepth = 20;

let sliderIsolation;
let cornerIsolation;

let drawCount = 0;

function setup() {
  createCanvas(600, 600);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderIsolation = createSliderWithState(0.5, 30, 160);
  sliderIsolation.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    loop();
  });
}


function draw() {
  drawCount++;
  cornerIsolation = map(sliderIsolation.sliderEl.value(), 0, 100, 0, 1);
  
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
  strokeWeight(.05);
  stroke(100, 0.8);
  
  drawDescendingSubPolys(hostPoly, drawDepth, cornerIsolation);
  
  if (drawCount >= 380) {
    noLoop();
  }
}

const drawDescendingSubPolys = (hostPoly, depth, ratio = 0.5) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    drawPolygon(nextPoly);
    nextPoly = walkPolygonIterations(nextPoly, 1, () => ratio)[0];
  }
}

const drawPolygon = (points) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
};