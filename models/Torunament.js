// models/Tournament.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['friendly', 'premium'], required: true },
  entryFee: { type: Number, default: 0 },
  status: { type: String, default: 'upcoming' },
  participants: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    squad: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  }],
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: false },
  gameWeekId: {
    type: Schema.Types.ObjectId,
    ref: 'GameWeek',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tournament', TournamentSchema);
