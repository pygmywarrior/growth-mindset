var navHeight = document.querySelector(".nav-cont").offsetHeight,
canvas = document.querySelector(".canvas"); // do resize throttle zeby... canvas nie musialo wszystkiego caly czas przetwarzac

var canvasWidth = document.documentElement.clientWidth,
canvasHeight = document.documentElement.clientHeight - navHeight ;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

var c = canvas.getContext("2d");

canvas.style.background = "black";

var Mouse = {
    x: undefined,
    y: undefined,
}

var mouseX;
var mouseY;

window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function update(){
    if (cir1 > 40* Math.PI) {
        cir1 = 0;
    }
    cir1 += v;
    cir2 = cir1 + lineLength;

    if (radius < minRadius || radius > maxRadius){
        dr = -dr;
    }
    radius += dr;
}
    
    
    
function draw(){
    c.strokeStyle = "red";
    c.lineWidth = "10";
    c.beginPath();
    c.arc(mouseX, mouseY - navHeight, radius, cir1, cir2, true) // YYYY
    c.stroke();
}

var cx = 300,
cy = 300,
radius = 100,
lineLength = Math.PI / 4,
cir1 = 0,
cir2 = cir1 + lineLength,
v = Math.PI / 45,
dr = 1,
minRadius = 40,
maxRadius = 140;


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    update();
    draw();
}   


//draw()



animate()








/*
    c.strokeStyle = "red";
    c.lineWidth = "10";
    c.beginPath();
    c.moveTo(x1, yc);
    c.lineTo(x2, yc); // YYYY
    c.stroke(); 

    x1 = x2;
    x2 -= dx;
    
    if (x1 == xc + radius || x1 == xc - radius ){
        dx = -2*dx;
    };



    //createCoordinates();
    draw();
    //x1 = x2;
}

function createCoordinates(){
    if (x1 - xc < radius && x1 -xc > -radius){
        console.log("if");

    } else if ( x1 - xc == radius){
        dx = -dx;
        console.log("else");
    }
    x2 += dx;

}

*/