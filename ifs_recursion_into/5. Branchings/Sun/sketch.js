let branchAngleMinDeg = 15;
let branchAngleMaxDeg = 19;
let bendAngleMinDeg = 1;
let bendAngleMaxDeg = 8;

const minLengthBranch = 12;

let strokeW = 2;
let strokeWDim = 0.92;
let strokeWMin = 0.4;
const calcWeight = (depth) => strokeW*(strokeWDim**(depth**1.1));

const initialLength = 30;

let lengthFactMin = 0.92;
let lengthFactMax = 0.95;
const lengthFactor = () => {
  return map(random(), 0, 1, lengthFactMin, lengthFactMax);
}

const myAlpha = (depth) => 1 - depth * 0.1;


let bgCol;
let sunCol;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSL);
  frameRate(60);
  
  sunCol = color(40, 52, 44);
  strokeCap(ROUND);
  
  bgCol = color(0, 0, 100);
  background(bgCol);
  noFill();
  rect(0,0,width,height);
}

let draws = [
  () => drawBranch(width/2, height/2, -90, initialLength, 0),
  () => drawBranch(width/2, height/2, -210, initialLength, 0),
  () => drawBranch(width/2, height/2, 30, initialLength, 0),
];
let nextDraws = [];

function draw() {
  draws.forEach(d => d());
  draws = nextDraws;
  nextDraws = [];
}

drawBranch = (posX, posY, ang, len, depth) => {
  const dX = cos(ang) * len;
  const dY = sin(ang) * len;
  const x1 = posX + dX;
  const y1 = posY + dY;
  const w = calcWeight(depth);
  strokeWeight(max(w, strokeWMin));
  const alpha = myAlpha(depth);
  const col = color(sunCol);
  col.setAlpha(alpha);
  stroke(col);
  line(posX, posY, x1, y1);
  if (len < minLengthBranch || depth > 11) {
    noLoop();
    return;
  }
  let bendAng = getPosOrNegBtw(bendAngleMinDeg, bendAngleMaxDeg);
  let branchAng = getPosOrNegBtw(branchAngleMinDeg, branchAngleMaxDeg);
  nextDraws.push(() => drawBranch(x1, y1, ang + bendAng + branchAng, len * lengthFactor(), depth + 1));
  nextDraws.push(() => drawBranch(x1, y1, ang + bendAng, len * lengthFactor(), depth + 1));
  nextDraws.push(() => drawBranch(x1, y1, ang + bendAng - branchAng, len* lengthFactor(), depth + 1));
}

const getPosOrNegBtw = (minV, maxV) => {
  const sign = random() > 0.5 ? 1 : -1;
  const v = random();
  const abs = map(v, 0, 1, minV, maxV);
  return sign * abs;
}
