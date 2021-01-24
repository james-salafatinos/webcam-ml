async function imageClassificationWithImage() {
  console.log("Loading mobilenet..");

  // Load the model.
  net = await mobilenet.load();
  console.log("Successfully loaded model");

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);
  console.log(result);
}

//profiles.js mongo db save
async function saveToDatabase(model) {
  // axios.get('http://localhost:3000/profiles/add-record')
  axios.post('http://localhost:3000/profiles/add-record',{
        code: 'test_axios',
        model_weights:'testtt'
  })
  console.log(model)
};

async function imageClassificationWithWebcam() {
  console.log("Loading mobilenet..");

  // Load the model from tensorflow.js
  net = await mobilenet.load();
  console.log("Successfully loaded model");

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById("console").innerText = `
        prediction: ${result[0].className}\n
        probability: ${result[0].probability}
      `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
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
    return await tf.data.webcam(webcamElement);
  };

  const mobilenetModel = await createMobileNetModel();
  const knnClassifierModel = await createKNNClassifier();
  const webcamInput = await createWebcamInput();

  const initializeElements = () => {
    function addCustomClass(event) {
      let class_label = document.getElementById("input-label").value;

      addDatasetClass(class_label);
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
      .getElementById("class-a")
      .addEventListener("click", () => addDatasetClass(0));
    document
      .getElementById("class-b")
      .addEventListener("click", () => addDatasetClass(1));
    document
      .getElementById("class-c")
      .addEventListener("click", () => addDatasetClass(2));
    document
      .getElementById("class-label")
      .addEventListener("submit", addCustomClass);
  };

  const saveClassifier = async (classifierModel) => {
    let datasets = await classifierModel.getClassifierDataset();
    let datasetObject = {};
    Object.keys(datasets).forEach((key) => {
      let data = datasets[key].dataSync();
      datasetObject[key] = Array.from(data);
    });
    let jsonModel = JSON.stringify(datasetObject);

    //console.log("jsonModel", jsonModel);
    saveToDatabase(jsonModel);


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

  const downloadModel = async (classifierModel) => {
    
    console.log("In downloadModel...");
    saveClassifier(knnClassifierModel);

  };
  const putImageToPage = (event) => {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("output");
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  };

  const addDatasetClass = async (classId) => {
    console.log("add class", classId);
    classes.push(classId);
    console.log(classes);
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
  var classes = ["A", "B", "C", "D"];

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
        document.getElementById("console").innerText = `
          prediction: ${result.label}\n
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
