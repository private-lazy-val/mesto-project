export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
    this.avatarElement = document.querySelector(avatarSelector);
    this.userId = null;
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.jobElement.textContent,
      avatar: this.avatarElement.src,
      _id: this.userId,  // _id is needed when creating new cards in `index.js`
    };
  };

  setUserInfo({ name, about, avatar, _id }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = about;
    this.avatarElement.src = avatar;
    this.userId = _id;
  }
}
