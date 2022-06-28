export class UserInfo {
    constructor( {nameSelector, jobSelector}) {
        this._userName = document.querySelector(nameSelector)
        this._userDescription = document.querySelector(jobSelector)
    
    }

    getUserInfo() {
        return {
        name: this._userName.textContent,
        description: this._userDescription.textContent,
    }
    }

    setUserInfo(name, description) {
        this._userName.textContent = name;
        this._userDescription.textContent = description;
    }
}