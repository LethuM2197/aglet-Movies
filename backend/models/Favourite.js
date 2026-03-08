const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true
  },
  movieId:     { type: Number, required: true },
  title:       { type: String, required: true },
  posterPath:  { type: String },
  releaseDate: { type: String },
  overview:    { type: String },
  voteAverage: { type: Number }
}, { timestamps: true });

// Prevent duplicate favourites per user
favouriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);