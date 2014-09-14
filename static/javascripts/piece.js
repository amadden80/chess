function validMove(destinationPiece){
  if (destinationPiece && destinationPiece.player == inputMan.piece.player){
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
      console.log(pieces[i])
      return pieces[i]
    }
  }
}
