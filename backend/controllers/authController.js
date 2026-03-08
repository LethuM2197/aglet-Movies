const bcrypt = require('bcryptjs');
const User   = require('../models/User');

// Render Login Page
exports.loginPage = (req, res) => {
  res.render('auth/login', {
    title:    'Login — MovieDB',
    error:    null,
    redirect: req.query.redirect || '/favourites'
  });
};

// Handle Login
exports.login = async (req, res) => {
  const { login, password, redirect } = req.body;
  const redirectTo = redirect || '/favourites';

  try {
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }]
    });

    if (!user) {
      return res.render('auth/login', {
        title:    'Login — MovieDB',
        error:    'Invalid username or password.',
        redirect: redirectTo
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('auth/login', {
        title:    'Login — MovieDB',
        error:    'Invalid username or password.',
        redirect: redirectTo
      });
    }

    req.session.user = {
      _id:      user._id,
      username: user.username,
      email:    user.email
    };

    res.redirect(redirectTo);

  } catch (err) {
    console.error('Login error:', err);
    res.render('auth/login', {
      title:    'Login — MovieDB',
      error:    'Something went wrong. Please try again.',
      redirect: redirectTo
    });
  }
};

// Render Signup Page
exports.signupPage = (req, res) => {
  res.render('auth/signup', {
    title: 'Sign Up — MovieDB',
    error: null
  });
};

// Handle Signup
exports.signup = async (req, res) => {
  const { username, email, password, redirect } = req.body;
  const redirectTo = redirect || '/favourites';

  try {
    // Check if user already exists
    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) {
      return res.render('auth/signup', {
        title: 'Sign Up — MovieDB',
        error: 'Username or email already registered.'
      });
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashed
    });

    // Save session
    req.session.user = {
      _id:      newUser._id,
      username: newUser.username,
      email:    newUser.email
    };

    res.redirect(redirectTo);

  } catch (err) {
    console.error('Signup error:', err);
    res.render('auth/signup', {
      title: 'Sign Up — MovieDB',
      error: 'Something went wrong. Please try again.'
    });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};