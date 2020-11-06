let img;
const w = 2;
let currentRowCt = 0;
let currentRow;
let fadeDelay = 30;
let weaveDelay = 0;
let imgAlphaMax = 200;
let bgCol;

let drawRegionHeight = 80;
let rowStepInc = 2;

function preload() {
  img = loadImage("../assets/beach.jpg");
}

function setup() {
  createCanvas(600, 800);
  frameRate(24);
  bgCol = color(80, 77, 73);
  // image(img, 0, 0, width, height);
  strokeWeight(w);
}

function draw() {
  if (frameCount < fadeDelay) {
    return;
  }

  // presentWhole();
  if (frameCount >= weaveDelay) weave();
}

function presentWhole() {
  image(img, 0, 0, width, height);
  const col = color(bgCol);
  let alpha = (frameCount - fadeDelay) * 3;
  alpha = min(alpha, 200);
  col.setAlpha(alpha);
  fill(col);
  noStroke();
  rect(0, 0, width, height);
}

function weave() {
  image(img, 0, 0, width, height);
  fill(bgCol);
  noStroke();
  rect(0, currentRowCt, width, height);

  if (currentRowCt === img.height) {
    noLoop();
  }

  currentRow = [];

  const drawInc = img.width / width;
  for (let x = 0; x < img.width; x += drawInc) {
    const c = img.get(x, currentRowCt);
    const col = color(c);
    currentRow.push(col);
  }

  currentRowCt += rowStepInc;

  if (!currentRow) return;
  currentRow.forEach((col, x) => {
    const lineCol = color(col);
    lineCol.setAlpha(150);
    stroke(lineCol);
    line(x, currentRowCt - rowStepInc, width/2, height);
    // line(
    //   x,
    //   currentRowCt - rowStepInc,
    //   width / 2,
    //   currentRowCt + drawRegionHeight
    // );

    stroke(col);
    point(x, currentRowCt - rowStepInc);
  });
}
