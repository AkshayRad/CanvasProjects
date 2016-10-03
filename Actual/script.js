//Alert error message
window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};
//Creating canvas element
var gameScreen = document.createElement("canvas");
var ctx = gameScreen.getContext("2d");
var player1Score = 0;
var player2Score = 0;
var player1Length = 5;
var player2Length = 5;
//Styling gameScreen
gameScreen.style.position = "absolute";
gameScreen.style.left = 0;
gameScreen.style.top = 0;
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.width = window.innerWidth + "px";
gameScreen.style.height = window.innerHeight + "px";
gameScreen.style.backgroundColor = "white";
document.body.appendChild(gameScreen);
//Draw player1   
var player1 = {
    xPos: gameScreen.width / 3,
    yPos: gameScreen.height / 2,
    width: 5,
    height: 5,
    dx: 0,
    dy: 0,
    goUp: false,
    goDown: false,
    goLeft: false,
    goRight: false,
    dirX: -1,
    dirY: 0,
    draw: function() {
        ctx.fillStyle = "#2B46A5";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        for(var item of player1Pos) {
            ctx.fillRect(item[0], item[1], this.width, this.height);
        }
    },
    move: function() {
        //If player 1 collides with cells    
        for(i = 0; i < cells.length; i++) {
            if(this.xPos < cells[i].xPos + cells[i].width && this.xPos + this.width > cells[i].xPos && this.yPos < cells[i].yPos + cells[i].width && this.yPos + this.width > cells[i].yPos) {
                player1Length += 10;
                cells = [];
                break;
            }
        }
        //Player 2 collides with cells        
        for(i = 0; i < cells.length; i++) {
            if(player2.xPos < cells[i].xPos + cells[i].width && player2.xPos + player2.width > cells[i].xPos && player2.yPos < cells[i].yPos + cells[i].width && player2.yPos + player2.width > cells[i].yPos) {
                player2Length += 10;
                cells = [];
                break;
            }
        }
        var up = 0;
        var right = 0;
        if(this.goUp || this.goDown || this.goLeft || this.goRight) {
            if(this.goUp) up--;
            if(this.goDown) up++;
            if(this.goLeft) right--;
            if(this.goRight) right++;
            this.dirY = up;
            this.dirX = right;
        } else {
            up = this.dirY;
            right = this.dirX;
        }
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
        if(this.xPos < 0) this.xPos = gameScreen.width;
        if(this.xPos > gameScreen.width) this.xPos = 0;
        if(this.yPos < 0) this.yPos = gameScreen.height;
        if(this.yPos > gameScreen.height) this.yPos = 0;
    },
}
var player2 = {
    xPos: gameScreen.width / 3 * 2,
    yPos: gameScreen.height / 2,
    width: 5,
    height: 5,
    dx: 0,
    dy: 0,
    goUp: false,
    goDown: false,
    goLeft: false,
    goRight: false,
    dirX: -1,
    dirY: 0,
    draw: function() {
        ctx.fillStyle = "darkred";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        for(item of player2Pos) {
            ctx.fillRect(item[0], item[1], this.width, this.height);
        }
    },
    move: function() {
        var up = 0;
        var right = 0;
        if(this.goUp || this.goDown || this.goLeft || this.goRight) {
            if(this.goUp) up--;
            if(this.goDown) up++;
            if(this.goLeft) right--;
            if(this.goRight) right++;
            this.dirY = up;
            this.dirX = right;
        } else {
            up = this.dirY;
            right = this.dirX;
        }
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
        if(this.xPos < 0) this.xPos = gameScreen.width;
        if(this.xPos > gameScreen.width) this.xPos = 0;
        if(this.yPos < 0) this.yPos = gameScreen.height;
        if(this.yPos > gameScreen.height) this.yPos = 0;
    },
}
var player1Pos = [];
var player2Pos = [];

