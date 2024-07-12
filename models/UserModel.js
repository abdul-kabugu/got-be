const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    username: { type: String },
    bio: { type: String },
    avatar: { type: String },
    cover: { type: String },
    nftCards: [
        {
          tokenId: {
            type: String,
            required: false,
          },
          metadata: {
            type: Object,
            required: false,
          },
          acquiredAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      teams: [
        {
          name: {
            type: String,
            required: true,
          },
          players: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'NftCard',
            },
          ],
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ], 

      tournamentsJoined: [
        {
          tournamentId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Tournament',
          },
          joinedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    playerCrads: [String],
    xp: { type: Number, default: 0 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);