
<!DOCTYPE html>
<html>
<body>
<meta name="viewport" content="width=device-width, initial-scale=1">
	<div class="sidebar">
		<button class="accordion" >Options</button>
			<div class="panel" id="panel1">
				PEST:  &nbsp; &nbsp;
						&nbsp;<input type="radio" id="pestpick" name="pestpick" checked="checked" value="All">&nbsp;  All<br>
						&nbsp;<input type="radio" id="pestpick" name="pestpick" value="Bark Borer">
						<img src="http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png" height="15" width="18">&nbsp; Bark Borer<br>
						&nbsp;<input type="radio" id="pestpick" name="pestpick" value="Mussel Scale Insect">
						<img src="http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png" height="15" width="18">&nbsp; Mussel Scale Insect<br>
						&nbsp;<input type="radio" id="pestpick" name="pestpick" value="Twig Borer">
						<img src="http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png" height="15" width="18">&nbsp; Twig Borer<br>
						&nbsp;<input type="radio" id="pestpick" name="pestpick" value="Mealy Bug">
						<img src="http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" height="15" width="18">&nbsp; Mealy Bug<br>
						&nbsp;<input type="radio" id="pestpick" name="pestpick" value="Aphid">
						<img src="http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png" height="15" width="18">&nbsp; Aphid<br>
				DATE:
					<br> &nbsp;From &nbsp; 
					<input type="date" name="dateStart" 
					id="option" value="<?php if(isset($_POST['dateStart']))
					{echo $_POST['dateStart'];}?>">
					<br>&nbsp; To &nbsp; &nbsp; &nbsp; 
					<input type="date" name="dateEnd"
					id="option" value="<?php if(isset($_POST['dateEnd']))
					{echo $_POST['dateEnd'];}?>"> &nbsp;
					<button class="btn " id="view" name="view" style="font-size: 12px; margin-top: -32px; background-color: white;">VIEW</button>
				</div>
			<!--  Database Adjustments -->
		<button class="accordion">Infestation Figures by Region</button>
			<div class="panel" id="panel2">
				CAR <br>
				NCR <br>
				Region 1 <br>
				Region 2 <br>
				Region 3 <br>
				Region 4A <br>
				Region 4B <br>
				Region 5 <br>
				Region 6 <br>
				Region 7 <br>
				Region 8 <br>
				Region 9 <br>
				Region 10 <br>
				Region 11 <br>
				Region 12 <br>
				Region 13 <br>
				ARMM <br>
			</div>
	</div>
</body>
</html>