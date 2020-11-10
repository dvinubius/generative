let hostPoly;

let drawCount = 0;
const ratio = 0.5;

let lumSlider;
let luminosity;
let depthSlider;
let drawDepth;
let randInterval;
let randIntervalSlider;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);
  
  lumSlider = createSliderWithState(0.32, 130, 30);
  depthSlider = createSliderWithState(0.8, 460, 30);
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
  ];
  
  noFill();
  strokeWeight(0.2);
  stroke((270 + drawCount) % 360, 50, luminosity, 0.1);
  
  const anchorFn = (i) => createVector(mouseX, mouseY);
  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    undefined, 
    (i) => stroke(
      (270 + drawCount) % 360, 50, 
      luminosity, 
      0.2*(1 - 0.015*(((i - 12)**2)**0.9)))
  ); 
}