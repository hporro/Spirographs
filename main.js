function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var canvas_front = document.getElementById("canvas_front"),
		context_front = canvas_front.getContext("2d");

	var canvas_back = document.getElementById("canvas_back"),
		context_back = canvas_back.getContext("2d");

	var angular_vel = 0.04,
		t1 = 0,
		t2 = 0;

	var C0 = {
		center: vector.create(width/2,height/2),
		radius: 300,
	};
	var r = 80;
	var Ci = {
		radius: r,
		center: vector.create(width/2+C0.radius-r,height/2),
	};
	var T = {
		pos: vector.create(width/2+C0.radius,height/2),
		color: "#7f00e0",
	}
	var B = {
		dist_from_Ci_center: 69,
		pos: vector.create(0,0),
		color: "#00e000",
	}

	B.pos.setX(Ci.center.getX()+B.dist_from_Ci_center*Math.cos(t2));
	B.pos.setY(Ci.center.getY()-B.dist_from_Ci_center*Math.sin(t2));

	context_back.strokeStyle = 'black';
	context_back.beginPath();
	context_back.arc(C0.center.getX(),C0.center.getY(),C0.radius,0,Math.PI*2,false);
	context_back.stroke();

	context_back.strokeStyle = 'grey';
	context_back.beginPath();
	//context_back.arc(C0.center.getX(),C0.center.getY(),C0.radius-Ci.radius,0,Math.PI*2,false);
	context_back.stroke();

	render();

	var timer = 101;

	function render() {

		context_front.clearRect(0,0,width,height);

		timer += 1;
		if(timer>100){
			B.color = getRndColor();
			timer = 0;
		}

		t1 += angular_vel;
		t2 = (C0.radius-Ci.radius)*t1/Ci.radius;

		Ci.center.setX(width/2+(C0.radius-Ci.radius)*Math.cos(t1));
		Ci.center.setY(height/2+(C0.radius-Ci.radius)*Math.sin(t1));

		context_front.strokeStyle = 'black';
		context_front.beginPath();
		context_front.arc(Ci.center.getX(),Ci.center.getY(),Ci.radius,0,Math.PI*2,false);
		context_front.stroke();

		context.strokeStyle = B.color;
		context.beginPath();
		context.moveTo(B.pos.getX(),B.pos.getY());
		B.pos.setX(Ci.center.getX()+B.dist_from_Ci_center*Math.cos(t2));
		B.pos.setY(Ci.center.getY()-B.dist_from_Ci_center*Math.sin(t2));
		context.lineTo(B.pos.getX(),B.pos.getY());
		context.stroke();

		context_front.fillStyle = 'black';
		context_front.beginPath();
		context_front.arc(B.pos.getX(),B.pos.getY(),2,0,Math.PI*2,false);
		context_front.fill();

		context_front.fillStyle = 'black';
		context_front.beginPath();
		context_front.arc(Ci.center.getX(),Ci.center.getY(),2,0,Math.PI*2,false);
		context_front.fill();

		context_front.strokeStyle = 'red';
		context_front.beginPath();
		context_front.moveTo(Ci.center.getX(),Ci.center.getY());
		context_front.lineTo(B.pos.getX(),B.pos.getY());
		context_front.stroke();

		requestAnimationFrame(render);
	};

};