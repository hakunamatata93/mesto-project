//Объявление переменных
const profilePopup = document.querySelector('.popup__profile');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input[name = name]');
const statusInput = document.querySelector('.popup__input[name = status]');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status')
const editButton = profile.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const addPlaceButton = profile.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup__addplace');
const elementsTemplate = document.querySelector('#elements__template').content;
const elementsList = document.querySelector('.elements__list');
const bigPopup = document.querySelector(".popup__big-picture");
const newPlace = document.querySelector('#inputPlaceName');
const newLink = document.querySelector('#inputPictureLink');
const bigImage = bigPopup.querySelector('.big-picture__image');
const bigImageCaption = bigPopup.querySelector('.big-picture__alt');



//Открытие-закрытие попапа
function openPopup(obj){
  obj.classList.add('popup_active');
}
function openAddPlacePopup(){
  openPopup(addPlacePopup);
}

function closePopup(popup){
  popup.classList.remove('popup_active');
}



function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(profilePopup);
}
//массив карт
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
  //отрисовка карт через template
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
    newElement.querySelector('.elements__image').addEventListener('click', showBigPicturePopup);
    newElement.querySelector('.elements__group').addEventListener('click', likeElement);
    newElement.querySelector('.elements__delete').addEventListener('click', deleteElement);

    return newElement;

  }
//like
  function likeElement(evt){
    evt.target.classList.toggle('elements__group_active');
  }
//удаление карточки
  function deleteElement(evt){
    evt.target.closest('.elements__item').remove();
  }
//добавление новой карточки
  function handleNewElementSubmit(evt){
    evt.preventDefault();
    const newCard = {name: newPlace.value, link: newLink.value};
    elementsList.prepend(createElements(newCard));
    newPlace.value = "";
    newLink.value = "";
    closePopup(addPlacePopup);

  }
//увеличение
  function showBigPicturePopup(evt){
    bigImage.src = evt.target.src;
    bigImage.alt = evt.target.alt;
    bigImageCaption.textContent = evt.target.alt;
    openPopup(bigPopup);
  }
  editButton.addEventListener('click', function(){
    openPopup(profilePopup);
    nameInput.value = profileName.textContent.trim();
    statusInput.value = profileStatus.textContent.trim();
  })

  closeButtons.forEach((button)=>{
    const popup = button.closest('.popup');
    button.addEventListener('click',()=>closePopup(popup));
  })
  popupForm.addEventListener('submit', handleProfileFormSubmit);
  addPlaceButton.addEventListener('click', openAddPlacePopup);
  addPlacePopup.addEventListener('submit', handleNewElementSubmit);
