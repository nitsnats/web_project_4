const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//wrappers
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const elementList = document.querySelector(".element");
//buttons and element
const editButtonProfile = document.querySelector(".profile__edit-button");
const closeButtonPopup = popup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title_type_title");
const profileDescription = document.querySelector(".profile__description_type_description");
const addButtonProfile = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");//?

const popupAddCard = document.querySelector(".popup_type_add-card");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

//form data
const popupInputName = popup.querySelector(".popup__input_type_name");
const popupInputDescription = popup.querySelector(".popup__input_type_description");


const saveButtonPopup = popup.querySelector(".popup__save");

function handleEditButtonClick(popupWindow){
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopup(popup);
}

function openPopup() {
  popup.classList.add("popup__opened");
}

/*
function closePopup() {
  popup.classList.remove("popup__opened");
}*/

function handleSaveButtonSubmit(e){
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

function createCardElement(cardData){ //{name,link}
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".element__title").textContent = cardData.name;
  card.querySelector(".element__image").style.backgroundImage = `url(${cardData.link})`;

  return card;
}

initialCards.forEach(initialCardData => {
  elementList.prepend(createCardElement(initialCardData));
});



//closeButtonPopup.addEventListener("click", ".popup__close");
form.addEventListener("submit", handleSaveButtonSubmit); 
editButtonProfile.addEventListener("click", function(){handleEditButtonClick(popupEditProfile)});
addButtonProfile.addEventListener("click", function(){handleEditButtonClick(popupAddCard)});

const allCloseButton = document.querySelectorAll(".closePopup");
allCloseButton.forEach(btn => btn.addEventListener(".click", ()=>{
  const allThePopups = document.querySelectorAll(".popup");
  allThePopups.forEach(popup => popup.classList.remove("popup__opened"))
}));


