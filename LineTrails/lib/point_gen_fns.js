const genPoints1 = (t) => {
  const pf1 = (t) => createVector(sin(t / 1200) * 0.6, cos(t / 1200) * 0.7);
  const pf2 = (t) => createVector(cos(t / 1080) * 0.7, sin(t / 1080) * 0.99);
  return [pf1(t), pf2(t)];
};
const genPoints3 = (t) => {
  const baseCt = ((t / 60) * PI) / 5; // about TWO_PI every 10 seconds
  const pf1 = (t) => createVector(0, sin(5 * sin(baseCt) + cos(baseCt)) * 0.9);
  const pf3 = (t) => createVector(cos(sin(baseCt) + 5 * cos(baseCt)) * 0.9, 0);
  return [pf1(t), pf3(t)];
};

const genPoints4 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt) * 0.6, cos(baseCt) * 0.9);
  const pf2 = (t) => createVector(cos(baseCt) * 0.9, sin(-baseCt) * 0.6);
  return [pf1(t), pf2(t)];
};

const genPoints5 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) =>
    createVector(sin(-baseCt / 2) * 0.6, cos(2 * baseCt) * 0.8);
  const pf2 = (t) => createVector(cos(2 * baseCt) * 0.8, sin(baseCt / 2) * 0.6);
  return [pf1(t), pf2(t)];
};

const genPoints6 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.6, cos(3 * baseCt) * 0.8);
  const pf2 = (t) =>
    createVector(cos(3 * baseCt) * 0.8, sin(-baseCt / 2) * 0.6);
  return [pf1(t), pf2(t)];
};

const genPoints7 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.6, cos(4 * baseCt) * 0.8);
  const pf2 = (t) =>
    createVector(cos(4 * baseCt) * 0.8, sin(-baseCt / 2) * 0.6);
  return [pf1(t), pf2(t)];
};

const genPoints8 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) =>
    createVector(sin((2 * baseCt) / 2) * 0.6, cos(4 * baseCt) * 0.8);
  const pf2 = (t) =>
    createVector(cos(6 * baseCt) * 0.8, sin((2 * baseCt) / 2) * 0.6);
  return [pf1(t), pf2(t)];
};

const genPoints9 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.8, cos(baseCt / 3) * 0.8);
  const pf2 = (t) => createVector(sin(baseCt / 3) * 0.8, cos(baseCt / 2) * 0.8);
  return [pf1(t), pf2(t)];
};

const genPoints10 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.7, cos(baseCt / 3) * 0.7);
  const pf2 = (t) => createVector(sin(baseCt / 3) * 0.7, cos(baseCt / 2) * 0.7);
  return [pf1(t), pf2(t)];
};

const genPoints11 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.7, cos(baseCt / 3) * 0.7);
  const pf2 = (t) => createVector(sin(baseCt) * 0.7, cos(baseCt) * 0.7);
  return [pf1(t), pf2(t)];
};

const genPoints12 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) => createVector(sin(baseCt / 2) * 0.5, 0.5);
  const pf2 = (t) => createVector(sin(baseCt / 2) * 0.5, -0.5);
  return [pf1(t), pf2(t)];
};

const genPoints13 = (t) => {
  const baseCt = ((t / 60) * PI) / 2; // about TWO_PI every 4 seconds
  const pf1 = (t) =>
    createVector(tan(sin(baseCt / 2)) * 0.5, sin(baseCt / 2) * 0.5);
  const pf2 = (t) =>
    createVector(tan(cos(baseCt / 2)) * 0.5, -sin(baseCt / 2) * 0.5);
  return [pf1(t), pf2(t)];
};

const genPoints14 = (t) => {
  const baseCt = ((t / 60) * PI) / 5; // about TWO_PI every 10 seconds
  const pf1 = (t) =>
    createVector(sin(cos(baseCt * 2) * 2) * 0.75, sin(baseCt) * 0.75);
  const pf2 = (t) =>
    createVector(-sin(cos(baseCt * 2) * 2) * 0.75, -sin(baseCt) * 0.75);
  return [pf1(t), pf2(t)];
};
