/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor
 * ROCK PROTOTYPE
 */
function Rock(scale,x,y,dx,dy,rotation,rotationInc,scoreValue){
	Debugger.log("Rock");
	(x === undefined)? this.x = 0 : this.x = x;
	(y === undefined)? this.y = 0 : this.y = y;
	(dx === undefined)? this.dx = 0 : this.dx = dx;
	(dy === undefined)? this.dy = 0 : this.dy = dy;
	(rotation === undefined)? this.rotation = 0 : this.rotation = rotation;
	(rotationInc === undefined)? this.rotationInc = 0 : this.rotationInc = rotationInc;
	(scoreValue === undefined)? this.scoreValue = 0 : this.scoreValue = scoreValue;
	(scale === undefined)? this.scale = 0 : this.scale = scale;
	( this.scale < 1 ||  this.scale > 3)? this.scale = 1 : this.scale = scale;
	switch (this.scale) {
		case 1:
			this.width = 50;
			this.height = 50;
			break;
		case 2:
			this.width = 25;
			this.height = 25;
			break;
		case 3:
			this.width = 16;
			this.height = 16;
			break;
		default:
			break;
	}
	this.halfWidth = this.width * .5;
	this.halfHeight = this.height * .5;
}

Rock.prototype.update = function(x_min,x_max,y_min,y_max){
	this.x += this.dx;
	this.y += this.dy;
	this.rotation += this.rotationInc;
	if(this.x > x_max) this.x = -this.width;
	else if(this.x < -this.width) this.x = x_max;

	if(this.y > y_max) this.y = -this.height;
	else if(this.y < -this.height) this.y = y_max;
}

Rock.prototype.draw = function(context){
	var rad = angleToRadians(this.rotation);
	context.save();//saving the stage in the stack
	context.setTransform(1,0,0,1,0,0);//resetting identity

	//transformations
	//TRANSLATE the canvas origin to the center of the Rock;
	context.translate(this.x + this.halfWidth ,this.y + this.halfHeight);
	context.rotate(rad);
	context.strokeStyle = "#FFFFFF";
	context.beginPath();
	context.moveTo(-(this.halfWidth - 1), -(this.halfHeight - 1));
	context.lineTo((this.halfWidth - 1), -(this.halfHeight - 1));
	context.lineTo((this.halfWidth - 1), (this.halfHeight - 1));
	context.lineTo(-(this.halfWidth - 1), (this.halfHeight - 1));
	context.lineTo(-(this.halfWidth - 1), -(this.halfHeight - 1));
	context.stroke();
	context.closePath();
	context.restore();//pop Up old state
}