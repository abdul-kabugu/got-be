const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Player Card Schema
const playerCardSchema = new Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  player: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: true,
  },
  currentClub: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model or whatever your user schema is
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  experiencePoints: {
    type: Number,
    required: true,
    default: 0,
  },
  totalXP: {
    type: Number,
    required: true,
    default: 0,
  },
  lastScores: {
    type: [Number], // Array of scores from last games
    default: [],
  },
  lastScores15Games: {
    type: [Number], // Array of scores from last 15 games
    default: [],
  },
  ipfsDataLink: {
    type: String, // IPFS link for additional data (optional)
  },
  highlights: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      cover: {
        type: String,
      },
      videoLink: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PlayerCard = mongoose.model('PlayerCard', playerCardSchema);

module.exports = PlayerCard;
