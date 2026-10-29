export interface UserInfoConfig {
  nameSelector: string;
  aboutSelector: string;
  avatarSelector: string;
}

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

export class UserInfo {
  private readonly _nameElement: HTMLElement;
  private readonly _aboutElement: HTMLElement;
  private readonly _avatarElement: HTMLImageElement;
  private _userId = "";
  private _avatar = "";

  constructor({
    nameSelector,
    aboutSelector,
    avatarSelector,
  }: UserInfoConfig) {
    this._nameElement = document.querySelector<HTMLElement>(nameSelector)!;
    this._aboutElement = document.querySelector<HTMLElement>(aboutSelector)!;
    this._avatarElement =
      document.querySelector<HTMLImageElement>(avatarSelector)!;
  }

  public getUserInfo(): UserData {
    return {
      _id: this._userId,
      name: this._nameElement.textContent ?? "",
      about: this._aboutElement.textContent ?? "",
      avatar: this._avatar,
    };
  }

  public getUserId(): string {
    return this._userId;
  }

  public setUserInfo({ _id, name, about, avatar }: UserData): void {
    this._userId = _id;
    this._avatar = avatar;
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = `Avatar de ${name}`;
  }
}
