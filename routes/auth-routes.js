const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const GoogleUser = require('../models/google_user');
const bcrypt = require('bcryptjs');
require('../config/passport-setup.js')(passport);
//auth register
router.get('/register', (req,res)=>{
  res.render('register');
})

router.post('/register', (req,res)=>{
  console.log(req.body);
  const {name, campus_id, hostel, room_num, password} = req.body;
  const errors = [];
  //Check required fields
  if(!name || !password || !campus_id || !hostel || !room_num){
    errors.push({ msg : "Please fill in all details." });
  }
  if(errors.length > 0){
    res.render('register', {
      errors, name, password, campus_id, hostel, room_num
    });
  } else{
    //Validation passed<%= error.msg %>
    User.findOne({ campus_id : campus_id})
      .then(user => {
        if(user) {
          //User exists
          errors.push({ msg : 'Already Registered.'});
          res.render('register', {
            errors, name, password, campus_id, hostel, room_num
          });
        } else{
          const newUser = new User({
            name : req.body.name,
            campus_id : req.body.campus_id,
            hostel : req.body.hostel,
            room_num : req.body.room_num,
            password : req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) console.log(err);
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in.');
                  res.status(200).render('dashboard', {
                    user : user
                  });
                })
                .catch(err => console.log(err));
            })
          })
          console.log(newUser);
        }
      });
  }


})
//auth LOGIN
router.get('/login', (req,res)=>{
  res.render('login');
})

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect : '/dashboard',
//     failureRedirect : '/',
//     failureFlash : true
//   })(req, res, next);
// })

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err) { console.log(err); }
    if(!user) { console.log("user doesn't exist");}
    req.logIn(user, function(err){
      if(err) {return next(err);}
      return res.redirect('/dashboard/' + user.campus_id);
    });
  })(req, res, next);
})


//auth logout
router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('/');
})
//auth google
router.get('/google', passport.authenticate('google',{
  scope : ['profile']
}));
router.get('/google/redirect', passport.authenticate('google',{failureRedirect : '/auth/google'}), (req, res)=>{
  res.redirect("/");
});
// router.get('/google', (req, res)=>{
//   //handle with passport
//   app.get('/auth/google',
//     passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
//   // GET /auth/google/callback
//   //   Use passport.authenticate() as route middleware to authenticate the
//   //   request.  If authentication fails, the user will be redirected back to the
//   //   login page.  Otherwise, the primary route function function will be called,
//   //   which, in this example, will redirect the user to the home page.
//   app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//       res.redirect('/');
//     });
// })

module.exports = router;
