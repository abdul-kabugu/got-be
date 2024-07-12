// models/Match.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: false },
  logo: { type: String, required: false },
});

const MatchSchema = new Schema({
  homeTeam: { type: TeamSchema, required: true },
  awayTeam: { type: TeamSchema, required: true },
  date: { type: Date, required: true },
  gameWeek: { type: Number, required: true },
  actions: [{
    playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
    actionType: { type: String, required: true }, // goal, assist, save, yellow card, red card
    points: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Match', MatchSchema);

//module.exports = mongoose.model('Match', MatchSchema);
