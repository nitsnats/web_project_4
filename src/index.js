import "./styles/index.css";
import "./fonts/font.css";
import { initialCards, popups, forms, elementList, cardTemplate, editButtonProfile, addButtonProfile, popupEditProfile, popupInputName, popupInputDescription, popupAddCard, popupImagePreview, popupImage, popupTitle, settings} from "../src/scripts/constants.js"
import { Card} from "../src/scripts/Card.js"
import FormValidator from "../src/scripts/FormValidator.js";
import { openPopup, closePopup, } from "../src/scripts/utils.js"
import { PopupWithForm } from "../src/scripts/PopupWithForm.js"
import { PopupWithImage } from "../src/scripts/PopupWithImage.js"
import { Section } from "../src/scripts/Section.js"
import { UserInfo } from "../src/scripts/UserInfo.js"


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
}

const handleProfileFormSubmit = (data) => {
    userInfo.setUserInfo(data.Name, data.description)
    
    editProfilePopup.close()
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
    addCardPopup.open()
}

const allCloseButtons = document.querySelectorAll(".popup__close");

allCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButtonProfile.addEventListener("click", handleEditButtonClick);

addButtonProfile.addEventListener("click", handleAddButtonClick);