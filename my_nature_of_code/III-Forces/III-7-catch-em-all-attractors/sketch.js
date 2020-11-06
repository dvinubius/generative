let movers = [];
let crsr;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor();

  const many = 10;
  const maxRad = 30;
  const defaultDensity = 0.000001;
  const d = (width - 2 * maxRad) / many;
  for (let i = 0; i < many; i++) {
    const isBlackHole = i == floor(many / 2);
    const m = new Attractor(
      d * i + maxRad * 2,
      random(maxRad, height - maxRad),
      isBlackHole ? 8 : random(10, maxRad), // radius
      isBlackHole ? defaultDensity * 1002.4 : defaultDensity, // density
      (i * 60) / many,
      isBlackHole
    );
    m.velocity = createVector(0, 0);
    m.setBounce(true);
    movers[i] = m;
  }
}

function mousePressed() {
  movers.forEach((m) => {
    if (withinReach(m)) {
      m.setCaught(true);
    }
  });
}

function mouseReleased() {
  movers.forEach((m) => m.setCaught(false));
}

const withinReach = (mover) =>
  p5.Vector.sub(mover.position, crsr.position).mag() <
  max(mover.r, crsr.actionRad);
function draw() {
  background(52, 2, 97);

  crsr.update();

  movers.forEach((m) => {
    if (mouseIsPressed) {
      const dragMe =
        // withinReach(m) && // -------- realistic grasp
        m.caught;
      if (dragMe) {
        crsr.dragFirmly(m);
      } else {
        // m.setCaught(false); // --------- realistic grasp
      }

      const othersCaught = movers.some((m1) => m1.caught && m1 !== m);
      const cursorStill = crsr.velocity.mag() == 0;
      const slowMeDown =
        !dragMe && withinReach(m) && cursorStill && !othersCaught;
      if (slowMeDown) {
        m.applyForce(crsr.frictionUpon(m));
      }
    }

    // attractions
    movers.forEach((m1) =>
      movers.forEach((m2) => m2.applyForce(m1.attractionUpon(m2)))
    );

    m.update();
    m.display();
  });

  crsr.display();
}
