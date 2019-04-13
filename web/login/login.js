(function() {

  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const btnLogin = document.getElementById('btn-login');
  const btnLogout =document.getElementById('btn-logout');

  btnLogin.addEventListener('click', e => {
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(email,pass);
    const session = auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    console.log('logged in');
    promise.catch(e => console.log(e.message));
    session.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    console.log('not logged in');
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    firebaseUser = firebase.auth().currentUser;
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