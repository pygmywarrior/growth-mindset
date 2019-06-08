


var dropMenu = document.querySelector(".drop"),
fullMenu = document.querySelector(".full")
bar1 = document.querySelector(".menu-icon__bar1"),
bar2 = document.querySelector(".menu-icon__bar2"),
bar3 = document.querySelector(".menu-icon__bar3"),
menuIcon = document.querySelector(".navigation__menu-icon"),
undropMenuBox = document.querySelector(".navigation__undrop-menu-box"),
dropMenu = document.querySelector(".navigation__menu-drop");


var dropped = false;

function toggleBars(){
    bar1.classList.toggle("menu-icon__bar1-on");
    bar2.classList.toggle("menu-icon__bar2-on");
    bar3.classList.toggle("menu-icon__bar3-on");
}

function toggleHiddens(){
    dropMenu.classList.toggle("navigation__menu-drop--hidden");
    undropMenuBox.classList.toggle("navigation__undrop-menu-box--hidden")
}

function drop(){
    if (dropped == false){
        toggleBars();
        toggleHiddens();
        dropped = true;
    } else {
        toggleBars();
        toggleHiddens();
        dropped = false;
    }
}


menuIcon.addEventListener("click", drop);
undropMenuBox.addEventListener("click", drop);


window.addEventListener("resize", function(){
    var windWidth = window.matchMedia("(max-width: 1023px)");
    if (!windWidth.matches) {
        if (dropped == true){
            drop()
            dropped = false;
        }
    }
}); 
