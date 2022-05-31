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

  isInsideBoard(x,y) {
    return x >= 0 && x < this.board.width && y <= this.board.height
  },

  isMoveValid(tsCopy) {
    return tsCopy.shape.every((row, dy) => {
        return row.every((value, dx) => {
            const x = tsCopy.x + dx;
            const y = tsCopy.y + dy;
            return this.isInsideBoard(tsCopy.x + dx, tsCopy.y + dy); 
        })
    })
},

  moveTShape(key) {

    const tsCopy = JSON.parse(JSON.stringify(this.tshape));

    // transform the copy
    switch (key) {
      case 'left': {
        tsCopy.x -= 1; break;
      }
      case 'right': { tsCopy.x += 1; break;}
      case 'down': { tsCopy.y += 1; break;}
    }

    // check if tshape transformed is valid
    if (!this.isMoveValid(tsCopy)) return this.tshape;

    return tsCopy;
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

    const tshapeMoved = this.moveTShape(key);

    this.tshape.x = tshapeMoved.x;
    this.tshape.y = tshapeMoved.y;

    this.refreshBoard();
    if (key && this.onKeydownListener)
      this.onKeydownListener(key);
  }
};

