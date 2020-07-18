// const steps = ["1 1", "2 0", "0 1", "1 0", "2 2"];
//
// let i = 0;
//
// export const player1 = (input) => {
//     action(steps[i]);
//     i++;
// };

const pointConstructor = (x, y) => {
    // функция возвращает обьект описывающий одну ячейку
    return {
        x: x, // номер строки
        y: y, // номер столбца
        status: 0, // 0 - пустая, 1 - занята мной, 2 - занята врагом

        // приоритет ячейки состоящий из трех видов приоритета
        priority: {
            me: 0, // приоритет ячейки относительно наших ходов
            opponent: 0, // приоритет ячейки относительно ходов противника
            position: 0, // приоритет ячейки относительно расположения ячейки на поле
        },
    };
};

const boardConstructor = () => {
    // поле состоит из 9 ячеек
    // нумерация строк и столбцов начинается с 0

    // создаем ячейки
    const p1 = pointConstructor(0, 0);
    const p2 = pointConstructor(0, 1);
    const p3 = pointConstructor(0, 2);
    const p4 = pointConstructor(1, 0);
    const p5 = pointConstructor(1, 1);
    const p6 = pointConstructor(1, 2);
    const p7 = pointConstructor(2, 0);
    const p8 = pointConstructor(2, 1);
    const p9 = pointConstructor(2, 2);

    // расставляем приоритеты относительно расположения ячеек
    p1.priority.position = 1;
    p3.priority.position = 1;
    p7.priority.position = 1;
    p9.priority.position = 1;

    p5.priority.position = 2;

    // массив всех точек
    const points = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

    // создаем массивы описывающие строки столбцы и диагонали
    const row1 = [p1, p2, p3];
    const row2 = [p4, p5, p6];
    const row3 = [p7, p8, p9];

    const rows = [row1, row2, row3];

    const col1 = [p1, p4, p7];
    const col2 = [p2, p5, p8];
    const col3 = [p3, p6, p9];

    const cols = [col1, col2, col3];

    const diag1 = [p1, p5, p9];
    const diag2 = [p3, p5, p7];

    const diags = [diag1, diag2];

    // помещаем все в обьект и возвращаем его из функции
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
        points: points,
        row1: row1,
        row2: row2,
        row3: row3,
        rows: rows,
        col1: col1,
        col2: col2,
        col3: col3,
        cols: cols,
        diag1,
        diag2,
        diags: diags,
    }
};

const boardFindPoint = (board, x, y) => {
    // ищет ячейку на поле (board) по координатам x и y
    // возвращает ячейку (если найдет) или undefined (если не найдет)

    // Инфа по методу find
    // https://learn.javascript.ru/array-methods#find-i-findindex
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    // && - логический оператор "и"
    // инфа по логическим операторам
    // https://learn.javascript.ru/logical-operators

    return board.points.find((point) => point.x === x && point.y === y);
};

const setPriorityOfPoints = (points) => {
    // points - массив ячеек (строка или столбец или диагональ)

    // массив ячеек на которые походил противник
    const opponentPoints = points.filter((point) => point.status === 2);

    // массив ячеек на которые походили мы
    const myPoints = points.filter((point) => point.status === 1);

    // массив ячеек на которые никто не походил
    const emptyPoints = points.filter((point) => point.status === 0);


    if (opponentPoints.length === 0) {
        // в случае если нету вражеских ячеек
        // для каждой пустой ячейки устанавливаем наш приоритет равный количеству наших ячеек
        emptyPoints.forEach((point) => point.priority.me = myPoints.length);
    } else {
        // в случае если есть вражеские ячейки
        if (myPoints.length === 0) {
            // и если есть наших ячеек нет
            // для каждой пустой ячейки устанавливаем вражеский приоритет равный количеству ячеек врага
            emptyPoints.forEach((point) => point.priority.opponent = opponentPoints.length);
        }
    }
};

const calcPriority = (board) => {
    // проходим по строкам, столбцам и диагоналям и расставляем приоритеты
    board.rows.forEach(setPriorityOfPoints);
    board.cols.forEach(setPriorityOfPoints);
    board.diags.forEach(setPriorityOfPoints);
};

const priorityOff = (board) => {
    board.points.forEach((point) => {
        point.priority.me = 0;
        point.priority.opponent = 0;
    });
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

    // сбрасываем приоритеты со всех точек на поле
    priorityOff(board);

    // считаем приоритеты для всех точек на поле
    calcPriority(board);
};

const maxPriority = (points, getPriority) => {
    // points - массив ячеек
    // getPriority - функция возвращающая приоритет точки

    // sorted - массив ячеек рассортированный по убыванию приоритета
    const sorted = points.sort((point1, point2) => getPriority(point2) - getPriority(point1));

    // maxPriority - приоритет самой приоритетной точки
    const maxPriority = getPriority(sorted[0]);

    // возвращаем массив ячеек с наивысшим приоритетом
    return sorted.filter((point) => getPriority(point) === maxPriority);
};

const getNextPoints = (points) => {
    // points - массив всех ячеек

    // из всех ячеек отбираем ячейки с самым большим "me" приоритетом
    const me = maxPriority(points, (point) => point.priority.me);

    // из них отбираем ячейки с самым большим "opponent" приоритетом
    const opponent = maxPriority(me, (point) => point.priority.opponent);

    // из них отбираем ячейки с самым большим "position" приоритетом
    return maxPriority(opponent, (point) => point.priority.position);
};

const board = boardConstructor();

export const player1 = (input, action) => {
    boardUpdate(board, input);

    const points = getNextPoints(board.points);

    const point = points[0];

    point.status = 1;

    const msg = point.x + " " + point.y;

    action(msg);
};
