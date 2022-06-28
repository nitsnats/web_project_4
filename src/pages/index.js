import "./../pages/index.css";
import "./../fonts/font.css";
import { initialCards, elementList, editButtonProfile, addButtonProfile, popupEditProfile, popupInputName, popupInputDescription, popupAddCard, settings} from "../utils/constants.js"
import { Card} from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { Section } from "../components/Section.js"
import { UserInfo } from "../components/UserInfo.js"


const editFormValidator = new FormValidator(settings, popupEditProfile)
const addCardFormValidator = new FormValidator(settings, popupAddCard)

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const handleAddCardSubmit = (data) => {   
    renderCard( 
      {
        name: data["card-title"],
        link: data["card-link"],
      },    
        elementList
    );
        
    addCardPopup.close()
    addCardFormValidator.disableButton()
}

const handleProfileFormSubmit = (data) => {
    userInfo.setUserInfo(data.Name, data.description)
    
    editProfilePopup.close()
    //addCardFormValidator.disableButton()
}

const addCardPopup = new PopupWithForm(".popup_type_add-card", handleAddCardSubmit)
addCardPopup.setEventListeners()

const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", handleProfileFormSubmit)
editProfilePopup.setEventListeners()

const imagePopup = new PopupWithImage(".popup_type-preview")
imagePopup.setEventListeners()

const templateCardSelector = "#card-template"

const renderCard = (cardData, elementList) => {
    const card = new Card(cardData, templateCardSelector, (name, link) => {
        imagePopup.open(name, link)
    })    
    section.addItem(card.getCardElement());
}

const section = new Section({ items: initialCards, renderer: renderCard }, ".elements")

section.renderItems()

const userInfo = new UserInfo({
    nameSelector: ".profile__title", 
    jobSelector: ".profile__description",
})


function fillProfileForm() {
    const profileData = userInfo.getUserInfo()
    popupInputName.value = profileData.name;
    popupInputDescription.value = profileData.description;
}

function handleEditButtonClick() {
    fillProfileForm();
    editProfilePopup.open()
}

function handleAddButtonClick() {
    addCardFormValidator.disableButton()
    addCardPopup.open()
    
}

// const allCloseButtons = document.querySelectorAll(".popup__close");

// allCloseButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

editButtonProfile.addEventListener("click", handleEditButtonClick);

addButtonProfile.addEventListener("click", handleAddButtonClick);