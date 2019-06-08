var player = document.querySelector(".video-player");

var welcomePlayBtn = document.querySelector(".wrapper__welcome-btn");
var welcomePlayBtnIcon = document.querySelector(".wrapper__welcome-btn--icon");

var controlBox = document.querySelector(".vp-controls");
var timeSlider = document.querySelector(".vp-controls__time-slider");

var playPauseBtn = document.querySelector(".vp-controls__box-1--play-pause-btn");
var playPauseBtnIcon = document.querySelector(".vp__play-pause-icon")
var timeDisplayer = document.querySelector(".vp-controls__box-1--time-displayer");

var volSlider = document.querySelector(".vp-controls__box-1-1-1--voll-slider");
var volBtn = document.querySelector(".vp-controls__box-1-1-1--voll-btn");
var volBtnIcon = document.querySelector(".vp__volume-icon");
var volBox = document.querySelector(".vp-controls__box-1-1-1");

var fullscreenBtn = document.querySelector(".vp-controls__box-1-1--fullscreen-btn");
var fullscreenBtnIcon = document.querySelector(".vp__fullscreen-icon");
var wrapper = document.querySelector(".wrapper");



var going = false;
var started = false;
var trackTimeIntId;


function playFn(){
    player.play();
    playPauseBtnIcon.setAttribute("src", "../svgs/pause.svg");
    started = true;
    going = true;
}

function pauseFn(){
    player.pause();
    playPauseBtnIcon.setAttribute("src", "../svgs/play.svg");
    going = false;
}

var movedAgo;
function isUserMoving(){
    let nowIs = new Date();
    if (nowIs - movedAgo>3000){
        controlBox.classList.add("vp-controls--hidden");
    } else{
        controlBox.classList.remove("vp-controls--hidden");
    }
}

function playPause(){
    if(player.paused){
        if(!started){
            welcomePlayBtn.classList.toggle("wrapper__welcome-btn--hidden");
            trackTimeIntId = setInterval(function(){
                trackTime();
                trackTimeSlider();
                isUserMoving();
            }, 100);

            started = true;
        }
        playFn()
    } else {
        pauseFn();
    } 
}

function finished(){
    pauseFn();
    welcomePlayBtn.classList.toggle("wrapper__welcome-btn--hidden");
    welcomePlayBtnIcon.setAttribute("src","../svgs/restart.svg");
    console.log("tolo")
}


function trackTime(){
    now = convertTime(player.currentTime);
    timeDisplayer.innerHTML = `${now} / ${duration}`
    if (player.ended){
    clearInterval(trackTimeIntId);
    started = false;
    pauseFn();
    }
}


var fullscreen = false;
function doFullscreen(){
    if(fullscreen === false){
        wrapper.webkitRequestFullscreen();
        fullscreen = true;
        fullscreenBtnIcon.setAttribute("src", "../svgs/fullscreen-close.svg");
    } else {
        document.exitFullscreen();
        fullscreen = false;
        fullscreenBtnIcon.setAttribute("src", "../svgs/fullscreen.svg")
    }
}


function convertTime(x){
    let time = Math.round(x);
    let result;
    let seconds = time%60;
    let minutes = Math.floor(time/60);
    let hours = Math.floor(time/3600);
    if (seconds<10) {
        seconds = `0${seconds}`
    }
    if (minutes%60 < 10){
        minutes = `0${minutes}`
    }
    if(time>3600){
        result =`${hours}:${minutes}:${seconds}`;
    } else{
        result = `${minutes}:${seconds}`;
    }
    return result;
}

var currentVol = 1;
function changeVol(){
    player.volume = volSlider.value / 100; // yay, it takes strings!
    currentVol = player.volume;
    if(currentVol===0){
        volBtnIcon.setAttribute("src", "../svgs/mute-volume.svg");
    } else {
        volBtnIcon.setAttribute("src", "../svgs/high-volume.svg");
    }
}
var muted = false;
function muteUnmute(){
    if (!muted){
        volSlider.value = 0;
        player.volume = 0;
        muted = true;
        volBtnIcon.setAttribute("src", "../svgs/mute-volume.svg");
    } else {
        player.volume = currentVol;
        volSlider.value = currentVol*100;
        muted = false;
        volBtnIcon.setAttribute("src", "../svgs/high-volume.svg");
    }
}


function dropVolSlider(){
    volSlider.classList.toggle("vp-controls__box-1-1-1--voll-slider--hidden");
    volBox.classList.toggle(".vp-controls__box-1-1-1--hidden");
}

function changeTime(){
    player.pause()
    player.currentTime = timeSlider.value;
}

function trackTimeSlider(){
    timeSlider.value = player.currentTime;
}



wrapper.addEventListener("click", function(){
    movedAgo = new Date();
    wrapper.focus()
});

wrapper.addEventListener("mouseover", function(){
    movedAgo = new Date();
});

wrapper.addEventListener("keydown", function(e){
    switch(e.which){
        case 37:
            if(player.currentTime>5){
                player.currentTime -=  5;
            } else {
                player.currentTime = 0;
            }
            movedAgo = new Date();
            break;
        case 39:
            if(player.currentTime<player.duration - 5){
                player.currentTime +=  5;
            } else {
                player.currentTime = player.duration;
            }
            movedAgo = new Date();
            break;
        case 32:
            playPause();
            movedAgo = new Date();
            break;
    }
});

timeSlider.addEventListener("input", changeTime);
timeSlider.addEventListener("change", function(){
    if(going){
        player.play()
    }
})

player.addEventListener("ended", finished)
player.addEventListener("click", playPause);
var duration;
var now = "00:00";
player.addEventListener("loadedmetadata", function(){
    duration = player.duration;
    duration = convertTime(duration);
    timeDisplayer.innerHTML = `${now} / ${duration}`;
    timeSlider.setAttribute("max", player.duration -1)
})

volBtn.addEventListener("click", muteUnmute);
volBox.addEventListener("mouseover", dropVolSlider);
volBox.addEventListener("mouseout", dropVolSlider)
volSlider.addEventListener("input", changeVol)

playPauseBtn.addEventListener("click", playPause);
welcomePlayBtn.addEventListener("click", playPause);

fullscreenBtn.addEventListener("click", doFullscreen);





/*range slider logic
var sliderContainer = document.querySelector(".slider-box--time");
var sliderSelecter = document.querySelector(".slider-box__bar-selected--time");
var sliderUnselected = document.querySelector(".slider-box__bar-unselected--time");
var sliderThumb = document.querySelector(".slider-box__thumb--time");

window.addEventListener("resize", function(){
    pageWidth = document.documentElement.clientWidth;
    containerWidth = sliderContainer.offsetWidth;
    containerSpace = (player.offsetWidth - containerWidth)/2;
    playerSpace = (pageWidth - player.offsetWidth)/2;
})

var pageWidth = document.documentElement.clientWidth;
var containerWidth = sliderContainer.offsetWidth;
var containerSpace = (player.offsetWidth - containerWidth)/2 // those space on both sides left.
var playerSpace = (pageWidth - player.offsetWidth) / 2;

sliderContainer/
function moveThumb(x, event){
    console.log("before first if");
    if (x >= containerSpace + playerSpace){
        console.log("inside first if");
        if (x <= pageWidth - containerSpace - playerSpace){
            let move = x - containerSpace - playerSpace;
            sliderThumb.style.transform = `translate(${move}px, -50%)`
        }
    }
}

sliderThumb.addEventListener("drag", function(e){
    e.preventDefault();
    moveThumb(e.clientX);
    console.log(e.clientX)
    document.body.style.cursor = "pointer";
});
*/