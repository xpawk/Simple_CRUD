export default class Home {
    constructor() {
        document.title = "User_management";
    }
    getHtml() {
        return `
        <div class='home'>
    <h1> Log in To modify Users </h1>
    <a href='/adminPanel' route>AdminPanel</a>
    <a href='/password-change' route>Change Password</a>
        </div>
   
    `;
    }
}
