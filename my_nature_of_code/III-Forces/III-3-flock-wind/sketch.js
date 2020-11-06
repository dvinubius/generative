let movers = [];
let crsr;

const windMax = 0.3;
let windOffX = 100;
let windOffY = 10000;
const windDiff = 0.005;

const windBlow = () => {
  const windX = map(noise(windOffX), 0, 1, -windMax, windMax);
  const windY = map(noise(windOffY), 0, 1, -windMax, windMax);
  windOffX += windDiff;
  windOffY += windDiff;
  return createVector(windX, windY);
};

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor(0.4);

  const many = 20;
  const maxRad = 6;
  const d = (width - 2 * maxRad) / many;
  for (let i = 0; i < many; i++) {
    const m = new Mover(
      d * i + maxRad * 2,
      random(50, height - 50),
      random(2, maxRad)
    );

    movers[i] = m;
  }

  movers[many] = new Mover(width / 2, height / 2, 1, 160);
  createP("Click mouse to apply wind force.");
}

function draw() {
  background(52, 2, 97);

  movers.forEach((m) => {
    if (mouseIsPressed) {
      m.applyForce(windBlow());
    }

    m.update();
    m.display();
  });
}
