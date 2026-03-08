const Favourite = require('../models/Favourite');

exports.index = async (req, res) => {
  try {
    const favourites = await Favourite
      .find({ userId: req.session.user._id })
      .sort({ createdAt: -1 });

    res.render('favourites/index', {
      title:      'My Favourites — MovieDB',
      favourites,
      imageBase:  process.env.TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500'
    });
  } catch (err) {
    console.error(err);
    res.render('error', { title: 'Error', message: 'Failed to load favourites.' });
  }
};

exports.add = async (req, res) => {
  try {
    const { movieId, title, posterPath, releaseDate, overview, voteAverage } = req.body;

    await Favourite.findOneAndUpdate(
      { userId: req.session.user._id, movieId: Number(movieId) },
      { userId: req.session.user._id, movieId: Number(movieId),
        title, posterPath, releaseDate, overview, voteAverage },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: `${title} added to favourites!` });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Failed to add favourite.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await Favourite.findOneAndDelete({
      userId:  req.session.user._id,
      movieId: Number(req.params.movieId)
    });
    res.json({ success: true, message: 'Removed from favourites.' });
  } catch (err) {
    res.json({ success: false, message: 'Failed to remove favourite.' });
  }
};