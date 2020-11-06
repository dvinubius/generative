class Mover {
  constructor(x, y, r, density, hue = 36) {
    this.mass = (4 / 3) * PI * r ** 3 * density;
    this.r = r;
    this.hue = hue;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.bounce = false;
    this.bounceLossFactor = 0.8;
    this.caught = false;
  }

  setBounce(doIt) {
    this.bounce = doIt;
  }

  setCaught(is) {
    this.caught = is;
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

    if (this.bounce) {
      this.checkBounce();
    }

    if (this.cycleEstate) {
      this.checkCycleEstate();
    }
  }

  display() {
    if (this.caught) {
      fill(this.hue, 60, 80);
      noStroke();
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 0.95,
        this.r * 2 * 0.95
      );
    } else {
      stroke(this.hue, 80, 20);
      fill(this.hue, 80, 50);
      strokeWeight(1);
      ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    }
  }

  checkBounce() {
    if (this.position.x + this.r > width || this.position.x - this.r < 0) {
      this.velocity.x = this.velocity.x * -1 * this.bounceLossFactor;
    }
    if (this.position.y + this.r > height || this.position.y - this.r < 0) {
      this.velocity.y = this.velocity.y * -1 * this.bounceLossFactor;
    }

    this.position.x = constrain(this.position.x, this.r, width - this.r);
    this.position.y = constrain(this.position.y, this.r, height - this.r);
  }
}
