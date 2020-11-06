class AttractedMover extends SimpleMover {
  constructor(r, hue) {
    super(r, hue);
    this.velocity = createVector(0, 0);
    this.enableAttraction();
    this.maxRad = r;
    this.compressCloseToCursor = false;
    this.canvDiag = createVector(width, height).mag();
  }

  setCompressCloseToCursor(doIt) {
    this.compressCloseToCursor = doIt;
  }

  display() {
    this.updateRadius();
    if (this.attractable.attractor) {
      this.attractedDisplay();
    } else {
      super.display();
    }
  }

  attractedDisplay() {
    fill(this.hue, 60, 70);
    strokeWeight(2);
    stroke(10, 100, 50);
    ellipse(
      this.position.x,
      this.position.y,
      this.r * 2 * 0.95,
      this.r * 2 * 0.95
    );
  }

  updateRadius() {
    if (
      !this.compressCloseToCursor ||
      !this.attractable.attractor ||
      mouseX < 0 ||
      mouseY < 0
    ) {
      return;
    }
    const tPos = this.attractable.attractor.position;
    const dToPointer = createVector(tPos.x, tPos.y).sub(this.position).mag();
    const closeNess = dToPointer < 20 ? 1 : (20 / dToPointer) ** 0.8;
    this.r = map(closeNess, 1, 0, this.maxRad / 1.3, this.maxRad);
  }
}
