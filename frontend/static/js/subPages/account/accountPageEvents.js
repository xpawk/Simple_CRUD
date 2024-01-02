import { ApiOperations } from "../../apiOperations.js";
import Loader from "../../components/Loader.js";
import Modal from "../../components/Modal.js";

export default class AccountPageEvents {
    constructor() {
        this.handlers = {
            save_user_button: () => this.updateUser(),
        };
        return this.initialize();
    }

    async initialize() {
        try {
            this.modal = new Modal();
            this.loader = new Loader();
            this.userForm = document.querySelector(".user_edit_form");
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    dataFromUserFrom() {
        const controls = Array.from(this.userForm.querySelectorAll("input"));
        const userData = {};
        controls.forEach((control) => {
            userData[control.name] = control.value;
        });
        return userData;
    }

    async updateUser() {
        try {
            await this.loader.withLoader(async () => {
                const response = await ApiOperations.editAccount(
                    this.dataFromUserFrom(),
                    this.currentId,
                );

                if (response === "Success") {
                    this.modal.createModal(response, "Account successfully edited");
                } else {
                    this.modal.createModal("Abort", response);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
