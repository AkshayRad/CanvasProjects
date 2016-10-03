var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.style.backgroundColor = "white";
document.body.appendChild(canvas);


var putPoint = function(e) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.lineWidth = radius * 2;        
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, 2 * Math.PI);    
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
}


canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);