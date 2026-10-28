import { Popup } from "./Popup.js";

export interface ImagePopupData {
  name: string;
  link: string;
}

export class PopupWithImage extends Popup {
  private readonly _imageElement: HTMLImageElement;
  private readonly _captionElement: HTMLElement;

  constructor(selector: string) {
    super(selector);
    this._imageElement =
      this._popupElement.querySelector<HTMLImageElement>(".popup__image")!;
    this._captionElement =
      this._popupElement.querySelector<HTMLElement>(".popup__caption")!;
  }

  public open(): void;
  public open(data: ImagePopupData): void;
  public open(data?: ImagePopupData): void {
    if (data) {
      this._imageElement.src = data.link;
      this._imageElement.alt = data.name;
      this._captionElement.textContent = data.name;
    }

    super.open();
  }
}
