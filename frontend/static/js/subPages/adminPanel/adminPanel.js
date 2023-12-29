import { ApiOperations } from "../../apiOperations.js";
export default class AdminPanel {
    constructor() {
        document.title = "Users Table";
        return this.dbData();
    }

    async dbData() {
        try {
            this.users = await ApiOperations.getUsers();
        } catch (error) {
            console.error("Error:", error);
        }
        return this;
    }

    tableUsers() {
        let usersPrint = "";
        this.users.forEach((user) => {
            usersPrint += `
    <tr data-id=${user._id}>
    <td> <i class="ri-user-line ri-lg"></i> </td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.status}</td>
    <td>${user.name}</td>
    <td>${user.lName}</td>
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
            <th>Username</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      ${usersPrint}
        </tbody>
      </table>`;
    }
    static formUsers(title = "Input Data About New User", button = "Add") {
        return `<h2 id='user_form_title'>${title}</h2>
    <form id="user-form" class='user_form' novalidate>
      <fieldset>
        <div>
        <label for="username">Username</label>
        <input autocomplete="off" type="text" id="username" name="username">
        </div>  
        <div>
        <label for="email">E-mail</label>
        <input autocomplete="off" type="email" id="email" name="email">
        </div>
        <div>
        <label for="password">Password</label>
        <input autocomplete="off" type="password" id="password" name="password">
        </div>
        <div>
        <label for="password_c">Confirm Password</label>
        <input autocomplete="off" type="password" id="password_c" name="password_c">
        </div>
        <div>
        <label for="name">First Name</label>
        <input autocomplete="off" type="text" id="name" name="name">
        </div>
        <div>
        <label for="lName">Last Name</label>
        <input autocomplete="off" type="text" id="lName" name="lName">
        </div>
        <button type="submit" class='submit_button'>${button}</button>
      </fieldset>
    </form>
    `;
    }

    getHtml() {
        return `
    <div class='content'>
    <h2 class='table_title'>Users Data</h2> 
${this.tableUsers()}
${AdminPanel.formUsers()} 
  </div>
    `;
    }
}
