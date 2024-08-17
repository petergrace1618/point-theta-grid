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

  let theta = Math.atan2(this.y, this.x);
  theta = theta < 0 ? TWO_PI + theta : theta;
  const thetaDeg = theta * 360 / (2 * Math.PI);

  this.theta = () => theta;
  this.thetaDeg = () => thetaDeg;
}


Point.prototype.draw = function() {
  ctx.fillStyle = 'hsl(16, 60%, 50%)'; 
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
  
  ctx.strokeStyle = 'rgb(0 200 255 / 30%)'
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
  const cx = ('' + canvasX).padStart(4, ' ');
  const cy = ('' + canvasY).padStart(4, ' ');
  coordsEl.innerText = `(${cx},${cy})`;
  thetaEl.innerText = '\u03b8 = ';
  thetaEl.innerText += 
  !isNaN(theta) ? ` ${rad} rad, ${deg}\u00b0` : ' undefined'; 
}


//// MAIN LOOP ////

let p = new Point(0,0); 
let canvasX = 0, canvasY = 0;
const scaleFactor = 3

cvs.addEventListener('mousemove', e => {
  canvasX = Math.floor(((e.x - cvs.offsetLeft) - width / 2) / scaleFactor);
  canvasY = Math.floor(((e.y - cvs.offsetTop) - height / 2) / -scaleFactor);
  
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