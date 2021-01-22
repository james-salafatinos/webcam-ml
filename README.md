# webcam-ml
Real-time image classification using your webcam with tensorflow.js

Getting Started


ToDos:
1. Add loading gif for when webcam is initializing and model is downloading

Notes:

Ideas:
1. Enable free text classes to easily label the examples I'm capturing
2. If I could connect the webcam to other video capture devices (i.e. my phone)
3. To easily "sign in" with a code to update an online stored model
   1. So that any time I go to the site, I can enter my code and the app will download the cloud storage model associated with that code. Then you may use the app to update it, and then save your progress. When saved the app will update the model weights in the cloud associated with that code and close. No authentication or sign in required.
4. Ability view, and download class labels associated with the "sign in" code. So that I can see all the classes I've "Tagged" throughout my time using the app.


Challenges:


Deploy to Google App Engine
1. Create an Google App Engine app from the GCP console dashboard
2. Enter cloud shell from online GCP dashboard
3. clone github repository
4. Run "export PORT=3000 && npm install"
   1. This will set the port and install the dependencies to set up the env
5. Run "npm start"
   1. This will start the server and host the application
6. Now app can be web previewed (may have to change the default viewing port)


Resources
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
   1. Google Firebase




Google Cloud SDK commands:
1. gcloud auth login
   1. Allows you to login through web and swap credentials
2. gcloud config set project "..."
   1. Sets the SDK pointing to a project
3. gcloud app browse
   1. Launches the web preview
4. gcloud iam service-accounts keys create secret.json \
       --iam-account PROJECT_ID@appspot.gserviceaccount.com
  1. This allows you to create a credentials json to enable github actions (CI/CD) to deploy


Resources:
1. Google App Engine CI/CD Deployment with Github Actions
   1. https://tomekkolasa.com/how-to-deploy-node-js-app-to-google-app-engine-using-github-actions
2. Need updated google cloud github action deployment script
   1. https://github.com/google-github-actions/deploy-appengine