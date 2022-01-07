const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async loginChk() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);

            if (user) {
                if (user.user_id === client.id && user.user_pwd === client.pwd) {
                    return { success: true, user: user, msg: "Logged In Successfully" };
                }
                return { success: false, msg: "Password incorrect" };
            }
            return { success: false, msg: "Email does not exist" };

        } catch (err) {
            return { success: false, msg: "Error" };
        }
    }

    async registerChk() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "Error" };
        }
    }
}

module.exports = User;