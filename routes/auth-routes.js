const router = require('express').Router();
//auth login
router.get('/login', (req,res)=>{
  res.render('login');
})
//auth logout
router.get('/logout', (req, res)=>{
  //handle with passport
  res.send("logging out.");
})
//auth google
router.get('/google', (req, res)=>{
  //handle with passport
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });
})

module.exports = router;
