
let hostPoly;

let drawCount = 0;

let running = false;

let ratioSlider;
let ratio;
let depthSlider;
let drawDepth;

let lastY;

let useLastPosXY = false;

function setup() {
  const cnv = createCanvas(800, 800);
  cnv.mouseOver(() => useLastPosXY = false);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);
  
  ratioSlider = createSliderWithState(0.1, 130, 30)
  depthSlider = createSliderWithState(0.8, 460, 30);

  [ratioSlider, depthSlider].forEach(sl => sl.sliderEl.input(
    () => {
      useLastPosXY = true;
      running = true;
    }
  ));
}


function mousePressed() {
  if (mouseY > 0)
  running = !running;
}

function draw() {
  if (!running) {return;}

  background(97);
  
  ratio = map(ratioSlider.sliderEl.value(), 0, 100, 0, 1);
  drawDepth = floor(map(depthSlider.sliderEl.value(), 0, 100, 2, 163));
  
  drawCount++;
  
  stroke(10);
  noFill();   
  strokeWeight(0.2);
  rect(0,0,width,height);
  
   hostPoly = [
    createVector(200, 0),
    createVector(600, 0),
     createVector(width, 300),
     createVector(width, 600),
     createVector(550, height),
     createVector(200, height),
     createVector(200, height),
  ];
  
  
  const posY = useLastPosXY ? lastY : mouseY;
  const posX = useLastPosXY ? lastX : mouseX;
  lastX = posX;
  lastY = posY;
  let anchorFn;
  

  const direction = map(posX/width, 0, 1, 1, - 1);
  // anchorFn = (i) => createVector(posX - (i / 8)**8, posY + (i**2/4 - i * 24)*direction);
  anchorFn = (i) => createVector(-2, posY);

  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    undefined,
    (i) => stroke(270, 50, 12, 0.9*(1 - 20/i**2))
  );  
}