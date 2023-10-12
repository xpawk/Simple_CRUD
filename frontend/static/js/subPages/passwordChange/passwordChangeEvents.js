import { ApiOperations } from "../../apiOperations.js";
import DomOperations from "../../utils/domOperations.js";
import { SharedEventHandler } from "../../utils/SharedEventHandler.js";
import { isPassSame } from "../../utils/isPassSame.js";
import Loader from "../../components/Loader.js";
import Modal from "../../components/Modal.js";

export default class PasswordChangeEvents {
    constructor() {
        this.handlers = {
            modal_control_close: () => this.modal.closeModal(),
            modal_control_bg: () => this.modal.closeModal(),
            passwordChange_button: () => this.changePassword(),
        };
        new SharedEventHandler(this.handlers, this);
        return this.initialize();
    }
    async initialize() {
        try {
            this.modal = new Modal();
            this.loader = new Loader();
            this.domOp = new DomOperations();
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    async changePassword() {
        let passwordInfo = this.domOp.dataFromForm(
            document.querySelectorAll("#password-change input"),
        );
        passwordInfo.token = sessionStorage.getItem("token");
        this.loader.withLoader(async () => {
            if (isPassSame(passwordInfo, this.modal)) {
                const response = await ApiOperations.changePassword(passwordInfo);
                if (response.status === "Success") {
                    this.modal.createModal(response.status, response.message);
                    this.clearForm();
                } else {
                    this.modal.createModal("Abort", response);
                }
            }
        });
    }
    clearForm() {
        document.querySelectorAll("#password-change input")?.forEach((input) => {
            input.value = "";
        });
    }
}
