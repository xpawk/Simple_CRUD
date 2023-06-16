import AdminPanel from './adminPanel/adminPanel.js';
export default class Register {
    constructor() {
        document.title = 'Register';
    }

    getHtml() {
        return `
        <div class='content register'>
        ${AdminPanel.formUsers('Sing up to Habit Tracker', 'Register')}
    </div>
    `;
    }
}
