class Board {
  constructor(ctx) {
    this.ctx = ctx;

    this.width = 10;
    this.height = 10;

    this.init();
  }

  init() {
    this.board = [];
    for (var y = 0; y < this.height; y++) {
      this.board[y] = [];
      for (var x = 0; x < this.width; x++)
        this.board[y][x] = 0;
    }
  }

  draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    this.board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) this.ctx.fillRect(x, y, 1, 1);
        });
    });
  }

  mergeTShape(tshape) {
    tshape.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) this.board[y + tshape.y][x + tshape.x] = value;
        })
    })
  }
}
