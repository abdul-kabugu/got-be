const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameWeekSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GameWeek', GameWeekSchema);
