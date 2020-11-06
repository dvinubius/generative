let drawCt = 0;
let canvasScaleFactor;
let lineTrailAnimators = [];
let drawCtMax = Infinity;
let text;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 97);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setup1();
}

function draw() {
  if (drawCt > drawCtMax) {
    text.html("Done");
    noLoop();
  }
  drawCt++;

  // VARIATE
  draw1();
}

const setup1 = () => {
  text = createP("");
  text.position(3, 3);
  text.style("color", "white");
  text.style("font-family", "Courier New");

  const animator = new LineTrailAnimator(genPoints8);
  animator.scaleFactor = canvasScaleFactor;
  animator.useFrameCounter();
  animator.trailLength = 1;
  animator.stepOffset = 0;
  animator.lineAnimationSpeed = 0.1;
  animator.globalRotationSpeed = 0;
  const fullCircle = 2400;
  drawCtMax = fullCircle;
  animator.baseColor = color(275, 100, 50);
  animator.maxAlphaLine = 0.03;
  animator.minAlphaLine = 0.01;
  animator.maxLumLineCore = 80;
  animator.minLumLineCore = 30;
  animator.coreLumVarSpeed = 1.75;

  lineTrailAnimators = [animator];
};

const draw1 = () => {
  lineTrailAnimators[0].draw();
};
