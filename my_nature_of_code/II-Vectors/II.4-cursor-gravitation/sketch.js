let mover;
let crsr;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor();
  mover = new Mover(42);
  mover.setBounce(true);
  mover.setCompressCloseToCursor(true);
}

function draw() {
  background(52, 2, 97);

  crsr.display();

  mover.update();
  mover.display();
}
