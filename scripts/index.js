const profileName = document.querySelector(".profile__name_type_name");
const profileProfession = document.querySelector(".profile__profession_type_profession");
const editButtonProfile = document.querySelector(".profile__button");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");

const closeButtonPopup = popup.querySelector(".popup__close");
const popupInputName = popup.querySelector(".popup__input_type_name");
const popupInputProfession = popup.querySelector(".popup__input_type_profession");
const saveButtonPopup = popup.querySelector(".popup__save");


function openPopup() {
  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

function handleEditButtonClick(){
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  openPopup(popup);
}


function handleSaveButtonSubmit(e){
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  closePopup();
}


closeButtonPopup.addEventListener("click", closePopup);
form.addEventListener("submit", handleSaveButtonSubmit); 
editButtonProfile.addEventListener("click", handleEditButtonClick);
 
