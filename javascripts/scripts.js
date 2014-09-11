console.log('Your Turn');

var canvas;
var context;
var size = 80;

window.onload = init;

function init() {
  canvas = document.getElementById('board');
  context = canvas.getContext('2d');
  console.log(context);
  draw();
}

function drawBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      context.fillStyle = (row + col) % 2 == 0 ? '#fff' : '#000';
      context.fillRect(col * size, row * size, size, size);
    }
  }
}

function draw() {
  context.clearRect(0, 0, 8 * size, 8 * size);
  drawBoard();
}
