export const initialCards = [
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

export const popups = document.querySelectorAll(".popup");
export const forms = document.querySelector(".popup__form");

export const elementList = document.querySelector(".elements");
export const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".element");

//profile model buttons
export const editButtonProfile = document.querySelector(".profile__edit-button");
export const addButtonProfile = document.querySelector(".profile__add-button");

//popup edit profile
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");

//popup edit profile inputs
export const popupInputName = popupEditProfile.querySelector(
    ".popup__input_type_name"
);
export const popupInputDescription = popupEditProfile.querySelector(
    ".popup__input_type_description"
);

export const popupChangeAvatar = document.querySelector(".popup_type_avatar-change");
export const avatar = document.querySelector(".profile__image");

//export const popupDeleteCard = document.querySelector(".popup_type_avatar-change");
//export const deleteCard = document.querySelector(".popup__save_type_add-card");


//popup add card
export const popupAddCard = document.querySelector(".popup_type_add-card");

//image preview
export const popupImagePreview = document.querySelector(".popup_type-preview");
export const popupImage = popupImagePreview.querySelector(".popup__image");
export const popupTitle = popupImagePreview.querySelector(".popup__subtitle");

export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}

