const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var passport = require('passport')
const config = require('./config')

require('./models/User');
// require('./models/Survey');
 require('./services/passport');
mongoose.connect(config.mongoUri)
const app = express();

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json()) 
app.use(passport.initialize());
app.use(passport.session());

require('./routes/register-user')(app)
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
