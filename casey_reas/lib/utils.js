const pointBtw = (p1, p2, farFromP1) => {
  if (p1.x == p2.x) {
    return createVector(p1.x, p1.y + farFromP1 * (p2.y - p1.y));
  }
  const slope = (p1.y - p2.y) / (p1.x - p2.x);
  const dx = p2.x - p1.x;
  const newX = p1.x + dx * farFromP1;
  const newY = slope * newX + p1.y - slope * p1.x;
  return createVector(newX, newY);
};

function touchingForms(form1, form2) {
    const contactRange = form1.radius + form2.radius;
    const d = dist(form1.x,form1.y,form2.x, form2.y);
    return d <= contactRange;
}

function moveAwayFrom(form1, form2) {
  const v1 = createVector(form1.x, form1.y);
  const v2 = createVector(form2.x, form2.y);
  return p5.Vector.sub(v1, v2).normalize();
}

function inverseRelativeDistance(form1, form2) {
  var d = dist(form1.x, form1.y, form2.x, form2.y);
  var max = form1.radius + form2.radius;
  if (d > max) return 0;
  return (max - d) / max;
}

function createSliderWithState(initial = 1, index = 0) {
  const sl = createSlider(0, 100, initial * 100, 1);
  const ret = {
    sliderEl: sl, 
    hasRecentChange: false
  }
  sl.position(30 + index * (200 + 30), 60);
  sl.style("width", `200px`);
  sl.input(() => ret.hasRecentChange = true);
  return ret;
}

function myHue(i, j) {
  const diffHue = MAX_HUE - MIN_HUE;
  return (MIN_HUE + (i*7 + j*11) % diffHue) % 360;
}

function myHue2(i, j) {
  const diffHue = MAX_HUE - MIN_HUE;
  return (MIN_HUE + (i*3 + j*11) % diffHue) % 360;
}
function myHue3(i, j) {
  const diffHue = MAX_HUE - MIN_HUE;
  return (MIN_HUE + (i*5 + j*7) % diffHue) % 360;
}