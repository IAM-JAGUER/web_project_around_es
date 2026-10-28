export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector);
        const cardElement = cardTemplate.content.querySelector(".card");
        return cardElement.cloneNode(true);
    }
    _setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", () => {
            cardElement.remove();
        });
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._data);
        });
    }
    generateCard() {
        const cardElement = this._getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        this._setEventListeners(cardElement);
        return cardElement;
    }
}
