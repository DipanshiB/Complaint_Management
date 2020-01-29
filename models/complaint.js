const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  title : String,
  timestamp : {
   type : Date,
   default : Date.now
  }
  id : String,
  votes : Number
})

const Complaint = mongoose.model('complaint', complaintSchema);
module.exports = Complaint;
