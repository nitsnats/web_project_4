export class Card {
    constructor({data, userId, templateCardSelector, handleCardClick, activateLikeButton, handleDeleteClick}) { //{text,link}
        this._text = data.name; 
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id

        this._templateCardSelector = templateCardSelector
        this._handleCardClick = handleCardClick
        this._activateLikeButton = activateLikeButton
        this._handleDeleteClick = handleDeleteClick

        this._cardTemplate = document.querySelector(templateCardSelector)
            .content.querySelector(".element");
            
    }

    //_activateLikeButton = evt => evt.target.classList.toggle("element__button-like_active");

    getId() {
        return this._id
    }

    removeCard() {
        this._card.remove();
        this._card = null;//
    }
    
    _setEventListeners = () => {
        this._likeButton.addEventListener("click", () => this._activateLikeButton());
        this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this));
        this._cardImage.addEventListener("click", () => this._handleCardClick(this._text, this._link));//(this.data)
    }

    setLikes(newLikes) {
        this._likes = newLikes

        const likeCounter = this._card.querySelector(".element__likes-count");
        likeCounter.textContent = this._likes.length;

        // const likeCounter = this._likes.length;
        // this._likesCounter.querySelector(".element__likes-count").textContent = likeCounter;
        
        const cardIsLikedByUser = this.isLiked()

        if (cardIsLikedByUser) {
            this._likeButton.classList.add("element__button-like_active");
        } else {
            this._likeButton.classList.remove("element__button-like_active");
        }
    }

    isLiked() {
       return this._likes.find(user => user._id === this._userId) 
    }

    getCardElement = () => {
        this._card = this._cardTemplate.cloneNode(true);

        this._likeButton = this._card.querySelector(".element__button-like");
        this._deleteButton = this._card.querySelector(".element__button-delete");
        this._cardImage = this._card.querySelector(".element__image");
        const cardTitle = this._card.querySelector(".element__title");

        this._likesCounter = this._card.querySelector(".element__likes-count");

        cardTitle.textContent = this._text;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._text;
             
        this._setEventListeners();

        this.setLikes(this._likes)

        if(this._userId !== this._ownerId) {
            this._likeButton.style.display = "none"
        }
         
        return this._card;
    }

}

