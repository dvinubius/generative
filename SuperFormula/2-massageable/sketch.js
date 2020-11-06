let canvasScaleFactor;
let superF;
let superF2;
let superF3;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 97);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setupSuperFormulas();
  let text = createP("move mouse - twist layers");
  text.position(width - 60, 10);
  text.style("color", "white");
  text.style("font-family", "Courier New");
  text.style("font-size", "20px");
  let text2 = createP("Press Enter to freeze");
  text2.position(20, 10);
  text2.style("color", "white");
  text2.style("font-family", "Courier New");
  text2.style("font-size", "20px");
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(52, 2, 97, 0.14);
  const pts1 = superF1.getPoints(TWO_PI / 200);
  const pts2 = superF2.getPoints(TWO_PI / 200, map(mouseX, 0, width, 0, 50));
  const pts3 = superF3.getPoints(TWO_PI / 200, map(mouseY, 0, height, 0, 50));
  for (let i = 0; i < pts2.length - 1; i++) {
    const pt1 = pts1[i];
    const pt2 = pts2[i];
    const pt3 = pts3[i];
    const alpha2 = map(sin((i / pts2.length) * TWO_PI * 2), -1, 1, 0.04, 1);
    const alpha3 = map(cos((i / pts2.length) * TWO_PI * 2), -1, 1, 0.04, 1);
    superF2.baseColor.setAlpha(alpha2);
    superF3.baseColor.setAlpha(alpha3);
    stroke(superF2.baseColor);
    strokeWeight(1.4);
    line(pt1.x, pt1.y, pt2.x, pt2.y);
    stroke(superF3.baseColor);
    line(pt2.x, pt2.y, pt3.x, pt3.y);
    stroke(superF3.baseColor);
    strokeWeight(0.8);
    point(pt1.x, pt1.y);
    point(pt2.x, pt2.y);
    point(pt3.x, pt3.y);
  }
}

const setupSuperFormulas = () => {
  const getVarX = () => {
    const baseCt = ((frameCount / 60) * PI) / 3; // about TWO_PI every 10 seconds
    return map(sin(baseCt), -1, 1, 0.7, 0.9);
  };

  const getVarY = () => {
    const baseCt = ((frameCount / 60) * PI) / 3;
    return map(cos(baseCt), -1, 1, 0.7, 0.9);
  };

  const scale1 = 0.8;
  superF1 = new SuperFormula();
  superF1.scaleFactor = canvasScaleFactor * 0.8;

  superF1.baseColor = color(15, 50, 50);
  superF1.radiusOdds = () => getVarX() * scale1;
  superF1.radiusEvens = () => getVarY() * scale1;
  superF1.corners = () => 6;
  superF1.globalSmoothness = () => 0.6;
  superF1.oddsAmp = () => 1;
  superF1.evensAmp = () => 2;

  const scale2 = 1.1;
  superF2 = new SuperFormula();
  superF2.scaleFactor = canvasScaleFactor * 0.8;

  superF2.baseColor = color(195, 50, 50);
  superF2.radiusOdds = () => getVarX() * scale2;
  superF2.radiusEvens = () => getVarY() * scale2;
  superF2.corners = () => 12;
  superF2.globalSmoothness = () => 0.95;
  superF2.oddsAmp = () => 2;
  superF2.evensAmp = () => 2.2;

  const scale3 = 1.2;
  superF3 = new SuperFormula();
  superF3.scaleFactor = canvasScaleFactor * 0.8;

  superF3.baseColor = color(285, 50, 50);
  superF3.radiusOdds = () => getVarX() * scale3;
  superF3.radiusEvens = () => getVarY() * scale3;
  superF3.corners = () => 12;
  superF3.globalSmoothness = () => 0.75;
  superF3.oddsAmp = () => 2;
  superF3.evensAmp = () => 2.2;
};
