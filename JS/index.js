//Patterns
var gamePattern = [];
var userPattern = [];

//Data
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var playing = false;

//Input
var colorChosen;
var userChosenColor;




//User Input

$(".btn").click(function () {
    if(playing == false){
        nextSequence();
        playing = true;
    }
    else{
        userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
        playSound(userChosenColor);
        animateButtonPress(this);
        checkAnswer(userPattern.length - 1);
    }
})

$(document).keypress(function () {
    if (playing == false) {
        nextSequence();
        playing = true;
    }
})


//Functions

function nextSequence() {
    var randNum = (Math.floor(Math.random() * 4));
    colorChosen = buttonColors[randNum];
    gamePattern.push(colorChosen);
    playSound(colorChosen);
    $("#" + colorChosen).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level : " + level);
}

function playSound(name) {
    var audio = new Audio('../Audio/' + name + '.mp3');
    audio.play();
}

function animateButtonPress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] == userPattern[currentIndex]) {
        if (gamePattern.length == currentIndex + 1){
            userPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        var a = new Audio("../Audio/wrong.mp3");
        a.play();
        startOver();
        $("h1").text("Game over, press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    }
}

function startOver() {
    level = 0;
    userPattern = [];
    gamePattern = [];
    playing = false;
}
