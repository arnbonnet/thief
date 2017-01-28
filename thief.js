$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var life = $("#status > .life > .value");

	gotoSection("intro");
	
	buttons.click( function() {
		if($(this).attr("go") == "hitWall" || $(this).attr("go") == "hitDoor") {
			loseOneLife();
		}

		if(life.text() == "0") {
				endGame();
		}
		else {
			gotoSection($(this).attr("go"));
		}

	} );
	
	function gotoSection(key) {
		$(".section").hide();
		$("#" + key).show();
		if("intro" == key)
			setLife("--");
		if("manoir" == key)
			startGame();
	}
	
	function getLife() {
		life.text();
	}
	
	function setLife(v) {
		life.text(v);
	}
	
	function loseOneLife() {
		setLife(life.text()-1);
	}
	
	function startGame() {
		setLife(3);
	}
	
	function endGame() {
		gotoSection("death");
		buttons.click( function() {
			gotoSection($(this).attr("go"));
		});
	}
	
} );