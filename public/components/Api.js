export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    async _request(endpoint, options = {}) {
        const res = await fetch(`${this._baseUrl}${endpoint}`, {
            ...options,
            headers: this._headers,
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        return await this._request("/users/me");
    }
    async getInitialCards() {
        return await this._request("/cards");
    }
    async updateUserInfo(data) {
        return await this._request("/users/me", {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }
    async addCard(data) {
        return await this._request("/cards", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async deleteCard(cardId) {
        await this._request(`/cards/${cardId}`, {
            method: "DELETE",
        });
    }
    async changeLikeStatus(cardId, isLiked) {
        return await this._request(`/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
        });
    }
    async updateAvatar(data) {
        return await this._request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }
}
