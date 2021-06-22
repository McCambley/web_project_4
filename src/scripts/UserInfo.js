export default class UserInfo {
  constructor({ name, about, _id, avatar }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;

    this._profileName = document.querySelector('.profile__name');
    this._profileTitle = document.querySelector('.profile__title');
    this._profileImage = document.querySelector('.profile__avatar');
  }

  // getUserId() {
  //   // console.log(this._id);
  //   return this._id;
  // }

  updateUserInfo({ name, about, _id, avatar }) {
    this._name = name || this._name;
    this._about = about || this._about;
    this._id = _id || this._id;
    this._avatar = avatar || this._avatar;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      _id: this._id,
      avatar: this._avatar,
    };
  }

  setUserInfo() {
    this._profileName.textContent = this._name;
    this._profileTitle.textContent = this._about;
    // this._profileImage.src = this._avatar;
    // this._profileImage.src = 'http://www.picsum.photos/800';
    this._profileImage.src = this._avatar;
  }
}
