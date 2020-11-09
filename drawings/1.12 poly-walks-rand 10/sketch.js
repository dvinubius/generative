let p1;
let p2;
let hostPoly;
const drawDepth = 20;

let sliderCornerIsolation;
let cornerIsolation;

let sliderDescentRatio;
let descentRatio;
const initialDescentRatio = 0.5;

let drawCount = 0;
const maxDrawCt = 380;
// const maxDrawCt = 1;

strokeColArgs = [100, 0.8];
strokeW = .05;
// strokeColArgs = [100, 0.8];
// strokeW = 0.6;

function setup() {
  createCanvas(600, 600);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderCornerIsolation = createSliderWithState(0.5, 30, 160);
  sliderDescentRatio = createSliderWithState(initialDescentRatio, 330, 160);
  [sliderCornerIsolation,sliderDescentRatio].forEach(sl => sl.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    loop();
  }));
}


function draw() {
  drawCount++;
  cornerIsolation = map(sliderCornerIsolation.sliderEl.value(), 0, 100, 0, 1);
  descentRatio = map(sliderDescentRatio.sliderEl.value(), 0, 100, 0, 1);
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  // translate(width/2, height/2);
  // rotate(-90);
  // translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  const maxX = width;

  const highMin = random(maxX/2);
  const highMax = maxX - highMin;
  const lowMin = random(maxX/2);
  const lowMax = maxX - lowMin;
  
  pTL = createVector(highMin,0);
  pTR = createVector(highMax,0);
  pBR = createVector(lowMax, height);
  pBL = createVector(lowMin, height);
  
  hostPoly = [
    createVector(pTL.x,pTL.y),
    createVector(pTR.x,pTR.y),
    createVector(pBR.x,pBR.y),
    createVector(pBL.x, pBL.y),
  ];
  
  noFill();
  strokeWeight(strokeW);
  stroke(...strokeColArgs);
  
  const curved = false;
  drawDescendingSubPolys(hostPoly, drawDepth, descentRatio, curved);
  
  if (drawCount >= maxDrawCt) {
    noLoop();
  }
}

