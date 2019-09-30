var linesToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var result = { undecided: -1, draw: 0, xWin: 1, oWin: 2 };

function judge(state) {
    let step = 0;
    for (let i = 0; i < 9; i++) {
        if (state[i] !== 0) {
            step++;
        }
    }

    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 3) {
            return result.xWin;
        } else if (sum === -3) {
            return result.oWin;
        }
    }

    if (step === 9) {
        return result.draw;
    } else {
        return result.undecided;
    }
}

function minimax(state, isMax, piece, alpha, beta) {
    let decision = judge(state);
    switch (decision) {
        case result.xWin:
            if (piece === 1) {
                return 1;
            } else {
                return -1;
            }
        case result.oWin:
            if (piece === -1) {
                return 1;
            } else {
                return -1;
            }
        case result.draw:
            return 0;
        default:
    }

    let best = 0;
    if (isMax) {
        best = -100;
        for (let i = 0; i < 9; i++) {
            if (state[i] === 0) {
                state[i] = piece;
                let value = minimax(state, !isMax, piece, alpha, beta);
                state[i] = 0;

                best = Math.max(best, value);
                alpha = Math.max(alpha, best);
                if (beta <= alpha) {
                    break;
                }
            }
        }
    } else {
        best = 100;
        for (let i = 0; i < 9; i++) {
            if (state[i] === 0) {
                state[i] = -piece;
                let value = minimax(state, !isMax, piece, alpha, beta);
                state[i] = 0;
                best = Math.min(best, value);
                beta = Math.min(beta, best);

                if (beta <= alpha) {
                    break;
                }
            }
        }
    }
    return best;
}

function findBestMove(state) {
    let step = 0;
    for (let i = 0; i < 9; i++) {
        if (state[i] !== 0) {
            step++;
        }
    }

    let piece = (step % 2 === 0) ? 1 : -1;

    // First Move
    if (step === 0) {
        let candidates = [0, 2, 6, 8];
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // Win
    for (line of linesToCheck) {
        let sum = 0;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 2 * piece) {
            for (let dot of line) {
                if (state[dot] === 0) {
                    return dot;
                }
            }
        }
    }

    let bestValue = -100;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (state[i] === 0) {
            state[i] = piece;
            let value = minimax(state, false, piece, -1000, 1000);
            state[i] = 0;
            if (value > bestValue) {
                bestMove = i;
                bestValue = value;
            }
        }
    }

    return bestMove;
}
