const mongoose = require('mongoose');

module.exports = function connectDB(uri) {
  if (!uri) {
    console.error('MONGO_URI not provided. Set it in .env');
    process.exit(1);
  }

  mongoose.connect(uri)
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message || err);
      process.exit(1);
    });
};
