const bodyParser = require("body-parser");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const Weights = require('../models/weights.model');
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || ""
console.log(dbURI)
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology: true})
.then((result) => console.log('Connected to db'))
.catch((err) => console.log(err));


//##### /PROFILES #######


router.get("/", function (req, res) {
    console.log(req.body)
});


router.get('/add-record', (req,res)=>{
  const weight = new Weights({
    code: '1212',
    model_weights:'12123'
  });
  weight.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
});

router.get('/all-records', (req, res)=>{
  Weights.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>
  console.log(err))
});

router.get('/single-record', (req, res)=>{
  Weights.findById('600db54ae7f96d6730c2d27a')
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>
  console.log(err))
});



module.exports = router;
