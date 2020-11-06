class Hoppable {
  constructor(initialVel = createVector(0, 0), hopPower = 4, timesPerSec = 1) {
    this.hopPower = hopPower;
    this.hopVelocity = initialVel.copy().normalize();
    this.timesPerSec = timesPerSec;
  }

  _memVel(vel) {
    if (vel.mag() != 0) {
      this.hopVelocity = vel.copy().normalize();
    }
  }

  transform(vel) {
    this._memVel(vel);
    // 1 period = about 1 sec
    const ct = (Date.now() % 1000) / 100 / 4;

    const customCt = ct * this.timesPerSec;
    const instantFactor = sin(customCt) ** 2;

    return this.hopVelocity
      .copy()
      .normalize()
      .mult(this.hopPower * instantFactor);
  }
}
