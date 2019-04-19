function getUser(uid,type){
    var Type, UID, user;
    const auth = firebase.auth();
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        UID = sessionStorage.getItem("uid");
        user = sessionStorage.getItem("userType");

        console.log("SESSION SET! \n UID: "+ UID + "\n TYPE: "+ user );

        Type = user;

        switch(Type) {
            case 'admin':
                sessionStorage.setItem("Access",1);
                console.log("Pest Infestation Access Full (Admin Type)");
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
                console.log("Pest Infestation Access Limited (User Type)");
            break;
            default :
                sessionStorage.setItem("Access",null);
                console.log("Pest Infestation Access Limited (Null Type)");
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
    var id = sessionStorage.getItem("uid");
    var type = sessionStorage.getItem("userType");
    var acc = sessionStorage.getItem("Access");
    console.log("UPDATE SESSION: \nUID: "+id+"\nType: "+type+"\nacc: "+acc);
}