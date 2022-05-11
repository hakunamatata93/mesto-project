import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import Section from './components/Section';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import Validator from './components/Validator';
import {loading} from './components/utils.js';
import {
    config,
    editProfileButton,
    addButton,
    editAvatar,
    nameInput,
    jobInput,
    validationConfig,
    userSelectors,
    formSelectors
} from './components/constants';


function handleCardClick(card) {
  bigPicturePopup.open(card);
}

function handleDeleteClick(card) {
  api.deleteCard(card.getCardId())
  .then(() => {
  card.removeCard();
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  })
}

function toggleLike(card) {
  if (!card.isLiked()) {
    api.putLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  } else {
    api.deleteLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  }
}
//экземпляры
const api = new Api(config);

const userInfo = new UserInfo(
    userSelectors.profileName,
    userSelectors.profileJob,
    userSelectors.ProfileAvatar
);
//валидация
const editProfileValidator = new Validator(
    validationConfig,
    formSelectors.editProfileForm
);
const addCardValidator = new Validator(
    validationConfig,
    formSelectors.addCardForm
);
const editAvatarValidator = new Validator(
    validationConfig,
    formSelectors.editAvatarForm
);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

const cardList = new Section({
    renderer:(item) =>{
        const card = new Card({
            data: item,
            handleCardClick,
            handleDeleteClick,
            toggleLike,
            selector: '#elements__template',
            userId: userInfo.getUserInfo().userId
        });
    return card.generate();
    },
},
'.elements__list'
);

const bigPicturePopup = new PopupWithImage('.popup__big-picture');
bigPicturePopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector:'.popup__profile',
  handleFormSubmit:(data)=>{
    loading('.popup__profile', true),
    api.patchProfile(data.name, data.about)
    .then(userData =>{
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err)=>{
      console.log(`Error: ${err}`);
    })
    .finally(()=>{
      loading('.popup__profile', false)
    })
  }
})
editProfilePopup.setEventListeners();
const editAvatarPopup = new PopupWithForm({
  popupSelector:'.popup__avatar',
  handleFormSubmit:(data) => {
      loading('.popup__avatar', true),
      api.patchAvatar(data.url)
      .then(userData => {
          userInfo.setUserInfo(userData);
          editAvatarPopup.close();
      })
      .catch((err)=>{
          console.log(`Error: ${err}`);
      })
      .finally(()=>{
          loading('.popup__avatar', false)
      })
  }
})
editAvatarPopup.setEventListeners();
const  addCardPopup = new PopupWithForm({
  popupSelector:'.popup__addplace',
  handleFormSubmit:(data) => {
      loading('.popup__addplace', true),
      api.postNewCard(data.name, data.link)
      .then(userData => {
      userInfo.setUserInfo(userData);
      addCardPopup.close();
      })
      .catch((err)=>{
      console.log(`Error: ${err}`);
      })
  .finally(()=>{
      loading('.popup__addplace', false)
  })
  }
})
addCardPopup.setEventListeners();


editProfileButton.addEventListener('click', () => {
  editProfilePopup.open();

  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.about;
});

addButton.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

editAvatar.addEventListener('click', () => {
  editAvatarValidator.resetValidation();
  editAvatarPopup.open();
});

api.getAppInfo().then(([userData, cardData]) => {
  userInfo.setUserInfo(userData);
  cardList.renderItems(cardData.reverse());
})
.catch((err) => {
  console.log(`Error: ${err}`);
})
