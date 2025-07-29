const mongoose = require("mongoose");

const SeminarSchema = new mongoose.Schema({
  title: {type: String, required: true},
  speaker: {type: String, required: true},
  location: {type: String, required: true},
  date: {type: Date, required: true},
  capacity: {type: Number, required: true},
  description: {type: String},
  image: {type: String},
});

module.exports = mongoose.model("Seminar", SeminarSchema);
