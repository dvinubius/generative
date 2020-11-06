let movers = [];
let crsr;
const crsrActionRad = 120;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor(crsrActionRad);

  const many = 20;
  const maxRad = 6;
  const d = (width - 2 * maxRad) / many;
  for (let i = 0; i < many; i++) {
    const m = new Mover(d * i + maxRad * 2, 60, random(2, maxRad));
    m.velocity = createVector(random(-2, 2), random(-2, 2));
    m.setBounce(true);
    movers[i] = m;
  }
}

function mousePressed() {
  movers.forEach((m) => {
    if (isCovered(m)) {
      m.setCaught(true);
    }
  });
}

function mouseReleased() {
  movers.forEach((m) => m.setCaught(false));
}

const isCovered = (mover) =>
  p5.Vector.sub(mover.position, crsr.position).mag() + mover.r < crsrActionRad;

function draw() {
  background(52, 2, 97);

  crsr.update();

  movers.forEach((m) => {
    if (m.caught && isCovered(m)) {
      if (crsr.velocity.mag() > 0) {
        m.velocity = crsr.velocity.copy().mult(1);
      } else {
        const v = m.velocity.copy().normalize().mult(-1);
        const friction = v.mult(1.9);
        m.applyForce(friction);
      }
    }

    m.update();
    m.display();
  });

  crsr.display();
}
