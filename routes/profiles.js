const bodyParser = require("body-parser");
const express = require("express");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({limit: '100kb'}));

const Weights = require("../models/weights.model");
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://james:mountaindew@cluster0.10vne.mongodb.net/webcamML?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));

//##### /PROFILES #######

router.get("/", function (req, res) {
  console.log(req.body);
});

router.post("/add-record", (req, res) => {
  const user_weights = req.body;
  const weight = new Weights(user_weights);
  weight
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/update-record/:uuid", (req, res) => {
    let user_weights_id = req.params.uuid;
    let user_weights = req.params.body
    console.log("put user_weights", user_weights)
    Weights.findOneAndUpdate(
        {_id: user_weights_id}, 
        {model_weights: weights}
    )});



router.get("/all-records", (req, res) => {
  Weights.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/single-record/:uuid", (req, res) => {
  //600dd15c316b6008f4e31dbf
  console.log(req.params)
  let user_weights = req.params.uuid;
  Weights.findById(user_weights)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
