let p1;
let p2;
let hostPoly;
const drawDepth = 20;


let sliderDescentRatio;
let descentRatio;
const initialDescentRatio = 0.5;

const maxUpperPts = 20;
const maxLowerPts = 20;

strokeColArgs = [100, 0.8];
let sliderBasicStrokeW;
let initialBasicStrokeW = 0.53;
let basicSW;
const minSW = 0.01;
let strokeW;

const horizontalOutFactor = 0;
let horizontalOutOffset;
let sdGaussOffsetHorizontal = 0.1;
let sdGaussOffsetVertical = 0.1;

/** btw. -sdGaussOffset and sdGaussOffset */
const gaussianPos = (offset) => {
  // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
  let xloc = randomGaussian();
  const sd = offset; 
  const scaled = xloc * sd;
  return scaled;
};

const horizontalRand = () => width*(0.5 + gaussianPos(sdGaussOffsetHorizontal));
const verticalRand = () => (0.5+ gaussianPos(sdGaussOffsetVertical))*height;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderDescentRatio = createSliderWithState(initialDescentRatio, 30, 160);
  sliderBasicStrokeW = createSliderWithState(initialBasicStrokeW, 330, 160);
  horizontalOutOffset = width*horizontalOutFactor;

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
  
  const hostsUpper = [];
  const hostsLower = [];

  const maxx = max(maxUpperPts, maxLowerPts);
  const step = width/maxx;
  for (let i = 0; i < maxx; i++) {
    // const p1 = i*step;
    // const p2 = i*step;
    const p1 = horizontalRand();
    const p2 = horizontalRand();
    if (i < maxUpperPts) hostsUpper.push(p1);
    if (i < maxLowerPts) hostsLower.push(p2);  
  }
  hostsUpper.sort();
  hostsLower.sort();
  
  hostsUpper.forEach((upperX) => {
    hostsLower.forEach(lowerX => {
      const vertOff2 = verticalRand();

      pTL = createVector(upperX,0);
      pTR = createVector(width+horizontalOutOffset,vertOff2);
      pBR = createVector(width+horizontalOutOffset, vertOff2);
      pBL = createVector(lowerX, height);
      hostPoly = [
        createVector(pTL.x,pTL.y),
        createVector(pTR.x,pTR.y),
        createVector(pBR.x,pBR.y),
        createVector(pBL.x, pBL.y),
      ];
      
      noFill();
      strokeWeight(strokeW);
      stroke(...strokeColArgs);
      const curved = true;
      drawDescendingSubPolys(hostPoly, drawDepth, descentRatio, curved);
    });
  });
}
