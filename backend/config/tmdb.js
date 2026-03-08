const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 5 min cache

const TMDB_BASE = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY   = process.env.TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: API_KEY }
});

// Our pages 1–5 = 9 movies each = 45 total
// TMDB returns 20/page, so we slice across TMDB pages as needed
const getMovies = async (appPage = 1) => {
  const cacheKey = `movies_page_${appPage}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const startIndex = (appPage - 1) * 9; // 0, 9, 18, 27, 36
  const tmdbPage   = Math.floor(startIndex / 20) + 1;
  const offset     = startIndex % 20;

  const res1 = await tmdb.get('/movie/popular', { params: { page: tmdbPage } });
  let movies  = res1.data.results;

  // If the window of 9 spans two TMDB pages, fetch the next one too
  if (offset + 9 > 20) {
    const res2 = await tmdb.get('/movie/popular', { params: { page: tmdbPage + 1 } });
    movies = [...movies, ...res2.data.results];
  }

  const sliced = movies.slice(offset, offset + 9);
  cache.set(cacheKey, sliced);
  return sliced;
};

const searchMovies = async (query, page = 1) => {
  if (!query) return [];
  const cacheKey = `search_${query}_${page}`;
  const cached   = cache.get(cacheKey);
  if (cached) return cached;

  const res = await tmdb.get('/search/movie', { params: { query, page } });
  cache.set(cacheKey, res.data.results);
  return res.data.results;
};

const getMovieById = async (id) => {
  const cacheKey = `movie_${id}`;
  const cached   = cache.get(cacheKey);
  if (cached) return cached;

  const res = await tmdb.get(`/movie/${id}`);
  cache.set(cacheKey, res.data);
  return res.data;
};

module.exports = { getMovies, searchMovies, getMovieById };