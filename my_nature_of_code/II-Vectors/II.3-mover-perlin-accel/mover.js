class Mover {
  constructor(rad) {
    this.r = rad;
    this.tOffX = 0;
    this.tOffY = 1000;
    this.nD = 0.01;
    this.accRange = 0.015;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.acceleration = this.noiseForStep();
    this.velocity.add(this.acceleration);
    this.velocity.limit(20);
    this.position.add(this.velocity);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(7, 80, 50);

    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    this.addDoubleAcross();
  }

  noiseForStep() {
    this.tOffX += this.nD;
    this.tOffY += this.nD;
    const accX = map(noise(this.tOffX), 0, 1, -this.accRange, this.accRange);
    const accY = map(noise(this.tOffY), 0, 1, -this.accRange, this.accRange);
    return createVector(accX, accY);
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

  checkEdges() {
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
