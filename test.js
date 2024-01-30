const productQuantityControl = [...document.querySelectorAll('.product__quantity-control')];
const productAddBtns = [...document.querySelectorAll('.product__add')];
const cartProducts = document.querySelector('.cart__products');
const QuantityControl = function () {
    if (this.classList.contains('product__quantity-control_dec')) {
        if (Number(this.nextElementSibling.textContent) === 1) {
            return;
        }
        this.nextElementSibling.textContent = Number(this.nextElementSibling.textContent) - 1;
    } else {
        this.previousElementSibling.textContent = Number(this.previousElementSibling.textContent) + 1;
    }
}
const createCartProduct = function (id, src, quantity) {
    let cardWrapper = document.createElement('div');
    cardWrapper.className = 'cart__product'
    cardWrapper.dataset.id = id;
    let imgCard = document.createElement('img');
    imgCard.src = `${src}`;
    imgCard.className = 'cart__product-image'
    let cardCounter = document.createElement('div');
    cardCounter.className = 'cart__product-count';
    cardCounter.textContent = quantity;
    let cardDelete = document.createElement('div');
    cardDelete.className = 'cart__product-delete';
    cardDelete.innerHTML = '&times;'
    cardWrapper.append(imgCard, cardCounter, cardDelete)
    return cardWrapper
}
const checkQuantityProduct = function (cart) {

    if (cart.children.length === 0) {
        document.querySelector('.cart__title').style.display = 'none'
    } else {
        document.querySelector('.cart__title').style.display = 'block'
    }
}
const effectAddProduct = function (start, end, card) {
    let cloneImg = start.cloneNode(true);
    cloneImg.style.position = 'absolute';
    cloneImg.style.left = start.getBoundingClientRect().left + 'px';
    cloneImg.style.top = start.getBoundingClientRect().top + 'px';
    card.append(cloneImg);
    let stepLeft = (end.getBoundingClientRect().left - start.getBoundingClientRect().left) / 100;
    let stepTop = (end.getBoundingClientRect().top - start.getBoundingClientRect().top) / 100;
    let timer = setInterval(function () {
        cloneImg.style.left = cloneImg.getBoundingClientRect().left + stepLeft + 'px';
        cloneImg.style.top = cloneImg.getBoundingClientRect().top + stepTop + 'px';
        if (cloneImg.getBoundingClientRect().left > end.getBoundingClientRect().left) {
            cloneImg.remove()
            clearInterval(timer)
        }

    }, 1)
}

const addProductCart = function () {
    let cardProduct = this.closest('.product');
    let recurringProduct = [...cartProducts.querySelectorAll('.cart__product')].find(el => el.dataset.id == cardProduct.dataset.id);
    if (recurringProduct) {
        let counter = recurringProduct.querySelector('.cart__product-count');
        counter.textContent = Number(counter.textContent) + Number(cardProduct.querySelector('.product__quantity-value').textContent)
        effectAddProduct(cardProduct.querySelector('.product__image'), recurringProduct.querySelector('.cart__product-image'), cardProduct)
    } else {
        cartProducts.append(createCartProduct(cardProduct.dataset.id,
            cardProduct.querySelector('.product__image').src,
            cardProduct.querySelector('.product__quantity-value').textContent));

        [...cartProducts.querySelectorAll('.cart__product-delete')].forEach(item => item.addEventListener('click', function () {
            this.closest('.cart__product').remove();
            checkQuantityProduct(cartProducts);
        }));
    }
    cardProduct.querySelector('.product__quantity-value').textContent = 1;
    checkQuantityProduct(cartProducts)
}

productQuantityControl.forEach(item => item.addEventListener('click', QuantityControl))
productAddBtns.forEach(item => item.addEventListener('click', addProductCart))
