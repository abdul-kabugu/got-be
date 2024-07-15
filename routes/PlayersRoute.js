const express = require("express")
const { getPlayers, getPlayerById } = require("../controllers/TestController")

  const router = express.Router()

    router.route("/").get(getPlayers)
    router.route('/:id').get(getPlayerById)

  
module.exports  = router