const showError = (errorElement, inputElement, inputErrorClass) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass)
}

const hideError = (errorElement, inputElement, inputErrorClass) => {
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass)
}

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (isInputNotValid) {
      showError(errorElement, inputElement, config);
  } else {
      hideError(errorElement, inputElement, config);
  }
}

const toggleButtonState = (button, isActive, invalidButtonClass) => {
  if (isActive) {
      button.classList.remove(invalidButtonClass);
      button.disabled = false;
  } else {
      button.classList.add(invalidButtonClass);
      button.disabled = 'disabled';
  }
}


const setEventListers = (formElement, { inputSelector, submitButtonSelector, invalidButtonClass, inputErrorClass }) => {
  const inputsList = formElement.querySelectorAll(inputSelector);
  const submitButton = formElement.querySelector(submitButtonSelector);


  Array.from(inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
          const isFormValid = formElement.checkValidity();
          checkInputValidity(formElement, inputElement, inputErrorClass)
          toggleButtonState(submitButton, isFormValid, invalidButtonClass)
      })
  })
}

export const clear = (popup, submitButton, isFormValid, { formSelector, inputSelector, submitButtonSelector, invalidButtonClass, inputErrorClass }) => {
  const formElement = popup.querySelector(formSelector);
  const inputsList = popup.querySelectorAll(inputSelector);


  Array.from(inputsList).forEach(inputElement => {
      formElement.querySelector(`#${inputElement.id}-error`).textContent = ' ';
      inputElement.classList.remove(inputErrorClass)
  })
  toggleButtonState(submitButton, isFormValid, invalidButtonClass);
}

export const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  Array.from(forms).forEach(formElement => {
      setEventListers(formElement, rest)
  })
}


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  invalidButtonClass: '.popup__submit_type_invalid',
  inputErrorClass: '.popup__input_type_invalid'
};


enableValidation(validationConfig);
