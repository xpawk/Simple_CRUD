import { ApiOperations } from "../../../apiOperations.js";
import DomOperations from "../../../utils/domOperations.js";
import { isPassSame } from "../../../utils/isPassSame.js";
import Loader from "../../../components/Loader.js";
import Modal from "../../../components/Modal.js";

export default class PasswordChangeEvents {
    constructor() {
        this.handlers = {
            passwordChange_button: () => this.changePassword(),
        };

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
