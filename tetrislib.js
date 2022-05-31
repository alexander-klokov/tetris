const TetrisLib = {

  ctx: null,

  boardWidth: 10,
  boardHeight: 10,

  // The board is represented as an array of arrays, with 10 rows and 10 columns.
  board: null,
  tshape: null,


  setup(ctx) {
    this.board = [];
    this.ctx = [];
    for (var y = 0; y < this.boardHeight; y++) {
      this.board[y] = [];
      for (var x = 0; x < this.boardWidth; x++)
        this.board[y][x] = 0;
    }

    // init t-shape
    this.tshape = new TShape (ctx);

    document.addEventListener("keydown", this.onKeydown.bind(this), false);
  },

  drawBoard() {
    console.log('draw board')
    const { width, height } = ctx.canvas;
    ctx.clearRect (0, 0, width, height);

    this.tshape.draw();
  },

  /*
   * Adds a listener for keydown events for the 4 arrow keys.
   * - listener: a function which gets called with the key that was pressed. The
   *   key will be one of "left", "up", "down", "right".
   */
  addKeydownListener: function(listener) { this.onKeydownListener = listener; },

  refreshBoard() {
    this.drawBoard();
    this.tshape.draw();
  },

  onKeydown(event) {
    var keycodeToKey = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
    var key = keycodeToKey[event.which];

    switch (key) {
      case 'left': {
        this.tshape.x -= 1; break;
      }
      case 'right': {
        this.tshape.x += 1;
        break;
      }
    }

    this.refreshBoard();
    if (key && this.onKeydownListener)
      this.onKeydownListener(key);
  }
};

