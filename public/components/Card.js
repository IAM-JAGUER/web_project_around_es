export class Card {
    constructor(data, cardSelector, currentUserId, handlers) {
        this._cardElement = null;
        this._likeButton = null;
        this._data = data;
        this._cardSelector = cardSelector;
        this._currentUserId = currentUserId;
        this._handlers = handlers;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector);
        const cardElement = cardTemplate.content.querySelector(".card");
        return cardElement.cloneNode(true);
    }
    _isOwnCard() {
        return this._data.owner === this._currentUserId;
    }
    _updateLikeState() {
        this._likeButton?.classList.toggle("card__like-button_is-active", this._data.isLiked);
    }
    _setEventListeners(cardImage, likeButton, deleteButton) {
        likeButton.addEventListener("click", () => {
            this._handlers.handleLikeClick(this);
        });
        cardImage.addEventListener("click", () => {
            this._handlers.handleImageClick(this._data);
        });
        if (this._isOwnCard()) {
            deleteButton.addEventListener("click", () => {
                this._handlers.handleDeleteClick(this);
            });
        }
        else {
            deleteButton.remove();
        }
    }
    generateCard() {
        const cardElement = this._getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        this._cardElement = cardElement;
        this._likeButton = likeButton;
        this._updateLikeState();
        this._setEventListeners(cardImage, likeButton, deleteButton);
        return cardElement;
    }
    getCardId() {
        return this._data._id;
    }
    getLikeState() {
        return this._data.isLiked;
    }
    setLikeState(isLiked) {
        this._data.isLiked = isLiked;
        this._updateLikeState();
    }
    remove() {
        this._cardElement?.remove();
        this._cardElement = null;
        this._likeButton = null;
    }
}
