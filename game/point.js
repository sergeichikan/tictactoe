export class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.querySelector(`.box${this.x}${this.y}`);
    }

    toString() {
        return `[ ${this.x}, ${this.y} ]`;
    }

    toJSON() {
        return JSON.stringify(this.toCoords());
    }

    toCoords() {
        return [this.x, this.y];
    }

    getStatus() {
        if (this.element.classList.contains("player1")) {
            return 1;
        } else if (this.element.classList.contains("player2")) {
            return 2;
        } else {
            return 0;
        }
    }

    setStatus(n) {
        if (n === 1) {
            this.element.classList.add("player1");
        } else if (n === 2) {
            this.element.classList.add("player2");
        } else if (n === 0) {
            this.element.classList.remove("player1", "player2");
        }
    }

    action(status) {
        this.setStatus(status);
    }
}