export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    authorization: "69751e77-dec2-4cdf-a14f-2ae5794686d7",
    "Content-Type": "application/json",
  },
};
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  invalidButtonClass: "popup__submit_type_invalid",
  inputErrorClass: "popup__input_type_invalid",
  submitButtonSelector: ".popup__submit",
};

export const userSelectors = {
  profileName: ".profile__name",
  profileJob: ".profile__status",
  ProfileAvatar: ".profile__avatar",
};

export const formSelectors = {
  editProfileForm: ".popup__profile",
  addCardForm: ".popup__addplace",
  editAvatarForm: ".popup__avatar",
};

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addButton = document.querySelector(".profile__add-button");
export const editAvatar = document.querySelector(".profile__avatar-container");

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_status");
