const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    default: "user", 
    enum: ["user", "admin"] 
  }
});

module.exports = mongoose.model("User", UserSchema);
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,      // <-- UNIQUE INDEX
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,      // email bhi unique
//   },
//   password: {
//     type: String,
//     required: true,
//   }
// }, { timestamps: true });