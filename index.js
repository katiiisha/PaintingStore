const tabsLink = [...document.querySelectorAll('.reproductions-nav_tab')];
const reproductions = [...document.querySelectorAll('.reproductions')];
const cardBtn = [...document.querySelectorAll('.reproductions-card_btn')];
const modalCart = document.querySelector('.cart-modal');
const switchModal = [...document.querySelectorAll('.switch-modal')];
const cart = document.querySelector('.cart');
const numberProducts = document.querySelector('.numders-products');
const burgerMenu = document.querySelector('.burger-menu');





const changeContentTabs = function (e) {
    e.preventDefault()
    let tabActive = document.querySelector('.reproductions-nav_tab__active')
    let tabContent = document.querySelector('.reproductions__active')
    tabActive.classList.remove('reproductions-nav_tab__active');
    tabContent.classList.remove('reproductions__active')
    let index = tabsLink.indexOf(this);
    reproductions[index].classList.add('reproductions__active')
    this.classList.add('reproductions-nav_tab__active')
    
}

const fixedMenuMibile = function () {
    if (window.screen.width <= 500) {
        let nav = document.querySelector('.nav-menu');
        let logo = document.querySelector('.logo');
        let page = document.querySelector('.welcome-page');
        if (-logo.offsetHeight < logo.getBoundingClientRect().top) {
            nav.style.position = 'static'
            page.style.marginTop = '0px'
        } else {
            nav.style.position = 'fixed'
            page.style.marginTop = nav.offsetHeight + 'px';
        }
    }
}

const openCart = function (e) {
    e.preventDefault()
    modalCart.classList.toggle('cart-modal__active')
}

const createProductCard = function (src, autor, name, sum, id) {
    let product = document.createElement('div');
    let product_img = document.createElement('div');
    let product_desc = document.createElement('div');
    let product_quantity_control = document.createElement('div');
    let product_sum = document.createElement('div');
    let product_delete = document.createElement('div');
    let img = document.createElement('img');
    let product_autor = document.createElement('p');
    let product_name = document.createElement('p');
    let quantityControlMore = document.createElement('button');
    let quantityControlLess = document.createElement('button');
    let quantity = document.createElement('span');
    let imgDelete = document.createElement('img')

    product.className = 'product';
    product_img.className = 'product_img';
    product_desc.className = 'product_desc';
    product_quantity_control.className = 'product_quantity-control';
    product_sum.className = 'product_sum';
    product_delete.className = 'product_delete';
    product_autor.className = 'product_autor';
    product_name.className = 'product_name';
    quantityControlMore.className = 'quantity-control more';
    quantityControlLess.className = 'quantity-control less';
    quantity.className = 'quantity';

    img.src = `${src}`;
    quantityControlMore.textContent = '+';
    quantityControlLess.textContent = '-';
    quantity.textContent = '1';
    product_autor.textContent = autor;
    product_name.textContent = name;
    product_sum.textContent = sum;
    imgDelete.src = 'img/delete.svg';
    product.dataset.id = id;

    product_delete.append(imgDelete);
    product_quantity_control.append(quantityControlLess, quantity, quantityControlMore);
    product_desc.append(product_autor, product_name);
    product_img.append(img);
    product.append(product_img, product_desc, product_quantity_control, product_sum, product_delete);
    
    return product
}

const quantityControl = function () { 
    let quantity = this.closest('.product_quantity-control').querySelector('.quantity');
    if (this.classList.contains('more')) {
        quantity.textContent = Number(quantity.textContent) + 1;
    } else { 
        if (+quantity.textContent === 1) {
            return
        }
        quantity.textContent = +quantity.textContent - 1;
    }
    calculationTotalCost()
}

const calculationTotalCost = function () {
    let products = [...cart.querySelectorAll('.product')];
    let result = document.querySelector('.cart_result-sum');
    let productsSum = 0;
    let productNumder = 0;

    products.forEach(
        function (item) { 
            let price = parseInt(item.querySelector('.product_sum').textContent.split('руб')[0].replace(/\s/g, ''));
            let quantity = Number(item.querySelector('.quantity').textContent);
            productsSum += price * quantity;
            productNumder = productNumder + quantity;
        }
    )
    numberProducts.textContent = `${productNumder}`;
    numberProducts.style.display = 'flex';
    result.textContent = productsSum;
    
    
   
}

const addCart = function () {
    let card = this.closest('.reproductions-card');
    let cardImg = card.querySelector('.reproductions-card_img').getAttribute('src');
    let cardAutor = card.querySelector('.reproductions-card_subtitle').textContent.trim();
    let cardName = card.querySelector('.reproductions-card_title').textContent.trim();
    let cardPrice = card.querySelector('.reproductions-card_price').textContent.trim();
    let cardId = card.dataset.id;
    let productsCart = [...cart.querySelectorAll('.product')];
    let recurringProducts = productsCart.find(item => item.dataset.id === cardId);
  
    if (recurringProducts) {
        let quantity = recurringProducts.querySelector('.quantity')
        quantity.textContent = +quantity.textContent + 1; 
        calculationTotalCost();
        return
    }
    let product = createProductCard(cardImg, cardAutor, cardName, cardPrice, cardId);
    product.querySelector('.product_delete').addEventListener('click', function () {
        this.closest('.product').remove();
        calculationTotalCost();
    })

    let quantityControlBtn = [...product.querySelectorAll('.quantity-control')];
    quantityControlBtn.forEach(btn => { btn.addEventListener('click', quantityControl) })
    
    cart.append(product);
    
    calculationTotalCost();
}

const openBurgerMenu = function (e) {
    e.preventDefault()
    let burgerMenuAside = document.querySelector('.wrapper-burger-menu'); 
    let nav = document.querySelector('.nav-menu');
    nav.style.display = 'none';
    burgerMenuAside.classList.add('wrapper-burger-menu__active');
    let btnClose = burgerMenuAside.querySelector('.burger-menu_btn');
    btnClose.addEventListener('click', function () {
        burgerMenuAside.classList.remove('wrapper-burger-menu__active');
        nav.style.display = 'flex';
    })
}



tabsLink.forEach(item => item.addEventListener('click', changeContentTabs));
cardBtn.forEach(btn => btn.addEventListener('click', addCart));
window.addEventListener('scroll', fixedMenuMibile);
switchModal.forEach(btn => btn.addEventListener('click', openCart));
burgerMenu.addEventListener('click', openBurgerMenu)
