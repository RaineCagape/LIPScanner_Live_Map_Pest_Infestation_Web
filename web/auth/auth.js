const auth = firebase.auth(); 

auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      var user = firebase.auth().currentUser;

      if(user!=null){
         var userUID = user.uid;
         var userType, user;
         var ref = firebase.database().ref('user');
         ref.orderByKey().endAt(userUID).on('child_added', snap => {
          user = snap.child('type').val();
        });
        checkUser(userUID,userType);
      }
      console.log(firebaseUser);
         document.querySelector('#log-out').style.display = 'block';
         document.querySelector('#logging-in').style.display = 'none';
         document.querySelector('#log-in').style.display = 'none';
         document.querySelector('#logged-in').style.display ='block';
  }
  else{
    console.log('not logged in');
      document.querySelector('#logging-in').style.display = 'block';
      document.querySelector('#logged-in').style.display = 'none';
      document.querySelector('#log-out').style.display = 'none';
      document.querySelector('#log-in').style.display = 'block';
  }
});

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  auth.signInWithEmailAndPassword(email,password).then(cred => {
    console.log(cred.user);

    const loginmodal = document.querySelector('#loginModal');
    loginForm.reset();
    $(loginmodal).hide();
    $('.modal-backdrop').remove();
  })
})

const logout = document.querySelector('#btn-logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
    const logoutmodal = document.querySelector('#logoutModal');
    $(logoutmodal).hide();
    $('.modal-backdrop').remove();
  });
});

