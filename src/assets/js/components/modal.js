const toggleModal = () => {
  const addClassButton = document.querySelector('.modal-content__form');
  const addClassBody = document.querySelector('body');
  const addClassModalOverlay = document.querySelector('.modal-content');
  const firstInputModal = document.querySelector('#modal__name');

  addClassButton.classList.toggle('modal-content__form--open');
  addClassBody.classList.toggle('modal-content__body--noscroll');
  addClassModalOverlay.classList.toggle('modal-content__open');
  firstInputModal.focus();
};

const closeModal = () => {
  const addClassButton = document.querySelector('.modal-content__form');
  const addClassBody = document.querySelector('body');
  const addClassModalOverlay = document.querySelector('.modal-content');

  addClassModalOverlay.classList.remove('modal-content__open');
  addClassBody.classList.remove('modal-content__body--noscroll');
  addClassButton.classList.remove('modal-content__form--open');
};

const clickAddClassButtonFunction = () => {
  const clickButtonModal = document.querySelector('.feedback-block__link');
  const closeButtonModal = document.querySelector('.modal-content__button');
  const addClassModalOverlay = document.querySelector('.modal-content');

  if (clickButtonModal !== null) {
    clickButtonModal.addEventListener('click', (event) => {
      event.preventDefault();
      toggleModal();
    });
  }

  if (closeButtonModal !== null) {
    closeButtonModal.addEventListener('click', () => {
      closeModal();
    });
  }

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      if (addClassModalOverlay.classList.contains('modal-content__open')) {
        evt.preventDefault();
        closeModal();
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target === addClassModalOverlay) {
      closeModal();
    }
  });
};

document.addEventListener('DOMContentLoaded', clickAddClassButtonFunction);
