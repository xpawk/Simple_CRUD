import { ApiOperations } from '../../apiOperations.js';

export default class DomOperations {
    constructor() {
        this.envSelect = document.getElementById('environment-select');
        this.inputFields = document.querySelectorAll('#user-form input');
        this.formTitle = document.querySelector('#user_form_title');
        this.button = document.querySelector('#user-form .submit_button');
        this.text = {
            newUser: 'Input Data About New Users',
            register: 'Sing up to Habit Tracker',
            updateUser: `Update data about `,
        };
        return this.dbData();
    }

    async dbData() {
        this.users = await ApiOperations.getUsers();
        return this;
    }
    deleteTableRow(id) {
        document.querySelector(`#users-list tr[data-id="${id}"]`).remove();
        if (this.button.getAttribute('data-id') == id) {
            this.clearForm();
            this.updateTablebtn('add');
        }
    }

    updateTablebtn(type, id) {
        if (type === 'add') {
            this.button.textContent = 'Add';
            this.button.type = 'submit';
        } else if (type === 'update') {
            this.button.textContent = 'Update';
            this.button.type = 'button';
            this.button.setAttribute('data-id', id);
        }
    }
    updateTableRow(userData, id) {
        let row = document.querySelector(`#users-list tr[data-id="${id}"]`);
        const usersList = document.querySelector('#users-list');
        if (!row && usersList) {
            row = document.createElement('tr');
            row.setAttribute('data-id', id);
            document.querySelector('#users-list').appendChild(row);
        }
        if (row) {
            row.innerHTML = `
        <td> <i class="ri-user-line ri-lg"></i> </td>
        <td>${userData.username}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.name}</td>
        <td>${userData.lName}</td>
        <td>
        <button class="edit" data-id="${id}"><i class="ri-pencil-line ri-lg"></i></button>
        <button class="delete" data-id="${id}"><i class="ri-delete-bin-7-line ri-lg"></i></button>
        </td>
      `;
        }
    }
    dataFromForm() {
        let userData = {};
        this.inputFields?.forEach(({ name, value }) => {
            userData[name] = value;
        });
        return userData;
    }
    clearForm() {
        this.formTitle.innerHTML =
            window.location.pathname === '/register'
                ? this.text.register
                : this.text.newUser;
        this.inputFields?.forEach((input) => {
            input.value = '';
        });
    }
    userToForm(user) {
        this.inputFields?.forEach((input) => {
            input.value = user[input.id];
        });
    }
    setFormTitle(currentUser) {
        this.formTitle.innerHTML = this.text.updateUser + currentUser.username;
    }
}
