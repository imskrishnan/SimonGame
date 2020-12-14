//button array - useful for generating a pattern
var buttonColors = ["green", "red", "yellow", "blue"];
var i=0;
var j=0;
var current_level = 1;
var new_high_score = 0;
var prev_high_score = 0;
const speed1 = 800;
const speed2 = 500;
const speed3 = 300;

//pattern array that has to be matched by the user..
var pattern = [];

//returns a random number from 0 - 3
function generateRandomNumber() {
    return(Math.floor(Math.random() * 4));
}

start_game();

//Start game
function start_game() {
    $(document).on("keypress", function() {
        $("#level-title").text("Level " + (current_level));
        $(document).off();
        setTimeout(() => {
            generatePattern();  
        }, 300);
    });
}


function generatePattern() {
    var randomNumber = generateRandomNumber();
    var randomColor = buttonColors[randomNumber];
    pattern.push(randomColor);
    
    showThePatternFromStart();
    console.log("Pattern : " + pattern);
}

function getSpeed() {
    if (current_level >= 1 && current_level < 5) {
        return speed1;
    } else if (current_level >= 5 && current_level < 10) {
        return speed2;
    } else {
        return speed3;
    }
}

function showThePatternFromStart() { 
    let speed = getSpeed();
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
        stylingAndAudio(pattern[j]);   //  your code here
        j++;                    //  increment the counter
        if (j < pattern.length) {           //  if the counter < 10, call the loop function
            showThePatternFromStart();             //  ..  again which will trigger another 
        } else {
            j=0;
        }                    //  ..  setTimeout()
    }, speed) 
} 

$(".btn").on("click", (event) => {
    // console.log("pattern : " + pattern);
    var thingPressed = event.target.id;
    stylingAndAudio(thingPressed);
    if (thingPressed == pattern[i]) {
        i++;
        if (pattern.length == i) {
            i=0;
            console.log("Success!");
            setTimeout(() => {
                $("#level-title").text("Level " + (++current_level));
            }, 700);
            new_high_score+=1;
            generatePattern();
        }
    } else {
        i = 0;
        gameOver();
    }
});

function stylingAndAudio(randomColor) {
    var audio = new Audio("sounds/"+randomColor+".mp3");
    audio.play();
    $("#"+randomColor).addClass("pressed");
    setTimeout(() => {
        $("#"+randomColor).removeClass("pressed");
    }, 100);
}

function gameOver() {
    $("#level-title").text("Game Over! Press a key to Restart.");
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
    console.log("Failed, Try again!");
    pattern = [];
    current_level = 1;
    start_game();
    if (new_high_score > prev_high_score) {
        prev_high_score = new_high_score;
        $(".footer").text(new_high_score);
    }
    new_high_score = 0;
}
