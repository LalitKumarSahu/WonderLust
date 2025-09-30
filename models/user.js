const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  about: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },

  // ✅ Trips (array of objects)
trips: [
    {
      place: String,
      date: Date
    }
  ],
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
