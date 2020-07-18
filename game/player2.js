// const steps = ["0 0", "0 2", "2 1", "1 2"];
//
// let i = 0;
//
// export const player2 = (input, action) => {
//     action(steps[i]);
//     i++;
// };

// dumb bot

const pointConstructor = (x, y, status = 0) => {
    // функция возвращает обьект описывающий одну ячейку
    return {
        x: x, // номер строки
        y: y, // номер столбца
        status: status, // 0 - пустая, 1 - занята мной, 2 - занята врагом
        priority: 0,
    };
};

const boardConstructor = () => {
    // поле состоит из 9 ячеек
    // нумерация строк и столбцов начинается с 0
    const p1 = pointConstructor(0, 0);
    const p2 = pointConstructor(0, 1);
    const p3 = pointConstructor(0, 2);
    const p4 = pointConstructor(1, 0);
    const p5 = pointConstructor(1, 1);
    const p6 = pointConstructor(1, 2);
    const p7 = pointConstructor(2, 0);
    const p8 = pointConstructor(2, 1);
    const p9 = pointConstructor(2, 2);

    // также для удобства можно создать отдельные массивы строк и столбцов

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
    // ищет ячейку по координатам x и y
    // возвращает ячейку (если найдет) или undefined (если не найдет)

    // Инфа по методу find
    // https://learn.javascript.ru/array-methods#find-i-findindex
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    // && - логический оператор "и"
    // инфа по логическим операторам
    // https://learn.javascript.ru/logical-operators

    return board.points.find((point) => point.x === x && point.y === y);
};

const boardUpdate = (board, input) => {

    // координаты ячейки на которую походил враг
    const opponentX = input.opponent[0];
    const opponentY = input.opponent[1];

    // по координатам врага находим ячейку на поле и отмечаем ее
    const point = boardFindPoint(board, opponentX, opponentY);
    if (point !== undefined) {
        point.status = 2;
    }

    // далее можно добавить код расставляющий приоритеты каждой ячейки
};

const sortPoints = (point1, point2) => {
    // сортирует по убыванию приоритета
    return point2.priority - point1.priority;
}

const board = boardConstructor();

export const player2 = (input, action) => {
    boardUpdate(board, input);

    const points = board.points.filter((point) => point.status === 0).sort(sortPoints);

    const point = points[0];

    point.status = 1;

    const msg = point.x + " " + point.y;

    action(msg);
};
