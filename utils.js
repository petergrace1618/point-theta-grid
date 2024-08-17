const PI = Math.PI;
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;

function $(selector) {
  return document.querySelector(selector);
}


function $$(selector) {
  return document.querySelectorAll(selector);
}


function swap(a, b) {
  return [b, a];
}


// Returns a random integer, 0 <= N < r
function rnd(a, b) {
  if (!a) {
    return Math.random();
  } else if (!b) {
    return Math.floor(Math.random() * a);
  } else {
    return a + Math.floor(Math.random() * (b - a));
  }
}

function constrain(n, lowerBound, upperBound) {
  if (n < lowerBound) return lowerBound;
  if (n > upperBound) return upperBound;
  return n;
}

function lerp(a, b, x) {
  return a + (b - a) * x;
}

function easeInQuad(x) {
  return x * x;
}

function easeInExpo(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

// TODO: make calculateTheta and midPoint methods of Point class

// Given an object with properties x and y,
// calculate the angle from the positive 
// x-axis to the point (x,y)
function calculateTheta(p) {
  let theta = Math.atan(p.y / p.x);

  // Converts the result of sign (-1, 0, 1) to 
  // (0, 1, 2) for use as index into multiplier array
  const x = Math.sign(p.x) + 1;
  const y = Math.sign(p.y) + 1;
  
  // Range of atan() is [-PI/2, PI/2]. multiplier[] is used
  // to add a multiple of PI based on the quadrant of the 
  // point to give an angle in the range [0, 2 * PI)
  const multiplier = [
    [1, 2, 2],
    [1, 0, 0],
    [1, 0, 0]
  ];
  return theta + multiplier[y][x] * Math.PI;
}

function midPoint(p, q) {
  return {
    x: (p.x + q.x) / 2,
    y: (p.y + q.y) / 2
  }
}

