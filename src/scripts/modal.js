let openedPopup = null;

function openPopup(popup) {
  if (!popup) return;
  
  openedPopup = popup;
  popup.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", handleEscKeyPress);
  popup.addEventListener("click", handleOverlayClick);
}

function closePopup(popup) {
  if (!popup || !popup.classList) return; 
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  popup.removeEventListener("click", handleOverlayClick);
  
  openedPopup = null;
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget && evt.currentTarget) { 
    closePopup(evt.currentTarget);
  }
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
