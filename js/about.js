
// position of intro section, scroll function, faq accordion

var navbar = document.querySelector(".navigation"),
canvasSection = document.querySelector(".intro"),
navHeight = navbar.offsetHeight,
windowHeight = window.innerHeight, //document.documentElement.scrollTop || document.body.scrollTop;
downArrow = document.querySelector(".intro__down-arrow"),
sectionBenefits = document.querySelector(".benefits"),
intId,
timeoutId;


canvasSection.style.height = windowHeight - navHeight +"px";
canvasSection.style.marginTop = navHeight + "px";



function clearInt(){
    clearInterval(intId)
};

function checkIfOk(){
    console.log("scroll done!")
}


// ORIGINAL
/*
function scrollSmoothlyVer1(destination, duration, callback){
    let intId,
    destPosition = destination.offsetTop;
    here = document.documentElement.scrollTop || document.body.scrollTop,
    distance = destPosition - here,
    NoP = duration / 4;
    console.log(here,destPosition,NoP)
    if (distance == 0){

        console.log("Im already waiting!")
        
    } else if  (distance > 0){
        intId = setInterval(function(){
            scrollTo(0, here);
            here = distance / NoP + here;
        }, 4);
        setTimeout(function(){
            clearInterval(intId);
            scrollTo(0,destPosition);
            callback();
        }, duration);
    } else{
        intId = setInterval(function(){
            scrollTo(0, here);
            here = here - distance / NoP ;
        }, 4);
        setTimeout(function(){
            clearInterval(intId);
            scrollTo(0,destPosition);
            callback();
        }, duration);

    }
}
*/
// END OF ORIGINAL



function scrollSmoothly(destination, duration, callback){
    let destPosition = destination.offsetTop;
    here = document.documentElement.scrollTop || document.body.scrollTop,
    distance = destPosition - here,
    roughnessLvl = 30
    NoP = duration / roughnessLvl;  //number of pieces or moves per scroll

    let coef = 0.86, //the bigger coef the gentler landing - usable range: 0.8< coef <0.96 (depends on duration)
    a1 = distance / ( ( 1 - Math.pow(coef,NoP) ) / (1 - coef)),
    counter = 0;
    
    if (distance == 0){
        console.log("Im already waiting!")

    } else if  (distance > 0){
        intId = setInterval(function(){
            scrollTo(0, here);
            geo = a1 * Math.pow(coef, counter);
            here = here + geo;
            counter++ ;
        }, roughnessLvl);

        timeoutId = setTimeout(function(){
            clearInterval(intId);
            scrollTo(0,destPosition);
            callback();
        }, duration);

    } else {
        intId = setInterval(function(){
            scrollTo(0, here);
                    
            geo = a1 * Math.pow(coef, counter);
            here = here + geo;
            counter++ ;
        }, roughnessLvl);
        timeoutId = setTimeout(function(){
            clearInterval(intId);
            scrollTo(0,destPosition);
            callback();
        }, duration);
    }
}



downArrow.addEventListener("click", function(){
    scrollSmoothly(sectionBenefits, 1500, checkIfOk)});


window.addEventListener("resize", function(){
    let windowHeightNew = window.innerHeight;
    if (windowHeightNew != windowHeight) { 
    navHeight = navbar.offsetHeight;
    windowHeight = window.innerHeight;
    canvasSection.style.paddingTop = navHeight;
    canvasSection.style.height = windowHeight - navHeight +"px";
    }
});



window.addEventListener("wheel", function(){
    clearInterval(intId);
    clearTimeout(timeoutId)
});

// tutaj zrobie throttle




var titles = document.querySelectorAll(".faq__title-box");
var answerBoxes = document.querySelectorAll(".faq__answer-box");
var answers = document.querySelectorAll(".faq__answer-box--answer");
var changingBar = document.querySelectorAll(".title-box__css-icon--bar1");
var ansMargin = 40
var trueHeight = [];
var opened = [];

for (let i=0; i<titles.length; i++){
    opened[i] = false;
    trueHeight[i] = answers[i].scrollHeight;

    titles[i].addEventListener("click", function(){
        changingBar[i].classList.toggle("title-box__css-icon--bar1--is-active");
        if (opened[i]){
            answerBoxes[i].style.height = "0px";
            opened[i]= false;
        } else {
            answerBoxes[i].style.height = `${trueHeight[i] + ansMargin}px`;
            opened[i]= true;
        }
    })
}
/// dlaczego resize zmniejszajacy dziala inaczej niz zwiekszajacy?

function getDataResize(){
    for (let i=0; i<titles.length; i++){
    trueHeight[i] = answers[i].scrollHeight;
    if(opened[i]){
        answerBoxes[i].style.height = `${trueHeight[i] + ansMargin}px`;
    }
    }
}

window.addEventListener("resize", getDataResize);