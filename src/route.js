const express = require("express");

/** Controllers */
const questionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router();

/** Routes */
route.get("/", (req, res) => res.render("index", { page: 'enter-room' }));
route.get("/create-pass", (req, res) => res.render("index", { page: 'create-pass' }));
route.get("/room/:room", (req, res) => res.render("room"));

route.post("/room/:room/:question/:action", questionController.index);
route.post("/room/create-room", RoomController.create)

module.exports = route;
