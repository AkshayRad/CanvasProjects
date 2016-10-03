//Alert error message
window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};

//Creating canvas element
var gameScreen = document.createElement("canvas");
var ctx = gameScreen.getContext("2d");
var player1Score = 0;
var player2Score = 0;
var playerLength = 100;

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
    width: 10,
    height: 10,
    dx:0,
    dy:0,
    goUp: false,
    goDown: false,
    goLeft: false,
    goRight: false,
    
    draw: function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);        
        
        for(var item of player1Pos) {
            ctx.fillRect(item[0], item[1], this.width, this.height);
        }
    },
    
    move: function() {
        //Player 1 collides with player 2's house  
        if(this.xPos < player2house.xPos + player2house.width && this.xPos + this.width > player2house.xPos && this.yPos < player2house.yPos + player2house.height && this.yPos + this.height > player2house.yPos) {
            player1Score+=5;
            player1.xPos = gameScreen.width / 3;
            player1.yPos = gameScreen.height / 2;
            player1Pos = [];
            player2.xPos = gameScreen.width/3*2;
            player2.yPos = gameScreen.height /2;
            player2Pos = [];
            cells = [];
        } 
        
        //Player 1 collides with cells
    for(i = 0; i < cells.length; i++) {
        if(this.xPos < cells[i].xPos + cells[i].width && this.xPos + this.width > cells[i].xPos && this.yPos < cells[i].yPos + cells[i].width && this.yPos + this.width > cells[i].yPos) {
            player1Score++;
            cells = [];
        }        
    }
    //Player 2 collides with cells        
    for(i = 0; i < cells.length; i++) {
        if(player2.xPos < cells[i].xPos + cells[i].width && player2.xPos + player2.width > cells[i].xPos && player2.yPos < cells[i].yPos + cells[i].width && player2.yPos + player2.width > cells[i].yPos) {
            player2Score++;
            cells = [];
        }        
    }        
        
        var up = 0;
        var right = 0;
        if(this.goUp && this.yPos > 28)up--;
        if(this.goDown && this.yPos < gameScreen.height - this.height - 25)up++;
        if(this.goLeft && this.xPos > 25)right--;
        if(this.goRight && this.xPos < gameScreen.width - this.width - 25)right++;
        
        if(!(up == 0 && right == 0)){
            var acel = 1;
            var angle_acel = Math.atan2(up,right);
            this.dx+=Math.cos(angle_acel)*acel;
            this.dy+=Math.sin(angle_acel)*acel;    
        }

        this.xPos+=this.dx;
        this.yPos+=this.dy;
        
        var angle = Math.atan2(this.dy,this.dx);
        var vel = Math.sqrt(this.dx*this.dx+this.dy*this.dy);
        vel*=0.8;
        if(vel < 0.1)vel = 0;
        this.dx = Math.cos(angle)*vel;
        this.dy = Math.sin(angle)*vel;
    },
}

var player1house = {
    xPos: 50,
    yPos: gameScreen.height / 2 - 60,
    width: 20,
    height: 160,
    
    draw: function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    },
}

var player2house = {
    xPos: gameScreen.width - 50,
    yPos: gameScreen.height / 2  - 60,
    width: 20,
    height: 160,
    
    draw: function() {
        ctx.fillStyle = "darkred";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    },   
}

var player2 = {
    xPos: gameScreen.width / 3*2,
    yPos: gameScreen.height / 2,
    width: 10,
    height: 10,
    dx:0,
    dy:0,
    goUp:false,
    goDown:false,
    goLeft:false,
    goRight:false,
    
    draw: function() {
        ctx.fillStyle = "darkred";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        
        for(item of player2Pos) {
            ctx.fillRect(item[0], item[1], this.width, this.height);
        }
    },
    move: function() {
        //Player 2 collides with player1's house.
        if(this.xPos < player1house.xPos + player1house.width && this.xPos + this.width > player1house.xPos && this.yPos < player1house.yPos + player1house.height && this.yPos + this.height > player1house.yPos) {
            player2Score+=5;
            player1.xPos = gameScreen.width / 3;
            player1.yPos = gameScreen.height / 2;
            player1Pos = [];
            player2.xPos = gameScreen.width/3*2;
            player2.yPos = gameScreen.height /2;
            player2Pos = [];
            cells = [];
        } 
                
        var up = 0;
        var right = 0;
        if(this.goUp && this.yPos > 28)up--;
        if(this.goDown && this.yPos < gameScreen.height - this.height - 25)up++;
        if(this.goLeft && this.xPos > 25)right--;
        if(this.goRight && this.xPos < gameScreen.width - this.width - 25)right++;
        
        if(!(up == 0 && right == 0)){
            var acel = 1;
            var angle_acel = Math.atan2(up,right);
            this.dx+=Math.cos(angle_acel)*acel;
            this.dy+=Math.sin(angle_acel)*acel;    
        }

        this.xPos+=this.dx;
        this.yPos+=this.dy;
        
        var angle = Math.atan2(this.dy,this.dx);
        var vel = Math.sqrt(this.dx*this.dx+this.dy*this.dy);
        vel*=0.8;
        if(vel < 0.1)vel = 0;
        this.dx = Math.cos(angle)*vel;
        this.dy = Math.sin(angle)*vel;
    },
}

