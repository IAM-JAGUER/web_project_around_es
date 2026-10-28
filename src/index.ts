import { Card, type CardData } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";

const initialCards: CardData[] = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardTemplateSelector = "#card-template";
const cardListSelector = ".cards__list";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

const handleCardClick = (data: CardData): void => {
  imagePopup.open(data);
};

const createCard = (data: CardData): HTMLElement => {
  return new Card(data, cardTemplateSelector, handleCardClick).generateCard();
};

const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardListSelector,
);

const editProfilePopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo({
    name: values.name,
    job: values.description,
  });

  editProfilePopup.close();
});

const newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
  cardSection.addItem(
    createCard({
      name: values["place-name"],
      link: values.link,
    }),
  );

  newCardPopup.close();
});

const profileEditButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
)!;
const profileAddButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
)!;
const editProfileForm =
  document.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;
const profileNameInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_name",
)!;
const profileDescriptionInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_description",
)!;

const editProfileValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);

const handleProfileEditButtonClick = (): void => {
  const { name, job } = userInfo.getUserInfo();

  profileNameInput.value = name;
  profileDescriptionInput.value = job;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
};

const handleAddCardButtonClick = (): void => {
  newCardValidator.resetValidation();
  newCardPopup.open();
};

profileEditButton.addEventListener("click", handleProfileEditButtonClick);
profileAddButton.addEventListener("click", handleAddCardButtonClick);

editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

cardSection.renderItems();
