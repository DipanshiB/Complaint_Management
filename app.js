const express = require('express');
const app = express();
const http = require('http');
const authRoutes = require('./routes/auth-routes');
// const router = require('router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const server = http.createServer(function(req, res){
  res.statusCode = 200;
});

app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://DipanshiB:pinkathon@cluster0-fbdq0.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
  // res.send("Welcome to Portal");
  res.render('home');
})


app.listen(3000, ()=>{
  console.log("Portal running on port 3000...");
})
