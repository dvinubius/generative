class Cursor {
  static frictionCoeff = 0.002;
  static actionRad = 30;

  constructor() {
    this.update();
    this.actionRad = Cursor.actionRad;
  }

  update() {
    this.oldPos = this.pos || createVector(mouseX, mouseY);
    this.pos = createVector(mouseX, mouseY);
    this.velocity = this.pos.copy().sub(this.oldPos);
  }

  get position() {
    return this.pos.copy();
  }

  dragFirmly(m) {
    m.velocity = this.velocity.copy().mult(1);
  }

  frictionUpon(m) {
    const v = m.velocity.copy().normalize().mult(-1);
    const friction = v.mult(Cursor.frictionCoeff);
    return friction;
  }

  display() {
    if (mouseIsPressed) {
      strokeWeight(1);
      stroke(color("hsla(37, 100%, 50%, 0.4)"));
      fill(color("hsla(0, 0%, 100%, 0.2)"));
      ellipse(mouseX, mouseY, this.actionRad * 2, this.actionRad * 2);
    } else {
      strokeWeight(2);
      stroke(color("hsla(10, 100%, 50%, 0.7)"));
      fill("hsla(0, 0%, 100%, 0.2)");
      ellipse(mouseX, mouseY, 25, 25);
    }
  }
}
