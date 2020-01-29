const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name : {
   type : String,
   required : true
  },
  room_num : {
    type : Number,
    required : true
  },
  hostel : {
    type : String,
    required : true
  },
  campus_id : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  // googleId : String,
  individual_complaints : [
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "IndividualComplaint"
  }],
  hostel_complaints : [
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "HostelComplaint"
  }],
  institute_complaints : [
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "InstituteComplaint"
  }]
  // name : String
  // campusId : String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
