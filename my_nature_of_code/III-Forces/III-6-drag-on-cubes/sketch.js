// Forces (Gravity and Fluid Resistence) with Vectors

// Demonstration of multiple force acting on bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

// Five moving bodies
let movers = [];

// Liquid
let liquid;

function setup() {
  createCanvas(640, 640);
  reset();
  colorMode(HSL);
  // Create liquid object
  liquid = new Liquid(0, (height * 3) / 4, width, height / 4, 0.2);
}

function draw() {
  background(52, 2, 97);

  // Draw water
  liquid.display();

  for (let i = 0; i < movers.length; i++) {
    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      let dragForce = liquid.calculateDrag(movers[i]);
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.1 * movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);

    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}

// Not working???
function mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
function reset() {
  for (let i = 0; i < 9; i++) {
    movers[i] = new Mover(20 + i * 70, 0, random(0.5, 3));
  }
}
