const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input[name = name]');
const statusInput = popup.querySelector('.popup__input[name = status]');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status')
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

const elementsTemplate = document.querySelector('#elements__template').content;
const elementsList = document.querySelector('.elements__list');



function openPopup(){
  nameInput.value = profileName.textContent.trim();
  statusInput.value = profileStatus.textContent.trim();
  popup.classList.add('popup_active');
};

function closePopup(){
  popup.classList.remove('popup_active');
};

function formSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup();
}

editButton.addEventListener('click', function(){
  openPopup();
})

closeButton.addEventListener('click', function(){
  closePopup();
})
popupForm.addEventListener('submit', formSubmit);

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

  initialCards.forEach((element)=>{
    elementsList.append(createElements(element));
  })

  function createElements(element){
    const newElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
    const elementDescription = newElement.querySelector('.elements__description');
    elementDescription.textContent = element.name;
    const elementImage = newElement.querySelector('.elements__image');
    elementImage.src = element.link;
    elementImage.alt = element.name;
    newElement.querySelector('.elements__group').addEventListener('click', likeElement);
    newElement.querySelector('.elements__delete').addEventListener('click', deleteElement);

    return newElement;

  }

  function likeElement(evt){
    evt.target.classList.add('elements__group_active');
  }

  function deleteElement(evt){
    evt.target.closest('.elements__item').remove();
  }
