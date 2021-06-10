var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var firstKeyPress = false;
var level = 0;
var clickCount = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    setTimeout(function () {
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
        clickCount = 0;
    }, 300);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
        setTimeout(function () {
            console.log("Success!");
            nextSequence();
        }, 1000);
    } else {
        console.log("Wrong!");
        setTimeout(function () {
            $("#level-title").text("GAME OVER");
            playSound("wrong");
            $("body").addClass("game-over");
            startOver();
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    firstKeyPress = false;
    setTimeout(function () {
        $("#level-title").text("Level 1");
        nextSequence();
    }, 1000);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    if (++clickCount === level) {
        checkAnswer();
    }
});

$(document).keydown(function () {
    if (firstKeyPress === false) {
        nextSequence();
        firstKeyPress = true;
    }
});