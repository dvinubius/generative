let movers = [];
let crsr;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor(0.4);
  for (let i = 0; i < 7; i++) {
    const m = new Mover(random(20, 40));
    m.setBounce(true);
    m.setCompressCloseToCursor(true);

    movers[i] = m;
  }
}

function draw() {
  background(52, 2, 97);

  crsr.update();
  crsr.display();

  movers.forEach((m) => {
    m.setAttractor(mouseIsPressed ? crsr : null);
    m.update();
    m.display();
  });
}
