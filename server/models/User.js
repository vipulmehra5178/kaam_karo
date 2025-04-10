const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['employer', 'candidate'],
    required: true,
  },
});

// Add timestamps manually if the shorthand isn't working
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);