function Cell() {
    this.width = 10;
    this.height = 10;
    this.xPos = Math.random()*gameScreen.width;
    this.yPos = Math.random()*gameScreen.height;
    
    this.draw = function() {
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
    }        
}
var cells = [];     

var player1Pos = [
    
];

var player2Pos = [
    
];
    

//Keydown function
document.addEventListener("keydown", function(e){
    if(e.keyCode === 38) {
        player2.goUp = true;
    }
    if(e.keyCode === 40) {
        player2.goDown = true;
    }
    if(e.keyCode === 37) {
        player2.goLeft = true;
    }
    if(e.keyCode === 39) {
        player2.goRight = true;
    }
    
    if(e.keyCode === 87) {
        player1.goUp = true;
    }
    if(e.keyCode === 83) {
        player1.goDown = true;
    }
    if(e.keyCode === 65) {
        player1.goLeft = true;
    }
    if(e.keyCode === 68) {
        player1.goRight = true;
    }    
})

//Keyup function
document.addEventListener("keyup", function(e){
    if(e.keyCode === 38) {
        player2.goUp = false;
    }
    if(e.keyCode === 40) {
        player2.goDown = false;
    }
    if(e.keyCode === 37) {
        player2.goLeft = false;
    }
    if(e.keyCode === 39) {
        player2.goRight = false;
    } 
    
    if(e.keyCode === 87) {
        player1.goUp = false;
    }
    if(e.keyCode === 83) {
        player1.goDown = false;
    }
    if(e.keyCode === 65) {
        player1.goLeft = false;
    }
    if(e.keyCode === 68) {
        player1.goRight = false;
    }     
})
    
function gameLoop() {
    ctx.clearRect(0,0,gameScreen.width, gameScreen.height);

    
    player1.draw();
    player1.move();
    player2.draw();
    player2.move();
    player1house.draw();
    player2house.draw();
    ctx.beginPath();
    
    ctx.font = "25px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Player 1 Score: " + player1Score, 10, 40);
    
    
    ctx.font = "25px Verdana";
    ctx.fillStyle = "darkred";
    ctx.fillText("Player 2 Score: " + player2Score, 10, 65);

    ctx.font = "25px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("First one to 20 points wins!", gameScreen.width/2-150, 30);

    ctx.font = "10px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Getting blue specks: +1 point", 1110, 30);
    
    ctx.font = "10px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Invading other player's house: +5 points", 1110, 50);

    ctx.font = "10px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Colliding with other player's trail: -3 points", 1110, 70);
    
    for(i = 0; i < cells.length; i++) {    
        cells[i].draw();
    }
    ctx.fillStyle = "blue";
    ctx.fill();
    
    if(cells.length > 0) {        
    
    } else {
        cells.push(new Cell());   
    }
    
if(player1Score > 19) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText("PLAYER 1 WINS", 300, 200);
}
    
if(player1Score < -19) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText("PLAYER 2 WINS", 300, 200);
}    

if(player2Score < -19) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText("PLAYER 1 WINS", 300, 200);
}        
    
if(player2Score > 19) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText("PLAYER 2 WINS", 300, 200);
}    
       
    
    if(player1.dx !== 0 || player1.dy !== 0)player1Pos.unshift([player1.xPos,player1.yPos]);
    if(player2.dx !== 0 || player2.dy !== 0)player2Pos.unshift([player2.xPos,player2.yPos]);  
        
    if(player1Pos.length > playerLength) player1Pos.pop();
    if(player2Pos.length > playerLength) player2Pos.pop();
        
    for(i = 0; i < player2Pos.length; i++) {    
        if(player1.xPos < player2Pos[i][0] + player2.width && player1.xPos + player1.width > player2Pos[i][0] && player1.yPos < player2Pos[i][1] + player2.width && player1.yPos + player1.width > player2Pos[i][1]) {
            ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
            player1Score-=3;
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
        
    for(i = 0; i < player1Pos.length; i++) {    
        if(player2.xPos < player1Pos[i][0] + player1.width && player2.xPos + player2.width > player1Pos[i][0] && player2.yPos < player1Pos[i][1] + player1.width && player2.yPos + player2.width > player1Pos[i][1]) {
            ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
            player2Score-=3;
            player1.xPos = gameScreen.width / 3;
            player1.yPos = gameScreen.height / 2;
            player2.xPos = gameScreen.width / 3*2;
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