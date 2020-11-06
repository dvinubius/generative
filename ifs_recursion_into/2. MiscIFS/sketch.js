const iters = 2000;
let ct = 0;

let myDeJong;
let pts = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSL);
  pt = createVector(0, 0);
  background(52, 2, 97);
}

function draw() {
  translate(width / 2, height / 2);
  if (ct > pts) {
    let text = createP("Done");
    text.position(3, 3);
    text.style("color", "white");
    text.style("font-family", "Courier New");
    noLoop();
  }

  const newPoint = f33(ct).mult(width / 16);

  pts.push(newPoint);
  point(newPoint);
  ct++;
}

const f1 = (t) => createVector(sin(t / 2), cos(t / 3));
const f2 = (t) => createVector(sin(t ** 0.5), cos((5 / 2) * t ** 0.5));
const f3 = (t) =>
  createVector(sin(cos(t * 2) * 6.99), 1 * cos(sin(t * 2) * 6.9) ** 2);
const f4 = (t) => createVector(sin(sin(t / 6) * 5), cos(cos(t / 7) * 5));
const f5 = (t) =>
  createVector(sin(t / 8) + 0.5 * cos(t / 10), sin(t / 10) - cos(t / 8));
const f6 = (t) =>
  createVector(sin(t / 8) - cos(t / 3), sin(t / 4) - cos(t / 8));
const f7 = (t) =>
  createVector(sin(t / 4) - cos(t / 3), sin(t / 4) - cos(t / 8));
const f8 = (t) =>
  createVector(sin(t / 4) / cos(t / 3), sin(t / 4) - cos(t / 8));

const f9 = (t) => createVector(tan(t / 35), 1 / tan(t / 60));

const f10 = (t) =>
  createVector(sin(t / 3) / cos(t / 3.001), cos(t / 2) / sin(t / 2));
const f11 = (t) =>
  createVector(sin(t / 3) / cos(t / 3), cos(t / 1.9995) / sin(t / 2));

const f12 = (t) =>
  createVector(sin(t / 60) / cos(t / 120), cos(t / 120) / sin(t / 240));

const f13 = (t) =>
  createVector(sin(t / 60) / cos(t / 120), cos(t / 120) / sin(t / 60));
const f14 = (t) =>
  createVector(sin(t / 60) / cos(t / 120), cos(t / 240) / sin(t / 120));

const f15 = (t) =>
  createVector(sin(t / 6) / cos(t / 12), cos(t / 12) - sin(t / 12));
const f16 = (t) =>
  createVector(sin(t / 12) / cos(t / 12), cos(t / 12) - sin(t / 12));
const f17 = (t) =>
  createVector(sin(t / 6) / cos(t / 18), cos(t / 12) - sin(t / 12));
const f18 = (t) =>
  createVector(sin(t / 6) / cos(t / 18), cos(t / 18) - sin(t / 18));

const f19 = (t) =>
  createVector(
    (2 * sin(t / 10)) / cos(t / 20),
    3 * cos(t / 20) + 3 * sin(t / 20)
  );

const f20 = (t) =>
  createVector(
    (2 * sin(t / 40)) / cos(t / 48),
    4 * cos(t / 80) + 2 * sin(t / 80)
  );
const f21 = (t) =>
  createVector(
    (2 * sin(t / 40)) / cos(t / 64),
    4 * cos(t / 80) + 2 * sin(t / 80)
  );
const f22 = (t) =>
  createVector(
    (3 * sin(t / 40)) / cos(t / 64),
    4 * cos(t / 80) + 2 * sin(t / 80)
  );

const f23 = (t) =>
  createVector(
    sin(t / 40) ** 0.5 / cos(t / 64),
    4 * cos(t / 80) + 2 * sin(t / 80)
  );
const f24 = (t) =>
  createVector(
    sin(t / 40) / cos(t / 64),
    4 * cos(t / 80) ** 0.5 + 2 * sin(t / 80)
  );
const f25 = (t) =>
  createVector(
    sin(t / 64) ** 0.5 / cos(t / 64),
    cos(t / 80) ** 0.5 / sin(t / 80)
  );
const f26 = (t) => createVector(tan(t / 80), tan(t / 64) - tan(t / 80));

const f27 = (t) =>
  createVector(tan(t / 64) - tan(t / 80), tan(t / 80) - tan(t / 32));

const f28 = (t) =>
  createVector(
    1 / tan(t / 64) - 1 / tan(t / 80),
    1 / tan(t / 80) - 1 / tan(t / 128)
  );

const f29 = (t) => createVector(sin(tan(t / 10)) * 5, sin(tan(t / 30)) * 5);

const f30 = (t) => createVector(sin(tan(t / 5)) * 5, sin(1 / tan(t / 15)) * 5);

const f31 = (t) =>
  createVector(sin(tan(t / 10) ** 2) * 5, sin(tan(t / 15) ** 2) * 5);

const f32 = (t) => createVector(sin(t / 20) ** 3 * 5, cos(t / 15) ** 5 * 5);

const f33 = (t) =>
  createVector(sin(t / 10) * cos(t / 30) * 5, sin(t / 30) * cos(t / 20) * 5);
