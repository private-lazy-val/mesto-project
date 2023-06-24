export default class UserInfo {
  constructor(
    { nameSelector, aboutSelector },
    handleGetUser,
    handleSetUser
  ) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
    this._handleGetUser = handleGetUser;
    this._handleSetUser = handleSetUser;
  }

  getUserInfo() {
    return this._handleGetUser();
  }

  setUserInfo(newUserInfo) {
    return this._handleSetUser(newUserInfo)
      .then((userData) => {
        document.querySelector(this.nameSelector).textContent = userData.name;
        document.querySelector(this.aboutSelector).textContent = userData.about;
      })
      .catch((err) =>
        console.log(`Ошибка обновления информации пользователя: ${err}`)
      );
  }
}
