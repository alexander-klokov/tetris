const TetrisLib = {

  ctx: null,
  board: null,
  tshape: null,

  setup(ctx) {
    this.board = new Board(ctx);
    this.tshape = new TShape (ctx);

    document.addEventListener("keydown", this.onKeydown.bind(this), false);
  },

  refreshBoard() {
    this.board.draw();
    this.tshape.draw();
  },

  /*
   * Adds a listener for keydown events for the 4 arrow keys.
   * - listener: a function which gets called with the key that was pressed. The
   *   key will be one of "left", "up", "down", "right".
   */
  addKeydownListener: function(listener) { this.onKeydownListener = listener; },

  isInsideWalls(x,y) {
    return x >= 0 && x < this.boardWidth && y < this.boardHeight
  },

  isNotOccupied(x,y) {
    return this.grid[y] && this.grid[y][x] === 0;
  },

  valid() {
    return this.tshape.every((row, dy) => {
        return row.every((value, dx) => {
            const x = this.tshape.x + dx;
            const y = this.tshape.y + dy;
            return value === 0 || 
                (this.isInsideWalls(this.tshape.x + dx, this.tshape.y + dy) && this.isNotOccupied(x,y)); 
        })
    })
},

  onKeydown(event) {

    event.preventDefault();

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

