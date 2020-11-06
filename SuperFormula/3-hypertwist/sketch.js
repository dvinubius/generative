let canvasScaleFactor;
let superFs = [];
let slider;

const iterations = 120;

let pointsInc;
const maxScaleSF = 1.351;
const minScaleSF = 1;
const minHue = 175;
const maxHue = 305;
const strokeW = 2;
let maxAlpha = 0.5;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 97);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);
  pointsInc = TWO_PI / 50;
  setupSuperFormulas();
  setupHTML();
}

function draw() {
  translate(width / 2, height / 2);
  noFill();
  const twist = map(slider.value(), 0, 100, 0, 10);
  background(52, 2, 97, 0.25);
  superFs.forEach((sf, i) => {
    const points = sf.getPoints(pointsInc);
    points.forEach((p) => p.rotate(((i * TWO_PI) / 1440) * twist));
    const alpha = map(i ** 2, 0, (superFs.length - 1) ** 2, 0.06, maxAlpha);
    sf.baseColor.setAlpha(alpha);
    stroke(sf.baseColor);
    strokeWeight(strokeW);
    beginShape();
    points.forEach((p) => curveVertex(p.x, p.y));
    endShape(CLOSE);
  });
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

const setupSuperFormulas = () => {
  for (let i = 0; i < iterations; i++) {
    const scaleSF = map(i ** 2, 0, iterations ** 2, minScaleSF, maxScaleSF);
    const hue = map(i ** 2, 0, iterations ** 2, minHue, maxHue);

    let superF = new SuperFormula();
    superF.scaleFactor = canvasScaleFactor * 0.5;

    superF.baseColor = color(hue, 50, 50);
    superF.radiusOdds = () => map(mouseX, 0, width, 0.5, 1) * scaleSF;
    superF.radiusEvens = () => map(mouseY, 0, width, 0.5, 1) * scaleSF;
    superF.corners = () => 36;
    superF.globalSmoothness = () => 0.9;
    superF.oddsAmp = () => 1.3;
    superF.evensAmp = () => 2.6;
    superFs.push(superF);
  }
};

const setupHTML = () => {
  let text = createP("Twist");
  text.position(30, 10);
  text.style("color", "white");
  text.style("font-family", "Courier New");
  text.style("font-size", "20px");
  let text2 = createP("Press Enter to freeze");
  text2.position(width, 10);
  text2.style("color", "white");
  text2.style("font-family", "Courier New");
  text2.style("font-size", "20px");
  slider = createSlider(0, 100, 40, 1);
  slider.position(30, 60);
  slider.style("width", "200px");
};
