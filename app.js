const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // change this if your views are in a different folder

// Enable parsing of request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { message: '' });
});

// Route for form submission
app.post('/', (req, res) => {
  const daysLeft = parseFloat(req.body.days);
  const workHours = parseFloat(req.body.workHours);
  const hoursLeft = daysLeft * workHours; // convert days to hours

  const days = Math.floor(hoursLeft / workHours);
  const hours = Math.floor(hoursLeft % workHours);
  const mins = Math.round(((hoursLeft % workHours) - hours) * 60);

  const message = `จำนวนวันลาที่เหลือ: ${daysLeft.toFixed(2)}<br>ชั่วโมงทำงานต่อวัน: ${workHours}<br><br><span style="font-weight: 500;">สรุป วัน-ชม-นาที ที่เหลือ:<br>${days} วัน ${hours} ชม ${mins} นาที</span>`;

  res.render('index', { message });
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
