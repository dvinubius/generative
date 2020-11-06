let drawCt = 0;
let canvasScaleFactor;
let lineTrailAnimators = [];
let drawCtMax = Infinity;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 87);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setup2();
}

function draw() {
  if (drawCt > drawCtMax) {
    text.html("Done");
    noLoop();
  } else {
    text.html(drawCt);
  }
  drawCt++;

  // VARIATE
  draw2();
}

const setup2 = () => {
  text = createP("0");
  text.position(3, 3);
  text.style("color", "white");
  text.style("font-family", "Courier New");
  const animator = new LineTrailAnimator(genPoints4);
  animator.scaleFactor = canvasScaleFactor;
  animator.useFrameCounter();
  animator.trailLength = 1;
  animator.stepOffset = 0;
  animator.lineAnimationSpeed = 1.2;
  animator.globalRotationSpeed = 0.4;

  animator.baseColor = color(300, 100, 50);
  animator.maxAlphaLine = 0.05;
  animator.minAlphaLine = 0.01;
  animator.maxLumLineCore = 80;
  animator.minLumLineCore = 30;
  animator.coreLumVarSpeed = 0.25;

  lineTrailAnimators = [animator];
};

const draw2 = () => {
  lineTrailAnimators[0].draw();
};
