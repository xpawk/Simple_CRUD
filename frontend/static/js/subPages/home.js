export default class Home {
    constructor() {
        document.title = 'Single_page';
    }
    getHtml() {
        return `
    <h1> Login Page </h1>
    <a href='/adminPanel'>AdminPanel</a>
    `;
    }
}
