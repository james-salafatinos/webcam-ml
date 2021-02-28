# webcam-ml
Real-time image classification using your webcam with tensorflow.js

- Train your own real-time image classifier on-the-fly
- Save trained model to the cloud (no login required!)
- Load previously trained model from the cloud (no login required!)

## Usage
1. Focus on an object or entity with your webcam
2. Enter label describing what the webcam is viewing
3. Submit several example captures (ideally with different object angles)
4. Observe the model's classification in real time 
5. Repeat to build your own personally trained image classifer
6. Save the model for later! Or send the code to your friends for them to load your model!

## About
Hosted with GCP at: https://webcam-ml-304019.uc.r.appspot.com/

## Installation for local development
1. Run `git clone https://github.com/james-salafatinos/webcam-ml.git` in your desired directory
2. Run `npm install -i` to install the dependencies
3. Run `npm start` to initiate the server listening at `http://localhost:8080/`

## Installation for Google Cloud deployment
1. Run `git clone https://github.com/james-salafatinos/webcam-ml.git` in your cloud shell
2. Run `npm install -i` to install the dependencies
3. Run `gcloud app deploy` and wait a few minutes to spin up the active server in the cloud

## To-dos:
1. `[Feature]` - Add loading gif for when webcam is initializing and model is downloading
2. `[Bug]` - Fix unsupported Safari "getUserMedia()"

## Tool Landscape
1. Testing Framework
   1. Mocha
2. App Deployment
   1. Google App Engine
3. Editor
   1. VS Code
4. Server
   1. Express
5. Backend
   1. NodeJS
6. Front End
   1. None
7. CI/CD
   1. Github Actions
8. Database 
   1. MongoDB
