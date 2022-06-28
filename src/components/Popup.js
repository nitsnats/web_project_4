export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
         this.close()
        }
    }

    open() {
        this._popup.classList.add("popup__opened");
        this.addKeyDownListener();
    }

    addKeyDownListener() {
        window.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup__opened");
        this.removeKeyDownListener();
    }

    removeKeyDownListener() {
        window.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {

            this._popup.addEventListener("mousedown", (evt) => {
                if (evt.target.matches(".popup") || evt.target.matches(".popup__close")) {
                    this.close();
                }
            });
       
    }
   
}