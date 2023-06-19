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
        <input autocomplete="off" type="text" id="login" name="login">
        </div>
        <div>
        <label for="password">Password <a href='/password-reset' route>Forgot Password ?</a></label>
        <input autocomplete="off" type="password" id="password" name="password">
        </div>
        <button type="submit" class='login_form_submit'>Sign in</button>
      </fieldset>
    </form>
        `;
    }

    getHtml() {
        return `
        <div class='login_content content'>
 ${this.loginForm()}
    <div class='login_register'>
    <p>New to Habit Tracker? <a href='/register' route>Register</a></p>
    </div>
    </div>
    `;
    }
}
