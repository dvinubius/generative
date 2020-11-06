let movers = [];
let crsr;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor(0.1);

  const many = 20;
  const maxRad = 6;
  const d = (width - 2 * maxRad) / many;
  for (let i = 0; i < many; i++) {
    const m = new Mover(d * i + maxRad * 2, 60, random(2, maxRad));

    m.setBounce(true);
    m.setCompressCloseToCursor(true);

    movers[i] = m;
  }
}

function draw() {
  background(52, 2, 97);

  crsr.update();
  crsr.display();

  let gravityDown = createVector(0, 0.1);

  movers.forEach((m) => {
    const gravityDownM = p5.Vector.mult(gravityDown, m.mass);
    m.applyForce(gravityDownM);

    if (mouseIsPressed) {
      let gravityToCursor = attractionBtw(m, crsr);
      m.applyForce(gravityToCursor);
      m.setAttractor(crsr);
    }

    m.update();
    m.display();
  });
}

attractionBtw = (attractee, attractor) => {
  const dToAttr = attractor.position.copy().sub(attractee.position);
  const norm = dToAttr.normalize();
  const intensity = (attractor.mass * attractee.mass) / dToAttr.mag() ** 2;
  return norm.mult(intensity);
};
