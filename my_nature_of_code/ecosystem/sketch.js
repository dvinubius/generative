const simpleMovers = [];
const bouncers = [];
const attractedMovers = [];
const hoppers = [];
const attractedHoppers = [];
const perlinMovers = [];
const perlinDancers = [];
let crsr;

function setup() {
  createCanvas(860, 640);
  colorMode(HSL);
  crsr = new Cursor(0.4);
  // for (let i = 0; i < 5; i++) {
  //   const m = new SimpleMover(random(20, 40), 14);
  //   m.setCycleEstate(true);
  //   simpleMovers[i] = m;
  // }

  // for (let i = 0; i < 5; i++) {
  //   const m = new SimpleMover(random(20, 40), 64);
  //   m.setBounce(true);
  //   bouncers[i] = m;
  // }

  for (let i = 0; i < 5; i++) {
    const m = new AttractedMover(random(20, 40), 154);
    m.setBounce(true);
    m.setCompressCloseToCursor(true);
    attractedMovers[i] = m;
  }

  // for (let i = 0; i < 5; i++) {
  //   const m = new SimpleMover(random(20, 40), 194);
  //   m.setBounce(true);
  //   m.enableHopping(m.velocity, m.velocity.mag());
  //   hoppers[i] = m;
  // }

  // for (let i = 0; i < 5; i++) {
  //   const m = new AttractedMover(random(20, 40), 244);
  //   m.setBounce(true);
  //   m.enableHopping(createVector(0, 0), 4);
  //   m.setCompressCloseToCursor(true);
  //   attractedHoppers[i] = m;
  // }

  // for (let i = 0; i < 5; i++) {
  //   const m = new SimpleMover(random(20, 40), 100);
  //   m.setBounce(true);
  //   m.enablePerlinDance(0.1);
  //   perlinMovers[i] = m;
  // }

  for (let i = 0; i < 5; i++) {
    const m = new SimpleMover(random(20, 40), 220);
    m.setBounce(true);
    m.enableHopping(m.velocity, m.velocity.mag(), 4);
    m.enablePerlinDance(1);
    perlinDancers[i] = m;
  }
}

function draw() {
  background(52, 2, 97);

  crsr.update();
  crsr.display();

  simpleMovers.forEach((m) => {
    m.update();
    m.display();
  });

  bouncers.forEach((m) => {
    m.update();
    m.display();
  });

  attractedMovers.forEach((m) => {
    m.setAttractor(mouseIsPressed ? crsr : null);
    m.update();
    m.display();
  });

  hoppers.forEach((m) => {
    m.update();
    m.display();
  });

  attractedHoppers.forEach((m) => {
    m.setAttractor(mouseIsPressed ? crsr : null);
    m.update();
    m.display();
  });

  perlinMovers.forEach((m) => {
    m.update();
    m.display();
  });

  perlinDancers.forEach((m) => {
    m.update();
    m.display();
  });
}
