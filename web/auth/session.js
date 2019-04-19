function getUser(uid,type){
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        var uid = sessionStorage.getItem("uid");
        var user = sessionStorage.getItem("userType");
        console.log("SESSION SET! \n UID: "+ uid + "\n TYPE: "+ user );

        if(user='admin'){
            setAccessSession();
        }
        else{
            sessionStorage.setItem("Access",null);
            console.log("Pest Infestation Access Limited");
        }
    }
    else{
        window.alert("Sorry, your browser does not support Web Storage");
    }
}

function setAccessSession(){
    sessionStorage.setItem("Access",1);
    console.log("Pest Infestation Access Granted");
}

function clearSession(){
    sessionStorage.setItem("userType", null);
    sessionStorage.setItem("uid", null);
    sessionStorage.setItem("Access",null);
}