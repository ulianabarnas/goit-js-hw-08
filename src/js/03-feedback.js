import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const KEY = 'feedback-form-state';
let formData = localStorage.getItem(KEY)
  ? JSON.parse(localStorage.getItem(KEY))
  : {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

reloadPage();

function reloadPage() {
  const savedFormData = JSON.parse(localStorage.getItem(KEY));

  if (savedFormData) {
    if (savedFormData.email) {
      form.elements.email.value = savedFormData.email;
    }
    if (savedFormData.message) {
      form.elements.message.value = savedFormData.message;
    }
  }
}

function onFormInput({ target }) {
  formData[target.name] = target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (email === '' || message === '') {
    return alert('Заповніть будь-ласка всі поля');
  }

  const parsedData = JSON.parse(localStorage.getItem(KEY));
  console.log(parsedData);

  localStorage.removeItem(KEY);
  e.target.reset();
  formData = {};
}
