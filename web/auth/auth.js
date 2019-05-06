const auth = firebase.auth(); 
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      var user = firebase.auth().currentUser;
      var database = firebase.firestore();
      var userUID;
      if(user!=null){
        userUID = user.uid;
        database.collection('user').doc(userUID).get().then( doc => {
            var userType = doc.data().type;
            var userfirstName = doc.data().firstName;
            var userlastName = doc.data().lastName;
            sessionStorage.setItem("firstName", userfirstName);
            sessionStorage.setItem("lastName", userlastName);
            getUser(userUID,userType);
        });
       }
       else{
        getUser(null,'user');
        sessionStorage.setItem("Access",null);
       }
  }
  else{
      document.querySelector('#logging-in').style.display = 'block';
      document.querySelector('#sign-up').style.display = 'block';
      document.querySelector('#logged-in').style.display = 'none';
      document.querySelector('#log-out').style.display = 'none';
      document.querySelector('#log-in').style.display = 'block';
      sessionStorage.setItem("Access",null);
  }
  var getAcc = sessionStorage.getItem("Access");
  
  if(getAcc == 1){
    console.log("Access Granted! => "+ getAcc);
  }
  else{
    console.log("Access Denied! => "+ getAcc);
  }
  
});

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;
  document.querySelector('#error-placeholder').innerHTML = "";
  auth.signInWithEmailAndPassword(email,password).then(cred => {
    const loginmodal = document.querySelector('#loginModal');
    loginForm.reset();
    $(loginmodal).hide();
    $('.modal-backdrop').hide();
  }).catch(error => {  
    var errorCode = error.code;
    var errorMessage;
    if(errorCode == "auth/user-not-found"){ 
      errorMessage = "Email does not exist";
    }
    else if(errorCode == "auth/wrong-password"){ 
      errorMessage = "Wrong Password";
    }
    else{
      errorMessage = "There's something wrong";
    }
    document.querySelector('#error-placeholder').innerHTML = errorMessage;
  });
})

const logout = document.querySelector('#btn-logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    clearSession();
    const logoutmodal = document.querySelector('#logoutModal');
    $(logoutmodal).hide();
    $('.modal-backdrop').hide();
  });
});

