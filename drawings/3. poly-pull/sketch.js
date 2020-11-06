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
    p.draw(i == 0 ? color(`hsla(230, 80%, 65%,0.4)`) : null);
  });
}

function initHostPoly() {
  basePolygon = new Poly(
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
    )
  );
}

function generatePullsFor(p) {
  const ret = [p];
  for (let i = 1; i < iterations; i++) {
    const xTarget = clicked ? mouseX : width / 2;
    const yTarget = clicked ? mouseY : height / 2;
    const target = createVector(xTarget, yTarget);
    const pulled = new Poly(
      ...polygonPulledTowards(ret[i - 1], target, 2 / iterations)
    );
    ret.push(pulled);
  }
  return ret;
}

class Poly {
  constructor(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  draw(col) {
    if (col) {
      fill(col);
    } else {
      noFill();
    }
    beginShape();
    vertex(this.p1.x, this.p1.y);
    vertex(this.p2.x, this.p2.y);
    vertex(this.p3.x, this.p3.y);
    vertex(this.p4.x, this.p4.y);
    endShape(CLOSE);
  }
}
