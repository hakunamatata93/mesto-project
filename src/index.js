
import './styles/index.css';
import * as cards from './components/cards';
import * as validator from './components/validate';
cards.initializeCards();
validator.enableValidation(validator.validationConfig);



