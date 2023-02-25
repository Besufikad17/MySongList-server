const route = require("express").Router()
const songController = require("../controllers/songController")

route.post("/add", songController.addSong);

route.get("/all", songController.getSongs);

route.put("/update/:id", songController.updateSongById);

route.delete("/delete/:id", songController.deleteSongById);

module.exports = route;