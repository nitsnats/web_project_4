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
//const imageDisplayed = document.querySelector(".popup_type-preview");
const previewImage = document.querySelector(".popup_type-preview");

const elementList = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");

//models
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

//close buttons
const closeButtonPopup = popup.querySelector(".popup__close");

//open model buttons
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");

//save button
const saveButtonPopup = popup.querySelector(".popup__save");

//inputs
const profileTitle = document.querySelector(".profile__title_type_title");
const profileDescription = document.querySelector(
  ".profile__description_type_description"
);
const popupInputName = popup.querySelector(".popup__input_type_name");
const popupInputDescription = popup.querySelector(
  ".popup__input_type_description"
);

function handleEditButtonClick(popupWindow) {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopup(popupWindow);
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

const allCloseButton = document.querySelectorAll(".popup__close");
allCloseButton.forEach((btn) =>
  btn.addEventListener("click", () => {
    const allThePopups = document.querySelectorAll(".popup");
    allThePopups.forEach((popup) => popup.classList.remove("popup__opened"));
  })
);

function handleSaveButtonSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

function createCardElement(cardData) {  //{name,link}
  const card = cardTemplate.cloneNode(true);

const cardImage = card.querySelector(".element__image");
const cardTitle = card.querySelector(".element__title");

cardImage.src = card.link;
cardImage.alt = card.name;
cardTitle.textContent = card.name;

  card.querySelector(".element__title").textContent = cardData.name;
  card.querySelector(".element__image").src = cardData.link;

  //card.querySelector(".element__image").addEventListener("click", (openImagePreview) => {
  //  imageDisplayed.src = cardData.link;
  //  imageDisplayed.textContent = cardData.name;
  //  openPopup(imagePreview);
  //});

  cardImage.addEventListener('click', () => openImagePreview(card));

  card.querySelector(".element__button-like").addEventListener("click", (evt) => {
      const likeButton = evt.target;
      likeButton.classList.toggle("element__button-like_active");
    });

  card.querySelector(".element__button-delete").addEventListener("click", () => {
      card.remove();
    });
  return card;
}

const openImagePreview = card => {
  openPopup(previewImage);
  const popupImage = previewImage.querySelector(".popup__image");
  const popupTitle = previewImage.querySelector(".popup__subtitle");
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupTitle.textContent = card.name;

};

//closeButtonPopup.addEventListener("click", ".popup__close");

form.addEventListener("submit", handleSaveButtonSubmit);

editButtonProfile.addEventListener("click", function () {
  handleEditButtonClick(popupEditProfile);
});
addButtonProfile.addEventListener("click", function () {
  handleEditButtonClick(popupAddCard);
});

initialCards.forEach((initialCardData) => {
  elementList.prepend(createCardElement(initialCardData));
});
