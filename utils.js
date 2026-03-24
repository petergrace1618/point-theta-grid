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

function mapToRangeClamped(x, inStart, inEnd, outStart, outEnd) {
  x = (x < inStart) ? inStart : x; 
  x = (x > inEnd) ? inEnd : x; 
  const normal = (x - inStart) / (inEnd - inStart);
  return outStart + (outEnd - outStart) * normal;
}

function linear(t) {
  return t;
}

function easeInOutCirc(t) {
  return t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
}

function easeInQuad(t) {
  return t * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutInCubic(t) {
  return 0.5 + Math.pow(t - 0.81, 3);
}

function easeInExpo(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
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


function iter(n, func, n0 = 0, inclusive = false) {
  n += inclusive ? 1 : 0;
  for (let i = n0; i < n; i++) {
    func(i);
  }
}


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function reflect(p, q) {
  return 
}

// linear interpolation for vectors
// q: another Vector-like object
function lerpv(p, q, t) {
  return {
    x: p.x + (q.x - p.x) * t,
    y: p.y + (q.y - p.y) * t
  }
}

