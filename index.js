const tabsLink = [...document.querySelectorAll('.reproductions-nav_tab')];
const reproductions = [...document.querySelectorAll('.reproductions')];

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

tabsLink.forEach(item => item.addEventListener('click', changeContentTabs))
window.addEventListener('scroll', fixedMenuMibile )