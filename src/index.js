import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import Section from './components/Section';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import Validator from './components/Validator';
import {startLoading, stopLoading} from './components/utils';
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

//экземпляры
const api = new Api(config);

const userInfo = new UserInfo(
    userSelectors.profileName,
    userSelectors.profileJob,
    userSelectors.ProfileAvatar
);
//валидация
const editProfilealidator = new Validator(
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
editProfilealidator.enableValidation();
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
    startLoading('popup__profile'),
    api.patchProfile(data.profileName, data.profileJob)
    .then(userData =>{
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err)=>{
      console.log(`Error: ${err}`);
    })
    .finally(()=>{
      stopLoading('.popup__profile')
    })
  }
})

const editAvatarPopup = new PopupWithForm({
  popupSelector:'.popup__avatar',
  handleFormSubmit:(data) => {
      startLoading('.popup__avatar'),
      api.patchAvatar(data.url)
      .then(userData => {
          userInfo.setUserInfo(userData);
          editAvatarPopup.close();
      })
      .catch((err)=>{
          console.log(`Error: ${err}`);
      })
      .finally(()=>{
          stopLoading('.popup__avatar')
      })
  }
})

const  addCardPopup = new PopupWithForm({
  popupSelector:'.popup__addplace',
  handleFormSubmit:(data) => {
      startLoading('.popup__addplace'),
      api.postNewCard(data.name, data.link)
      .then(userData => {
      userInfo.setUserInfo(userData);
      addCardPopup.close();
      })
      .catch((err)=>{
      console.log(`Error: ${err}`);
      })
  .finally(()=>{
      stopLoading('.popup__addplace')
  })
  }
})