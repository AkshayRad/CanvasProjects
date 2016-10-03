//error finder
window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};
//creating and styling the canvas
var canvas = document.createElement("canvas");
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
var time = 0;
var spaceship = {
    xPos: 0,
    yPos: canvas.height / 2,
    width: 7,
    height: 7,
    dx: 0,
    dy: 0,
    draw: function() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    },
    update: function() {
        var up = 0;
        var right = 0;
        if(this.goUp && this.yPos > canvas.height / 3 - 183) up--;
        if(this.goDown && this.yPos < canvas.height - this.height) up++;
        if(this.goLeft && this.xPos > 13) right--;
        if(this.goRight && this.xPos < canvas.width - this.width) right++;
        if(!(up == 0 && right == 0)) {
            var acel = 1;
            var angle_acel = Math.atan2(up, right);
            this.dx += Math.cos(angle_acel) * acel;
            this.dy += Math.sin(angle_acel) * acel;
        }
        this.xPos += this.dx;
        this.yPos += this.dy;
        var angle = Math.atan2(this.dy, this.dx);
        var vel = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        vel *= 0.8;
        if(vel < 0.1) vel = 0;
        this.dx = Math.cos(angle) * vel;
        this.dy = Math.sin(angle) * vel;
        for(i = 0; i < missles.length; i++) {
            if(this.xPos < missles[i].xPos + missles[i].width && this.xPos + this.width > missles[i].xPos && this.yPos < missles[i].yPos + missles[i].height && this.yPos + this.height > missles[i].yPos) {
                this.xPos = 0;
                this.yPos = canvas.height / 2;
                time = 0;
                missles = [];
                missleslarge = [];
                bullets = [];
                bbs = [];
                falling = [];
                break;
            }
        }
        for(i = 0; i < bbs.length; i++) {
            if(this.xPos < bbs[i].xPos + bbs[i].width && this.xPos + this.width > bbs[i].xPos && this.yPos < bbs[i].yPos + bbs[i].height && this.yPos + this.height > bbs[i].yPos) {
                this.xPos = 0;
                this.yPos = canvas.height / 2;
                this.yPos = canvas.height / 2;
                missles = [];
                missleslarge = [];
                bullets = [];
                bbs = [];
                falling = [];
                time = 0;
                break;
            }
        }
        for(i = 0; i < missleslarge.length; i++) {
            if(this.xPos < missleslarge[i].xPos + missleslarge[i].width && this.xPos + this.width > missleslarge[i].xPos && this.yPos < missleslarge[i].yPos + missleslarge[i].height && this.yPos + this.height > missleslarge[i].yPos) {
                this.xPos = 0;
                this.yPos = canvas.height / 2;
                missles = [];
                missleslarge = [];
                bullets = [];
                falling = [];
                bbs = [];
                time = 0;
                break;
            }
        }
        for(i = 0; i < bullets.length; i++) {
            if(this.xPos < bullets[i].xPos + bullets[i].width && this.xPos + this.width > bullets[i].xPos && this.yPos < bullets[i].yPos + bullets[i].height && this.yPos + this.height > bullets[i].yPos) {
                this.xPos = 0;
                this.yPos = canvas.height / 2;
                missles = [];
                missleslarge = [];
                bullets = [];
                falling = [];
                bbs = [];
                break;
            }
        }
        for(i = 0; i < falling.length; i++) {
            if(this.xPos < falling[i].xPos + falling[i].width && this.xPos + this.width > falling[i].xPos && this.yPos < falling[i].yPos + falling[i].height && this.yPos + this.height > falling[i].yPos) {
                this.xPos = 0;
                this.yPos = canvas.height / 2;
                missles = [];
                missleslarge = [];
                bullets = [];
                falling = [];
                bbs = [];
                break;
            }
        }
    },
}
//YELLOW MISSLES

    function missle() {
        this.width = 5;
        this.height = 5;
        this.xPos = canvas.width - 5;
        this.yPos = Math.random() * canvas.width;
        this.remove = false;
        this.update = function() {
            this.xPos -= 5;
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        }
    }

var missles = [];

