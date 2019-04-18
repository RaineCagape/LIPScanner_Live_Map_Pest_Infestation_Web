function checkUser(uid,type){
    if (typeof(Storage) !== "undefined") {
    // Store
        sessionStorage.setItem("userType", type);
        sessionStorage.setItem("uid", uid);
        var uid = sessionStorage.getItem("uid");
        var user = sessionStorage.getItem("userType");
        console.log("SESSION SET! \n UID: "+ uid + "\n TYPE: "+ user );
    }
    else{
        console.log("Sorry, your browser does not support Web Storage");
    }
}