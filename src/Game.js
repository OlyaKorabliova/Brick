import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000 / 60);
// const keyPr = most.fromEvent('keydown', document).filter(el => el.key === 'ArrowLeft').observe(e=> console.log(e));


const Ball = (ball, x, y = 5) => {
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    let vy = 3;
    let vx = 3;
    const Xcoordinate = animation
        .scan((nextX) => {
                if (nextX >= width || nextX < 0) {
                    vx = -vx;
                }
                return nextX + vx;
            },
            0)
        .observe((a) => {
            x = a;
            ball.setAttribute("cx", a);

        })
    const Ycoordinate = animation
        .scan((nextY) => {
                if (nextY >= height) {
                    const pl = document.querySelector(".Game__platform");
                    const plX1 = parseInt(pl.getAttribute("x"));
                    const plX2 = parseInt(pl.getAttribute("width")) + plX1;
                    if(plX1 <= x && x <= plX2){
                        vy = -vy;
                    }else{
                        return nextY;
                    }

                }
                if (nextY < 0) {
                    vy = -vy;
                }
                return nextY + vy;
            },
            0).observe((a) => {
            ball.setAttribute("cy", a);

        });
    // Ycoordinate.merge(Xcoordinate).subscribe()
};

const Platform = (platform, x, y) => {
    platform.setAttribute("x", x);
    platform.setAttribute("y", y);
    let X = x;
    // const keyleft = most.fromEvent("keydown", document)
    //     .filter(el => el.key === 'ArrowLeft');
    // .scan((nextX) => nextX - 10, X);
    // .observe(e => {
    //         console.log(e);
    //         X = e;
    //         platform.setAttribute("x", e);
    //     }
    // );
    const keyDown = most.fromEvent('keydown', document);
    const keyUp = most.fromEvent('keyup', document);
    // const keyright = most.fromEvent("keydown", document)
    //     .filter(el => el.key === 'ArrowRight');
    // .scan((nextX) => nextX + 10, X);
    //     // .observe(e => {
    //         console.log(e);
    //         X = e;
    //         platform.setAttribute("x", e);
    //     }
    // );
    keyDown
    // .tap(e=> console.log(e))
    // .chain(action => {
    //         if (action.key === 'ArrowRight') {
    //             return keyright
    //         }
    //         else if (action.key === 'ArrowLeft') {
    //             return keyleft;
    //         }
    //     }
    // )
        .observe(action => {
            if (action.key === 'ArrowRight' && X< (width-platform.getAttribute("width"))) {
                X += 10;
            }
            else if (action.key === 'ArrowLeft' && X >0) {
                X -= 10;
            }
            platform.setAttribute("x", X);

        });
};


class Game {
    constructor() {
        // Ball(document.querySelectorAll('.Game__ball')[0], width / 3 - 100);
        let pl = Platform(document.querySelector(".Game__platform"), 200, 400);
        Ball(document.querySelectorAll('.Game__ball')[1], 2 * width / 3 - 100);
        // Ball(document.querySelectorAll('.Game__ball')[2], width - 100);
    }
}

export default Game;