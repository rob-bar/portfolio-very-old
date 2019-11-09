function Level(a,b,c,d,e,f,g,h){Debugger.log("Level");a===undefined?this.level=0:this.level=a;b===undefined?this.level_rock_max_speed_adjust=1:this.level_rock_max_speed_adjust=b;c===undefined?this.level_saucer_max=1:this.level_saucer_max=c;d===undefined?this.level_saucer_occurence_rate=25:this.level_saucer_occurence_rate=d;e===undefined?this.level_saucer_speed=1:this.level_saucer_speed=e;f===undefined?this.level_saucer_fire_delay=300:this.level_saucer_fire_delay=f;g===undefined?this.level_saucer_fire_rate=30:this.level_saucer_fire_rate=g;h===undefined?this.level_saucer_missile_speed=1:this.level_saucer_missile_speed=h;this.setLevelVariables=function(){this.level_rock_max_speed_adjust=this.level*.25;if(this.level_rock_max_speed_adjust>3)this.level_rock_max_speed_adjust=3;this.level_saucer_max=1+Math.floor(this.level/10);if(this.level_saucer_max>5)this.level_saucer_max=5;this.level_saucer_occurence_rate=10+3*this.level;if(this.level_saucer_occurence_rate>35)this.level_saucer_occurence_rate=35;this.level_saucer_speed=1+.5*this.level;if(this.level_saucer_speed>5)this.level_saucer_speed=5;this.level_saucer_fire_delay=120-10*this.level;if(this.level_saucer_fire_delay<20)this.level_saucer_fire_delay=20;this.level_saucer_fire_rate=20+3*this.level;if(this.level_saucer_fire_rate>50)this.level_saucer_fire_rate=50;this.level_saucer_missile_speed=1+.2*this.level;if(this.level_saucer_missile_speed>4)this.level_saucer_missile_speed=4};this.setLevelVariables()}function Particle(a,b,c,d,e){Debugger.log("Particle");a===undefined?this.x=0:this.x=a;b===undefined?this.y=0:this.y=b;c===undefined?this.dx=0:this.dx=c;d===undefined?this.dy=0:this.dy=d;e===undefined?this.life=Math.floor(Math.random()*30+30):this.life=e}function Player(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function s(a){Debugger.log("drawship");a.strokeStyle="#ffffff";a.beginPath();a.moveTo(-10,-10);a.lineTo(10,0);a.moveTo(10,1);a.lineTo(-10,10);a.lineTo(1,1);a.moveTo(1,-1);a.lineTo(-10,-10);a.stroke();a.closePath()}function r(a){Debugger.log("drawthrustedship");a.strokeStyle="#ffffff";a.fillStyle="#e67030";a.beginPath();a.moveTo(-10,-10);a.lineTo(10,0);a.moveTo(10,1);a.lineTo(-10,10);a.lineTo(1,1);a.moveTo(1,-1);a.lineTo(-10,-10);a.fillRect(-9,-1,6,2);a.stroke();a.closePath()}Debugger.log("Player");a===undefined?this.x=0:this.x=a;b===undefined?this.y=0:this.y=b;c===undefined?this.width=0:this.width=c;d===undefined?this.height=0:this.height=d;e===undefined?this.scale=1:this.scale=e;f===undefined?this.facingX=0:this.facingX=f;g===undefined?this.facingY=0:this.facingY=g;h===undefined?this.movingX=0:this.movingX=h;i===undefined?this.movingY=0:this.movingY=i;j===undefined?this.rotation=0:this.rotation=j;k===undefined?this.rotationVelocity=5:this.rotationVelocity=k;l===undefined?this.maxVelocity=2:this.maxVelocity=l;m===undefined?this.thrustAcceleration=.05:this.thrustAcceleration=m;n===undefined?this.missileFrameDelay=5:this.missileFrameDelay=n;o===undefined?this.thrust=false:this.thrust=o;p===undefined?this.friction=.001:this.friction=p;q===undefined?this.missileFrameCount=0:this.missileFrameCount=q;this.aPlayerMissiles=[];this.updatePlayer=function(a,b,c,d){this.missileFrameCount+=1;this.x+=this.movingX;this.y+=this.movingY;if(this.x>b)this.x=-this.width;else if(this.x<-this.width)this.x=b;if(this.y>d)this.y=-this.height;else if(this.y<-this.height)this.y=d};this.updatePlayerMissiles=function(a,b,c,d){var e={};var f=this.aPlayerMissiles.length-1;for(iplayerMissileCtr=f;iplayerMissileCtr>=0;iplayerMissileCtr--){e=this.aPlayerMissiles[iplayerMissileCtr];e.x+=e.dx;e.y+=e.dy;if(e.x>b)e.x=-e.width;else if(e.x<-e.width)e.x=b;if(e.y>d)e.y=-e.height;else if(e.y<-e.height)e.y=d;e.lifeCtr++;if(e.lifeCtr>e.life){this.aPlayerMissiles.splice(iplayerMissileCtr,1);e=null}}};this.renderPlayer=function(a){var b=angleToRadians(this.rotation);a.save();a.setTransform(1,0,0,1,0,0);a.translate(this.x+this.halfWidth,this.y+this.halfHeight);a.rotate(b);a.scale(this.scale,this.scale);this.thrust==true&&this.scale==1?r(a):s(a);a.restore()};this.renderPlayerMissiles=function(a){var b={};var c=this.aPlayerMissiles.length-1;for(iplayerMissileCtr=c;iplayerMissileCtr>=0;iplayerMissileCtr--){b=this.aPlayerMissiles[iplayerMissileCtr];a.save();a.setTransform(1,0,0,1,0,0);a.translate(b.x+1,b.y+1);a.strokeStyle="#e67030";a.fillStyle="#e67030";a.beginPath();a.fillRect(-1.5,-1.5,3,3);a.closePath();a.restore()}}}function Rock(a,b,c,d,e,f,g,h){Debugger.log("Rock");b===undefined?this.x=0:this.x=b;c===undefined?this.y=0:this.y=c;d===undefined?this.dx=0:this.dx=d;e===undefined?this.dy=0:this.dy=e;f===undefined?this.rotation=0:this.rotation=f;g===undefined?this.rotationInc=0:this.rotationInc=g;h===undefined?this.scoreValue=0:this.scoreValue=h;a===undefined?this.scale=0:this.scale=a;this.scale<1||this.scale>3?this.scale=1:this.scale=a;switch(this.scale){case 1:this.width=50;this.height=50;break;case 2:this.width=25;this.height=25;break;case 3:this.width=16;this.height=16;break;default:break}this.halfWidth=this.width*.5;this.halfHeight=this.height*.5}function Saucer(a,b,c,d,e,f,g,h,i,j,k){function l(a){Debugger.log("drawSaucer");a.strokeStyle="#8c68e7";a.beginPath();a.moveTo(4,0);a.lineTo(9,0);a.lineTo(12,3);a.lineTo(13,3);a.moveTo(13,4);a.lineTo(10,7);a.lineTo(3,7);a.lineTo(1,5);a.lineTo(12,5);a.moveTo(0,4);a.lineTo(0,3);a.lineTo(13,3);a.moveTo(5,1);a.lineTo(5,2);a.moveTo(8,1);a.lineTo(8,2);a.moveTo(2,2);a.lineTo(4,0);a.stroke();a.closePath()}Debugger.log("Saucer");a===undefined?this.x=0:this.x=a;b===undefined?this.y=0:this.y=b;c===undefined?this.dx=0:this.dx=c;d===undefined?this.dy=0:this.dy=d;e===undefined?this.width=0:this.width=e;f===undefined?this.height=0:this.height=f;g===undefined?this.scoreValue=0:this.scoreValue=g;h===undefined?this.fireRate=0:this.fireRate=h;i===undefined?this.fireDelay=0:this.fireDelay=i;j===undefined?this.fireDelayCount=0:this.fireDelayCount=j;k===undefined?this.missileSpeed=0:this.missileSpeed=k;this.halfWidth=e*.5;this.halfHeight=f*.5;this.aSoucerMissiles=[];this.updateSaucer=function(a,b,c,d,e,f){this.fireDelayCount++;if(Math.floor(Math.random()*100)<=this.fireRate&&this.fireDelayCount>this.fireDelay){this.fireSaucerMissile(e,f);this.fireDelayCount=0}var g=false;this.x+=this.dx;this.y+=this.dy;if(this.dx>0&&this.x>b){g=true}else if(this.dx<0&&this.x<a-this.width){g=true}if(this.y>d||this.y<c-this.width){this.dy*=-1}return g};this.updateSaucerMissiles=function(a,b){var c={};var d=this.aSoucerMissiles.length-1;for(saucerMissileCtr=d;saucerMissileCtr>=0;saucerMissileCtr--){c=this.aSoucerMissiles[saucerMissileCtr];c.x+=c.dx;c.y+=c.dy;if(c.x>a)c.x=-c.width;else if(c.x<-c.width)c.x=a;if(c.y>b)c.y=-c.height;else if(c.y<-c.height)c.y=b;c.lifeCtr++;if(c.lifeCtr>c.life){this.aSoucerMissiles.splice(saucerMissileCtr,1);c=null}}};this.renderSaucer=function(a){a.save();a.setTransform(1,0,0,1,0,0);a.translate(this.x,this.y);l(a);a.restore()};this.renderSaucerMissiles=function(a){var b={};var c=this.aSoucerMissiles.length-1;for(saucerMissileCtr=c;saucerMissileCtr>=0;saucerMissileCtr--){b=this.aSoucerMissiles[saucerMissileCtr];a.save();a.setTransform(1,0,0,1,0,0);a.translate(b.x+1,b.y+1);a.strokeStyle="#FF0000";a.fillStyle="#FF0000";a.beginPath();a.fillRect(-1.5,-1.5,3,3);a.closePath();a.restore()}};this.fireSaucerMissile=function(a,b){var c={};c.x=this.x;c.y=this.y;c.width=2;c.height=2;c.speed=this.missileSpeed;var d=a-this.x;var e=b-this.y;var f=Math.atan2(e,d);var g=360*f/(2*Math.PI);c.dx=this.missileSpeed*Math.cos(angleToRadians(g));c.dy=this.missileSpeed*Math.sin(angleToRadians(g));c.life=160;c.lifeCtr=0;this.aSoucerMissiles.push(c)}}Saucer.prototype.update=function(a,b,c,d,e,f){var g=this.updateSaucer(a,b,c,d,e,f);this.updateSaucerMissiles(b,d);return g};Saucer.prototype.render=function(a){this.renderSaucer(a);this.renderSaucerMissiles(a)};Rock.prototype.update=function(a,b,c,d){this.x+=this.dx;this.y+=this.dy;this.rotation+=this.rotationInc;if(this.x>b)this.x=-this.width;else if(this.x<-this.width)this.x=b;if(this.y>d)this.y=-this.height;else if(this.y<-this.height)this.y=d};Rock.prototype.draw=function(a){var b=angleToRadians(this.rotation);a.save();a.setTransform(1,0,0,1,0,0);a.translate(this.x+this.halfWidth,this.y+this.halfHeight);a.rotate(b);a.strokeStyle="#FFFFFF";a.beginPath();a.moveTo(-(this.halfWidth-1),-(this.halfHeight-1));a.lineTo(this.halfWidth-1,-(this.halfHeight-1));a.lineTo(this.halfWidth-1,this.halfHeight-1);a.lineTo(-(this.halfWidth-1),this.halfHeight-1);a.lineTo(-(this.halfWidth-1),-(this.halfHeight-1));a.stroke();a.closePath();a.restore()};Player.prototype.update=function(a,b,c,d){this.updatePlayer(a,b,c,d);this.updatePlayerMissiles(a,b,c,d)};Player.prototype.render=function(a){this.renderPlayer(a);this.renderPlayerMissiles(a)};Player.prototype.firePlayerMissile=function(){var a={};a.dx=5*Math.cos(Math.PI*this.rotation/180);a.dy=5*Math.sin(Math.PI*this.rotation/180);a.x=this.x+this.halfWidth;a.y=this.y+this.halfHeight;a.life=80;a.lifeCtr=0;a.width=2;a.height=2;this.aPlayerMissiles.push(a)};Player.prototype.resetPlayer=function(a,b){this.rotation=270;this.aPlayerMissiles=[];this.x=.5*a;this.y=.5*b;this.thrust=false;this.facingX=0;this.facingY=0;this.movingX=0;this.movingY=0;this.alpha=0;this.missileFrameCount=0};Particle.prototype.update=function(a,b,c,d){var e=false;this.x+=this.dx;this.y+=this.dy;this.lifeCtr+=1;try{if(this.lifeCtr>this.life){e=true}else if(this.x>b||this.x<a||this.y>d||this.y<c){e=true}}catch(f){Debugger.log("Error in particle");Debugger.log("particle: "+f)}return e};Particle.prototype.render=function(a){a.save();a.setTransform(1,0,0,1,0,0);a.translate(this.x,this.y);a.strokeStyle="#cb6b6b";a.lineWidth=2;a.beginPath();a.moveTo(0,0);a.lineTo(1,1);a.stroke();a.closePath();a.restore()};Level.prototype.up=function(){this.level+=1;this.setLevelVariables()};Level.prototype.reset=function(){this.level=0;this.setLevelVariables()}