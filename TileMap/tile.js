
window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};

var gameScreen = document.createElement("canvas");
var ctx = gameScreen.getContext("2d");

var grass = document.getElementById("grass");
var dirt = document.getElementById("dirt");
var water = document.getElementById("water");
var tree = document.getElementById("tree");
var house = document.getElementById("house");

gameScreen.style.position = "absolute";
gameScreen.style.left = 0;
gameScreen.style.top = 0;
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.width = window.innerWidth + "px";
gameScreen.style.height = window.innerHeight + "px";
gameScreen.style.backgroundColor = "white";
document.body.appendChild(gameScreen);

var mapArray = [];

for(var i = 0; i < 32; i++) {
    mapArray[i] = [];
    for(var k = 0; k < 50; k++) {
        mapArray[i][k] = Math.random();
    }
}

var x = 0;
var y = 0;

function gameLoop() {

    
for(i = 0; i < mapArray.length; i++) {
    for(j = 0; j < mapArray[i].length; j++) {
        if(mapArray[i][j] < 2) {
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, 32, 32);
        }
        x+=32;
    }
    y+=32;
    x=0;
}
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();