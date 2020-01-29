const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const g_userSchema = new Schema({
  name : String,
  googleId : String,
  complaints : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Complaint"
  }]
})
const GoogleUser = mongoose.model('google_user', g_userSchema);

module.exports = GoogleUser;
