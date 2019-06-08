var navHeight = document.querySelector(".nav-cont").offsetHeight,
canvas = document.querySelector(".canvas"); // do resize throttle zeby... canvas nie musialo wszystkiego caly czas przetwarzac

var canvasWidth = document.documentElement.clientWidth,
canvasHeight = document.documentElement.clientHeight - navHeight ;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

var c = canvas.getContext("2d");

Math.even = function(x){
    if (x%2 === 0){
        return true;
    } else {
        return false
    }
}

Math.distance = function(x1,y2,x2,y2){
    Math.sqrt(Math.pow(x1-x2 , 2) + Math.pow(y1-y2 , 2))
}


// fale lagują się w przeglądarce. Trzeba coś lżejszego. Idę do blopa. :(



var defaultPeriod = 2 * Math.PI; 
var frequency =  0.03;    //defaultPeriod * this.numOfPeriods /  canvasWidth ;
var move = 0;
var move2 = 0;
var amplitude = canvasHeight / 30;
var waveArray = [];


function MakeWave(height, firstY, color, gap,  rerenderAt, slant, sum){
    this.color = color;
    this.height = height;
    this.firstY = firstY;
    this.lastY = firstY - height;
    this.iCoef = slant/canvasWidth; // pomysl nad tym
    this.up = 1;
    this.gap = gap;
    this.rerenderAt = rerenderAt;
    this.sum = sum;

    this.draw = function(){
        c.beginPath();
        c.moveTo(-1, firstY);
        for (let i = -1; i < canvasWidth; i ++){
            c.lineTo(i,  this.firstY - (i * this.iCoef) + Math.sin(i * frequency + move) * amplitude/* * Math.sin(move2)*/);
        }
        for (let i = canvasWidth - 1; i > 0; i--){
            c.lineTo(i, this.firstY + this.height - (i * this.iCoef) + Math.sin(i * frequency + move) * amplitude /** Math.sin(move2)*/)
        }
        c.fillStyle = color;
        c.fill();
    };

    this.update = function(){
        if (this.firstY < -this.sum){
            this.firstY = this.rerenderAt;
        }    
        this.firstY -= this.up;
        move -= 0.003;
        //move2 += 0.003;
    }
};


function createWaveArray(){
    let slant = 20;
    let height1 = 30;
    let height2 = 50;
    let gap = 25;
    let sum = height1 + height2 + gap;
    let numberOfSets = Math.ceil(canvasHeight/sum) + 2;
    let rerenderAt = sum*(numberOfSets -1); 

    for ( i = 0; i < numberOfSets * 2 ; i++){ // fale naprzemienne
        if(Math.even(i)){
            firstY = i/2 * sum;
            color = "#585a5e";
            waveArray[i] = new MakeWave(height1, firstY, color, gap,  rerenderAt, slant, sum);
        }  else {
            firstY = ((i+1) / 2) * sum + height1;
            color = "#70747a";
            waveArray[i] = new MakeWave(height2, firstY, color, gap,  rerenderAt, slant, sum);
        } 
    } 
};


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.2)"
    c.clearRect(0,0, canvasWidth, canvasHeight);
    for (let i = 0; i < waveArray.length ; i++){
        waveArray[i].draw();
        waveArray[i].update();
    }
}


function init(){
    createWaveArray();
    animate()
}

init();








/*
function draw (){

    c.beginPath();
    c.moveTo(-1, beginY1);


    for (let i = -1; i < canvasWidth; i ++){
        c.lineTo(i,  up + ( beginY1 - (i * endYcoef) + Math.sin(i * freqCoef + move) * amplitude * Math.sin(move2)));
        checker = beginY1 + up ;
        if (checker < 0){
            up =  beginY1;
        }
    };
    /*for (let i = canvasWidth - 1; i>0 ; i--){
        c.lineTo(i, up + ( beginY2 - (i * endYcoef) + Math.sin(i * freqCoef + move) * amplitude * Math.sin(move2)));
    }*//*
    c.fillStyle = "rgb(220, 90, 150, 0.4)"
    c.stroke();
    //c.fill();
}*/












/*
function Waves() {
    
    this.axisX = canvasHeight / 2;
    this.numOfPeriods = 2;
    this.freqCoef =  defaultPeriod * this.numOfPeriods /  canvasWidth ;
    this.amplitude = canvasHeight / 4; // here: amplitude = distance from axis to max or min "vertex"
}

var move = 0;
var wave = new Waves();


function draw(){
    c.fillStyle = "rgba(0,0,0,0.01"
c.fillRect(0,0, canvasWidth, canvasHeight);
c.beginPath();
c.moveTo(0, canvasHeight/2);
for ( let i = 0; i < canvasWidth; i++){
    c.lineTo(i, wave.axisX + Math.sin(i * wave.freqCoef + move) * wave.amplitude * Math.sin(move));
}
c.lineTo(canvasWidth, canvasHeight /2);
c.strokeStyle = "hsl(255, 50%, 50%)";
c.stroke();

move += 0.03;
}
*/
