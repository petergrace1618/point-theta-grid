const out = $('#out');
const coordsEl = $('#coords');
const thetaEl  = $('#theta');
const cvs = $('canvas');
const width = cvs.width;
const height = cvs.height;
const ctx = cvs.getContext('2d');

ctx.translate(width / 2, height / 2);
ctx.scale(3, -3);

//// FUNCTIONS ////

function Point(x, y) {
  this.x = x;
  this.y = y;
  
  const theta = Math.atan(this.y / this.x) + quadrantAddend(this);
  const thetaDeg = theta * 360 / (2 * Math.PI);

  this.theta = () => theta;

  this.thetaDeg = () => thetaDeg; //theta * 360 / (2 * Math.PI);

  // Adds a multiple of PI based on the quadrant of the point
  // to give an angle in the range [0, 2 * PI)
  function quadrantAddend(p) {
    // Converts the result of sign (-1, 0, 1) to 
    // (0, 1, 2) for use as index into multiplier array
    const x = Math.sign(p.x) + 1;
    const y = Math.sign(p.y) + 1;
    
    const multiplier = [
      [1, 2, 2],
      [1, 0, 0],
      [1, 0, 0]
    ];
    return multiplier[y][x] * Math.PI;
  }  
}


Point.prototype.draw = function() {
  ctx.fillStyle = 'rgb(200 50 100)';
  ctx.beginPath();
  ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};


Point.prototype.drawAngle = function () {
  ctx.strokeStyle = 'rgb(0 200 255 / 30%)';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, this.theta())
  ctx.stroke();
  
  ctx.strokeStyle = 'rgb(0 128 255 / 50%)';
  ctx.beginPath()
  ctx.moveTo(0, 0);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
}


function drawGrid() {
  const tick = 10;
  ctx.beginPath();
  ctx.strokeStyle = '#222';
  for (let t = -100; t < 100; t += tick) {
    ctx.moveTo(t, 100);
    ctx.lineTo(t, -100);
    ctx.moveTo(-100, t);
    ctx.lineTo(100, t);
  }
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.strokeStyle = 'gray';
  ctx.moveTo(0, 100);
  ctx.lineTo(0, -100);
  ctx.moveTo(-100, 0);
  ctx.lineTo(100, 0);
  ctx.closePath();
  ctx.stroke();
}


function showData() {
  const theta = p.theta();
  const rad = theta.toPrecision(5);
  const deg = p.thetaDeg().toPrecision(4);
  coordsEl.innerText = `(${canvasX}, ${canvasY})`;
  thetaEl.innerText = '\u03b8 = ';
  thetaEl.innerText += 
    theta ? ` ${rad} rad, ${deg}\u00b0` : ' undefined';
}


//// MAIN LOOP ////

let p = new Point(0,0); 
let canvasX = 0, canvasY = 0;
const scaleFactor = 3

cvs.addEventListener('mousemove', e => {
  canvasX = Math.floor(((e.x - cvs.offsetLeft) - width / 2) / scaleFactor);
  canvasY = Math.floor(((e.y - cvs.offsetTop) - height / 2) / -scaleFactor);
  // showData();
  if (e.buttons == 1) {
    draw();
  }
});

cvs.addEventListener('click', e => {
  draw();
});

draw();
function draw() {
  clearCanvas();
  drawGrid();
  p = new Point(canvasX, canvasY);
  p.drawAngle();
  p.draw();
  showData();
}

function clearCanvas() {
  ctx.clearRect(-100, 100, 200, -200);
}