const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('click', ()=>handleHamburgerClick())

const handleHamburgerClick = () => {
  hamburger.classList.toggle('active')
  nav.classList.toggle('active')


}
