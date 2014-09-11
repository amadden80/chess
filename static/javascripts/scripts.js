console.log('Your Turn');

var socket;
var canvas;
var context;
var pieces;
var gameStates=[];
var size = 80;
var fontSize = Math.floor(size/2);
var players = [
  {
    color: '#fff',
    textColor: '#000',
    name: 'Hari'
  },
  {
    color: '#000',
    textColor: '#fff',
    name: 'Andy'
  }
]

var currentPlayer = 0;

var inputMan = {
  down: false,
  dRow: -1,
  dCol: -1,
  uRow: -1,
  uRow: -1,
  cRow: -1,
  cCol: -1
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



window.onload = init;

function init() {
  document.getElementById('undo-button').addEventListener('click', undo);
  document.getElementById('reset-button').addEventListener('click', function(){
    pieces = defaultBoard();
    sendData()
    draw()
  });

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
  if (validMove(destinationPiece)){
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

function sendData(){
  socket.emit('makeMove', {pieces: pieces, currentPlayer: currentPlayer});
}

function validMove(destinationPiece){
  if (destinationPiece && destinationPiece.player == inputMan.piece.player){
    return false;
  }

  if (inputMan.piece.player !== currentPlayer) {
    return false;
  }

  return true;
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

function findPiece(row, col){
  for(var i=0; i<pieces.length; i++){
    if(pieces[i].row === row && pieces[i].col === col){
      console.log(pieces[i])
      return pieces[i]
    }
  }
}

function drawBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      context.fillStyle = (row + col) % 2 === 0 ? '#ffedc7' : '#333';
      context.fillRect(col * size, row * size, size, size);
    }
  }
}

function drawPiece(piece){
  var x = piece.col*size+size/2;
  var y = piece.row*size+size/2;
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

  context.fillStyle = players[piece.player].color;
  context.strokeStyle = players[1 - piece.player].color;

  context.beginPath();

  context.arc(x, y, radius, 0, 2*Math.PI);
  context.fill();
  context.stroke();

  context.fillStyle = players[piece.player].textColor;
  context.font = pieceFontSize + 'pt Georgia';
  var offset = context.measureText(piece.type).width;
  context.fillText(piece.type, x - offset/2, y + pieceFontSize/2);

  context.restore();
}

function drawPieces() {
  pieces.forEach(function(piece){
    drawPiece(piece);
  });
}

function drawHighlight() {
  if (inputMan.down) {
    var x = inputMan.cCol*size+size/2;
    var y = inputMan.cRow*size+size/2;

    context.save();
    context.strokeStyle = "#ff0";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(x, y, size/2.5, 0, 2*Math.PI);
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
