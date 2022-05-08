import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import Section from './components/Section';
import PopupWithForm from './components/popupWithForm';
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