
const canvasWidth = 700;
const canvasHeight = 300;
const lineLength = 216;
const strokeWidth = 6;
const drawPieceTime = 200;
const drawWinLineTime = 400;
const lineLengthTrim = 208;

// It seems that the width and height attributes determine the width or height of the canvas's coordinate system,
// whereas the CSS properties just determine the size of the box in which it will be shown.
let canvases = document.getElementsByTagName("canvas");
for (let i = 0; i < canvases.length; i++) {
    canvases[i].width = canvasWidth;
    canvases[i].height = canvasHeight;
}

let background = document.getElementById('background');
var backgroundCtx = background.getContext("2d");
backgroundCtx.fillStyle = "#14bdac";
backgroundCtx.fillRect(0, 0, canvasWidth, canvasHeight);

let board = document.getElementById('board');
var boardCtx = board.getContext("2d");
drawBoard();

let pieces = document.getElementById('pieces');
var piecesCtx = pieces.getContext("2d");
pieces.addEventListener('click', function (e) {
    handleClick(e);
});

let startTime = undefined;

function drawBoard() {
    boardCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    boardCtx.beginPath();

    boardCtx.moveTo(242, 114);
    boardCtx.lineTo(458, 114);

    boardCtx.moveTo(242, 186);
    boardCtx.lineTo(458, 186);

    boardCtx.moveTo(314, 42);
    boardCtx.lineTo(314, 258);

    boardCtx.moveTo(386, 42);
    boardCtx.lineTo(386, 258);

    boardCtx.lineWidth = 6;
    boardCtx.strokeStyle = "#0da192";
    boardCtx.stroke();
    boardCtx.closePath();
}

function drawO() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }
    piecesCtx.clearRect(point.x, point.y, 68, 68);
    var time = (new Date()).getTime();
    piecesCtx.strokeStyle = '#f2ebd3';
    piecesCtx.lineWidth = 5.5;
    piecesCtx.beginPath();
    piecesCtx.arc(point.x + 34, point.y + 34, 20.5, -0.5 * Math.PI, (2 * ((time - startTime) / drawPieceTime) - 0.5) * Math.PI);
    piecesCtx.stroke();
    piecesCtx.closePath();
    if ((time - startTime) <= drawPieceTime) {
        window.requestAnimationFrame(drawO);
    } else {
        startTime = undefined;
    }
}

function drawX() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }
    piecesCtx.clearRect(point.x, point.y, 68, 68);
    var time = (new Date()).getTime();
    piecesCtx.strokeStyle = '#545454';
    piecesCtx.lineWidth = 5.5;
    piecesCtx.beginPath();
    piecesCtx.moveTo(point.x + 14, point.y + 14);
    piecesCtx.lineTo(point.x + 14 + (time - startTime) / drawPieceTime * 40, point.y + 14 + (time - startTime) / drawPieceTime * 40);
    piecesCtx.stroke();

    piecesCtx.moveTo(point.x + 14 + 40, point.y + 14);
    piecesCtx.lineTo(point.x + 14 + 40 - (time - startTime) / drawPieceTime * 40, point.y + 14 + (time - startTime) / drawPieceTime * 40);
    piecesCtx.stroke();
    piecesCtx.closePath();
    if ((time - startTime) <= drawPieceTime) {
        window.requestAnimationFrame(drawX);
    } else {
        startTime = undefined;
    }
}

function clearBoard() {
    piecesCtx.clearRect(0, 0, 700, 300);
}

function drawVictory() {
    setTimeout(() => {
        drawWinLine();
        setTimeout(() => {
            drawWinner();
        }, drawWinLineTime + 200)
    }, 500);
}

