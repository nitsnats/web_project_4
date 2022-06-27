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
        this._popup.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup__opened");
        this.removeKeyDownListener();
    }

    removeKeyDownListener() {
        this._popup.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        // this._popup.querySelector(".popup__close").addEventListener("click", () => {
        //     this.close()
        // })

        
            this._popup.addEventListener("mousedown", (evt) => {
                if (evt.target.matches(".popup")) {
                    this.close();
                }
            });
        
    }

   
}

// function openPopup(popupWindow) {
//     popupWindow.classList.add("popup__opened");
//     addKeyDownListener();
// }

// function addKeyDownListener() {
//     window.addEventListener("keydown", handleKeyDown);
// }

// function handleKeyDown(evt) {
//     if (evt.key === "Escape") {
//       const openedPopup = document.querySelector(".popup__opened");
//       openedPopup && closePopup(openedPopup)
//     }
// }

// function closePopup(popupWindow) {
//     popupWindow.classList.remove("popup__opened");
//     removeKeyDownListener();
// }

// function removeKeyDownListener() {
//     window.removeEventListener("keydown", handleKeyDown);
// }