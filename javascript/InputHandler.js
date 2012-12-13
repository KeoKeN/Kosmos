var mouseisDown = false;
var mousePos;

var bubble = new Audio("audio/bubble.wav");

this.getMousePos = function(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
};

window.addEventListener('mousedown', function(evt) {
	mouseisDown = true;
	bubble.play();
	mousePos = this.getMousePos(canvas, evt);
}, false);

window.addEventListener('mouseup', function(evt){
	mouseisDown = false;
}, false);