function drawWinLine() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }

    var time = (new Date()).getTime();
    if (winnerInfo.piece === 1) {
        piecesCtx.strokeStyle = '#545454';
    } else {
        piecesCtx.strokeStyle = '#f2ebd3';
    }

    piecesCtx.lineWidth = 5.5;
    piecesCtx.beginPath();
    if ((winnerInfo.lineType >= 0) && (winnerInfo.lineType <= 2)) {
        piecesCtx.moveTo(242, 42 + 34 + winnerInfo.lineType * (6 + 68));
        piecesCtx.lineTo(242 + (time - startTime) / drawWinLineTime * 208, 42 + 34 + winnerInfo.lineType * (6 + 68));
    } else if ((winnerInfo.lineType >= 3) && (winnerInfo.lineType <= 5)) {
        piecesCtx.moveTo(276 + (winnerInfo.lineType - 3) * (6 + 68), 42);
        piecesCtx.lineTo(276 + (winnerInfo.lineType - 3) * (6 + 68), 42 + (time - startTime) / drawWinLineTime * 208);
    } else if (winnerInfo.lineType === 6) {
        console.log(6);
        piecesCtx.moveTo(242, 42);
        piecesCtx.lineTo(242 + (time - startTime) / drawWinLineTime * lineLengthTrim, 42 + (time - startTime) / drawWinLineTime * lineLengthTrim);
    } else {
        piecesCtx.moveTo(458, 42);
        piecesCtx.lineTo(458 - (time - startTime) / drawWinLineTime * lineLengthTrim, 42 + (time - startTime) / drawWinLineTime * lineLengthTrim);
    }

    piecesCtx.stroke();
    piecesCtx.closePath();
    if ((time - startTime) < drawWinLineTime) {
        window.requestAnimationFrame(drawWinLine);
    } else {
        startTime = undefined;
    }
}

function drawWinner() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }

    var time = (new Date()).getTime();

    boardCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    piecesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    piecesCtx.lineWidth = 9.5;
    piecesCtx.globalAlpha = (time - startTime) / drawWinLineTime;
    if (winnerInfo.piece === 1) {
        piecesCtx.strokeStyle = '#545454';
        piecesCtx.beginPath();
        piecesCtx.moveTo(310, 76);
        piecesCtx.lineTo(390, 150);
        piecesCtx.stroke();

        piecesCtx.moveTo(390, 76);
        piecesCtx.lineTo(310, 150);
        piecesCtx.stroke();
        piecesCtx.closePath();
    } else {
        piecesCtx.strokeStyle = '#f2ebd3';
        piecesCtx.beginPath();
        piecesCtx.arc(350, 113, 48, -0.5 * Math.PI, 1.5 * Math.PI);
        piecesCtx.stroke();
        piecesCtx.closePath();
    }

    piecesCtx.font = "600 32px Arial";
    piecesCtx.fillStyle = "#545454";
    piecesCtx.fillText("WINS!", 305, 220);
    if ((time - startTime) < drawWinLineTime) {
        window.requestAnimationFrame(drawWinner);
    } else {
        startTime = undefined;
    }
}

function drawDraw() {
    if (startTime === undefined) {
        startTime = (new Date()).getTime();
    }

    var time = (new Date()).getTime();

    boardCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    piecesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    piecesCtx.lineWidth = 9.5;
    piecesCtx.globalAlpha = (time - startTime) / drawWinLineTime;

    piecesCtx.strokeStyle = '#545454';
    piecesCtx.beginPath();
    piecesCtx.moveTo(260, 76);
    piecesCtx.lineTo(340, 150);
    piecesCtx.stroke();

    piecesCtx.moveTo(340, 76);
    piecesCtx.lineTo(260, 150);
    piecesCtx.stroke();
    piecesCtx.closePath();

    piecesCtx.strokeStyle = '#f2ebd3';
    piecesCtx.beginPath();
    piecesCtx.arc(400, 113, 42, -0.5 * Math.PI, 1.5 * Math.PI);
    piecesCtx.stroke();
    piecesCtx.closePath();

    piecesCtx.font = "600 32px Arial";
    piecesCtx.fillStyle = "#545454";
    piecesCtx.fillText("DRAW!", 298, 220);
    if ((time - startTime) < drawWinLineTime) {
        window.requestAnimationFrame(drawDraw);
    } else {
        startTime = undefined;
    }
}
