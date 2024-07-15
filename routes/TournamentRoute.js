const  express =  require("express")
const { getAllTournaments, getUserTournaments } = require("../controllers/TournamentsController")

  const router =  express.Router()

router.route("/").get(getAllTournaments)
router.route("/user/:userId").get(getUserTournaments)



  module.exports = router