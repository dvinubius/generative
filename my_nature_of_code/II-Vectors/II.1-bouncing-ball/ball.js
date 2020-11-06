class Ball {
  constructor(radius) {
    this.position = new createVector(100, 100);
    this.r = radius;
    this.velocity = new createVector(2.5, 5);
  }

  checkBounce() {
    if (this.position.x + this.r > width || this.position.x - this.r < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y + this.r > height || this.position.y - this.r < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  update() {
    // Add the current speed to the position.
    this.position.add(this.velocity);
    this.checkBounce();
  }
  display() {
    // Display circle at x position
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}
