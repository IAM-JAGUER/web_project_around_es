export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._submitButton = formElement.querySelector(config.submitButtonSelector);
    }
    _getErrorElement(inputElement) {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }
    _reserveErrorSpace(inputElement, errorElement) {
        const fieldElement = inputElement.closest(this._config.fieldSelector);
        if (!fieldElement) {
            return;
        }
        fieldElement.classList.add(this._config.fieldWithErrorClass);
        fieldElement.style.setProperty(this._config.errorHeightProperty, `${errorElement.offsetHeight}px`);
    }
    _clearErrorSpace(inputElement) {
        const fieldElement = inputElement.closest(this._config.fieldSelector);
        if (!fieldElement) {
            return;
        }
        fieldElement.classList.remove(this._config.fieldWithErrorClass);
        fieldElement.style.removeProperty(this._config.errorHeightProperty);
    }
    _showInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        if (!errorElement) {
            return;
        }
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
        this._reserveErrorSpace(inputElement, errorElement);
    }
    _hideInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        if (!errorElement) {
            return;
        }
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass);
        this._clearErrorSpace(inputElement);
    }
    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        }
        else {
            this._showInputError(inputElement);
        }
    }
    _hasInvalidInput() {
        return this._inputElements.some((inputElement) => !inputElement.validity.valid);
    }
    _toggleButtonState() {
        this._submitButton.disabled = this._hasInvalidInput();
        this._submitButton.classList.toggle(this._config.inactiveButtonClass, this._submitButton.disabled);
    }
    _setEventListeners() {
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }
    resetValidation() {
        this._inputElements.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}
