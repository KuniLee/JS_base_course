// 1. Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги.
//     Доска должна быть верно разлинована на черные и белые ячейки. Строки должны
// нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.


const gridStyle = `display: grid;
    grid-template-columns : 20px  repeat(8, 50px);
    grid-template-rows: 20px repeat(8, 50px);
    justify-items: center;
    align-items: center;`

function makeChessBoard() {
    const board = document.createElement('div')
    board.style = gridStyle

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div')
            if (i === 0 || j === 0) {
                cell.innerText = (j) ? String.fromCharCode(64 + j) : i || ""
            } else {
                cell.style.width = "100%"
                cell.style.height = "100%"
                if (i % 2) cell.style.backgroundColor = j % 2 ? '#f1d264' : '#4f3e07'
                else cell.style.backgroundColor = !(j % 2) ? '#f1d264' : '#4f3e07'
            }
            board.appendChild(cell)
        }
    }
    document.body.prepend(board)
}

makeChessBoard()

//2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в
// HTML-структуре. Там должен быть только div, в который будет вставляться корзина,
//     сгенерированная на базе JS:
//     a. Пустая корзина должна выводить строку «Корзина пуста»;
//     b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей»

const cart = {
    goodsList: [
    ],

    countBasketPrice() {
        return this.goodsList.reduce((finalCost, {amount, cost}) => finalCost += cost * amount, 0)
    },
    addGoods(...goods) {
        this.goodsList.push(...goods)
    },
    cartRender(){
        const myCart = document.querySelector(".cart")
        myCart.textContent = this.goodsList.length ?
            `В корзине: ${this.goodsList.length} товаров на сумму  ${this.countBasketPrice()} рублей`:
            'Корзина пуста'
    }
}

cart.cartRender()

setTimeout(()=>{
    cart.addGoods(        {
            name: 'Пельмени',
            amount: 2,
            cost: 400
        }
        ,{
            name: 'Банан',
            amount: 4,
            cost: 30
        },
        {
            name: 'Кефир',
            amount: 1,
            cost: 120
        })
    cart.cartRender()
},3000)

// 3. * Сделать так, чтобы товары в каталоге выводились при помощи JS:
// a. Создать массив товаров (сущность Product);
// b. При загрузке страницы на базе данного массива генерировать вывод из него.
// HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид
// каталога генерируется JS.

class Product{
    constructor(name, cost){
        this.name = name
        this.cost = cost
    }
}

const catalogList = [new Product("Молоко", 50), new Product("Мёд", 10), new Product("Сыр", 40)]

function renderCatalog() {
    const catalogElement = document.querySelector("#catalog")
    const catalogHeading = document.createElement("h3")
    catalogHeading.innerText = "Каталог:"
    const goodListElement = document.createElement("ol")
    catalogList.forEach(good=>{
        const goodCard = document.createElement('li')
        goodCard.innerText = `Название: ${good.name}; Цена: ${good.cost} руб.`
        goodListElement.appendChild(goodCard)
    })
    catalogElement.append(catalogHeading, goodListElement)
}

document.addEventListener("DOMContentLoaded", renderCatalog);