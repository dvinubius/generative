let drawCt = 0;
let canvasScaleFactor;
let lineTrailAnimators = [];
let drawCtMax = Infinity;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 91);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setup2();
}

function draw() {
  if (drawCt > drawCtMax) {
    let text = createP("Done");
    text.position(3, 3);
    text.style("color", "white");
    text.style("font-family", "Courier New");
    noLoop();
  }
  drawCt++;

  // VARIATE
  draw2();
}

const setup2 = () => {
  const animator = new LineTrailAnimator(genPoints4);
  animator.scaleFactor = canvasScaleFactor;
  animator.useFrameCounter();
  animator.trailLength = 1;
  animator.stepOffset = 0;
  animator.lineAnimationSpeed = 1;
  animator.globalRotationSpeed = 4;
  const fullCircle = 1198;
  drawCtMax = fullCircle;
  animator.baseColor = color(85, 100, 50);
  animator.maxAlphaLine = 0.21;
  animator.minAlphaLine = 0.01;
  animator.maxLumLineCore = 90;
  animator.minLumLineCore = 10;
  animator.coreLumVarSpeed = 0.37;

  lineTrailAnimators = [animator];
};

const draw2 = () => {
  lineTrailAnimators[0].draw();
};
