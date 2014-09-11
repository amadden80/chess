console.log('Your Turn');

var canvas;
var context;
var size = 80;
var fontSize = Math.floor(size/2);
var players = [
  {
    color: '#000',
    textColor: '#fff',
    name: 'Andy'
  },
  {
    color: '#fff',
    textColor: '#000',
    name: 'Hari'
  }
]

var pieces = [
  {row: 0, col: 0, player: 0, type: 'R'},
  {row: 0, col: 1, player: 0, type: 'N'},
  {row: 0, col: 2, player: 0, type: 'B'},
  {row: 0, col: 3, player: 0, type: 'Q'},
  {row: 0, col: 4, player: 0, type: 'K'},
  {row: 0, col: 5, player: 0, type: 'B'},
  {row: 0, col: 6, player: 0, type: 'N'},
  {row: 0, col: 7, player: 0, type: 'R'},
  {row: 1, col: 0, player: 0, type: 'P'},
  {row: 1, col: 1, player: 0, type: 'P'},
  {row: 1, col: 2, player: 0, type: 'P'},
  {row: 1, col: 3, player: 0, type: 'P'},
  {row: 1, col: 4, player: 0, type: 'P'},
  {row: 1, col: 5, player: 0, type: 'P'},
  {row: 1, col: 6, player: 0, type: 'P'},
  {row: 1, col: 7, player: 0, type: 'P'},
  {row: 7, col: 0, player: 1, type: 'R'},
  {row: 7, col: 1, player: 1, type: 'N'},
  {row: 7, col: 2, player: 1, type: 'B'},
  {row: 7, col: 3, player: 1, type: 'Q'},
  {row: 7, col: 4, player: 1, type: 'K'},
  {row: 7, col: 5, player: 1, type: 'B'},
  {row: 7, col: 6, player: 1, type: 'N'},
  {row: 7, col: 7, player: 1, type: 'R'},
  {row: 6, col: 0, player: 1, type: 'P'},
  {row: 6, col: 1, player: 1, type: 'P'},
  {row: 6, col: 2, player: 1, type: 'P'},
  {row: 6, col: 3, player: 1, type: 'P'},
  {row: 6, col: 4, player: 1, type: 'P'},
  {row: 6, col: 5, player: 1, type: 'P'},
  {row: 6, col: 6, player: 1, type: 'P'},
  {row: 6, col: 7, player: 1, type: 'P'},
]

window.onload = init;

function init() {
  canvas = document.getElementById('board');
  context = canvas.getContext('2d');
  console.log(context);
  draw();

  pieces.forEach(function(piece){
    drawPiece(piece);
  });

}

function drawBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      context.fillStyle = (row + col) % 2 == 0 ? '#ffedc7' : '#333';
      context.fillRect(col * size, row * size, size, size);
    }
  }
}

function drawPiece(piece){
  var x = piece.col*size+size/2;
  var y = piece.row*size+size/2;
  context.save();

  context.fillStyle = players[piece.player].color;
  context.strokeStyle = players[1 - piece.player].color;
  context.beginPath();
  context.arc(x, y, size/2.5, 0, 2*Math.PI);
  context.fill();
  context.stroke();
  context.fillStyle = players[piece.player].textColor;
  context.font = fontSize + 'pt Georgia';
  var offset = context.measureText(piece.type).width;
  context.fillText(piece.type, x - offset/2, y + fontSize/2);
  context.restore();
}

function draw() {
  context.clearRect(0, 0, 8 * size, 8 * size);
  drawBoard();
}
