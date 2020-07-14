// https://www.codingame.com/multiplayer/bot-programming
// https://www.codingame.com/multiplayer/bot-programming/tic-tac-toe

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

const pointAction = (point) => { // point - ячейка на которую хотим походить

    // отмечаем ячейку на которую мы походим
    point.status = 1;

    const msg = point.x + " " + point.y; // это строка

    // можно использовать другой синтаксис
    // const msg = `${point.x} ${point.y}`;

    // сообщаем координаты ячейки на которую хотим походить
    console.log(msg);
};

const fieldConstructor = (x, y) => {
    const p00 = pointConstructor(x + 0, y + 0);
    const p01 = pointConstructor(x + 0, y + 1);
    const p02 = pointConstructor(x + 0, y + 2);
    const p10 = pointConstructor(x + 1, y + 0);
    const p11 = pointConstructor(x + 1, y + 1);
    const p12 = pointConstructor(x + 1, y + 2);
    const p20 = pointConstructor(x + 2, y + 0);
    const p21 = pointConstructor(x + 2, y + 1);
    const p22 = pointConstructor(x + 2, y + 2);

    p00.priority.position = 1;
    p02.priority.position = 1;
    p20.priority.position = 1;
    p22.priority.position = 1;

    p11.priority.position = 2;

    const points = [p00, p01, p02, p10, p11, p12, p20, p21, p22];

    const row0 = [p00, p01, p02];
    const row1 = [p10, p11, p12];
    const row2 = [p20, p21, p22];

    const rows = [[p00, p01, p02], [p10, p11, p12], [p20, p21, p22]];

    const col0 = [p00, p10, p20];
    const col1 = [p01, p11, p21];
    const col2 = [p02, p12, p22];

    const cols = [[p00, p10, p20], [p01, p11, p21], [p02, p12, p22]];

    const diag0 = [p00, p11, p22];
    const diag1 = [p02, p11, p20];

    const diags = [[p00, p11, p22], [p02, p11, p20]];

    return {
        p00: p00,
        p01: p01,
        p02: p02,
        p10: p10,
        p11: p11,
        p12: p12,
        p20: p20,
        p21: p21,
        p22: p22,
        points: points,
        row0: row0,
        row1: row1,
        row2: row2,
        rows: rows,
        col0: col0,
        col1: col1,
        col2: col2,
        cols: cols,
        diag0: diag0,
        diag1: diag1,
        diags: diags,
    };
};

