class ApiOperations {
    static async addUser(userData) {
        try {
            const response = await fetch(`/user`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    authorization: sessionStorage.token,
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async logIn(credentials) {
        try {
            const response = await fetch(`/login`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async deleteUser(id) {
        try {
            const response = await fetch(`/user/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: sessionStorage.token,
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async editUser(userData, id) {
        try {
            const response = await fetch(`/user/${id}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    authorization: sessionStorage.token,
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async getUsers() {
        try {
            const response = await fetch("/usersTable", {
                method: "GET",
                headers: {
                    authorization: sessionStorage.token,
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async switchEnv(env) {
        try {
            const response = await fetch("/env", {
                method: "POST",
                headers: {
                    authorization: sessionStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ env }),
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async checkEnv() {
        try {
            const response = await fetch("/checkEnv", {
                method: "GET",
                headers: {
                    authorization: sessionStorage.token,
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async userStatus() {
        try {
            const response = await fetch("/userStatus", {
                method: "GET",
                headers: {
                    authorization: sessionStorage.token,
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async changePassword(passwordInfo) {
        try {
            const response = await fetch("/changePassword", {
                method: "POST",
                headers: {
                    authorization: sessionStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passwordInfo),
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

export { ApiOperations };
