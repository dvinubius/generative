class Mover {
  constructor(x, y, mass, hue = 14) {
    this.mass = mass;
    this.r = mass * 8;
    this.hue = hue;
    this.strokeHue = floor(hue / 2);
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // reset
    this.acceleration.mult(0);

    this.checkBounce();
    if (this.cycleEstate) {
      this.checkCycleEstate();
    }
  }

  display() {
    stroke(this.strokeHue, 80, 20);
    fill(this.strokeHue, 80, 50);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }

  checkBounce() {
    if (this.position.x + this.r > width || this.position.x - this.r < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y + this.r > height || this.position.y - this.r < 0) {
      this.velocity.y = this.velocity.y * -1;
    }

    this.position.x = constrain(this.position.x, this.r, width - this.r);
    this.position.y = constrain(this.position.y, this.r, height - this.r);
  }
}