const boardConstructor = () => {
    // игровая доска состоит из 9 полей (81 ячеек)

    // поля
    const f00 = fieldConstructor(0, 0);
    const f01 = fieldConstructor(0, 3);
    const f02 = fieldConstructor(0, 6);
    const f10 = fieldConstructor(3, 0);
    const f11 = fieldConstructor(3, 3);
    const f12 = fieldConstructor(3, 6);
    const f20 = fieldConstructor(6, 0);
    const f21 = fieldConstructor(6, 3);
    const f22 = fieldConstructor(6, 6);

    f00.p00.priority.position = 3;
    f00.p02.priority.position = 3;
    f00.p20.priority.position = 3;
    f00.p22.priority.position = 3;
    f00.p11.priority.position = 4;

    f02.p00.priority.position = 3;
    f02.p02.priority.position = 3;
    f02.p20.priority.position = 3;
    f02.p22.priority.position = 3;
    f02.p11.priority.position = 4;

    f20.p00.priority.position = 3;
    f20.p02.priority.position = 3;
    f20.p20.priority.position = 3;
    f20.p22.priority.position = 3;
    f20.p11.priority.position = 4;

    f22.p00.priority.position = 3;
    f22.p02.priority.position = 3;
    f22.p20.priority.position = 3;
    f22.p22.priority.position = 3;
    f22.p11.priority.position = 4;

    f11.p00.priority.position = 5;
    f11.p02.priority.position = 5;
    f11.p20.priority.position = 5;
    f11.p22.priority.position = 5;
    f11.p11.priority.position = 6;

    // массив всех полей
    const fields = [f00, f01, f02, f10, f11, f12, f20, f21, f22];

    // массив всех ячеек со всех полей
    const points = fields.map((field) => field.points).flat();

    return {
        f00: f00,
        f01: f01,
        f02: f02,
        f10: f10,
        f11: f11,
        f12: f12,
        f20: f20,
        f21: f21,
        f22: f22,
        fields: fields,
        points: points,
    }
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

const calcPriority = (field) => {
    field.rows.forEach(setPriorityOfPoints);
    field.cols.forEach(setPriorityOfPoints);
    field.diags.forEach(setPriorityOfPoints);
};

const priorityOff = (board) => {
    board.points.forEach((point) => {
        point.priority.me = 0;
        point.priority.opponent = 0;
    });
};

const convertInput = (board, input) => {

    // координаты ячейки на которую походил враг
    const opponentX = input.opponent[0];
    const opponentY = input.opponent[1];

    // по координатам врага находим ячейку на поле
    // функция find возвращает ячейку или undefined (если не нашла ячейку)
    const opponentPoint = board.points.find((point) => point.x === opponentX && point.y === opponentY);

    const validPoints = input.validLines.map((arr) => {
        const x = arr[0];
        const y = arr[1];
        return board.points.find((point) => point.x === x && point.y === y);
    });

    return {
        opponentPoint: opponentPoint,
        validPoints: validPoints,
    };
};

const boardUpdate = (board, input) => {

    if (input.opponentPoint !== undefined) {
        input.opponentPoint.status = 2;
    }

    // сбрасываем приоритеты со всех точек на поле
    priorityOff(board);

    board.fields.forEach(calcPriority);
};

const readAndParsePointLine = () => {
    // readline - возвращает одну строчку текста
    // эта функция не стандартная
    // ее нету в js ее реализует сайт
    // https://www.codingame.com/ide/puzzle/tic-tac-toe
    // только на этом сайте ее можно использовать
    // при помощи нее сайт передает нам информацию о текущем ходе

    // split - разбивает эту строчку на массив из двух строчек
    // https://learn.javascript.ru/array-methods#split-i-join
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/split

    // map - возвращает массив содержащий два числа

    // parseInt - переводит строку в число
    // https://learn.javascript.ru/number#parseint-i-parsefloat

    return readline().split(" ").map((str) => parseInt(str));
};

const inputConstructor = () => {
    // получаем координаты врага в виде массива из двух чисел
    const opponent = readAndParsePointLine();

    // получаем количество пустых ячеек
    // parseInt - функция переводящая строку в число
    const validActionCount = parseInt(readline());

    // тут будем хранить набор координат путых ячеек
    const validLines = [];

    // цикл сохраняющий координаты пустых ячеек
    for (let i = 0; i < validActionCount; i++) {
        // получаем координаты пустой ячейки
        const line = readAndParsePointLine();
        // помещаем их в массив
        validLines.push(line);
    }

    // возвращаем обьект
    return {
        opponent: opponent, // массив из двух чисел
        validActionCount: validActionCount, // количество пустых ячеек
        validLines: validLines, // массив содержащий массивы состоящие из двух чисел (координаты пустых ячеек)
    };
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

// создаем игровое поле
const board = boardConstructor();

// информация о циклах
// https://learn.javascript.ru/while-for

while (true) { // код  в этих скобках будет выполняться каждый ход

    // получаем инфу о текущем ходе
    const input = inputConstructor();

    const inputPoints = convertInput(board, input);

    // обновляем поле
    boardUpdate(board, inputPoints);

    // массив свободных ячеек
    const validPoints = inputPoints.validPoints;

    // находим самые приоритетные ячейки
    const points = getNextPoints(validPoints);

    // из них берем первую
    const point = points[0];

    // ходим на эту ячейку
    pointAction(point);
}
