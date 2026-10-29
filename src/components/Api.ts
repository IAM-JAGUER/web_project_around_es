import type { CardData, CardFormData } from "./Card.js";
import type {
  AvatarFormData,
  UserData,
  UserFormData,
} from "./UserInfo.js";

export interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private readonly _baseUrl: string;
  private readonly _headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  public async getUserInfo(): Promise<UserData> {
    return await this._request<UserData>("/users/me");
  }

  public async getInitialCards(): Promise<CardData[]> {
    return await this._request<CardData[]>("/cards");
  }

  public async updateUserInfo(data: UserFormData): Promise<UserData> {
    return await this._request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async addCard(data: CardFormData): Promise<CardData> {
    return await this._request<CardData>("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async deleteCard(cardId: string): Promise<void> {
    await this._request<{ message: string }>(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  public async changeLikeStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return await this._request<CardData>(`/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }

  public async updateAvatar(data: AvatarFormData): Promise<UserData> {
    return await this._request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}