function BB() {
    this.width = 5;
    this.height = 5;
    this.xPos = 0;
    this.yPos = Math.random() * canvas.width;
    this.update = function() {
        this.xPos += 5;
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
var bbs = [];

function Fall() {
    this.width = 5;
    this.height = 5;
    this.xPos = Math.random() * canvas.width;
    this.yPos = 0;
    this.update = function() {
        this.yPos++;
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
var falling = [];
//ORANGE MISSLES

function misslelarge() {
    this.width = 5;
    this.height = 5;
    this.xPos = canvas.width - 5;
    this.yPos = Math.random() * canvas.width;
    this.update = function() {
        this.xPos -= 9;
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
var missleslarge = [];

function Bullet() {
    this.width = 5;
    this.height = 2;
    this.xPos = canvas.width - 5;
    this.yPos = Math.random() * canvas.width;
    this.update = function() {
        this.xPos -= 20;
        this.width += 15;
        ctx.beginPath();
        ctx.fillStyle = "#F024BF";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
var bullets = [];
document.addEventListener("keydown", function(evt) {
    //Clear board (-)
    if(evt.keyCode === 82) {
        spaceship.xPos = 0;
        spaceship.yPos = canvas.height / 2;
    }
    //Arrow Keys
    if(evt.keyCode === 37) {
        spaceship.goLeft = true;
    }
    if(evt.keyCode === 38) {
        spaceship.goUp = true;
    }
    if(evt.keyCode === 39) {
        spaceship.goRight = true;
    }
    if(evt.keyCode === 40) {
        spaceship.goDown = true;
    }
})
document.addEventListener("keyup", function(evt) {
    //Arrow Keys    
    if(evt.keyCode === 37) {
        spaceship.goLeft = false;
    }
    if(evt.keyCode === 38) {
        spaceship.goUp = false;
    }
    if(evt.keyCode === 39) {
        spaceship.goRight = false;
    }
    if(evt.keyCode === 40) {
        spaceship.goDown = false;
    }
})

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    spaceship.update();
    spaceship.draw();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + (time++), 10, 50);
    if(Math.random() > 0) missles.push(new missle());
    for(i = 0; i < missles.length; i++) {
        missles[i].update();
    }
    if(spaceship.xPos > 400) {
        if(Math.random() > 0.93) bbs.push(new BB());
        for(i = 0; i < bbs.length; i++) {
            bbs[i].update();
        }
    }
    if(spaceship.xPos > 1248) {
        alert("Congrats! Your time: " + (time/60) + " seconds.");
        spaceship.xPos = 0;
        spaceship.yPos = canvas.height / 2;
        }
        if(Math.random() > 0.93) missleslarge.push(new misslelarge());
        for(i = 0; i < missleslarge.length; i++) {
            missleslarge[i].update();
        }
        if(Math.random() > 0.99) bullets.push(new Bullet());
        for(i = 0; i < bullets.length; i++) {
            bullets[i].update();
        }
        if(Math.random() > 0.99) falling.push(new Fall());
        for(i = 0; i < falling.length; i++) {
            falling[i].update();
        }
        //FINISH LINE AREA,
        ctx.fillStyle = "white"; ctx.fillRect(1250, 0, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 20, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 40, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 60, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 80, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 100, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 120, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 140, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 160, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 180, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 200, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 220, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 240, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 260, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 280, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 300, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 320, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 340, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 360, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 380, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 400, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 420, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 440, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 460, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 480, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 500, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 520, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 540, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 560, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 580, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 600, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 620, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 640, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 660, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 680, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 700, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 720, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 740, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 760, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 780, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1250, 800, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1250, 820, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 0, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 20, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 40, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 60, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 80, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 100, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 120, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 140, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 160, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 180, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 200, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 220, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 240, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 260, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 280, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 300, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 320, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 340, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 360, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 380, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 400, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 420, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 440, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 460, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 480, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 500, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 520, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 540, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 560, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 580, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 600, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 620, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 640, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 660, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 680, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 700, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 720, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 740, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 760, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 780, 20, 20); ctx.fillStyle = "#969BA0"; ctx.fillRect(1270, 800, 20, 20); ctx.fillStyle = "white"; ctx.fillRect(1270, 820, 20, 20); window.requestAnimationFrame(gameLoop);
    }
    gameLoop();