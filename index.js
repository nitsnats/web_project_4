const modelWindow = document.querySelector(".profile__button");
const openWindowButton = document.querySelector(".profile__button");
const closeWindowButtob = document.querySelector(".popup__close");
const submitbutton = document.querySelector(".popup__save");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const inputName = document.querySelector(".popup__input_name");
const inputProfession = document.querySelector(".popup__input_profession");

function toggleModelWindow(e){
    /*console.log(e);*/
    modelWindow.classList.toggle("popup_visible");
}

function modelWindowSubmit(e){
    e.preventDefault();
    console.log(e);
    toggleModelWindow();
}

function handleFormSubmit(e){
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
}

function toggleForm(){
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    popup__profile.classList.add(".popup_visible");
}

openWindowButton.addEventListener("click", toggleModelWindow);
closeWindowButtob.addEventListener("click", toggleModelWindow);
submitbutton.addEventListener("click", modelWindowSubmit);