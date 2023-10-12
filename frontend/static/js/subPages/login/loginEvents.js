import { ApiOperations } from "../../apiOperations.js";
import DomOperations from "../../utils/domOperations.js";
import { SharedEventHandler } from "../../utils/SharedEventHandler.js";
import Loader from "../../components/Loader.js";
import Modal from "../../components/Modal.js";

export default class LoginEvents {
    constructor() {
        this.handlers = {
            modal_control_close: () => this.modal.closeModal(),
            modal_control_bg: () => this.modal.closeModal(),
            login_form_submit: () => this.loginHandler(),
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
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
