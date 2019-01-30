    const field = document.getElementById('field');
    const startBtn = document.getElementById('startBtn');
    const heading = document.getElementById('heading');
    const timer = document.getElementById('timer');
    const mark = ["♠︎", "♥", "♦", "♣︎"]
    let trump = [];
    let num = 0;
    let isStarted = false;
    let gameTime; // ゲームの進行時間
    let turnTimer; // カードがめくれている時間
    let cardFlag = 1; // 1: １枚目 2: ２枚目
    let firstCard; // １枚目のカード
    let count = 0; // 揃えたセット数


    // フィールドの初期化
    const init = () => {
        field.className = 'hide';
        timer.className = 'hide';
    }
    
    // 配列trumpを作成
    for (let i = 0; i < mark.length; i++) {
       for (let j = 1; j <= 13; j++) {
           trump.push([mark[i],j]);
       }
    }

    // 配列trumpをシャッフル（Fisher–Yatesアルゴリズム）
    for (let x = trump.length - 1; x > 0; x--) {
        let y = Math.floor(Math.random()*(x + 1));
        let temp = trump[x];
        trump[x] = trump[y];
        trump[y] = temp;
    }

    // 配列からdiv要素を作成（１枚のカードを作成）
    makeCard = () => {
        const div = document.createElement('div');
        div.className = 'card back';
        div.index = num;
        div.number = trump[num][1];
        div.onclick = turnOver;
        field.appendChild(div);
        num++;
    }

    // トランプを配る動き
    const gameStart = () => {
        const deal = setInterval(() => {
            makeCard();            
            if (num === trump.length) {
                clearInterval(deal);
                isStarted = true;
                num = 0;
                startTimer();
            }
        }, 30);           
    }

    // ゲームタイム
    const startTimer = () => {
        gameTime = setInterval(() => {
        num++;
        timer.textContent = num;
    }, 1000)
    }

    // スタートボタン
    startBtn.addEventListener('click', () => {
        heading.className = 'hide';
        field.className = 'show';
        timer.className = 'show';
        gameStart();
    })

    // クリックした時
    const turnOver = e => {
        if (!isStarted || turnTimer) { return; } 
        const esta = e.target;
        esta.className = 'card';
        if (esta.innerHTML === '') {
            if (trump[esta.index][0] === "♥" || trump[esta.index][0] === "♦") {
                esta.innerHTML = '<span style=color:#ff0000;>' + trump[esta.index][0] + '</span>' + '\n' + esta.number;
            } else {
                esta.innerHTML = '<span>' + trump[esta.index][0] + '</span>' + '\n' + esta.number;
            }
        } else { return; }
        
        // １枚目と２枚目の分岐処理
        switch (cardFlag) {
            case 1:
                firstCard = esta; // 1枚目のカード
                cardFlag = 2;
                break;
            case 2:
                if (firstCard.number === esta.number) { // ナンバーが同じ
                    turnTimer = setTimeout(()=>{
                        firstCard.className = 'card done';
                        esta.className = 'card done';
                        count++;
                        turnTimer = '';
                        if (count === 26) { // ゲーム終了時
                            clearInterval(gameTime);
                            timer.className = 'hide';
                            field.innerHTML = `GAME CLEAR!!<br><span>Record Time： ${num}秒</span>`;
                            field.className = 'result';
                        }
                    }, 500)
                } else {
                    turnTimer = setTimeout(() => { // ナンバーが違う
                        firstCard.className = 'card back';
                        firstCard.innerHTML = '';
                        esta.className = 'card back';
                        esta.innerHTML = '';
                        turnTimer = '';
                    }, 500)
                }
                cardFlag = 1;
                break;
        }
    }