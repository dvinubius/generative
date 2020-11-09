let hostPoly;

let drawCount = 0;

let lumSlider;
let luminosity;
let depthSlider;
let drawDepth;
let ratio;
let ratioSlider;
let randInterval;
let randIntervalSlider;

function setup() {
  createCanvas(800, 800);
  frameRate(20);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);
  
  lumSlider = createSliderWithState(0.12, 130, 30);
  depthSlider = createSliderWithState(0.5, 460, 30);
  ratioSlider = createSliderWithState(0.1, 130, 60);
  randIntervalSlider = createSliderWithState(0, 460, 60);
}

function draw() {
  if (keyIsDown(82)) {
    background(97);
  }

  if (keyIsDown(70)) {
    background(97, 0.04);
  }

  const shouldDraw = mouseIsPressed && mouseX > 0 && mouseY > 0;
  if (!shouldDraw) {return;}
  
  ratio = map(ratioSlider.sliderEl.value(), 0, 100, 0, 1);
  luminosity = map(lumSlider.sliderEl.value(), 0, 100, 0, 100);
  drawDepth = floor(map(depthSlider.sliderEl.value(), 0, 100, 2, 43));
  randInterval = map(randIntervalSlider.sliderEl.value(), 0, 100, 0, width/2);
  
  drawCount++;
  
  stroke(10);
  noFill();   
  rect(0,0,width,height);
  
  const added =  -randInterval/2 + random(randInterval);
  const high1 = width*1/4 + added;
  const high2 = width*3/4 + added;
  const low1 = width*1/4 + added;
  const low2 = width*3/4 + added;
  
  pTL = createVector(high1,0);
  pTR = createVector(high2,0);
  pMid1 = createVector(width , height/3);
  pMid2 = createVector(width, height*2/3);
  pBR = createVector(low2, height );
  pBL = createVector(low1, height);
  
  hostPoly = [
    pTL,
    pTR,
    pMid1,
    pMid2,
    pBR,
    pBL,
    pBL,
  ];
  
  noFill();
  strokeWeight(0.2);
  
  const direction = map(mouseX/width, 0, 1, 1, - 1);
  // anchorFn = (i) => createVector(mouseX, mouseY + (i**2/8 - i * 12)*direction);
  anchorFn = (i) => createVector(100 - (i / 2)**2, mouseY + (i**2/4 - i * 24)*direction);
  drawDescendingSubPolysWithAnchor1(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio
  );  
}

const drawDescendingSubPolysWithAnchor1 = (anchorGen, hostPoly, depth, ratio = 0.5, curved = false) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    const doClose = false;
    stroke((270 + drawCount) % 360, 50, luminosity, 0.9*(1 - 0.001*(i - 32)**2));
    curved ? drawPolygonCurved(nextPoly, doClose) : drawPolygon(nextPoly, doClose);
    
    const polygonPoints = nextPoly;
    const len = polygonPoints.length;
    nextPoly = [anchorGen(i)].concat(polygonPoints.map((point, i) => {
      const nextPoint = i < len - 1 ? polygonPoints[i + 1] : polygonPoints[0];
      return pointBtw(point, nextPoint, ratio);
    }));
    nextPoly[nextPoly.length - 1] = nextPoly[0];
  }
};