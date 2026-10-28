import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleSubmit = (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        };
        this._formElement =
            this._popupElement.querySelector(".popup__form");
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
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }
    close() {
        this._formElement.reset();
        super.close();
    }
}
