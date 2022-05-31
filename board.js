class Board {
  constructor(ctx) {
    this.ctx = ctx;

    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;

    this.board = null;

    this.init();
  }

  init() {
    this.board = [];
    for (var y = 0; y < this.height; y++) {
      this.board[y] = [];
      for (var x = 0; x < this.width; x++) this.board[y][x] = 0;
    }
  }

  draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = 'gray';
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  mergeTShape(tshape) {
    tshape.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) this.board[y + tshape.y][x + tshape.x] = 1;
      });
    });

    // check if lines should be cleaned
    this.clearLines();
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(10).fill(0));
      }
    });
  }
}
