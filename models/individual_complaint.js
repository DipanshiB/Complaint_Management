const mongoose = require('mongoose');
const User = require('../models/user');

const Schema = mongoose.Schema;

const individualComplaintSchema = new Schema({
  title : String,
  timestamp : {
   type : Date,
   default : Date.now
 },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : User
  },
  hostel : String,
  room_num : String,
  superintendent : String
})

const IndividualComplaint = mongoose.model('individual_complaint', individualComplaintSchema);
module.exports = IndividualComplaint;
