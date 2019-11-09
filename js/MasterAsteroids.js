/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
	//CONSTANTS
	const GAME_STATE_TITLE = 0;
	const GAME_STATE_NEW_GAME= 1;
	const GAME_STATE_NEW_LEVEL= 2;
	const GAME_STATE_PLAYER_START=3;
	const GAME_STATE_PLAY_LEVEL=4;
	const GAME_STATE_PLAYER_DIE=5;
	const GAME_STATE_GAME_OVER=6;
	const FRAME_RATE = 60;
	var IntervalId = 0;
	//STATE MACHINE VARS
	var current_game_state = 0;
	var currentGameStateFunction = null;

	//SCREEN FLOW VARS
	var title_started = false;
	var game_over_started = false;

	//GAME ENVIROMENT VARS
	var score = 0;
	var extra_ship_at_each = 10000;
	var extra_ships_earned = 0;
	var player_ships = 3;

	//PLAYFIELD VARS
	var x_min = 0;
	var x_max = 1024;
	var y_min = 0;
	var y_max = 600;

	//SCORE VARS
	var big_rock_score = 50;
	var med_rock_score = 75;
	var small_rock_score = 100;
	var saucer_rock_score = 300;

	//ROCK SIZE CONSTS
	const ROCK_SCALE_LARGE = 1;
	const ROCK_SCALE_MEDIUM = 2;
	const ROCK_SCALE_SMALL = 3;

	//DISPLAY OBJECTS
	var player = new Player();
	var playerIndic = new Player();
	var rocks = [];
	var saucers = [];
	var particles = [];
	var level = new Level(1);

	var key_press_list = [];
	
	if(!canvasSupport() || jQuery.browser.msie){
		$('#browser-error').css('display','block');
		$('#canvas').css('display','none');
		return;
	}else{
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		//initTheApp
		Debugger.isTracing = false;
		frameRateCounter = new FrameRateCounter();
		switchGameState(GAME_STATE_TITLE);
		IntervalId = setInterval(runGame, getMillisecondsInterval(FRAME_RATE));
	}
	Debugger.log("This browsers support for canvas is "+ canvasSupport());
	
	function checkKeys(){
		if(key_press_list[38]==true){
			//thrust
			player.facingX = Math.cos(angleToRadians(player.rotation));
			player.facingY = Math.sin(angleToRadians(player.rotation));
			var movingXnew = player.movingX + player.thrustAcceleration * player.facingX;
			var movingYnew = player.movingY + player.thrustAcceleration * player.facingY;

			var curentVelocity = Math.sqrt((movingXnew * movingXnew) + (movingYnew * movingYnew));
			if(curentVelocity < player.maxVelocity){
				Debugger.log("curentVelocity => "+curentVelocity);
				player.movingX = movingXnew;
				player.movingY = movingYnew;
			}
			player.thrust = true;
		}else{
			player.thrust = false;
			player.movingX -= (player.movingX * player.friction);
			player.movingY -= (player.movingY * player.friction);
		}//UP
		if(key_press_list[37]==true){
			player.rotation -= player.rotationalVelocity;
		}//LEFT
		if(key_press_list[39]==true){
			player.rotation += player.rotationalVelocity;
		}//RIGHT
		if(key_press_list[32]==true){
			Debugger.log("player.missileFrameCount => "+player.missileFrameCount);
			Debugger.log("player.missileFrameDelay => "+player.missileFrameDelay);
			if(player.missileFrameCount > player.missileFrameDelay){
				player.firePlayerMissile();
				player.missileFrameCount = 0;
			}
		}//RIGHT
	}
	function update(){
		updatePlayer();
		updateRocks();
		updateSaucers();
		updateParticles();
	}
	function render(){
		fillBackground();
		renderScoreboard();
		renderPlayerShip();
		renderRocks();
		renderSaucers();
		renderParticles();
	}

	//STATE FUNCTIONS
	function gameStateNewGame(){
		Debugger.log("gameStateNewGame");
		score = 0;
		player_ships = 3;

		level.reset();

		player.maxVelocity = 2;
		player.width = 20;
		player.height= 20;
		player.scale = 1 ;
		player.alpha = 0 ;
		player.halfWidth = player.width * .5;
		player.halfHeight= player.height * .5;
		player.rotationalVelocity = 5;
		player.thrustAcceleration = .05;
		player.missileFrameDelay = 5;
		player.thrust = false;
		player.friction = .001;

		fillBackground();
		renderScoreboard();
		switchGameState(GAME_STATE_NEW_LEVEL);
	}
				
	function gameStateNewLevel(){
		Debugger.log("gameStateNewLevel");
		rocks = [];
		saucers = [];
		particles = [];
		//					saucer_missiles = [];
		level.up();

		//create Level Rocks
		for (i = 0; i < level.level+3; i++) {
			var newRock = new Rock(1);
						
			newRock.x = Math.floor(Math.random() * x_max);
			newRock.y = Math.floor(Math.random() * y_max);
						
			newRock.dx = Math.floor(Math.random()*2 + level.level_rock_max_speed_adjust);
			if(Math.random() < .5) newRock.dx = -1;

			newRock.dy = Math.floor(Math.random()*2 + level.level_rock_max_speed_adjust);
			if(Math.random() < .5) newRock.dy = -1;

			newRock.rotationInc = (Math.random() * 5) + 1;
			if(Math.random() < .5) newRock.rotationInc *= -1;

			newRock.scoreValue = big_rock_score;
			newRock.rotation = 0;

			rocks.push(newRock);
		}
		resetPlayer();
		switchGameState(GAME_STATE_PLAYER_START);
	}

	function gameStatePlayerStart(){
		Debugger.log("gameStatePlayerStart");
		fillBackground();
		renderScoreboard();

		if(player.alpha < 1){
			player.alpha += .02;
			context.globalAlpha = player.alpha;
		}else{
			switchGameState(GAME_STATE_PLAY_LEVEL);
		}

		renderPlayerShip(player.x,player.y,270,1);
		context.alpha = 1;
		updateRocks();
		renderRocks();
	}
				
	function gameStatePlayeLevel(){
		Debugger.log("gameStatePlayelevel");
		checkKeys();
		update();
		render();
		checkCollisions();
		checkForExtraShips();
		checkForEndOfLevel();
		frameRateCounter.countFrames();
	}


	function gameStatePlayerDie(){
		Debugger.log("gameStatePlayerDie");
		if(particles.length > 0 || player.aPlayerMissiles.length > 0){
			fillBackground();
			renderScoreboard();
			updateRocks();
			updateSaucers();
			updateParticles();
			player.updatePlayerMissiles(x_min, x_max, y_min, y_max);
			renderRocks();
			renderSaucers();
			renderParticles();
			player.renderPlayerMissiles(context);
			//			renderPlayerMissiles();
			frameRateCounter.countFrames();
		}else{
			player_ships -= 1;
			if(player_ships == 0){
				switchGameState(GAME_STATE_GAME_OVER);
			}else{
				resetPlayer();
				switchGameState(GAME_STATE_PLAYER_START);
			}

		}
	}
				
	function gameStateGameOver(){
		Debugger.log("gameStateGameOver");
		if(game_over_started == false) {
			fillBackground();
			renderScoreboard();
			setTextStyle();
			context.fillStyle = "#FF0000";
			context.fillText("Game Over!",x_max*.5,70);
			context.fillText("Press Space To Play",x_max*.5,140);
			game_over_started = true;
		}else{
			//wait for spacekeypress
			if(key_press_list[32]==true) {
				Debugger.log("Space pressed");
				switchGameState(GAME_STATE_TITLE);
				game_over_started = false;
			}
		}
	}

	function gameStateTitle(){
		if(title_started != true){
			Debugger.log("gameStateTitle");
			fillBackground();
			setTextStyle();
			context.fillText("Geo Blaster Basic", x_max*.5, 70);
			context.fillText("Press Spacebar To Play", x_max*.5, 140);
			context.fillText("Use arrow keys to move your Ship.", x_max*.5, 165);
			context.fillText("Use Spacebar to Fire.", x_max*.5, 185);
			title_started = true;
		}else{
			//Wait for spacePress
			if(key_press_list[32] == true){
				Debugger.log("Space Pressed");
				switchGameState(GAME_STATE_NEW_GAME);
				title_started = false;
			}
		}
	}

	//interval Function
	function runGame(){
		currentGameStateFunction();
	}

	//Switching gameState
	function switchGameState(state){
		current_game_state = state;
		switch(current_game_state){
			case GAME_STATE_TITLE:
				currentGameStateFunction = gameStateTitle;
				break;
			case GAME_STATE_NEW_GAME:
				currentGameStateFunction = gameStateNewGame;
				break;
			case GAME_STATE_NEW_LEVEL:
				currentGameStateFunction = gameStateNewLevel;
				break;
			case GAME_STATE_PLAYER_START:
				currentGameStateFunction = gameStatePlayerStart;
				break;
			case GAME_STATE_PLAY_LEVEL:
				currentGameStateFunction = gameStatePlayeLevel;
				break;
			case GAME_STATE_PLAYER_DIE:
				currentGameStateFunction = gameStatePlayerDie;
				break;
			case GAME_STATE_GAME_OVER:
				currentGameStateFunction = gameStateGameOver;
				break;
		}
	}
	function fillBackground(){
		Debugger.log("fillBackground");
		context.fillStyle="#000000";
		context.fillRect(x_min, y_min, x_max, y_max);
	}
	function setTextStyle(){
		Debugger.log("setTExtStyle");
		context.fillStyle = "#ffffff";
		context.font = "16px Calibri";
		context.textAlign = "center";
		context.textBaseline = "top";
	}
	function renderScoreboard(){
		Debugger.log("renderScoreboard");
		context.fillStyle = "#ffffff";
		context.textAlign = "left";
		context.fillText("Score - "+ score,20,20);
		playerIndic.x = x_max*.5-32;
		playerIndic.y = 16;
		playerIndic.width = 20;
		playerIndic.height= 20;
		playerIndic.halfWidth = playerIndic.width * .5;
		playerIndic.halfHeight= playerIndic.height * .5;
		playerIndic.rotation = 270;
		playerIndic.scale = .75;
		playerIndic.render(context);
		context.textAlign = "center";
		context.fillText("X "+ player_ships,x_max*.5,20)
		context.fillText("level: "+ level.level,x_max-50,20)
		drawFrameRate();
	}
	function drawFrameRate(){
	//		context.fillStyle="#ffffff";
	//		context.fillRect(canvas.width-50, 0, 50, 30);
	//		context.fillStyle = "#000000";
	//		context.font = "15px Calibri";
	//		context.textAlign = "left";
	//		context.textBaseline = "top";
	//		context.fillText("Fps:"+frameRateCounter.lastFrameCount, canvas.width-40, 10);
	}
	function checkForExtraShips(){
		Debugger.log("checkForExtraShips");
		if(Math.floor(score / extra_ship_at_each) > extra_ships_earned){
			player_ships += 1;
			extra_ships_earned += 1;
		}
	}
	function checkForEndOfLevel(){
		Debugger.log("checkForEndOfLevel");
		if(rocks.length == 0) switchGameState(GAME_STATE_NEW_LEVEL);
	}
				
	function resetPlayer(){
		Debugger.log("resetPlayer");
		player.resetPlayer(x_max, y_max);
	}


	//UPDATEFUNCTIONS
	function updatePlayer(){
		Debugger.log("updatePlayer");
		player.update(x_min, x_max, y_min, y_max);
	}
				
	function updateRocks(){
		Debugger.log("updateRocks");
		var rocksLength = rocks.length-1;
		for (rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
			var tempRock = rocks[rockCtr];
			tempRock.update(x_min, x_max, y_min, y_max);
		}
	}

	function updateSaucers(){
		Debugger.log("updateSaucers");
		if(saucers.length < level.level_saucer_max){
			if(Math.floor(Math.random()*100) <= level.level_saucer_occurence_rate) {
				var newSaucer = new Saucer(0,0,0,0,28,13,saucer_rock_score,level.level_saucer_fire_rate,level.level_saucer_fire_delay,0,level.level_saucer_missile_speed);
				newSaucer.dy = (Math.random()*2);
				if(Math.floor(Math.random()*2)==1) newSaucer.dy *=-1;

				if (Math.floor(Math.random()*2)==1) {
					newSaucer.x = x_max + newSaucer.width;
					newSaucer.dx = -1*level.level_saucer_speed;
				} else {
					newSaucer.x = -newSaucer.width;
					newSaucer.dx = level.level_saucer_speed;
				}
				newSaucer.y = Math.floor((Math.random() * y_max) - newSaucer.height );
				saucers.push(newSaucer);
			}
		}
		var tempSaucer = {};
		var saucerLength = saucers.length - 1;

		for (saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
			tempSaucer = saucers[saucerCtr];
			if (tempSaucer.update(x_min, x_max, y_min, y_max,player.x,player.y)) {
				//remove the saucer
				saucers.splice(saucerCtr,1);
				tempSaucer = null;
			}
		}
	}
				
	function updateParticles(){
		Debugger.log("updateParticles");
		var tempParticle = {};
		var particleLength = particles.length-1;
		for (particleCtr = particleLength; particleCtr >= 0; particleCtr--) {
			tempParticle = particles[particleCtr];
			if(tempParticle.update()){
				particles.splice(particleCtr,1);
				tempParticle = null;
			}
		}
	}
	//RENDER FUNCTIONS
	function renderPlayerShip(){
		player.render(context);
	}
				
	function renderRocks(){
		Debugger.log("renderRocks");
		var tempRock = {};
		var rocksLength = rocks.length-1;
		for (rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
			tempRock = rocks[rockCtr];
			tempRock.draw(context);
		}
	}
	function renderSaucers(){
		Debugger.log("renderSaucers");
		var tempSaucer = {};
		var saucerLength = saucers.length - 1;
		for (saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
			tempSaucer = saucers[saucerCtr];
			tempSaucer.render(context);
		}
	}

	function renderParticles(){
		Debugger.log("renderParticles");
		var tempParticle = {};
		var particleLength = particles.length-1;
		for (var particleCtr = particleLength; particleCtr >= 0; particleCtr--) {
			tempParticle = particles[particleCtr];
			tempParticle.render(context);
		}
	}

	//COLLISION FUNCTIONS
	function checkCollisions(){
		Debugger.log("checkCollisions");
		//Loop through rocks then missiles.There will always be rocks and a ship,
		//but there will not always be missiles.

		var tempRock = {};
		var rocksLength = rocks.length-1;
		var tempPlayerMissile = {};
		var playerMissileLength = player.aPlayerMissiles.length-1;
		var saucerLength = saucers.length-1;
		var tempSaucer = {};

			rocksing: for (var rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
				tempRock = rocks[rockCtr];
					missilesing: for (var playerMissileCtr = playerMissileLength; playerMissileCtr >= 0; playerMissileCtr--) {
						tempPlayerMissile = player.aPlayerMissiles[playerMissileCtr];
						if(boundingBoxCollide(tempRock, tempPlayerMissile)){
							Debugger.log("hit Rock Missile");
							createExplode(tempRock.x + tempRock.halfWidth,tempRock.y + tempRock.halfHeight,10);
							if(tempRock.scale<3)splitRock(tempRock.scale+1,tempRock.x,tempRock.y);
							addToScore(tempRock.scoreValue);

							player.aPlayerMissiles.splice(playerMissileCtr,1);
							tempPlayerMissile = null;

							rocks.splice(rockCtr,1);
							tempRock = null;

							break rocksing;
							break missilesing;
						}
					}

					saucering: for (var saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
						tempSaucer = saucers[saucerCtr];
						if(boundingBoxCollide(tempRock, tempSaucer)){
							Debugger.log("hit Rock saucer");
							createExplode(tempSaucer.x + tempSaucer.halfWidth,tempSaucer.y + tempSaucer.halfHeight,10);
							createExplode(tempRock.x + tempRock.halfWidth,tempRock.y + tempRock.halfHeight,10);
							if(tempRock.scale<3)splitRock(tempRock.scale+1,tempRock.x,tempRock.y);

							saucers.splice(saucerCtr,1);
							tempSaucer = null;

							rocks.splice(rockCtr,1);
							tempRock = null;

							break rocksing;
							break saucering;
						}
						var saucerMissileLength = tempSaucer.aSoucerMissiles.length-1;
							saucerMissilesing: for (var saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
								tempSaucerMissile = tempSaucer.aSoucerMissiles[saucerMissileCtr];
								if(boundingBoxCollide(tempRock, tempSaucerMissile)){
									Debugger.log("hit Rock saucerMissiles:");
									createExplode(tempRock.x + tempRock.halfWidth,tempRock.y + tempRock.halfHeight,10);
									if(tempRock.scale<3)splitRock(tempRock.scale+1,tempRock.x,tempRock.y);

									tempSaucer.aSoucerMissiles.splice(saucerMissileCtr,1);
									tempSaucerMissile = null;

									rocks.splice(rockCtr,1);
									tempRock = null;

									break rocksing;
									break saucerMissilesing;
								}
							}
					}
					
				//saucer missiles against rocks
				//this is done here so we don't have to loop
				//through rocks again as it would propably
				//be the biggest array

						
				//
				if(boundingBoxCollide(tempRock, player)){
					createExplode(tempRock.x + tempRock.halfWidth, tempRock.y + tempRock.halfHeight,10);
					addToScore(tempRock.scoreValue);
					if(tempRock.scale<3)splitRock(tempRock.scale+1,tempRock.x,tempRock.y);
					rocks.splice(rockCtr, 1);
					tempRock = null;
					playerDie();
				}
			}
		//
		//					//now check player against saucers and then saucers against missiles
		//					//and finaly player agains saucer missiles
		//
		playerMissilesLength = player.aPlayerMissiles.length-1;
		saucerLength = saucers.length-1;
			saucersying: for (saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
				tempSaucer = saucers[saucerCtr];
					missilesying: for (playerMissileCtr = playerMissilesLength; playerMissileCtr >= 0; playerMissileCtr--) {
						tempPlayerMissile = player.aPlayerMissiles[playerMissileCtr];
						if (boundingBoxCollide(tempSaucer, tempPlayerMissile)){
							Debugger.log("h");
							createExplode(tempSaucer.x + tempSaucer.halfWidth, tempSaucer.y + tempSaucer.halfHeight,10);
							addToScore(tempSaucer.scoreValue);
							player.aPlayerMissiles.splice(playerMissileCtr,1);
							tempPlayerMissile = null;

							saucers.splice(saucerCtr, 1);
							tempSaucer = null;

							break saucersying;
							break missilesying;
						}
					}
				if(boundingBoxCollide(tempSaucer, player)){
					Debugger.log("hit Saucers player");
					createExplode(tempSaucer.x+16, tempSaucer.y+16, 10);
					addToScore(tempSaucer.scoreValue);

					saucers.splice(saucerCtr, 1);

					tempSaucer = null;
					playerDie();

				}
				//saucerMissiles against player
				saucerMissileLength = tempSaucer.aSoucerMissiles.length-1;
					saucerMissilesYeah: for (saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
						tempSaucerMissile = tempSaucer.aSoucerMissiles[saucerMissileCtr];
						if (boundingBoxCollide(player,tempSaucerMissile)) {
							Debugger.log("hit saucermissile player");
							playerDie();

							tempSaucer.aSoucerMissiles.splice(saucerMissileCtr,1);
							tempSaucerMissile = null;

							break saucerMissilesYeah;
						}
					}
			}

	}
	//FIREING
	function playerDie(){
		Debugger.log("playerDie");
		createExplode(player.x + player.halfWidth, player.y + player.halfHeight,50);
		switchGameState(GAME_STATE_PLAYER_DIE);
	}

	function addToScore(val){
		score += val;
	}

	function createExplode(x,y,num){
		Debugger.log("createExplode");
		//code
		for (var partCtr = 0; partCtr < num; partCtr++) {
			var particle = new Particle();
					
			particle.dx = Math.random()*3;
			if(Math.random()<.5) particle.dx *=-1;
					
			particle.dy = Math.random()*3;
			if(Math.random()<.5) particle.dy *=-1;

			particle.lifeCtr = 0;
			particle.x = x;
			particle.y = y;
			particles.push(particle);
		}
	}

	function splitRock(scale,x,y){
		Debugger.log("splitRock");
		//code
		for (rockCtr = 0; rockCtr < 2; rockCtr++) {
						
			var rock = new Rock(scale);
			if (scale == 2) {
				rock.scoreValue = med_rock_score;
			} else {
				rock.scoreValue = small_rock_score;
			}

			rock.x = x;
			rock.y = y;

			rock.dx = Math.random()*3;
			if(Math.random()<.5) rock.dx *= -1;

			rock.dy = Math.random()*3;
			if(Math.random()<.5) rock.dy *= -1;

			rock.rotationInc = (Math.random() * 5) + 1;
			if(Math.random()<.5) rock.rotationInc *= -1;
						
			rock.rotation = 0;
			rocks.push(rock);
		}
	}
				
	//EVENTS
	$(document).keydown(function(event) {
		key_press_list[event.keyCode]=true;
	});
	$(document).keyup(function(event) {
		key_press_list[event.keyCode]=false;
	});
});