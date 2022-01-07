const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE user_id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO users (user_name, user_id ,user_pwd) VALUES(?,?,?);";
            db.query(query, [userInfo.name, userInfo.id, userInfo.pwd], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true, msg: "Register Successfully" });
            });
        });
    }
}

module.exports = UserStorage;