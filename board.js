class Board {
  constructor(ctx) {
    this.ctx = ctx;

    this.width = 10;
    this.height = 10;
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
  }
}
