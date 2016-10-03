var gameCanvas = document.getElementById("gameScreen");
var ctx = gameCanvas.getContext("2d");
var gameImage = document.getElementById("gameImage");
var plant = {
    width: 60,
    height: 60,
    xPos: 0,
    yPos: 620 - 60,
    goLeft: false,
    goRight: true,
    goUp: false,
    goDown: false,
    draw: function() {
        ctx.drawImage(plantImage, this.xPos, this.yPos, this.width, this.height);
    },
    move: function() {
        if(plant.goRight) plant.xPos += 5;
        if(plant.goLeft) plant.xPos -= 5;
        if(plant.goUp) plant.yPos -= 5;
        if(plant.goDown) plant.yPos += 5;
        if(plant.xPos <= gameCanvas.width - plant.width) {
            plant.goLeft = true;
            plant.goRight = false;
        }
        if(plant.xPos = 0) {
            plant.goRight = true;
            plant.goLeft = false;
        }
            if(this.xPos < kirby.xPos + kirby.width && this.xPos + this.width > kirby.xPos && this.yPos < kirby.yPos + kirby.width && this.yPos + this.width > kirby.yPos) {
                ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
                kirby.xPos = (gameScreen.width / 4) * 0;
                kirby.yPos = 0;
                enemy.xPos = gameScreen.width - enemy.width;
                enemy.yPos = gameScreen.height - enemy.height;
            }
    }
}
var kirby = {
    width: 30,
    height: 30,
    xPos: gameCanvas.width / 4,
    yPos: gameCanvas.height / 2,
    goLeft: false,
    goRight: false,
    goUp: false,
    goDown: false,
    draw: function() {
        ctx.drawImage(characterImage, this.xPos, this.yPos, 50, 50);
    },
    update: function() {
        if(kirby.goLeft && kirby.xPos > 0) {
            kirby.xPos = kirby.xPos - 5;
        }
        if(kirby.goRight && kirby.xPos + 50 < gameScreen.width) {
            kirby.xPos += 5;
        }
        if(kirby.goDown && kirby.yPos + 50 < gameScreen.height) {
            kirby.yPos += 5;
        }
        if(kirby.goUp && kirby.yPos > 0) {
            kirby.yPos = kirby.yPos - 5;
        }
        if(kirby.jump && kirby.yPos > 0) {
            kirby.yPos -= 10;
        }
        //collision detection
        if(kirby.xPos < enemy.xPos + enemy.width && this.xPos + this.width > enemy.xPos && this.yPos < enemy.yPos + enemy.height && this.yPos + this.height > enemy.yPos) {
            ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
            kirby.xPos = (gameScreen.width / 4) * 0;
            kirby.yPos = 0;
            enemy.xPos = gameScreen.width - enemy.width;
            enemy.yPos = gameScreen.height - enemy.height;
        }
    }
}
var enemy = {
    width: 30,
    height: 30,
    xPos: (gameCanvas.width / 4) * 3,
    yPos: (gameCanvas.height / 2),
    draw: function() {
        ctx.drawImage(enemyImage, this.xPos, this.yPos, 40, 40);
    },
    update: function() {
        if(enemy.goLeft && enemy.xPos > 0) {
            enemy.xPos = enemy.xPos - 5;
        }
        if(enemy.goUp && enemy.yPos > 0) {
            enemy.yPos -= 5;
        }
        if(enemy.goDown && enemy.yPos + 40 < gameScreen.height) {
            enemy.yPos += 5;
        }
        if(enemy.goRight && enemy.xPos + 40 < gameScreen.width) {
            enemy.xPos = enemy.xPos + 5;
        }
        if(enemy.jump && enemy.yPos > 0) {
            enemy.yPos -= 10;
        }
    }
}
document.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 189) {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
    if(evt.keyCode === 37) {
        enemy.goLeft = true;
    }
    if(evt.keyCode === 38) {
        enemy.goUp = true;
    }
    if(evt.keyCode === 39) {
        enemy.goRight = true;
    }
    if(evt.keyCode === 40) {
        enemy.goDown = true;
    }
    if(evt.keyCode === 87) {
        kirby.goUp = true;
    }
    if(evt.keyCode === 83) {
        kirby.goDown = true;
    }
    if(evt.keyCode === 65) {
        kirby.goLeft = true;
    }
    //s key
    if(evt.keyCode === 68) {
        kirby.goRight = true;
    }
    if(evt.keyCode === 32) {
        kirby.jump = true;
    }
    if(evt.keyCode === 191) {
        enemy.jump = true;
    }
    if(evt.keyCode == 81) {}
})
document.addEventListener("keyup", function(evt) {
    if(evt.keyCode === 37) {
        enemy.goLeft = false;
    }
    if(evt.keyCode === 38) {
        enemy.goUp = false;
    }
    if(evt.keyCode === 39) {
        enemy.goRight = false;
    }
    if(evt.keyCode === 40) {
        enemy.goDown = false;
    }
    //W key
    if(evt.keyCode === 87) {
        kirby.goUp = false;
    }
    //A key
    if(evt.keyCode === 65) {
        kirby.goLeft = false;
    }
    //D key
    if(evt.keyCode === 68) {
        kirby.goRight = false;
    }
    if(evt.keyCode === 83) {
        kirby.goDown = false;
    }
    if(evt.keyCode === 32) {
        kirby.jump = false;
    }
    if(evt.keyCode === 191) {
        enemy.jump = false;
    }
})

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    plant.draw();
    plant.move();
    kirby.update();
    kirby.draw();
    enemy.update();
    enemy.draw();
    window.requestAnimationFrame(gameLoop);
}
gameLoop();