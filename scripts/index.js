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

const cardImage = document.querySelector(".element__image");
const cardTitle = document.querySelector(".element__title");

const formCard = document.querySelector(".popup__form_card");


const elementList = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

const popup = document.querySelector(".popup");
const forms = document.querySelector(".popup__form");

//models
const popupEditProfile = document.querySelector(".popup.popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup.popup_type_add-card");
const popupImagePreview = document.querySelector(".popup.popup_type-preview");

//close buttons
const closeButtonPopup = document.querySelectorAll(".popup__close");

//open model buttons
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");


//save button
//const saveButtonPopup = popup.querySelector(".popup__save");

const addCardButton = document.querySelector(".popup_type_add-card .popup__save");
const saveProfileButton = document.querySelector(".popup_type_edit-profile .popup__save");

//buttons


//inputs
const profileTitle = document.querySelector(".profile__title_type_title");
const profileDescription = document.querySelector(".profile__description_type_description");
const popupInputName = popup.querySelector(".popup__input_type_name");
const popupInputDescription = popup.querySelector(".popup__input_type_description");

const inputTitle = document.querySelector(".popup__input_type_card-title");
const inputLink = document.querySelector(".popup__input_type_card-link");

function handleEditButtonClick(popupWindow) {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopup(popupWindow);
}

function handleAddButtonClick(popupWindow) {
  openPopup(popupWindow);
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

//const allCloseButton = document.querySelectorAll(".popup__close");
//allCloseButton.forEach((btn) =>
//  btn.addEventListener("click", () => {
//    const allThePopups = document.querySelectorAll(".popup");
//    allThePopups.forEach((popup) => popup.classList.remove("popup__opened"));
//  })
//);

const openedPopup = document.querySelector(".popup-opened")
closePopup(openedPopup);  

function handleSaveButtonSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

function createCardElement(cardData) {//{name,link}
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__title");
  const likeButton = card.querySelector(".element__button-like");
  const deleteButton = card.querySelector(".element__button-delete");


  //cardImage.src = card.link;
  //cardImage.alt = card.name;
  //cardTitle.textContent = card.name;

  card.querySelector(".element__title").textContent = cardData.name;
  card.querySelector(".element__image").src = cardData.link;
  card.querySelector(".element__title").alt = cardData.name;

  cardImage.addEventListener("click", () => openImagePreview(cardData));

  likeButton.addEventListener("click", (evt) => {
      const likeActive = evt.target;
      likeActive.classList.toggle("element__button-like_active");
    });

    deleteButton.addEventListener("click", () => {
      card.remove();
    });
  return card;
}

//closeButtonPopup.addEventListener("click", ".popup__close");

forms.addEventListener("submit", handleSaveButtonSubmit);

//editButtonProfile.addEventListener("click", function () {
//  handleEditButtonClick(popupEditProfile);
//});

editButtonProfile.addEventListener("click", handleEditButtonClick);

function renderCard(cardData, elementList) {
  elementList.prepend(cardData);
}

initialCards.forEach((cardData) => {
  const newCard = createCardElement(cardData);
  renderCard(newCard, elementList);
});

formCard.addEventListener("submit", (evt) => {
  const cardData = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  renderCard(createCardElement(cardData), elementList);
  evt.preventDefault();
  closePopup();
  formCard.reset();
});

//addButtonProfile.addEventListener("click", function () {
//  handleAddButtonClick(popupAddCard);
//});

addButtonProfile.addEventListener("click", handleAddButtonClick);


const openImagePreview = (cardData) => {
  openPopup(popupImagePreview);
  const popupImage = popupImagePreview.querySelector(".popup__image");
  const popupTitle = popupImagePreview.querySelector(".popup__subtitle");
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTitle.textContent = cardData.name;
};
