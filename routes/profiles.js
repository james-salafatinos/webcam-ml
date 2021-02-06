const bodyParser = require("body-parser");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "10mb" }));
const dotenv = require('dotenv');

const Weights = require("../models/weights.model");
const mongoose = require("mongoose");
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log("Error on connection with mongodb...", err));

//##### /PROFILES #######

router.get("/", function (req, res) {
  res.status(200).send("Youve reached the API");
});



router.post("/add-record", (req, res) => {
  // DB API, takes a post JSON of the weights and saves it to database
  console.log("In proflies/add-record accepting post request... Passing to direct Mongoose DB call to create document")
  const user_weights = req.body;
  Weights.create(user_weights, function(err, result) {
    if (err){
      console.log(err)
    } else{
      console.log(`Saved weights to MongoDB with _id: ${JSON.stringify(result._id)}`);
      res.redirect(`/profiles/single-record/${result._id}`)
    }
  })
});

router.get("/all-records", (req, res) => {
  Weights.distinct("_id", function (error, ids) {
    // ids is an array of all ObjectIds
    res.send(ids);
  });
});



router.post('/update/:uuid', (req,res) => {
  let uuid = req.params.uuid;

    Weights.findByIdAndUpdate({_id:`${uuid}`},{model_weights: "Great Dane"},{new: true, useFindAndModify: false}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
            console.log(`${uuid}`)
        }
    })
})


router.get("/single-record/:uuid", (req, res) => {
  //600dd15c316b6008f4e31dbf
  console.log(req.params);
  let user_weights = req.params.uuid;
  Weights.findById(user_weights)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
