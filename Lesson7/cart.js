const cart = {
    goodsList: [],
    countBasketPrice() {
        return this.goodsList.reduce((finalCost, {amount, productObj}) => finalCost += productObj.price * amount, 0)
    },
    addToBasket(product) {
        const prodInCart = this.goodsList.find(el => el.productObj === product)
        if (prodInCart) {
            prodInCart.amount++
        } else {
            this.goodsList.push({
                productObj: product,
                amount: 1
            })
        }
    },
    removeGood(index){
        console.log(index)
        this.goodsList.splice(index, 1)

    },
    renderCart() {
        return this.goodsList.length ?
            `В корзине: ${this.goodsList.length} товаров на сумму  ${this.countBasketPrice()} рублей` :
            'Корзина пуста'
    }
}