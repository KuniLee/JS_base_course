const app = {
    createModal({title, price, images}) {
        const ANIMATION_SPEED = 300
        let closing = false
        let destroyed = false

        const MODAL_TEMPLATE = `  <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">${title || "Продукт"}</span>
                <span data-close="true" class="modal-close">&times;</span>
            </div>
            <div class="modal-image position-relative">
            <img src="${images[0]}" alt="" srcset="">
            </div>
            <div class="modal-body">
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="modal-footer d-flex justify-content-between">
            <span>Цена ${price} рублей</span>
            <a href="#" class="btn btn-primary" data-buy="true">Купить</a>
        </div>
        </div>
    </div>`
        const $modal = document.createElement('div')
        $modal.classList.add("vmodal")
        $modal.insertAdjacentHTML('afterbegin', MODAL_TEMPLATE)

        if (images.length > 1) $modal.querySelector('.modal-image').insertAdjacentHTML("beforeend", `
                  <button class="carousel-control-prev"  data-changeImage="prev" type="button">
    <span class="carousel-control-prev-icon" ></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" data-changeImage="next" type="button">
    <span class="carousel-control-next-icon" ></span>
    <span class="visually-hidden">Next</span>
  </button>
    `)

        document.body.prepend($modal)

        const modal = {
            open() {
                if (!closing && !destroyed) {
                    setTimeout(() => {
                        $modal.classList.add("open")
                    }, 0)
                } else {
                    return "unable"
                }
            }
            ,

            close() {
                closing = true
                $modal.classList.add("hiding")
                $modal.classList.remove("open")
                setTimeout(() => {
                    $modal.classList.remove("hiding")
                    closing = false
                    $modal.removeEventListener('click', listener)
                    $modal.parentNode.removeChild($modal)
                    destroyed = true
                }, ANIMATION_SPEED)

            }
        }

        const listener = event => {
            if (event.target.dataset.buy) {
                cart.addToBasket(arguments[0])
                catalog.updateCart()
                modal.close()
            }
            event.target.dataset.close && modal.close()
            const changingImage = event.composedPath().reduce((where, el) => el.dataset?.changeimage ?? where, undefined)
            if (changingImage) {
                const image = $modal.querySelector('.modal-image img')
                const current = images.indexOf(image.src)
                const next = (current < images.length - 1) ? current + 1 : 0
                const prev = (current > 0) ? current - 1 : images.length - 1
                if (changingImage === "next") image.src = images[next]
                if (changingImage === "prev") image.src = images[prev]
            }
        }

        $modal.addEventListener("click", listener)
        return modal
    },
    cart,
    updateCart() {
        const cartElement = document.querySelector(".navbar-text.cart")
        cartElement.textContent = this.cart.renderCart()
        this.saveCartToLocalStorage()
    },
    saveCartToLocalStorage(){
        localStorage.setItem('myCart', JSON.stringify(this.cart.goodsList));
    },
    readCartFromLocalStorage() {
        this.cart.goodsList = JSON.parse(localStorage.getItem('myCart'))
    },
    start() {
        this.readCartFromLocalStorage()
        this.render()
        this.updateCart()
    },
}