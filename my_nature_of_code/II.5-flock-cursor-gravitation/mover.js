class Mover {
  constructor(rad = 30, hue = 14) {
    this.r = 0;
    this.maxRad = rad;
    this.hue = hue;
    this.strokeHue = floor(hue / 2);
    this.bounce = false;
    this.cycleEstate = false;
    this.compressCloseToCursor = false;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.canvDiag = createVector(width, height).mag();
    this.attractor = null;
  }

  setCycleEstate(doIt) {
    this.cycleEstate = doIt;
  }

  setBounce(doIt) {
    this.bounce = doIt;
  }

  setCompressCloseToCursor(doIt) {
    this.compressCloseToCursor = doIt;
  }

  setAttractor(attractor) {
    this.attractor = attractor;
  }

  get myMassInv() {
    return map(this.maxRad, 0, this.maxRad, 5, 1);
  }

  goForAttractor() {
    const dToAttr = this.attractor.position.sub(this.position);
    const norm = dToAttr.normalize();
    const intensity =
      (this.attractor.mass * this.myMassInv) / dToAttr.mag() ** 2;
    return norm.mult(intensity);
  }

  update() {
    this.acceleration = this.attractor
      ? this.goForAttractor()
      : createVector(0, 0);
    this.velocity.add(this.acceleration);
    this.velocity.limit(15);
    this.position.add(this.velocity);

    if (this.bounce) {
      this.checkBounce();
    }

    if (this.cycleEstate) {
      this.checkCycleEstate();
    }
  }

  display() {
    if (this.compressCloseToCursor) this.updateRadius();

    if (mouseIsPressed) {
      fill(this.hue, 80, 50);
      noStroke();
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 0.95,
        this.r * 2 * 0.95
      );
    } else {
      stroke(this.strokeHue, 80, 20);
      fill(this.strokeHue, 80, 50);
      strokeWeight(1);
      ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    }
    if (this.cycleEstate) {
      this.addDoubleAcross();
    }
  }

  updateRadius() {
    if (mouseX < 0 || mouseY < 0) {
      return;
    }
    const dToPointer = createVector(mouseX, mouseY).sub(this.position).mag();
    const closeNess = dToPointer < 20 ? 1 : (20 / dToPointer) ** 0.8;
    this.r = map(closeNess, 1, 0, this.maxRad / 1.3, this.maxRad);
  }

  checkBounce() {
    if (this.position.x + this.r > width || this.position.x - this.r < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y + this.r > height || this.position.y - this.r < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
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
