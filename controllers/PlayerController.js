const  asyncHandler = require("express-async-handler")
const  Player =  require("../models/Player")
const  NftPlayer =  require("../models/NftPlayerModel")
const User  =  require("../models/UserModel")




const  registerNftPlayer  =   asyncHandler(  async (req, res)  =>  {

      const {playerId, owner, type, ipfsDataLink, price, nftId}  =  req.body


      try {
        const newPlayer = new NftPlayer({
           playerId,
            owner,
             type,
             ipfsDataLink,
             price,
             nftId
          
          });
        await newPlayer.save();
        res.status(201).json(newPlayer);
      } catch (error) {
        res.status(500).json({message :  error});
      }

})


const getNftPlayer = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const nftPlayer = await NftPlayer.findById(id).populate('playerId');
      if (!nftPlayer) {
        return res.status(404).json({ message: 'NFT Player not found' });
      }
      res.status(200).json(nftPlayer);
    } catch (error) {
      res.status(500).json({ message:  error});
    }
  });




  const getAllNftPlayers = asyncHandler(async (req, res) => {
    try {
      const nftPlayers = await NftPlayer.find().populate('playerId');
      res.status(200).json(nftPlayers);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


   module.exports  = {registerNftPlayer, getAllNftPlayers, getNftPlayer}
  

