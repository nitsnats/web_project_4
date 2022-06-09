import { popupImagePreview, popupImage, popupTitle} from "./index.js"
import { openPopup } from "./utils.js"

export class Card {
    constructor(data, templateCardSelector) { //{text,link}
        this._text = data.name; 
        this._link = data.link;
        this._templateCardSelector = templateCardSelector

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector(".element");
    }

    _activateLikeButton = evt => evt.target.classList.toggle("element__button-like_active");

    _handleDeletButton = () => {
        this._card.remove();
        this._card = null;
    }
    
    _openImagePreview = () => {
        popupImage.src = this._link;
        popupImage.alt = this._text;
        popupTitle.textContent = this._text;
        openPopup(popupImagePreview);
    };

    _addEventListeners = () => {
        this._likeButton.addEventListener("click", this._activateLikeButton);
        this._deleteButton.addEventListener("click", this._handleDeletButton);
        this._cardImage.addEventListener("click", () => this._openImagePreview(this.data));
    }

    getCardElement = () => {
        this._card = this._cardTemplate.cloneNode(true);

        this._likeButton = this._card.querySelector(".element__button-like");
        this._deleteButton = this._card.querySelector(".element__button-delete");
        this._cardImage = this._card.querySelector(".element__image");
        const cardTitle = this._card.querySelector(".element__title");

        cardTitle.textContent = this._text;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._text;
      
        this._addEventListeners();
        return this._card;
    }

}

