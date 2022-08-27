//7. * Сравнить null и 0. Объяснить результат.

console.log(null < 0)   //false
console.log(null > 0)   //false
console.log(null == 0) //false
console.log(null >= 0) //true из-за особенностей алгоритма вычисления оператора >= в JS,
// (спецификация http://javascript.ru/ecma/part11#a-11.8.4) возращает true

//8. * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function
//power(val, pow), где val — заданное число, pow –— степень.

function power(val, pow) {
    if (pow === 0) return 1
    if (val === 1) return 1
    if (pow>0) return power(val, pow-1) * val
   if (pow<0) return power(1/val, -pow)
}

console.log(power(2, 4));
console.log(power(-2, -3));
console.log(power(0, 0));