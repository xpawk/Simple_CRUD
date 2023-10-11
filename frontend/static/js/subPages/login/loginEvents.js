import { ApiOperations } from "../../apiOperations.js";
import DomOperations from "../../utils/domOperations.js";
import { SharedEventHandler } from "../../utils/SharedEventHandler.js";
import Loader from "../../utils/Loader.js";
import Modal from "../../utils/Modal.js";

export default class LoginEvents {
    constructor() {
        this.handlers = {
            modal_control_close: () => this.modal.closeModal(),
            modal_control_bg: () => this.modal.closeModal(),
            login_form_submit: () => this.loginHandler(),
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

    async loginHandler() {
        try {
            const credentials = this.domOp.dataFromForm(
                document.querySelectorAll("#login-form input"),
            );
            this.loader.withLoader(async () => {
                const response = await ApiOperations.logIn(credentials);
                if (response.status === "Success") {
                    sessionStorage.setItem("token", response.data);
                    window.location.pathname = "";
                } else {
                    this.modal.createModal("Abort", response);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}
