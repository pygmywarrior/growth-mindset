var navHeight = document.querySelector(".nav-cont").offsetHeight,
canvas = document.querySelector(".canvas"); // do resize throttle zeby... canvas nie musialo wszystkiego caly czas przetwarzac

var canvasWidth = document.documentElement.clientWidth,
canvasHeight = document.documentElement.clientHeight - navHeight ;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

var c = canvas.getContext("2d");


//var defaultPeriod = 2 * Math.PI; 
var beginY = canvasHeight * (2/3);
var endYcoef = canvasHeight/(3*canvasWidth)
var freqCoef =  0.03;    //defaultPeriod * this.numOfPeriods /  canvasWidth ;
var move = 1;
var amplitude = canvasHeight / 20;


function animate(){
    requestAnimationFrame(animate);
    draw();
    move += 0.1
}

function draw (){
    c.clearRect(0,0, canvasWidth, canvasHeight)
    c.beginPath();
    c.moveTo(0, canvasHeight * 2 / 3);
    for (let i = 0; i < canvasWidth; i ++){
        c.lineTo(i,  ( beginY - (i * endYcoef) + Math.sin(i * freqCoef ) * amplitude  ));
    }
    c.stroke();
}


animate();
