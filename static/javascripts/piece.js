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
    return pawnCanMove(destinationPiece);
  case 'B':
    return bishopCanMove();
  case 'N':
    return knightCanMove();
  case 'R':
    return rookCanMove();
  case 'Q':
    return queenCanMove();
  case 'K':
    return kingCanMove();
  default:
    return true;
  }
}

function pawnCanMove(destinationPiece) {
  var piece = inputMan.piece;
  if (destinationPiece) {
    if (deltaRow() === (0.5 - piece.player) * 2
        && Math.abs(deltaCol()) === 1) {
      return true;
    }
  }
  else {
    if (piece.row === 6 - 5 * piece.player) {
      if ((deltaRow() === (0.5 - piece.player) * 2 || deltaRow() === (0.5 - piece.player) * 4)
          && deltaCol() === 0) {
        return true;
      }
    }
    else {
      if (deltaRow() === (0.5 - piece.player) * 2
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
  return (inputMan.dRow - inputMan.uRow);
}

function deltaCol() {
  return (inputMan.dCol - inputMan.uCol);
}
