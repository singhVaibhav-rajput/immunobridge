const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  uci: {
    type: String,
    unique: true
  },
  name: String,
  guardianName: String,
  guardianAdharCardNumber: String,
  dob: Date,
  phone: String,
  location: String,
  vaccinations: [
    {
      vaccineName: String,
      date: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Child", childSchema);