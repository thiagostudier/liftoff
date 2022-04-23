const express = require("express");

/** Controllers */
const questionController = require('./controllers/QuestionController')
const roomController = require('./controllers/RoomController')

const route = express.Router();

/** Routes */
route.get("/", (req, res) => res.render("index", { page: 'enter-room' }));

route.get("/create-pass", (req, res) => res.render("index", { page: 'create-pass' }));
route.get("/no-room", (req, res) => res.render("index", { page: 'no-room' }));
route.get("/room/:room", roomController.open);
route.post("/room/:room/:question/:action", questionController.index);
route.post("/room/create-room", roomController.create)
route.post("/enter-room", roomController.enter)

route.post("/question/create/:room", questionController.create)
route.post("/question/:room/:question/:action", questionController.index)


module.exports = route;
