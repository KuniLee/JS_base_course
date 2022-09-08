function createModal({title, price, images}) {
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
    $modal.querySelector(".modal-close").hidden = true

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
            app.updateCart()
            modal.close()
        }
        event.target.dataset.close && modal.close()
        const changingImage = event.path.reduce((where, el) => el.dataset?.changeimage ?? where, undefined)
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
}


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
    renderCart() {
        return this.goodsList.length ?
            `В корзине: ${this.goodsList.length} товаров на сумму  ${this.countBasketPrice()} рублей` :
            'Корзина пуста'
    }
}

const products = [
    {
        id: 1,
        title: 'Яблоки',
        price: 20,
        images: ['https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
            'https://cdnn21.img.ria.ru/images/07e6/03/05/1776805509_0:0:3072:1728_1920x0_80_0_0_0ea5f9290b2d77fe9c88f083ebbae369.jpg',
            'https://www.interfax.ru/ftproot/textphotos/2020/07/08/app700.jpg'
        ]
    },
    {
        id: 2,
        title: 'Апельсины',
        price: 30,
        images: [
            'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'
        ]
    },
    {
        id: 3,
        title: 'Манго',
        price: 40,
        images: [
            'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'
        ]
    },
    {
        id: 4,
        title: 'Носки',
        price: 55,
        images: [
            'https://saltmag.ru/media/articles/inner/2020/6300/11.jpg',
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSohbz4KeRMKT4fwxfuZ42XVr3QP88qhPN_ZA&usqp=CAU"
        ]
    },
]

const app = {
    updateCart() {
        const cartElement = document.querySelector(".navbar-text.cart")
        cartElement.textContent = cart.renderCart()
        const button = document.querySelector('.navbar button.btn-danger')
        button.hidden = !cart.goodsList.length
    },

    render() {
        const HEADER_TEMPLATE = `
<nav class="navbar navbar-dark bg-dark">
  <div class="container justify-content-end">
 <span class="navbar-text cart"></span>
    <button class="btn btn-danger ms-2">Удалить всё</button>
  </div>
</nav>`
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML("afterbegin", HEADER_TEMPLATE)
        const catalog = document.createElement('div')
        catalog.classList.add('container', 'py-2')
        const row = document.createElement('div')
        row.classList.add('row', 'g-2')
        catalog.append(row)
        products.forEach(product => {
            const card = `<div class="col-4">
<div class="card" data-id="${product.id}" >
<div style="height: 300px">
<img src="${product.images[0]}" style="width: 100%; object-fit: cover;"  class="card-img-top" alt="img">
</div>
<div class="card-body">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.price} руб.</p>
<div class="d-flex justify-content-between"><a href="#" class="btn btn-info">Открыть</a>
<a href="#" class="btn btn-primary">Купить</a></div>
</div>
</div>
</div>`
            row.insertAdjacentHTML("beforeend", card)
        })
        document.body.insertAdjacentElement("beforeend", catalog)
    },
    start() {
        this.render()
        this.updateCart()
        const cards = document.getElementsByClassName('card')
        const buttonClick = function (ev) {
            const product = products.find(el => el.id == this.dataset.id)
            if (ev.target.classList.contains('btn-info')) {
                const modal = createModal(product)
                modal.open()
            }
            if (ev.target.classList.contains('btn-primary')) {
                cart.addToBasket(product)
                app.updateCart()
            }
        }
        for (let card of cards) {
            card.addEventListener('click', buttonClick)
        }
        const clearCartButton = document.querySelector('.navbar button.btn-danger')
        clearCartButton.addEventListener("click", () => {
            cart.goodsList = []
            this.updateCart()
        })
    }
}

app.start()
