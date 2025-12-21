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
            enemyAnimationId = setInterval(enemyAnimation, 100);
        }
    }

    if (keyCode == 32) {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }

    }




}

var backgroundImagePositionX = 0;
var moveBackgroundId = 0;


function moveBackground() {

    backgroundImagePositionX = backgroundImagePositionX - 10;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
    
}


var jumpImageNumber = 0;
var jumpAnimationNumber = 1;
var santaMarginTop = 450;

function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;

    santa.src = "resources/jump (" + jumpImageNumber + ").png";

    if (jumpImageNumber <= 8) {
        santaMarginTop = santaMarginTop - 25;
        santa.style.marginTop = santaMarginTop + "px";
    }

    if (jumpImageNumber >= 9) {
        santaMarginTop = santaMarginTop + 25;
        santa.style.marginTop = santaMarginTop + "px"
    }

    if (jumpImageNumber == 16) {
        clearInterval(jumpAnimationNumber);
        jumpImageNumber = 0;
        jumpAnimationNumber = 0;
        walkImageNumber = 1;
        walkAnimationStart();
    }
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    walkImageNumber = 0;
    clearInterval(walkAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 75);
}

var enemyMarginLeft = 1700;

function createEnemy() {
    for (var i = 0; i < 20; i++) {

        var enemy = document.createElement("div");
        enemy.className = "enemy";
        document.getElementById("background").appendChild(enemy);
        enemy.style.marginLeft = enemyMarginLeft + "px";
        enemy.id = "enemy" + i;

        if (i <= 14) {
            enemyMarginLeft = enemyMarginLeft + 1050;
        }
        if (i > 14) {
            enemyMarginLeft = enemyMarginLeft + 550;
        }

    }
}

var enemyAnimationId = 0;
var enemyCreateId = 0;

function enemyAnimation() {
    for (var i = 0; i < 20; i++) {
        var enemy = document.getElementById("enemy" + i);
        var currentMarginLeft = getComputedStyle(enemy).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 40;
        enemy.style.marginLeft = newMarginLeft + "px";

        //logic for game over.
        if (newMarginLeft >= 150 && newMarginLeft <= 350) {
            if (santaMarginTop > 400) {
                clearInterval(enemyAnimationId);
                clearInterval(walkAnimationNumber);
                walkAnimationNumber = -1;
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(moveBackgroundId);
                moveBackgroundId = -1;

                deathAnimationNumber = setInterval(deathAnimation,100);
            }
        }
    }
}

var deathImageNumber =1;
var deathAnimationNumber = 0;

function deathAnimation() {

    deathImageNumber = deathImageNumber + 1;

    if(deathImageNumber == 18) {
        deathImageNumber =17;
    }
    
    santa.src = "resources/dead (" + deathImageNumber +").png";
}
