const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Data we need to collect/confirm to have the app go.
const fields = {
  driver: {
    type: String
  },
  licence: {
    type: String
  },
  email: {
    type: String
  },
  number: {
    type: Number
  },
  confirmed: {
    type: Boolean,
    default: false
  }
};

// One nice, clean line to create the Schema.
const userSchema = new Schema(fields);

module.exports = mongoose.model("User", userSchema, "testing12");
