const TetrisLib = {
  boardWidth: 10,
  boardHeight: 10,
  // The board is represented as an array of arrays, with 10 rows and 10 columns.
  board: null,

  setup() {
    this.board = [];
    for (var y = 0; y < this.boardHeight; y++) {
      this.board[y] = [];
      for (var x = 0; x < this.boardWidth; x++)
        this.board[y][x] = 0;
    }

    document.addEventListener("keydown", this.onKeydown.bind(this), false);
  },

  drawBoard: function() { this.drawBoardUsingConsole(); },

  /*
   * This function is provided only for reference. Write your own function to
   * draw the board in the browser with a graphical UI.
   */
  drawBoardUsingConsole: function() {
    console.log("Draw the board in the browser, not here!");
    var output = "", x, y;
    for (x = 0; x < this.boardWidth + 2; x++)
      output += "-";
    output += "\n";

    for (y = 0; y < this.boardHeight; y++) {
      output += "|";
      for (x = 0; x < this.boardWidth; x++)
        output += (this.board[y][x] == 0 ? " " : "#");
      output += "|\n";
    }

    for (x = 0; x < this.boardWidth + 2; x++)
      output += "-";

    console.log(output);
  },

  /*
   * Adds a listener for keydown events for the 4 arrow keys.
   * - listener: a function which gets called with the key that was pressed. The
   *   key will be one of "left", "up", "down", "right".
   */
  addKeydownListener: function(listener) { this.onKeydownListener = listener; },

  onKeydown: function(event) {
    var keycodeToKey = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
    var key = keycodeToKey[event.which];
    if (key && this.onKeydownListener)
      this.onKeydownListener(key);
  }
};

