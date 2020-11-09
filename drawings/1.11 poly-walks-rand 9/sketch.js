let hostPoly;
const drawDepth = 20;

let sliderIsolation;
let sliderTwist;
let twist;

let gridDensity = 80;
let sliderGridDensity;

let strokeColArgs = [174, 20, 90, 0.6];
let bgColArgs = [174, 70, 6];
let strokeW = 0.7;

let stepFactorFn = (n) => (n+1)/(gridDensity+1)*twist;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(...bgColArgs);
  
  sliderCornerIsolation = createSliderWithState(0, 30, 160);
  sliderTwist = createSliderWithState(1, 230, 120);
  sliderGridDensity = createSliderWithState(1, 430, 160);
  sliderCornerIsolation.sliderEl.input(() => {
    initHostPoly();
    background(...bgColArgs);
    loop();
  });
  [sliderTwist, sliderGridDensity].forEach(sl => sl.sliderEl.input(() => {
    background(...bgColArgs);
    loop();
  }));


  initHostPoly();
}

function initHostPoly() {
  const maxX = width;
  const maxY = height;

  const cornerIsolation = map(sliderCornerIsolation.sliderEl.value(), 0, 100, 0, 0.5);
  const highMin = random(maxX*cornerIsolation);
  const highMax = maxX - random(maxX*cornerIsolation);
  const lowMin = random(maxX*cornerIsolation);
  const lowMax = maxX - random(maxX*cornerIsolation);


  const leftMin = random(maxY*cornerIsolation);
  const leftMax = maxY - random(maxY*cornerIsolation);
  const rightMin = random(maxY*cornerIsolation);
  const rightMax = maxY - random(maxY*cornerIsolation);
  
  pTL = createVector(highMin,leftMin);
  pTR = createVector(highMax,rightMin);
  pBR = createVector(lowMax, rightMax);
  pBL = createVector(lowMin, leftMax);
  
  hostPoly = [
    createVector(pTL.x,pTL.y),
    createVector(pTR.x,pTR.y),
    createVector(pBR.x,pBR.y),
    createVector(pBL.x, pBL.y),
  ];
}


function draw() {
  noLoop();
  twist = map(sliderTwist.sliderEl.value(), 0, 100, 0, 1);
  gridDensity = map(sliderGridDensity.sliderEl.value(), 0, 100, 1, 200);
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  // translate(width/2, height/2);
  // rotate(-90);
  // translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  noFill();
  strokeWeight(strokeW);
  stroke(...strokeColArgs);
  
  drawDescendingSubPolysAndGrids(hostPoly, drawDepth);
}

const drawDescendingSubPolysAndGrids = (hostPoly, depth) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    drawPolygon(nextPoly);
    let additionals = walkPolygonIterations(nextPoly, gridDensity, stepFactorFn);
    additionals.forEach(p => drawPolygon(p));
    nextPoly = additionals[floor(gridDensity / 2)];
  }
}