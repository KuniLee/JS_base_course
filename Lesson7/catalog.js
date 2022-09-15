

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


const catalog = {
    ...app,
    products,
    render() {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML("afterbegin", `
<nav class="navbar navbar-dark bg-dark">
  <div class="container justify-content-between">
 <span class="navbar-brand mb-0 h1">Каталог</span>
<div> 
    <a class="navbar-text cart" href="cartPage.html"></a>
</div>
  </div>
</nav>`)
        document.body.insertAdjacentHTML("beforeend", `
<div class="container py-2">
<div class="productList row g-2"></div>
</div>
`)
        const row = document.body.querySelector(".productList")
        this.products.forEach(product => {
            const card = `<div class="col-4">
<div class="card" data-id="${product.id}" >
<div style="height: 300px">
<img src="${product.images[0]}" style="width: 100%; object-fit: cover;"  class="card-img-top" alt="img">
</div>
<div class="card-body">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.price} руб.</p>
<div class="d-flex justify-content-between"><button class="btn btn-info">Открыть</button>
<button class="btn btn-primary">Купить</button></div>
</div>
</div>
</div>`
            row.insertAdjacentHTML("beforeend", card)
        })

        const cards = document.getElementsByClassName('card')
        const buttonClick = function (ev) {
            const product = this.products.find(el => el.id == ev.target.offsetParent.dataset.id)
            if (ev.target.classList.contains('btn-info')) {
                const modal = this.createModal(product)
                modal.open()
            }
            if (ev.target.classList.contains('btn-primary')) {
                this.cart.addToBasket(product)
                this.updateCart()
            }
        }
        for (let card of cards) {
            card.addEventListener('click', buttonClick.bind(this))
        }
    },

}

catalog.start()


