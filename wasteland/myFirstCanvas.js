
var navHeight = document.querySelector(".nav-cont").offsetHeight,
canvas = document.querySelector(".canvas"); // do resize throttle zeby... canvas nie musialo wszystkiego caly czas przetwarzac

var canvasWidth = document.documentElement.clientWidth,
canvasHeight = document.documentElement.clientHeight - navHeight ;

canvas.height = canvasHeight;
canvas.width = canvasWidth;



var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined,
}

var maxRadius = 40,
mouseRadius = 50;

var colorArray = [
    "#F25764",
    "#B6F2F2",
    "#F2A03D",
    "#F26430",
    "#0D0D0D",
];

window.addEventListener("mousemove", function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    console.log(mouse)
})

window.addEventListener("resize", function(){
    canvasWidth = document.documentElement.clientWidth,
    canvasHeight = document.documentElement.clientHeight - navHeight ;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    init();
})




function Circle(x, y, dx, dy, radius, red, blue, green, opaque, colour, minRadius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.opaque = opaque;
    this.colour = colour;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = minRadius;

    this.draw = function(){
        //c.fillStyle = colour;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.stroke();
        c.fill();

    }
    this.update = function(){
        if ( this.x > canvasWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        };
    
        if ( this.y > canvasHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if ((mouse.x - this.x < mouseRadius && mouse.x - this.x  > -mouseRadius) && (mouse.y - navHeight - this.y < mouseRadius && mouse.y - navHeight - this.y > - mouseRadius)){ // i jak zrobic kiedy sa rozne radiusy dla kazdego kola ok wiem xd - nowa variable ktora bierze pierwszy radius czyli np radius 1 (użytkowy) i radius 2(niezmienny)

            if ( this.radius < maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > minRadius) {
            this.radius -= 2;
        }
        this.draw()
    }
};


var numberOfCircles = 800;
var circleArray = [];

function init(){
    circleArray = [];
    for (let i = 0; i<numberOfCircles; i++){
        var radius = Math.random() * 4 + 2, // from 2 to 5
        minRadius = radius,
        x = Math.random() * (canvasWidth - 2*radius) + radius,
        y = Math.random() * (canvasHeight - 2*radius) + radius,
        dx = (Math.random() - 0.5) *4,
        dy = (Math.random() - 0.5) *4;
    
        var red = parseInt(Math.random() * 255),
        green = parseInt(Math.random() * 255),
        blue = parseInt(Math.random() * 255);
        opaque = Math.random() * 0.4 + 0.4;  // chcę od 0.4 do 0.8 więc..
        var colour = "rgb(" +  red + ", " + green + ", " + blue + ", " + opaque + ")";
    
        c.strokeStyle = colour;
        circleArray.push( new Circle(x, y, dx, dy, radius, red, green, blue, opaque, colour, minRadius));
    }
}



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i<circleArray.length; i++ ){
        circleArray[i].update();
    }
}


init();
animate();










console.log("ok, we made it to the end");