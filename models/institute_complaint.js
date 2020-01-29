const mongoose = require('mongoose');
const User = require('../models/user');

const Schema = mongoose.Schema;

const instituteComplaintSchema = new Schema({
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
  }
})

const InstituteComplaint = mongoose.model('institute_complaint', instituteComplaintSchema);
module.exports = InstituteComplaint;
