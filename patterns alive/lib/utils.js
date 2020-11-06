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
