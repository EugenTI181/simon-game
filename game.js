//Array called buttonColours which hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];

//Empty array where the randomly generated colors will be added
var gamePattern = [];

var userClickedPattern = [];

//Variable to catch only first keypress
var started = false;

//Variable to start game at level 1
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if(!started){

        //The h1 title starts out saying "Press any Key to Start", when the game has started, change this to say "Level 0".
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function(){

    //Store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");

    //Add the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);

    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})

//Function that check user answer.
function checkAnswer(currentLevel){

    //Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        //Check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){
            
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {

        //Play sound when is wrong button
        playSound("wrong");

        //Change red background 
        $("body").addClass("game-over");

        //Change h1 if the user got the answer wrong.
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

//The function that generates a random color
function nextSequence() {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //Increase the level by 1 every time nextSequence() is called.
    level++;

    //Update the h1 with this change in the value of level.
    $("h1").text("Level " + level);

    //Generating a new random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    //Using the random number for a random color
    var randomChosenColour = buttonColours[randomNumber];

    //Adding color to the end of the gamePattern
    gamePattern.push(randomChosenColour);

    //Select the same id as the randomChosenColour, and flash it
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    //It will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);
}

//Function that takes a single input parameter called name.
function playSound(name){
    //Play the sound for the button colour selected
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

//Function that will add a box shadow and changes the background colour to grey when the user clicks a button.
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");}, 100);
}

//Reset the values of level, gamePattern and started variables.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}