function getUser(uid,type){
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        var uid = sessionStorage.getItem("uid");
        var user = sessionStorage.getItem("userType");
        console.log("SESSION SET! \n UID: "+ uid + "\n TYPE: "+ user );

        if(user='admin'){
            setAccessSession(true);
        }
        else{
            setAccessSession(false);
        }
    }
    else{
        setAccessSession(false);
        window.alert("Sorry, your browser does not support Web Storage");
    }
}

function setAccessSession(bool){
    if(bool = true){
        sessionStorage.setItem("Access",1);
        console.log("Pest Infestation Access Granted");
    }
    else{
        sessionStorage.setItem("Access",null);
        console.log("Pest Infestation Access Limited");
    }
    
}

function clearSession(){
    sessionStorage.setItem("userType", null);
    sessionStorage.setItem("uid", null);
    setAccessSession(false);
}