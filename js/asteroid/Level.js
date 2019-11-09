/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Level(level,level_rock_max_speed_adjust,level_saucer_max,level_saucer_occurence_rate,level_saucer_speed,level_saucer_fire_delay,level_saucer_fire_rate,level_saucer_missile_speed){
	Debugger.log("Level");
	(level === undefined)? this.level = 0 : this.level = level;
	(level_rock_max_speed_adjust === undefined)? this.level_rock_max_speed_adjust = 1 : this.level_rock_max_speed_adjust = level_rock_max_speed_adjust;
	(level_saucer_max === undefined)? this.level_saucer_max = 1 : this.level_saucer_max = level_saucer_max;
	(level_saucer_occurence_rate === undefined)? this.level_saucer_occurence_rate = 25 : this.level_saucer_occurence_rate = level_saucer_occurence_rate;
	(level_saucer_speed === undefined)? this.level_saucer_speed = 1 : this.level_saucer_speed = level_saucer_speed;
	(level_saucer_fire_delay === undefined)? this.level_saucer_fire_delay = 300 : this.level_saucer_fire_delay = level_saucer_fire_delay;
	(level_saucer_fire_rate === undefined)? this.level_saucer_fire_rate = 30 : this.level_saucer_fire_rate = level_saucer_fire_rate;
	(level_saucer_missile_speed === undefined)? this.level_saucer_missile_speed = 1 : this.level_saucer_missile_speed = level_saucer_missile_speed;
	

	this.setLevelVariables = function(){
		this.level_rock_max_speed_adjust = this.level * .25;
		if(this.level_rock_max_speed_adjust>3) this.level_rock_max_speed_adjust=3;

		this.level_saucer_max = 1 + Math.floor(this.level / 10);
		if(this.level_saucer_max > 5) this.level_saucer_max = 5;

		this.level_saucer_occurence_rate = 10 +  3 * this.level;
		if(this.level_saucer_occurence_rate > 35) this.level_saucer_occurence_rate = 35;

		this.level_saucer_speed = 1 + .5 * this.level;
		if(this.level_saucer_speed > 5) this.level_saucer_speed = 5;

		this.level_saucer_fire_delay = 120-10 * this.level;
		if(this.level_saucer_fire_delay < 20) this.level_saucer_fire_delay = 20;

		this.level_saucer_fire_rate = 20 + 3 * this.level;
		if(this.level_saucer_fire_rate > 50) this.level_saucer_fire_rate = 50;

		this.level_saucer_missile_speed = 1 + .2 * this.level;
		if(this.level_saucer_missile_speed > 4) this.level_saucer_missile_speed = 4;
	}
	this.setLevelVariables();
}

Level.prototype.up = function(){
	this.level +=1;
	this.setLevelVariables();
}
Level.prototype.reset = function(){
	this.level = 0;
	this.setLevelVariables();
}