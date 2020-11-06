let drawCt = 0;
let canvasScaleFactor;
let lineTrailAnimators = [];
let drawCtMax = Infinity;

function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
  background(52, 2, 97);
  smooth();
  canvasScaleFactor = min(width / 2, height / 2);

  // VARIATE
  setup12();
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
  draw12();
}

const setup12 = () => {
  const animator = new LineTrailAnimator(genPoints4);
  animator.scaleFactor = canvasScaleFactor;
  animator.useElapsedTime();
  animator.trailLength = 2;
  animator.stepOffset = 0;
  animator.inverseDensity = 100;
  animator.lineAnimationSpeed = 8;
  animator.globalRotationSpeed = 32;
  animator.baseColor = color(5, 90, 50);
  animator.maxAlphaLine = 0.11;
  animator.minAlphaLine = 0.01;
  animator.maxLumLineCore = 80;
  animator.minLumLineCore = 20;
  animator.coreLumVarSpeed = 1;

  lineTrailAnimators = [animator];
};
const draw12 = () => {
  lineTrailAnimators[0].draw();
};

const setup13 = () => {
  const animator1 = new LineTrailAnimator(genPoints4);
  animator1.scaleFactor = canvasScaleFactor;
  animator1.useElapsedTime();
  animator1.trailLength = 1;
  animator1.stepOffset = 0;
  animator1.inverseDensity = 100;
  animator1.lineAnimationSpeed = 2;
  animator1.globalRotationSpeed = 1;
  animator1.baseColor = color(5, 90, 50);
  animator1.maxAlphaLine = 0.05;
  animator1.minAlphaLine = 0.01;
  animator1.maxLumLineCore = 80;
  animator1.minLumLineCore = 40;
  animator1.coreLumVarSpeed = 1;
  const animator2 = new LineTrailAnimator(genPoints1);
  animator2.scaleFactor = canvasScaleFactor;
  animator2.useElapsedTime();
  animator2.trailLength = 1;
  animator2.stepOffset = 2000;
  animator2.inverseDensity = 100;
  animator2.lineAnimationSpeed = 1;
  animator2.globalRotationSpeed = 2;
  animator2.baseColor = color(50, 90, 50);
  animator2.maxAlphaLine = 0.1;
  animator2.minAlphaLine = 0.05;
  animator2.maxLumLineCore = 80;
  animator2.minLumLineCore = 50;
  animator2.coreLumVarSpeed = 1.5;
  lineTrailAnimators = [animator1, animator2];
};
const draw13 = () => {
  background(52, 2, 97);
  lineTrailAnimators.forEach((anim) => anim.draw());
};
