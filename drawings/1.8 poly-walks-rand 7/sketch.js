let p1;
let p2;
let hostPoly;
const drawDepth = 20;

let sliderCornerIsolation;
let cornerIsolation;

let drawCount = 0;

function setup() {
  createCanvas(800, 800);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderCornerIsolation = createSliderWithState(0.5, 30, 50);
  sliderCornerIsolation.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    loop();
  });
}


function draw() {
  drawCount++;
  cornerIsolation = map(sliderCornerIsolation.sliderEl.value(), 0, 100, 0, 1);
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  translate(width/2, height/2);
  rotate(-90);
  translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
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
