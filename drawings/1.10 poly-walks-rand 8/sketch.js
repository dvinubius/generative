let p1;
let p2;
let hostPoly;
const drawDepth = 20;

let drawCount = 0;
const maxDraws = 200;

let slider1;
let slider2;
let slider3;
let slider4;
let r1;
let r2;
let r3;
let r4;
const initialR1 = 0.25;
const initialR2 = 0.35;
const initialR3 = 0.25;
const initialR4 = 0.25;

let slCornerIsolation;
const initialCornerIsolation = 0.5;
let cornerIsolation;

const sWeight = .08;
const sColArgs = [100, 0.8];

function setup() {
  createCanvas(600, 600);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);


  slCornerIsolation = createSliderWithState(initialCornerIsolation, 300, 160, 0);
  slider1 = createSliderWithState(initialR1, 60, 40, 0);
  slider2 = createSliderWithState(initialR2, 60, 80, 0);
  slider3 = createSliderWithState(initialR3, 60, 120, 0);
  slider4 = createSliderWithState(initialR4, 60, 160, 0);
  
  [
    slCornerIsolation,
    slider1,
    slider2, 
    slider3,
    slider4
  ].forEach(sl => sl.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    loop();
  }));
}


function draw() {
  drawCount++;
  r1 = map(slider1.sliderEl.value(), 0, 100, 0, 1);
  r2 = map(slider2.sliderEl.value(), 0, 100, 0, 1);
  r3 = map(slider3.sliderEl.value(), 0, 100, 0, 1);
  r4 = map(slider4.sliderEl.value(), 0, 100, 0, 1);
  cornerIsolation = map(slCornerIsolation.sliderEl.value(), 0, 100, 0, 0.5);

  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  rectMode(CORNER);
  
  const maxX = width;

  const highMin = random(maxX*cornerIsolation);
  const highMax = maxX - random(maxX*cornerIsolation);
  const lowMin = random(maxX*cornerIsolation);
  const lowMax = maxX - random(maxX*cornerIsolation);
  
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
  strokeWeight(sWeight);
  stroke(...sColArgs);
  
  drawSubPolys(hostPoly, drawDepth);
  
  if (drawCount >= maxDraws) {
    noLoop();
  }
}

const drawSubPolys = (hostPoly, depth) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    drawPolygonCurved(nextPoly);  
    nextPoly = [
      pointBtw(nextPoly[0], nextPoly[1], random(r1)),
      pointBtw(nextPoly[1], nextPoly[2], random(r2)),
      pointBtw(nextPoly[2], nextPoly[3], random(r3)),
      pointBtw(nextPoly[3], nextPoly[0], random(r4)),
    ];
  }
}
