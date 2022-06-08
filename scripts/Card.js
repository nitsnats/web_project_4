import { openPopup, popupImagePreview, popupImage, popupTitle} from "./utils.js"

export class Card {
    constructor(data, templateCardSelector) { //{text,link}
        this._data = data
        this._templateCardSelector = templateCardSelector

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector(".element");
    }

    _activateLikeButton = evt => evt.target.classList.toggle("element__button-like_active");

    _handleDeletButton = () => this._card.remove();
    
    _openImagePreview = () => {
        popupImage.src = this._data.link;
        popupImage.alt = this._data.text;
        popupTitle.textContent = this._data.text;
        openPopup(popupImagePreview);
    };

    _addEventListeners = () => {
        
        
        this._likeButton.addEventListener("click", this._activateLikeButton);
        this._deleteButton.addEventListener("click", this._handleDeletButton);
        this._cardImage.addEventListener("click", () => this._openImagePreview(cardData));
    }

    getCardElement = () => {
        this._card = this._cardTemplate.cloneNode(true);

        this._likeButton = this._card.querySelector(".element__button-like");
        this._deleteButton = this._card.querySelector(".element__button-delete");
        this._cardImage = this._card.querySelector(".element__image");
        this._cardTitle = this._card.querySelector(".element__title");

        this._cardTitle.textContent = this._data.text;
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.text;
      
        this._addEventListeners()
        return this._card;
    }

}


// function renderCard(cardData, elementList) {
//     elementList.prepend(cardData);
// }

// initialCards.forEach((cardData) => {
//     const newCard = createCardElement(cardData);
//     renderCard(newCard, elementList);
// });

