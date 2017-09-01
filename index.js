const express = require ('express');
const app = express();
const session = require('express-session');

const path = require('path');

const getServerTime = function(req, res, next) {
	req.requestTime = new Date();

  next();

}

app.use(getServerTime);


app.get('/time', function(req, res){
	res.send(req.requestTime.toString());
});


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname +'/index.html'));

});


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});






app.listen(3000, function () {
	console.log('Listening on port 3000!');

});
