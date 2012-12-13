var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var player = new Player();

var ball;
var growSpeed = 0.1;
var shrinkSpeed = 0.2;
var MAXIMUM_BALLS = 25;

var bg = new Audio("audio/aquarium.wav");
bg.play();

var ballArray = new Array();

for(var i = 0; i < MAXIMUM_BALLS; i++)
{
	ball = new Ball();
	ballArray.push(ball);
}

window.requestAnimFrame = (function(){
 	return    	window.requestAnimationFrame       || 
     			window.webkitRequestAnimationFrame || 
     			window.mozRequestAnimationFrame    || 
     			window.oRequestAnimationFrame      || 
     			window.msRequestAnimationFrame     || 
 		
		function(callback){
  			window.setTimeout(callback, 60);
 			};
		})();

this.update = function()
{
	
	context.clearRect(0,0, canvas.width, canvas.height);
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(0,0,canvas.width,canvas.height);
	player.update();
	this.checkCollision();
	for(var i = 0; i < ballArray.length; i++){
		
		if(ballArray[i].size < player.size)
			{
				ballArray[i].colour = 'rgb(89,132,189)'; //blue
			}
		else
			ballArray[i].colour = 'rgb(255, 102, 102)'; //red
		ballArray[i].draw();
	}

};

//checks collision with the player

this.checkCollision = function()
{
	for(var i = 0; i < ballArray.length; i++)
	{
		if(ballArray[i].isAlive)
		{
			var distX = ballArray[i].posX - player.posX;
			var distY = ballArray[i].posY - player.posY;
			var distance = Math.sqrt(distX * distX + distY * distY);
			if(player.isAlive)
			{
				if(distance - ballArray[i].size < player.size)
				{
					if(ballArray[i].size < player.size)
					{
						ballArray[i].size -= shrinkSpeed;
						player.size += growSpeed;
					}
					else
					{
						ballArray[i].size += growSpeed;
						player.size -= shrinkSpeed;
					}
				}
			}
			
			// collision detection between balls
			for (var j = 0; j < ballArray.length; j++)
			{
				if(i != j)
				{
					if(ballArray[j].isAlive)
					{
						var dX = ballArray[i].posX - ballArray[j].posX;
						var dY = ballArray[i].posY - ballArray[j].posY;
						
						var dist = Math.sqrt(dX * dX + dY * dY);
						
						if(dist - ballArray[i].size < ballArray[j].size)
						{
							if(ballArray[i].size < ballArray[j].size)
							{
								ballArray[i].size -= shrinkSpeed;
								ballArray[j].size += growSpeed;
							}
							else
							{
								ballArray[j].size -= shrinkSpeed;
								ballArray[i].size += growSpeed;
							}
						}
					}
				}
			}
		}
	}
};

(function animloop(){
 	requestAnimFrame(animloop);
	update();
	})();





