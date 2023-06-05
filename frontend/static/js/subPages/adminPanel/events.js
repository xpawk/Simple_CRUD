import { ApiOperations } from '../../apiOperations.js';
import DomOperations from './domOperations.js';
import AdminPanel from './adminPanel.js';
import Loader from '../../utils/Loader.js';
export default class Events {
    constructor() {
        this.envSelect = document.getElementById('environment-select');
        this.button = document.querySelector('#user-form .submit_button');
        this.handlers = {
            edit: () => this.editHandler(),
            delete: () => this.deleteHandler(),
            submit_button: () => {
                const submitType = this.button.type;
                if (submitType === 'submit') {
                    return this.addHandler();
                } else if (submitType === 'button') {
                    return this.updateUser();
                }
            },
            update_env_button: () => this.changeEnv(),
            modal_control_close: () => this.domOp.closeModal(),
            modal_control_bg: () => this.domOp.closeModal(),
        };
        this.eventHandler();
        return this.variables();
    }
    async variables() {
        try {
            this.loader = new Loader(document.querySelector('.loader'));
            this.domOp = await new DomOperations();
            this.users = await ApiOperations.getUsers();
            return this;
        } catch (err) {
            console.log(err);
        }
    }

    preventSubmit() {
        document.querySelector('#user-form').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    async eventHandler() {
        try {
            this.preventSubmit();
            document.body.addEventListener('click', (e) => {
                let target = e.target;
                while (
                    target != null &&
                    !Array.from(target.classList).some((r) =>
                        this.handlers.hasOwnProperty(r),
                    )
                ) {
                    target = target.parentElement;
                }
                if (target == null) return;
                const classList = target.classList;
                this.currentId = target.getAttribute('data-id');
                this.currentUser = this.users.find(
                    (user) => user._id === this.currentId,
                );
                for (const className in this.handlers) {
                    if (classList.contains(className)) {
                        return this.handlers[className]();
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async addHandler() {
        try {
            await this.loader.withLoader(async () => {
                let userData = this.domOp.dataFromForm();
                const response = await ApiOperations.addUser(userData);
                if (response === 'Success') {
                    this.users = await ApiOperations.getUsers();
                    this.currentUser = this.users.slice(-1)[0];
                    this.domOp.clearForm();
                    this.domOp.updateTableRow(
                        userData,
                        await this.currentUser._id,
                    );
                    this.domOp.createModal(response, 'User successfully added');
                } else {
                    this.domOp.createModal('Abort', response);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async deleteHandler() {
        try {
            await this.loader.withLoader(async () => {
                const response = await ApiOperations.deleteUser(this.currentId);
                if (response === 'Success') {
                    this.domOp.deleteTableRow(this.currentId);
                    this.domOp.createModal(
                        response,
                        'User successfully deleted',
                    );
                } else {
                    this.domOp.createModal('Abort', response);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async editHandler() {
        try {
            this.domOp.setFormTitle(this.currentUser);
            this.domOp.updateTablebtn('update', this.currentId);
            this.domOp.userToForm(this.currentUser);
        } catch (err) {
            console.log(err);
        }
    }

    async updateUser() {
        try {
            await this.loader.withLoader(async () => {
                let userData = this.domOp.dataFromForm();
                const response = await ApiOperations.editUser(
                    userData,
                    this.currentId,
                );
                if (response === 'Success') {
                    this.domOp.clearForm();
                    this.domOp.updateTableRow(userData, this.currentId);
                    this.domOp.updateTablebtn('add');
                    this.domOp.createModal(
                        response,
                        'User successfully edited',
                    );
                } else {
                    this.domOp.createModal('Abort', response);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async changeEnv() {
        try {
            if (this.envSelect.value !== (await ApiOperations.checkEnv())) {
                await this.loader.withLoader(async () => {
                    const response = await ApiOperations.switchEnv(
                        this.envSelect.value,
                    );
                    if (response === 'Success') {
                        const panel = await new AdminPanel();
                        const table = document.getElementById('users-list');
                        table.innerHTML = await panel.tableUsers();
                        this.users = await ApiOperations.getUsers();
                        this.domOp.clearForm();
                        this.domOp.updateTablebtn('add');
                        this.domOp.createModal(
                            response,
                            'Enviroment changed successfully',
                        );
                    } else {
                        this.domOp.createModal('Abort', response);
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}
