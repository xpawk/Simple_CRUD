import { ApiOperations } from "../../apiOperations.js";
import DomOperations from "../../utils/domOperations.js";
import { SharedEventHandler } from "../../utils/SharedEventHandler.js";
import { isPassSame } from "../../utils/isPassSame.js";
import Loader from "../../utils/Loader.js";
import Modal from "../../utils/Modal.js";

export default class LoginEvents {
    constructor() {
        this.handlers = {
            modal_control_close: () => this.modal.closeModal(),
            modal_control_bg: () => this.modal.closeModal(),
            passwordChange_button: () => this.changePassword(),
        };
        new SharedEventHandler(this.handlers, this);
        return this.variables();
    }
    async variables() {
        try {
            this.modal = new Modal();
            this.loader = new Loader();
            this.domOp = new DomOperations();
            return this;
        } catch (err) {
            console.log(err);
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
                    this.modal.createModal("Success", "Password changed");
                } else {
                    this.modal.createModal("Abort", response);
                }
            }
        });
    }
}
