import { ApiOperations } from './apiOperations.js';
import AdminPanel from './subPages/adminPanel.js';

class Events {
    static async variables() {
        try {
            this.envSelect = document.getElementById('environment-select');
            this.users = await ApiOperations.getUsers();
            this.inputFields = document.querySelectorAll(
                '#user-form input[type="text"]',
            );
            this.formTitle = document.querySelector('#users_title');
            this.button = document.querySelector('#user-form .submit_button');
            this.text = {
                newUser: 'Input Data About New Users',
                updateUser: `Update data about `,
            };
            this.modal = document.querySelector('.modal_control');
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
                modal_control_close: () => this.closeModal(),
                modal_control_bg: () => this.closeModal(),
            };
        } catch (err) {
            console.log(err);
        }
    }

    static preventSubmit() {
        document.querySelector('#user-form').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    static async eventHandler() {
        try {
            this.variables();
            this.preventSubmit();
            document.body.addEventListener('click', (e) => {
                const target = e.target;
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

    static async addHandler() {
        try {
            let userData = this.dataFromForm();
            const response = await ApiOperations.addUser(userData);
            if (response === 'Success') {
                this.users = await ApiOperations.getUsers();
                this.currentUser = this.users.slice(-1)[0];
                this.clearForm();
                this.updateTableRow(userData, await this.currentUser._id);
                this.createModal(response, 'User successfully added');
            } else {
                this.createModal('Abort', response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteHandler() {
        try {
            const response = await ApiOperations.deleteUser(this.currentId);
            if (response === 'Success') {
                this.deleteTableRow(this.currentId);
                this.createModal(response, 'User successfully deleted');
            } else {
                this.createModal('Abort', response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editHandler() {
        try {
            this.formTitle.innerHTML =
                this.text.updateUser + this.currentUser.name;
            this.updateTablebtn('update');
            this.userToForm(this.currentUser);
        } catch (err) {
            console.log(err);
        }
    }

    static async updateUser() {
        try {
            let userData = this.dataFromForm();
            const response = await ApiOperations.editUser(
                userData,
                this.currentId,
            );
            if (response === 'Success') {
                this.clearForm();
                this.updateTableRow(userData, this.currentId);
                this.updateTablebtn('add');
                this.createModal(response, 'User successfully edited');
            } else {
                this.createModal('Abort', response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async changeEnv() {
        try {
            if (this.envSelect.value !== (await ApiOperations.checkEnv())) {
                const response = await ApiOperations.switchEnv(
                    this.envSelect.value,
                );
                if (response === 'Success') {
                    const panel = await new AdminPanel();
                    const table = document.getElementById('users-list');
                    table.innerHTML = await panel.tableUsers();
                    this.users = await ApiOperations.getUsers();
                    this.clearForm();
                    this.updateTablebtn('add');
                    this.createModal(
                        response,
                        'Enviroment changed successfully',
                    );
                } else {
                    this.createModal('Abort', response);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    static deleteTableRow(id) {
        document.querySelector(`#users-list tr[data-id="${id}"]`).remove();
        if (this.button.getAttribute('data-id') == id) {
            this.clearForm();
            this.updateTablebtn('add');
        }
    }

    static updateTablebtn(type) {
        if (type === 'add') {
            this.button.value = 'Add';
            this.button.type = 'submit';
        } else if (type === 'update') {
            this.button.value = 'Update';
            this.button.type = 'button';
            this.button.setAttribute('data-id', this.currentId);
        }
    }
    static updateTableRow(userData, id) {
        let row = document.querySelector(`#users-list tr[data-id="${id}"]`);
        if (!row) {
            row = document.createElement('tr');
            row.setAttribute('data-id', id);
            document.querySelector('#users-list').appendChild(row);
        }
        if (row) {
            row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.lName}</td>
        <td>${userData.age}</td>
        <td>${userData.phone}</td>
        <td>${userData.address}</td>
        <td>
          <button class="delete" data-id="${id}">Delete</button>
          <button class="edit" data-id="${id}">Edit</button>
        </td>
      `;
        }
    }
    static dataFromForm() {
        let userData = {};
        this.inputFields.forEach(({ name, value }) => {
            userData[name] = value;
        });
        return userData;
    }
    static clearForm() {
        this.formTitle.innerHTML = this.text.newUser;
        this.inputFields.forEach((input) => {
            input.value = '';
        });
    }
    static userToForm(user) {
        this.inputFields.forEach((input) => {
            input.value = user[input.id];
        });
    }
    static createModal(header, text) {
        this.modal.classList.add('open');
        const modalContent = this.modal.querySelector('.modal_content');
        modalContent.querySelector('p').textContent = text;
        modalContent.querySelector('h2').textContent = header;
    }
    static closeModal() {
        this.modal.classList.remove('open');
    }
}
export { Events };
