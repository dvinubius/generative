
let hostPoly;

let drawCount = 0;

let ratioSlider;
let ratio;
let depthSlider;
let drawDepth;

let reset = false;

let circleRadWidthFraction;
let circleRadWidthFractionSlider;
let circleShrinkFactor;
let circleShrinkFactorSlider;

function setup() {
  const cnv = createCanvas(800, 800);
  cnv.mouseOver(() => useLastPosXY = false);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);
  
  ratioSlider = createSliderWithStateAndText(0.5, 130, 30, 'rat');
  depthSlider = createSliderWithStateAndText(0.8, 460, 30, 'dep');
  circleRadWidthFractionSlider = createSliderWithStateAndText(0.22*2, 130, 60, 'rad');
  circleShrinkFactorSlider = createSliderWithStateAndText(0.7, 460, 60, 'shr');
}


function mousePressed() {
  if (mouseY > 0) {
    drawCount = 0;
    loop();
  }
}

function draw() {
  if (reset) {
    background(97);
    reset = false;
    noLoop();
    return;
  }
  if (drawCount >= 4) noLoop();

  
  ratio = map(ratioSlider.sliderEl.value(), 0, 100, 0, 1);
  drawDepth = floor(map(depthSlider.sliderEl.value(), 0, 100, 2, 163));
  circleRadWidthFraction = map(
    circleRadWidthFractionSlider.sliderEl.value(), 
    0, 100, 0, 0.5);
  circleShrinkFactor = map(
    circleShrinkFactorSlider.sliderEl.value(),
    0, 100, 0.8, 1);

  drawCount++;
  
  stroke(10);
  noFill();   
  rect(0,0,width,height);
  
  const randPts = (n, l, int) => {
    const pts = [];
    const step = int / (n+1);
    for (let i = 0; i < n; i++) {
      pts.push(l + (i+1)*step);
    }
    return pts;
  }

  const upperN = 1 + floor(random(26));
  const lowerN = upperN*0.66;

   hostPoly = [
    ...randPts(upperN, -width/2, width*2).map(pos => createVector(pos, 0)),
    ...randPts(lowerN, -width/2, width*2).map(pos => createVector(pos, height)),
  ];
  hostPoly.push(hostPoly[hostPoly.length - 1]);
  
  
  noFill();
  strokeWeight(0.2);
  
  let anchorFn = (i) => {       
    const rad = width*circleRadWidthFraction*(circleShrinkFactor**drawCount);
    return createVector(
        width/2 + rad * sin((drawCount*70 + i)*3),
        height/2 + rad * cos((drawCount*70 + i)*3),
      );
    }

  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    undefined,
    (i) => stroke(
      270,
      50,
      12,
      0.2
    )
  ); 
}
function keyPressed() {
  if (keyCode === 82) {
    reset = true;
    loop();
  }
}
