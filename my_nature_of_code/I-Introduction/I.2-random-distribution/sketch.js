let randomCounts = [];
let total = 20;

function setup() {
  createCanvas(640, 760);
  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
}

function draw() {
  background(105, 94, 110);
  for (let i = 0; i < 12; i++) {
    let index = floor(random(total));
    randomCounts[index]++;
  }

  // Draw a rectangle to graph results
  stroke(50, 99, 0);
  strokeWeight(2);
  fill(205, 250, 150);

  let w = width / randomCounts.length;

  for (let x = 0; x < randomCounts.length; x++) {
    rect(
      x * w + w / 4,
      height - randomCounts[x] * 1,
      (w - 1) / 2,
      randomCounts[x] * 1
    );
  }
}
