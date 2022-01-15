const offset = 20;
let iterations = 40;
let maxWeightMain = 1.6;
let minWeightMain = 0.2;
let maxWeightSec = 0.8;
let minWeightSec = 0.1;
let minHueMain = 180;
let maxHueMain = minHueMain + 30;
let minHueSec = 290;
let maxHueSec = minHueSec + 30;

let hostPoly;
let walkPolys;
let walkPolys2;

function setup() {
  createCanvas(740, 740);
  colorMode(HSL);
  initPolys();
}

function draw() {
  background(52, 2, 97);

  strokeWeight(maxWeightMain);
  stroke(minHueMain, 50, 50);
  drawPolygon(hostPoly);

  walkPolys.forEach((p, i) => {
    const hue = map(i, 0, walkPolys.length, minHueMain, maxHueMain);
    const weight = map(i, 0, walkPolys.length, maxWeightMain, minWeightMain);
    stroke(hue, 50, 50);
    strokeWeight(weight);
    drawPolygon(p);
  });

  let pos = floor(map(mouseX, 0, width, 0, walkPolys.length));
  pos = constrain(pos, 0, walkPolys.length);
  const newHost = pos == 0 ? hostPoly : walkPolys[pos - 1];
  const walkPolys2 = walkPolygonIterations(
    newHost,
    iterations,
    (it) => it / iterations
  );

  walkPolys2.forEach((p, i) => {
    const hue = map(i, 0, walkPolys2.length, minHueSec, maxHueSec);
    const weight = map(i, 0, walkPolys2.length, maxWeightSec, minWeightSec);
    stroke(hue, 50, 50);
    strokeWeight(weight);
    drawPolygon(p);
  });
}

function initPolys() {
  hostPoly = [
    createVector(offset + random(width / 4), offset + random(height / 4)),
    createVector(
      width - offset - random(width / 4),
      offset + random(height / 4)
    ),
    createVector(
      width - offset - random(width / 4),
      height - offset - random(height / 4)
    ),
    createVector(
      offset + random(width / 4),
      height - offset - random(height / 4)
    ),
  ];
  walkPolys = walkPolygonIterations(
    hostPoly,
    iterations,
    (it) => (it + 1) / iterations
  );
}
