let gray;
let white;
const s = 21;
let angleA, angleB;

function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  background(52, 2, 97);

  gray = color(1, 0, 30);
  white = color(180, 10, 86);

  angleA = random(TWO_PI);
  angleB = random(TWO_PI);

  frameRate(60);
}

function draw() {
  background(white);
  stroke(gray);

  let a = angleA;
  let b = angleB;

  let x = 0;
  while (x < width) {
    const addAngle = sin(a) + sin(b);
    const w = map(addAngle, -2, 2, 1, s);
    strokeWeight(w);
    line(x,0,x,height);
    x += s;
    a += 0.2;
    b += 0.1;
  }

  angleA += 0.02;
  angleB += 0.01;
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
