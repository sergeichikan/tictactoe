type Status = 0 | 1 | 2; // 0 - empty, 1 - me, 2 - opponent

// https://github.com/
// https://www.codingame.com/multiplayer/bot-programming
// https://www.codingame.com/multiplayer/bot-programming/tic-tac-toe

// forEach, map, filter

// -1 -1
// 9
// 2 0
// 1 0
// ...

const readAndParsePointLine = (): number[] => {
    return readline().split(" ").map((str: string) => parseInt(str));
};

class Input {

    public readonly opponent: number[];
    public readonly validActionCount: number;
    public readonly validLines: number[][];

    public constructor() {
        this.opponent = readAndParsePointLine();
        this.validActionCount = parseInt(readline());
        this.validLines = [];
        for (let i = 0; i < this.validActionCount; i++) {
            const line: number[] = readAndParsePointLine();
            this.validLines.push(line);
        }
    }
}

class Point {

    public readonly x: number;
    public readonly y: number;
    public status: Status;

    public constructor(x: number, y: number, status: Status = 0) {
        this.x = x;
        this.y = y;
        this.status = status
    }

    public action() {
        this.status = 1;
        console.log(`${this.x} ${this.y}`);
    }

    public static readonly isEmpty = ({ status }: Point) => status === 0;
}

class Board {

    public readonly p1: Point;
    public readonly p2: Point;
    public readonly p3: Point;
    public readonly p4: Point;
    public readonly p5: Point;
    public readonly p6: Point;
    public readonly p7: Point;
    public readonly p8: Point;
    public readonly p9: Point;
    public readonly points: Point[];
    public readonly row1: [Point, Point, Point];
    public readonly row2: [Point, Point, Point];
    public readonly row3: [Point, Point, Point];
    public readonly rows: [Point, Point, Point][];
    public readonly col1: [Point, Point, Point];
    public readonly col2: [Point, Point, Point];
    public readonly col3: [Point, Point, Point];
    public readonly cols: [Point, Point, Point][];

    public constructor() {
        this.p1 = new Point(0, 0);
        this.p2 = new Point(0, 1);
        this.p3 = new Point(0, 2);
        this.p4 = new Point(1, 0);
        this.p5 = new Point(1, 1);
        this.p6 = new Point(1, 2);
        this.p7 = new Point(2, 0);
        this.p8 = new Point(2, 1);
        this.p9 = new Point(2, 2);
        this.points = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9];
        this.row1 = [this.p1, this.p2, this.p3];
        this.row2 = [this.p4, this.p5, this.p6];
        this.row3 = [this.p7, this.p8, this.p9];
        this.rows = [this.row1, this.row2, this.row3];
        this.col1 = [this.p1, this.p4, this.p7];
        this.col2 = [this.p2, this.p5, this.p8];
        this.col3 = [this.p3, this.p6, this.p9];
        this.cols = [this.col1, this.col2, this.col3];
    }

    public findPoint(x: number, y: number): Point | undefined {
        return this.points.find((point) => point.x === x && point.y === y);
    }

    public update({ opponent: [ opponentX, opponentY ] }: Input) {
        const point = this.findPoint(opponentX, opponentY);
        if (point !== undefined) {
            point.status = 2;
        }
    }
}

const board: Board = new Board();

while (true) {
    const input: Input = new Input();

    board.update(input);

    board.points.filter(Point.isEmpty)[0].action();
}
