const popupWindow = document.querySelector('.popup');
const popupText = document.getElementById('popup__text');

const popupHandler = (target, message) => {
  popupWindow.style.left = target.getBoundingClientRect().right + 2 + 'px';
  popupWindow.style.top = target.getBoundingClientRect().top + window.scrollY + 'px';
  popupWindow.classList.add('visible');
  popupText.innerHTML = message;
  setTimeout(() => popupWindow.classList.remove('visible'), 3000);
}

export { popupHandler }
