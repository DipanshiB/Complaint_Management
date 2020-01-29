const express = require('express');
const router = express.Router();
const User = require('../models/user');
const GoogleUser = require('../models/google_user');
const HostelComplaint = require('../models/hostel_complaint');
const IndividualComplaint = require('../models/individual_complaint');
const InstituteComplaint = require('../models/institute_complaint');

//INDIVIDUAL LEVEL

//COMPLAINTS POST ROUTE
router.post('/complaints/individual/new', function(req, res){
  User.findById(req.user.id, function(err, user){
    if(err){
      console.log(err);
    } else{
      IndividualComplaint.create(req.body.title, function(err, complaint){
        if(err){
          req.flash("error", "Something went wrong.");
          console.log(err);
        } else{
          complaint.author.id = req.user._id;
          complaint.author.name = req.user.name;
          complaint.hostel = req.user.hostel;
          complaint.room_num = req.user.room_num;
          complaint.save();
          user.individual_complaints.push(complaint);
          user.save();
          req.flash("success_msg", "Successfully added complaint.");
          res.redirect("/dashboard/"+user._id);
        }
      });
    }
  });
});

//HOSTEL LEVEL

//COMPLAINTS POST ROUTE
router.post('/complaints/hostel/new', function(req, res){
  User.findById(req.user.id, function(err, user){
    if(err){
      console.log(err);
    } else{
      Complaint.create(req.body.title, function(err, complaint){
        if(err){
          console.log(err);
        } else{
          complaint.author.id = req.user._id;
          complaint.author.name = req.user.name;
          complaint.hostel = req.user.hostel;
          complaint.save();
          user.hostel_complaints.push(complaint);
          user.save();
          req.flash("success_msg", "Successfully added complaint.");
          res.redirect("/dashboard/"+user._id);
        }
      });
    }
  });
});

//INSTITUTE LEVEL

//COMPLAINTS POST ROUTE
router.post('/complaints/institute/new', function(req, res){
  User.findById(req.user.id, function(err, user){
    if(err){
      console.log(err);
    } else{
      Complaint.create(req.body.title, function(err, complaint){
        if(err){
          console.log(err);
        } else{
          complaint.author.id = req.user._id;
          complaint.author.name = req.user.name;
          complaint.save();
          user.institute_complaints.push(complaint);
          user.save();
          req.flash("success_msg", "Successfully added complaint.");
          res.redirect("/dashboard/"+user._id);
        }
      });
    }
  });
});

//GENERAL COMPLAINT ROUTES

//NEW COMPLAINT REG FORM
router.get('/complaint/:level/new', (req,res) => {
  User.findById(req.user.id, (err, user) => {
    if(err) console.log(err);
    else{
      res.render('complaint_form', {user : user});
    }
  })
})

//COMPLAINT EDIT ROUTE
router.get("/:complaint_id/edit", (req, res) => {
  Complaint.findById(req.user.complaints._id, (err, complaint) =>{
    if(err){console.log(err);
    }else{
      res.render("complaints/edit", {complaint_id : req.user.complaints.id, complaint : complaint})
    }
  });
});

//COMPLAINT UPDATE ROUTE

//COMPLAINT DELETE ROUTE
router.delete("/complaints/:complaint_id", (req, res) => {
  Complaint.findByIdAndRemove(req.users.complaints.id, (err) => {
    if(err) console.log(err);
    else{
      req.flash("success_msg", "Successfully deleted complaint.");
      res.redirect("/dashboard/"+req.user.id);
    }
  });
});

module.exports = router;
