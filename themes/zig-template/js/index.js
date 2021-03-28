const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('click', ()=>handleHamburgerClick())

const handleHamburgerClick = () => {
  hamburger.classList.toggle('active')
  nav.classList.toggle('active')
}

setInterval(() => {
  const res = document.querySelectorAll('.owl-item.active');
  if (!res[3].classList.contains('semiopaque') || res[2].classList.contains('semiopaque')) {
    res.forEach(el => {
      el.classList.remove('semiopaque');
    });
    res[3].classList.add('semiopaque');
  }
}, 100);
