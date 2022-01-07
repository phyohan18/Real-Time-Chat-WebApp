const db = require("../config/db");

class RoomStorage {
    static getRoomInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM rooms WHERE room_id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static getAllRoomInfo() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM rooms";
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true, data });
            });
        });
    }

    static async save(roomInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO rooms (room_name, room_id ,room_pwd) VALUES(?,?,?);";
            db.query(query, [roomInfo.name, roomInfo.id, roomInfo.pwd], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true, msg: "New Room Has been Successfully Created" });
            });
        });
    }
}

module.exports = RoomStorage;