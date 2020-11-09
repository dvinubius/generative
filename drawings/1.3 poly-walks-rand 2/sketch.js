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
  
  // const maxX = frameCount*0.6;

  const maxX = width;
  
  p1 = createVector(random(maxX),0);
  p2 = createVector(random(maxX),height);
  
  hostPoly = [
    createVector(0,0),
    createVector(p1.x,p1.y),
    createVector(p2.x,p2.y),
    createVector(0, height),
  ];
  
  noFill();
  strokeWeight(0.2);
  stroke(100);
  
  drawDescendingSubPolys(hostPoly, drawDepth);
  
  if (frameCount >= 400) {
    noLoop();
  }
}