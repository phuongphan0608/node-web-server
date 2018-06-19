const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//Middleware declaration
// Set up log
app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    console.log('Unable to append to server.log');
  });
  next();
});

// Setup Maintenance
app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page',
    maintenanceMessage: 'The website is under construction'
  })
});

// Setup Public
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


app.get('/', (req, res)=>{
  res.render('home.hbs', {
     welcomeMessage: 'Welcome to my website',
     pageTitle: 'Home Page',
     // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get ('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
