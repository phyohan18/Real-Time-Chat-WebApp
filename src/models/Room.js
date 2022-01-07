const RoomStorage = require("./RoomStorage");

class Room {
    constructor(body) {
        this.body = body;
    }

    async roomGetall() {
        try {
            const response = await RoomStorage.getAllRoomInfo();
            return response;

        } catch (err) {
            return { success: false, msg: "Error" };
        }
    }

    async roomAdd() {
        const client = this.body;
        try {
            const response = await RoomStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "Error" };
        }
    }

    async roompwdChk() {
        const client = this.body;
        try {
            const room = await RoomStorage.getRoomInfo(client.id);

            if (room) {
                if (room.room_id === client.id && room.room_pwd === client.pwd) {
                    return { success: true, room: room, msg: "Welcme To The Chat" };
                }
                return { success: false, msg: "Password incorrect" };
            }
            return { success: false, msg: "Room does not exist" };

        } catch (err) {
            return { success: false, msg: "Error" };
        }
    }
}

module.exports = Room;