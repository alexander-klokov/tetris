const getElementId = () => Math.floor(Math.random()*TSHAPES.length);

class TShape {
    constructor(ctx) {
        this.ctx = ctx;

        const elementId = getElementId();

        this.color = COLORS[elementId];
        this.shape = TSHAPES[elementId];

        this.x = BOARD_WIDTH / 2;
        this.y = 0;
    }

    init() {
        this.color = 'blue';
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
            });
        });
    };
};