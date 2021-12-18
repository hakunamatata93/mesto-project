const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input[name = name]');
const statusInput = popup.querySelector('.popup__input[name = status]');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status')
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');


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

