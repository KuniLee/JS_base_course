// 1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
//     надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
//     десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5,
// ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее
// сообщение с помощью console.log и вернуть пустой объект.

console.groupCollapsed("task 1")

function numberToObject(num) {
    if (num > 999) {
        console.log("More than 999")
        return {}
    } else {
        const obj = new Object({'units': num % 10, 'tens': num % 100 / 10, 'hundreds': num / 100})
        Object.keys(obj).forEach(el => {
            obj[el] = Math.floor(obj[el])
        })
        return obj
    }
}


console.log(numberToObject(0))
console.log(numberToObject(8))
console.log(numberToObject(547))
console.log(numberToObject(1152))

console.groupEnd()

// 2. Продолжить работу с интернет-магазином:
// a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими
// объектами можно заменить их элементы?
//     b. Реализуйте такие объекты.
//     c. Перенести функционал подсчета корзины на объектно-ориентированную базу.


console.groupCollapsed("task 2")

class Product{
    constructor(name, amount, cost){
        this.name = name
        this.amount = amount
        this.cost = cost
    }
}

class Cart{
    static addCartMethod(goods){
        goods.forEach(good=> {
            good['sayWhereAmI'] = function (){
                console.log("Я в корзине, и я - " + this.name + ". Моя цена " + this.cost)
            }
        })
        return goods
        }
    constructor(...goods) {
        this.goodsList = Cart.addCartMethod(goods)
    }
    addGoods(...goods){
        this.goodsList.push(...Cart.addCartMethod(goods))
    }
    countBasketPrice() {
        return this.goodsList.reduce((finalCost, {amount, cost}) => finalCost += cost * amount, 0)
    }
}


const cart = new Cart(new Product("Молоко",8, 50), new Product("Мёд",2, 10))
cart.addGoods({name: "Кефир", amount: 3, cost: 20})



cart.goodsList.forEach(good=>good.sayWhereAmI())
console.log("Общая цена корзины: ",cart.countBasketPrice());




console.groupEnd()