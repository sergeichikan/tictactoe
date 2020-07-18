import { board } from "./board.js";

const action1 = (str) => board.action(str, 1);
const action2 = (str) => board.action(str, 2);

export {
    action1,
    action2,
};
