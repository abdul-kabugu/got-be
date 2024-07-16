
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftPlayerSchema = new Schema({
    playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    type: { type: String, enum: ['common', 'rare', 'unique'], required: true },
    price: { type: Number },
    nftId: {
        type: String,
        required: false,
      },
    ipfsDataLink: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('NftPlayer', NftPlayerSchema);
  