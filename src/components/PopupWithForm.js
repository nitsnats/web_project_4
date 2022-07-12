import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(poupSelector, handlerSubmit) {
        super(poupSelector)

        this._handlerSubmit = handlerSubmit
        this._form = this._popup.querySelector(".popup__form")
    
        this._submitButton = this._form.querySelector(".popup__save")
        this._initialButtonText = this._submitButton.textContent
        this._inputs = [...this._form.querySelectorAll(".popup__input")]
    }

    _getInputValues() {
        const values = {}

        this._inputs.forEach((input) => {
            const key = input.name
            const value = input.value
        
            values[key] = value
        })

        return values
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener("submit", (e) => {
            e.preventDefault()
            this._handlerSubmit(this._getInputValues());
            //this.close();
        })
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handlerSubmit = newSubmitHandler;
    }

    // changeText(textType) {// inital Loading
    //     //const button = this._form.querySelector(".popup__save")
        
    //     //button.textContent = text

    //     if(textType === "saving") {
    //         this._submitButton.textContent = "Saving..."
    //     }

    //     if(textType === "initial") {
    //         this._submitButton.textContent = this._initialButtonText
    //     }
    // }
    
    changeText(text) {
        this._submitButton.textContent = text
    }

    close() {
        super.close()
        this._form.reset()
    }
}