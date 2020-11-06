const pts = 100000;
// const pts = 20000;
let ct = 0;

let myDeJong;
let pt;

function setup() {
  createCanvas(400, 400);
  colorMode(HSL);
  stroke(0, 0, 0, 0.3);
  // myDeJong = deJong(1.2, 2.2, -2, -1); // Screenshot DeJong 1
  // myDeJong = deJong(0.97, -1.9, 1.38, -1.5); // Screenshot DeJong 2
  // myDeJong = deJong(1.4, -2.4, 2.3, -2.1); // Screenshot DeJong 3
  // myDeJong = deJong2(0.97, -1.9, 1.38, -1.5); // Screenshot DeJong 4
  // myDeJong = deJong3(1.4, 3.9); // Screenshot DeJong 5
  // myDeJong = deJong3(-1.84, 1.94); // Screenshot DeJong 6
  // myDeJong = deJong3(-1.88, 1.94); // Screenshot DeJong 7
  // myDeJong = deJong3(-1.98, 1.94); // Screenshot DeJong 8
  // myDeJong = deJong3(-2.26, 1.94); // Screenshot DeJong 9
  // myDeJong = deJong3(-2.46, 1.94); // Screenshot DeJong 10
  // myDeJong = deJong3(-3.06, 1.94); // Screenshot DeJong 11
  // myDeJong = deJong3(-3.06, 2.64); // Screenshot DeJong 12
  // myDeJong = deJong3(-3.06, 2.94); // Screenshot DeJong 13
  // myDeJong = deJong3(-3.06, 3.04); // Screenshot DeJong 14
  myDeJong = deJong3(-1.22, 3.23);
  // myDeJong = deJong4(1.3, -2.99, 2.4);
  pt = createVector(0, 0);
  background(52, 2, 97);
}

function draw() {
  if (ct % 10000 == 0) {
    console.log("counter: ", ct);
  }
  if (ct > pts) {
    let text = createP("Done");
    text.position(3, 3);
    text.style("color", "white");
    text.style("font-family", "Courier New");
    noLoop();
  }
  translate(width / 2, height / 2);
  const newPoint = pt.copy().mult(width / 4);
  point(newPoint);
  pt = myDeJong(pt);
  // console.log(pt);
  ct++;
}
