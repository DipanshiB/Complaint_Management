const mongoose = require('mongoose');
const User = require('../models/user');
const Schema = mongoose.Schema;

const hostelComplaintSchema = new Schema({
  title : String,
  timestamp : {
   type : Date,
   default : Date.now
 },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : User
  },
  votes : {
    type : Number,
    default : 0
  },
  hostel : String,
  hrep : String,
  warden : String
})

const HostelComplaint = mongoose.model('hostel_complaint', hostelComplaintSchema);
module.exports = HostelComplaint;
