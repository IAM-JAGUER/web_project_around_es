export class Popup {
  protected readonly _popupElement: HTMLElement;
  private readonly _handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  constructor(selector: string) {
    this._popupElement = document.querySelector<HTMLElement>(selector)!;
  }

  public open(): void {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton =
      this._popupElement.querySelector<HTMLButtonElement>(".popup__close");

    closeButton?.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
