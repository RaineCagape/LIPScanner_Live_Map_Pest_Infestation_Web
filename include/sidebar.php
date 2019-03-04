<!DOCTYPE html>
<html>
<body>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.sidebar {
    /* background: #120d05; */
    font-size: 15px;
		height: 630px;
    width: 230px;
}
.accordion {
  background-color: #fffffc;
  color: #444;
	font-weight: bold;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}
.accordion:hover {
  background-color: #f2f5b6; 
}
.panel {
  padding: 0 18px;
  display: block;
  overflow: hidden;
	background-color: #bbf585;
}

#panel1{
	height:250px; 
}
#panel2{
	height:230px; 
	overflow-y: scroll;
}

</style>
	<div class="sidebar">
		<button class="accordion" >Options</button>
			<div class="panel" id="panel1">
				<br>
				PEST:
					<select name="pestName"  class="form-control" style="font-size: 13px;">
						<option selected="selected" value="All" >All</option>
						<option value="Bark Borer">Bark Borer</option>
						<option value="Mussel Scale Insect">Mussel Scale Insect</option>
						<option value="Twig Borer">Twig Borer</option>
						<option value="Mealy Bug">Mealy Bug</option>
						<option value="Aphid">Aphid</option>
					</select>
				DATE:
					<br>&nbsp; From 
					<input type="date" name="dateStart" class="form-control" style="font-size: 13px;"
					id="dateStart" value="<?php if(isset($_POST['dateStart']))
					{echo $_POST['dateStart'];}?>">
					&nbsp; To 
					<input type="date" name="dateStart" class="form-control" style="font-size: 13px;"
					id="dateStart" value="<?php if(isset($_POST['dateStart']))
					{echo $_POST['dateStart'];}?>">
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