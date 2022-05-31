TetrisLib.setup();

// This example code draws a T-shaped piece.
var row = 1;
TetrisLib.board[row][5] = 1;
TetrisLib.board[row][6] = 1;
TetrisLib.board[row][7] = 1;
TetrisLib.board[row+1][6] = 1;

TetrisLib.drawBoard();

// This example code responds to keyboard input.
// The argument "key" will be one of "left", "up", "right", "down".
TetrisLib.addKeydownListener(function(key) {
  console.log("Key has been pressed: ", key);
});

