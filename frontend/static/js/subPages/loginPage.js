export default class LoginPage {
    constructor() {
        document.title = 'Login';
    }
    loginForm() {
        return `
        <h1 class='login_title'> Sing in to Habit Tracker </h1>
    <form id="login-form" class='login_form'>
      <fieldset>
      <div>
        <label for="name">Username or email address</label>
        <input type="text" id="login" name="login">
        </div>
        <div>
        <label for="password">Password <a href='/password-reset' route>Forgot Password ?</a></label>
        <input type="password" id="password" name="password">
        </div>
        <input type="submit" class='login_form_submit' value="Sign in">
      </fieldset>
    </form>
        `;
    }

    getHtml() {
        return `
        <div class='content'>
 ${this.loginForm()}
    <div class='login_register'>
    <p>New to Habit Tracker<a href='/register' route></a></p>
    </div>
    </div>
    `;
    }
}
