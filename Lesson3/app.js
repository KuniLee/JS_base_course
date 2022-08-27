//1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100

//метод: решето Эратосфена:

console.groupCollapsed(`task 1`)

const n = 100
let a = Array.from(Array(n + 1), (x, i) => i)
a[1] = 0
let i = 2


while (i <= n) {
    if (a[i] !== 0) {
        console.log(a[i])
        for (let j = i + i; j < n + 1; j += i) {
            a[j] = 0
        }
    }
    i++
}

console.groupEnd()

// 2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть
// сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в
// зависимости от находящихся в ней товаров.
// Товары в корзине хранятся в массиве. Задачи:
// a. Организовать такой массив для хранения товаров в корзине;
// b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

console.groupCollapsed(`task 2`)

const cart = []
cart.push(["Макароны", 2, 50], ["Гречка", 3, 40])

function countBasketPrice(cartArr) {
    return cartArr.reduce((finalCost, [_, amount, cost]) => finalCost += cost * amount, 0)
}

console.log("final cost: ", countBasketPrice(cart));

console.groupEnd()

// 3. * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это
// должно так:
//     for(...){// здесь пусто}
console.groupCollapsed(`task 3`)

for (let i = 0; i < 10; console.log(i++)) {
}

console.groupEnd()

// 4. * Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
// x
// xx
// xxx
// xxxx
// xxxxx

console.groupCollapsed(`task 4`)

// for (let i = "#"; i.length <= 20; i += "#") {
//     console.log(i)
// }

// or

for (let i = 1; i <= 20; i++) {
    console.log("#".repeat(i));
}


console.groupEnd()