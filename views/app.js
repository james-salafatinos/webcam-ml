
//@help
//Checks the client side origin and sets the "Base URL" for axios API calls
if (window.location.origin == "https://webcam-ml-304019.uc.r.appspot.com") {
  var base_url = "https://webcam-ml-304019.uc.r.appspot.com";
  console.log(base_url);
} else {
  var base_url = "http://localhost:8080";
  console.log(base_url);
}

//@help
//Sets up webcam options for facing
var webcamUserFacing = false
var webcamOptions = {facingMode: 'environment'}


//@help
//Consolidates weights to JSON
//Makes a call to to the serverside API to add to database
async function saveToDatabase(model) {
  //Prepare Dataset for storage
  console.log("In saveToDatabase()... passing to post /profiles/add-record");
  let datasets = await model.getClassifierDataset();
  let datasetObject = {};
  Object.keys(datasets).forEach((key) => {
    let data = datasets[key].dataSync();
    datasetObject[key] = Array.from(data);
  });
  let jsonModel = JSON.stringify(datasetObject);

  axios
    .post(`${base_url}/profiles/add-record`, {
      model_weights: jsonModel,
    })
    .then((result) => {
      console.log(`axios post: Add-Record Returned`);
      document.getElementById(
        "inserted-db-id"
      ).innerText = `${result.data._id}`;
    });

  console.log("Weights sent to DB...");
}

async function loadFromDatabase(db_uuid, classifierModel) {
  //test id: 60159f08deec565ee8da4ef2
  console.log(
    "In loadFromDatabase, fetching the axios api for a single record"
  );
  const db_promise = axios
    .get(`${base_url}/profiles/single-record/${db_uuid}`)
    .then((result) => uploadModelFromDBJSON(JSON.stringify(result)))
    .catch((err) => console.log(err));

  const uploadModelFromDBJSON = async (db_json, event) => {
    console.log("Uploading");
    console.log("Received json", db_json.model_weights);
    var db_json_parsed = JSON.parse(db_json);

    var tensorObj = JSON.parse(db_json_parsed.data.model_weights);

    Object.keys(tensorObj).forEach((key) => {
      tensorObj[key] = tf.tensor(tensorObj[key], [
        tensorObj[key].length / 1024,
        1024,
      ]);
    });
    classifierModel.setClassifierDataset(tensorObj);
    console.log("Classifier has been set up! Congrats! ");
  };
}

// async function imageClassificationWithWebcam() {
//   console.log("Loading mobilenet..");

//   // Load the model from tensorflow.js
//   net = await mobilenet.load();
//   console.log("Successfully loaded model");

//   // Create an object from Tensorflow.js data API which could capture image
//   // from the web camera as Tensor.
//   const webcam = await tf.data.webcam(webcamElement, webcamOptions);
//   while (true) {
//     const img = await webcam.capture();
//     const result = await net.classify(img);

//     // Dispose the tensor to release the memory.
//     img.dispose();

//     // Give some breathing room by waiting for the next animation frame to
//     // fire.
//     await tf.nextFrame();
//   }
// }

async function switchCameras(){
  console.log('Switch Cameras', webcamOptions)

  if (webcamUserFacing){
    webcamOptions = { facingMode: 'user' }
  } else{
    webcamOptions = { facingMode: 'environment' }
  }
  webcamUserFacing = !webcamUserFacing
}


