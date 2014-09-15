function validMove(destinationPiece){
  if (destinationPiece && destinationPiece.player == inputMan.piece.player){
    return false;
  }

  if (!pieceCanMove(destinationPiece)) {
    return false;
  }

  if (inputMan.piece.player !== currentPlayer) {
    return false;
  }

  return true;
}

function findPiece(row, col){
  for(var i=0; i<pieces.length; i++){
    if(pieces[i].row === row && pieces[i].col === col){
      return pieces[i];
    }
  }
}

function pieceCanMove(destinationPiece) {
  switch(inputMan.piece.type) {
  case 'P':
    return pawnCanMove(destinationPiece) && pawnPathFree();
  case 'B':
    return bishopCanMove() && bishopPathFree();
  case 'N':
    return knightCanMove() && knightPathFree();
  case 'R':
    return rookCanMove() && rookPathFree();
  case 'Q':
    return queenCanMove() && queenPathFree();
  case 'K':
    return kingCanMove() && kingPathFree();
  default:
    return true;
  }
}

function pawnCanMove(destinationPiece) {
  var piece = inputMan.piece;
  if (destinationPiece) {
    if (deltaRow() === (piece.player - 0.5) * 2
        && Math.abs(deltaCol()) === 1) {
      return true;
    }
  }
  else {
    if (piece.row === 6 - 5 * piece.player) {
      if ((deltaRow() === (piece.player - 0.5) * 2 || deltaRow() === (piece.player - 0.5) * 4)
          && deltaCol() === 0) {
        return true;
      }
    }
    else {
      if (deltaRow() === (piece.player - 0.5) * 2
          && deltaCol() === 0) {
        return true;
      }
    }
  }
  return false;
}

function bishopCanMove() {
  return Math.abs(deltaRow()) === Math.abs(deltaCol());
}

function knightCanMove() {
  return deltaRow()*deltaRow() + deltaCol()*deltaCol() === 5;
}

function rookCanMove() {
  return deltaRow() * deltaCol() === 0;
}

function queenCanMove() {
  return bishopCanMove() || rookCanMove();
}

function kingCanMove() {
  return queenCanMove() && deltaRow()*deltaRow() + deltaCol()*deltaCol() <= 2;
}

function deltaRow() {
  return (inputMan.uRow - inputMan.dRow);
}

function deltaCol() {
  return (inputMan.uCol - inputMan.dCol);
}

function pawnPathFree(destinationPiece) {
  var rowInFront = inputMan.piece.row + (inputMan.piece.player - 0.5) * 2;
  var pieceInFront = findPiece(rowInFront, inputMan.piece.col);
  return !(Math.abs(deltaRow()) === 2 && pieceInFront);
}

function bishopPathFree() {
  var rowDir = deltaRow() > 0 ? 1 : -1;
  var colDir = deltaCol() > 0 ? 1 : -1;
  var row = inputMan.dRow + rowDir;
  var col = inputMan.dCol + colDir;
  while (inputMan.uRow - row * rowDir > 0) {
    if (findPiece(row, col)) {
      return false;
    }
    row += rowDir;
    col += colDir;
  }
  return true;
}

function knightPathFree() {
  return true;
}

function rookPathFree() {
  return true;
}

function queenPathFree() {
  return true;
}

function kingPathFree() {
  return true;
}
