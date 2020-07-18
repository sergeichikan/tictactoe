import { board } from "./board.js";
import { action1, action2 } from "./actions.js";
import { player1 } from "./player1.js";
import { player2 } from "./player2.js";

export class Game {

    constructor() {
        this.id = Game.id = ++Game.id & 2147483647;
        this.step = 0;
        this.end = false;
        this.win = 0;
        this.nextPlayer = 1;
    }

    isWin(id) {
        return board.all.some((points) => {
            return points.filter((point) => point.getStatus() === id).length === 3;
        });
    }

    nextStep() {
        if (this.end) {
            return;
        }
        this.step++;
        const input = board.getInput();
        if (this.nextPlayer === 1) {
            player1(input, action1);
            this.nextPlayer = 2;
        } else {
            player2(input, action2);
            this.nextPlayer = 1;
        }
        if (this.isWin(1)) {
            this.win = 1;
            this.end = true;
        }
        if (this.isWin(2)) {
            this.win = 2;
            this.end = true;
        }
        if (this.step >= 9) {
            this.end = true;
        }
    }

    static id = 0;
}
