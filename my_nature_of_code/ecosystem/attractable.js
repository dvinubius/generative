class Attractable {
  constructor(maxRad) {
    this.maxRad = maxRad;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.canvDiag = createVector(width, height).mag();
    this.attractor = null;
  }

  setAttractor(attractor) {
    this.attractor = attractor;
  }

  get myMassInv() {
    return map(this.maxRad, 0, this.maxRad, 5, 1);
  }

  goForAttractor(pos) {
    const dToAttr = this.attractor.position.sub(pos);
    const norm = dToAttr.normalize();
    const intensity =
      (this.attractor.mass * this.myMassInv) / dToAttr.mag() ** 2;
    return norm.mult(intensity);
  }

  getAcceleration(currPosition) {
    return this.attractor
      ? this.goForAttractor(currPosition)
      : createVector(0, 0);
  }
}
