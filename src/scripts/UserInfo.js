export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
    this._profileName = document.querySelector(".profile__name");
    this._profileTitle = document.querySelector(".profile__title");
  }

  getUserInfo() {
    this._name = this._profileName.textContent;
    this._about = this._profileTitle.textContent;
    const data = {
      name: this._name,
      about: this._about,
    };
    return data;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = about;
  }
}
