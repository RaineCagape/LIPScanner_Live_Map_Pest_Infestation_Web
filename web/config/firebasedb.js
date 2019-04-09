  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6Jrt51yER1E7jujDfLGjXimGrMjquWQs",
    authDomain: "lipscannrdb.firebaseapp.com",
    databaseURL: "https://lipscannrdb.firebaseio.com",
    projectId: "lipscannrdb",
    storageBucket: "lipscannrdb.appspot.com",
    messagingSenderId: "45995102331"
  };
  firebase.initializeApp(config);
  

  // Initialize the default app

  // // Initialize another app with a different config
  // var otherApp = firebase.initializeApp(otherAppConfig, "other");

  // console.log(firebase.app().name);  // "[DEFAULT]"
  // console.log(otherApp.name);        // "other"

  // // Use the shorthand notation to retrieve the default app's services
  // var defaultStorage = firebase.storage();
  // var defaultDatabase = firebase.database();

  // // Use the otherApp variable to retrieve the other app's services
  // var otherStorage = otherApp.storage();
  // var otherDatabase = otherApp.database();

    //Get elements in the html
  // const pestPicked= document.getElementById('pestpick');
 