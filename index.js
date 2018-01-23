const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var passport = require('passport')
const config = require('./config')
const flash=require("connect-flash");
const cookieSession = require('cookie-session')
const session = require('express-session')

require('./models/User');
require('./models/Notification');
// require('./models/Survey');
 require('./services/passport');
mongoose.connect(config.mongoUri)
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials: true")
  next();
});

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json()) 


app.set('trust proxy', 1)
app.use(session({
  secret: 'wetenkdjfrio',
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

require('./routes/register-user')(app)
require('./routes/notify-insert')(app)
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("***listening on port "+PORT)
