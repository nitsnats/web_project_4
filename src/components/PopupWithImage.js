import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    // constructor(popupSelector) {
    //     super(popupSelector)

    // }

    open(name, link) {
        super.open()

        const caption = this._popup.querySelector(".popup__subtitle")
        const image = this._popup.querySelector(".popup__image")
        
        caption.textContent = name
        image.src = link
        image.alt = (` image of ${name}`)
        
    }
}