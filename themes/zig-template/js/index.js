//menu

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('click', () => handleHamburgerClick())

const handleHamburgerClick = () => {
  hamburger.classList.toggle('active')
  nav.classList.toggle('active')
}

//end menu

//opacity on last post
setInterval(() => {
  const res = document.querySelectorAll('.owl-item.active');
  if (!res[3].classList.contains('semiopaque') || res[2].classList.contains('semiopaque')) {
    res.forEach(el => {
      el.classList.remove('semiopaque');
    });
    res[3].classList.add('semiopaque');
  }
}, 100);

//end opacity on last post

//carousel arrows

const removeDefaultArrows = () => {
  const rightArrows = document.querySelectorAll('.owl-nav .owl-next span');
  rightArrows.forEach(arrow => arrow.remove())
  const leftArrows = document.querySelectorAll('.owl-nav .owl-prev span');
  leftArrows.forEach(arrow => arrow.remove())
};

document.addEventListener("DOMContentLoaded", function () {
  removeDefaultArrows();
});
