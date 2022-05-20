import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // renderLoading(isLoading, buttonText='Сохранить') {
  //     const loading = (
  //         popupSelector,
  //         isLoading = false,
  //         text = 'Сохранить',
  //         loadingText = 'Сохранение...'
  //     ) => {
  //         const button = document.querySelector(`${popupSelector} .popup__submit`);

  //         if (isLoading) {
  //             button.textContent = loadingText;
  //         } else {
  //             button.textContent = text;
  //         }
  //         }
  //     }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
