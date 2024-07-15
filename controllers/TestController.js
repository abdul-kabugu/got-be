const  asyncHandler = require("express-async-handler")
const Match = require("../models/Match")
const Player =  require("../models/Player")
const Tournament =  require("../models/Torunament")
const  User =  require("../models/UserModel")

 //const  GameWeek =  require("../models/GwMatches")


 
const registerPlayer =  asyncHandler(async (req, res)  =>  {

    const { name, position, club } = req.body;

    try {
      const newPlayer = new Player({
         name,
          position,
           club,
        
        });
      await newPlayer.save();
      res.status(201).json(newPlayer);
    } catch (error) {
      res.status(500).json({ message: error });
    }

})

const getPlayers  = asyncHandler( async (req, res)  =>  {


  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error});
  }
})


const getPlayerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error});
  }
});

const updatePlayer =  asyncHandler(async (req, res)  =>  {

    const { matchId } = req.params;
    const { playerId, actionType, points } = req.body;
  
    try {
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

        // Find the player card
    const playerCard = await Player.findById(playerId);
    if (!playerCard) {
      return res.status(404).json({ message: 'Player card not found' });
    }

         // Update player stats
    playerCard.totalPoints += points;
    playerCard.totalGameWeekPoints += points;

    // Update points for last 5 games
    playerCard.lastFiveGames.push(points);
    if (playerCard.lastFiveGames.length > 5) {
      playerCard.lastFiveGames.shift();
    }

    await playerCard.save()
  
      match.actions.push({ playerId, actionType, points });
      await match.save();
  
      res.status(201).json(match);
    } catch (error) {
      res.status(500).json({ message: error});
    }

})


const addMatch =  asyncHandler(async (req, res)  =>  {

    const { homeTeam, awayTeam, date, gameWeek } = req.body;

    try {
      const newMatch = new Match({ homeTeam, awayTeam, date , gameWeek});
      await newMatch.save();
      res.status(201).json(newMatch);
    } catch (error) {
      res.status(500).json({ message: error});
    }

})

const createPlay =  asyncHandler(async (req, res)  =>  {

    const { name, type, entryFee, matchId } = req.body;

    try {
      const newTournament = new Tournament({ name, type, entryFee, matchId });
      await newTournament.save();
      res.status(201).json(newTournament);
    } catch (error) {
      res.status(500).json({ message: error });
    }

})


const joinPlay =  asyncHandler(async (req, res)  =>  {

    const { tournamentId } = req.params;
    const { userId, squad } = req.body; // squad: array of player IDs
  
    try {
      const tournament = await Tournament.findById(tournamentId);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is already a participant
      if (tournament.participants.some(p => p.userId.toString() === userId)) {
        return res.status(400).json({ message: 'User already joined the tournament' });
      }
  
      // Add user to participants
      tournament.participants.push({ userId, squad });
      await tournament.save();
  
      res.status(200).json({ message: 'User joined the tournament', tournament });
    } catch (error) {
      res.status(500).json({ message: error});
    }

})



const getPlayResults =  asyncHandler(async (req, res)  =>  {

 const { matchId } = req.params;

    try {
      const match = await Match.findById(matchId).populate('actions.playerId');
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }
  
      const tournament = await Tournament.findOne({ matchId });
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
  
      const scores = {};
  
      tournament.participants.forEach(participant => {
        scores[participant.userId] = 0;
  
        participant.squad.forEach(playerId => {
          match.actions.forEach(action => {
            if (action.playerId._id.toString() === playerId.toString()) {
              scores[participant.userId] += action.points;
            }
          });
        });
      });
  
      const leaderboard = Object.entries(scores).map(([userId, points]) => ({
        userId,
        points,
      })).sort((a, b) => b.points - a.points);
  
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: error});
    }


})


 const  getUserResults  = asyncHandler( async (req, res)  =>  {

    const { matchId, userId } = req.params;

    try {
      const match = await Match.findById(matchId).populate('actions.playerId');
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }
  
      const tournament = await Tournament.findOne({ matchId });
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
  
      // Find the participant
      const participant = tournament.participants.find(p => p.userId.toString() === userId);
      if (!participant) {
        return res.status(404).json({ message: 'User not found in the tournament' });
      }
  
      // Calculate the user's points
      let userPoints = 0;
      participant.squad.forEach(playerId => {
        match.actions.forEach(action => {
          if (action.playerId._id.toString() === playerId.toString()) {
            userPoints += action.points;
          }
        });
      });
  
      res.status(200).json({ userId, points: userPoints });
    } catch (error) {
      res.status(500).json({ message: error});
    }

 })


// Fetch all matches
const getAllMatches = asyncHandler(async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch match by ID
const getMatchById = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});







  



module.exports  = {registerPlayer, getPlayResults, joinPlay, createPlay, addMatch, updatePlayer,
   getUserResults, getPlayers, getPlayerById, getAllMatches, getMatchById}