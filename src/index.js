// https://www.codingame.com/multiplayer/bot-programming
// https://www.codingame.com/multiplayer/bot-programming/tic-tac-toe

const pointConstructor = (x, y, status = 0) => {
    return {
        x: x,
        y: y,
        status: status,
    };
};

const pointAction = (point) => {
    point.status = 1;
    console.log(`${point.x} ${point.y}`);
};

const pointIsEmpty = (point) => {
    return point.status === 0;
};

const boardConstructor = () => {
    const p1 = pointConstructor(0, 0);
    const p2 = pointConstructor(0, 1);
    const p3 = pointConstructor(0, 2);
    const p4 = pointConstructor(1, 0);
    const p5 = pointConstructor(1, 1);
    const p6 = pointConstructor(1, 2);
    const p7 = pointConstructor(2, 0);
    const p8 = pointConstructor(2, 1);
    const p9 = pointConstructor(2, 2);
    // const row1 = [p1, p2, p3];
    // const row2 = [p4, p5, p6];
    // const row3 = [p7, p8, p9];
    // const col1 = [p1, p4, p7];
    // const col2 = [p2, p5, p8];
    // const col3 = [p3, p6, p9];
    return {
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4,
        p5: p5,
        p6: p6,
        p7: p7,
        p8: p8,
        p9: p9,
        points: [p1, p2, p3, p4, p5, p6, p7, p8, p9],
        // row1: row1,
        // row2: row2,
        // row3: row3,
        // rows: [row1, row2, row3],
        // col1: col1,
        // col2: col2,
        // col3: col3,
        // cols: [col1, col2, col3],
    }
};

const boardFindPoint = (board, x, y) => {
    return board.points.find((point) => point.x === x && point.y === y);
};

const boardUpdate = (board, input) => {
    const opponentX = input.opponent[0];
    const opponentY = input.opponent[1];
    const point = boardFindPoint(board, opponentX, opponentY);
    if (point !== undefined) {
        point.status = 2;
    }
};

const readAndParsePointLine = () => {
    return readline().split(" ").map((str) => parseInt(str));
};

const inputConstructor = () => {
    const opponent = readAndParsePointLine();
    const validActionCount = parseInt(readline());
    const validLines = [];
    for (let i = 0; i < validActionCount; i++) {
        const line = readAndParsePointLine();
        validLines.push(line);
    }
    return {
        opponent,
        validActionCount,
        validLines,
    };
};

const board = boardConstructor();

while (true) {
    const input = inputConstructor();

    boardUpdate(board, input);

    const point = board.points.filter(pointIsEmpty)[0];

    pointAction(point);
}
