function drawBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      context.fillStyle = (row + col) % 2 === 0 ? '#ffedc7' : 'sienna';
      context.fillRect(col * size, row * size, size, size);
    }
  }
}

function drawPiece(piece){
  var x = piece.col*size + size/2;
  var y = piece.row*size + size/2;

  context.save();
  context.translate(x, y);
  context.drawImage(sprite, spriteOffsets['x'][piece.type], spriteOffsets['y'][piece.player], spriteSize, spriteSize, -spriteSize/2, -spriteSize/2, spriteSize, spriteSize);
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
