$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var life = $("#status > .life > .lifeValue");
	var alert = $("#status > .alert > .alertValue");

	gotoSection("intro");

	buttons.click( function() {
		key = $(this).attr("go");

		if( key == "roof" || key == "window" 
			|| key == "eatingCat" || key == "failedVault" 
			|| key == "takeTabletCat")
		{
			looseLife(1);
		}

		if(key == "roof")
			increaseAlert(2);

		if(key == "garden" || key == "window" 
			|| key == "eatingCat" || key == "drawerOnFloor" 
			|| key == "failedVault" || key == "takeTabletCat" 
			|| key == "successWardrobe")
		{
			increaseAlert(1);
		}

		gotoSection(key);

		if(life.text() == "0" || alert.text() == "4")
			endGame(key);

	});
	
	function gotoSection(key) {
		$(".section").hide();
		$("#" + key).show();
		if("intro" == key) {
			setLife("--");
			setAlert("--");
		}
		if("manoir" == key)
			startGame();
	}
	
	function setLife(v) {
		life.text(v);
	}
	
	function setAlert(a) {
		alert.text(a);
	}
	
	function looseLife(v) {
		setLife(parseInt(life.text())-v);
	}

	function increaseAlert(a) {
		setAlert(parseInt(alert.text())+a);
	}
	
	function startGame() {
		setLife(3);
		setAlert(0);
	}
	
	function endGame(key) {
		//remove buttons of this section
		$("#" + key + " button").remove();

		if(life.text() == "0")
			$("#" + key).append("Vous vous êtes évanouis.<br />Vous êtes à présent au poste de police.");
		else if(alert.text() == "4")
			$("#" + key).append("La police surgit dans la pièce et vous arrête.");

		//add restart button
		$("#" + key).append("<button go='intro'>Recommencer.</button>");
		//allows to click on it
		$("#" + key + " button").click(function() {
			gotoSection($(this).attr("go"));
		});
	}
	
} );