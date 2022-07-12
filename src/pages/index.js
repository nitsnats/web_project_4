import "./../pages/index.css";
import "./../fonts/font.css";
import { elementList, editButtonProfile, addButtonProfile, popupEditProfile, popupInputName, popupInputDescription, popupAddCard, settings, popupChangeAvatar, avatar, popupDeleteCard} from "../utils/constants.js"
import { Card} from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { Section } from "../components/Section.js"
import { UserInfo } from "../components/UserInfo.js"

import { api} from "../utils/Api.js"


const userInfo = new UserInfo({
    nameSelector: ".profile__title", 
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image"
})


let userId

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userId = userData._id

        userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
        section.renderItems(cards)
})
    .catch(console.log)


// validators    
const editFormValidator = new FormValidator(settings, popupEditProfile)
const addCardFormValidator = new FormValidator(settings, popupAddCard)
const changeAvatarFormValidator = new FormValidator(settings, popupChangeAvatar)

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

// submit handlers of modals
const handleAddCardSubmit = (data) => {
    addCardPopup.changeText("saving...")  
    api.addCard(data["card-title"], data["card-link"])
    .then(res => {
        renderCard(res,                
              elementList
          );
        })
        .then(() => {
            addCardPopup.close()
        })
    .catch((err) => {
        console.log(err);
      })
    .finally(() =>{
        addCardPopup.changeText("Create")
    })    
}

const handleProfileFormSubmit = (data) => {
editProfilePopup.changeText("saving...")
    api.editProfile(data.Name, data.description)
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
    })
    .then(() => {
        editProfilePopup.close()
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() =>{
        editProfilePopup.changeText("Save")
    })
}


const handleAvatarSubmit = (data) => {
    avatarChangePopup.changeText("saving...")
    api.editAvatar(data["card-link"])
    .then(res => {
        userInfo.setUserAvatar(res.avatar)
    })
    .then(() => {
        avatarChangePopup.close()
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() =>{
        avatarChangePopup.changeText("Save")
    })
}

// instances of modals
const addCardPopup = new PopupWithForm(".popup_type_add-card", handleAddCardSubmit)
addCardPopup.setEventListeners()

const avatarChangePopup = new PopupWithForm(".popup_type_avatar-change", handleAvatarSubmit)
avatarChangePopup.setEventListeners()

const deleteCardPopup = new PopupWithForm(".popup_type_confirm-delete")
deleteCardPopup.setEventListeners()

const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", handleProfileFormSubmit)
editProfilePopup.setEventListeners()

const imagePopup = new PopupWithImage(".popup_type-preview")
imagePopup.setEventListeners()

const templateCardSelector = "#card-template"

const handleCardClick = (data) => {
    imagePopup.open(data.name, data.link)
}

const activateLikeButton = (card) => {
    if(card.isLiked()) {
        api.removeLike(card.getId())
       .then(res => {
        card.setLikes(res.likes)
    })
        .catch((err) => {
            console.log(err);
          })
    } else {
        api.addLike(card.getId())
       .then(res => {
        card.setLikes(res.likes)
        })
        .catch((err) => {
            console.log(err);
          })
    }
}     

const handleDeleteClick = (card) => {
    deleteCardPopup.open()
    //deleteCardPopup.resetValidation()

    deleteCardPopup.changeSubmitHandler(() => {
        deleteCardPopup.changeText("deleting...")
        api.deleteCard(card.getId())
          .then(() => {
            card.removeCard()
           })
           .then(() => {
            deleteCardPopup.close()
           })
           .catch((err) => {
            console.log(err);
          })
        .finally(() =>{
            deleteCardPopup.changeText("Yes")
        })
  })
}

const renderCard = (data) => {
    const card = new Card({
        data,
        userId,
        templateCardSelector,
        handleCardClick: () => handleCardClick(data), 
        activateLikeButton: () => activateLikeButton(card),
        handleDeleteClick: handleDeleteClick
    }
    )    
    section.addItem(card.getCardElement());
}

const section = new Section(
    {  
        renderer: renderCard 
    }, ".elements"
    )


function fillProfileForm() {
    const profileData = userInfo.getUserInfo()
    popupInputName.value = profileData.name;
    popupInputDescription.value = profileData.description;
}

function handleEditButtonClick() {
    fillProfileForm();
    editProfilePopup.open()
    //editProfilePopup.resetValidation()
}

function handleAddButtonClick() {
    addCardFormValidator.disableButton()
    addCardPopup.open()
    //addCardPopup.resetValidation()
}

function handleChangeAvatarClick() {
    changeAvatarFormValidator.disableButton()
    avatarChangePopup.open()
    //avatarChangePopup.resetValidation()
}


editButtonProfile.addEventListener("click", handleEditButtonClick);

addButtonProfile.addEventListener("click", handleAddButtonClick);

avatar.addEventListener("click", handleChangeAvatarClick);