const clickBurgerMenuFunction = () => {
  const headerBlock = document.querySelector('.header-block');
  const burgerButton = headerBlock.querySelector('.header-block__burger');
  const contentMenu = headerBlock.querySelector('.header-block__content');

  if ((burgerButton) !== null) {
    burgerButton.addEventListener('click', handleClick);
  }

  document.addEventListener('click', handleDocumentClick);

  document.addEventListener('keydown', handleDocumentKeyDown);

  function handleClick() {
    burgerButton.classList.toggle('header-block__burger--open');
    contentMenu.classList.toggle('header-block__content--open');
  }

  function handleDocumentClick(event) {
    const target = event.target;
    if (!target.closest('.header-block__content') && !target.closest('.header-block__burger')) {
      contentMenu.classList.remove('header-block__content--open');
      burgerButton.classList.remove('header-block__burger--open');
    }
  }

  function handleDocumentKeyDown(evt) {
    if (evt.keyCode === 27) {
      if (contentMenu.classList.contains('header-block__content--open')) {
        evt.preventDefault();
        contentMenu.classList.remove('header-block__content--open');
        burgerButton.classList.remove('header-block__burger--open');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', clickBurgerMenuFunction);
