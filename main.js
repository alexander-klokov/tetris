const canvas = document.getElementById('board');
// @ts-ignore
const ctx = canvas.getContext('2d');

const BLOCK_SIZE = 30;

ctx.canvas.width = TetrisLib.boardWidth * BLOCK_SIZE;
ctx.canvas.height = TetrisLib.boardHeight * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// first, setup the board
TetrisLib.setup(ctx);

const onStart = () => {
    console.log('on start')

    TetrisLib.drawBoard();
    TetrisLib.tshape.draw();
}
