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

let pivotHeight;
let pivotHeightSlider;
let verticalShiftSlider;
let verticalShift;

function setup() {
  createCanvas(800, 800);
  frameRate(20);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);

  const sp0 = createSpan('Mouse L-R => position - - - Mouse U-D => direction - - - Press \'r\' => reset');
  sp0.position(12, 4);
  sp0.style('letter-spacing: 0.2em');
  sp0.style('font-size', '14px');
  sp0.style('color', '#ffffff');
  
  lumSlider = createSliderWithStateAndText(0.25, 12, 30, 'lum');
  ratioSlider = createSliderWithStateAndText(0.5, 12, 60, 'rat');
  pivotHeightSlider = createSliderWithStateAndText(0.2, 282, 30, 'div');
  verticalShiftSlider = createSliderWithStateAndText(0.8, 282, 60, 'shft');
  depthSlider = createSliderWithStateAndText(0.1, 542, 30, 'dep');
  randIntervalSlider = createSliderWithStateAndText(0, 542, 60, 'rand');
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
  drawDepth = floor(map(depthSlider.sliderEl.value(), 0, 100, 28, 93));
  randInterval = map(randIntervalSlider.sliderEl.value(), 0, 100, 0, width/2);
  pivotHeight = map(pivotHeightSlider.sliderEl.value(), 0, 100, 0, width*3/4);
  verticalShift = map(verticalShiftSlider.sliderEl.value(), 0, 100, 20, 300);
  
  translate(width/2, height/2);
  rotate(90);
  translate(-width/2+verticalShift, -height/2);

  drawCount++;
  
  stroke(10);
  noFill();   
  
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
  
  const direction = map(mouseY/width, 0, 1, 1, - 1);
  anchorFn = (i) => createVector(
    pivotHeight - (i / 2)**2,
    width - mouseX + (i**2/4 - i * 24)*direction
  );
  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    undefined,
    (i) => stroke(
      (270 + drawCount) % 360,
      50,
      luminosity,
      0.25*(1 - 0.004*(i - 40)**2))
  );  
}
