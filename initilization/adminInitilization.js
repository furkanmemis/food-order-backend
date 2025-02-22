const User = require('../models/User');
const bycrpt = require('bcrypt');

const initAdmin = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });

    if (admin) {
      console.log('System already has an admin.');
      return;
    }

    const hashedPassword = await bycrpt.hash('adminfuzei',10);

    const newAdmin = new User({
      name: 'admin',
      surname: 'admin',
      email: 'admin@fuzei.com',
      role: "admin",
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

module.exports = { initAdmin };