function Player()
{
	this.posX = 500;
	this.posY = 500;
	this.size = 50;
	
	this.moving = false;
	this.velocityX = 0;
	this.velocityY = 0;
	this.vect = 0;
	
	this.distX = 0;
	this.distY = 0;
	this.speed = 3;
	this.friction = 0.99;
	this.isAlive = true;
	
	this.colour = 'rgb(146,192,0)';

	this.draw = function()
	{
		if(this.isAlive)
		{
			context.fillStyle = this.colour;
			context.beginPath();
			context.arc(this.posX, this.posY, this.size, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		}
	};
	
	this.updateSize = function()
	{
		if(this.moving && mouseisDown)
		{
			this.size -=0.1;
		}
		if(this.size <= 0)
		{
			this.isAlive = false;
		}
	};
	
	this.updatePosition = function()
	{	
		if(mouseisDown)
		{
			this.distX = this.posX - mousePos.x;
			this.distY = this.posY - mousePos.y;

			this.vect = Math.sqrt((this.distX * this.distX) + (this.distY * this.distY));
			this.velocityX = this.distX / this.vect * this.speed;
			this.velocityY = this.distY / this.vect * this.speed;
			this.moving = true;
			
		}
		
		else
		{
			this.velocityX *= this.friction;
			this.velocityY *= this.friction;
			if(this.moving)
			{
				if((this.velocityX <= 0.15 && this.velocityX >= -0.15) || (this.velocityY <= 0.15 &&  this.velocityY >= -0.15))
				{
					this.velocityX = 0;
					this.velocityY = 0;
					this.moving = false;
				}
			}
			
			
		}
		
		if(	this.posX - this.size <= 0 && this.velocityX < 0 ||
			this.posX + this.size >= canvas.width && this.velocityX > 0)
		{
			this.velocityX = -this.velocityX;
		}
		
		if(	this.posY - this.size <= 0 && this.velocityY < 0 ||
			this.posY + this.size >= canvas.height && this.velocityY > 0)
		{
			this.velocityY = -this.velocityY;
		}
		
		
		this.posX += this.velocityX;
		this.posY += this.velocityY;
	};
	
	this.update = function()
	{
		this.updateSize();
		this.updatePosition();
		this.updateSize();
		this.draw();
	};
}