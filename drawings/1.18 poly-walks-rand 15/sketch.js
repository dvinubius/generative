let nextPoly;

const descentDepth = 100;

let drawCt = 0;

let descents = 0;
const upperPs = [];
const lowerPs = [];
const totalPsEdge = 280;


function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);
}

function initPoints() {
  for (let i = 0; i < totalPsEdge; i++) {
    upperPs.push(createVector(random(width),0));
    lowerPs.push(createVector(random(width),height));
  } 
}

function draw() {
  if (frameCount >= 0) {
    noLoop();
  }
  strokeWeight(0.2);
  stroke(100, 0.7);
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
    const descentPolys = descentInner(p, descentDepth, () => 0.1 + random()*0.4);
    descentPolys.forEach(dp => drawPolygonCurved(dp));
  });

}
