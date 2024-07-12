const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SquadSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'PlayerCard',
    required: true,
  }],
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Squad', SquadSchema);
