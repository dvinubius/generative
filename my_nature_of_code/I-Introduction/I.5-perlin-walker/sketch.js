let walker;
const total = 10;
const perlinNoiseStepSize = 0.006;
const footPrintRad = 3;
const colChangeRatePerSteps = 0.1;

function setup() {
  createCanvas(740, 740);
  walker = new Walker();
  colorMode(HSB);
  background(52, 2, 97);
}

function draw() {
  walker.step();
  walker.render();
}

class Walker {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.hue = 0;
    this.steps = 0;
    this.ctX = 0;
    this.ctY = 1000000;
    this.footPrintRad = footPrintRad;
    this.opacity = 0.3;
  }

  render() {
    fill(this.hue, 90, 81, this.opacity);
    stroke(this.hue, 60, 81, 1);
    strokeWeight(0.5);
    ellipse(this.x, this.y, this.footPrintRad, this.footPrintRad);
  }

  step() {
    this.x = map(noise(this.ctX), 0, 1, 0, width);
    this.y = map(noise(this.ctY), 0, 1, 0, height);

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);

    this.ctX += perlinNoiseStepSize;
    this.ctY += perlinNoiseStepSize;
    this.steps++;
    this.hue = this.steps * colChangeRatePerSteps;
  }
}
