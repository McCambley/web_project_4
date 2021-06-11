export default class UserInfo {
  constructor({ name, title }) {
    this._name = name;
    this._title = title;
    this._profileName = document.querySelector(".profile__name");
    this._profileTitle = document.querySelector(".profile__title");
  }

  getUserInfo() {
    // const profileName = document.querySelector(".profile__name").textContent;
    // const profileTitle = document.querySelector(".profile__title").textContent;
    this._name = this._profileName.textContent;
    this._title = this._profileTitle.textContent;
    const data = {
      name: this._name,
      title: this._title,
    };
    return data;
  }

  setUserInfo() {
    this._profileName.textContent = this._name;
    this._profileTitle.textContent = this._title;
  }
}
