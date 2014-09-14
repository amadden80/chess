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
