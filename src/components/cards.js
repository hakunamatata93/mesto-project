import * as modal from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  const elements = document.querySelector('.elements__list');
  const template = document.querySelector('#elements__template');
  const profileName = document.querySelector('.profile__name');
  const profileStatus = document.querySelector('.profile__status');



function createCard(item) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__image');
    img.src = item.link;
    img.alt = item.name;
    clone.querySelector('.elements__description').textContent = item.name;

    clone.querySelector('.elements__group').addEventListener('click', function (evt) {
        evt.currentTarget.classList.toggle('elements__group_active');
    });
    img.addEventListener('click', function () {
        modal.openPopup(modal.bigPicturePopup);
        modal.bigPictureImage.src = item.link;
        modal.bigPictureImage.alt = item.name;
        modal.bigPictureSubtitle.textContent = item.name;
    });

    clone.querySelector('.elements__delete').addEventListener('click', function (evt) {
        elements.removeChild(evt.currentTarget.closest('.elements__item'));
    });
    return clone;
}

function createElement(item) {
    elements.prepend(createCard(item));
}

function drawElements() {
    const elementsItem = document.createDocumentFragment();
    initialCards.forEach(item => elementsItem.append(createCard(item)));
    elements.prepend(elementsItem);
}

export function initializeCards() {
    drawElements();
    modal.subscribePopupToEvents(createElement, profileName, profileStatus);
}
