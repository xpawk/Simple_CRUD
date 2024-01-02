import { ApiOperations } from "../../apiOperations.js";
export default class AccountPage {
    constructor() {
        document.title = "Account Details";
        return this.initialize();
    }

    async initialize() {
        try {
            this.user = await ApiOperations.getUser();
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    profileData() {
        return `
    <form class='user_edit_form' novalidate>
      <fieldset>
        <div>
        <label for="username">Username</label>
        <input autocomplete="off" type="text" value="${this.user.username}" id="username" name="username" >
        </div>  
        <div>
        <label for="email">E-mail</label>
        <input autocomplete="off" type="email" value="${this.user.email}" id="email" name="email" >
        </div>
        <div>
        <label for="name">First Name</label>
        <input autocomplete="off" type="text" value="${this.user.name}" id="name" name="name" >
        </div>
        <div>
        <label for="lName">Last Name</label>
        <input autocomplete="off" type="text" value="${this.user.lName}" id="lName" name="lName" >
        </div>
        <div class="pass_change">
        <label>Password</label><a href="/account/password-change" route>Change Password</a>
        </div>
        <div><label>Your account status</label> <p>${this.user.status}</p></div>
        <button class="save_user_button" data-id="${this.user._id}">Save changes</button>
      </fieldset>
    </form>
    `;
    }

    getHtml() {
        return `
        <div class='account_page content'>
            <h2>Your account Details</h2>
           ${this.profileData()}
        </div>
        `;
    }
}
