const canvas = document.getElementById('board');
// @ts-ignore
const ctx = canvas.getContext('2d');

ctx.canvas.width = BOARD_WIDTH * CELL_SIZE;
ctx.canvas.height = BOARD_WIDTH * CELL_SIZE;

ctx.scale(CELL_SIZE, CELL_SIZE);

// first, setup the board
TetrisLib.setup(ctx);

const onStart = () => {
    TetrisLib.start();
}
