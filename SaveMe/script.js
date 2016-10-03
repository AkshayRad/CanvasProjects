window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var cooldown = 0;
canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.style.backgroundColor = "white";
document.body.appendChild(canvas);

var player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 12,
    height: 12,
    dx:0,
    dy:0,    
    draw: function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move: function() {
        var up = 0;
        var right = 0;
        if(this.goUp && this.y > 0)up--;
        if(this.goDown && this.y < canvas.height - this.height)up++;
        if(this.goLeft && this.x > 0)right--;
        if(this.goRight && this.x < canvas.width - this.width)right++;
        
        if(!(up == 0 && right == 0)){
            var acel = 1;
            var angle_acel = Math.atan2(up,right);
            this.dx+=Math.cos(angle_acel)*acel;
            this.dy+=Math.sin(angle_acel)*acel;    
        }
        
        this.x+=this.dx;
        this.y+=this.dy;
        
        var angle = Math.atan2(this.dy,this.dx);
        var vel = Math.sqrt(this.dx*this.dx+this.dy*this.dy);
        vel*=0.8;
        if(vel < 0.1)vel = 0;
        this.dx = Math.cos(angle)*vel;
        this.dy = Math.sin(angle)*vel;
    },
}

function leftArrow() {
    this.x = - 25 * Math.random() - Math.random() * 300;
    this.y = Math.random()*canvas.height;
    this.height = 20;
    this.width = 60;
    
    this.update = function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.x +=3;
        
        if(leftarrows[i].x > canvas.width) {
            leftarrows.push(new leftArrow());
        }
        
    }
}

var leftarrows = [];
for(i = 0; i < 6; i++) {
    leftarrows.push(new leftArrow());
}

document.addEventListener("keydown", function(e){
    if(e.keyCode === 38) {
        player.goUp = true;
    }
    if(e.keyCode === 40) {
        player.goDown = true;
    }
    if(e.keyCode === 37) {
        player.goLeft = true;
    }
    if(e.keyCode === 39) {
        player.goRight = true;
    }    
})

document.addEventListener("keyup", function(e){
    if(e.keyCode === 38) {
        player.goUp = false;
    }
    if(e.keyCode === 40) {
        player.goDown = false;
    }
    if(e.keyCode === 37) {
        player.goLeft = false;
    }
    if(e.keyCode === 39) {
        player.goRight = false;
    }    
})

function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.move();
    player.draw();
    

    for(i = 0; i < leftarrows.length; i++) {
        leftarrows[i].update();
    }
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();