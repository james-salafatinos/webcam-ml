//Express server management
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");


//Required for environment variables
require('dotenv').config()

//Express config for enabling templating engine to serve html
app.set('view engine', 'ejs');
//Express config to enable the model serving of static javascript file
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/public/"));

//Use body parser to enable handling post requests
app.use(bodyParser.urlencoded({ extended: true }));
//Necessary to utilize db api service
app.use(bodyParser.json({limit: '100kb'}));




app.get('/', (req, res) => {
  console.log('User entry to site...')
  res.render('index')
})

//
let profiles = require("./routes/profiles");
app.use("/profiles", profiles);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






