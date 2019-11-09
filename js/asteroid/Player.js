/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Player(x,y,width,height,scale,facingX,facingY,movingX,movingY,rotation,rotationVelocity,maxVelocity,thrustAcceleration,missileFrameDelay,thrust,friction,missileFrameCount){
	Debugger.log("Player");
	(x === undefined)? this.x = 0 : this.x = x;
	(y === undefined)? this.y = 0 : this.y = y;
	(width === undefined)? this.width = 0 : this.width = width;
	(height === undefined)? this.height = 0 : this.height = height;
	(scale === undefined)? this.scale = 1 : this.scale = scale;
	(facingX === undefined)? this.facingX = 0 : this.facingX = facingX;
	(facingY === undefined)? this.facingY = 0 : this.facingY = facingY;
	(movingX === undefined)? this.movingX = 0 : this.movingX = movingX;
	(movingY === undefined)? this.movingY = 0 : this.movingY = movingY;
	(rotation === undefined)? this.rotation = 0 : this.rotation = rotation;
	(rotationVelocity === undefined)? this.rotationVelocity = 5 : this.rotationVelocity = rotationVelocity;
	(maxVelocity === undefined)? this.maxVelocity = 2 : this.maxVelocity = maxVelocity;
	(thrustAcceleration === undefined)? this.thrustAcceleration = .05 : this.thrustAcceleration = thrustAcceleration;
	(missileFrameDelay === undefined)? this.missileFrameDelay = 5 : this.missileFrameDelay = missileFrameDelay;
	(thrust === undefined)? this.thrust = false : this.thrust = thrust;
	(friction === undefined)? this.friction = .001 : this.friction = friction;
	(missileFrameCount === undefined)? this.missileFrameCount = 0 : this.missileFrameCount = missileFrameCount;
	this.aPlayerMissiles = [];

	this.updatePlayer = function(x_min,x_max,y_min,y_max){
		this.missileFrameCount += 1;
		this.x += this.movingX;
		this.y += this.movingY;

		if(this.x > x_max) this.x = -this.width;
		else if(this.x < -this.width) this.x = x_max;

		if(this.y > y_max) this.y = -this.height;
		else if(this.y < -this.height) this.y = y_max;
	}

	this.updatePlayerMissiles = function(x_min,x_max,y_min,y_max){
		var tempPlayerMissile = {};
		var playerMissileLength = this.aPlayerMissiles.length-1;
		for (iplayerMissileCtr = playerMissileLength; iplayerMissileCtr >= 0; iplayerMissileCtr--) {
			tempPlayerMissile = this.aPlayerMissiles[iplayerMissileCtr];
			tempPlayerMissile.x += tempPlayerMissile.dx;
			tempPlayerMissile.y += tempPlayerMissile.dy;

			if(tempPlayerMissile.x > x_max) tempPlayerMissile.x = -tempPlayerMissile.width;
			else if(tempPlayerMissile.x < -tempPlayerMissile.width) tempPlayerMissile.x = x_max;

			if(tempPlayerMissile.y > y_max) tempPlayerMissile.y = -tempPlayerMissile.height;
			else if(tempPlayerMissile.y < -tempPlayerMissile.height) tempPlayerMissile.y = y_max;

			tempPlayerMissile.lifeCtr++;
			if(tempPlayerMissile.lifeCtr > tempPlayerMissile.life) {
				this.aPlayerMissiles.splice(iplayerMissileCtr,1);
				tempPlayerMissile = null;
			}
		}
	}

	this.renderPlayer = function(context){
		var Rads = angleToRadians(this.rotation);
		context.save();//saving the stage in the stack
		context.setTransform(1,0,0,1,0,0);//resetting identity
		//transformations
		context.translate(this.x + this.halfWidth, this.y + this.halfHeight);
		context.rotate(Rads);
		context.scale(this.scale,this.scale);
		(this.thrust == true && this.scale == 1)? drawthrustedship(context) : drawship(context);
		context.restore();//pop Up old state
	}
	
	this.renderPlayerMissiles = function(context){
		var tempPlayerMissile = {};
		var playerMissileLength = this.aPlayerMissiles.length-1;
		for (iplayerMissileCtr = playerMissileLength; iplayerMissileCtr >= 0; iplayerMissileCtr--) {
			tempPlayerMissile = this.aPlayerMissiles[iplayerMissileCtr];
			context.save();//saving the stage in the stack
			context.setTransform(1,0,0,1,0,0);//resetting identity
			//transformations
			context.translate(tempPlayerMissile.x + 1,tempPlayerMissile.y + 1);
			context.strokeStyle = "#e67030";
			context.fillStyle = "#e67030";
			context.beginPath();
			context.fillRect(-1.5, -1.5, 3, 3);
			context.closePath();
			context.restore();//pop Up old state
		}
	}

	function drawthrustedship(context){
		Debugger.log("drawthrustedship");
		context.strokeStyle = "#ffffff";
		context.fillStyle = "#e67030";
		context.beginPath();
		//ship
		context.moveTo(-10,-10);
		context.lineTo(10,0);
		context.moveTo(10,1);
		context.lineTo(-10,10);
		context.lineTo(1,1);
		context.moveTo(1,-1);
		context.lineTo(-10,-10);
		//thrust
		context.fillRect(-9,-1,6,2);

		context.stroke();
		context.closePath();
	}
	function drawship(context){
		Debugger.log("drawship");
		context.strokeStyle = "#ffffff";
		context.beginPath();
		//ship
		context.moveTo(-10,-10);
		context.lineTo(10,0);
		context.moveTo(10,1);
		context.lineTo(-10,10);
		context.lineTo(1,1);
		context.moveTo(1,-1);
		context.lineTo(-10,-10);

		context.stroke();
		context.closePath();
	}
}

Player.prototype.update = function(x_min,x_max,y_min,y_max){
	this.updatePlayer(x_min, x_max, y_min, y_max);
	this.updatePlayerMissiles(x_min, x_max, y_min, y_max);
}
Player.prototype.render = function(context){
	this.renderPlayer(context);
	this.renderPlayerMissiles(context);
}
Player.prototype.firePlayerMissile = function(){
	var newPlayerMissile = {};
	newPlayerMissile.dx = 5*Math.cos(Math.PI*(this.rotation) / 180);
	newPlayerMissile.dy = 5*Math.sin(Math.PI*(this.rotation) / 180);
	newPlayerMissile.x = this.x + this.halfWidth;
	newPlayerMissile.y = this.y + this.halfHeight;
	newPlayerMissile.life = 80;
	newPlayerMissile.lifeCtr = 0;
	newPlayerMissile.width = 2;
	newPlayerMissile.height = 2;
	this.aPlayerMissiles.push(newPlayerMissile);
}

Player.prototype.resetPlayer = function(x_max,y_max){
	this.rotation = 270;
	this.aPlayerMissiles = [];
	this.x = .5 * x_max;
	this.y = .5 * y_max;
	this.thrust = false;
	this.facingX = 0;
	this.facingY = 0;
	this.movingX = 0;
	this.movingY = 0;
	this.alpha = 0;
	this.missileFrameCount = 0;
}