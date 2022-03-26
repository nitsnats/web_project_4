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



const popup = document.querySelectorAll(".popup");
const forms = document.querySelector(".popup__form");

const elementList = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

//profile
const profileInfo = document.querySelector(".profile__info");
//profile model buttons
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");
//profile inputs
const profileTitle = profileInfo.querySelector(".profile__title_type_title");
const profileDescription = profileInfo.querySelector(".profile__description_type_description");

//popup edit profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEditProfile.querySelector(".popup__form");//forms
//popup edit profile inputs
const popupInputName = popupEditProfile.querySelector(".popup__input_type_name");
const popupInputDescription = popupEditProfile.querySelector(".popup__input_type_description");
//edit profile model buttons
const saveProfileButton = popupEditProfile.querySelector(".popup__save");
const closeProfileButton = popupEditProfile.querySelectorAll(".popup__close .popup__close popup__close_edit-profile");

//popup add card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formCard = popupAddCard.querySelector(".popup__form_card");
//popup add card inputs
const inputCardTitle = popupAddCard.querySelector(".popup__input_type_card-title");
const inputCardLink = popupAddCard.querySelector(".popup__input_type_card-link");
//edit add card buttons
const addCardButton = popupAddCard.querySelector(".popup__save");
const closeAddCardButton = popupAddCard.querySelectorAll(".popup__close popup__close_add-card");

//image preview
const popupImagePreview = document.querySelector(".popup_type-preview");
//image preview buttons
const closePreviewButton = popupAddCard.querySelectorAll(".popup__close popup__close_preview");

const cardImage = document.querySelector(".element__image");
const cardTitle = document.querySelector(".element__title");


function fillProfileForm(){
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

function handleEditButtonClick(){
  fillProfileForm();
  openPopup(popupEditProfile);
}

//function handleEditButtonClick() {
//  popupInputName.value = profileTitle.textContent;
//  popupInputDescription.value = profileDescription.textContent;
//  openPopup(popupEditProfile);
//}


function handleAddButtonClick() {
  openPopup(popupAddCard);
  
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup__opened");
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup__opened");
}

const allCloseButton = document.querySelectorAll(".popup__close");
allCloseButton.forEach((btn) =>
  btn.addEventListener("click", () => {
    //const allThePopups = document.querySelectorAll(".popup");
    //allThePopups.forEach((popup) => popup.classList.remove("popup__opened"));
    const openedPopup = document.querySelector(".popup__opened")
    closePopup(openedPopup);
  })
);

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(popupEditProfile);
}


function createCardElement(cardData) {//{name,link}
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__title");
  const likeButton = card.querySelector(".element__button-like");
  const deleteButton = card.querySelector(".element__button-delete");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  cardImage.addEventListener("click", () => openImagePreview(cardData));

  //likeButton.addEventListener("click", (evt) => {
  //    const likeActive = evt.target;
  //    likeActive.classList.toggle("element__button-like_active");
  //  });

    function activateLikeButton (evt){
      const likeActive = evt.target;
      likeActive.classList.toggle("element__button-like_active");
    }
  
    likeButton.addEventListener("click", activateLikeButton);

    //deleteButton.addEventListener("click", () => {
    //  card.remove();
    //});

    function handleDeletButton (){
      card.remove();
    }
  
    deleteButton.addEventListener("click", handleDeletButton);

  return card;
}

//closeButtonPopup.addEventListener("click", ".popup__close");

popupEditProfile.addEventListener("submit", handleProfileFormSubmit);
//popupAddCard.addEventListener("submit", handleProfileFormSubmit);

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
    name: inputCardTitle.value,
    link: inputCardLink.value,
  };

  renderCard(createCardElement(cardData), elementList);
  evt.preventDefault();
  closePopup(popupAddCard);
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
