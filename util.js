function coordinateToIndex(point) {
    if ((point.x > 242) && (point.y > 42) && (point.x < 310) && (point.y < 110)) {
        return 0;
    }
    if ((point.x > 316) && (point.y > 42) && (point.x < 384) && (point.y < 110)) {
        return 1;
    }
    if ((point.x > 390) && (point.y > 42) && (point.x < 458) && (point.y < 110)) {
        return 2;
    }
    if ((point.x > 242) && (point.y > 116) && (point.x < 310) && (point.y < 184)) {
        return 3;
    }
    if ((point.x > 316) && (point.y > 116) && (point.x < 384) && (point.y < 184)) {
        return 4;
    }
    if ((point.x > 390) && (point.y > 116) && (point.x < 458) && (point.y < 184)) {
        return 5;
    }
    if ((point.x > 242) && (point.y > 190) && (point.x < 310) && (point.y < 258)) {
        return 6;
    }
    if ((point.x > 316) && (point.y > 190) && (point.x < 384) && (point.y < 258)) {
        return 7;
    }
    if ((point.x > 390) && (point.y > 190) && (point.x < 458) && (point.y < 258)) {
        return 8;
    }
    return -1;
}

function indexToCoordinate(index) {
    switch (index) {
        case 0:
            return { x: 242, y: 42 };
        case 1:
            return { x: 316, y: 42 };
        case 2:
            return { x: 390, y: 42 };
        case 3:
            return { x: 242, y: 116 };
        case 4:
            return { x: 316, y: 116 };
        case 5:
            return { x: 390, y: 116 };
        case 6:
            return { x: 242, y: 190 };
        case 7:
            return { x: 316, y: 190 };
        case 8:
            return { x: 390, y: 190 };
        default:
            return undefined;
    }
}

function collectWinnerInfo() {
    let lineType = 0;
    for (let i = 0; i < linesToCheck.length; i++) {
        let line = linesToCheck[i];
        let sum = 0;
        lineType = i;
        for (let dot of line) {
            sum += state[dot];
        }
        if (sum === 3) {
            return { lineType, piece: 1 };
        } else if (sum === -3) {
            return { lineType, piece: -1 };
        }
    }

}
