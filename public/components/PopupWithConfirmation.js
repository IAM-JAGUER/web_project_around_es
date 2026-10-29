import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmationHandler = null;
        this._isSubmitting = false;
        this._handleSubmit = (evt) => {
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
        this._formElement =
            this._popupElement.querySelector(".popup__form");
    }
    setConfirmationHandler(handler) {
        this._confirmationHandler = handler;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }
}
