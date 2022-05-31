const canvas = document.getElementById('board');
// @ts-ignore
const ctx = canvas.getContext('2d');

const BLOCK_SIZE = 30;

ctx.canvas.width = 10 * BLOCK_SIZE;
ctx.canvas.height = 10 * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// first, setup the board
TetrisLib.setup(ctx);

const onStart = () => {
    TetrisLib.start();
}
