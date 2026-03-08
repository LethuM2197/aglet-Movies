const express       = require('express');
const router        = express.Router();
const movieController = require('../controllers/movieController');

router.get('/',              movieController.index);
router.get('/api/search',    movieController.search);
router.get('/api/movie/:id', movieController.detail);

module.exports = router;