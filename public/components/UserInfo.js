export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector, }) {
        this._userId = "";
        this._avatar = "";
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement =
            document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            _id: this._userId,
            name: this._nameElement.textContent ?? "",
            about: this._aboutElement.textContent ?? "",
            avatar: this._avatar,
        };
    }
    getUserId() {
        return this._userId;
    }
    setUserInfo({ _id, name, about, avatar }) {
        this._userId = _id;
        this._avatar = avatar;
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;
        this._avatarElement.alt = `Avatar de ${name}`;
    }
}
