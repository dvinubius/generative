let p1;
let p2;
let hostPoly;
const drawDepth = 20;

const horizontalOutOffset = 5;

let sliderDescentRatio;
let descentRatio;
const initialDescentRatio = 0.01;

const maxUpperPts = 8;
const maxLowerPts = 20;

let sliderBasicStrokeW;
let initialBasicStrokeW = 0.33;
let basicSW;
const minSW = 0.01;
let strokeW;

strokeColArgs = [100, 0.8];
// strokeW = 0.2;
// strokeColArgs = [100, 0.8];
// strokeW = 0.6;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderDescentRatio = createSliderWithState(initialDescentRatio, 30, 160);
  sliderBasicStrokeW = createSliderWithState(initialBasicStrokeW, 330, 160);

  initializeStrokeW();

  sliderDescentRatio.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    loop();
  });

  sliderBasicStrokeW.sliderEl.input(() => {
    initializeStrokeW();
    background(0);
    drawCount = 0;
    loop();
  });
}

const initializeStrokeW = () => {
  basicSW = map(sliderBasicStrokeW.sliderEl.value(), 0, 100, 0, 0.6);
  strokeW = basicSW - 0.01*sqrt(maxUpperPts*maxLowerPts);
  strokeW = Math.max(strokeW, minSW);
}


function draw() {
  noLoop();
  descentRatio = map(sliderDescentRatio.sliderEl.value(), 0, 100, 0, 1);
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  // translate(width/2, height/2);
  // rotate(-90);
  // translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  const maxX = width;

  const hostsUpper = [];
  const hostsLower = [];

  for (let i = 0; i < max(maxUpperPts, maxLowerPts); i++) {
    if (i < maxUpperPts) hostsUpper.push(random(maxX));
    if (i < maxLowerPts) hostsLower.push(random(maxX));  
  }
  hostsUpper.sort();
  hostsLower.sort();
  
  hostsUpper.forEach((upperX) => {
    hostsLower.forEach(lowerX => {
      const vertOff1 = random(height/2);
      const vertOff2 = random(height/2);

      pTL = createVector(upperX,-horizontalOutOffset);
      pTR = createVector(width+horizontalOutOffset,-horizontalOutOffset + vertOff1);
      pBR = createVector(width+horizontalOutOffset, height+horizontalOutOffset - vertOff2);
      pBL = createVector(lowerX, height+horizontalOutOffset);
      hostPoly = [
        createVector(pTL.x,pTL.y),
        createVector(pTR.x,pTR.y),
        createVector(pBR.x,pBR.y),
        createVector(pBL.x, pBL.y),
      ];
      
      noFill();
      strokeWeight(strokeW);
      stroke(...strokeColArgs);
      
      drawDescendingSubPolys(hostPoly, drawDepth, descentRatio);
    });
  });
}

