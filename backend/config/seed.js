require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const connectDB = require('./db');

const seedDB = async () => {
  await connectDB();

  const User = require('../models/User');

  const existing = await User.findOne({ username: 'jointheteam' });
  if (existing) {
    console.log('✅ Default user already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('@TeamAglet', 10);

  await User.create({
    username: 'jointheteam',
    email:    'jointheteam@aglet.co.za',
    password: hashedPassword
  });

  console.log('🌱 Default user seeded:');
  console.log('   Username: jointheteam');
  console.log('   Email:    jointheteam@aglet.co.za');
  console.log('   Password: @TeamAglet');
  process.exit(0);
};

seedDB().catch(err => {
  console.error(err);
  process.exit(1);
});