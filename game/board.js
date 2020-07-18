import { Point } from "./point.js";

export class Board {

    constructor() {
        this.p00 = new Point(0, 0);
        this.p01 = new Point(0, 1);
        this.p02 = new Point(0, 2);
        this.p10 = new Point(1, 0);
        this.p11 = new Point(1, 1);
        this.p12 = new Point(1, 2);
        this.p20 = new Point(2, 0);
        this.p21 = new Point(2, 1);
        this.p22 = new Point(2, 2);

        this.points = [this.p00, this.p01, this.p02, this.p10, this.p11, this.p12, this.p20, this.p21, this.p22];

        this.row0 = [this.p00, this.p01, this.p02];
        this.row1 = [this.p10, this.p11, this.p12];
        this.row2 = [this.p20, this.p21, this.p22];

        this.rows = [this.row0, this.row1, this.row2];

        this.col0 = [this.p00, this.p10, this.p20];
        this.col1 = [this.p01, this.p11, this.p21];
        this.col2 = [this.p02, this.p12, this.p22];

        this.cols = [this.col0, this.col1, this.col2];

        this.diag0 = [this.p00, this.p11, this.p22];
        this.diag1 = [this.p02, this.p11, this.p20];

        this.diags = [this.diag0, this.diag1];

        this.all = [this.rows, this.cols, this.diags].flat();

        this.opponent = [-1, -1];
    }

    clear() {
        this.points.forEach((point) => point.setStatus(0));
    }

    getPoint(p) {
        return this.points.find((point) => point.x === p.x && point.y === p.y);
    }

    findPoint([ x, y ]) {
        return this.points.find((point) => point.x === x && point.y === y);
    }

    action(str, id) {
        this.opponent = str.split(" ").map((value) => parseInt(value));
        const point = this.findPoint(this.opponent);
        point && point.action(id);
    }

    getInput() {
        const emptyPoints = this.points.filter((point) => point.getStatus() === 0);
        return {
            opponent: this.opponent,
            validActionCount: emptyPoints.length,
            validLines: emptyPoints.map((point) => point.toCoords()),
        };
    }
}

export const board = new Board();
