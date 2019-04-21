function getUser(uid,type){
    var Type, UID, user, getAcc;
    const auth = firebase.auth();
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        UID = sessionStorage.getItem("uid");
        user = sessionStorage.getItem("userType");
        Type = user;
        switch(Type) {
            case 'admin':
                sessionStorage.setItem("Access",1);
                document.querySelector('#log-out').style.display = 'block';
                document.querySelector('#logging-in').style.display = 'none';
                document.querySelector('#log-in').style.display = 'none';
                document.querySelector('#logged-in').style.display ='block';
            break;
            case 'user':
                auth.signOut(); 
                const deniedmodal = document.querySelector('#deniedModal');
                $(deniedmodal).show();
                $('.modal-backdrop').show();
                sessionStorage.setItem("Access",null);
            break;
            default :
                sessionStorage.setItem("Access",null);
            break;
        }  
    }
    else{
        window.alert("Sorry, your browser does not support Web Storage");
    }
    
   
}

function clearSession(){
    sessionStorage.setItem("userType", null);
    sessionStorage.setItem("uid", null);
    sessionStorage.setItem("Access",null);
}