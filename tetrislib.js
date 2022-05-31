const TetrisLib = {
  ctx: null,
  board: null,
  tshape: null,
  timeStart: null,
  level: null,
  isGameRunning: false,

  setup(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.tshape = new TShape(ctx);

    this.level = LEVEL; // ms

    document.addEventListener("keydown", this.onKeydown.bind(this), false);
  },

  refreshBoard() {
    this.board.draw();
    this.tshape.draw();
  },

  transposeTShape(tshape) {
    return tshape[0].map((_, colIndex) => tshape.map((row) => row[colIndex]));
  },

  /*
   * Adds a listener for keydown events for the 4 arrow keys.
   * - listener: a function which gets called with the key that was pressed. The
   *   key will be one of "left", "up", "down", "right".
   */
  addKeydownListener: function (listener) {
    this.onKeydownListener = listener;
  },

  isInsideBoard(x, y) {
    return x >= 0 && x < this.board.width && y <= this.board.height;
  },

  isMoveValid(tsCopy) {
    return tsCopy.shape.every((row, dy) => {
      return row.every((value, dx) => {
        const x = tsCopy.x + dx;
        const y = tsCopy.y + dy;
        if (!value) return true;
        return this.isInsideBoard(tsCopy.x + dx, tsCopy.y + dy);
      });
    });
  },

  rotate(tscopy) {
    const tsCopyTransposed = this.transposeTShape(tscopy);
    tsCopyTransposed.forEach((row) => row.reverse());
    return tsCopyTransposed;
  },

  moveDown() {
    this.tshape.y += 1;
    if (this.isReachedBottom() || this.isReachedMerged()) {
      this.board.mergeTShape(this.tshape);
      this.tshape = new TShape(this.ctx);
    }
  },

  moveTShape(key) {
    const tsCopy = JSON.parse(JSON.stringify(this.tshape));

    // transform the copy
    switch (key) {
      case "left": {
        tsCopy.x -= 1;
        break;
      }
      case "right": {
        tsCopy.x += 1;
        break;
      }
      case "down": {
        tsCopy.y += 1;
        break;
      }
      case "up": {
        tsCopy.shape = this.rotate(tsCopy.shape);
      }
    }

    // check if tshape transformed is valid
    if (!this.isMoveValid(tsCopy)) return this.tshape;

    return tsCopy;
  },

  isReachedBottom() {
    for (let jr = 0; jr < this.tshape.shape.length; ++jr) {
      const row = this.tshape.shape[jr];
      for (let jc = 0; jc < row.length; ++jc) {
        const value = this.tshape.shape[jr][jc];
        if (value && this.tshape.y + jr === this.board.height - 1) return true;
      }
    }

    return false;
  },

  isReachedMerged() {
    const x = this.tshape.x;
    const y = this.tshape.y;
    for (let jr = 0; jr < this.tshape.shape.length; ++jr) {
      const row = this.tshape.shape[jr];
      for (let jc = 0; jc < row.length; ++jc) {
        const value = this.tshape.shape[jr][jc];
        if (!value) continue;
        if (
          this.board.board[y + jr + 1] &&
          this.board.board[y + jr + 1][jc + x]
        ) {
          return true;
        }
      }
    }

    return false;
  },

  run(timeNow = 0) {
    const timeElapsed = timeNow - this.timeStart;

    if (timeElapsed > this.level) {
      this.timeStart = timeNow;
      this.moveDown();
    }

    this.refreshBoard();

    this.requestId = requestAnimationFrame(this.run.bind(this));
  },

  start() {
    this.isGameRunning = true;

    this.board.init();
    this.tshape.init();

    this.refreshBoard();

    this.timeStart = performance.now();
    requestAnimationFrame(this.run.bind(this));
  },

  gameOver() {
    cancelAnimationFrame(this.requestId);
    this.isGameRunning = false;
    this.tshape.color = "red";
    this.refreshBoard();
  },

  onKeydown(event) {
    if (!this.isGameRunning) return;

    event.preventDefault();

    var keycodeToKey = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };
    var key = keycodeToKey[event.which];

    const tshapeMoved = this.moveTShape(key);
    this.tshape.x = tshapeMoved.x;
    this.tshape.y = tshapeMoved.y;
    this.tshape.shape = tshapeMoved.shape;

    // check if reached the bottom
    if (this.isReachedBottom() || this.isReachedMerged()) {
      this.board.mergeTShape(this.tshape);
      this.tshape = new TShape(this.ctx);
      // check if game over
      if (this.isReachedMerged()) this.gameOver();
    }

    this.refreshBoard();

    if (key && this.onKeydownListener) this.onKeydownListener(key);
  },
};
