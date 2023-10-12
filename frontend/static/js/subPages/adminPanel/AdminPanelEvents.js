import { ApiOperations } from "../../apiOperations.js";
import DomOperations from "../../utils/domOperations.js";
import { SharedEventHandler } from "../../utils/SharedEventHandler.js";
import { isPassSame } from "../../utils/isPassSame.js";
import AdminPanel from "./adminPanel.js";
import Loader from "../../components/Loader.js";
import Modal from "../../components/Modal.js";

export default class AdminPanelEvents {
    constructor() {
        this.handlers = {
            edit: () => this.editHandler(),
            save: () => this.updateUser(),
            delete: () => this.deleteHandler(),
            submit_button: () => {
                const submitType = document.querySelector("#user-form .submit_button").type;
                if (submitType === "submit") {
                    return this.addHandler();
                } else if (submitType === "button") {
                    return this.updateUser();
                }
            },
            update_env_button: () => this.changeEnv(),
            modal_control_close: () => this.modal.closeModal(),
            modal_control_bg: () => this.modal.closeModal(),
        };
        new SharedEventHandler(this.handlers, this);
        return this.initialize();
    }
    async initialize() {
        try {
            this.modal = new Modal();
            this.loader = new Loader();
            this.domOp = new DomOperations();
            this.users = await ApiOperations.getUsers();
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async addHandler() {
        try {
            await this.loader.withLoader(async () => {
                let userData = this.domOp.dataFromForm();
                if (isPassSame(userData, this.modal)) {
                    const response = await ApiOperations.addUser(userData);
                    if (response === "Success") {
                        this.users = await ApiOperations.getUsers();
                        this.currentUser = this.users.slice(-1)[0];
                        this.domOp.clearForm();
                        this.domOp.updateTableRow(userData, await this.currentUser._id);
                        this.modal.createModal(response, "User successfully added");
                    } else {
                        this.modal.createModal("Abort", response);
                    }
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async deleteHandler() {
        try {
            await this.loader.withLoader(async () => {
                const response = await ApiOperations.deleteUser(this.currentId);
                if (response === "Success") {
                    this.domOp.deleteTableRow(this.currentId);
                    this.modal.createModal(response, "User successfully deleted");
                } else {
                    this.modal.createModal("Abort", response);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async editHandler() {
        try {
            this.domOp.changeToInputs(this.currentId);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async updateUser() {
        try {
            await this.loader.withLoader(async () => {
                let userData = this.domOp.dataFromTableRow(this.currentId);
                const response = await ApiOperations.editUser(userData, this.currentId);

                if (response === "Success") {
                    this.domOp.clearForm();
                    this.domOp.updateTableRow(userData, this.currentId);
                    this.domOp.updateTablebtn("add");
                    this.modal.createModal(response, "User successfully edited");
                } else {
                    this.modal.createModal("Abort", response);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async changeEnv() {
        try {
            this.envSelect = document.getElementById("environment-select");
            if (this.envSelect.value !== (await ApiOperations.checkEnv())) {
                await this.loader.withLoader(async () => {
                    const response = await ApiOperations.switchEnv(this.envSelect.value);
                    if (response === "Success") {
                        const panel = await new AdminPanel();
                        const table = document.getElementById("users-list");
                        table.innerHTML = await panel.tableUsers();
                        this.users = await ApiOperations.getUsers();
                        this.domOp.clearForm();
                        this.domOp.updateTablebtn("add");
                        this.modal.createModal(response, "Enviroment changed successfully");
                    } else {
                        this.modal.createModal("Abort", response);
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
