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
Math.dist = function(x1,y2,x2,y2){
    Math.sqrt(Math.pow(x1-x2 , 2) + Math.pow(y1-y2 , 2))
}
Math.randomRange = function(a, z){
    let result = Math.random()*(z-a) + a;
    return result;
}


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

quadraticCurve(x1, y1, x2, y2, xc, yc, 0.02); 


var centerX = 700;
var centerY = 250;
var radius = 250;
var deg1 =  2 * Math.PI * (45 /360),
deg2 = 2 * Math.PI * (120 /360),
deg3 = 2 * Math.PI * (160 /360),
deg4 = 2 * Math.PI * (250 /360),
deg5 = 2 * Math.PI * (315 /360),
deg0 = 0;

{//circle center point
c.beginPath();
c.fillStyle = "red";
c.fillRect(centerX, centerY, 5, 5);
c.fill();
}
/*
c.beginPath()
c.moveTo(centerX, centerY);
c.lineTo(Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY)
c.lineTo(Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY);
c.lineTo(Math.cos(deg1)*radius+centerX, Math.sin(deg1)*radius+centerY);
c.lineTo(Math.cos(deg2)*radius+centerX, Math.sin(deg2)*radius+centerY);
c.lineTo(Math.cos(deg3)*radius+centerX, Math.sin(deg3)*radius+centerY);
c.lineTo(Math.cos(deg4)*radius+centerX, Math.sin(deg4)*radius+centerY);
c.lineTo(Math.cos(deg5)*radius+centerX, Math.sin(deg5)*radius+centerY);
c.lineTo(Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY)
c.stroke()
*/



c.beginPath()
c.moveTo(centerX, centerY);
c.lineTo(Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY)
c.quadraticCurveTo(Math.cos(deg0)*radius+30+centerX, Math.sin(deg0)*radius+20+centerY, Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg1)*radius+30+centerX, Math.sin(deg1)*radius+20+centerY, Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg2)*radius+30+centerX, Math.sin(deg2)*radius+20+centerY, Math.cos(deg1)*radius+centerX, Math.sin(deg1)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg3)*radius+30+centerX, Math.sin(deg3)*radius+20+centerY, Math.cos(deg2)*radius+centerX, Math.sin(deg2)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg4)*radius+30+centerX, Math.sin(deg4)*radius+20+centerY, Math.cos(deg3)*radius+centerX, Math.sin(deg3)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg5)*radius+30+centerX, Math.sin(deg5)*radius+20+centerY, Math.cos(deg4)*radius+centerX, Math.sin(deg4)*radius+centerY);
c.quadraticCurveTo(Math.cos(deg0)*radius+30+centerX, Math.sin(deg0)*radius+20+centerY, Math.cos(deg5)*radius+centerX, Math.sin(deg5)*radius+centerY)
c.stroke();









c.beginPat;
c.arc(centerX, centerY, 250, 0, ath.PI, false);
c.s, Math.cos(deg0)*radius+centerX, Math.sin(deg0)*radius+centerYtroke();












