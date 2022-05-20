export default class Card {
    constructor({
      data,
      handleCardClick,
      handleDeleteClick,
      toggleLike,
      selector,
      userId
    }) {
      this._cardData = data;
      this._likes = data.likes;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._toggleLike = toggleLike;
      this._userId = userId;
    }

    generate() {
      this._element = this._getElement();
      this._cardImage = this._element.querySelector('.elements__image');
      this._cardTitle = this._element.querySelector('.elements__description');
      this._like = this._element.querySelector('.elements__group');
      this._deleteButton = this._element.querySelector('.elements__delete');
      this._likeCounter = this._element.querySelector('.elements__counter');

      this._cardImage.src = this._cardData.link;
      this._cardImage.alt = this._cardData.name;
      this._cardTitle.textContent = this._cardData.name;

      this._updateLikesView();
      this._showDeleteButton();
      this._setEventListeners();

      return this._element;
    }

    getCardId() {
      return this._cardData._id;
    }

    removeCard() {
      this._element.remove();
      this._element = null;
    }


    isLiked() {
      return Boolean(this._likes.find(user => user._id === this._userId));
    }


    updateLikes(cardData) {
      this._likes = cardData.likes;
      this._updateLikesView();
  }

    _updateLikesView() {
      this._likeCounter.textContent = this._likes.length;


      if (this.isLiked()) {
          this._like.classList.add('elements__group_active');
      } else {
          this._like.classList.remove('elements__group_active');
      }
    }

    _showDeleteButton() {
      if (this._cardData.owner._id !== this._userId) {
        this._deleteButton.remove();
      }
    }

    _getElement() {
      const templateCard = document.querySelector(this._selector);
      return templateCard.content
        .querySelector('.elements__item')
        .cloneNode(true);
    }

    _setEventListeners() {
      this._cardImage.addEventListener('click', () => this._handleCardClick({
        image: this._cardImage.src,
        title: this._cardTitle.textContent,
        })
      )

      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this);
      })

      this._like.addEventListener('click', () => {
        this._toggleLike(this);
      })
    }
  }
