export interface CardData {
  name: string;
  link: string;
}

export type CardClickHandler = (data: CardData) => void;

export class Card {
  private readonly _data: CardData;
  private readonly _cardSelector: string;
  private readonly _handleCardClick: CardClickHandler;

  constructor(
    data: CardData,
    cardSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  private _getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector<HTMLTemplateElement>(
      this._cardSelector,
    )!;
    const cardElement =
      cardTemplate.content.querySelector<HTMLElement>(".card");

    return cardElement!.cloneNode(true) as HTMLElement;
  }

  private _setEventListeners(cardElement: HTMLElement): void {
    const likeButton =
      cardElement.querySelector<HTMLButtonElement>(".card__like-button")!;
    const deleteButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    )!;
    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image")!;

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

  public generateCard(): HTMLElement {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector<HTMLElement>(".card__title")!;
    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image")!;

    cardTitle.textContent = this._data.name;
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._setEventListeners(cardElement);

    return cardElement;
  }
}
