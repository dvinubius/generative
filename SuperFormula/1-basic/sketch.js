let canvasScaleFactor;
let superFs = [];

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 97);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setupSuperFormulas();
}

function draw() {
  translate(width / 2, height / 2);
  noFill();
  // VARIATE
  background(52, 2, 97, 0.14);
  superFs.forEach((sf) => {
    stroke(sf.baseColor);
    strokeWeight(2);
    beginShape();
    sf.getPoints().forEach((p) => curveVertex(p.x, p.y));
    endShape(CLOSE);
  });
}

const setupSuperFormulas = () => {
  const iters = 80;
  for (let i = 0; i < iters; i++) {
    const scaleSF = map(i ** 2, 0, iters ** 2, 1, 1.351);
    const hue = map(i ** 2, 0, iters ** 2, 215, 295);

    let superF = new SuperFormula();
    superF.scaleFactor = canvasScaleFactor * 0.5;

    superF.baseColor = color(hue, 50, 50);
    superF.radiusOdds = () => map(mouseX, 0, width, 0.5, 1) * scaleSF;
    superF.radiusEvens = () => map(mouseY, 0, width, 0.5, 1) * scaleSF;
    superF.corners = () => 6;
    superF.globalSmoothness = () => 0.6;
    superF.oddsAmp = () => 1;
    superF.evensAmp = () => 2;
    superFs.push(superF);
  }
};
