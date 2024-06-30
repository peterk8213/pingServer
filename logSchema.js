const mongoose = require("mongoose");

const pingLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  status: Number,
  message: String,
});

module.exports = mongoose.model("PingLog", pingLogSchema);
