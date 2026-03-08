const express               = require('express');
const router                = express.Router();
const favouriteController   = require('../controllers/favouriteController');
const { requireAuth }       = require('../middleware/auth');

router.get('/',                    requireAuth, favouriteController.index);
router.post('/add',                requireAuth, favouriteController.add);
router.delete('/remove/:movieId',  requireAuth, favouriteController.remove);

module.exports = router;