export class UserInfo {
    constructor( {nameSelector, jobSelector, avatarSelector}) {
        this._userName = document.querySelector(nameSelector)
        this._userDescription = document.querySelector(jobSelector)
        this._avatarPic = document.querySelector(avatarSelector)
    
    }

    getUserInfo() {
        return {
        name: this._userName.textContent,
        description: this._userDescription.textContent,
    }
    }

    setUserInfo(name, description, avatar) {
        this._userName.textContent = name;
        this._userDescription.textContent = description;
        this.setUserAvatar(avatar)
    }

    setUserAvatar(avatar) {
        this._avatarPic.src = avatar;
    }
}