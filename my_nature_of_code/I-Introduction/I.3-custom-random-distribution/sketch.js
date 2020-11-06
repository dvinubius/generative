// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array to keep track of how often random numbers are picked

let randomCounts = [];
let total = 100;
let cont = true;

const customRand = () => {
  let found;
  let ct = 0;

  while (!found && ct < 1000) {
    const x1 = random(total);
    const x2 = random(total);
    if (x2 < x1) found = x1;
    if (x2 ** 2 < x1) found = x1;
    if (x2 * x1 < 2500) found = x1;
  }

  return found || 0;
};

function setup() {
  createCanvas(760, 760);
  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
  colorMode(HSB);
}

function draw() {
  const w = width / randomCounts.length;
  const h = (x) => randomCounts[x] / 4;

  background(175, 3, 98);

  if (cont) {
    for (let i = 0; i < total * 2; i++) {
      let index = floor(customRand());
      randomCounts[index]++;
      cont = h(index) < height;
    }
  }

  // Draw a rectangle to graph results
  stroke(50, 49, 20);
  strokeWeight(1);
  fill(34, 60, 90);

  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w + w / 4, height - h(x), (w - 1) / 2, h(x));
  }
}
