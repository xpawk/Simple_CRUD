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

    getHtml() {
        return `
        <div class='account-page'>
   <h3>Your account Profile</h3>
        </div>
   
    `;
    }
}
