import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(poupSelector, handlerSubmit) {
        super(poupSelector)

        this._handlerSubmit = handlerSubmit
        this._form = this._popup.querySelector(".popup__form")
    }

    _getInputValues() {
        const values = {}

        const inputs = [...this._form.querySelectorAll(".popup__input")]

        inputs.forEach((input) => {
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
            this._handlerSubmit(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._form.reset()
    }
}