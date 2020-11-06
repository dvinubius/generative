class Mover {
  constructor(rad) {
    this.r = rad;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2)).mult(2);
    this.acceleration = createVector(0, 0);
  }

  update() {
    if (keyIsDown(UP_ARROW)) {
      this.acceleration = this.velocity.copy().mult(0.05);
    } else if (keyIsDown(DOWN_ARROW)) {
      this.acceleration = this.velocity.copy().mult(-0.05);
    } else {
      this.acceleration = createVector(0, 0);
    }

    this.velocity.limit(30);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(7, 80, 50);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    this.addDoubleAcross();
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
