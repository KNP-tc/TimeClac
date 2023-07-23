const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.'));  // change this if your views are in a different folder

// Enable parsing of request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { message: '' });
});

// Route for form submission
app.post('/', (req, res) => {
  const hoursLeft = parseFloat(req.body.hours);
  const workHours = parseFloat(req.body.workHours);

  const days = Math.floor(hoursLeft / workHours);
  const hours = Math.floor(hoursLeft % workHours);
  const mins = Math.floor(((hoursLeft % workHours) - hours) * 60);

  const message = `${days} days ${hours} hours ${mins} mins left`;

  res.render('index', { message });
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
