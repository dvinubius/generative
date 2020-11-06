class LineTrailAnimator {
  lineGenerator;
  trailLength = 1;
  stepOffset = 0;
  inverseDensity = 100;
  lineAnimationSpeed = 1;
  globalRotationSpeed = 0;
  baseColor = color(0, 0, 0);
  maxAlphaLine = 0.2;
  minAlphaLine = 0.05;
  maxLumLineCore = 80;
  minLumLineCore = 20;
  coreLumVarSpeed = 1;
  _useElapsedTime = false;
  scaleFactor = 100;

  linePoints;

  constructor(lineGenerator) {
    this.lineGenerator = lineGenerator;
  }

  useElapsedTime() {
    this._useElapsedTime = true;
  }
  useFrameCounter() {
    this._useElapsedTime = false;
  }

  draw() {
    if (this.lineGenerator == null) {
      throw "[ParamFnAnimator]: No generator function provided";
    }
    push();
    translate(width / 2, height / 2);
    noFill();
    for (let i = 0; i < this.trailLength; i++) {
      this.linePoints = this._genLinePointsAtTrailPos(i);
      this._drawLineShell(i);
      this._drawLineCore(i);
    }
    pop();
  }

  _drawLineShell(i) {
    const pts = this.linePoints;
    stroke(this._shellColorAtTrailPos(i));
    strokeWeight(3);
    beginShape();
    curveVertex(pts[0].x, pts[0].y);
    pts.forEach((p) => curveVertex(p.x, p.y));
    curveVertex(pts[pts.length - 1].x, pts[pts.length - 1].y);
    endShape();
  }

  _drawLineCore(i) {
    const pts = this.linePoints;
    stroke(0, 0, this._coreLuminosity(i), this._coreAlpha(i));
    strokeWeight(1);
    beginShape();
    curveVertex(pts[0].x, pts[0].y);
    pts.forEach((p) => curveVertex(p.x, p.y));
    curveVertex(pts[pts.length - 1].x, pts[pts.length - 1].y);
    endShape();
  }

  _genLinePointsAtTrailPos = (i) =>
    this.lineGenerator(
      this.stepOffset + this._animCounter() + i * this.inverseDensity
    )
      .map((p) => p.mult(this.scaleFactor))
      .map((p) => p.rotate(this._rotCounter()));

  _animCounter = () =>
    this._useElapsedTime
      ? (millis() / 1000) * 60 * this.lineAnimationSpeed
      : frameCount * this.lineAnimationSpeed;

  _rotCounter = () =>
    // at speed === 1, about one rot every 10s
    this._useElapsedTime
      ? (millis() / 1000 / 10) * this.globalRotationSpeed
      : (frameCount / 60 / 10) * TWO_PI * this.globalRotationSpeed;

  _shellColorAtTrailPos = (i) => {
    const alpha =
      this.trailLength === 1
        ? this.maxAlphaLine
        : map(i, 0, this.trailLength - 1, this.minAlphaLine, this.maxAlphaLine);
    const colorNow = color(this.baseColor.toString());
    colorNow.setAlpha(alpha);
    return colorNow;
  };

  _coreLuminosity = () =>
    map(
      sin(this._animCounter() * this.coreLumVarSpeed),
      -1,
      1,
      this.minLumLineCore,
      this.maxLumLineCore
    );

  _coreAlpha = (i) =>
    this.trailLength === 1
      ? 0.2
      : map(i, 0, this.trailLength - 1, this.maxAlphaLine, this.minAlphaLine);
}
