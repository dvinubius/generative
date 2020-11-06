function setup() {
  createCanvas(400, 400);
  // noLoop();
  frameRate(60);
  colorMode(HSL);
  angleMode(DEGREES);
  background(0);
  
}

let p1;
let p2;
let hostPoly;
const drawDepth = 20;


function draw() {
  
  stroke(20);
  noFill();
  rect(0,0,width,height);
  
  translate(width/2, height/2);
  rotate(-90);
  translate(-width/2,-height/2);
  
  rectMode(CORNER);
  
  const maxX = frameCount*0.6;
  
  p1 = createVector(random(maxX),0);
  p2 = createVector(random(maxX),height);
  
  const difVect = p5.Vector.sub(p2,p1);
  const sideLen = difVect.mag();
  
  translate(p1.x, p1.y);
  rotate(difVect.heading());
  hostPoly = [
    createVector(0,0),
    createVector(0,sideLen),
    createVector(sideLen,sideLen),
    createVector(sideLen,0),
  ];
  
  noFill();
  strokeWeight(0.3);
  stroke(100);
  
  drawDescendingSubPolys(hostPoly, drawDepth);
  
  if (frameCount >= 700) {
    noLoop();
  }
}

const drawDescendingSubPolys = (hostPoly, depth) => {
  let nextPoly = hostPoly;
  for (let i = 0; i < depth; i++) {
    drawPolygon(nextPoly);
    nextPoly = walkPolygonIterations(nextPoly, 1, () => 0.5)[0];
  }
}

const drawPolygon = (points) => {
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
};