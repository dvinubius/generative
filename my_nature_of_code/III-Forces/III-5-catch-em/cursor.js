class Cursor {
  constructor(actionRad = 150) {
    this.update();
    this.actionRad = actionRad;
  }

  update() {
    this.oldPos = this.pos || createVector(mouseX, mouseY);
    this.pos = createVector(mouseX, mouseY);
    this.velocity = this.pos.copy().sub(this.oldPos);
  }

  get position() {
    return this.pos.copy();
  }

  display() {
    if (mouseIsPressed) {
      strokeWeight(1);
      stroke("hsla(37, 100%, 50%, 0.4)");
      fill(color("hsla(0, 0%, 0%, 0.2)"));
      ellipse(mouseX, mouseY, this.actionRad, this.actionRad);
    } else {
      strokeWeight(2);
      stroke(10, 100, 50);
      fill(0);
      ellipse(mouseX, mouseY, 25, 25);
    }
  }
}
