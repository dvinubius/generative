class SuperFormula {
  scaleFactor = 100;
  radiusOdds = () => 1;
  radiusEvens = () => 1;
  corners = () => 0;
  globalSmoothness = () => 1;
  oddsAmp = () => 1;
  evensAmp = () => 1;

  baseColor = color(0, 0, 0);
  _useElapsedTime = false;

  useElapsedTime() {
    this._useElapsedTime = true;
  }
  useFrameCounter() {
    this._useElapsedTime = false;
  }

  draw(weight = 3) {
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(this.baseColor);
    strokeWeight(weight);
    beginShape();
    this.getPoints().forEach((p) => curveVertex(p.x, p.y));
    endShape(CLOSE);
    pop();
  }

  getPoints(inc = TWO_PI / 100, offsetIdx = 0) {
    const pts = [];
    for (let t = offsetIdx * inc; t <= TWO_PI + offsetIdx * inc; t += inc) {
      const rad = this.r(t);
      pts.push(
        createVector(
          rad * cos(t) * this.scaleFactor,
          rad * sin(t) * this.scaleFactor
        )
      );
    }
    return pts;
  }

  r = (theta) => {
    const core = (this.corners() * theta) / 4;
    const odds = abs(cos(core) / this.radiusOdds());
    const evens = abs(sin(core) / this.radiusEvens());
    const bulk = odds ** this.oddsAmp() + evens ** this.evensAmp();
    return bulk ** (-1 / this.globalSmoothness());
  };
}
