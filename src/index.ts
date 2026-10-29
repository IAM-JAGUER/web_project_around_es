import { Api } from "./components/Api.js";
import { Card, type CardData } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";

const API_BASE_URL = "https://around-api.es.tripleten-services.com/v1";
const API_TOKEN = "76c10efa-0ebb-46da-af77-af3ccc6709b8";
const CARD_TEMPLATE_SELECTOR = "#card-template";
const CARD_LIST_SELECTOR = ".cards__list";

const api = new Api({
  baseUrl: API_BASE_URL,
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const profileEditButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
)!;
const profileAddButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
)!;
const profileAvatarButton = document.querySelector<HTMLButtonElement>(
  ".profile__avatar-button",
)!;
const editProfileForm =
  document.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;
const avatarForm = document.querySelector<HTMLFormElement>("#avatar-form")!;
const profileNameInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_name",
)!;
const profileDescriptionInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_description",
)!;
const avatarInput = avatarForm.querySelector<HTMLInputElement>(
  ".popup__input_type_avatar",
)!;

const editProfileValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();
avatarValidator.enableValidation();

const initializePage = async (): Promise<void> => {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userInfo.setUserInfo(userData);

    const imagePopup = new PopupWithImage("#image-popup");
    const confirmationPopup = new PopupWithConfirmation("#confirm-popup");

    const handleImageClick = (data: CardData): void => {
      imagePopup.open(data);
    };

    const handleLikeClick = async (card: Card): Promise<void> => {
      try {
        const updatedCard = await api.changeLikeStatus(
          card.getCardId(),
          card.getLikeState(),
        );

        card.setLikeState(updatedCard.isLiked);
      } catch (err) {
        console.error(err);
      }
    };

    const handleDeleteClick = (card: Card): void => {
      confirmationPopup.setConfirmationHandler(async () => {
        try {
          await api.deleteCard(card.getCardId());
          card.remove();
          confirmationPopup.close();
        } catch (err) {
          console.error(err);
        }
      });

      confirmationPopup.open();
    };

    const createCard = (data: CardData): HTMLElement => {
      return new Card(data, CARD_TEMPLATE_SELECTOR, userInfo.getUserId(), {
        handleImageClick,
        handleLikeClick,
        handleDeleteClick,
      }).generateCard();
    };

    const cardSection = new Section<CardData>(
      {
        items: initialCards,
        renderer: createCard,
      },
      CARD_LIST_SELECTOR,
    );

    const editProfilePopup = new PopupWithForm(
      "#edit-popup",
      async (values) => {
        try {
          const updatedUser = await api.updateUserInfo({
            name: values.name,
            about: values.description,
          });

          userInfo.setUserInfo(updatedUser);
          editProfilePopup.close();
        } catch (err) {
          console.error(err);
        }
      },
    );

    const newCardPopup = new PopupWithForm("#new-card-popup", async (values) => {
      try {
        const card = await api.addCard({
          name: values["place-name"],
          link: values.link,
        });

        cardSection.addItem(createCard(card));
        newCardPopup.close();
      } catch (err) {
        console.error(err);
      }
    });

    const avatarPopup = new PopupWithForm("#avatar-popup", async (values) => {
      try {
        const updatedUser = await api.updateAvatar({
          avatar: values.avatar,
        });

        userInfo.setUserInfo(updatedUser);
        avatarPopup.close();
      } catch (err) {
        console.error(err);
      }
    });

    profileEditButton.addEventListener("click", () => {
      const { name, about } = userInfo.getUserInfo();

      profileNameInput.value = name;
      profileDescriptionInput.value = about;
      editProfileValidator.resetValidation();
      editProfilePopup.open();
    });

    profileAddButton.addEventListener("click", () => {
      newCardValidator.resetValidation();
      newCardPopup.open();
    });

    profileAvatarButton.addEventListener("click", () => {
      avatarInput.value = userInfo.getUserInfo().avatar;
      avatarValidator.resetValidation();
      avatarPopup.open();
    });

    imagePopup.setEventListeners();
    confirmationPopup.setEventListeners();
    editProfilePopup.setEventListeners();
    newCardPopup.setEventListeners();
    avatarPopup.setEventListeners();

    cardSection.renderItems();
  } catch (err) {
    console.error(err);
  }
};

void initializePage();
