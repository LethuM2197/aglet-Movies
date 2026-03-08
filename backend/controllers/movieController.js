const { getMovies, searchMovies, getMovieById } = require('../config/tmdb');
const Favourite = require('../models/Favourite');

const TOTAL_PAGES = 5; // 5 pages × 9 movies = 45 total

exports.index = async (req, res) => {
  try {
    const page   = Math.min(Math.max(parseInt(req.query.page) || 1, 1), TOTAL_PAGES);
    const movies = await getMovies(page);

    let favouriteIds = [];
    if (req.session.user) {
      const favs   = await Favourite.find({ userId: req.session.user._id });
      favouriteIds = favs.map(f => f.movieId);
    }

    res.render('movies/index', {
      title:        'MovieDB — Discover Films',
      movies,
      currentPage:  page,
      totalPages:   TOTAL_PAGES,
      favouriteIds,
      imageBase:    process.env.TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500'
    });
  } catch (err) {
    console.error(err);
    res.render('error', { title: 'Error', message: 'Failed to load movies. Check your TMDB API key.' });
  }
};

exports.search = async (req, res) => {
  try {
    const query   = req.query.q || '';
    const results = query ? await searchMovies(query) : [];

    res.json({
      success: true,
      results: results.slice(0, 8).map(m => ({
        id:          m.id,
        title:       m.title,
        releaseDate: m.release_date,
        poster:      m.poster_path
          ? `${process.env.TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500'}${m.poster_path}`
          : null
      }))
    });
  } catch (err) {
    res.json({ success: false, results: [] });
  }
};

exports.detail = async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    res.json({ success: true, movie });
  } catch (err) {
    res.json({ success: false, message: 'Movie not found' });
  }
};