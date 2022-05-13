const showInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
    
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      button.disabled = "disabled";
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      button.disabled = false;
    }
  };
  
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, settings);
        
        
      });
    });
  };
  
  const enableValidation = (settings) => {
    
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
  
      const fieldsetList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset, settings);
    });
      });
    });
  };
  
  const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }

  enableValidation(config);

  
  