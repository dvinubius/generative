let mover;

function setup() {
  createCanvas(640, 360);
  colorMode(HSL);
  mover = new Mover(24);
}

function draw() {
  background(52, 2, 97);

  mover.update();
  mover.checkEdges();
  mover.display();
}
