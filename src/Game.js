import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000/20);
// const keyPr = most.fromEvent('click', document).observe(e=> console.log(e));


const Ball = (ball, x, y = 5) => {
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    animation
        .scan((nextY, vy = 4) =>
                (nextY >= height) ?
                    nextY - vy :
                    -nextY,
            0)
        .observe(a => {
            console.log(a);
            ball.setAttribute("cy", a);

        })
};


class Game {
    constructor() {
        // Ball(document.querySelectorAll('.Game__ball')[0], width / 3 - 100);
        Ball(document.querySelectorAll('.Game__ball')[1], 2 * width / 3 - 100);
        // Ball(document.querySelectorAll('.Game__ball')[2], width - 100);
    }
}

export default Game;