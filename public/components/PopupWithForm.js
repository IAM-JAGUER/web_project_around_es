import { Popup } from "./Popup.js";
const SUBMIT_LOADING_TEXT = "Guardando...";
export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleSubmit = (evt) => {
            evt.preventDefault();
            const values = this._getInputValues();
            this._setSubmitting(true);
            void Promise.resolve()
                .then(() => this._handleFormSubmit(values))
                .finally(() => {
                this._setSubmitting(false);
            });
        };
        this._formElement =
            this._popupElement.querySelector(".popup__form");
        this._submitButton =
            this._formElement.querySelector(".popup__button");
        this._submitButtonText = this._submitButton.textContent?.trim() ?? "";
        this._handleFormSubmit = handleFormSubmit;
    }
    _getInputValues() {
        const values = {};
        const inputElements = this._formElement.querySelectorAll(".popup__input");
        inputElements.forEach((inputElement) => {
            values[inputElement.name] = inputElement.value;
        });
        return values;
    }
    _setSubmitting(isSubmitting) {
        this._submitButton.disabled = isSubmitting;
        this._submitButton.textContent = isSubmitting
            ? SUBMIT_LOADING_TEXT
            : this._submitButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }
    close() {
        this._formElement.reset();
        super.close();
    }
}
