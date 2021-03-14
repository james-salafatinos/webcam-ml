# webcam-ml

Train your own real-time image classifier on-the-fly. Real-time image classification using your webcam with tensorflow.js

## Features

1. Custom label driven real-time image classification. Learn what anything looks like, and call it what it is! Wide range of applications from medical to meme.
2. Authentiaction-less model save! Who wants to create an account? Not me... just copy the UUID and save it somewhere!
3. Authentiaction-less model load! Send the UUID of your trained model to your friends and have them load it! Great for memes.

![](assets/gif1.gif)
![](assets/gif2.gif)
![](assets/gif3.gif)

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
