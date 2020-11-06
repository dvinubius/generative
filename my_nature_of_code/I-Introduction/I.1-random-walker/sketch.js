let walker;

function setup() {
  createCanvas(640, 360);
  walker = new Walker();
  background(217);
}

function draw() {
  walker.step();
  walker.render();
}

class Walker {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
  }

  render() {
    stroke(0);
    point(this.pos.x, this.pos.y);
  }

  step() {
    var choice = floor(random(10));
    if (choice < 4) {
      this.pos.x += 2;
    } else if (choice < 8) {
      this.pos.x -= 2;
    } else if (choice < 9) {
      this.pos.y += 1;
    } else {
      this.pos.y -= 1;
    }
    this.pos.x = constrain(this.pos.x, 0, width - 1);
    this.pos.y = constrain(this.pos.y, 0, height - 1);
  }
}
