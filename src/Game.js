import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000 / 60);

const brickHeight = 22;
const brickWidth = 50;
let bricks = [];
const bricksIntersections = (ball,vol) => {
    for(let i =0; i < bricks.length;i++){
        let brX1 = bricks[i][0];
        let brX2 = brickWidth + brX1;
        let brY1 = bricks[i][1];
        let brY2 = brY1 + brickHeight;
        if(brX1 <= ball[0] && ball[0] <= brX2){
                if( (brY1 - 3 < ball[1] && ball[1] < brY1 + 3) ||
                    (brY2 - 3 < ball[1] && ball[1] < brY2 + 3)){
                    vol[1] = -vol[1];
                    document.querySelectorAll(".Game__brick")[i].remove();
                    bricks.splice(i,1);
                    return vol;
                }
            }
            if(brY1 <= ball[1] && ball[1] <= brY2){
                if( (brX1 - 3 < ball[0] && ball[0] < brX1 + 3) ||
                    (brX2 - 3 < ball[0] && ball[0] < brX2 + 3)){
                    vol[0] = -vol[0];
                    console.log(bricks[i],i);
                    document.querySelectorAll(".Game__brick")[i].remove();
                    bricks.splice(i,1);
                    return vol;
                }
            }
    }
    return vol;
};


const Ball = (ball, x, y) => {
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
            x)
        .observe((a) => {
            x = a;
            ball.setAttribute("cx", a);

        });
    const Ycoordinate = animation
        .scan((nextY) => {
                if (nextY >= height) {
                    const pl = document.querySelector(".Game__platform");
                    const plX1 = parseInt(pl.getAttribute("x"));
                    const plX2 = parseInt(pl.getAttribute("width")) + plX1;

                    if(plX1 <= x && x <= plX2 ){
                        vy = -vy;
                    }else{
                        vx=0;
                        vy=0;
                    }
                }
                    let vol =bricksIntersections([x,nextY],[vx,vy]);
                    vx = vol[0];
                    vy = vol[1];
                if (nextY < 0) {
                    vy = -vy;
                }
                return nextY + vy;
            },
            y).observe((a) => {
            ball.setAttribute("cy", a);

        });
};

const Platform = (platform, x, y) => {
    platform.setAttribute("x", x);
    platform.setAttribute("y", y);
    let X = x;
    const keyDown = most.fromEvent('keydown', document);
    keyDown
        .observe(action => {
            if (action.key === 'ArrowRight' && X < (width-platform.getAttribute("width"))) {
                X += 20;
            }
            else if (action.key === 'ArrowLeft' && X >0) {
                X -= 20;
            }
            platform.setAttribute("x", X);

        });
};

const Bricks = () =>{
    let svg = document.querySelector(".Game");
    let svgNS = svg.namespaceURI;
    let coordinates = [];
    const columns = 11;
    const rows = 5;
    for(let c =0; c < rows; c++) {
        for (let i = 0; i < columns; i++) {
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('class', 'Game__brick');
            rect.setAttribute('x', (brickWidth + 5) * i);
            rect.setAttribute('y', (brickHeight + 5) * c);
            rect.setAttribute('width', brickWidth);
            rect.setAttribute('height', brickHeight);
            rect.setAttribute('id', c*rows+i);
            coordinates.push([(brickWidth + 5) * i,(brickHeight + 5) * c]);
            svg.appendChild(rect);
        }
    }
    bricks = coordinates;
    return coordinates;
};


class Game {
    constructor() {
        const bricks = Bricks();
        console.log(bricks);
        let pl = Platform(document.querySelector(".Game__platform"), 200, 400);
        Ball(document.querySelector('.Game__ball'), width / 2, height - 10);

    }
}

export default Game;
