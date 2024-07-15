const  asyncHandler =  require("express-async-handler")
const  Tournament  =  require("../models/Torunament")




// @desc    Fetch all tournaments
// @route   GET /api/tournaments
// @access  Public
const getAllTournaments = asyncHandler(async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('participants').populate('matchId');
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Fetch tournaments a user has joined
// @route   GET /api/tournaments/user/:userId
// @access  Public
/*const getUserTournaments = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const tournaments = await Tournament.find({ 'participants': userId }).populate('participants').populate('matchId');
    if (!tournaments) {
      return res.status(404).json({ message: 'No tournaments found for this user' });
    }
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error});
  }
});*/


const getUserTournaments = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    try {
      const tournaments = await Tournament.find({ 'participants.userId': userId }).populate('participants.userId').populate('matchId');
      if (!tournaments || tournaments.length === 0) {
        return res.status(404).json({ message: 'No tournaments found for this user' });
      }
      res.status(200).json(tournaments);
    } catch (error) {
      console.error(`Error fetching tournaments for user ${userId}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = {
  getAllTournaments,
  getUserTournaments,
};
