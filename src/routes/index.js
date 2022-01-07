const express = require("express");
const router = express.Router();
const ctrl = require("./route.ctrl");



router.get("/", ctrl.output.main);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.get("/rooms", ctrl.output.rooms);
router.get("/chat", ctrl.output.chat);
router.get("/members", ctrl.output.members);
router.get("/createRoom", ctrl.output.createRoom);

router.get("/allRoom", ctrl.output.allroom);
router.post("/loginChk", ctrl.output.loginChk);
router.post("/registerChk", ctrl.output.registerChk);
router.post("/roomAdd", ctrl.output.roomAdd);
router.post("/roompwdChk", ctrl.output.roompwdChk);



module.exports = router;