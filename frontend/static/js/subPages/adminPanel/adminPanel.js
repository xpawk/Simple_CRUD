import { ApiOperations } from '../../apiOperations.js';

export default class AdminPanel {
    constructor() {
        document.title = 'Users Table';
        return this.dbData();
    }

    async dbData() {
        this.users = await ApiOperations.getUsers();
        this.dbName = await ApiOperations.checkEnv();
        return this;
    }

    tableUsers() {
        let usersPrint = '';
        this.users.forEach((user) => {
            usersPrint += `
    <tr data-id=${user._id}>
    <td> <i class="ri-user-line ri-lg"></i> </td>
    <td>${user.name}</td>
    <td>${user.lName}</td>
    <td>${user.age}</td>
    <td>${user.phone}</td>
    <td>${user.address}</td>
    <td>
    <button class="edit" data-id="${user._id}"><i class="ri-pencil-line ri-lg"></i></button>
    <button class="delete" data-id="${user._id}"><i class="ri-delete-bin-7-line ri-lg"></i></button>
    </td>
    </tr>
    `;
        });
        return `
        <table id='users-list'>
        <thead>
          <tr>
            <th><i class="ri-team-line ri-2x"></i></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Phone num.</th>
            <th>Adress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      ${usersPrint}
        </tbody>
      </table>`;
    }
    formUsers() {
        return `<h2 id='users_title'>Input Data About New User</h2>
    <form id="user-form">
      <fieldset>
        <label for="name">First Name</label>
        <input type="text" id="name" name="name" required>

        <label for="lName">Last Name</label>
        <input type="text" id="lName" name="lName" required>

        <label for="age">Age</label>
        <input type="text" id="age" name="age" required>

        <label for="phone">Phone num.</label>
        <input type="text" id="phone" name="phone" required>

        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>

        <input type="submit" class='submit_button' value="Add">
      </fieldset>
    </form>
    `;
    }
    dbSelect() {
        return `<div class='env'>
  <select id="environment-select" name="environment">
        <option value="prod" ${
            this.dbName === 'prod' ? 'selected' : ' '
        }>Prod</option>
        <option value="preprod" ${
            this.dbName === 'preprod' ? 'selected' : ' '
        }>Preprod</option>
  </select>
  <button type='button' class="update_env_button">Change</button>
  </div>
    `;
    }
    modal() {
        return `
    <div class="modal_control">
  <div class="modal_control_bg "></div>
  <div class="modal_content">
    <h2>Success</h2>
    <p></p>
    <button class="modal_control_close ">Continue</button>
  </div>
  </div>
    `;
    }

    loader() {
        return `<div class='loader'>
      <div class='loader_content'></div>
      <div class='loader_bg'></div>
      </div>`;
    }

    getHtml() {
        return `
      
      ${this.modal()}
      ${this.loader()}
    <div class='content'>
    <h2>Users Data</h2>
${this.dbSelect()}  
${this.tableUsers()}
${this.formUsers()} 
  </div>
    `;
    }
}
