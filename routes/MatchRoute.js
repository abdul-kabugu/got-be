const  express =  require("express")
const { registerPlayer, updatePlayer, addMatch, createPlay, joinPlay, getPlayResults, getUserResults, getPlayers, getPlayerById, getAllMatches, getMatchById } = require("../controllers/TestController")

  const  router  =  express.Router()



    router.route("/register-player").post(registerPlayer)
    router.route("/").get(getAllMatches)
    router.route("/:matchId").get(getMatchById)
    router.route("/update-player/:matchId").post(updatePlayer)
  router.route("/players").get(getPlayers)
  router.route('/players/:id').get(getPlayerById)
    router.route("/add-match").post(addMatch)

    router.route("/create-tornament").post(createPlay)
    router.route("/tournament/:tournamentId/join").post(joinPlay)
    router.route("/results/:matchId").get(getPlayResults)
    router.route("/results/:matchId/:userId").get(getUserResults)







  module.exports = router