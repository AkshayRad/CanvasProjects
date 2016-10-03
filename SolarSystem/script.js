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
var sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    draw: function() {
        ctx.fillStyle = "#EE6232";
        ctx.arc(this.x, this.y, 95.9378689, 0, 2 * Math.PI);
        ctx.fill();
    }
}
var mercury = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 150,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 88;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, .60, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var venus = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 150 + 62,
    angle: 0,
    move: function() {
        this.angle += Math.PI / 224.7;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 0.87, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var earth = {
    x: 0,
    y: 0,
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 274,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 365;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "lightgreen";
        ctx.arc(this.x, this.y, 0.91, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var earthmoon = {
    centerX: earth.x,
    centerY: earth.y,
    orbit: true,
    radius: 15,
    angle: 0,
    move: function() {
        this.centerX = earth.x;
        this.centerY = earth.y;
        this.angle -= Math.PI / 27;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 0.91 / 4, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var mars = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 336,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 686.93;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 0.41, 0, 2 * Math.PI);
        ctx.fill();
    },
}

    function MarsMoon() {
        this.centerX = mars.x;
        this.centerY = mars.y;
        this.angle = Math.random() * 2 * Math.PI;
        this.radius = Math.random() * 12;
        this.orbit = true;
        this.update = function() {
            this.centerX = mars.x;
            this.centerY = mars.y;
            this.angle -= Math.PI / 10;
            if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
            if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
            ctx.beginPath();
            ctx.moveTo(marsmoons[i].centerX, marsmoons[i].centerY);
            ctx.fillStyle = "white";
            ctx.arc(this.x, this.y, .19, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
var marsmoons = [];
for(i = 0; i < 2; i++) {
    marsmoons.push(new MarsMoon());
}

    function AsteroidBelt() {
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.radius = 350+Math.random()*5;
        this.angle = Math.random() * 2 * Math.PI;
        this.orbit = true;
        this.update = function() {
            this.angle -= Math.PI / 4140.6;
            if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
            if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
            ctx.beginPath();
            ctx.moveTo(asteroids[i].centerX, asteroids[i].centerY);
            ctx.fillStyle = "white";
            ctx.arc(this.x, this.y, .10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
var asteroids = [];
for(i = 0; i < 500; i++) {
        asteroids.push(new AsteroidBelt());
}
var jupiter = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 150 + 248,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 4330.6;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "#B7AE7E";
        ctx.arc(this.x, this.y, 8.62, 0, 2 * Math.PI);
        ctx.fill();
    },
}

    function JupiterMoon() {
        this.centerX = jupiter.x;
        this.centerY = jupiter.y;
        this.angle = Math.random() * 2 * Math.PI;
        this.radius = Math.random() * 30 + 8.5;
        this.orbit = true;
        this.update = function() {
            this.centerX = jupiter.x;
            this.centerY = jupiter.y;
            this.angle -= Math.PI / 250;
            if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
            if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
            ctx.beginPath();
            ctx.moveTo(jupitermoons[i].centerX, jupitermoons[i].centerY);
            ctx.fillStyle = "white";
            ctx.arc(this.x, this.y, 0.20, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
var jupitermoons = [];
for(i = 0; i < 68; i++) {
    jupitermoons.push(new JupiterMoon());
}
var saturn = {
    x: 0,
    y: 0,
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 150 + 62 + 62 + 62 + 124,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 10755.7;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "#7A734D";
        ctx.arc(this.x, this.y, 7.25, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var saturnrings = {
    x: saturn.x,
    y: saturn.y,
    orbit: true,
    radius: 15,
    angle: 0,
    move: function() {
        this.x = saturn.x;
        this.y = saturn.y;
        this.angle -= Math.PI / 27;
        //         if(this.orbit)this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        //         if(this.orbit)this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw1: function() {
        ctx.strokeStyle = "white";
        ctx.ellipse(this.x, this.y + 3, 6.4, 14, 45 * Math.PI / 90, Math.PI / 2, 1.5 * Math.PI);
        ctx.stroke();
    },
    draw2: function() {
        ctx.strokeStyle = "white";
        ctx.ellipse(this.x, this.y + 3, 6.4, 14, 45 * Math.PI / 90, Math.PI * 1.5, Math.PI * .5);
        ctx.stroke();
    },
}
var uranus = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 150 + 124 + 248,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 30687;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "#31DED8";
        ctx.arc(this.x, this.y, 3.1, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var neptune = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 584,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 60148.35;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "#3AA0B2";
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fill();
    },
}
var pluto = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    orbit: true,
    radius: 646,
    angle: 0,
    move: function() {
        this.angle -= Math.PI / 90520;
        if(this.orbit) this.x = this.radius * (Math.cos(this.angle)) + this.centerX;
        if(this.orbit) this.y = this.radius * (Math.sin(this.angle)) + this.centerY;
    },
    draw: function() {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 0.91 / 6, 0, 2 * Math.PI);
        ctx.fill();
    },
}

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Sun
        ctx.beginPath();
        sun.draw();
        ctx.closePath();
        //Earth's moon
        ctx.beginPath();
        earthmoon.draw();
        earthmoon.move();
        ctx.closePath();
        //Mercury
        ctx.beginPath();
        ctx.moveTo(mercury.centerX, mercury.centerY);
        mercury.move();
        mercury.draw();
        ctx.closePath();
        //Venus
        ctx.beginPath();
        ctx.moveTo(venus.centerX, venus.centerY);
        venus.move();
        venus.draw();
        ctx.closePath();
        //Earth
        ctx.beginPath();
        ctx.moveTo(earth.centerX, earth.centerY);
        earth.move();
        earth.draw();
        ctx.closePath();
        //Mars
        ctx.beginPath();
        ctx.moveTo(mars.centerX, mars.centerY);
        mars.move();
        mars.draw();
        ctx.closePath();
        //Creating mars's moons
        for(i = 0; i < marsmoons.length; i++) {
            marsmoons[i].update();
        }        
        //Creating Asteroid Belt w/ Asteroids
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
        //Jupiter
        ctx.beginPath();
        ctx.moveTo(jupiter.centerX, jupiter.centerY);
        jupiter.move();
        jupiter.draw();
        ctx.closePath();
        //Creating jupitor's moons
        for(i = 0; i < jupitermoons.length; i++) {
            jupitermoons[i].update();
        }
        //Saturn
        ctx.beginPath();
        ctx.moveTo(saturn.x - 13.6459255252, saturn.y);
        saturnrings.draw1();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(saturn.centerX, saturn.centerY);
        saturn.draw();
        ctx.closePath();
        saturn.move();
        ctx.beginPath();
        ctx.moveTo(saturn.x + 13.6459255252, saturn.y);
        saturnrings.draw2();
        ctx.closePath();
        //Saturn's Rings
        ctx.beginPath();
        saturnrings.move();
        ctx.closePath();
        //Uranus
        ctx.beginPath();
        ctx.moveTo(uranus.centerX, uranus.centerY);
        uranus.move();
        uranus.draw();
        ctx.closePath();
        //Uranus
        ctx.beginPath();
        ctx.moveTo(neptune.centerX, neptune.centerY);
        neptune.move();
        neptune.draw();
        ctx.closePath();
        //Pluto
        ctx.beginPath();
        ctx.moveTo(pluto.centerX, pluto.centerY);
        pluto.move();
        pluto.draw();
        ctx.closePath();
        window.requestAnimationFrame(update);
    }

update();