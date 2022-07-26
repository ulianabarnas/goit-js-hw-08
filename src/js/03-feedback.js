import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
const formData = localStorage.getItem('feedback-form-state')
  ? JSON.parse(localStorage.getItem('feedback-form-state'))
  : {};

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const keyParsed = JSON.parse(localStorage.getItem('feedback-form-state'));
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  if (email === '' || message === '') {
    return alert('Заповни поля');
  }
  console.log(keyParsed);

  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function onFormInput({ target }) {
  formData[target.name] = target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function setFormValues() {
  const savedInfo = localStorage.getItem('feedback-form-state');
  console.log(savedInfo);

  if (savedInfo) {
    const data = JSON.parse(savedInfo);
    if (data.email) {
      form.elements.email.value = data.email;
    }
    if (data.message) {
      form.elements.message.value = data.message;
    }
  }
}

setFormValues();

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
