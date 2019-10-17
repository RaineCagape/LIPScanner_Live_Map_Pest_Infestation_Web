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
            case 'Admin':
                sessionStorage.setItem("Access",1);
                var firstName = sessionStorage.getItem("firstName");
                var lastName = sessionStorage.getItem("lastName");
                document.querySelector('#btn-user').innerHTML='<b>' + firstName +' '+ lastName + '</b>';
                Acc = sessionStorage.getItem("Access");
                console.log("SESSION\nuser:"+UID+"\ntype: "+user+"\nAccess: "+Acc);
            break;
            case 'Mobile':
                auth.signOut();

                document.querySelector('#top-alerts').innerHTML=
                '<div class="mb-0 alert alert-warning fixed-bottom alert-dismissible fade show" role="alert">' +
                '<strong>Access Denied</strong> You need to be logged as BPI admin. Your access is limited only to live map viewing.' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
				'<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>';
                
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
    var getType = sessionStorage.getItem("userType");
    var getUid = sessionStorage.getItem("uid");
    var getAccess = sessionStorage.getItem("Access");
    console.log("SESSION\nuser:"+getUid+"\ntype: "+getType+"\nAccess: "+getAccess);
}

