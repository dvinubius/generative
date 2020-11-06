class Cursor {
  display() {
    if (mouseIsPressed) {
      stroke(37, 100, 50);
    } else {
      strokeWeight(2);
      stroke(10, 100, 50);
    }
    fill(0);
    ellipse(mouseX, mouseY, 25, 25);
  }
}