const start = async () => {
  const createKNNClassifier = async () => {
    console.log("Loading KNN Classifier");
    return await knnClassifier.create();
  };
  const createMobileNetModel = async () => {
    console.log("Loading Mobilenet Model");
    return await mobilenet.load();
  };
  const createWebcamInput = async () => {
    console.log("Loading Webcam Input");
    const webcamElement = await document.getElementById("webcam");
    return await tf.data.webcam(webcamElement, webcamOptions);
  };

  const mobilenetModel = await createMobileNetModel();
  const knnClassifierModel = await createKNNClassifier();
  const webcamInput = await createWebcamInput();

  const initializeElements = () => {

    function addCustomClass(event) {
      let class_label = document.getElementById("input-label").value;

      addDatasetClass(class_label);
    }

    async function getCodeNameAndTriggerDBRetrieve(classifierModel) {
      //Get Code Name
      let db_uuid = document.getElementById("uuid-for-db").value;
      console.log("In getCodeNameandRetrieve... db_uuid: ", db_uuid);

      //Trigger DB Call
      loadFromDatabase(db_uuid, classifierModel);
    }



    document
      .getElementById("load_button")
      .addEventListener("change", (event) =>
        uploadModel(knnClassifierModel, event)
      );

    document
      .getElementById("save_button")
      .addEventListener("click", async () => downloadModel(knnClassifierModel));

    document
      .getElementById("save_to_database_button")
      .addEventListener("click", async () =>
        downloadModelToDatabase(knnClassifierModel)
      );

    document
      .getElementById("load-from-db")
      .addEventListener("click", async () =>
        getCodeNameAndTriggerDBRetrieve(knnClassifierModel)
      );

    document
      .getElementById("submit-label")
      .addEventListener("click", () => addCustomClass);
    document
      .getElementById("switch-camera")
      .addEventListener("click", () => switchCameras());
    document
      .getElementById("class-label")
      .addEventListener("submit", addCustomClass);

      
  };

  const saveClassifier = async (classifierModel) => {
    console.log(
      "In saveClassifier about to prep weights JSON and download locally"
    );
    let datasets = await classifierModel.getClassifierDataset();
    let datasetObject = {};
    Object.keys(datasets).forEach((key) => {
      let data = datasets[key].dataSync();
      datasetObject[key] = Array.from(data);
    });
    let jsonModel = JSON.stringify(datasetObject);

    let downloader = document.createElement("a");
    downloader.download = "model.json";
    downloader.href =
      "data:text/text;charset=utf-8," + encodeURIComponent(jsonModel);
    document.body.appendChild(downloader);
    downloader.click();
    downloader.remove();
  };

  const uploadModel = async (classifierModel, event) => {
    let inputModel = event.target.files;
    console.log("Uploading");
    let fr = new FileReader();
    if (inputModel.length > 0) {
      fr.onload = async () => {
        var dataset = fr.result;
        var tensorObj = JSON.parse(dataset);

        Object.keys(tensorObj).forEach((key) => {
          tensorObj[key] = tf.tensor(tensorObj[key], [
            tensorObj[key].length / 1024,
            1024,
          ]);
        });

        classifierModel.setClassifierDataset(tensorObj);
        console.log("Classifier has been set up! Congrats! ");
      };
    }
    await fr.readAsText(inputModel[0]);
    console.log("Uploaded");
  };

  const downloadModel = async () => {
    console.log("In downloadModel...");
    saveClassifier(knnClassifierModel);
  };

  const downloadModelToDatabase = async () => {
    console.log("In downloadModelToDatabase()... Passing to saveToDatabase()");
    saveToDatabase(knnClassifierModel);
  };

  const addDatasetClass = async (classId) => {
    console.log("Added class: ", classId);
    classes.push(classId);

    // Capture an image from the web camera.
    const img = await webcamInput.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = mobilenetModel.infer(img, "conv_preds");

    // Pass the intermediate activation to the classifier.
    knnClassifierModel.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  };

  //define global class function
  var classes = [];

  const imageClassificationWithTransferLearningOnWebcam = async () => {
    console.log("Machine Learning on the web is ready");
    while (true) {
      if (knnClassifierModel.getNumClasses() > 0) {
        const img = await webcamInput.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = mobilenetModel.infer(img, "conv_preds");
        // Get the most likely class and confidences from the classifier module.
        const result = await knnClassifierModel.predictClass(activation);

        //Printing results to screen
        document.getElementById("console-text-output").innerText = `
          prediction: ${result.label}
          probability: ${result.confidences[result.label]}
        `;

        // Dispose the tensor to release the memory.
        img.dispose();
      }
      await tf.nextFrame();
    }
  };

  await initializeElements();
  await imageClassificationWithTransferLearningOnWebcam();
};

window.onload = () => {
  start();
};
