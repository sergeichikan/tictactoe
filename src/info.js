// примитивы:
// null
// undefined
// boolean - true или false
// number - 1, 2, 3, 1.123, NaN, Infinity
// string
// object
// symbol

// оператор typeof - возвращает тип в виде одного из строковых значений:
// "undefined" или "boolean" или "number" или "string" или "object" или "symbol"

parseInt("udfuf") // NaN

console.log(typeof undefined); // "undefined"
console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"
console.log(typeof 1); // "number" // integer
console.log(typeof 1.2); // "number" // float
console.log(typeof NaN); // "number"
console.log(typeof Infinity); // "number"
console.log(typeof "test string"); // "string"
console.log(typeof "1"); // "string"
console.log(typeof "undefined"); // "string"
console.log(typeof {}); // "object"
console.log(typeof { key: "dfdfd", property: {} }); // "object"
console.log(typeof [1, "dfdfd", undefined, {}, []]); // "object"
console.log(typeof null); // "object" !!!
console.log(typeof Symbol()); // "symbol"

// = - оператор присваивания
// === - оператор сравнения

let value = "sddf";
let v = {};

if (value || v) {
    console.log("type of value is", typeof value);
}
//
value = null;

// проверка на null
if (value === null) {

}