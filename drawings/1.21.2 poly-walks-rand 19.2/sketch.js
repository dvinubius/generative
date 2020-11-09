let p1;
let p2;
let hostPoly;
const drawDepth = 100;

let drawCount = 0;
const ratio = 0.5;
const maxDrawCt = 60;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  // background(97);
  background(6);
}


function draw() {
  drawCount++;
  
  if (drawCount === 1) {
    stroke(250,
      40,
      92,0.4);
    noFill();
    rect(0,0,width,height);
  }

  
  const high1 = random(width/4);
  const high2 = width - random(width/4);
  const low1 = random(width/4);
  const low2 = width - random(width/4);
  
  pTL = createVector(high1,-4);
  pTR = createVector(high2,-4);
  pMid1 = createVector(width, height/3);
  pMid2 = createVector(width, height*2/3);
  pBR = createVector(low2, height+4);
  pBL = createVector(low1, height+4);
  
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
    250,
    40,
    92,
    max(0.26, 0.03)
  );
  
  // const goForward = drawCount % 4 == 0 > 0.5 ? 1 : -1;
  const goForward = 1;
  // const goVertical = drawCount % 2 == 0;
  const goVertical = true;
  const anchorFn = goVertical
    ? (goForward > 0 ? (i) => createVector(-4,i*drawCount**1.5) : (i) => createVector(-4, height - i*drawCount**1.5))
    : (goForward > 0 ? (i) => createVector(i*drawCount**1.8, height+4) : (i) => createVector(width - i*drawCount**1.8, height+4) );
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