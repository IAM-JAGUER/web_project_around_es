import { Popup } from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void | Promise<void>;

const SUBMIT_LOADING_TEXT = "Guardando...";

export class PopupWithForm extends Popup {
  private readonly _formElement: HTMLFormElement;
  private readonly _submitButton: HTMLButtonElement;
  private readonly _submitButtonText: string;
  private readonly _handleFormSubmit: FormSubmitHandler;
  private readonly _handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();

    const values = this._getInputValues();
    this._setSubmitting(true);

    void Promise.resolve()
      .then(() => this._handleFormSubmit(values))
      .finally(() => {
        this._setSubmitting(false);
      });
  };

  constructor(selector: string, handleFormSubmit: FormSubmitHandler) {
    super(selector);
    this._formElement =
      this._popupElement.querySelector<HTMLFormElement>(".popup__form")!;
    this._submitButton =
      this._formElement.querySelector<HTMLButtonElement>(".popup__button")!;
    this._submitButtonText = this._submitButton.textContent?.trim() ?? "";
    this._handleFormSubmit = handleFormSubmit;
  }

  private _getInputValues(): FormValues {
    const values: FormValues = {};
    const inputElements =
      this._formElement.querySelectorAll<HTMLInputElement>(".popup__input");

    inputElements.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  }

  private _setSubmitting(isSubmitting: boolean): void {
    this._submitButton.disabled = isSubmitting;
    this._submitButton.textContent = isSubmitting
      ? SUBMIT_LOADING_TEXT
      : this._submitButtonText;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmit);
  }

  public close(): void {
    this._formElement.reset();
    super.close();
  }
}
