export interface UserInfoConfig {
  nameSelector: string;
  jobSelector: string;
}

export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private readonly _nameElement: HTMLElement;
  private readonly _jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoConfig) {
    this._nameElement = document.querySelector<HTMLElement>(nameSelector)!;
    this._jobElement = document.querySelector<HTMLElement>(jobSelector)!;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent ?? "",
      job: this._jobElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
