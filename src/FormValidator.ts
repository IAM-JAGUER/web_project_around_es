export interface FormValidatorConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
  fieldSelector: string;
  fieldWithErrorClass: string;
  errorHeightProperty: string;
}

export class FormValidator {
  private readonly _config: FormValidatorConfig;
  private readonly _formElement: HTMLFormElement;
  private readonly _inputElements: HTMLInputElement[];
  private readonly _submitButton: HTMLButtonElement;

  constructor(config: FormValidatorConfig, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll<HTMLInputElement>(config.inputSelector),
    );
    this._submitButton = formElement.querySelector<HTMLButtonElement>(
      config.submitButtonSelector,
    )!;
  }

  private _getErrorElement(inputElement: HTMLInputElement): HTMLElement | null {
    return this._formElement.querySelector<HTMLElement>(
      `#${inputElement.id}-error`,
    );
  }

  private _reserveErrorSpace(
    inputElement: HTMLInputElement,
    errorElement: HTMLElement,
  ): void {
    const fieldElement = inputElement.closest<HTMLElement>(
      this._config.fieldSelector,
    );

    if (!fieldElement) {
      return;
    }

    fieldElement.classList.add(this._config.fieldWithErrorClass);
    fieldElement.style.setProperty(
      this._config.errorHeightProperty,
      `${errorElement.offsetHeight}px`,
    );
  }

  private _clearErrorSpace(inputElement: HTMLInputElement): void {
    const fieldElement = inputElement.closest<HTMLElement>(
      this._config.fieldSelector,
    );

    if (!fieldElement) {
      return;
    }

    fieldElement.classList.remove(this._config.fieldWithErrorClass);
    fieldElement.style.removeProperty(this._config.errorHeightProperty);
  }

  private _showInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._getErrorElement(inputElement);

    if (!errorElement) {
      return;
    }

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    this._reserveErrorSpace(inputElement, errorElement);
  }

  private _hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._getErrorElement(inputElement);

    if (!errorElement) {
      return;
    }

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
    this._clearErrorSpace(inputElement);
  }

  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  private _hasInvalidInput(): boolean {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid,
    );
  }

  private _toggleButtonState(): void {
    this._submitButton.disabled = this._hasInvalidInput();
    this._submitButton.classList.toggle(
      this._config.inactiveButtonClass,
      this._submitButton.disabled,
    );
  }

  private _setEventListeners(): void {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this._setEventListeners();
    this._toggleButtonState();
  }

  public resetValidation(): void {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}
