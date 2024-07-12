const  asyncHandler =  require("express-async-handler")
const crypto  =  require("crypto")
const { HexString } = require('aptos');
const nacl  = require('tweetnacl');
const jwt =  require("jsonwebtoken");
const { constants, secretKey } = require("../constants");
const  User = require("../models/UserModel");



const  getNonce = asyncHandler(async (req, res)  =>  {
    const nonce  = crypto.randomBytes(32).toString("hex")
   res.status(200).json({nonce : nonce})
      
 })


 const verifyNonce  =  asyncHandler(async (req, res) =>  {
    const { address }  = req.body
  // const recoveredAddress = ethers.verifyMessage(message, signedMessage)

   


  /*  const verified = nacl.sign.detached.verify(
        new TextEncoder().encode(signedMessage),
       // new HexString(signature).toUint8Array(),
        new HexString(key).toUint8Array(),
      );*/

   
   if( ! address){
       res.status(constants.VALIDATION_ERROR).json({message : "please specify address"})
   }
   
   //const isAvailable = await User.findOne({address})
   
   let user = await User.findOne({ address });
    
   if(! user){
      // const user = new User({address : address})
   
      user = new User({address : address });
       await user.save()
   }
   
    const token =  jwt.sign({id : user._id},  secretKey, {expiresIn : "1h"} )
   
    res.json({token : token, user : user})
   
    })


 module.exports = {getNonce, verifyNonce}