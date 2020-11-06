class Attractor extends Mover {
  static G = 1.1;

  constructor(x, y, r, density, hue, isBlackHole = false) {
    super(x, y, r, density, hue);
    this.isBlackHole = isBlackHole;
  }

  display() {
    if (!this.isBlackHole) {
      super.display();
      return;
    }

    if (this.caught) {
      strokeWeight(2);
      fill(this.hue, 60, 20);
      stroke(this.hue, 60, 50);
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 0.9,
        this.r * 2 * 0.9
      );
      stroke(this.hue, 60, 20);
      noFill();
      strokeWeight(1);
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 1.1,
        this.r * 2 * 1.1
      );
    } else {
      strokeWeight(2);
      stroke(this.hue, 80, 10);
      fill(this.hue, 80, 0);
      ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
      stroke(this.hue, 80, 50);
      noFill();
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 1.1,
        this.r * 2 * 1.1
      );
      stroke(this.hue, 80, 10);
      ellipse(
        this.position.x,
        this.position.y,
        this.r * 2 * 1.2,
        this.r * 2 * 1.2
      );
    }
  }

  attractionUpon(m) {
    const d = this.position.copy().sub(m.position);

    let dist = d.mag();
    dist = constrain(dist, 5, 30);

    const orient = d.normalize();
    const strength = (Attractor.G * m.mass * this.mass) / dist ** 2;

    return orient.mult(strength);
  }
}
