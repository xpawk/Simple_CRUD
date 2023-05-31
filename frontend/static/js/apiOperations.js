class ApiOperations {
    static async addUser(userData) {
        try {
            const response = await fetch(`/user`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'content-type': 'application/json',
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
    static async deleteUser(id) {
        try {
            const response = await fetch(`/user/${id}`, { method: 'DELETE' });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async editUser(userData, id) {
        try {
            const response = await fetch(`/user/${id}`, {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: {
                    'content-type': 'application/json',
                },
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async getUsers() {
        try {
            const response = await fetch('/usersTable', { method: 'GET' });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }

    static async updateApi(env) {
        try {
            const response = await fetch('/env', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ env }),
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

export { ApiOperations };
