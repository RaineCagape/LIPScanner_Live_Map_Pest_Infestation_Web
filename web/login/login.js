(function() {

  var inputEmail = document.getElementById('email');
  var inputPassword = document.getElementById('password');
  var btnLogin = document.getElementById('btn-login');
  var btnLogout =document.getElementById('btn-logout');

  btnLogin.addEventListener('click', e => {
    var email = inputEmail.value;
    var pass = inputPassword.value;
    var auth = firebase.auth();

    var promise = auth.signInWithEmailandPassword(email,pass);
    console.log('logged in');
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    console.log('not logged in');
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      document.getElementById('log-out').style.display = 'block';
      document.getElementById('logging-in').style.display = 'none';
      document.getElementById('log-in').style.display = 'none';
      document.getElementById('logged-in').style.display ='block';
    }
    else{
      console.log('not logged in');
      document.getElementById('logging-in').style.display = 'block';
      document.getElementById('logged-in').style.display = 'none';
      document.getElementById('log-out').style.display = 'none';
      document.getElementById('log-in').style.display = 'block';
    }
  });

}());