import { ApiOperations } from '../apiOperations.js';

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
    <td>${user.name}</td>
    <td>${user.lName}</td>
    <td>${user.age}</td>
    <td>${user.phone}</td>
    <td>${user.address}</td>
    <td><button class="delete" data-id="${user._id}">Delete</button>
    <button class="edit" data-id="${user._id}">Edit</button></td>
    </tr>
    `;
        });
        return `
    
        <table id='users-list'>
        <thead>
          <tr>
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
        return `<h2 id='users_title'>Input Data About New Users</h2>
    <form id="user-form">
      <fieldset>
      <div>
        <label for="name">First Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="lName">Last Name</label>
        <input type="text" id="lName" name="lName" required>
        </div>
        <div>
        <label for="age">Age</label>
        <input type="text" id="age" name="age" required>
        </div>
        <div>
        <label for="phone">Phone num.</label>
        <input type="text" id="phone" name="phone" required>
        </div>
        <div>
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
        </div>
        <input type="submit" class='submit_button' value="Add">
      </fieldset>
    </form>
    `;
    }
    dbSelect() {
        return `<div class='env'>
  <select id="environment-select" name="environment">
        <option value="prod" ${
            this.dbName === 'prod' ? 'selected' : ''
        }>Prod</option>
        <option value="preprod" ${
            this.dbName === 'preprod' ? 'selected' : ''
        }>Preprod</option>
  </select>
  <button type='button' class="update_env_button">Update</button>
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

    getHtml() {
        return `
      <header>
      <h1 class="title"><a href='/'>Users List</a></h1>
      ${this.dbSelect()}   
      </header>
      ${this.modal()}
    <div class='content'>
    <h2>Users Data</h2>
${this.tableUsers()}
${this.formUsers()}  
  </div>
    `;
    }
}
