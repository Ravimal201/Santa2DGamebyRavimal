var santa = document.getElementById("santa");

var idleImageNumber = 1;
var idleAnimationNumber = 0;


function idleAnimation() {

    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 17) {
        idleImageNumber = 1;
    }

    santa.src = "resources/idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 110);
}


var walkImageNumber = 1;
var walkAnimationNumber = 0;

function walkAnimation() {


        walkImageNumber = walkImageNumber + 1;

    if (walkImageNumber == 14) {
        walkImageNumber = 1;
    }

    santa.src = "resources/walk (" + walkImageNumber + ").png";
}

function walkAnimationStart() {

    walkAnimationNumber = setInterval(walkAnimation, 110);

    clearInterval(idleAnimationNumber);
}

function keyCheck(event) {
    //alert(event.which);
    //enterKey = 13
    //space = 32

    var keyCode = event.which;

    if (keyCode == 13) {
        jumpAnimationNumber = 0;

        if (walkAnimationNumber == 0) {
            walkAnimationStart();
        }

        if (moveBackgroundId == 0) {
            moveBackgroundId = setInterval(moveBackground, 50);
        }

        if (enemyAnimationId == 0) {
            enemyAnimationId = setInterval(enemyAnimation,100);
        }
    }

    if(keyCode == 32) {
        if(jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }
        
    }
    
    


}

var backgroundImagePositionX = 0;
var moveBackgroundId = 0;


function moveBackground() {

    backgroundImagePositionX = backgroundImagePositionX - 10;

    moveBackgroundId = document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
}


var jumpImageNumber = 0;
var jumpAnimationNumber = 1;
var santaMarginTop = 450;

function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;

    santa.src = "resources/jump ("+ jumpImageNumber +").png";

    if( jumpImageNumber <= 8) {
        santaMarginTop = santaMarginTop - 20;
        santa.style.marginTop = santaMarginTop + "px";
    }
    
    if( jumpImageNumber >=  9 ) {
        santaMarginTop = santaMarginTop + 20;
        santa.style.marginTop = santaMarginTop + "px"
    }

    if(jumpImageNumber == 16) {
        clearInterval(jumpAnimationNumber);
        jumpImageNumber = 0;
        jumpAnimationNumber = 0;
        walkImageNumber = 1;
        walkAnimationStart();
    }
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber); 
    walkImageNumber =0;
    clearInterval(walkAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 50);
}

var enemyMarginLeft = 1700;
var reduceMargin = 1500;

function createEnemy() {
    for( var i =0; i <= 10; i++) {

    var enemy =  document.createElement("div");
    enemy.className="enemy";
    document.getElementById("background").appendChild(enemy);
    enemy.style.marginLeft = enemyMarginLeft + "px";
    enemy.id = "enemy" + i;

    for(var x=0; x<=i; x++) {
        reduceMargin = reduceMargin - 20;
    }
    
    enemyMarginLeft = enemyMarginLeft + reduceMargin;

    }
}

var enemyAnimationId = 0;

function enemyAnimation() {
    for( var i=0; i<10; i++) {
        var enemy = document.getElementById("enemy" + i);
        var currentMarginLeft = getComputedStyle(enemy).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 25;
        enemy.style.marginLeft = newMarginLeft +"px"; 
    }
}