function Cell() {
    this.width = 20;
    this.height = 20;
    this.xPos = Math.random() * gameScreen.width;
    this.yPos = Math.random() * gameScreen.height;
    this.draw = function() {
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
    }
}
var cells = [];
//Keydown function
document.addEventListener("keydown", function(e) {
    if(e.keyCode === 38) {
        player2.goUp = true;
    }
    else if(e.keyCode === 40) {
        player2.goDown = true;
    }
    else if(e.keyCode === 37) {
        player2.goLeft = true;
    }
    else if(e.keyCode === 39) {
        player2.goRight = true;
    }
    if(e.keyCode === 87) {
        player1.goUp = true;
    }
    else if(e.keyCode === 83) {
        player1.goDown = true;
    }
    else if(e.keyCode === 65) {
        player1.goLeft = true;
    }
    else if(e.keyCode === 68) {
        player1.goRight = true;
    }
})
//Keyup function
document.addEventListener("keyup", function(e) {
    if(e.keyCode === 38) {
        player2.goUp = false;
    }
    else if(e.keyCode === 40) {
        player2.goDown = false;
    }
    else if(e.keyCode === 37) {
        player2.goLeft = false;
    }
    else if(e.keyCode === 39) {
        player2.goRight = false;
    }
    if(e.keyCode === 87) {
        player1.goUp = false;
    }
    else if(e.keyCode === 83) {
        player1.goDown = false;
    }
    else if(e.keyCode === 65) {
        player1.goLeft = false;
    }
    else if(e.keyCode === 68) {
        player1.goRight = false;
    }
})

function gameLoop() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    player1.draw();
    player1.move();
    player2.draw();
    player2.move();
    ctx.beginPath();
    //text
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("snake game", 10, 20);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("player 1 length: " + player1Length, 1255, 20);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("player 2 length: " + player2Length, 1255, 35);
    for(i = 0; i < cells.length; i++) {
        cells[i].draw();
    }
    ctx.fillStyle = "black";
    ctx.fill();
    if(cells.length > 0) {} else {
        cells.push(new Cell());
    }
    if(player1.dx !== 0 || player1.dy !== 0) player1Pos.unshift([player1.xPos, player1.yPos]);
    if(player2.dx !== 0 || player2.dy !== 0) player2Pos.unshift([player2.xPos, player2.yPos]);
    if(player1Pos.length > player1Length) player1Pos.pop();
    if(player2Pos.length > player2Length) player2Pos.pop();
    //If Player 1 collides with player 2's trail.
    for(i = 0; i < player2Pos.length; i++) {
        if(player1.xPos < player2Pos[i][0] + player2.width && player1.xPos + player1.width > player2Pos[i][0] && player1.yPos < player2Pos[i][1] + player2.width && player1.yPos + player1.width > player2Pos[i][1]) {
            ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
            player1Length-=7;
            player1.xPos = gameScreen.width / 3;
            player1.yPos = gameScreen.height / 2;
            player2.xPos = gameScreen.width / 3 * 2;
            player2.yPos = gameScreen.height / 2;
            player1Pos = [];
            player2Pos = [];
            cells = [];
            break;
        }
    }
    //If Player 2 collides with player 1's trail.
    for(i = 0; i < player1Pos.length; i++) {
        if(player2.xPos < player1Pos[i][0] + player1.width && player2.xPos + player2.width > player1Pos[i][0] && player2.yPos < player1Pos[i][1] + player1.width && player2.yPos + player2.width > player1Pos[i][1]) {
            ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
            player2Length-=7;
            player1.xPos = gameScreen.width / 3;
            player1.yPos = gameScreen.height / 2;
            player2.xPos = gameScreen.width / 3 * 2;
            player2.yPos = gameScreen.height / 2;
            player1Pos = [];
            player2Pos = [];
            cells = [];
            break;
        }
    }
    window.requestAnimationFrame(gameLoop);
}
gameLoop();