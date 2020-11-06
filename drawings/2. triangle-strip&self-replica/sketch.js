let doRotate = true;
let rotPos = 0;

function setup() {
  createCanvas(720, 640);
  background(204);
  let text = createP("Enter - toggle rotation");
  text.position(30, 30);
  text.style("color", "white");
  text.style("font-family", "Courier New");
}

function keyPressed() {
  if (keyCode === ENTER) {
    doRotate = !doRotate;
  }
}

function draw() {
  background(234);
  translate(width / 2, height / 2);
  if (doRotate) {
    rotPos++;
  }
  rotate(rotPos / 400.0);
  const numPoints = int(map(mouseX, 0, width, 5, 16));
  const scale = map(mouseY, 0, height, 0.3, 0.7);

  const inR = 80;
  const outR = 150;
  const outsidePolyPts = drawWhole(0, 0, numPoints, inR, outR);

  for (let i = 0; i < outsidePolyPts.length - 1; i++) {
    const c = outsidePolyPts[i];
    drawWhole(
      c.x,
      c.y,
      numPoints,
      inR * scale,
      outR * scale,
      10,
      100,
      0.8 - numPoints * 0.01
    );
  }
}

function drawWhole(
  x,
  y,
  numPoints,
  insideRadius,
  outsideRadius,
  fillHue = 250,
  fillSat = 50,
  opacity = 1
) {
  const outsidePolyPts = [];
  let angle = 0;
  let angleStep = 180.0 / numPoints;
  fill(`hsla(${fillHue}, ${fillSat}%, 75%, ${opacity})`);
  stroke(`hsla(220, 30%, 40%, ${opacity})`);
  const insidePolyPts = [];
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    outsidePolyPts.push(createVector(px, py));
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py);
    insidePolyPts.push(createVector(px, py));
    angle += angleStep;
  }
  endShape();
  fill("hsl(34, 85%, 80%)");
  beginShape();
  for (let i = 0; i < insidePolyPts.length; i++) {
    vertex(insidePolyPts[i].x, insidePolyPts[i].y);
  }
  endShape();

  return outsidePolyPts;
}
