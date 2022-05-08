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
const userInfo = new UserInfo(config);
const card = new Card(config);

const section = new Section(config);
const popupWithForm = new PopupWithForm(config);
const popupWithImage = new PopupWithImage(config);
const validator = new Validator(config);

