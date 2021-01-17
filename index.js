//Express server management
const express = require('express')
const app = express()
const port = 3000

//Express config for enabling templating engine to serve html
app.set('view engine', 'ejs');
//Express config to enable the model serving static javascript file
app.use(express.static(__dirname+"/views"));

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
