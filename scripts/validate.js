const showInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, settings);
  } else {
    showInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
         enableButton(buttonElement, settings);
  } else {
         disableButton(buttonElement, settings);
   }
};

function disableButton(buttonElement, settings) {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.disableButtonClass);
}

function enableButton(buttonElement, settings) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(settings.disableButtonClass);
}

const setEventListeners = (formElement, inputElements, settings) => {
  const inputList = [...formElement.querySelectorAll(settings.inputSelector)];
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings); //toggle submit
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings); //check validity
      toggleButtonState(inputList, buttonElement, settings); //toggle submit
    });
  });
};

const enableValidation = (config) => {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );

  formElements.forEach((formElement) => {
    const inputFields = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    setEventListeners(formElement, inputFields, config);
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
