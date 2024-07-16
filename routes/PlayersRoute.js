const express = require("express")
const { getPlayers, getPlayerById } = require("../controllers/TestController")
const { getAllNftPlayers, getNftPlayer, registerNftPlayer } = require("../controllers/PlayerController")

  const router = express.Router()

    router.route("/").get(getPlayers)
    router.route("/nftcards").get(getAllNftPlayers)
    router.route('/:id').get(getPlayerById)
    router.route('/nftcards/:id').get(getNftPlayer)
    router.route("/register-nft-player").post(registerNftPlayer)



  
module.exports  = router