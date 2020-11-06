let movers = [];

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);

  // A large Mover on the left side of the window
  moverA = new Mover(200, 70, 7);
  moverA.setBounce(true);
  // A smaller Mover on the right side of the window
  moverB = new Mover(440, 30, 2);
  moverB.setBounce(true);
  createP("Click mouse to apply wind force.");

  movers[0] = moverA;
  movers[1] = moverB;
}

function draw() {
  background(52, 2, 97);
  let gravity = createVector(0, 0.1);
  let wind = createVector(0.1, 0);

  movers.forEach((m) => {
    let gravityM = p5.Vector.mult(gravity, m.mass);
    m.applyForce(gravityM);

    if (mouseIsPressed) {
      m.applyForce(wind);
    }

    m.update();
    m.display();
  });
}
