
import './styles/index.css';
import * as cards from './components/cards';
import * as validator from './components/validate';
export let userId;
cards.initialize();
validator.enableValidation(validator.validationConfig);


