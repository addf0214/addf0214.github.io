let state = Array(9).fill(0);
let step = 0;
let isGameOver = false;
let isComputerThinking = false;
const audio = new Audio("ca.mp3");
var result = { undecided: -1, draw: 0, xWin: 1, oWin: 2 };

let winnerInfo = {};

function handleClick(event) {
    if (isGameOver) {
        // restart();
        return;
    }

    const rect = pieces.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let index = coordinateToIndex({ x, y });
    if (index === -1) {
        return;
    }
    if (!isGameOver && !isComputerThinking && (state[index] === 0)) {
        state[index] = (step % 2 === 0) ? 1 : -1;
        move(index);

        if (!isGameOver) {
            isComputerThinking = true;
            setTimeout(() => {
                computerMove();
                isComputerThinking = false;
            }, 500);
        }
    }
}

let restartButton = document.getElementById("restart");
restartButton.addEventListener('click', () => {
    restart();
});

let point;
function move(index) {
    let piece = (step % 2 === 0) ? 1 : -1;
    render(index, piece);
    audio.play();
    step++;
    let decision = judge(state);
    renderResult(decision);
}

function render(index, piece) {
    point = indexToCoordinate(index);
    if (piece === 1) {
        drawX();
    } else {
        drawO();
    }
}

function restart() {
    state = Array(9).fill(0);
    step = 0;
    isGameOver = false;
    clearBoard();
    drawBoard();
    xButton.style = "text-decoration: underline;";
    oButton.style = "text-decoration: none;";
}

let xButton = document.getElementById('a');
xButton.style = "text-decoration: underline;";
xButton.addEventListener('click', () => {
    if ((xButton.style.textDecoration == "none") && !isGameOver && !isComputerThinking) {
        xButton.style.textDecoration  = "underline";
        oButton.style.textDecoration  = "none";
        computerMove();
    }
});

let oButton = document.getElementById("b");
oButton.style = "text-decoration: none;";
oButton.addEventListener('click', () => {
    if ((oButton.style.textDecoration == "none") && !isGameOver && !isComputerThinking) {
        xButton.style.textDecoration  = "none";
        oButton.style.textDecoration  = "underline";
        computerMove();
    }
});

function computerMove() {
    let bestMove = findBestMove(state);
    state[bestMove] = (step % 2 === 0) ? 1 : -1;
    move(bestMove);
}

function renderResult(decision) {
    switch (decision) {
        case result.undecided:
            break;
        case result.draw:
            isGameOver = true;
            setTimeout(() => {
                drawDraw();
            }, 500);
            break;
        case result.xWin:
            isGameOver = true;
            winnerInfo = collectWinnerInfo();
            drawVictory();
            break;
        case result.oWin:
            isGameOver = true;
            winnerInfo = collectWinnerInfo();
            drawVictory();
            break;
        default:
    }
}
