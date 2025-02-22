const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/fuzei'); 
    console.log('Db Connection Success');
  } catch (error) {
    console.error('Db Connection Fail:', error);
    process.exit(1);
  }
};

module.exports = connectDB;