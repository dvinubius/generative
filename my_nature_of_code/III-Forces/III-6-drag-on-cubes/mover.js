// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.side = mass * 16;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }
  // Newton's 2nd law: F = M * A
  // or A = F / M
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  get surface() {
    return this.side ** 2;
  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(20, 100, 20);

    rect(this.position.x, this.position.y, this.side, this.side);
  }

  // Bounce off bottom of window
  checkEdges() {
    if (this.position.y > height - this.side) {
      this.velocity.y *= -0.9; // A little dampening when hitting the bottom
      this.position.y = height - this.side;
    }
  }
}
