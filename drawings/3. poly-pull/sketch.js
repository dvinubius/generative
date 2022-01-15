const offset = 20;
const iterations = 120;
let clicked = false;

let basePolygon;
let pulls;

function mouseClicked() {
  clicked = true;
}

function setup() {
  createCanvas(740, 740);
  let text = createP("Click it");
  text.position(60, 10);
  text.style("color", "white");
  text.style("font-family", "Courier New");
  text.style("font-size", "18px");
  colorMode(HSL);
  background(52, 2, 97);
  initHostPoly();
}

function draw() {
  background(52, 2, 97);

  pulls = generatePullsFor(basePolygon);
  pulls.reverse().forEach((p, i) => {
    // stroke(i * 30, 50, 50, 0.4); // when not repainting on each draw
    stroke(map(i / iterations, 0, 1, 230, 150), 50, 50, 1);
    strokeWeight(map(i / iterations, 0, 1, 2, 0.2));
    drawPoly(p, i == 0 ? color(`hsla(230, 80%, 65%,0.4)`) : null);
  });
}

function initHostPoly() {
  basePolygon = [
    createVector(offset + random(width / 4), offset + random(height / 4)),
    createVector(
      width - offset - random(width / 4),
      offset + random(height / 4)
    ),
    createVector(
      width - offset - random(width / 4),
      height - offset - random(height / 4)
    ),
    createVector(
      offset + random(width / 4),
      height - offset - random(height / 4)
    ),
  ];
}

function generatePullsFor(p) {
  const ret = [p];
  for (let i = 1; i < iterations; i++) {
    const xTarget = clicked ? mouseX : width / 2;
    const yTarget = clicked ? mouseY : height / 2;
    const target = createVector(xTarget, yTarget);
    const pulled = polygonPulledTowards(ret[i - 1], target, 2 / iterations);

    ret.push(pulled);
  }
  return ret;
}

const drawPoly = (p, col) => {
  if (col) {
    fill(col);
  } else {
    noFill();
  }
  beginShape();
  const [p1, p2, p3, p4] = p;
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
};
