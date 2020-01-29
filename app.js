const express = require('express');
const app = express();
const router = express.Router();
const http = require('http');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/auth-routes');
const complaintRoutes = require('./routes/complaint_routes');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const server = http.createServer(function(req, res){
  res.statusCode = 200;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology : true }, () =>{
  console.log("Connected to Database");
});
  // .then(()=>console.log("Connected to Database"))
  // .catch(err => console.log("Database ERROR :" + err));

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.get("/", (req, res)=>{
  // res.send("Welcome to Portal");
  res.render('home');
});

app.get("/dashboard/:id", (req, res) => {
  res.render('dashboard');
})

//NEW COMPLAINT REG FORM
router.get('/complaints/hostel/new', (req,res) => {
  User.findById(req.user.id, (err, user) => {
    if(err) console.log(err);
    else{
      res.render('complaint_form', {user : user});
    }
  })
})

app.use('/auth', authRoutes);
app.use('/complaints', complaintRoutes);

app.listen(3000, ()=>{
  console.log("Portal running on port 3000...");
})
