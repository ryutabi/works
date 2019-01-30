const com = document.getElementById('com');
const result = document.getElementById('result');
const start = document.getElementById('start');
const oneMore = document.getElementById('oneMore');
const message = document.getElementById('message');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const hands = ["✊", "✋", "✌️"];
let comHand;
let again;
let isStarted;

onload = () => {
    isStarted = false;
    again = false;
    oneMore.className = 'hide';
    result.className = 'hide';
}

resetFn = () => {
    start.className = 'hide';
    rock.classList.remove('pushed');
    paper.classList.remove('pushed');
    scissors.classList.remove('pushed');
}

gameStart = () => {
    isStarted = true;
    resetFn();
    if (again === true) {
        message.textContent = 'あいこで...';
    }
    else {
        message.textContent = 'じゃんけん...';
    }
    let shuffleHand = setTimeout(gameStart, 30);
    comHand = Math.floor(Math.random()*hands.length);
    com.textContent = hands[comHand];
        stopHand = () => {
                clearTimeout(shuffleHand);
        } 
        rock.addEventListener('click',stopHand);
        paper.addEventListener('click',stopHand);
        scissors.addEventListener('click',stopHand);
}

start.addEventListener('click', gameStart);
        rock.addEventListener('click',() => {
            if (isStarted === false) {
                return; }
            messageFn();
            rock.classList.add('pushed');
            if (comHand === 0) { setTimeout (drow, 1000) }
            else if (comHand === 1) { lose(); }
            else { win(); }
        });
        paper.addEventListener('click',() => {
            if (isStarted === false) {
                return; }
            messageFn();
            paper.classList.add('pushed');
            if (comHand === 0) { win(); }
            else if (comHand === 1) { setTimeout (drow, 1000) }
            else { lose(); }
        });
        scissors.addEventListener('click',() => {
            if (isStarted === false) {
                return; }
            messageFn();
            scissors.classList.add('pushed');
            if (comHand === 0) { lose(); }
            else if (comHand === 1) { win(); }
            else { setTimeout (drow, 1000) }
        });

messageFn = () => {
    if (again === true) {
        message.textContent = 'しょっ！';
    } else {
        message.textContent = 'ぽんっ！';
    } 
    isStarted = false;
}

win = () => {
    result.textContent = '勝 ち';
    oneMore.className = 'show';
    result.className = 'show';
    result.style.backgroundColor = '#ff0000';
}

lose = () => {
    result.textContent = '負 け';
    oneMore.className = 'show';
    result.className = 'show';
    result.style.backgroundColor = '#808080';
}

drow = () => {
    message.textContent = 'あいこで...';
    again = true;
    gameStart();
}

oneMore.addEventListener('click', () => {
    onload();
    gameStart();
    });