let randomCounts = [];
let randomCountsInc = [];
let randomCountsMode = [];
let randomCountsModeInc = [];
let total = 80;

function setup() {
  createCanvas(640, 560);
  colorMode(HSB);
  background(24, 6, 10);

  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
    randomCountsInc[i] = 1;
    randomCountsMode[i] = 1;
    randomCountsModeInc[i] = 1;
  }
}

function draw() {
  for (let i = 0; i < 160; i++) {
    // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
    let xloc = randomGaussian();

    const sd = 100; // Define a standard deviation
    const mean = width / 2; // Define a mean value (middle of the screen along the x-axis)
    xloc = xloc * sd + mean; // Scale the gaussian random number by standard deviation and mean

    const w = width / total;
    const index = floor(xloc / w);

    randomCounts[index] += randomCountsInc[index];

    checkChangeDirection(index);

    if (randomCountsMode[index] > 0.5) {
      fill(163, 100, 98, 0.1);
    } else {
      fill(163, 100, 2, 0.1);
    }
    noStroke();
    ellipse(xloc, height - randomCounts[index], 4, 4); // Draw an ellipse at our "normal" random position
  }
}

const checkChangeMode = (index) => {
  randomCountsMode[index] += randomCountsModeInc[index];
  if ([5, -4].includes(randomCountsMode[index])) {
    randomCountsModeInc[index] *= -1;
  }
};

const checkChangeDirection = (index) => {
  const v = randomCounts[index];
  if (v >= height || v <= 0) {
    randomCounts[index] = constrain(v, 0, height);
    randomCountsInc[index] *= -1;
    checkChangeMode(index);
  }
};
