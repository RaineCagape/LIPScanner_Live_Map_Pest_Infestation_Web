firebase.auth().onAuthStateChanged(function(user) {

  // var user = firebase.auth().currentUser;
  //       var email, uid;
  //       email = user.email;
  //       // emailVerified = user.emailVerified;
  //       uid = user.uid; 

    if (user) {
      // document.getElementById('logged-in').style.display = 'block';
      document.getElementById('log-out').style.display = 'block';
      document.getElementById('logging-in').style.display = 'none';
      document.getElementById('log-in').style.display = 'none';
      document.getElementById('logged-in').style.display ='block';
         
      // document.getElementById('logged-in').innerHTML = "Welcome! " + email +". UID: " + uid;
      //   var firebaseQuery = firebase.database().ref('user');
      //   typefirebase = query.orderByChild("type").equalTo(uid);
      //   typefirebase.on('child_added', snap => {
        
      //     userTypeFirebase = snap.child('type').val();

      //   });

    } 
    
    else {
      document.getElementById('logging-in').style.display = 'block';
      document.getElementById('logged-in').style.display = 'none';
      document.getElementById('log-out').style.display = 'none';
      document.getElementById('log-in').style.display = 'block';
    }
  });

  function userLogin(){

      var userValue = document.getElementById('email').value;
      var passwordValue = document.getElementById('password').value;

      firebase.auth().signInWithEmailAndPassword(userValue, passwordValue)
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
              window.alert('Wrong Password');
          } 
          else {
              window.alert(errorMessage);
          }
          console.log(error);
      });

  }

    // var userValue = document.getElementById('username').value;
    // var passwordValue = docufirement.getElementById('password').value;

    

function userLogout(){
  firebase.auth().signOut();
}
