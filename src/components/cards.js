import * as modal from './modal.js';
import { userId } from "../index.js"
import * as api from "./Api.js"
/*const initialCards = [
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
  ];*/



  const elements = document.querySelector('.elements__list');
  const template = document.querySelector('#elements__template');
  const profileName = document.querySelector('.profile__name');
  const profileStatus = document.querySelector('.profile__status');
  const profileAvatar = document.querySelector('.profile__avatar');


  const handleLikes = (cardJSON, likes, evt) => {
    likes.textContent = cardJSON.likes.length;
    evt.target.classList.toggle('elements__group_active');
}

const getCardId = (el) => {
    return el.closest('.elements__item').querySelector('.elements__image').id.replace('_','');
}


function createCard(data) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__image');
    const likesCounter = clone.querySelector('.elements__counter');
    img.src = data.link;
    img.alt = data.name;
    img.id = '_' + data._id;
    likesCounter.textContent = data.likes.length;
    clone.querySelector('.elements__description').textContent = data.name;

    clone.querySelector('.elements__group').addEventListener('click',
    function (evt) {
        if (evt.target.classList.contains('elements__group_active'))
            api.deleteLike(getCardId(evt.target))
                .then((cardJSON) => handleLikes(cardJSON, likesCounter, evt))
                .catch((err) => {
                  console.log(err);
              });
        else
            api.putLike(getCardId(evt.target))
                .then((cardJSON) => handleLikes(cardJSON, likesCounter, evt))
                .catch((err) => {
                  console.log(err);
              });
    });
    img.addEventListener('click', function () {
        modal.openPopup(modal.bigPicturePopup);
        modal.bigPictureImage.src = data.link;
        modal.bigPictureImage.alt = data.name;
        modal.bigPictureSubtitle.textContent = data.name;
    });

    const deleteButton = clone.querySelector('.elements__delete');
    deleteButton.addEventListener('click', (evt)=> {
        api.deleteCard(data._id)
        .then(elements.removeChild(evt.currentTarget.closest('.elements__item')))
        .catch((err) => {
          console.log(err);
      });
    });

    if (data.owner._id != profileName.id) {
      deleteButton.classList.add('elements__delete_type_hidden');
  }

  const likeButton = clone.querySelector('.elements__group');
  if (data.likes.some(e => e._id === profileName.id)) {
      likeButton.classList.add('elements__group_active');
  }

    return clone;
}

function createElement(item) {
  return api.postNewCard({
    name: item.name,
    link: item.link
})
    .then((data) => {
        elements.prepend(createCard(data));
      })
      .catch((err) => {
          console.log(err);
    });
}

const profileData = () => {
  Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
          profileName.textContent = userData.name;
          profileStatus.textContent = userData.about;
          profileAvatar.src = userData.avatar;
          profileName.id = userData._id;

          const documentFragment = document.createDocumentFragment();
          cards.forEach(item => documentFragment.append(createCard(item)));
          elements.prepend(documentFragment);

      })
      .catch(err => {
          console.log(err);
      });
}





export const initialize = () => {
  profileData();
  modal.subscribePopupToEvents(createElement, profileName, profileStatus, profileAvatar);
}
