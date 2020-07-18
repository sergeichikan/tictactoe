import { Game } from "./game.js";
import { board } from "./board.js";

let game = new Game();
console.log(JSON.stringify(game));

// document
//     .getElementById("newGame")
//     .addEventListener("click", () => {
//         game = new Game();
//         board.clear();
//         console.log(JSON.stringify(game));
//     });

document
    .getElementById("nextStep")
    .addEventListener("click", () => {
        game.nextStep();
        console.log(JSON.stringify(game));
    });
