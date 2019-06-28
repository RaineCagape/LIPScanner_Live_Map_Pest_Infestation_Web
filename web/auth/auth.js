const auth = firebase.auth(); 
var secondaryApp = firebase.initializeApp(config, "Secondary");
var database = firebase.firestore();
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      var user = firebase.auth().currentUser;
      var userUID;
      if(user!=null){
        userUID = user.uid;
        database.collection('users').doc(userUID).get().then( doc => {
            var userType = doc.data().userType;
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
      document.querySelector('#sign-up').style.display = 'none';
      document.querySelector('#logged-in').style.display = 'none';
      document.querySelector('#log-out').style.display = 'none';
      document.querySelector('#log-in').style.display = 'inline';
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

const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const firstname = signupForm['firstname'].value;
  const lastname = signupForm['lastname'].value;
  const contact = signupForm['contact'].value;
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;
  secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(createdUser => {
    var user2 = secondaryApp.auth().currentUser;
    var createdUID = user2.uid;
    if(createdUID == undefined ){
      user2.delete().catch( error => {
        console.log("An error happened");
      })
      document.querySelector('#signuperror-placeholder').innerHTML = "Can't create account. There's something wrong.";
    }
    else{
      database.collection('users').doc(createdUID).set({
        firstName: firstname,
        lastName: lastname,
        accountType: 'Email Account',
        contact: contact,
        userType: 'Admin'
      }).then( user => {      
        signupForm.reset();
        const signupmodal = document.querySelector('#signupModal');
        $(signupmodal).hide();
        const accountcreatedmodal = document.querySelector('#accountcreatedModal');
        $(accountcreatedmodal).show();
        document.querySelector('#userlabel').innerHTML = "<h5>"+firstname+" "+lastname+"</h5>";
        document.querySelector('#emaillabel').innerHTML = "<h5>"+email+"<h5>";
        secondaryApp.auth().signOut();
      }) 
    }     
  }).catch(error => {
    var errorCode = error.code;
    var errorMessage;
    if(errorCode == "auth/email-already-in-use"){ 
      errorMessage = "Email already exist";
    }
    else if(errorCode == "auth/weak-password"){
      errorMessage = "Password must be 6 characters";
    }
    else if (errorCode == "invalid-argument"){
      errorMessage = "Account successfully created but encountered some problems in adding the user data";
    }
    else{
      errorMessage = "There's something wrong";
    }
     document.querySelector('#signuperror-placeholder').innerHTML = "*"+errorMessage+" <br>";
  })
  
  // document.querySelector('#sign-up').style.display = 'inline';
  // document.querySelector('#log-out').style.display = 'inline';
});



const logout = document.querySelector('#btn-logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    clearSession();
    const logoutmodal = document.querySelector('#logoutModal');
    $(logoutmodal).hide();
    $('.modal-backdrop').hide();
    window.location.reload();
  });
});

