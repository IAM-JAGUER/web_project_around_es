export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export type CardImageClickHandler = (data: CardData) => void;
export type CardActionHandler = (card: Card) => void;

export interface CardHandlers {
  handleImageClick: CardImageClickHandler;
  handleLikeClick: CardActionHandler;
  handleDeleteClick: CardActionHandler;
}

export class Card {
  private readonly _data: CardData;
  private readonly _cardSelector: string;
  private readonly _currentUserId: string;
  private readonly _handlers: CardHandlers;
  private _cardElement: HTMLElement | null = null;
  private _likeButton: HTMLButtonElement | null = null;

  constructor(
    data: CardData,
    cardSelector: string,
    currentUserId: string,
    handlers: CardHandlers,
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._currentUserId = currentUserId;
    this._handlers = handlers;
  }

  private _getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector<HTMLTemplateElement>(
      this._cardSelector,
    )!;
    const cardElement =
      cardTemplate.content.querySelector<HTMLElement>(".card");

    return cardElement!.cloneNode(true) as HTMLElement;
  }

  private _isOwnCard(): boolean {
    return this._data.owner === this._currentUserId;
  }

  private _updateLikeState(): void {
    this._likeButton?.classList.toggle(
      "card__like-button_is-active",
      this._data.isLiked,
    );
  }

  private _setEventListeners(
    cardImage: HTMLImageElement,
    likeButton: HTMLButtonElement,
    deleteButton: HTMLButtonElement,
  ): void {
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
    } else {
      deleteButton.remove();
    }
  }

  public generateCard(): HTMLElement {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector<HTMLElement>(".card__title")!;
    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image")!;
    const likeButton =
      cardElement.querySelector<HTMLButtonElement>(".card__like-button")!;
    const deleteButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    )!;

    cardTitle.textContent = this._data.name;
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;

    this._cardElement = cardElement;
    this._likeButton = likeButton;
    this._updateLikeState();
    this._setEventListeners(cardImage, likeButton, deleteButton);

    return cardElement;
  }

  public getCardId(): string {
    return this._data._id;
  }

  public getLikeState(): boolean {
    return this._data.isLiked;
  }

  public setLikeState(isLiked: boolean): void {
    this._data.isLiked = isLiked;
    this._updateLikeState();
  }

  public remove(): void {
    this._cardElement?.remove();
    this._cardElement = null;
    this._likeButton = null;
  }
}
