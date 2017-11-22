const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars'); 
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session'); 
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const app = express();

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Map global promise - get rid of warning
 mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMongoClient: true
})
   .then(()=> console.log('MongoDB Connected...'))
   .catch(err => console.log(err)); 

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname,  'public')));

//Method override middleware
app.use(methodOverride('_method'));

//Express Session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next(); 
});

//Index Route
app.get('/', (req, res) => {
  const title = "Welcome";
  res.render('index', {
    title:title
  });
});

//About Route
app.get('/about', (req, res) => {
  res.render('about');
});

//Use ideas routes
app.use('/ideas', ideas);

//Use users routes
app.use('/users', users);

const port = 5000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});