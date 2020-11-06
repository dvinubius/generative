let randomCounts = [];
let randomCountsInc = [];
let total = 40;

function setup() {
  createCanvas(640, 560);
  colorMode(HSB);
  background(237, 20, 20);

  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
    randomCountsInc[i] = 1;
  }
}

const checkFlip = (index) => {
  const v = randomCounts[index];
  if (v >= height || v <= 0) {
    randomCounts[index] = constrain(v, 0, height);
    randomCountsInc[index] *= -1;
  }
};

function draw() {
  for (let i = 0; i < 40; i++) {
    // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
    let xloc = randomGaussian();

    const sd = 80; // Define a standard deviation
    const mean = width / 2; // Define a mean value (middle of the screen along the x-axis)
    xloc = xloc * sd + mean; // Scale the gaussian random number by standard deviation and mean

    const w = width / total;
    const index = floor(xloc / w);

    randomCounts[index] += randomCountsInc[index];
    checkFlip(index);

    fill(43, 100, 98, 0.05);
    noStroke();
    ellipse(xloc, height - randomCounts[index], 12, 12); // Draw an ellipse at our "normal" random position
  }
}
