const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'PlayerCard',
    required: true,
  },
  actionType: {
    type: String,
    enum: ['save', 'cleanSheet', 'goalsConceded', 'minutesPlayed', 'yellowCard', 'goal', 'assist', 'tackle'],
    required: true,
  },
  points: {
    type: Number,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
