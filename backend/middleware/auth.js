const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login?redirect=' + encodeURIComponent(req.originalUrl));
  }
  next();
};

const redirectIfAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/favourites');
  }
  next();
};

module.exports = { requireAuth, redirectIfAuth };