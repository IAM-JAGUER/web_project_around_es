import { Popup } from "./Popup.js";

export type ConfirmationHandler = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
  private readonly _formElement: HTMLFormElement;
  private _confirmationHandler: ConfirmationHandler | null = null;
  private _isSubmitting = false;
  private readonly _handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();

    if (this._isSubmitting || !this._confirmationHandler) {
      return;
    }

    this._isSubmitting = true;

    void Promise.resolve()
      .then(() => this._confirmationHandler?.())
      .finally(() => {
        this._isSubmitting = false;
      });
  };

  constructor(selector: string) {
    super(selector);
    this._formElement =
      this._popupElement.querySelector<HTMLFormElement>(".popup__form")!;
  }

  public setConfirmationHandler(handler: ConfirmationHandler): void {
    this._confirmationHandler = handler;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmit);
  }
}
