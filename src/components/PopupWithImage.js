import Popup from 'popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector('.big-picture__image')
        this._title = this._popup.querySelector('.big-picture__alt')
    }

    open(){
        super.open();
        this._title.textContent = card.title;
        this._image.alt = card.title;
        this._image.src = card.image;
    }
}
