const showInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    console.log(inputElement.validationMessage);
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
    debugger;
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, settings);
    } else {
        showInputError(formElement, inputElement, settings);
    }

    return inputElement.validity.valid;
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = 'disabled';
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, inputElements, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            const isValid = inputElements.every((input) => {
                const result = checkInputValidity(formElement, input, settings);
                return result;
            });
            if (isValid) {
                toggleButtonState(inputElements, buttonElement, settings);
            }
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
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

enableValidation(config);
console.log('validate');
