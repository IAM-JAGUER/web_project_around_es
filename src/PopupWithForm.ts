import { Popup } from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;

export class PopupWithForm extends Popup {
  private readonly _formElement: HTMLFormElement;
  private readonly _handleFormSubmit: FormSubmitHandler;
  private readonly _handleSubmit = (evt: SubmitEvent): void => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  constructor(selector: string, handleFormSubmit: FormSubmitHandler) {
    super(selector);
    this._formElement =
      this._popupElement.querySelector<HTMLFormElement>(".popup__form")!;
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

  public setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmit);
  }

  public close(): void {
    this._formElement.reset();
    super.close();
  }
}
