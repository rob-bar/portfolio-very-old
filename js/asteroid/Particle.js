/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Particle(x,y,dx,dy,life){
	Debugger.log("Particle");
	(x === undefined)? this.x = 0 : this.x = x;
	(y === undefined)? this.y = 0 : this.y = y;
	(dx === undefined)? this.dx = 0 : this.dx = dx;
	(dy === undefined)? this.dy = 0 : this.dy = dy;
	(life === undefined)? this.life = Math.floor(Math.random()*30 + 30) : this.life = life;
}

Particle.prototype.update = function(x_min, x_max, y_min, y_max){
	var remove = false;
	this.x += this.dx;
	this.y += this.dy;
	this.lifeCtr += 1;
	try {
		if(this.lifeCtr > this.life){
			remove = true;
		}else if((this.x > x_max) || (this.x < x_min) || (this.y > y_max) || (this.y < y_min)) {
			remove = true;
		}
	} catch (exception) {
		Debugger.log("Error in particle");
		Debugger.log("particle: "+ exception);
	}
	return remove;
}
Particle.prototype.render = function(context){
	context.save();//saving the stage in the stack
	context.setTransform(1,0,0,1,0,0);//resetting identity
	//transformations
	context.translate(this.x,this.y);
	context.strokeStyle = "#cb6b6b";
	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(1,1);
	context.stroke();
	context.closePath();
	context.restore();//pop Up old state
}