var navHeight = document.querySelector(".navigation").offsetHeight,
canvas = document.querySelector(".canvas"); // do resize throttle zeby... canvas nie musialo wszystkiego caly czas przetwarzac

var canvasWidth = document.documentElement.clientWidth,
canvasHeight = document.documentElement.clientHeight - navHeight ;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

var c = canvas.getContext("2d");


var bezierArray =[];

function CreateBezierPoint(px, py,kx,ky,mx,my){
    this.x = px;
    this.y = py;
    this.kx = kx;
    this.ky = ky;
    this.mx = mx;
    this.my = my;
}


function quadraticCurve(x1,y1,x2,y2,xc,yc,coef){
// vector1
x1xc = xc - x1;
y1yc = yc - y1;
//vector2
xcx2 = x2 - xc,
ycy2 = y2 - yc;

for (i=0; i<1/coef+1 ; i++){

    kx = x1 + i*coef*x1xc;
    ky = y1 + i*coef*y1yc;

    mx = xc + i*coef*xcx2;
    my = yc + i*coef*ycy2;
    // vector km 
    kxmx = mx - kx;
    kymy = my - ky;

    px = kx + i*coef*kxmx;
    py = ky + i*coef*kymy;

    bezierArray[i] = new CreateBezierPoint(px, py, kx,ky,mx,my);
    }
    return bezierArray;
}

var x1 = 200,
y1 = 550,
x2 = 1200,
y2 = 600,
xc = 750,
yc = 50;

function checkBezier(){
    c.fillStyle = "black";
    c.beginPath();
    c.arc(x1, y1,  3, 0, Math.PI*2,false);
    c.fill();
    c.beginPath();
    c.arc(x2, y2,  3, 0, Math.PI*2,false);
    c.fill();
    c.beginPath();
    c.arc(xc, yc,  3, 0, Math.PI*2,false);
    c.fillStyle = "yellow";
    c.fill();

    c.fillStyle = "red";
    for (i = 0; i < bezierArray.length ; i++){
        c.beginPath()
        c.moveTo(bezierArray[i].kx,bezierArray[i].ky);
        c.lineTo(bezierArray[i].mx,bezierArray[i].my);
        c.strokeStyle = "green";
        c.strokeWidth = 1;
        c.stroke();

        c.beginPath()
        c.arc(bezierArray[i].x, bezierArray[i].y,  2, 0, Math.PI*2,false);
        c.fill();
    }
}

quadraticCurve(x1, y1, x2, y2, xc, yc, 0.1);
checkBezier();


function animateBezier(){
    requestAnimationFrame(animateBezier)
    quadraticCurve(x1, y1, x2, y2, xc, yc, 0.02);
    checkBezier();
    //jeszcze mouse coordinates and update; ma byc drag
}


//expression E (i+2) NIE UMIEM

function sigmaNotation(a,z, expression){
    let total;
    for(let j = 0; j < Math.abs(z-a); i++){
        if (a+i<=z){
        total += (a + i) + 2;
        }
        return total
    }

}









