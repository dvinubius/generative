const res = 24;
const pixelVals = [];
let done = false;
let hue = 0;
let tileWidth;
let tileHeight;

let iterations = 0;

const pixelVal = (xoff, yoff, toff) =>
  map(noise(xoff, yoff, toff), 0, 1, 0, 100);

function setup() {
  // const w = window.innerWidth;
  // const h = window.innerHeight;
  // const w = 640;
  // const h = 480;
  const w = 800;
  const h = 800;

  createCanvas(w, h);
  colorMode(HSL);
  background(52, 2, 57);
  tOff = 0;
  tileWidth = w / res;
  tileHeight = h / res;
}

function draw() {
  iterations++;
  let xOff = 0;
  for (let x = 0; x < res; x++) {
    let yOff = 0;
    for (let y = 0; y < res; y++) {
      pixelVals[x + y * res] = pixelVal(xOff, yOff, tOff);
      yOff += 0.01;
    }
    xOff += 0.01;
  }
  tOff += 0.006;

  hue = map(sin(iterations / 10), -1, 1, 140, 180);
  for (let i = 0; i < pixelVals.length; i++) {
    const y = floor(i / res);
    const x = i % res;
    stroke(hue, 30, 10);
    strokeWeight(1);
    fill(hue, 90, pixelVals[i]);
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }

  // let fps = frameRate();
  // fill(255);
  // stroke(0);
  // text("FPS: " + fps.toFixed(2), 10, height - 10);
}
