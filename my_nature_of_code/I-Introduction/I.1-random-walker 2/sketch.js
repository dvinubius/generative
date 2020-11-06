let walker;
const total = 10;
const stepSize = 4;
const footPrintRad = stepSize * 1.5;
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
    this.x = width / 2;
    this.y = height / 2;
    this.hue = 0;
    this.steps = 0;
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
    const choiceX = floor(random(total));
    const choiceY = floor(random(total));
    if (choiceX < 0.4 * total) {
      this.x += stepSize;
    } else if (choiceX < 0.8 * total) {
      this.x -= stepSize;
    }

    if (choiceY < 0.1 * total) {
      this.y += stepSize * 2;
    } else if (choiceY < 0.2 * total) {
      this.y -= stepSize * 2;
    }

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);

    this.steps++;
    this.hue = this.steps * colChangeRatePerSteps;
  }
}
