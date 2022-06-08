export const popupImagePreview = document.querySelector(".popup_type-preview");
export const popupImage = popupImagePreview.querySelector(".popup__image");
export const popupTitle = popupImagePreview.querySelector(".popup__subtitle");


export function openPopup(popupWindow) {
    popupWindow.classList.add("popup__opened");
    addKeyDownListener();
}

export function addKeyDownListener() {
    window.addEventListener("keydown", handleKeyDown);
}

export function handleKeyDown(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup__opened");
      openedPopup && closePopup(openedPopup)
    }
}

export function closePopup(popupWindow) {
    popupWindow.classList.remove("popup__opened");
    removeKeyDownListener();
}

export function removeKeyDownListener() {
    window.removeEventListener("keydown", handleKeyDown);
}

