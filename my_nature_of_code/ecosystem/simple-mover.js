class SimpleMover {
  constructor(rad = 30, hue = 14) {
    this.r = rad;
    this.hue = hue;
    this.strokeHue = hue - 20;
    this.bounce = false;
    this.cycleEstate = false;
    this.position = createVector(
      random(rad, width - rad),
      random(rad, height - rad)
    );
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }

  setCycleEstate(doIt) {
    this.cycleEstate = doIt;
  }

  setBounce(doIt) {
    this.bounce = doIt;
  }

  enableHopping(initVel, hopPower, timesPerSec) {
    this.hoppable = new Hoppable(initVel, hopPower, timesPerSec);
  }

  disableHopping() {
    this.hoppable = null;
  }

  enableAttraction() {
    this.attractable = new Attractable(this.r);
  }
  disableAttraction() {
    this.attractable = null;
  }
  setAttractor(attr) {
    if (!this.attractable) return;
    this.attractable.setAttractor(attr);
  }

  enablePerlinDance(amp) {
    this.perlinDanceable = new PerlinMovable(amp);
  }
  disablePerlinDance() {
    this.perlinDanceable = null;
  }

  update() {
    if (this.hoppable) {
      this.velocity = this.hoppable.transform(this.velocity);
    }

    if (this.attractable)
      this.velocity.add(this.attractable.getAcceleration(this.position));

    if (this.perlinDanceable)
      this.velocity.add(this.perlinDanceable.getAcceleration());

    this.velocity.limit(15);
    this.position.add(this.velocity);

    if (this.bounce) {
      this.checkBounce();
    } else if (this.cycleEstate) {
      this.checkCycleEstate();
    }
  }

  display() {
    this.coreDisplay();

    if (this.cycleEstate) {
      this.addDoubleAcross();
    }
  }

  coreDisplay() {
    stroke(this.strokeHue, 60, 20);
    fill(this.strokeHue, 60, 70);
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
