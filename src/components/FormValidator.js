export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings
        this._formElement = formElement
        this._inputList = [...this._formElement.querySelectorAll(this._settings.inputSelector)];
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        
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

    _hasInvalidInput = () => this._inputList.every(inputElement => inputElement.validity.valid);

    
    disableButton() {
        const { inactiveButtonClass } = this._settings;
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(inactiveButtonClass);
      }
      
    _enableButton() {
        const { inactiveButtonClass } = this._settings;
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(inactiveButtonClass);
      }

    toggleButtonState = () => {
        
        if (this._hasInvalidInput()) {
               this._enableButton();
        } else {
               this.disableButton();
         }
    };

    _setEventListeners = () => {
        const { inputSelector } = this._settings
        //const buttonElement = this._formElement.querySelector(submitButtonSelector);
        
      
        this.toggleButtonState(); //toggle submit
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement); //check validity
            this.toggleButtonState(); //toggle submit
          });
        });
    };
    
    // resetValidation() {
    //   this._toggleButtonState(); 

    //   this._inputList.forEach((inputElement) => {
    //     this._hideError(inputElement) 
    //   });

    // }

    // resetValidation() {
    //     this.inputList.forEach(input => {
    //         this._hideInputError(input)
    //     })
    // }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        
            this._setEventListeners();
          };
    

}

export default FormValidator