import { Card} from "./Card.js"
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, } from "./utils.js"


const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

const popups = document.querySelectorAll(".popup");
const forms = document.querySelector(".popup__form");

const elementList = document.querySelector(".elements");
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".element");

//profile
const profileInfo = document.querySelector(".profile__info");
//profile model buttons
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");
//profile inputs
const profileTitle = profileInfo.querySelector(".profile__title_type_title");
const profileDescription = profileInfo.querySelector(
  ".profile__description_type_description"
);

//popup edit profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEditProfile.querySelector(".popup__form"); //forms
//popup edit profile inputs
const popupInputName = popupEditProfile.querySelector(
    ".popup__input_type_name"
);
const popupInputDescription = popupEditProfile.querySelector(
    ".popup__input_type_description"
);
//edit profile model buttons
const saveProfileButton = popupEditProfile.querySelector(".popup__save_type_edit-profile");

//popup add card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formCard = popupAddCard.querySelector(".popup__form_card");
//popup add card inputs
const inputCardTitle = popupAddCard.querySelector(
    ".popup__input_type_card-title"
);
const inputCardLink = popupAddCard.querySelector(
    ".popup__input_type_card-link"
);
//edit add card buttons
const addCardButton = popupAddCard.querySelector(".popup__save_type_add-card");

//image preview
const popupImagePreview = document.querySelector(".popup_type-preview");
const cardImage = document.querySelector(".element__image");
const cardTitle = document.querySelector(".element__title");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupTitle = popupImagePreview.querySelector(".popup__subtitle");

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}

const editFormValidator = new FormValidator(settings, popupEditProfile)
const addCardFormValidator = new FormValidator(settings, popupAddCard)

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//editFormValidator.resetValidation()
//addCardFormValidator.resetValidation()

function fillProfileForm() {
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
}

function handleEditButtonClick() {
    fillProfileForm();
    openPopup(popupEditProfile); 

    const inputList = [...popupEditProfile.querySelectorAll(settings.inputSelector)];
    const buttonElement = popupEditProfile.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);
}

function handleAddButtonClick() {
    openPopup(popupAddCard);
}

// function openPopup(popupWindow) {
//     popupWindow.classList.add("popup__opened");
//     addKeyDownListener();
// }

// function closePopup(popupWindow) {
//     popupWindow.classList.remove("popup__opened");
//     removeKeyDownListener();
// }

const allCloseButtons = document.querySelectorAll(".popup__close");

allCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(popupEditProfile);
}


popupEditProfile.addEventListener("submit", handleProfileFormSubmit);

editButtonProfile.addEventListener("click", handleEditButtonClick);

const templateCardSelector = "#card-template"

function renderCard(cardData, elementList) {
    const card = new Card(cardData, templateCardSelector)    
    elementList.prepend(card.getCardElement());
}

initialCards.forEach((cardData) => {
    renderCard(cardData, elementList);
});


formCard.addEventListener("submit", (evt) => {
    const cardData = {
        name: inputCardTitle.value,
        link: inputCardLink.value,
    };

    renderCard(cardData, elementList);
    evt.preventDefault();
    closePopup(popupAddCard);
    formCard.reset();
    disableButton(addCardButton, settings);
});

addButtonProfile.addEventListener("click", handleAddButtonClick);

const openImagePreview = (cardData) => {
    openPopup(popupImagePreview);
    
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupTitle.textContent = cardData.name;
};

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    openedPopup && closePopup(openedPopup)
  }
}

function addKeyDownListener() {
    window.addEventListener("keydown", handleKeyDown);
}

function removeKeyDownListener() {
    window.removeEventListener("keydown", handleKeyDown);
}

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.matches(".popup")) {
            closePopup(popup);
        }
    });
});

