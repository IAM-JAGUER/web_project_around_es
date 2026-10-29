export class Popup {
    constructor(selector) {
        this._handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        this._popupElement = document.querySelector(selector);
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        const closeButton = this._popupElement.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => {
            this.close();
        });
        this._popupElement.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}
