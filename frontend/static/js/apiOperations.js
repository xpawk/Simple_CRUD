class ApiOperations {
    static async addUser(userData) {
        try {
            const response = await fetch(`/user`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
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
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async deleteUser(id) {
        try {
            const response = await fetch(`/user/${id}`, {
                method: "DELETE",
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    static async editUser(userData, id) {
        try {
            const response = await fetch(`/user/${id}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    static async getUsers() {
        try {
            const response = await fetch("/usersTable", {
                method: "GET",
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async getUser() {
        try {
            const response = await fetch("/getUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async switchEnv(env) {
        try {
            const response = await fetch("/env", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ env }),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async checkEnv() {
        try {
            const response = await fetch("/checkEnv", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async userStatus() {
        try {
            const response = await fetch("/userStatus", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async changePassword(passwordInfo) {
        try {
            const response = await fetch("/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passwordInfo),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
    static async logOut() {
        try {
            const response = await fetch(`/logout`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
export { ApiOperations };
