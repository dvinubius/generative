let p1;
let p2;
let nextPoly;

let slider;
let descentRatio;

let drawCount = 0;
let descentCount = 0;
const descentDepth = 30;
const initialDescentRatio = 0.05;

function setup() {
  createCanvas(600, 600);
  // noLoop();
  frameRate(10);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);

  sliderIsolation = createSliderWithState(initialDescentRatio, 30, 160);
  cornerIsolation = initialDescentRatio;
  sliderIsolation.sliderEl.input(() => {
    background(0);
    drawCount = 0;
    descentCount = 0;
    cornerIsolation = map(sliderIsolation.sliderEl.value(), 0, 100, 0, 1);
    loop();
  });
}


function draw() {
  drawCount++;
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  // translate(width/2, height/2);
  // rotate(-90);
  // translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  if (descentCount === 0) {
    const maxX = width;
  
    const highMin = random(maxX/4);
    const highMax = maxX - random(maxX/4);
    const lowMin = random(maxX/4);
    const lowMax = maxX - random(maxX/4);
    
    pTL = createVector(highMin,0);
    pTR = createVector(highMax,0);
    pBR = createVector(lowMax, height);
    pBL = createVector(lowMin, height);
    
    nextPoly = [
      createVector(pTL.x,pTL.y),
      createVector(pTR.x,pTR.y),
      createVector(pBR.x,pBR.y),
      createVector(pBL.x, pBL.y),
    ];
  }
  
  noFill();
  strokeWeight(.3);
  stroke(100, 0.8);
  
  drawPolygon(nextPoly);
  descentCount = descentCount === descentDepth ?
    0 : descentCount+1;
  
  // nextPoly = walkPolygonIterations(nextPoly, 1, () => descentRatio)[0];
  const r1 = random(0.15);
  const r2 = random(0.15);
  const r3 = random(0.25);
  const r4 = random(0.25);
  nextPoly = [
    pointBtw(nextPoly[0], nextPoly[1], r1),
    pointBtw(nextPoly[1], nextPoly[2], r2),
    pointBtw(nextPoly[2], nextPoly[3], r3),
    pointBtw(nextPoly[3], nextPoly[0], r4),
  ];


  if (drawCount >= 40 * descentDepth) {
    noLoop();
  }
}

const drawPolygon = (points) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
};