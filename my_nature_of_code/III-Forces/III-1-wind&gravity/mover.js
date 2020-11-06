class Mover {
  constructor(x, y, mass, hue = 14) {
    this.mass = mass;
    this.r = mass * 8;
    this.hue = hue;
    this.strokeHue = floor(hue / 2);
    this.bounce = false;
    this.cycleEstate = false;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  setCycleEstate(doIt) {
    this.cycleEstate = doIt;
  }

  setBounce(doIt) {
    this.bounce = doIt;
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
    stroke(this.strokeHue, 80, 20);
    fill(this.strokeHue, 80, 50);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);

    if (this.cycleEstate) {
      this.addDoubleAcross();
    }
  }

  checkBounce() {
    if (this.position.x + this.r > width || this.position.x - this.r < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y + this.r > height || this.position.y - this.r < 0) {
      this.velocity.y = this.velocity.y * -1;
    }

    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  addDoubleAcross() {
    if (this.position.y + this.r > height) {
      ellipse(
        this.position.x,
        this.position.y - height,
        this.r * 2,
        this.r * 2
      );
    }
    if (this.position.y - this.r < 0) {
      ellipse(
        this.position.x,
        height + this.position.y,
        this.r * 2,
        this.r * 2
      );
    }
    if (this.position.x + this.r > width) {
      ellipse(this.position.x - width, this.position.y, this.r * 2, this.r * 2);
    }
    if (this.position.x - this.r < 0) {
      ellipse(width + this.position.x, this.position.y, this.r * 2, this.r * 2);
    }
  }

  checkCycleEstate() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
