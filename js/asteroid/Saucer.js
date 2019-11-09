/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Saucer(x,y,dx,dy,width,height,scoreValue,fireRate,fireDelay,fireDelayCount,missileSpeed){
	Debugger.log("Saucer");
	(x === undefined)? this.x = 0 : this.x = x;
	(y === undefined)? this.y = 0 : this.y = y;
	(dx === undefined)? this.dx = 0 : this.dx = dx;
	(dy === undefined)? this.dy = 0 : this.dy = dy;
	(width === undefined)? this.width = 0 : this.width = width;
	(height === undefined)? this.height = 0 : this.height = height;
	(scoreValue === undefined)? this.scoreValue = 0 : this.scoreValue = scoreValue;
	(fireRate === undefined)? this.fireRate = 0 : this.fireRate = fireRate;
	(fireDelay === undefined)? this.fireDelay = 0 : this.fireDelay = fireDelay;
	(fireDelayCount === undefined)? this.fireDelayCount = 0 : this.fireDelayCount = fireDelayCount;
	(missileSpeed === undefined)? this.missileSpeed = 0 : this.missileSpeed = missileSpeed;
	this.halfWidth = width*.5;
	this.halfHeight = height*.5;
	this.aSoucerMissiles = [];

	function drawSaucer(context){
		Debugger.log("drawSaucer");
		context.strokeStyle = "#8c68e7";
		context.beginPath();
		context.moveTo(4,0);
		context.lineTo(9,0);
		context.lineTo(12,3);
		context.lineTo(13,3);
		context.moveTo(13,4);
		context.lineTo(10,7);
		context.lineTo(3,7);
		context.lineTo(1,5);
		context.lineTo(12,5);
		context.moveTo(0,4);
		context.lineTo(0,3);
		context.lineTo(13,3);
		context.moveTo(5,1);
		context.lineTo(5,2);
		context.moveTo(8,1);
		context.lineTo(8,2);
		context.moveTo(2,2);
		context.lineTo(4,0);
		context.stroke();
		context.closePath();
	}

	this.updateSaucer = function(x_min, x_max, y_min, y_max,player_X,player_Y){
		this.fireDelayCount++;
		if(Math.floor(Math.random() * 100) <= this.fireRate && this.fireDelayCount > this.fireDelay) {
			this.fireSaucerMissile(player_X,player_Y);
			this.fireDelayCount = 0;
		}
		var remove = false;
		this.x += this.dx;
		this.y += this.dy;

		if (this.dx > 0 && this.x > x_max) {
			remove = true;
		} else if(this.dx < 0 && this.x < x_min - this.width) {
			remove = true;
		}

		if(this.y > y_max || this.y <y_min - this.width) {
			this.dy *= -1;
		}
		
		return remove;
	}

	this.updateSaucerMissiles = function(x_max, y_max){
		var tempSaucerMissile = {};
		var saucerMissileLength = this.aSoucerMissiles.length - 1;

		for (saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
			tempSaucerMissile = this.aSoucerMissiles[saucerMissileCtr];
			tempSaucerMissile.x += tempSaucerMissile.dx;
			tempSaucerMissile.y += tempSaucerMissile.dy;

			if(tempSaucerMissile.x > x_max) tempSaucerMissile.x = -tempSaucerMissile.width;
			else if(tempSaucerMissile.x < -tempSaucerMissile.width) tempSaucerMissile.x = x_max;

			if(tempSaucerMissile.y > y_max) tempSaucerMissile.y = -tempSaucerMissile.height;
			else if(tempSaucerMissile.y < -tempSaucerMissile.height) tempSaucerMissile.y = y_max;

			tempSaucerMissile.lifeCtr++;
			if(tempSaucerMissile.lifeCtr > tempSaucerMissile.life) {
				this.aSoucerMissiles.splice(saucerMissileCtr,1);
				tempSaucerMissile = null;
			}
		}
		
	}
	this.renderSaucer = function(context){
		context.save();//saving the stage in the stack
		context.setTransform(1,0,0,1,0,0);//resetting identity
		context.translate(this.x,this.y);
		drawSaucer(context);
		context.restore();//pop Up old state
	}
	this.renderSaucerMissiles = function(context){
		var tempSaucerMissile = {};
		var saucerMissileLength = this.aSoucerMissiles.length - 1;

		for (saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
			tempSaucerMissile = this.aSoucerMissiles[saucerMissileCtr];
			context.save();//saving the stage in the stack
			context.setTransform(1,0,0,1,0,0);//resetting identity

			//transformations
			context.translate(tempSaucerMissile.x+1,tempSaucerMissile.y+1);

			context.strokeStyle = "#FF0000";
			context.fillStyle = "#FF0000";
			context.beginPath();
			context.fillRect(-1.5, -1.5, 3, 3);
			context.closePath();
			
			context.restore();//pop Up old state
		}
	}
	this.fireSaucerMissile = function(player_X,player_Y){
		var newSaucerMissile = {};
		newSaucerMissile.x = this.x ;
		newSaucerMissile.y = this.y ;
		newSaucerMissile.width = 2;
		newSaucerMissile.height = 2;
		newSaucerMissile.speed = this.missileSpeed;

		var difX = player_X - this.x;
		var dify = player_Y - this.y;
		var rad = Math.atan2(dify, difX);
		var degrees = 360 * rad / (2 * Math.PI);

		newSaucerMissile.dx = this.missileSpeed * Math.cos(angleToRadians(degrees));
		newSaucerMissile.dy = this.missileSpeed * Math.sin(angleToRadians(degrees));
		newSaucerMissile.life = 160;
		newSaucerMissile.lifeCtr = 0;
		this.aSoucerMissiles.push(newSaucerMissile);
	}
}





Saucer.prototype.update = function(x_min, x_max, y_min, y_max,player_X,player_Y){
	var bCheck =  this.updateSaucer(x_min, x_max, y_min, y_max,player_X,player_Y);
	this.updateSaucerMissiles(x_max, y_max);
	return bCheck;
}

Saucer.prototype.render = function(context){
	this.renderSaucer(context);
	this.renderSaucerMissiles(context);
}