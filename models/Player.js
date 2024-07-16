// models/Player.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true }, // GK, FWD, DEF, MID
  club: { type: String, required: true },
  image: { type: String, required: true },
  age: {
    type: Number,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  lastFiveGames: {
    type: [Number], // Array of points from the last 5 games
    default: [],
  },
  totalGameWeekPoints: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Player', PlayerSchema);


/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['normal', 'nft'],
    required: false,
  },
  nftType: {
    type: String,
    enum: ['common', 'rare', 'unique'],
    default: 'common',
  },
  nftId: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
  },
  currentClub: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  lastFiveGames: {
    type: [Number], // Array of points from the last 5 games
    default: [],
  },
  totalGameWeekPoints: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  highlights: [{
    title: String,
    description: String,
    cover: String,
    videoLink: String,
  }],
  ipfsDataLink: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cover: {
    type: String,
  },
  cardImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Player', PlayerSchema);*/
 
