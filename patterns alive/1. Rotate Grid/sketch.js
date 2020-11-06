let gray;
let white;
const gap = 20;
const gridSize = 600;
let angle = 0;
const speed = 1;

function setup() {
  createCanvas(900, 900);
  colorMode(HSL);
  background(52, 2, 97);

  gray = color(1, 7, 30);
  white = color(180, 20, 86);

  frameRate(60);
  strokeWeight(3);
  strokeCap(SQUARE);
  stroke(white);
}

function draw() {
  background(gray);
  drawPattern(0);
  drawPattern(angle);
  angle += 0.001 * speed;
}

drawPattern = (ang) => {
  push();
  translate(width /2, height / 2);
  rotate(ang);
  let rowCt = 0;
  for (let y = -gridSize/2; y < gridSize/2; y += gap*2) {
    for (let x = -gridSize/2; x < gridSize/2; x += gap) {
      const xPos = rowCt % 2 === 0 ? x : (x + gap/2); 
      line(xPos,y,xPos, y+gap*2);      
    }
    rowCt++;
  }
  pop();
}
