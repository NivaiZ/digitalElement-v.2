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
const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const addForm = document.querySelector('.modal-content__send');
const addFormEmail = addForm.querySelector('#modal__email');
const applicantForm = document.getElementById('modal__form');
const submitButton = applicantForm.querySelector('.modal__submit--button');
const addClassModalOverlay = document.querySelector('.modal-content');
const addClassBody = document.querySelector('body');
const addClassButton = document.querySelector('.modal-content__form');
const messageStatus = document.querySelector('.modal-content__message');

const formSend = () => {
  const onClickAndKeydown = (messageType) => {
    messageType.addEventListener('click', () => messageType.remove());
    document.addEventListener('keydown', (evt) => {
      if (onEscKey(evt)) {
        messageType.remove();
      }
    });
  };

  function onShowPopup(templateId) {
    const template = document.querySelector(templateId).content.firstElementChild;
    const message = template.cloneNode(true);
    document.body.appendChild(message);
    onClickAndKeydown(message);
  }

  function onSuccess() {
    onShowPopup('#success');
    applicantForm.reset();
  }

  function onError() {
    onShowPopup('#error');
  }

  function serializeForm(formNode) {
    return new FormData(formNode);
  }

  function checkValidity(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();
    const isEmail = event.target.id === 'modal__email';
    const isValidEmail = isEmail ? isEmailValid(event.target.value) : true;
    submitButton.disabled = !isValid || !isValidEmail || addFormEmail.value.trim() === '';
  }

  async function sendData(onFail, data) {
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data,
      });
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    } catch (error) {
      onFail();
    }
  }

  const isEmailValid = (value) => EMAIL_REGEXP.test(value);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = serializeForm(event.target);
    sendData(onSuccess, onError, data);
  }

  applicantForm.addEventListener('submit', handleFormSubmit);

  applicantForm.addEventListener('input', checkValidity);

  submitButton.disabled = true;
};

document.addEventListener('DOMContentLoaded', formSend);
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