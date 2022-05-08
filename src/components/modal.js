import * as validate from './validate'
import * as api from './Api.js'
import * as utils from './utils.js'

const avatarPopup = document.querySelector('.popup__avatar');
const avatarPopupForm = avatarPopup.querySelector('.popup__form');
const avatarPopupSubheading = avatarPopup.querySelector('#subheading');
const avatarPopupButton = avatarPopup.querySelector('.popup__submit');

export const addPlacePopup = document.querySelector('.popup__addplace');
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

const getCardId = (el) => {
  return el.closest('.popup__form').querySelector('#card_id').textContent;
}

export function subscribePopupToEvents(createElementCallBack, profilePerson, profileJob, profileAvatar) {

    document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click', function (evt) {
        closePopup(evt.currentTarget.closest('.popup'));
    }));

    document.querySelector('.profile__avatar-overlay').addEventListener('click', function () {
      openPopup(avatarPopup);
      validate.clear(avatarPopup, avatarPopupButton, false, validate.validationConfig);
      avatarPopupSubheading.value = '';
  });

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
        utils.startLoading(addPlaceButton);
          createElementCallBack({
              name: addPlaceName.value,
              link: addPictureLink.value
            })
            .then(() => closePopup(addPlacePopup))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => utils.stopLoading(addPlaceButton))
    });

    profilePopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        utils.startLoading(profilePopupButton);
        api.patchProfile({
            name: profileName.value,
            about: profileStatus.value
        })
            .then((data) => {
                profilePerson.textContent = data.name;
                profileJob.textContent = data.about;
                closePopup(profilePopup);
                    })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => { utils.stopLoading(profilePopupButton);
            });
    });

    avatarPopupForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      utils.startLoading(avatarPopupButton);
      api.patchAvatar(avatarPopupSubheading.value)
          .then((data) => {
              profileAvatar.src = avatarPopupSubheading.value;
              closePopup(avatarPopup);
            })
            .catch((err) => {
                console.log(err);
            })
          .finally(() => {
              utils.stopLoading(avatarPopupButton);
          });
  });


}

