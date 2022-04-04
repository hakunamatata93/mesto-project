import * as validate from './validate'
const addPlacePopup = document.querySelector('.popup__addplace');
const addPlaceName = addPlacePopup.querySelector('#place');
const addPictureLink = addPlacePopup.querySelector('#link');
const addPlacePopupForm = addPlacePopup.querySelector('.popup__form');
const addPlaceButton = addPlacePopup.querySelector('.popup__submit');

const profilePopup = document.querySelector('.popup__profile');
const profileName = profilePopup.querySelector('#name');
const profileStatus = profilePopup.querySelector('#status');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupButton = profilePopup.querySelector('.popup__submit');

export const bigPicturePopup = document.querySelector('.popup__big-picture');
export const bigPictureImage = bigPicturePopup.querySelector('.big-picture__image');
export const bigPictureSubtitle = bigPicturePopup.querySelector('.big-picture__alt');

const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_active'));
    }
}
const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_active');
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);
}
export function closePopup(popup) {
    popup.classList.remove('popup_active');
    popup.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscapeKey);
}


export function subscribePopupToEvents(createElementCallBack, profilePerson, profileJob) {

    document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click', function (evt) {
        closePopup(evt.currentTarget.closest('.popup'));
    }));

    document.querySelector('.profile__edit-button').addEventListener('click', function () {
        openPopup(profilePopup);
        validate.clear(profilePopup, profilePopupButton, true, validate.validationConfig);
        profileName.value = profilePerson.textContent;
        profileStatus.value = profileJob.textContent;

    });

    document.querySelector('.profile__add-button').addEventListener('click', function () {
        openPopup(addPlacePopup);
        validate.clear(addPlacePopup, addPlaceButton, false, validate.validationConfig);
        addPlaceName.value = ' ';
        addPictureLink.value = ' ';
    });

      addPlacePopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
          createElementCallBack({
              name: addPlaceName.value,
              link: addPictureLink.value
          });
        closePopup(addPlacePopup);
    });

    profilePopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        profilePerson.textContent = profileName.value;
        profileJob.textContent = profileStatus.value;
        closePopup(profilePopup);
    });
}
