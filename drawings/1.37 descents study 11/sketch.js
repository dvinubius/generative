
let hostPolys;

let ratioSlider;
let ratio;
let depthSlider;
let drawDepth;


let useLastPosXY = false;
let lastX;
let lastY;
let running = false;

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
  ratioSlider = createSliderWithStateAndText(0.17, 130, 30, 'rat');
  depthSlider = createSliderWithStateAndText(0.9, 460, 30, 'dep');
  circleRadWidthFractionSlider = createSliderWithStateAndText(0.22*2, 130, 60, 'rad');
  circleShrinkFactorSlider = createSliderWithStateAndText(0.7, 460, 60, 'shr');
  [
    ratioSlider,
    depthSlider,
    circleRadWidthFractionSlider,
    circleShrinkFactorSlider
  ].forEach(sl => sl.sliderEl.input(
    () => {
      useLastPosXY = true;
      running = true;
    }
  ));

  const randPts = (n, l, int) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      pts.push(l + random(int));
    }
    return pts;
  }

  const upperN = 3;
  const lowerN = 2;

  hostPolys = [];
  const circles = 6;
  for (let i = 0; i < circles; i++) {
    const hostPoly = [
      ...randPts(upperN, 0, width).map(pos => createVector(pos, 0)),
      ...randPts(lowerN, 0, width).map(pos => createVector(pos, height)),
    ];
    hostPoly.push(hostPoly[hostPoly.length - 1]);
    hostPolys.push(hostPoly);
  }
}

function mousePressed() {
  if (mouseY > 0)
  running = !running;
}

function draw() {
  if (!running) {
    return;
  }

  background(97);
  
  ratio = map(ratioSlider.sliderEl.value(), 0, 100, 0, 1);
  drawDepth = floor(map(depthSlider.sliderEl.value(), 0, 100, 2, 163));
  circleRadWidthFraction = map(
    circleRadWidthFractionSlider.sliderEl.value(), 
    0, 100, 0, 0.5);
  circleShrinkFactor = map(
    circleShrinkFactorSlider.sliderEl.value(),
    0, 100, 0.8, 1);

  stroke(10);
  noFill();   
  strokeWeight(0.2);
  
  const posY = useLastPosXY ? lastY : mouseY;
  const posX = useLastPosXY ? lastX : mouseX;
  lastX = posX;
  lastY = posY;
  

  hostPolys.forEach((hostPoly, index) => {
    let anchorFn = (i) => {
      const rad = width*circleRadWidthFraction*(circleShrinkFactor**index);
      return createVector(
          posX + rad * sin((index*70 + i)*3),
          posY + rad * cos((index*70 + i)*3),
        );
      }
    drawDescendingSubPolysWithAnchor(
      anchorFn,
      hostPoly,
      drawDepth,
      ratio,
      undefined,
      (i) => {
        stroke(
          270,
          50,
          12,
          // 0.8
          0.2*(1 - i*0.006)
        )
      }
    );
  }); 
}
