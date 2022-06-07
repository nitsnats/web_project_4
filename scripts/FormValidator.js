class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings
        this._formElement = formElement
    }

    _showInputError = (inputElement) => {
        const { inputErrorClass, errorClass} = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorClass);
    };
      
    _hideInputError = (inputElement) => {
        const { inputErrorClass, errorClass} = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
    };

    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement, this._settings);
        }
    };

      
    _setEventListeners = () => {
        const { inputSelector } = this._settings

        this.inputList = [...this._formElement.querySelectorAll(inputSelector)];
      
        this._toggleButtonState(); //toggle submit
        inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement); //check validity
            this._toggleButtonState(); //toggle submit
          });
        });
    };

    _hasInvalidInput = () => this.inputList.every(inputElement => inputElement.validity.valid);
    
    _disableButton(buttonElement) {
        const { inactiveButtonClass } = this._settings;
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
      }
      
    _enableButton(buttonElement) {
        const { inactiveButtonClass } = this._settings;
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
      }

    _toggleButtonState = () => {
        const buttonElement = this._formElement.querySelector(submitButtonSelector);

        if (hasInvalidInput()) {
               this._enableButton(buttonElement);
        } else {
               this._disableButton(buttonElement);
         }
    };
      
    resetValidation() {
        this.inputList.forEach(input => {
            this._hideInputError(input)
        })
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        
            this._setEventListeners(_formElement, inputFields, config);
          };
    

}

export default FormValidator
// const setting = {
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__save",
//     inactiveButtonClass: "popup__save_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible",
//   }


// const editForm = document.querySelector(".popup__form")
// const addCardForm = document.querySelector(".popup__form")

// const editFormValidator = new FormValidator(setting, editForm)
// const addCardFormValidator = new FormValidator(setting, addCardForm)