let nextPoly;

const descentDepth = 60;

let drawCt = 0;

let descents = 0;
const upperPs = [];
const lowerPs = [];
const totalPsEdge = 30;


function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  // background(0);
  background(60,50,97);
}

function initPoints() {
  for (let i = 0; i < totalPsEdge; i++) {
    upperPs.push(createVector(random(width),-2));
    lowerPs.push(createVector(random(width),height +2));
  } 
}

function draw() {
  if (frameCount >= 60) {
    noLoop();
  }

  translate(width/2, height/2);
  rotate(90 * frameCount);
  translate(-width/2, -height/2);

  strokeWeight(0.2);
  stroke(50,50,5, 0.1);
  noFill();
  
  initPoints();
  const upForPairs = [];
  const lowForPairs = [];
  const pairs = [];
  for (let i = 0; i < totalPsEdge; i++) {
    const newUp = upperPs.splice(floor(random(upperPs.length)), 1)[0];
    const newLow = lowerPs.splice(floor(random(lowerPs.length)), 1)[0];
    upForPairs.push(newUp);
    lowForPairs.push(newLow);
    
    pairs.push([newUp, newLow]);
  }
  
  const polys = pairs.map((pair, index) => 
   index < pairs.length - 1 ? [
      pair[0], pairs[index+1][0], pairs[index+1][1], pair[1]
    ]
    :[pair[0], pairs[0][0], pairs[0][1], pair[1]]
    );
  
  polys.forEach(p => {
    // drawPolygon(p);
    const descentPolys = descentInner(p, descentDepth, () => 0.5 + random()*0.05);
    descentPolys.forEach(dp => drawPolygon(dp));
  });

}