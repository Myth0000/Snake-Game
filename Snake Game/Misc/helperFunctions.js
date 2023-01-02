function randomNumDivisibleBy(number) {
  // return a random number less than canvas width, then multiply it by number
  return int(random(3, int((width - 60) / number) + 1)) * number;
}

function getHighscore() {
  highscore = getItem("snakeGameHighscore");
  return highscore ? highscore : 0;
}

function hidePlayScreenButtons() {
  playButton.style("display", "none");
  helpButton.style("display", "none");
}

function displayPlayScreenButtons() {
  playButton.style("display", "block");
  helpButton.style("display", "block");
}
