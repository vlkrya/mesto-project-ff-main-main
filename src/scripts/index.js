
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

// DOM
const cardContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupNewCardButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");
const popupImageCloseButton = popupImage.querySelector(".popup__close");

const image = document.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// Data
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];

const profileNameInput = profileForm.elements.name;
const profileJobInput = profileForm.elements.description;
const cardPlaceNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach((item) => {
  cardContainer.append(
    createCard(item, deleteCard, likeCard, showImageInPopup)
  );
});

popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closePopup();
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardPlaceNameInput.value,
    link: cardLinkInput.value,
  };
  cardContainer.prepend(
    createCard(newCard, deleteCard, likeCard, showImageInPopup)
  );
  closePopup();
  cardForm.reset();
}

function populateProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function showImageInPopup(evt) {
  image.src = evt.srcElement.currentSrc;
  image.alt = evt.srcElement.alt;
  caption.textContent = evt.srcElement.alt;
  openPopup(popupImage);
}

profileForm.addEventListener("submit", updateProfileInfo);
cardForm.addEventListener("submit", addNewCard);

profileEditButton.addEventListener("click", () => {
  openPopup(popupEdit);
  populateProfileForm();
});

popupNewCardButton.addEventListener("click", () => openPopup(popupNewCard));

[popupEditCloseButton, popupNewCardCloseButton, popupImageCloseButton].forEach(
  (button) => {
    button.addEventListener("click", closePopup);
  }
);