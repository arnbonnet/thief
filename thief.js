$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var life = $("#status > .life > .lifeValue");
	var alert = $("#status > .alert > .alertValue");
	var tools = $("#status > .inventory > .toolsValue");

	//AUDIO
	var sound = document.getElementById("sound");
	sound.volume = 0.2;

	gotoSection("intro");

	buttons.click( function() {

		//CONSEQUENCES OF ALERT
		if(parseInt(alert.text()) > 1) {
			$("#teenageRoom > button[go='tabletCat']").attr("go", "tablet");
		}

		if(parseInt(alert.text()) > 2) {
			$("#kitchen > button[go='emptyKitchen']").attr("go", "eatingCat");
			$("#searchParentRoom > button[go='searchNightstand']").attr("go", "stoppedByHusband");
		}

		//CONSEQUENCES OF LIFE
		if(parseInt(life.text()) <= 1) {
			$("#cutlery > button[go='drawerOnFloor']").attr("go", "failedDrawer");
			$("#openWardrobe > button[go='successWardrobe']").attr("go", "failedWardrobe");
			$("#leaveByWindow > button[go='escaped']").attr("go", "arrested");
		}

		//TOOLS SYSTEM
		if(parseInt(tools.text()) > 0) {
			$(".tools").show();
		} else {
			$(".tools").hide();
		}
		if($(this).attr("class") == "tools")
			looseTools(1);

		//LIFE AND ALERT SYSTEM
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

		//STEAL ONCE SYSTEM
		/*if(key == "cutelery")
			$(this).attr("go", "alreadyTaken");*/

		gotoSection(key);

		if(life.text() == "0" || alert.text() == "4")
			endGame(key);

	});


	function gotoSection(key) {
		$(".section").hide();
		$("#" + key).show();

		if("intro" == key)
			startGame();
	}
	
	function setLife(v) {
		life.text(v);
	}
	
	function setAlert(a) {
		alert.text(a);
	}

	function setTools(t) {
		tools.text(t);
	}

	function looseTools(t) {
		setTools(parseInt(tools.text())-t);
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
		setTools(1);
	}
	
	function endGame(key) {
		//REMOVE BUTTONS OF THIS SECTION
		$("#" + key + " button").remove();

		if(life.text() == "0") {
			// $(".life").toggleClass("red");
			$("#" + key).append("Vous vous êtes évanouis.<br />Vous êtes à présent au poste de police.");
		}
		else if(alert.text() == "4") {
			// $(".alert").toggleClass("red");
			$("#" + key).append("La police surgit dans la pièce et vous arrête.");
		}

		//ADD RESTART BUTTON
		$("#" + key).append("<button go='intro'>Recommencer.</button>");

		//ADD CLICK EVENT ON THE BUTTON
		$("#" + key + " button").click(function() {
			gotoSection($(this).attr("go"));
			// $("#status > div").toggleClass("red", false);
		});
	}
	
} );