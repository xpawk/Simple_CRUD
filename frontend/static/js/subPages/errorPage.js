export default class ErrorPage {
    constructor() {
        document.title = "Oops, you've found a dead link.";
    }
    goBack() {
        window.history.go(-2);
    }
    getHtml() {
        return `
        <div class='error-page'>
    <h1> Oops, you've found a dead link. </h1>
    <ul>
    <li>Go to the <a href='/' route>Home Page</a></li>
    <li>Go to the <a href='#' class='go-back' route>Last Page</a></li>
    </ul>
        </div>
   
    `;
    }
}
