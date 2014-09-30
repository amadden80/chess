function mousedown(e){
  var y = e.offsetY;
  var x = e.offsetX;
  var col = Math.floor(x/size);
  var row = Math.floor(y/size);
  inputMan.dRow = row;
  inputMan.dCol = col;
  inputMan.cRow = row;
  inputMan.cCol = col;
  inputMan.down = true;
  inputMan.piece = findPiece(inputMan.dRow, inputMan.dCol);
}

function mousemove(e) {
  if (inputMan.down) {
    var y = e.offsetY;
    var x = e.offsetX;
    var col = Math.floor(x/size);
    var row = Math.floor(y/size);
    inputMan.cRow = row;
    inputMan.cCol = col;
    draw();
  }
}

function mouseup(e){
  var y = e.offsetY;
  var x = e.offsetX;
  var col = Math.floor(x/size);
  var row = Math.floor(y/size);
  inputMan.uRow = row;
  inputMan.uCol = col;
  inputMan.down = false;

  var destinationPiece = findPiece(inputMan.uRow, inputMan.uCol);
  var info = {
    toPiece: destinationPiece
  }
  if (inputMan.piece && validMove(info)){
    saveGame();

    if (destinationPiece){
      destinationPiece.row = -1;
      destinationPiece.col = -1;
    }
    inputMan.piece.row = inputMan.uRow;
    inputMan.piece.col = inputMan.uCol;

    currentPlayer = 1 - currentPlayer;

    sendData();
  }
  draw();
}
