window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.style.backgroundColor = "black";
document.body.appendChild(canvas);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var lines = {

  draw: function (){
    ctx.strokeStyle = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
    ctx.arc(canvas.width + 700, canvas.height, 900, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  lines.draw();
  ctx.rotate(3);
    
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
