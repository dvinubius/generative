let repeatCt = 0;
const maxRepeatCt = 3;
// const maxRepeatCt = 0;

let p1;
let p2;
let hostPoly;
const drawDepth = 100;

let drawCount = 0;
const ratio = 0.5;
const maxDrawCt = 40;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  // background(97);
  background(6);
}


function draw() {
  // background(6, 0.007);

  drawCount++;
  
  stroke(10);
  noFill();
  rect(0,0,width,height);
  
  rectMode(CORNER);

  translate(width/2, height/2);
  // rotate(360/(maxRepeatCt+1)*repeatCt);
  rotate(90 + 90*repeatCt);
  translate(-width/2, -height/2);
  
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
  strokeWeight(0.29);
  // stroke(10, 0.3);
  stroke(
    (drawCount*0.2) % 360,
    60,
    94,
    max(0.26 - maxRepeatCt*0.033, 0.03)
  );
  
  // const heightStart = random(height);
  const direction = drawCount % 4 == 0 > 0.5 ? 1 : -1;
  const anchorFn = drawCount % 2 == 0
    ? (direction > 0 ? (i) => createVector(-4,i*drawCount**1.5) : (i) => createVector(-4, height - i*drawCount**1.5))
    : (direction > 0 ? (i) => createVector(i*drawCount**1.8, height+4) : (i) => createVector(width - i*drawCount**1.8, height+4) );
  drawDescendingSubPolysWithAnchor(
    anchorFn,
    hostPoly,
    drawDepth,
    ratio,
    true
  );
  
  if (drawCount >= maxDrawCt) {
    if (repeatCt == maxRepeatCt) {
      noLoop();
    } else {
      drawCount = 0;
      repeatCt++;
    }
  }  
}