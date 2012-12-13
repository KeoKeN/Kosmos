function Ball()
{
	this.posX =  Math.random()*canvas.width;
    this.posY = Math.random()*canvas.height;
	
    this.size = Math.random()*20+20;
	
	this.velocityX = Math.random() * 1.1 - 0.5;
	this.velocityY = Math.random() * 1.1 - 0.5;
	
	this.colour;
	
	this.isAlive = true;

	this.draw = function()
	{
		this.updateSize();
		
		if(this.isAlive)
		{
			context.fillStyle = this.colour;
			context.beginPath();
			context.arc(this.posX,this.posY, this.size, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		}
		this.updateVelocity();
		
	};
	this.updateSize = function()
	{
		if(this.size <= 0)
		{
			this.isAlive = false;
		}
	};
	
	this.updateVelocity = function()
	{
		if(this.posX + this.size > canvas.width || this.posX - this.size < 0)
		{
			this.velocityX *= -1;
		}
		if(this.posY + this.size > canvas.height || this.posY - this.size < 0)
		{
			this.velocityY *= -1;
		}
		this.posX += this.velocityX;
		this.posY += this.velocityY;
	};
}