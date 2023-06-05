import { ApiOperations } from '../../apiOperations.js';

export default class DomOperations {
    constructor() {
        this.envSelect = document.getElementById('environment-select');
        this.inputFields = document.querySelectorAll(
            '#user-form input[type="text"]',
        );
        this.formTitle = document.querySelector('#user_form_title');
        this.button = document.querySelector('#user-form .submit_button');
        this.text = {
            newUser: 'Input Data About New Users',
            updateUser: `Update data about `,
        };
        this.modal = document.querySelector('.modal_control');
        this.loader = document.querySelector('.loader');
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
            this.button.value = 'Add';
            this.button.type = 'submit';
        } else if (type === 'update') {
            this.button.value = 'Update';
            this.button.type = 'button';
            this.button.setAttribute('data-id', id);
        }
    }
    updateTableRow(userData, id) {
        let row = document.querySelector(`#users-list tr[data-id="${id}"]`);
        if (!row) {
            row = document.createElement('tr');
            row.setAttribute('data-id', id);
            document.querySelector('#users-list').appendChild(row);
        }
        if (row) {
            row.innerHTML = `
        <td> <i class="ri-user-line ri-lg"></i> </td>
        <td>${userData.name}</td>
        <td>${userData.lName}</td>
        <td>${userData.age}</td>
        <td>${userData.phone}</td>
        <td>${userData.address}</td>
        <td>
        <button class="edit" data-id="${userData._id}"><i class="ri-pencil-line ri-lg"></i></button>
        <button class="delete" data-id="${userData._id}"><i class="ri-delete-bin-7-line ri-lg"></i></button>
        </td>
      `;
        }
    }
    dataFromForm() {
        let userData = {};
        this.inputFields.forEach(({ name, value }) => {
            userData[name] = value;
        });
        return userData;
    }
    clearForm() {
        this.formTitle.innerHTML = this.text.newUser;
        this.inputFields.forEach((input) => {
            input.value = '';
        });
    }
    userToForm(user) {
        this.inputFields.forEach((input) => {
            input.value = user[input.id];
        });
    }
    setFormTitle(currentUser) {
        this.formTitle.innerHTML = this.text.updateUser + currentUser.name;
    }
    createModal(header, text) {
        this.modal.classList.add('open');
        const modalContent = this.modal.querySelector('.modal_content');
        modalContent.querySelector('p').textContent = text;
        modalContent.querySelector('h2').textContent = header;
    }
    closeModal() {
        this.modal.classList.remove('open');
    }
    loaderHandler(action) {
        if (action) {
            this.loader.style.display = 'block';
        } else {
            this.loader.style.display = 'none';
        }
    }
}
