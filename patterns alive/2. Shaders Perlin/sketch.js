let gray;
let white;
const s = 21;
let noiseCt = 0;
let noiseDiff = 0.01;


function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  background(52, 2, 97);

  gray = color(1, 0, 30);
  white = color(40, 50, 76);

  frameRate(60);
}

function draw() {
  background(white);
  stroke(gray);

  let x = 0;
  while (x < width) {
    const nse = noise(noiseCt + x * noiseDiff);
    const w = map(nse, 0, 1, 1, s);
    strokeWeight(w);
    line(x,0,x,height);
    x += s;
  }
  noiseCt += noiseDiff;
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
