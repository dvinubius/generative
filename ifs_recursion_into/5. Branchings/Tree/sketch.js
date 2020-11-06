let branchAngleMinDeg = 15;
let branchAngleMaxDeg = 28;
let bendAngleMinDeg = 1;
let bendAngleMaxDeg = 8;
const minLengthBranch = 13;
let strokeW = 17;
let strokeWDim = 0.88;
let strokeWMin = 0.4;
const calcWeight = (depth) => strokeW*(strokeWDim**(depth**1.7));

const initialLength = 110;

let lengthFactMin = 0.7;
let lengthFactMax = 0.83;

let bgCol;
let treeCol;
let fruitCol;
let leafCol;



const lengthFactor = () => map(random(), 0, 1, lengthFactMin, lengthFactMax);

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSL);
  frameRate(60);
  
  treeCol = color(20, 32, 24, 1);
  stroke(treeCol);
  bgCol = color(190, 60, 94);
  strokeCap(ROUND);

  fruitCol = color(10,50,50);
  leafCol = color(110,50,50,0.14);

  background(bgCol);
  noFill();
  rect(0,0,width,height);
}

let draws = [() => drawBranch(width/2, height, -90, initialLength, 0)];
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
  line(posX, posY, x1, y1);
  if (len < minLengthBranch * 2) {
    push();
    stroke(leafCol);
    fill(leafCol);
    circle(posX + dX/2, posY + dY/2, len * lengthFactor() * 2)
    pop();
  }
  if (len < minLengthBranch * 2) {
    push();
    stroke(fruitCol);
    fill(fruitCol);
    circle(posX + dX/2, posY + dY/2, minLengthBranch * 0.23);
    pop();
  }
  if (len < minLengthBranch) {
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
