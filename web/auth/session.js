function getUser(uid,type){
    var Type, UID, user, Acc;
    const auth = firebase.auth();
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        UID = sessionStorage.getItem("uid");
        user = sessionStorage.getItem("userType");
        Type = user;
        switch(Type) {
            case 'admin':
                sessionStorage.setItem("Access",1);
                document.querySelector('#log-out').style.display = 'inline';
                document.querySelector('#logging-in').style.display = 'none';
                document.querySelector('#log-in').style.display = 'none';
                document.querySelector('#sign-up').style.display = 'inline';
                document.querySelector('#logged-in').style.display ='block'; 
                var firstName = sessionStorage.getItem("firstName");
                var lastName = sessionStorage.getItem("lastName");
                document.querySelector('#logged-in').innerHTML='<b>Welcome! '+firstName +' '+ lastName + '</b>';   
                Acc = sessionStorage.getItem("Access");
                console.log("SESSION\nuser:"+UID+"\ntype: "+user+"\nAccess: "+Acc);
            break;
            case 'user':
                auth.signOut(); 
                const deniedmodal = document.querySelector('#deniedModal');
                $(deniedmodal).show();
                $('.modal-backdrop').show();
                sessionStorage.setItem("Access",null); 
                sessionStorage.setItem("firstName", null);
                sessionStorage.setItem("lastName",null);            
                Acc = sessionStorage.getItem("Access");
                console.log("SESSION\nuser:"+UID+"\ntype: "+user+"\nAccess: "+Acc);
            break;
            default :
                sessionStorage.setItem("Access",null);
                sessionStorage.setItem("firstName", null);
                sessionStorage.setItem("lastName",null);
                Acc = sessionStorage.getItem("Access");
                console.log("SESSION\nuser:"+UID+"\ntype: "+user+"\nAccess: "+Acc);
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
    sessionStorage.setItem("firstName", null);
    sessionStorage.setItem("lastName",null);
    var getType =   sessionStorage.getItem("userType");
    var getUid =   sessionStorage.getItem("uid");
    var getAccess =  sessionStorage.getItem("Access");
    console.log("SESSION\nuser:"+getUid+"\ntype: "+getType+"\nAccess: "+getAccess);
}

