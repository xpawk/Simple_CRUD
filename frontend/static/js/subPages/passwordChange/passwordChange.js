export default class PasswordChange {
    constructor() {
        document.title = 'Change Password';
    }
    passwordChangeForm() {
        return `
        <form id="password-change" class='passwordChange_form' novalidate>
        <fieldset>
        <label for="current_password">Current Password</label>
        <input autocomplete="off" type="password" id="current_password" name="current_password">
        <label for="password">New password</label>
        <input autocomplete="off" type="password" id="password" name="password">
        <label for="password_c">Confirm new Password</label>
        <input autocomplete="off" type="password" id="password_c" name="password_c">
        <button class='passwordChange_button'>Change</button>
        </fieldset>
        </form>`;
    }
    getHtml() {
        return `<div class="passwordChange">
    <h1> Change Password </h1>
   ${this.passwordChangeForm()}
    </div>`;
    }
}
