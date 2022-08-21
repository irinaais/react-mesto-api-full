// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

const settings = {
  inputError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  buttonInactive: 'button_variant_inactive',
  popupInput: '.popup__input',
  popupSubmit: '.popup__submit',
  popupForm: '.popup__form'
}

const selectorPopupViewCard = ".popup_view-card";
const popupAddCard = document.querySelector('.popup_add');
const formPopupAddCard = popupAddCard.querySelector('.popup__form');
const selectorPopupAddCard = ".popup_add";
const popupEdit = document.querySelector(".popup_edit");
const formPopupEdit = popupEdit.querySelector('.popup__form');
const selectorPopupEditProfile = ".popup_edit";
const openPopupAddCardButton = document.querySelector(".button_variant_add");
const openPopupEditProfileButton = document.querySelector(".button_variant_edit");
const elements = ".elements";
const imgUrl = document.querySelector('.popup__img');
const imgName = document.querySelector('.popup__img-info');
const selectorPopupDeleteCard = ".popup_delete-card";
const buttonEditAvatar = document.querySelector(".button_variant_avatar");
const selectorPopupEditAvatar = ".popup_edit-avatar";
const popupAvatar = document.querySelector(".popup_edit-avatar");
const formPopupAvatar = popupAvatar.querySelector(".popup__form");

export {settings, formPopupAddCard, openPopupAddCardButton, elements, imgUrl, imgName,
  formPopupEdit, openPopupEditProfileButton,selectorPopupViewCard, selectorPopupAddCard,
  selectorPopupEditProfile, selectorPopupDeleteCard, buttonEditAvatar, selectorPopupEditAvatar,
  formPopupAvatar};