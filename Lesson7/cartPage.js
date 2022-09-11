const cartPage = {
    ...app,
    render() {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML("afterbegin", `
<nav class="navbar navbar-dark bg-dark">
  <div class="container justify-content-between">
  <div class="d-flex "> 
  <span class="navbar-brand mb-0 h1">Корзина</span>
    <span class="navbar-nav">
        <a class="nav-link active" href="index.html">На главную</a>
 </span>
 </div>
<div> 
    <a class="navbar-text cart" href="#"></a>
    <button class="btn btn-danger ms-2" hidden>Удалить всё</button>
</div>
  </div>
</nav>`)
        document.body.insertAdjacentHTML("beforeend", `
<div class="cartListWrap container">
<h4>Состав корзины:</h4>
<div>
<ul class="list-group list-group-numbered">
</ul>
<button type="button" class="btn btn-primary mt-3">Далее</button>
</div>
</div>

<div class="addressInputWrap container">
<h4>Адрес доставки:</h4>
<div>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  <button type="button" class="btn btn-primary mt-3">Далее</button>
</div>
</div>

<div class="commentInputWrap container">
<h4>Комментарий:</h4>
<div>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  <button type="button" class="btn btn-primary mt-3">Далее</button>
</div>
</div>
`)
        const clearCartButton = document.querySelector('.navbar button.btn-danger')
        clearCartButton.addEventListener("click", () => {
            this.cart.goodsList = []
            this.updateCart()
            this.updateCartList()
        })
        this.updateCartList()
        this.addListeners()

    },
    addListeners() {
        document.querySelector(".cartListWrap").addEventListener(
            "click", (ev)=>{
              if ("remove" in ev.target.dataset) {
                 this.cart.removeGood(ev.target.dataset.remove)
              }
               this.updateCartList()
            }
        )
    },
    updateCartList() {
        document.querySelector('.navbar button.btn-danger').hidden = !this.cart.goodsList.length
        const cartListWrapper = document.querySelector(".cartListWrap")
        const cartList = cartListWrapper.querySelector('ul')
        cartList.innerHTML = []
        if (!this.cart.goodsList.length) cartList.innerHTML = "Корзина пуста"
        else {
            this.cart.goodsList.forEach(({productObj, amount},idx) => {
                cartList.insertAdjacentHTML('beforeend',
                    `<li class="list-group-item position-relative">${productObj.title}. ${amount} шт. Сумма: ${amount * productObj.price}руб.
<button data-remove="${idx}" class="btn btn-danger position-absolute top-0 end-0">Удалить</button></li>
`)})
        }
        this.updateCart()

    }

}

cartPage.start()