const User = require("../models/User");
const Room = require("../models/Room");

const output = {
    main: (req, res) => {
        res.render("./login");
    },
    login: (req, res) => {
        res.render("./login");
    },
    register: (req, res) => {
        res.render("./register");
    },
    rooms: (req, res) => {
        res.render("./rooms");
    },
    chat: (req, res) => {
        res.render("./chat");
    },
    members: (req, res) => {
        res.render("./members");
    },
    createRoom: (req, res) => {
        res.render("./createRoom");
    },


    allroom: async(req, res) => {
        const room = new Room();
        const response = await room.roomGetall();
        return res.json(response);
    },

    loginChk: async(req, res) => {
        const user = new User(req.body);
        const response = await user.loginChk();
        return res.json(response);
    },

    registerChk: async(req, res) => {
        const user = new User(req.body);
        const response = await user.registerChk();
        return res.json(response);
    },

    roomAdd: async(req, res) => {
        const room = new Room(req.body);
        const response = await room.roomAdd();
        return res.json(response);
    },

    roompwdChk: async(req, res) => {
        const room = new Room(req.body);
        const response = await room.roompwdChk();
        return res.json(response);
    },


};

module.exports = {
    output,
};