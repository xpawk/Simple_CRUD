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
        <label for="name">Username or email username</label>
        <input autocomplete="off" tabindex="1" type="text" id="login" name="login">
        </div>
        <div>
        <label for="password">Password <a tabindex="2" href='/password-reset' route>Forgot Password ?</a></label>
        <input autocomplete="off" tabindex="1" type="password" id="password" name="password">
        </div>
        <button type="submit" tabindex="1" class='login_form_submit'>Sign in</button>
      </fieldset>
    </form>
        `;
    }

    getHtml() {
        return `
        <div class='login_content content'>
 ${this.loginForm()}
    <div class='login_register'>
    <p>New to Habit Tracker? <a tabindex="2" href='/register' route>Register</a></p>
    </div>
    </div>
    `;
    }
}
