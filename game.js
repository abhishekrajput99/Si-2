var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$("body").keypress(function(){

  if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}

});

$(".btn").on("click",function(){
var userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

var randomChosenColour;

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randNum = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");

  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");

  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else{
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
