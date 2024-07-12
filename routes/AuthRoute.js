const express  = require("express")
const {getNonce, verifyNonce}  = require("../controllers/AuthController")

  const router = express.Router();


  router.route("/get-nonce").get(getNonce)
  router.route("/verify-nonce").post(verifyNonce)


  module.exports = router