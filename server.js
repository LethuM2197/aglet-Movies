require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./backend/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'aglet_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/moviedb_aglet'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Global template variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./backend/routes/movieRoutes'));
app.use('/auth', require('./backend/routes/authRoutes'));
app.use('/favourites', require('./backend/routes/favouriteRoutes'));
app.use('/contact', require('./backend/routes/contactRoutes'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

app.listen(PORT, () => {
  console.log(`\n🎬 MovieDB running at http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
});