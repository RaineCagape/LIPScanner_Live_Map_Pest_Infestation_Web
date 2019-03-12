<!DOCTYPE html>
<html>
<body>
<style>
.header {
    background: #F5DA85;
    font-size: 15px;
    bottom: 0px;
	min-height: 70px;
    width: 100%;
    padding: 15px;
}
</style>
	<header class="header">
		LIPScanner Live Pest Infestation Map <br>LOGO
	</header>
    <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase.js"></script>
    <script>
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC6Jrt51yER1E7jujDfLGjXimGrMjquWQs",
        authDomain: "lipscannrdb.firebaseapp.com",
        databaseURL: "https://lipscannrdb.firebaseio.com",
        projectId: "lipscannrdb",
        storageBucket: "lipscannrdb.appspot.com",
        messagingSenderId: "45995102331"
    };
    firebase.initializeApp(config);
    
    var longitudePlacemat = document.getElementById('longitude');
        var dbGetData = firebase.database().ref().child('E');
        dbGetData.on('value',datasnapshot => longitudePlacemat.innerText = datasnapshot.val());
    </script>
    <h1 id="longitude"></h1>  
</body>
</html>