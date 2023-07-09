const canvasG = document.getElementById("game");
const cG = canvasG.getContext("2d");
const CANVAS_WIDTH_G = canvasG.width = 600;
const CANVAS_HEIGHT_G = canvasG.height = 600;

let blockSize = 20;
let rows = 30;
let cols = 30;

let snakeX = blockSize * 15;
let snakeY = blockSize * 15;
let sdx = 0;
let sdy = 0;
let ax = Math.floor(Math.random() * cols) * blockSize;
let ay = Math.floor(Math.random() * rows) * blockSize;
let score = 0;

let snakeBody = [];

let gameOver = false;

cG.beginPath();
cG.arc(300, 300, 50, 0, Math.PI * 2, false);
cG.fillStyle = "lightgreen";
cG.fill();

cG.font = "35px serif";
cG.fillStyle = "white";
cG.fillText("Play!", 260, 310);

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (x >= 250 && x <= 350 && y >= 250 && y <= 350) {
        play();
    }
}

canvasG.addEventListener("mousedown", function (e) {
    getMousePosition(canvasG, e);
});

function changeDirection(event) {
    if (event.key == "ArrowUp" && sdy != 1) {
        sdy = -1;
        sdx = 0;
    } else if (event.key == "ArrowDown" && sdy != -1) {
        sdy = 1;
        sdx = 0;
    } else if (event.key == "ArrowLeft" && sdx != 1) {
        sdy = 0;
        sdx = -1;
    } else if (event.key == "ArrowRight" && sdx != -1) {
        sdy = 0;
        sdx = 1;
    }
    event.preventDefault();
}

function play() {
    document.addEventListener("keydown", changeDirection);
    setInterval(animateG, 1000 / 10);
}

function animateG() {
    if(!gameOver){
        cG.clearRect(0, 0, CANVAS_WIDTH_G, CANVAS_HEIGHT_G);
        cG.fillStyle = "red";
        cG.fillRect(ax, ay, blockSize, blockSize);

        if (snakeX == ax && snakeY == ay) {
            score += 1;
            snakeBody.push([ax, ay]);
            ax = Math.floor(Math.random() * cols) * blockSize;
            ay = Math.floor(Math.random() * rows) * blockSize;
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        if(snakeBody.length){
            snakeBody[0] = [snakeX, snakeY];
        }

        snakeX += sdx * blockSize;
        snakeY += sdy * blockSize;
        cG.fillStyle = "green";
        cG.fillRect(snakeX, snakeY, blockSize, blockSize);
        for (let i = 0; i < snakeBody.length; i++) {
            cG.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }

        if (snakeX >= cols * blockSize || snakeX < 0 || snakeY >= rows * blockSize || snakeY < 0) {
            cG.clearRect(0, 0, CANVAS_WIDTH_G, CANVAS_HEIGHT_G);
            cG.font = "35px serif";
            cG.fillStyle = "white";
            cG.fillText("Game Over!", 230, 310);
            cG.font = "35px serif";
            cG.fillStyle = "white";
            let string = "Score: " + parseInt(score);
            cG.fillText(string, 230, 340);
            gameOver = true;
            return;
        }
        for(let i= 0;i < snakeBody.length; i++){
            if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
                cG.clearRect(0, 0, CANVAS_WIDTH_G, CANVAS_HEIGHT_G);
                cG.font = "35px serif";
                cG.fillStyle = "white";
                cG.fillText("Game Over!", 230, 310);
                cG.font = "35px serif";
                cG.fillStyle = "white";
                let string = "Score: " + parseInt(score);
                cG.fillText(string, 230, 340);
                gameOver = true;
                return;
            }
        }
    }
}

