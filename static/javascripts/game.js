window.onload = init;

function init() {
  document.getElementById('undo-button').addEventListener('click', undo);
  document.getElementById('reset-button').addEventListener('click', resetGame)

  canvas = document.getElementById('board');
  context = canvas.getContext('2d');
  console.log(context);
  pieces = defaultBoard();
  draw();

  socket = io.connect('/');
  socket.on('moveMade', function(data){
    pieces = data.pieces;
    currentPlayer = data.currentPlayer;
    draw();
  })

  canvas.addEventListener('mousedown', mousedown);
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseup', mouseup);
}

function defaultBoard(){
  return [
    {row: 0, col: 0, player: 1, type: 'R'},
    {row: 0, col: 1, player: 1, type: 'N'},
    {row: 0, col: 2, player: 1, type: 'B'},
    {row: 0, col: 3, player: 1, type: 'Q'},
    {row: 0, col: 4, player: 1, type: 'K'},
    {row: 0, col: 5, player: 1, type: 'B'},
    {row: 0, col: 6, player: 1, type: 'N'},
    {row: 0, col: 7, player: 1, type: 'R'},
    {row: 1, col: 0, player: 1, type: 'P'},
    {row: 1, col: 1, player: 1, type: 'P'},
    {row: 1, col: 2, player: 1, type: 'P'},
    {row: 1, col: 3, player: 1, type: 'P'},
    {row: 1, col: 4, player: 1, type: 'P'},
    {row: 1, col: 5, player: 1, type: 'P'},
    {row: 1, col: 6, player: 1, type: 'P'},
    {row: 1, col: 7, player: 1, type: 'P'},
    {row: 7, col: 0, player: 0, type: 'R'},
    {row: 7, col: 1, player: 0, type: 'N'},
    {row: 7, col: 2, player: 0, type: 'B'},
    {row: 7, col: 3, player: 0, type: 'Q'},
    {row: 7, col: 4, player: 0, type: 'K'},
    {row: 7, col: 5, player: 0, type: 'B'},
    {row: 7, col: 6, player: 0, type: 'N'},
    {row: 7, col: 7, player: 0, type: 'R'},
    {row: 6, col: 0, player: 0, type: 'P'},
    {row: 6, col: 1, player: 0, type: 'P'},
    {row: 6, col: 2, player: 0, type: 'P'},
    {row: 6, col: 3, player: 0, type: 'P'},
    {row: 6, col: 4, player: 0, type: 'P'},
    {row: 6, col: 5, player: 0, type: 'P'},
    {row: 6, col: 6, player: 0, type: 'P'},
    {row: 6, col: 7, player: 0, type: 'P'},
  ]
}

function resetGame(){
  pieces = defaultBoard();
  currentPlayer = 0;
  sendData()
  draw()
}

function sendData(){
  socket.emit('makeMove', {pieces: pieces, currentPlayer: currentPlayer});
}

function saveGame(){
  gameStates.push(cloneGame());
}

function undo(){
  if (gameStates.length>0){
    pieces = gameStates.pop();
    currentPlayer = 1 - currentPlayer;
    sendData();
  }
  draw();
}

function cloneGame(){
  var newPieces = [];
  for(var i=0; i<pieces.length; i++){
    var piece = {};
    piece.row = pieces[i].row;
    piece.col = pieces[i].col;
    piece.player = pieces[i].player;
    piece.type = pieces[i].type;
    newPieces.push(piece);
  }
  return newPieces;
}
