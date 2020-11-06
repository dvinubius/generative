let img;
const w = 2;
let currentRowCt = 0;
let currentRow;
let alpha = 1;
let maxAlpha = 20;
let startDelay = 50;

function preload() {
  img = loadImage("../assets/beach.jpg");
}

function setup() {
  createCanvas(600, 800);
  frameRate(24);

  // TEST
  image(img, 0, 0, width, height);
  strokeWeight(w);
}

function draw() {
  if (frameCount > startDelay && frameCount % 6 === 0) {
    if (currentRowCt === img.height) {
      currentRowCt = 0;
    }

    currentRow = [];
    for (let x = 0; x < img.width; x += w) {
      const c = img.get(x, currentRowCt);
      const col = color(c);
      col.setAlpha(alpha);
      currentRow.push(col);
    }
    if (alpha < maxAlpha) alpha += 0.35;

    currentRowCt++;
  }

  if (!currentRow) return;
  currentRow.forEach((col, x) => {
    stroke(col);
    line(x, 0, x, height);
  });
}
