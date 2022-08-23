//5. Реализовать четыре основные арифметические операции в виде функций с двумя
//параметрами. Обязательно использовать оператор return.

function sum(a,b){
    return a+b
}
function sub(a,b){
    return a-b
}
function mul(a,b){
    return a*b
}
function div(a,b){
    return a/b
}

console.log(sum(10,5))
console.log(sub(10,5))
console.log(mul(10,5))
console.log(div(10,5))

// 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
// где arg1, arg2 — значения аргументов, operation — строка с названием операции. В
// зависимости от переданного значения выполнить одну из арифметических операций
// (использовать функции из пункта 5) и вернуть полученное значение (применить switch).

function mathOperation(arg1, arg2, operation){
    switch (operation) {
        case "sum":
           return sum(arg1,arg2)
        case "sub":
            return sub(arg1,arg2)
        case "mul":
            return mul(arg1,arg2)
        case "div":
            return div(arg1,arg2)
    }
}


console.log(mathOperation(40,3,"sub"))