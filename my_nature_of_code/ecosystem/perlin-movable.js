class PerlinMovable {
  constructor(amp = 0.05, diffOff = 0.01) {
    this.amp = amp;
    this.xoff = 0;
    this.yoff = 1000;
    this.diffOff = diffOff;
  }

  getAcceleration() {
    this.xoff += this.diffOff;
    this.yoff += this.diffOff;

    const accx = map(noise(this.xoff), 0, 1, -this.amp, this.amp);
    const accy = map(noise(this.yoff), 0, 1, -this.amp, this.amp);

    return createVector(accx, accy);
  }
}
