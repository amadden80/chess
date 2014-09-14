function drawBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      context.fillStyle = (row + col) % 2 === 0 ? '#ffedc7' : '#333';
      context.fillRect(col * size, row * size, size, size);
    }
  }
}

function drawPiece(piece){
  var x = piece.col*size + size/2;
  var y = piece.row*size + size/2;
  var radius;
  var pieceFontSize;
  if (piece.type === 'P') {
    radius = size/3;
    pieceFontSize = Math.floor(fontSize/1.5);
  } else {
    radius = size/2.5;
    pieceFontSize = fontSize;
  }
  context.save();
  context.translate(x, y);
  context.fillStyle = players[piece.player].color;
  context.strokeStyle = players[1 - piece.player].color;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2*Math.PI);
  context.fill();
  context.stroke();
  context.fillStyle = players[piece.player].textColor;
  context.font = pieceFontSize + 'pt Georgia';
  var offset = context.measureText(piece.type).width;
  context.fillText(piece.type, -offset/2, pieceFontSize/2);
  context.restore();
}

function drawPieces() {
  pieces.forEach(function(piece){
    drawPiece(piece);
  });
}

function drawHighlight() {
  if (inputMan.down) {
    var x = inputMan.cCol*size + size/2;
    var y = inputMan.cRow*size + size/2;

    context.save();
    context.translate(x, y);
    context.strokeStyle = "#ff0";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(0, 0, size/2.5, 0, 2*Math.PI);
    context.stroke();
    context.restore();
  }
}

function drawHud() {
  var whiteTurn = document.getElementById('white-turn');
  var blackTurn = document.getElementById('black-turn');

  if (currentPlayer === 0) {
    whiteTurn.innerHTML = 'White to play';
    blackTurn.innerHTML = ' ';
  } else {
    whiteTurn.innerHTML = ' ';
    blackTurn.innerHTML = 'Black to play';
  }
}

function draw() {
  context.clearRect(0, 0, 8 * size, 8 * size);
  drawBoard();
  drawPieces();
  drawHighlight();
  drawHud();
}
