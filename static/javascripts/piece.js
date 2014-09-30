function validMove(info){
  // Can't take own piece
  if (info.toPiece && info.toPiece.player == inputMan.piece.player){
    return false;
  }

  // Invalid move
  if (!pieceCanMove(info)) {
    return false;
  }

  // Not your turn
  if (inputMan.piece.player !== currentPlayer) {
    return false;
  }

  // Cannot end your turn in check
  if (inCheck(currentPlayer)) {
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

function findKing(player) {
  for (var i=0; i<pieces.length; i++){
    if(pieces[i].type === 'K' && pieces[i].player === player) {
      return pieces[i];
    }
  }
}

function pieceCanMove(info) {
  switch((info.piece || inputMan.piece).type) {
  case 'P':
    return pawnCanMove(info) && pawnPathFree(info);
  case 'B':
    return bishopCanMove(info) && bishopPathFree(info);
  case 'N':
    return knightCanMove(info) && knightPathFree(info);
  case 'R':
    return rookCanMove(info) && rookPathFree(info);
  case 'Q':
    return queenCanMove(info) && queenPathFree(info);
  case 'K':
    return kingCanMove(info) && kingPathFree(info);
  default:
    return true;
  }
}

function pawnCanMove(info) {
  var piece = info.piece || inputMan.piece;
  if (info.toPiece) {
    if (deltaRow(info) === (piece.player - 0.5) * 2
        && Math.abs(deltaCol(info)) === 1) {
      return true;
    }
  }
  else {
    if (piece.row === 6 - 5 * piece.player) {
      if ((deltaRow(info) === (piece.player - 0.5) * 2 || deltaRow(info) === (piece.player - 0.5) * 4)
          && deltaCol(info) === 0) {
        return true;
      }
    }
    else {
      if (deltaRow(info) === (piece.player - 0.5) * 2
          && deltaCol(info) === 0) {
        return true;
      }
    }
  }
  return false;
}

function bishopCanMove(info) {
  return Math.abs(deltaRow(info)) === Math.abs(deltaCol(info));
}

function knightCanMove(info) {
  return deltaRow(info)*deltaRow(info) + deltaCol(info)*deltaCol(info) === 5;
}

function rookCanMove(info) {
  return deltaRow(info) * deltaCol(info) === 0;
}

function queenCanMove(info) {
  return bishopCanMove(info) || rookCanMove(info);
}

function kingCanMove(info) {
  return queenCanMove(info) && deltaRow(info)*deltaRow(info) + deltaCol(info)*deltaCol(info) <= 2;
}

function deltaRow(info) {
  var toRow = info.toRow === undefined ? inputMan.uRow : info.toRow;
  var fromRow = info.fromRow === undefined ? inputMan.dRow : info.fromRow;
  return (toRow - fromRow);
}

function deltaCol(info) {
  var toCol = info.toCol === undefined ? inputMan.uCol : info.toCol;
  var fromCol = info.fromCol === undefined ? inputMan.dCol : info.fromCol;
  return (toCol - fromCol);
}

function pawnPathFree(info) {
  var piece = info.piece || inputMan.piece;
  var rowInFront = piece.row + (piece.player - 0.5) * 2;
  var pieceInFront = findPiece(rowInFront, piece.col);
  return !(Math.abs(deltaRow(info)) === 2 && pieceInFront);
}

function bishopPathFree(info) {
  var rowDir = deltaRow(info) > 0 ? 1 : -1;
  var colDir = deltaCol(info) > 0 ? 1 : -1;
  var row = (info.fromRow === undefined ? inputMan.dRow : info.fromRow) + rowDir;
  var col = (info.fromCol === undefined ? inputMan.dCol : info.fromCol) + colDir;
  var toRow = info.toRow === undefined ? inputMan.uRow : info.toRow;
  while ((toRow - row) * rowDir > 0) {
    if (findPiece(row, col)) {
      return false;
    }
    row += rowDir;
    col += colDir;
  }
  return true;
}

function knightPathFree(info) {
  return true;
}

function rookPathFree(info) {

  var rowDir = deltaRow(info) === 0 ? 0 : (deltaRow(info) > 0 ? 1 : -1);
  var colDir = deltaCol(info) === 0 ? 0 : (deltaCol(info) > 0 ? 1 : -1);
  var row = (info.fromRow === undefined ? inputMan.dRow : info.fromRow) + rowDir;
  var col = (info.fromCol === undefined ? inputMan.dCol : info.fromCol) + colDir;
  var toRow = info.toRow === undefined ? inputMan.uRow : info.toRow;
  var toCol = info.toCol === undefined ? inputMan.uCol : info.toCol;
  while ((toRow - row) * rowDir >= 0
      && (toCol - col) * colDir >= 0
      && !(row === toRow && col === toCol)) {
    if (findPiece(row, col)) {
      return false;
    }
    row += rowDir;
    col += colDir;
  }
  return true;
}

function queenPathFree(info) {
  return rookCanMove(info) ? rookPathFree(info) : bishopPathFree(info);
}

function kingPathFree(info) {
  return true;
}

function inCheck(player) {
  var king = findKing(player);
  if (king === inputMan.piece) {
    var toRow = inputMan.uRow;
    var toCol = inputMan.uCol;
  }
  else {
    var toRow = king.row;
    var toCol = king.col;
  }
  var info = {
    toPiece: king,
    toRow: toRow,
    toCol: toCol
  }

  for(var i=0; i<pieces.length; i++){
    if (pieces[i].player !== player) {
      info.piece = pieces[i];
      info.fromRow = pieces[i].row;
      info.fromCol = pieces[i].col;
      if (pieceCanMove(info)) {
        console.log(info);
        return true;
      }
    }
  }
  return false;
}
