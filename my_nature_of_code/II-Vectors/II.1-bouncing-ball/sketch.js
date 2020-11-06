let b;

function setup() {
  createCanvas(640, 360);
  b = new Ball(24);
  colorMode(HSL);
}

function draw() {
  background(52, 2, 97);
  b.update();
  b.display();
}
