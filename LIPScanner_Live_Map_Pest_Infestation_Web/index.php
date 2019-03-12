
<!DOCTYPE html>

<html>
<head>
    <title>Home | LIPS Live Map</title> 
</head>
<body>
    <?php include ('include/head.php');?>
    <?php include ('include/header.php');?>
    <div class="container-fluid">
		<div id="content">
			<div class="row">
                 <?php include ('include/sidebar.php');?>
                 <div class="col-sm">
                 <?php include ('map/map.php');?>
                 </div>
             </div>
        </div>
    </div>  
    <?php include ('include/footer.php');?>
</body>
</html>