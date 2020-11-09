let p1;
let p2;
let hostPoly;
const drawDepth = 70;

let drawCount = 0;
const ratio = 0.5;
const maxDrawCt = 20;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(97);
}


function draw() {
  drawCount++;
  
  stroke(10);
  noFill();
  rect(0,0,width,height);
  
  rectMode(CORNER);
  
  const high1 = random(width/4);
  const high2 = width - random(width/4);
  const low1 = random(width/4);
  const low2 = width - random(width/4);
  
  pTL = createVector(high1,0);
  pTR = createVector(high2,0);
  pMid1 = createVector(width, height/3);
  pMid2 = createVector(width, height*2/3);
  pBR = createVector(low2, height);
  pBL = createVector(low1, height);
  
  hostPoly = [
    pTL,
    pTR,
    pMid1,
    pMid2,
    pBR,
    pBL
  ];
  
  noFill();
  strokeWeight(0.2);
  stroke(10, 0.4);
  
  // const heightStart = random(height);
  // const direction = random() > 0.5 ? 1 : -1;
  const direction = 1;
  const anchorFn = drawCount % 2 == 0
    ? (direction > 0 ? (i) => createVector(0,i*drawCount**1.5) : (i) => createVector(0, height - i*drawCount**1.5))
    : (direction > 0 ? (i) => createVector(i*drawCount**1.8, height) : (i) => createVector(width - i*drawCount**1.8, height) );
  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    true
  );
  
  if (drawCount >= maxDrawCt) {
    noLoop();
  }  
}