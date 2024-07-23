const express  = require("express")
const {getNonce, verifyNonce, getUser, getAllUsers}  = require("../controllers/AuthController")

  const router = express.Router();


  router.route("/get-nonce").get(getNonce)
  router.route("/verify-nonce").post(verifyNonce)
  router.route("/users").get(getAllUsers)
  router.route("/profile/:profileId").get(getUser)


  module.exports = router