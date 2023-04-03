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
