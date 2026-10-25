function reserveErrorSpace(inputElement, errorElement) {
  const fieldElement = inputElement.closest(".popup__field");

  fieldElement.classList.add("popup__field_with_error");
  fieldElement.style.setProperty(
    "--error-height",
    `${errorElement.offsetHeight}px`
  );
}

function clearErrorSpace(inputElement) {
  const fieldElement = inputElement.closest(".popup__field");

  fieldElement.classList.remove("popup__field_with_error");
  fieldElement.style.removeProperty("--error-height");
}

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("popup__error_visible");
  reserveErrorSpace(inputElement, errorElement);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
  clearErrorSpace(inputElement);
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  const isInvalid = hasInvalidInput(inputList);

  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle("popup__button_disabled", isInvalid);
}

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

export function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}
