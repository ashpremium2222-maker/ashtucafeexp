const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String
});

module.exports = mongoose.model('Settings', SettingsSchema);
