// キャンバス
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 30;
let fps = 3;
let dx = fps;
let dy = -(fps);
// パドルバー
const paddleHieght = 10;
let paddleWidth = 200;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
// ブロック
const brickRowCount = 3; // 縦ライン 3
const brickColumnCount = 6; // 横ライン 6
const brickWidth = 75; // 75
const brickHeight = 20;
const brickPadding = 5;
const brickOffsetTop = 30;
const brickOffsetLeft = 2.5;
// プレイヤー
let score = 0;
let lives = 3;
let count = 1;
let level = 1;



let bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('touchmove', touchMoveHandler, false);

// マウス操作した時
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// タッチ操作した時（スマホ、タブレット）
function touchMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// キーを押した時の処理
function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    } else if(e.keyCode === 37) {
        leftPressed = true;
    }
}

// キーを離した時の処理
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    } else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

// ボールの衝突判定
function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 100;
                    
                    // クリアした時の処理（無限化）
                    if((score / 100)/ count === brickRowCount * brickColumnCount) {
                        count++;
                        // ブロックを再度生成
                        for(let c = 0; c < brickColumnCount; c++) {
                            for(let r = 0; r < brickRowCount; r++) {
                                bricks[c][r].status = 1
                            }
                        }
                        x = Math.floor(Math.random() * canvas.width); // スタート地点をランダム
                        y = canvas.height - 30;
                        dx = fps;
                        dy = -(fps);
                        // クリアするごとにバーを短く、速度をあげる
                        if(paddleWidth <= 100) {
                            paddleWidth = 100;
                        } else {
                            // paddleWidth -= 20;
                            paddleWidth -= 20;
                            fps++;
                            level++;
                            if(level === 6) {
                                level = 'MAX';
                            }
                        }
                    }

                }
            }
        }                    
    }
}



// ボールの生成
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// バドルの生成
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, 
             canvas.height - paddleHieght,
             paddleWidth,
             paddleHieght);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// ブロックの生成
function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095dd';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// スコアの表示
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095dd';
    ctx.fillText('Score: ' + score, 10, 20);
}

// レベルの表示
function drawLevel() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095dd';
    ctx.fillText('Level: ' + level, canvas.width - 300, 20);
}

// ライフの表示
function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095dd';
    ctx.fillText('♡: ' + lives, canvas.width - 70, 20);
} 



// キャンバスの中身
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLevel();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if(!lives) {
                alert('GAME OVER!!');
                alert('Your Score is ' + score);
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                level = 1;
                fps = 3;
                dx = fps;
                dy = -(fps);
                paddleWidth = 200;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

// キャンバスに表示
draw();