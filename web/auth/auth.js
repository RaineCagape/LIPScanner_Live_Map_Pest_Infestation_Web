const auth = firebase.auth(); 
var firebaseRef = firebase.database();
var secondaryApp = firebase.initializeApp(config, "Secondary");
var database = firebase.firestore();

auth.onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		var user = firebase.auth().currentUser;
		var userUID;

		if(user != null){
			userUID = user.uid;
			database.collection('users').doc(userUID).get().then( doc => {
				var userType = doc.data().userType;
				var userfirstName = doc.data().firstName;
				var userlastName = doc.data().lastName;
				sessionStorage.setItem("firstName", userfirstName);
				sessionStorage.setItem("lastName", userlastName);
				getUser(userUID,userType);
			});
		} else{
			getUser(null,'user');
        	sessionStorage.setItem("Access",null);
		}

		document.querySelector('#nav-signin').style.display = 'none';
		document.querySelector('#nav-dropdown-user').style.display = 'block';
	} else{
		document.querySelector('#nav-signin').style.display = 'block';
		document.querySelector('#nav-dropdown-user').style.display = 'none';
		sessionStorage.setItem("Access",null);
	}
  
	var getAcc = sessionStorage.getItem("Access");
  
	if(getAcc == 1){
		console.log("Access Granted! => "+ getAcc);
	} else{
		console.log("Access Denied! => "+ getAcc);
	}
});

//Sign In Account
const signinForm = document.querySelector('#signinForm');
signinForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = signinForm['email'].value;
	const password = signinForm['password'].value;
	document.querySelector('#error-placeholder').innerHTML = "";
	
	auth.signInWithEmailAndPassword(email,password).then(cred => {
		signinForm.reset();
		window.location = 'index.html';
	}).catch(error => {  
		var errorCode = error.code;
		var errorMessage;
		
		if(errorCode == "auth/user-not-found"){ 
			errorMessage = "*Email does not exist";
		} else if(errorCode == "auth/wrong-password"){ 
			errorMessage = "*Wrong Password";
		} else{
			errorMessage = "*There's something wrong";
		}
		document.querySelector('#error-placeholder').innerHTML = errorMessage;
	});
})

//Sign Out Account
const signout = document.querySelector('#btn-signout');
signout.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		clearSession();
		window.location = 'index.html';
	});
});

//Sign Up Account
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
    	} else{
			database.collection('users').doc(createdUID).set({
				firstName: firstname,
				lastName: lastname,
				contactNo: contact,
				photoUrl: 'https://firebasestorage.googleapis.com/v0/b/lpscannr2019.appspot.com/o/default%2Fic_splash_white.png?alt=media&token=3039a156-b62e-41da-8d26-96bdcf9070c8',
				accountType: 'Email Account',
				email: email,
				userType: 'Admin'
			}).then( user => {      
				signupForm.reset();
				$("#signupModal .close").click()

				document.querySelector('#top-alerts').innerHTML=
                '<div class="mb-0 alert alert-success fixed-bottom alert-dismissible fade show" role="alert">' +
				'<h4>Account Successfully Created</h4>' +
				'<p class="mb-0">Display Name: <strong>' + firstname + " " + lastname + '</strong></p>' +
				'<p class="mb-0">Email Address: <strong>' + email + '</strong></p>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
				'<span aria-hidden="true">&times;</span>' +
                '</button>' +
				'</div>';
				secondaryApp.auth().signOut();
			}) 
    	}     
	}).catch(error => {
		var errorCode = error.code;
		var errorMessage;
		
		if(errorCode == "auth/email-already-in-use"){ 
			errorMessage = "*Email already exist";
		} else if(errorCode == "auth/weak-password"){
			errorMessage = "*Password must be 6 characters";
		} else if (errorCode == "invalid-argument"){
			errorMessage = "*Account successfully created but encountered some problems in adding the user data";
		} else{
			errorMessage = "*There's something wrong";
		}
		document.querySelector('#signuperror-placeholder').innerHTML = errorMessage;
	})
});