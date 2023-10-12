import { SharedEventHandler } from "../../utils/SharedEventHandler.js";

export default class HeaderEvents {
    constructor() {
        this.handlers = {
            dropdown_menu: () => this.openDropdown(),
        };
        new SharedEventHandler(this.handlers, this);
        return this.initialize();
    }
    async initialize() {
        try {
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    openDropdown() {
        this.dropDown = document.querySelector(".dropdown_menu");
        console.log(this.dropDown);

        this.dropDown.classList.add("active");
    }
}
